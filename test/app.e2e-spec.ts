import {Test, TestingModule} from '@nestjs/testing';
import request from 'supertest';
import {AppModule} from '../src/app.module';
import {INestApplication} from '@nestjs/common';
import {URL} from './constant';

describe('Health (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Health (e2e)', () => {
    test('/health-check (GET)', async () => {
      const url = `${URL}/health-check`;
      const response = await request(app.getHttpServer()).get(url);
      expect(response.body).toEqual('OK');
    });
  });
});
