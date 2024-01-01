import conn from "../../dbconfig/conn";
import path from "path";
import { IncomingForm } from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method == "POST") {
    try {
      const form = new IncomingForm();
      form.parse(req, async (err, fields, files) => {
        // check if the resume file exists
        if (!files.resume) {
          try {
            const { name, email, number, salary, message, app_id } = fields;

            // SQL query for inserting data into the testimonial table
            const insertQuery =
              "INSERT INTO `contact_form`(`name`, `email`, `mobile`, `message`, `salary`, `app_id`, `identify_status`) VALUES (?, ?, ?, ?, ?, ?, ?)";
            const values = [name, email, number, message, salary, app_id, 1];

            // Execute the query
            const [result] = await conn.query(insertQuery, values);
            res.status(200).json(result, {
              message: "Inquiry Add Successfully",
            });
          } catch (error) {
            console.error("Error executing SQL query:", error);
            res.status(500).json({ message: "Inquiry Failed to Add" });
          }
        }

        // configuration of path and name for the resume
        const oldPathResume = files.resume[0].filepath; // Access the path of the uploaded Resume

        // new path and name for the Resume
        const nFileNameResume = `${Date.now()}.${
          files.resume[0].originalFilename
        }`;

        // remove spaces from the image name
        const newFileNameResume = nFileNameResume.replace(/\s/g, "");

        // project directory for storing images
        const projectDirectory = path.resolve(
          __dirname,
          "../../../../../../public/assets/upload/career"
        );

        // combine path and image name
        const newPathResume = path.join(projectDirectory, newFileNameResume);

        // Copy the uploaded image to the new path
        fs.copyFile(oldPathResume, newPathResume, async (moveErr1) => {
          if (moveErr1) {
            res.status(500).json({ message: "Document Upload failed." });
          } else {
            // Extracting fields from the request
            const { name, email, number, salary, message, app_id } = fields;

            // SQL query for inserting data into the testimonial table
            const insertQuery =
              "INSERT INTO `contact_form`(`name`, `email`, `mobile`, `message`, `salary`, `resume`, `app_id`, `identify_status`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
            const values = [
              name,
              email,
              number,
              message,
              salary,
              newFileNameResume,
              app_id,
              1,
            ];

            // Execute the query
            const [result] = await conn.query(insertQuery, values);
            res.status(200).json(result, {
              message: "Inquiry Add Successfully",
            });
          }
        });
      });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Inquiry Failed to Add... Check connection" });
    }
  }
  if (req.method == "GET") {
    try {
      // Query the database

      const q =
        "SELECT `carrer_title`, `carrer_keyword`, `carrer_desc`, `carrer_canonical` FROM `pages_seo`";
      console.log(q);
      const [rows] = await conn.query(q);
      console.log(rows);
      // Process the data and send the response
      res.status(200).json(rows);
    } catch (err) {
      res.status(401).json({ message: "Connection Error" });
    } finally {
      conn.releaseConnection();
    }
  }
}
