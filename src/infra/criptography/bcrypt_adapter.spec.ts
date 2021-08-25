import bcrypt from 'bcrypt'
import { BCryptAdapeter } from './bcrypt_adapter'

describe('Bcrypt Adapter', () => {
  it('should call BCrypt with call values', async () => {
    const salt = 12
    const sut = new BCryptAdapeter(salt)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })
})
