import {Injectable, OnApplicationBootstrap} from '@nestjs/common';
import {InstanceDocument} from '../../schemas/instance.schema';
import {GroupService} from '../group/group.service';
import {InstanceService} from '../instance/instance.service';
import {CronExpression, SchedulerRegistry} from '@nestjs/schedule';
import {ConfigService} from '../config/config.service';
import {CronJob} from 'cron';

const configService = ConfigService.getDefaultInstance();
const HEARTBEAT_AGE_IN_MS = configService.get('HEARTBEAT_AGE_IN_MS');

const CRON_JOB_NAME = 'removeExpiredInstances';

@Injectable()
export class DiscoveryService implements OnApplicationBootstrap {
  public constructor(
    private readonly groupService: GroupService,
    private readonly instanceService: InstanceService,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  public onApplicationBootstrap(): any {
    try {
      const cronJob = new CronJob(CronExpression.EVERY_MINUTE, async () => {
        await this.removeExpiredInstances();
      });

      this.schedulerRegistry.addCronJob(String(CRON_JOB_NAME), cronJob);
      cronJob.start();
    } catch (error) {
      throw new Error('Error starting cron job');
    }
  }

  public async registerInstance(
    group: string,
    id: string,
    meta?: Record<string, any>,
  ): Promise<InstanceDocument | null> {
    const resultGroup = await this.groupService.getOrCreate(group);
    if (!resultGroup) {
      throw new Error('Group not found');
    }
    const existingInstance = await this.instanceService.createOrUpdate(resultGroup.group, id, meta);
    const instances = await this.instanceService.getInstancesByGroup(resultGroup.group);
    if (!instances) {
      throw new Error('Instances not found');
    }
    await this.groupService.updateInstanceCount(resultGroup.group, instances?.length || 0);

    return existingInstance;
  }

  public async unregisterInstance(group: string, id: string): Promise<void> {
    await this.instanceService.deleteByGroupAndId(group, id);
    const instances = await this.instanceService.getInstancesByGroup(group);
    await this.groupService.updateInstanceCount(group, instances?.length || 0);
  }

  private async removeExpiredInstances(): Promise<void> {
    const recentInstance = await this.instanceService.getMostRecentInstance();
    if (!recentInstance) {
      console.log('no instances');
      return;
    }

    const expiredInstancesExists =
      new Date().getTime() - new Date(recentInstance.updatedAt).getTime() > Number(HEARTBEAT_AGE_IN_MS);

    if (!expiredInstancesExists) {
      console.log('no expired instances');
      return;
    }

    const instances = await this.instanceService.getAllInstances();
    console.log('instances', instances);
    if (!instances) {
      return;
    }

    for (const instance of instances) {
      const lastHeartbeatTime = new Date(instance.updatedAt).getTime();

      if (new Date().getTime() - lastHeartbeatTime > Number(HEARTBEAT_AGE_IN_MS)) {
        await this.instanceService.deleteById(instance.id);
      }
    }
  }
}
