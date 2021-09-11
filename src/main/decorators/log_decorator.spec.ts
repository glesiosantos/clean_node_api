import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'
import { LogControllerDecorator } from './log_decorator'

type SutType = {
  sut: LogControllerDecorator
  controllerStub: Controller
}

const makeController = (): Controller => {
  class ControllerStub implements Controller {
    handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      const HttpResponse = {
        statusCode: 200,
        body: {
          name: 'Glêsio Santos'
        }
      }
      return new Promise(resolve => resolve(HttpResponse))
    }
  }

  return new ControllerStub()
}

const makeSut = (): SutType => {
  const controllerStub = makeController()
  const sut = new LogControllerDecorator(controllerStub)
  return { sut, controllerStub }
}

describe('LogController Decorator', () => {
  it('should calls controller handle', async () => {
    const { sut, controllerStub } = makeSut()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com.br',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    await sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })
})
