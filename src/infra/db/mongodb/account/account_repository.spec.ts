import { MongoDBHelper } from '../helpers/mongodb-helper'

describe('Account Repository MongoDB', () => {
  beforeAll(async () => await MongoDBHelper.connect(process.env.MONGO_URL))

  afterAll(async () => await MongoDBHelper.disconnect())

  it('should return an account on success', () => {
    const sut = new AccountRepositoryMongoDB()
    const account = sut.add({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password'
    })

    expect(account.name).toBe('any_name')
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
  })
})
