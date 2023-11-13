// api/category/[id].js

import conn from "../dbconfig/conn";
import path from "path";
import { IncomingForm } from "formidable";
import fs from "fs";

export default async function handler(req, res) {
  const { id } = req.query; // Get the dynamic ID from the URL parameter

  if (req.method === "GET") {
    try {
      const q = "SELECT * FROM `blog_category` WHERE blog_cate_id = ?";

      const data = [id];
      const [rows] = await conn.query(q, data);

      res.status(200).json(rows);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Can not Get category... check connection" });
    }
  }

  if (req.method == "DELETE") {
    try {
      const { id } = req.query;
      console.log(id);
      // Query the database
      const q = "DELETE FROM blog_category WHERE blog_cate_id = ?";

      const [rows] = await conn.query(q, [id]);

      // Process the data and send the response
      res.status(200).json(rows);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Cannot Delete Category... Check Connection" });
    }
  }

  if (req.method == "PATCH") {
    try {
        const form = new IncomingForm();
        form.parse(req, (err, fields, files) => {

            // check file exist or not
            if (!files) {
              return res.status(400).json({ message: "No files received." });
            }
    
          const {
            category_name,
            category_title,
            category_description,
            sub_category,
          } = fields;
          console.log(fields);
    
          let category_image = ""; // This variable will store the image name
    
          if (files.category_image && files.category_image.length > 0) {
            // Configuration for the new image
            const oldPath = files.category_image[0].filepath; // Old path of the uploaded image
            const nFileName = `${Date.now()}.${
              files.category_image[0].originalFilename
            }`;
            const newFileName = nFileName.replace(/\s/g, "");
            const projectDirectory = path.resolve(
              __dirname,
              "../../../../../public/assets/upload"
            );
            const newPath = path.join(projectDirectory, newFileName);
    
            // Copy the new image from the old path to the new path
            fs.copyFile(oldPath, newPath, (moveErr) => {
              if (moveErr) {
                console.log(moveErr);
                return res.status(500).json({ message: "File move failed." });
              }
            });
    
            category_image = newFileName; // Update the category_image variable with the new image name
          }
    
          const updateQuery =
            files.category_image && files.category_image.length > 0
              ? // If a new image is uploaded, update the image in the database
                "UPDATE blog_category SET category_name = ?, category_title = ?, category_description = ?, category_image = ?, sub_category = ? WHERE blog_cate_id = ?"
              : // If no new image is uploaded, retain the old image in the database
                "UPDATE blog_category SET category_name = ?, category_title = ?, category_description = ?, sub_category = ? WHERE blog_cate_id = ?";
    
          const queryParams =
            files.category_image && files.category_image.length > 0
              ? // Parameters for the update query if a new image is uploaded
                [
                  category_name,
                  category_title,
                  category_description,
                  category_image,
                  sub_category,
                  id,
                ]
              : // Parameters for the update query if no new image is uploaded
                [
                  category_name,
                  category_title,
                  category_description,
                  sub_category,
                  id,
                ];
    
          conn.query(updateQuery, queryParams, (err, result) => {
            if (err) {
              console.log(err);
              res
                .status(500)
                .json({ message: "Error updating product category data" });
            } else {
              res.status(200).json(result);
            }
          });
        });
    } catch (err) {
        console.log(err);
    }
  }
}
