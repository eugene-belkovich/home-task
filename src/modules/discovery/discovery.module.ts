import {Module} from '@nestjs/common';
import {DiscoveryService} from './discovery.service';
import {DiscoveryController} from './discovery.controller';
import {GroupModule} from '../group/group.module';
import {GroupService} from '../group/group.service';
import {InstanceModule} from '../instance/instance.module';
import {InstanceService} from '../instance/instance.service';

@Module({
  imports: [GroupModule, InstanceModule],
  controllers: [DiscoveryController],
  providers: [DiscoveryService, GroupService, InstanceService],
})
export class DiscoveryModule {}
