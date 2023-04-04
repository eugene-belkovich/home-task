import {Module} from '@nestjs/common';
import {DiscoveryService} from './discovery.service';
import {DiscoveryController} from './discovery.controller';
import {GroupModule} from '../group/group.module';
import {GroupService} from '../group/group.service';

@Module({
  imports: [GroupModule],
  controllers: [DiscoveryController],
  providers: [DiscoveryService, GroupService],
})
export class DiscoveryModule {}
