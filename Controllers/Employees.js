import Employee from '../Models/Employee.js'
import { getPostData } from '../Utils/utils.js'

export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find()

    console.log(employees)

    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(employees))
  } catch (error) {
    console.log(error.message)
  }
}

export const createEmployee = async (req, res) => {
  const body = await getPostData(req)

  const { Firstname, Lastname, MobileNumber, Address, Department } = JSON.parse(
    body,
  )

  try {
    const existingEmployee = await Employee.findOne({
      Firstname: Firstname,
      Lastname: Lastname,
      MobileNumber: MobileNumber,
      Address: Address,
      Department: Department,
    })

    if (existingEmployee) {
      res.writeHead(400, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: 'Employee Already Exists.' }))
    } else {
      const newEmployee = await Employee.create({
        Firstname: Firstname,
        Lastname: Lastname,
        MobileNumber: MobileNumber,
        Address: Address,
        Department: Department,
      })
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(newEmployee))
    }
  } catch (error) {
    console.log(error.message)
  }
}

export const updateEmployee = async (req, res, userid) => {
  const body = await getPostData(req)

  const requestBody = JSON.parse(body)

  try {
    const existingEmployee = await Employee.findOne({
      userId: parseInt(userid),
    })

    if (!existingEmployee) {
      res.writeHead(400, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: 'No employee with that user id.' }))
    }

    const updatedEmployee = await Employee.findOneAndUpdate(
      { userId: parseInt(userid) },
      requestBody,
      { new: true },
    )

    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(updatedEmployee))
  } catch (error) {
    console.log(error.message)
  }
}

export const deleteEmployee = async (req, res) => {
  const body = await getPostData(req)

  const { userId } = JSON.parse(body)

  try {
    const existingEmployee = await Employee.findOne({
      userId: parseInt(userId),
    })

    if (!existingEmployee) {
      res.writeHead(400, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: 'No employee with that user id.' }))
    } else {
      await Employee.findOneAndDelete({ userId: userId })

      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: 'User Deleted Successfully.' }))
    }
  } catch (error) {
    console.log(error.message)
  }
}
