import bcrypt from 'bcrypt'
import { BCryptAdapeter } from './bcrypt_adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return new Promise(resolve => resolve('hash'))
  }
}))

describe('Bcrypt Adapter', () => {
  it('should call BCrypt with call values', async () => {
    const salt = 12
    const sut = new BCryptAdapeter(salt)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  it('should call BCrypt with call values', async () => {
    const salt = 12
    const sut = new BCryptAdapeter(salt)
    const hash = await sut.encrypt('any_value')
    expect(hash).toBe('hash')
  })
})
