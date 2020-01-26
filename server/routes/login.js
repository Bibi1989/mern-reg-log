const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

const Signups = require('../model/signup')

const { validateEmail } = require('../controllers/emailValidation')

router.post('/', (req, res) => {
    const { email, password } = req.body
    // if(!email) return res.status(404).json({msg: "email required"})
    // if(validateEmail(email)) return res.status(404).json({msg: "Invalid Email"})
    // if(!password) return res.status(404).json({msg: "password required"})
    // if(password.length < 6) return res.status(404).json({msg: "password should not be less than 6 characters"})
    if(!email) return res.redirect('http://localhost:3002/signin')
    if(validateEmail(email)) return res.redirect('http://localhost:3002/signin')
    if(!password) return res.redirect('http://localhost:3002/signin')
    if(password.length < 6) return res.redirect('http://localhost:3002/signin')
    

    Signups.find({
        email: email
    }, (err, doc) => {
        console.log(doc)
        if(err) return res.status(404).json({msg: "server error"})
        if(doc === null) return res.status(404).json({msg: "Wrong email"})

        
        validatedPassword = bcrypt.compareSync(password, doc[0].password)
        if(!validatedPassword) return res.redirect('http://localhost:3002/signin')
        // if(!validatedPassword) return res.status(404).json("Password is wrong or you have not register")

        // res.status(200).json({msg: "Welcome"})
        return res.redirect('http://localhost:3002/home')
    })
})


module.exports = router