import { LogErrorRepository } from '../../../../data/protocols/log_error_repository'
import { MongoDBHelper } from '../helpers/mongodb-helper'

export class LogMongoRepository implements LogErrorRepository {
  async logError (stack: string): Promise<void> {
    const errorCollection = await MongoDBHelper.getCollection('errors')
    await errorCollection.insertOne({
      stack,
      date: new Date()
    })
  }
}
