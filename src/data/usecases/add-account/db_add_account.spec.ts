import { AddAccount } from '../../../domain/usecases/add_account'
import { Encrypter } from '../../protocols/encrypter'
import { DBAddAccount } from './add_account'

type SutType = {
  sut: AddAccount
  encryptStub: Encrypter
}

const makeEncrypter = (): Encrypter => {
  class EncryptStub {
    async encrypt (value: string): Promise<string> {
      return new Promise(resolve => resolve('hashed_password'))
    }
  }
  return new EncryptStub()
}

const makeSut = (): SutType => {
  const encryptStub = makeEncrypter()
  const sut = new DBAddAccount(encryptStub)

  return { sut, encryptStub }
}

describe('DBAddAccount Usecase', () => {
  it('should call Encrypter with correct password', async () => {
    const { sut, encryptStub } = makeSut()
    const encryptSpy = jest.spyOn(encryptStub, 'encrypt')
    const accountData = {
      name: 'valid_name',
      email: 'valid_email@email.com',
      password: 'valid_password'
    }
    await sut.add(accountData)
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })
})
