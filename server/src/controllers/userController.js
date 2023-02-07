const jwt = require('jsonwebtoken');
const { User } = require('../models')
const config = require('../config/config')

function jwtSignUser(user) {
    const ONE_WEEK = 7 * 24 * 60 * 60
    return jwt.sign(user, config.JwtSecret, {
        expiresIn: ONE_WEEK
    })
}

module.exports = {
    findByID: (req, res) => {
        const {user} = req;
        
        if(!user) {
            return res.status(400).send('Server is having issues, please try again!');
        }

        return res.json(user)
    },

    async signup(req, res) {
        try {
            const user = await User.create(req.body)
            const userObjJson = user.toJSON();

            return res.send({user: userObjJson, token: jwtSignUser(userObjJson)})
        } catch(error) {
            //console.log(error)
            if(Object.keys(error.keyValue[0] === 'username')){
                return res.status(400).send({error: 'This username exists'})
            }
            return res.status(400).send({error: 'Something is wrong'})
        }
    },

    async login(req, res) {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({username})
            
            if(!user) {
                return res.status(400).send({error: "The login information is incorrect"})
            }
            
            const isPasswordValid = await user.verifyPassword(password)
            if(!isPasswordValid){
                return res.status(400).send({error: "The login information is incorrect"})
            }

            const userObjJson = user.toJSON();
            return res.send({
                user: userObjJson,
                token: jwtSignUser(userObjJson)
            })

        } catch(error) {
            return res.status(500).send({error: "Login function error"})
        }
    }
}