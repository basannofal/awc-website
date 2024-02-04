import conn from "../../../dbconfig/conn";
import { IncomingForm } from "formidable";
import nodemailer from "nodemailer";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method == "POST") {
    const form = new IncomingForm();
    form.parse(req, async (err, fields, files) => {
      try {
        const { name, email, number, message } = fields;
        console.log(fields);
        // Database operation
        const [row] = await conn.query("INSERT INTO contact_form SET ? ", {
          name: name,
          email: email,
          mobile: number,
          message: message,
        });

        // Send email
        await sendContactEmail({ name, email, number, message });

        res.status(200).json(row);
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to Add Product Category" });
      } finally {
        conn.releaseConnection();
      }
    });
  }
}

async function sendContactEmail({ name, email, number, message }) {
  // Create a Nodemailer transporter using your email service provider details
  const transporter = nodemailer.createTransport({
    service: process.env.NEXT_PUBLIC_EMAIL_SERVICE,
    auth: {
      user: process.env.NEXT_PUBLIC_EMAIL,
      pass: process.env.NEXT_PUBLIC_EMAIL_PASS,
    },
  });
  // Email content
  const mailOptions = {
    from: process.env.NEXT_PUBLIC_EMAIL,
    to: email,
    subject: "Thank you for contacting us!",
    html: `
      <html>
      <body style="font-family: 'Arial', sans-serif; line-height: 1.5; background-color: #e9eaec; padding: 50px 20px;">
      <div style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px;">
  
            <h1 style="color:black;">Contact Inquiry</h1>
  
            <div>
              <label style="font-weight:bold; color:black;">Name</label>
              <div style="padding-top: 5px; color:black;">
                ${name}
                <hr />
              </div>
            </div>
            <div>
              <label style="font-weight:bold; color:black;">Email</label>
              <div style="padding-top: 5px;">
                ${email}
                <hr />
              </div>
            </div>
            <div>
              <label style="font-weight:bold; color:black;">Phone</label>
              <div style="padding-top: 5px; color:black;">
                +91${number}
                <hr />
              </div>
            </div>
            <div>
              <label style="font-weight:bold; color:black;">Message</label>
              <div style="padding-top: 5px; color:black;">
                ${message}
                <hr />
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
  };

  // Send the email
  await transporter.sendMail(mailOptions);
}
