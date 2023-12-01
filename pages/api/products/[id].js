// api/category/[id].js

import conn from "../dbconfig/conn";
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
      const q = "SELECT * FROM `product_master` WHERE product_id = ?";

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

  if (req.method == "DELETE") {
    try {
      // Begin transaction
      await conn.query("BEGIN");

      const { id } = req.query;

      // 1. First, get product data
      const [product] = await conn.query(
        "SELECT product_image FROM  product_master WHERE product_id = ?",
        [id]
      );

      // 2. Check if product has images in product_images table
      const [images] = await conn.query(
        "SELECT prod_image_id, product_image FROM product_images WHERE product_id = ?",
        [id]
      );

      // 3. Delete images from the file system and product_images table
      for (const image of images) {
        const imagePath = path.join(
          __dirname,
          "../../../../../public/assets/upload/products/productImages",
          image.product_image
        );

        await unlink(imagePath);

        await conn.query("DELETE FROM product_images WHERE prod_image_id = ?", [
          image.prod_image_id,
        ]);
      }

      // 4. Check if product has images in product_images table
      const [videos] = await conn.query(
        "SELECT prod_video_id, video_thumbnail FROM product_video WHERE product_id = ?",
        [id]
      );

      // 5. Delete images from the file system and product_images table
      for (const video of videos) {
        const videoPath = path.join(
          __dirname,
          "../../../../../public/assets/upload/products/productVedios",
          video.video_thumbnail
        );

        await unlink(videoPath);

        await conn.query("DELETE FROM product_video WHERE prod_video_id = ?", [
          video.prod_video_id,
        ]);
      }

      // 6. Check if product has images in product_images table
      const [docs] = await conn.query(
        "SELECT prod_docs_id, pdf_link FROM product_docs WHERE product_id = ?",
        [id]
      );

      // 7. Delete images from the file system and product_images table
      for (const doc of docs) {
        const docPath = path.join(
          __dirname,
          "../../../../../public/assets/upload/products/productDocs",
          doc.pdf_link
        );

        await unlink(docPath);

        await conn.query("DELETE FROM product_docs WHERE prod_docs_id = ?", [
          doc.prod_docs_id,
        ]);
      }

      // 8. Delete the product from the product_master table
      const q = "DELETE FROM product_master WHERE product_id = ?";

      const [rows] = await conn.query(q, [id]);

      //check image awailable or not
      let productImage = "";
      if (product.length != 0) {
        productImage = product[0].product_image;
        const projectDirectory = path.resolve(
          __dirname,
          "../../../../../public/assets/upload/products"
        );
        const newPath = path.join(projectDirectory, productImage);
        console.log(newPath);
        await unlink(newPath);
      }
      // 9. Commit the transaction
      await conn.query("COMMIT");

      // Process the data and send the response
      res.status(200).json(rows);
    } catch (error) {
      console.log(error);

      // If an error occurs, rollback the transaction
      await conn.query("ROLLBACK");

      res
        .status(500)
        .json({ message: "Cannot Delete Category... Check Connection" });
    } finally {
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
          "SELECT product_image FROM product_master WHERE product_id = ?",
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
            "UPDATE `product_master` SET `cate_id`= ?, `product_title`= ?, `product_short_desc`= ?, `product_long_desc`= ?, `meta_tag`= ?, `meta_desc`= ?, `meta_keyword`= ?, `canonical_url`= ?, `updated_date`= ?  WHERE product_id = ?";

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
          //check! is this image ?
          const allowedImageExtensions = [".jpg", ".jpeg", ".png"];
          const fileExtension = path
            .extname(files.product_image[0].originalFilename)
            .toLowerCase();

          if (!allowedImageExtensions.includes(fileExtension)) {
            return res
              .status(400)
              .json({ message: "Only image files are allowed." });
          }

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
            "UPDATE `product_master` SET `cate_id`= ?, `product_title`= ?, `product_short_desc`= ?, `product_long_desc`= ?, `meta_tag`= ?, `meta_desc`= ?, `meta_keyword`= ?, `canonical_url`= ?, `product_image`= ?, `updated_date`= ?  WHERE product_id = ?";

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
    } finally {
      conn.releaseConnection();
    }
  }
}
