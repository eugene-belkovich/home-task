import {Test, TestingModule} from '@nestjs/testing';
import {ConfigService} from './config.service';
import {ConfigModule} from './config.module';

declare let process: {env: {[key: string]: string}};

describe('ConfigService', () => {
  let service: ConfigService;
  let module: TestingModule;
  // Needs for restore Environment variables after each test
  const OLD_ENV = process.env;

  beforeEach(async () => {
    jest.resetModules();
    process.env = {...OLD_ENV};

    module = await Test.createTestingModule({
      imports: [ConfigModule],
    }).compile();
    service = module.get<ConfigService>(ConfigService);
  });

  afterEach(() => {
    process.env = OLD_ENV;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    // This is the default value on .env.dev.test file
    expect(service.get('NODE_ENV')).toEqual('test');
  });

  it('should take value of environment variable on top of one in .env.dev file', () => {
    process.env.NODE_ENV = 'new test';

    expect(ConfigService.getDefaultInstance().get('NODE_ENV')).toEqual('new test');
  });

  it('should have environment variable even if there is no one in .env.dev file', () => {
    // This test expects .env.dev.test to have defined the unitTest1=test1 variable
    process.env.testNew = 'new test';

    expect(ConfigService.getDefaultInstance().get('NODE_ENV')).toEqual('test');
    expect(ConfigService.getDefaultInstance().get('testNew')).toEqual('new test');
  });
});
