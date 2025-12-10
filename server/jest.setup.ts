let server: any;

beforeAll(async () => {
    const app = require('../src/app').default; // ou o local real
    server = app.listen(3001);
});

afterAll(async () => {
    server.close();
});
