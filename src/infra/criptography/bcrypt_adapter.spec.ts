import bcrypt from 'bcrypt'
import { Encrypter } from '../../data/protocols/encrypter'
import { BCryptAdapter } from './bcrypt_adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return new Promise(resolve => resolve('hash'))
  }
}))

const salt = 12
const makeSut = (): Encrypter => new BCryptAdapter(salt)

describe('Bcrypt Adapter', () => {
  it('should call BCrypt with call values', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  it('should return hash on success', async () => {
    const sut = makeSut()
    const hash = await sut.encrypt('any_value')
    expect(hash).toBe('hash')
  })

  it('should throws when bcrypt throws', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => { throw new Error() })
    const promisse = sut.encrypt('any_value')
    await expect(promisse).rejects.toThrow()
  })
})
