const expect = require('chai').expect;
const request = require("supertest");
const app = require("./app");
const server = request(app);
const Users = require('./models').Users;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
after(done => {
  app.close();
  mongoose.disconnect();
  done();
});

before(async () => {
  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash("0000", salt);
  await Users.deleteMany({});
  await Users.create({
    nickname: 'hanu',
    email: 'hanu123',
    password: hashPass
  });
});
describe('USER API TEST', () => {
  describe('post /signup', () => {
    it('회원가입에 성공하여야 합니다.', async() => {
      const res = await server.post('/signup').send({
        nickname: '나무',
        email: 'tree08',
        password: '1234'
      });
      const user = await Users.findOne({email:'tree08'});
      expect(res.status).to.equal(201);
      expect(user.email).to.equal('tree08');
    });
  
    it('이미 회원인 경우 에러를 발생합니다.', async () => {
      const res = await server.post('/signup').send({
        nickname: 'hanu',
        email: 'hanu123',
        password: '0000'
      });
      expect(res.status).to.equal(409);
      expect(res.text).to.equal('Already user');
    });
  
    it('회원 가입에 성공했으면 토큰을 받아야 합니다.', async() => {
      const res = await server.post('/signup').send({
        nickname: '안녕',
        email: 'hi12',
        password: '444'
      });
      expect(res.status).to.equal(201);
      expect(res.body).to.have.all.keys(
        [
          'userinfo',
          'access_token',
          'refresh_token'
        ] 
      );
    });
  
    it('사용자의 비밀번호는 해싱 되어야 합니다.', async() => {
      const user = await Users.findOne({email:'tree08'});
      const judge = await bcrypt.compare('1234', user.password);
      expect(judge).to.equal(true);
    });
    
  });
  
  describe('post /signin', () => {
    it('희원인 유저는 로그인 되어야 합니다.', async() => {
      const res = await server.post('/signin').send({
        email: 'hanu123',
        password: '0000'
      });
      expect(res.status).to.equal(200);
      expect(res.body).to.have.all.keys(
        [
          'userinfo',
          'access_token',
          'refresh_token'
        ] 
      );
    });
  
    it('회원이 아닌 유저는 로그인이 실패합니다.', async() => {
      const res = await server.post('/signin').send({
        email: 'koko33',
        password: '78'
      });
      expect(res.status).to.equal(404);
      expect(res.text).to.equal('unvalid user');
    });
  
    it('비밀번호가 틀리면 로그인이 실패합니다', async() => {
      const res = await server.post('/signin').send({
        email: 'tree08',
        password: '34'
      });
      expect(res.status).to.equal(404);
      expect(res.text).to.equal('unvalid user');
    });
  });
});