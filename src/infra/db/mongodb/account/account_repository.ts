import { AddAccountRepository } from '../../../../data/protocols/add_account_repository'
import { AccountModel } from '../../../../domain/models/account'
import { AddAccountModel } from '../../../../domain/usecases/add_account'
import { MongoDBHelper } from '../helpers/mongodb-helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoDBHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    const account = result[0]
    const { _id, ...accountWithoutId } = account
    return Object.assign({}, accountWithoutId, { id: _id })
  }
}
