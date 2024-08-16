const request = require('supertest')
const chai = require('chai')
const { assert, expect } = require('chai')
const jsonSchema = require('chai-json-schema')
chai.use(jsonSchema)

// import schema
const getlist = require('./schemas/GetListUser')
const postregister = require('./schemas/PostRegister')
const deleteUser = require('./schemas/DeleteUser');
const putUser = require('./schemas/PutUser');
// import config
const {BASE_URL} = require('./env/config')

describe('Test Suite 1', () => {

    it('Test Case 1: Get All User', async function () {
        const response = await request(BASE_URL)
            .get('/api/users?page=2')

        console.log('Status:', response.status);
        // console.log('Response Body:', response.body);
       
        // assertion
        assert.equal(response.status, 200)
        assert.equal(response.body.data[0].id, 7)
        assert.jsonSchema(response.body, getlist);
        // expect
        expect(response.status).to.equal(200)
        // 
        
    });

    it('Test Case 2: Post Register - successful', async function () {
        
        const bodyPost = {
            "email": "eve.holt@reqres.in",
            "password": "pistol"
        }

            const response = await request(BASE_URL)
            .post('/api/register')
            .send(bodyPost)

        console.log('Status:', response.status);
        // console.log('Response Body:', response.body);
       
        // assertion
        assert.equal(response.status, 200)
        assert.equal(response.body.id, 4)
        assert.equal(response.body.token, 'QpwL5tke4Pnpja7X4')
        assert.jsonSchema(response.body, postregister);       
    });

    it('Test Case 3: Delete', async function () {
        const response = await request(BASE_URL)
            .delete('/api/user/2')

        console.log('Status:', response.status);        
        // console.log('Response Body:', response.body);
       
        // assertion
        assert.equal(response.status, 204)
        assert.jsonSchema(response.body, deleteUser);
    });

    it('Test Case 4: Put - Update User', async function () {
        
        const bodyPut = {
            "name": "morpheus",
            "job": "zion resident"
        }

        const response = await request(BASE_URL)
            .put('/api/user/2')
            .send(bodyPut)

        console.log('Status:', response.status);        
        // console.log('Response Body:', response.body);
       
        // assertion
        assert.equal(response.status, 200)
        assert.jsonSchema(response.body, putUser);
    });


});

