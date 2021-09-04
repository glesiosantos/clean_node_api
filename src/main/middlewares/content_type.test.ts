import request from 'supertest'
import app from '../config/app'

describe('Content Type Middleware', () => {
  it('should return default content type as json', async () => {
    app.post('/test_content_type', (req, res) => {
      res.send()
    }) // simulando uma rota temporaria
    await request(app)
      .post('/test_content_type')
      .expect('content-type', /json/)
  })

  it('should return xml content type when forced', async () => {
    app.post('/test_content_type_xml', (req, res) => {
      res.type('xml')
      res.send()
    }) // simulando uma rota temporaria
    await request(app)
      .post('/test_content_type_xml')
      .expect('content-type', /xml/)
  })
})
