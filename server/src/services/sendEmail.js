const nodemailer = require('nodemailer')

const sendEmail = (options) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'jj2023tt@gmail.com',
            pass: 'blacksaga8'
        }
    })

    const mailOptions = {
        from: "jj2023tt@gmail.com",
        to: "juniortanaya@gmail.com",
        subject: options.subject,
        html: options.text
    }

    transporter.sendEmail(mailOptions, function(err, info) {
        if(err) {
            console.log(err)
        } else {
            console.log(info)
        }
    })
}

module.exports = sendEmail