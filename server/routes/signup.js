const express = require('express')
const router = express()
const bcrypt = require('bcryptjs')

const Signups = require('../model/signup')

const { validateEmail } = require('../controllers/emailValidation')

router.post('/', async (req, res) => {
    const { firstname, lastname, email, password } = req.body
    
    if(!firstname) return res.status(404).json({msg: "firstname required"})
    if(!lastname) return res.status(404).json({msg: "lastname required"})
    if(!email) return res.status(404).json({msg: "email required"})
    if(!password) return res.status(404).json({msg: "password required"})
    if(password.length < 6) return res.status(404).json({msg: "password should not be less than 6 characters"})
    if(validateEmail(email)) return res.status(404).json({msg: "Invalid Email"})
    
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hashSync(password, salt)

    Signups.find({
        email: email
    }, (err, doc) => {
        if(err) return res.status(404).json({msg: "server error"})
        // if(doc.length > 0) return res.status(404).json({msg: "email exist"})
        if(doc.length > 0) return res.redirect('http://localhost:3002')

        const user = new Signups({
            firstname,
            lastname,
            email,
            password: hashedPassword
        })
        user.save((err, response) => {
            if(err) return res.status(404).json({msg: "something went wrong on the server"})
            return res.redirect('http://localhost:3002/signin')
            // return res.status(200).json({msg: response})
        })
    })
})



module.exports = router