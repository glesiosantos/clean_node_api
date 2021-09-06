import { DBAddAccount } from '../../data/usecases/add-account/add_account'
import { BCryptAdapter } from '../../infra/criptography/bcrypt_adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account/account_repository'
import { SignUpController } from '../../presentation/controllers/signup/signup'
import { EmailValidatorAdapter } from '../../utils/email_validator_adapter'

export const makeSignUpController = (): SignUpController => {
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const bcryptAdapter = new BCryptAdapter(12)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAddAccount = new DBAddAccount(bcryptAdapter, accountMongoRepository)
  return new SignUpController(emailValidatorAdapter, dbAddAccount)
}
