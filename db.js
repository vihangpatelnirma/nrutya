const dbName = "natraj"
const collectionName = "contacts"

// Strictly this should not fall in anyone's hand
const mongoSecret = process.env.mongoSecret
const listData = `https://api.mlab.com/api/1/databases/${dbName}/collections/contacts?apiKey=${mongoSecret}`
const insertData = `https://api.mlab.com/api/1/databases/${dbName}/collections/contacts?apiKey=${mongoSecret}`

const axios = require("axios")
const utils = require("./mailer/utils")
const mailer = require("./mailer")

function saveInDb(req, res) {
	var data = req.body

	var rowObject = {
        name: data.name,
        age:data.age,
		phone: data.phone,
		email: data.email,
        class: data.class,
        source: data.source,
		timestamp: Date.now(),
	}

	if (!validateData(rowObject)) {
		res.json({
			success: false,
			message: "Invalid name/email/phone number",
		})
		return
	}

	axios.post(insertData, rowObject).then(response => {
		if (response.message) {
			res.json({
				success: false,
				message: resposne.message,
			})
		} else {
			res.json({
				success: true,
			})
		}
	})

	try {
		mailer(rowObject)
	} catch (e) {
		console.log("error occurred while sending mail to : ", rowObject.email, " error : ", e)
	}
}

function getData(req, res) {
	const { secret } = req.body

	if (secret !== "batman") {
		res.json({
			success: false,
			message: "Unauthorized Attempt",
		})
	}

	axios.get(listData).then(response => {
		return res.json({
			success: true,
			data: response.data.reverse().map(lead => {
				return {
					name: lead.name,
                    age : lead.age,
                    source :lead.source,
                    class : lead.class,
					phone: lead.phone,
					email: lead.email,
					timestamp: lead.timestamp,
				}
			}),
		})
	})
}

function validateData(data) {
	const { name, email, phone } = data

	return (
		(!phone ? true : utils.verifyPhoneNumber(phone)) &&
		utils.verifyName(name) &&
		utils.verifyEmail(email)
	)
}

module.exports = {
	saveInDb: saveInDb,
	getData: getData,
}