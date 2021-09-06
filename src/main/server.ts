import { MongoDBHelper } from '../infra/db/mongodb/helpers/mongodb-helper'
import env from './config/env'

MongoDBHelper.connect(env.mongoUrl)
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`))
  }).catch(console.error)
