import {Module} from '@nestjs/common';
import {GroupService} from './group.service';
import {GroupRepository} from './group.repository';
import {MongooseModule} from '@nestjs/mongoose';
import {Group, GroupSchema} from '../../schemas/group.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: Group.name, schema: GroupSchema}])],
  providers: [GroupService, GroupRepository],
  exports: [GroupService, GroupRepository],
})
export class GroupModule {}
