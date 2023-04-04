import request from 'supertest';
import {Test, TestingModule} from '@nestjs/testing';
import {AppModule} from '../src/app.module';
import {HttpStatus} from '@nestjs/common';
import {URL} from './constant';

describe('DiscoveryController (e2e)', () => {
  let app: any;
  let groupId: string;
  let instanceId: string;

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

  describe('GET /', () => {
    it('should return an empty array when there are no groups', async () => {
      const response = await request(app.getHttpServer()).get('/').expect(HttpStatus.OK);
      expect(response.body).toEqual([]);
    });

    it('should return an array of groups when there are groups', async () => {
      await request(app.getHttpServer()).post(`${URL}/group/test-group`).expect(HttpStatus.CREATED);

      const response = await request(app.getHttpServer()).get(`${URL}/`).expect(HttpStatus.OK);
      expect(response.body.length).toBeGreaterThan(0);

      groupId = response.body[0].id;
      expect(groupId).toBeTruthy();
    });
  });

  describe('GET /:group', () => {
    it('should return an empty array when there are no instances for the specified group', async () => {
      const response = await request(app.getHttpServer()).get(`${URL}/${groupId}`).expect(HttpStatus.OK);
      expect(response.body).toEqual([]);
    });

    it('should return an array of instances when there are instances for the specified group', async () => {
      await request(app.getHttpServer()).post(`${URL}/${groupId}/test-instance`).expect(HttpStatus.CREATED);

      const response = await request(app.getHttpServer()).get(`${URL}/${groupId}`).expect(HttpStatus.OK);
      expect(response.body.length).toBeGreaterThan(0);

      instanceId = response.body[0].id;
      expect(instanceId).toBeTruthy();
    });
  });

  describe('POST /:group/:id', () => {
    it('should register a new instance for the specified group', async () => {
      const response = await request(app.getHttpServer())
        .post(`${URL}/${groupId}/new-instance`)
        .send({meta: {foo: 'bar'}})
        .expect(HttpStatus.CREATED);

      expect(response.body.group).toEqual(groupId);
      expect(response.body.id).toEqual('new-instance');
      expect(response.body.meta).toEqual({foo: 'bar'});
    });
  });

  describe('DELETE /:group/:id', () => {
    it('should unregister the specified instance', async () => {
      await request(app.getHttpServer()).delete(`${URL}/${groupId}/${instanceId}`).expect(HttpStatus.OK);
      const response = await request(app.getHttpServer()).get(`${URL}/${groupId}`).expect(HttpStatus.OK);
      expect(response.body.find((i: any) => i._id === instanceId)).toBeFalsy();
    });
  });
});
