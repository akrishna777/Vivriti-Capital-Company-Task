import mongoose from 'mongoose'
import { customAlphabet, nanoid } from 'nanoid'

const uniqueId = customAlphabet('1234567890', 5)

const employeeSchema = mongoose.Schema({
  userId: {
    type: Number,
    default: () => uniqueId(),
    index: { unique: true },
  },
  Firstname: { type: String, required: true },
  Lastname: { type: String, required: true },
  MobileNumber: { type: String, required: true },
  Address: { type: String, required: true },
  Department: { type: String, required: true },
})

const Employee = mongoose.model('Employees', employeeSchema)

export default Employee
