import { Router } from 'express'
import { makeSignUpController } from '../factories/signup_factory'
import { adaptRoute } from '../adapter/express_route_adapter'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()))
}
