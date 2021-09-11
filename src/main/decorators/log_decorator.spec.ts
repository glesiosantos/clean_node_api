import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'
import { LogControllerDecorator } from './log_decorator'

describe('LogController Decorator', () => {
  it('should calls controller handle', async () => {
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

    const controllerStub = new ControllerStub()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    const sut = new LogControllerDecorator(controllerStub)
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
