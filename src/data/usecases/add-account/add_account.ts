import { AddAccount, AddAccountModel, AccountModel, Encrypter, AddAccountRepository } from './add_account_protocols'

export class DBAddAccount implements AddAccount {
  constructor (private readonly encrypter: Encrypter, private readonly addAccountRepository: AddAccountRepository) {}

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const hasdedPassword = await this.encrypter.encrypt(accountData.password)
    await this.addAccountRepository.add(Object.assign({}, accountData, { password: hasdedPassword }))
    return new Promise(resolve => resolve(null))
  }
}
