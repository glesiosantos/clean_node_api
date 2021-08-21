import { EmailValidatorAdapter } from './email_validator_adapter'
import validator from 'validator'
import { EmailValidator } from '../presentation/protocols/email_validator'

jest.mock('validator', () => ({
  isEmail (): boolean {
    return true
  }
}))

const makeSut = (): EmailValidator => new EmailValidatorAdapter()

describe('Email Validator Adapter', () => {
  it('should return false when validator returns false', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid('invalid@email.com')
    expect(isValid).toBe(false)
  })

  it('should return true when validator returns true', () => {
    const sut = makeSut()
    const isValid = sut.isValid('valid@email.com')
    expect(isValid).toBe(true)
  })

  it('should call validator with correct email', () => {
    const sut = makeSut()
    const isEmailSpy = jest.spyOn(validator, 'isEmail')
    sut.isValid('valid@email.com')
    expect(isEmailSpy).toHaveBeenCalledWith('valid@email.com')
  })
})
