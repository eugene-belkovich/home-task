import {Module} from '@nestjs/common';
import {InstanceRepository} from './instance.repository';
import {MongooseModule} from '@nestjs/mongoose';
import {InstanceService} from './instance.service';
import {Instance, InstanceSchema} from '../../schemas/instance.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: Instance.name, schema: InstanceSchema}])],
  providers: [InstanceService, InstanceRepository],
  exports: [InstanceService, InstanceRepository],
})
export class InstanceModule {}
