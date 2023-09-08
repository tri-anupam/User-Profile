import nodemailer from "nodemailer";
import Mailgen from "mailgen";

let nodeConfig = {
  host: "smtp.ethereal.email",
  port: 587,
  sucure: false,
  auth: {
    user: "andres.mann@ethereal.email",
    pass: "njt8ZMhVrhKRTJ9GsQ",
  },
};

let transporter = nodemailer.createTransport(nodeConfig);

let MailGenerator = new Mailgen({
  theme: "default",
  product: {
    name: "Mailgen",
    link: "https://mailgen.js/",
  },
});

export const registerMail = async (req, res) => {
  const { username, userEmail, text, subject } = req.body;

  var email = {
    body: {
      name: username,
      intro: text || "Welcome to our company.",
      outro:
        "Need help, or have question? Just reply to this email, we'd love to to help.",
    },
  };

  var emailBody = MailGenerator.generate(email);

  let message = {
    from: "andres.mann@ethereal.email",
    to: userEmail,
    subject: subject || "Signup Successfull",
    html: emailBody,
  };

  //send mail
  transporter.sendMail(message, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res
        .status(500)
        .send({ success: false, message: "Error while sending mail", error });
    }
    console.log("Email sent:", info.response);
    return res
      .status(200)
      .send({ message: "You should receive an email from us." });
  });
};
