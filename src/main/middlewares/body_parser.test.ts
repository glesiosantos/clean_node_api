import request from 'supertest'
import app from '../config/app'

describe('Body Parser Middleware', () => {
  it('should parse body as json ', async () => {
    app.post('/test_body_parser', (req, res) => {
      res.send(req.body)
    }) // simulando uma rota temporaria
    await request(app)
      .post('/test_body_parser')
      .send({ name: 'Glêsio Santos' })
      .expect({ name: 'Glêsio Santos' })
  })
})
