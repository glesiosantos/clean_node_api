import { Collection } from 'mongodb'
import { MongoDBHelper } from '../helpers/mongodb-helper'
import { LogMongoRepository } from './log_mongo_repository'

describe('Log Mongo Respository', () => {
  let errorsCollection: Collection

  beforeAll(async () => await MongoDBHelper.connect(process.env.MONGO_URL))

  afterAll(async () => await MongoDBHelper.disconnect())

  beforeEach(async () => {
    errorsCollection = await MongoDBHelper.getCollection('errors')
    await errorsCollection.deleteMany({})
  })

  it('should create an error log on success', async () => {
    const sut = new LogMongoRepository()
    await sut.logError('any_error')
    const count = await errorsCollection.countDocuments()
    expect(count).toBe(1)
  })
})
