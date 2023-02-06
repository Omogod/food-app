import app from '../app'
import supertest from 'supertest'
import {db} from '../config/index'

const request = supertest(app)

beforeAll(async() => {
    await db.sync().then(()=> {
        console.log('dbase connected')
    })
})

describe("Test users api", () => {
    it('creates an account', async() => {
        //  Arrange and Act
        const response = await request.post('/users/signup').send({
            email: "test4@gmail.com",
            phone: "09036964330",
            password: "1234",
            confirm_password: "1234"
        })

        expect(response.status).toBe(201)
        expect(response.body.message).toBe("User created successfully, check your email or phone for OTP verification")
        expect(response.body).toHaveProperty('signature')


    })
})