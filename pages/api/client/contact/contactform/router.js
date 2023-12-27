import conn from "../../../dbconfig/conn";
import { IncomingForm } from "formidable";

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
        // db operation
        const [row] = await conn.query(
          "INSERT INTO contact_form SET ? ",
          {
            name: name,
            email: email,
            mobile: number,
            message: message,
          }
        );
        res.status(200).json(row);
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to Add Product Category" });
      }
      finally {
        conn.releaseConnection();
      }
    });
  }
}
