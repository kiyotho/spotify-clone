// import request from "supertest";
// import { app } from "../app.js";


// describe("POST /api/auth/login", () => {

//     const agent = request.agent(app)

//     it('should return 201 new user added', async() => {

//         const res = await agent
//             .post('/api/auth/register')
//             .set('Accept', 'application/json')
//             .send({
//                 "username": 'john doe',
//                 "email": 'johndoe@gmail.com',
//                 "password": 'test123'
//             })
//             .expect('Content-Type', /json/);

//         expect(res.statusCode).toBe(201);
        
//         const cookies = response.headers['set-cookie'];
//         expect(cookies).toBeDefined(); 

//         savedCookie = cookies[0];
        
//     });
// });


// describe('GET /api/music/', () => {
//     it('should return 200 OK', async() => {

//         const res = await request(app).get('/api/music/')

//         expect(res.statusCode).toBe(200)
//         expect(res.body.message).toEqual('success')

//     })
// })