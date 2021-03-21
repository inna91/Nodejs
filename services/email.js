const Mailgen = require('mailgen');
const sgMail = require('@sendgrid/mail');
require('dotenv').config();

class EmailService {
  #sender = sgMail;
  #GenerateTemplate = Mailgen;
  constructor(env) {
    switch (env) {
      case 'development':
        this.link = 'http://localhost:3000';
        break;

      case 'stage':
        this.link = 'http://contacts-stage.heroku.com';
        break;

      case 'production':
        this.link = 'http://contacts.heroku.com';
        break;

      default:
        this.link = 'http://localhost:3000';
        break;
    }
  }
  #createTemplate(verificationToken, name = 'Guest') {
    const mailGenerator = new this.#GenerateTemplate({
      theme: 'cerberus',
      product: {
        name: 'Contacts',
        link: this.link,
      },
    });
    const template = {
      body: {
        name,
        intro: "Welcome! We're very excited to have you on board.",
        action: {
          instructions: 'To get started, please click here:',
          button: {
            color: '#22BC66',
            text: 'Confirm your account',
            link: `${this.link}/api/users/auth/verify/:${verificationToken}`,
          },
        },
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    };
    return mailGenerator.generate(template);
  }
  async sendEmail(verificationToken, email, name) {
    const emailBody = this.#createTemplate(verificationToken, name);
    this.#sender.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: email,
      from: 'inna1007@mail.ru',
      subject: 'Confirmation of registration',
      html: emailBody,
    };
    await this.#sender.send(msg);
  }
}

module.exports = EmailService;
