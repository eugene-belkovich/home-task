import {Test, TestingModule} from '@nestjs/testing';
import {GroupService} from './group.service';
import { GroupRepository } from "./group.repository";
import { getModelToken } from "@nestjs/mongoose";
import { Group, GroupDocument } from "../../schemas/group.schema";
import { Model } from "mongoose";

describe('GroupService', () => {
  let service: GroupService;
  let repository: GroupRepository;
  let model: Model<GroupDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GroupService,
        GroupRepository,
        {
          provide: getModelToken(Group.name),
          useValue: {
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<GroupService>(GroupService);
    repository = module.get<GroupRepository>(GroupRepository);
    model = module.get<Model<GroupDocument>>(getModelToken(Group.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
