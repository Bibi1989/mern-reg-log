const express = require('express')
const router = express.Router()

const Signups = require('../model/signup')

router.get('/', (req, res) => {
    Signups.find({}, {password: 0}, (err, doc) => {
        if(err) return res.status(404).json({err: "error while fetching"})
        res.status(200).json(doc)
    })
})

module.exports = router