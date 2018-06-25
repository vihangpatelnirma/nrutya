const nodeMailer = require("nodemailer")
const adminTemplate = require("./template")

console.log(adminTemplate)

const transporter = nodeMailer.createTransport({
	host: "smtp.gmail.com",
	port: 465,
	secure: true, // secure:true for port 465, secure:false for port 587
	auth: {
		user: process.env.user || 'nodevihang@gmail.com', 
		pass: process.env.pass || 'vihangnode10@',
	},
	tls: {
		// do not fail on invalid certs
		rejectUnauthorized: false,
	},
})

function getMailOptions(params) {
	// setup email data with unicode symbols
	const mailOptions = {
		from: process.env.email || 'nodevihang@gmail.com',  // sender address
		to: process.env.email || 'vihang.engg@gmail.com', // list of receivers
		subject: "[JalpaDance] Query From " + params.name, // Subject line
		text: "Following details are queried:", // plain text body
		html: adminTemplate(params),
	}

	return mailOptions
}

function sendEmail(params) {
	const data = { ...params }
	sendMailToAdmin(data)
}

function sendMailToAdmin(data) {
	const mailOptions = getMailOptions(data)
	transporter.sendMail(mailOptions, handler)
}

function handler(error, info) {
	if (error) {
		return console.log(error)
	}

	console.log("Message %s send : %s", info.messageId, info.respones)
	return true
}

module.exports = sendEmail