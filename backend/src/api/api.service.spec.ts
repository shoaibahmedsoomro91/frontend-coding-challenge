// import { Test, TestingModule } from "@nestjs/testing";
// import { UserService } from "./user.service";

// const everyItemContainsKey = (key) => (collection) =>
//   collection.forEach((item) => Object.keys(item).includes(key));

// describe("User Service", () => {
//   let service: UserService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [UserService],
//     }).compile();

//     service = module.get<UserService>(UserService);
//   });

//   it("should be defined", () => {
//     expect(service).toBeDefined();
//   });
// });

// describe('absences', () => {
//   let service: UserService;

//   describe('every absence has key', () => {
//     [
//       'admitterNote',
//       'confirmedAt',
//       'createdAt',
//       'crewId',
//       'endDate',
//       'id',
//       'memberNote',
//       'rejectedAt',
//       'startDate',
//       'type',
//       'userId',
//     ].forEach((key) => {
//       it(key, () => service.findByEmail('').then(everyItemContainsKey(key)));
//     });
//   });
// });
