import {Test, TestingModule} from '@nestjs/testing';
import {getModelToken} from '@nestjs/mongoose';
import {Instance, InstanceDocument} from '../../schemas/instance.schema';
import {Model} from 'mongoose';
import {InstanceService} from './instance.service';
import {InstanceRepository} from './instance.repository';

describe('InstanceService', () => {
  let service: InstanceService;
  let repository: InstanceRepository;
  let model: Model<InstanceDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InstanceService,
        InstanceRepository,
        {
          provide: getModelToken(Instance.name),
          useValue: {
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<InstanceService>(InstanceService);
    repository = module.get<InstanceRepository>(InstanceRepository);
    model = module.get<Model<InstanceDocument>>(getModelToken(Instance.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
