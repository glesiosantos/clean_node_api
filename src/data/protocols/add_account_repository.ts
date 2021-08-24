import { AccountModel } from '../../domain/models/account'
import { AddAccountModel } from '../../domain/usecases/add_account'

export interface AddAccountRepository {
  add(accountData: AddAccountModel): Promise<AccountModel>
}
