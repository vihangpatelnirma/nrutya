
 const NAME_REGEX = "^[A-Za-z\\s]+$"
 const EMAIL_REGEX = "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$"
 const PHONE_NO_REGEX = "^[6789]\\d{9}$"
 const ALPHA_NUMERIC = "[0-9a-zA-Z]+"

 const verifyName = name => new RegExp(NAME_REGEX).test(name)
 const verifyEmail = email => new RegExp(EMAIL_REGEX).test(email)
 const verifyPhoneNumber = phone => new RegExp(PHONE_NO_REGEX).test(phone)

module.exports = {
    verifyName ,
    verifyEmail ,
    verifyPhoneNumber
}