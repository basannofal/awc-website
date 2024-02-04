import conn from "../../../dbconfig/conn";
import { IncomingForm } from "formidable";
import nodemailer from "nodemailer";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  console.log("*****************************");
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
    service: "gmail",
    auth: {
      user: "india.awc@gmail.com",
      pass: "mezj izbg ofpn dcgc",
    },
  });
  console.log(transporter);
  // Email content
  const mailOptions = {
    from: "india.awc@gmail.com", // Sender address
    to: email, // Recipient address (user's email)
    subject: "Thank you for contacting us!",
    text: `
      Dear ${name},

      Thank you for contacting us. We received your message.

      Details:
      Email: ${email}
      Phone Number: ${number}
      Message: ${message}

      We will get back to you as soon as possible.

      Best regards,
      Your Company Name
    `,
  };

  // Send the email
  await transporter.sendMail(mailOptions);
}
