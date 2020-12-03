const supertest = require('supertest');

const app = require('./app');
const project = require('./constants/project');

describe('App', () => {
    it('should response with a message', async ()=>{
        const response = await supertest(app)
            .get('/')
            .expect('Content-type', /json/)
            .expect(200);
        expect(response.body.message).toEqual(project.message)
    })
})
