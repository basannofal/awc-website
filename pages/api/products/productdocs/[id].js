// api/category/[id].js

import conn from "../../dbconfig/conn";
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
      const q = "SELECT * FROM `product_docs` WHERE product_id = ?";

      const data = [id];
      const [rows] = await conn.query(q, data);

      res.status(200).json(rows);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Can not Get category... check connection" });
    }finally {
      conn.releaseConnection();
    }
  }

  if (req.method == "DELETE") {
    try {
      console.log("REAC");
      const { id } = req.query;

      // first get product data
      const [product] = await conn.query(
        "SELECT pdf_link FROM  product_docs WHERE prod_docs_id = ?",
        [id]
      );

      console.log(product);

      // Query for delete data
      const q = "DELETE FROM product_docs WHERE prod_docs_id = ?";

      const [rows] = await conn.query(q, [id]);

      //check docs awailable or not
      let productDocs = "";
      if (product.length != 0) {
        productDocs = product[0].pdf_link;
        const projectDirectory = path.resolve(
          __dirname,
          "../../../../../../public/assets/upload/products/productDocs"
        );
        const newPath = path.join(projectDirectory, productDocs);
        console.log(newPath);
        await unlink(newPath);
      }

      // Process the data and send the response
      res.status(200).json(rows);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Cannot Delete Product Docs... Check Connection" });
    }finally {
      conn.releaseConnection();
    }
  }

  if (req.method == "PATCH") {
    try {
      const form = new IncomingForm();
      form.parse(req, async (err, fields, files) => {
        // check file exist or not
        const {
          cate_id,
          product_title,
          product_short_desc,
          product_long_desc,
          meta_tag,
          meta_desc,
          meta_keyword,
          canonical_url,
        } = fields;

        // get product data
        const [product] = await conn.query(
          "SELECT product_image FROM product_docs WHERE prod_docs_id = ?",
          [id]
        );

        let sql = "";
        let params = [];
        let result = "";

        const upadatedDate = new Date()
          .toISOString()
          .slice(0, 19)
          .replace("T", " ");

        if (!files.product_image) {
          sql =
            "UPDATE `product_docs` SET `cate_id`= ?, `product_title`= ?, `product_short_desc`= ?, `product_long_desc`= ?, `meta_tag`= ?, `meta_desc`= ?, `meta_keyword`= ?, `canonical_url`= ?, `updated_date`= ?  WHERE product_id = ?";

          params = [
            cate_id,
            product_title,
            product_short_desc,
            product_long_desc,
            meta_tag,
            meta_desc,
            meta_keyword,
            canonical_url,
            upadatedDate,
            id,
          ];
          result = await conn.query(sql, params);

        } else {
          // Configuration for the new image
          const oldPath = files.product_image[0].filepath; // Old path of the uploaded image
          const nFileName = `${Date.now()}.${
            files.product_image[0].originalFilename
          }`;
          const newFileName = nFileName.replace(/\s/g, "");
          const projectDirectory = path.resolve(
            __dirname,
            "../../../../../public/assets/upload/products"
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
            "UPDATE `product_docs` SET `cate_id`= ?, `product_title`= ?, `product_short_desc`= ?, `product_long_desc`= ?, `meta_tag`= ?, `meta_desc`= ?, `meta_keyword`= ?, `canonical_url`= ?, `product_image`= ?, `updated_date`= ?  WHERE product_id = ?";

          params = [
            cate_id,
            product_title,
            product_short_desc,
            product_long_desc,
            meta_tag,
            meta_desc,
            meta_keyword,
            canonical_url,
            newFileName,
            upadatedDate,
            id,
          ];
          result = await conn.query(sql, params);
          // Delete the old image
          if (product.length !== 0) {
            const oldImage = product[0].product_image;
            const oldImagePath = path.join(projectDirectory, oldImage);
            await unlink(oldImagePath);
          }
        }

        res.status(200).json(result);
      });
    } catch (err) {
      res.status(500).json({ message: "Category Updation Failed" });
    }finally {
      conn.releaseConnection();
    }
  }
}
