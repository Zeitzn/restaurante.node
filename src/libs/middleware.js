import bodyParser from 'body-parser'
import cors from 'cors'

module.exports = app => {
  let allowedOrigins = ['http://192.168.43.170:8000','http://192.168.43.43:8000', 'localhost:8000','http://192.168.42.104:8000'/*192.168.2.67 no funciona como allowed*/]
  let corsOptions = {
    origin: (origin, callback) => {
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('not allowed cors'))
      }
    }
  }
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(cors())

  app.use((err, req, res, next) => {
 
    res.status(err.status || 500)
    res.json({
      message: err.message,
      error: err
    })
  })
  // console.log(app.db.models)
}
