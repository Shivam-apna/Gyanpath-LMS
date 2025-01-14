const express = require("express")
let { StudentModel } = require("../model/employee.model")


let jwt = require("jsonwebtoken")
let bcrypt = require("bcrypt")
const studentRouter = express.Router()
studentRouter.get("/", (req, res) => {
  res.send("welcome to student pannel")
})
studentRouter.post("/signup", async (req, res) => {
  let { name, email, password, state } = req.body
  try {
    bcrypt.hash(password, 5, async (err, hashpasword) => {
      if (hashpasword) {
        let newstudent = new StudentModel({ name: name, email: email, password: hashpasword, state, person: "student" })
        await newstudent.save()
        res.send({ "msg": "signup successful" })
      } else {
        res.send({ "msg": "signup failed" })
      }
    })
  } catch (error) {
    console.log(error)
    res.send({ "msg": error })
  }

})
studentRouter.post("/login", async (req, res) => {
  let { email, password } = req.body
  let user = await StudentModel.find({ email })

  try {

    if (user.length > 0) {
      let hashpassword = user[0].password
      let name = user[0].name
      let email = user[0].email
      let state = user[0].state
      bcrypt.compare(password, hashpassword, (err, result) => {

        if (result) {
          jwt.sign({ userId: user[0]._id }, process.env.KEY, (er, token) => {
            if (token) {
              res.send({ "msg": "login successful", "token": token, "name": name, "email": email, userId: user[0]._id, "state": state, "person": user[0].person })
            } else {
              res.send({ "msg": "login failed! please signup first" })
            }
          })
        } else {
          res.send({ "msg": "login failed! please signup first" })
        }
      })
    } else {

      res.send({ "msg": "login failed! please signup first" })
    }
  } catch (error) {
    res.send({ "msg": error })

  }


})

module.exports = { studentRouter }