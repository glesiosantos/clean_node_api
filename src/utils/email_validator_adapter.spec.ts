import { EmailValidatorAdapter } from './email_validator_adapter'

describe('Email Validator Adapter', () => {
  it('should return false when validator returns false', () => {
    const sut = new EmailValidatorAdapter()
    const isValid = sut.isValid('invalid@email.com')
    expect(isValid).toBe(false)
  })
})
