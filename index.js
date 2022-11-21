import http from 'http'
import mongoose from 'mongoose'
import {
  createEmployee,
  deleteEmployee,
  getEmployees,
  updateEmployee,
} from './Controllers/Employees.js'
import dotenv from 'dotenv'

dotenv.config()

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200)
    res.end('Welcome to Employees Data Backend!\n')
  } else if (req.url === '/list' && req.method === 'GET') {
    getEmployees(req, res)
  } else if (req.url === '/Registration' && req.method === 'POST') {
    createEmployee(req, res)
  } else if (
    req.url.match(/\/updateEmployee\/([0-9]+)/) &&
    req.method === 'PATCH'
  ) {
    const userid = req.url.split('/')[2]
    updateEmployee(req, res, userid)
  } else if (req.url === '/deleteEmployee' && req.method === 'DELETE') {
    deleteEmployee(req, res)
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(
      JSON.stringify({
        error:
          'Invalid Route. Please check if you are making the request to the correct URL.',
      }),
    )
  }
})

const CONNECTION_URL =
  'mongodb+srv://vivriti:vivriti123@cluster0.pmeqcdj.mongodb.net/?retryWrites=true&w=majority'

const PORT = process.env.PORT || 5000

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    server.listen(PORT, () => console.log(`Server running on port: ${PORT}`)),
  )
  .catch((error) => console.log(error.message))
