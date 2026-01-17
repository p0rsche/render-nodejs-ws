const express = require('express')
const { createServer } = require('http')
const path = require('path');
const WebSocket = require('ws')

const app = express()
const server = createServer(app)
const port = process.env.PORT || 10000

const wss = new WebSocket.Server({ server, path: '/ws' })

app.get('/', (_, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

wss.on('connection', (ws) => {
  ws.on('error', console.error)

  ws.on('message', (message) => {
    console.log('Received:', message.toString())
    ws.send('Hello over WebSocket!')
  })
})

server.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})