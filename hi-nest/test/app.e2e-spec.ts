import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // test서버와 실제 어플리케이션 서버와 환경을 똑같이 해줘야 함
    // test서버는 id가 string이지만 어플리케이션 서버는 transform때문에 id가 number형으로 바뀌어 있기 때문
    app.useGlobalPipes(
      new ValidationPipe(
        {
          whitelist: true, // 유효하지 않으면 requst자체를 막음
          forbidNonWhitelisted: true, // 유효하지 않는 데이터를 출력
          
        }
      )
    );
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcom to my movie API!');
  });

  describe("/moives", () => {
    it("GET", () => {
    // http://localhost:3000/
    return request(app.getHttpServer())
      .get("/movies")
      .expect(200)
      .expect([]);
    })
    it("POST", () => {
      // http://localhost:3000/
      return request(app.getHttpServer())
        .post("/movies")
        .send({
          title: "test",
          year: 2002,
          genres:["testG"]
        })
        .expect(201)
    })
    it("DELETE", () => {
      // http://localhost:3000/
      return request(app.getHttpServer())
        .delete("/movies")
      .expect(404)
      })
  })

  describe("/movie/:id", () => {
    it("GET 200", () => {
      return request(app.getHttpServer()).get("/movies/1").expect(200)
    })
    it.todo("GET");
    it.todo("DELETE");
    it.todo("PATCH");
  })
});
