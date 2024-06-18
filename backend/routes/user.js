const express = require('express')
const user = require('../models/User')
const auth = require('../middleware/auth')

const router = express.Router()

router.get('/me', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    } catch {
        res.status(500).send('Server Error')
    }
})

module.exports = router