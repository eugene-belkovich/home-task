import {Module} from '@nestjs/common';
import {DiscoveryService} from './discovery.service';
import {DiscoveryController} from "./discovery.controller";

@Module({
  imports: [],
  controllers: [DiscoveryController],
  providers: [DiscoveryService],
})
export class DiscoveryModule {}
