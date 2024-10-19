const mongoose=require('mongoose')
const employeeschema=mongoose.Schema({
    name:String,
    email:String,
    password:String,
    person:String,
    state:String
})
const EmployeeModel=mongoose.model("employee",employeeschema)
module.exports={EmployeeModel}