const mongoose=require('mongoose')
const userListschema=mongoose.Schema({
    name:String,
    employee_id:String,
    image:String,
    email:String,
    state:String,
    course:String,
    coursetime:String,
    userId:String,
    employee_userId:String,
    index:Number,
})
const UserListModel=mongoose.model("adminwork",userListschema)
module.exports={UserListModel}