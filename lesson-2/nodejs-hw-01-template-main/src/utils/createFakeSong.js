import { faker } from "@faker-js/faker";

const createFakeSong = ()=> ({
    id: faker.string.uuid(),
    title: faker.music.songName(),
    genre: faker.music.genre(),
    author: faker.person.fullName(),
});

export default createFakeSong;