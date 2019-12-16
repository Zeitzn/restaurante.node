import ws from 'ws'

import url from 'url'

import fetch from 'node-fetch'

// SE TIENE QUE VER EL CASO EN EL QUE EL SOCKET NO ESTA ABIERTO
// SE PUEDE ESPERAR MENSAJES POR EL WEBSOCKET CON EL EVENTO:
// wssClient.on('message', callbackFunc)
export default (app, server) => {

  let wssClient = new ws.Server({
    server: server,
    path: '/client'
  })

  function noop() { }

  function heartbeat() {
    this.isAlive = true
  }

  setInterval(function ping() {
    wssClient.clients.forEach(ws => {
      if (!ws.isAlive) {
        let socketTodos = Object.values(userSockets)
        let arrIds = Object.keys(userSockets)
        let idx = socketTodos.indexOf(ws)
        let idxSocket = arrIds[idx]
        delete userSockets[idxSocket]
        console.log('socket con index ' + idx + 'fue quitado de userSockets ' + Object.keys(userSockets))
        return ws.terminate()
      }
      ws.isAlive = false
      ws.ping(noop)
    })
  }, 10000)

  let userSockets = {}

  wssClient.on('connection', (socket, request) => {
    socket.isAlive = true
    socket.on('pong', heartbeat)

    const parameters = url.parse(request.url, true)
    const userId = parameters.query.user_id
    userSockets[userId] = socket
    console.log('Conexion establecida para usuario', userId)
  })

  // app.route('/notificacion/')
    app.route('/notificacion')
    .get((req, res) => {
      // const userId = req.params.user_id
      let socket = userSockets[1]
      // console.log('get', userId)
      if (typeof (socket) !== 'undefined' && socket.readyState === ws.OPEN) {
        socket.send('mensaje de prueba')
        res.json({hola:'holaa'})
      } else {        
        res.status(204).json({ mensaje: 'exito' })

      }
    })

}
