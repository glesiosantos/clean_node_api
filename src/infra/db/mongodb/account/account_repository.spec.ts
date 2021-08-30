import { MongoDBHelper } from '../helpers/mongodb-helper'
import { AccountMongoRepository } from './account_repository'

describe('Account Repository MongoDB', () => {
  beforeAll(async () => await MongoDBHelper.connect(process.env.MONGO_URL))

  afterAll(async () => await MongoDBHelper.disconnect())

  const makeSut = (): AccountMongoRepository => {
    return new AccountMongoRepository()
  }

  it('should return an account on success', () => {
    const sut = makeSut()
    const account = sut.add({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password'
    })

    expect(account).toBeTruthy()
    // expect(account.id).toBeTruthy()
  })
})
