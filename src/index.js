// import '@babel/polyfill'
import express from 'express'

import http from 'http'

// Importando rutas

import rutaClienteWS from './routes/clienteWS'

// Importando configuraciones de la BD y middleware

import middleware from './libs/middleware'

const PORT = process.env.PORT || 3000
// const HOST='192.168.0.29'
let app = express()

middleware(app)

let server = http.Server(app)

// WEB SOCKETS SERVER CLIENTE
rutaClienteWS(app, server)

// server listening
server.listen(PORT, () => {
  console.log("Aplicacion corriendo en puerto:", PORT)
})
