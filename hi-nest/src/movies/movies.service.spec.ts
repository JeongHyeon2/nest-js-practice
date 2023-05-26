import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';



describe('MoviesService', () => {
  let service: MoviesService;

  // 실행 전에 실행될 것
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("getAll", () => {
    it("should return an array", () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    })
  })

  describe("getOne", () => {

    it("should return a movie", () => {
      service.create({
        title: "Test Movie",
        genres: [],
        year: 2023
      });
      const movie = service.getOne("1");
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
      
    })
    it("should throw 404 error", () => {
      try {
        service.getOne("999");
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    })
  })

  describe("deleteOne", () => {
    it("delete a movie", () => {
      service.create({
        title: "Test Movie",
        genres: [],
        year: 2023
      });
      const allMovies = service.getAll().length;
      service.deleteOne("1");
      const afterDelete = service.getAll().length;

      expect(afterDelete).toBeLessThan(allMovies);

    })
    it("should be 404 error", () => {
      try {
        service.deleteOne("999");
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    })
  })

  describe("create", () => {
    it("should create movie ", () => {
      const beforCreate = service.getAll().length;
      service.create({
        title: "Test Movie",
        genres: [],
        year: 2023
      });
      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforCreate);

    })
  })

  describe("update", () => {
    it("should update movie", () => {
      service.create({
        title: "update title",
        genres: ["?"],
        year: 2023
      });
      service.update("1", { title: "update title" });
      const movie = service.getOne("1"); 
      expect(movie.title).toEqual("update title");
    })

    it("should throw 404 error", () => {
      try {
        service.update("999",{});
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    })
  })
});
