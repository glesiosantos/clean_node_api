import { EmailValidatorAdapter } from './email_validator_adapter'
import validator from 'validator'

jest.mock('validator', () => ({
  isEmail (): boolean {
    return true
  }
}))

describe('Email Validator Adapter', () => {
  it('should return false when validator returns false', () => {
    const sut = new EmailValidatorAdapter()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid('invalid@email.com')
    expect(isValid).toBe(false)
  })

  it('should return true when validator returns true', () => {
    const sut = new EmailValidatorAdapter()
    const isValid = sut.isValid('valid@email.com')
    expect(isValid).toBe(true)
  })

  it('should call validator with correct email', () => {
    const sut = new EmailValidatorAdapter()
    const isEmailSpy = jest.spyOn(validator, 'isEmail')
    sut.isValid('valid@email.com')
    expect(isEmailSpy).toHaveBeenCalledWith('valid@email.com')
  })
})
