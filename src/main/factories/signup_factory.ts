import { DBAddAccount } from '../../data/usecases/add-account/add_account'
import { BCryptAdapter } from '../../infra/criptography/bcrypt_adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account/account_repository'
import { LogMongoRepository } from '../../infra/db/mongodb/log/log_mongo_repository'
import { SignUpController } from '../../presentation/controllers/signup/signup'
import { Controller } from '../../presentation/protocols'
import { EmailValidatorAdapter } from '../../utils/email_validator_adapter'
import { LogControllerDecorator } from '../decorators/log_decorator'

export const makeSignUpController = (): Controller => {
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const bcryptAdapter = new BCryptAdapter(12)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAddAccount = new DBAddAccount(bcryptAdapter, accountMongoRepository)
  const signUpController = new SignUpController(emailValidatorAdapter, dbAddAccount)
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(signUpController, logMongoRepository)
}
