import request from 'supertest'
import app from '../config/app'
import { MongoDBHelper } from '../../infra/db/mongodb/helpers/mongodb-helper'

describe('SignUp Routes', () => {
  beforeAll(async () => await MongoDBHelper.connect(process.env.MONGO_URL))

  afterAll(async () => await MongoDBHelper.disconnect())

  beforeEach(async () => {
    const accountCollection = MongoDBHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })
  it('should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Glêsio Santos',
        email: 'glesioss@gmail.com',
        password: '123456',
        passwordConfirmation: '123456'
      })
      .expect(200)
  })
})
