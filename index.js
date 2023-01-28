const { appendCsv } = require("./csvParser");
const { usersFile } = require("./dataset");
const { pause } = require("./helpers");

const faker = require("faker/locale/pt_BR");
const chance = require("chance").Chance();
const { nanoid } = require("nanoid");

(async () => {
  const recordsNumber = faker.random.number({ min: 1, max: 100 });

  for (let i = 0; i <= recordsNumber; i++) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();

    const newUser = {
      id: nanoid(),
      first_name: firstName,
      last_name: lastName,
      email: faker.internet.email(firstName, lastName),
      phone: faker.phone.phoneNumber(),
      cpf: chance.cpf()
    };

    await pause(1500);
    await appendCsv(newUser, usersFile);
    console.log(newUser);
  }
})();
