import jsonServer from 'json-server'

const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

/* const validator = (request, response, next) => {
    //validate content format here

} */

server.use(middlewares)
server.use(jsonServer.bodyParser)
//server.use(validator)
server.use(router)

server.listen(3005, () => {
  console.log('JSON Server is running')
})