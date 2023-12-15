// api/category/[id].js

import conn from "../../../dbconfig/conn";
import path from "path";
import { IncomingForm } from "formidable";
import fs from "fs";
const { unlink } = require("fs").promises;

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const { id } = req.query; // Get the dynamic ID from the URL parameter

  if (req.method === "GET") {
    try {
      const q = "SELECT * FROM `product_docs` WHERE prod_docs_id = ?";

      const data = [id];
      const [rows] = await conn.query(q, data);

      res.status(200).json(rows);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Can not Get category... check connection" });
    } finally {
      conn.releaseConnection();
    }
  }

  if (req.method == "PATCH") {
    try {
      const form = new IncomingForm();
      form.parse(req, async (err, fields, files) => {
        // check file exist or not
        const { pdf_title, pdf_link } = fields;

        let sql = "";
        let params = [];
        let result = "";

        if (!files.pdf_link) {
          sql =
            "UPDATE `product_docs` SET `pdf_title`= ? WHERE prod_docs_id = ?";

          params = [pdf_title, id];
          result = await conn.query(sql, params);
        } else {
          //check! is this image ?
          const allowedImageExtensions = [".pdf"];
          const fileExtension = path
            .extname(files.pdf_link[0].originalFilename)
            .toLowerCase();

          if (!allowedImageExtensions.includes(fileExtension)) {
            return res
              .status(400)
              .json({ message: "Only PDF files are allowed." });
          }

          // get Old Image data
          const [productDocs] = await conn.query(
            "SELECT pdf_link FROM product_docs WHERE prod_docs_id = ?",
            [id]
          );
          // Configuration for the new image
          const oldPath = files.pdf_link[0].filepath; // Old path of the uploaded image
          const nFileName = `${Date.now()}.${files.pdf_link[0].originalFilename
            }`;
          const newFileName = nFileName.replace(/\s/g, "");
          const projectDirectory = path.resolve(
            __dirname,
            "../../../../../../../public/assets/upload/products/productDocs"
          );
          const newPath = path.join(projectDirectory, newFileName);

          // Copy the new image from the old path to the new path
          fs.copyFile(oldPath, newPath, (moveErr) => {
            if (moveErr) {
              console.log(moveErr);
              return res.status(500).json({ message: "File move failed." });
            }
          });

          sql =
            "UPDATE `product_docs` SET `pdf_title`= ?, `pdf_link`= ? WHERE prod_docs_id = ?";

          params = [pdf_title, newFileName, id];
          result = await conn.query(sql, params);
          if (productDocs.length !== 0) {
            const oldImage = productDocs[0].pdf_link;
            const oldImagePath = path.join(projectDirectory, oldImage);
            await unlink(oldImagePath);
          }
        }

        // Delete the old image
        res.status(200).json(result);
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Product Images Updation Failed" });
    } finally {
      conn.releaseConnection();
    }
  }
}
