const nodemailer = require('nodemailer');
const DatabaseController = require('./database');

class emailService {

  static sendResetPasswordEmail = async (email) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "prospernet24@gmail.com",
        pass: "wzeiaehmmbkohvku"
      }
    });

var newPass = generateString(10);
    const filter = { email: email };
    const update = { $set: { password: newPass } };
    DatabaseController.updateItem("users", filter, update)

    let mailOptions = {
      from: 'prospernet24@gmail.com',
      to: email,
      subject: 'Password Reset Request',
      text: 'Your password reset link...', 
      html: `<h1>Your new password</h1></br><h3>${newPass}</h3>`, 
    };

    //send email
    var result = await transporter.sendMail(mailOptions, function(error,info) {
      if(error){
        console.log(error);
      }
      else {
        console.log("Email sent: "+info)
      }
    });
  }

}


function generateString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-={}[]|?/><';
  let result = '';
  for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

module.exports = emailService;