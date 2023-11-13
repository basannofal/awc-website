// api/category/[id].js

import conn from "../dbconfig/conn";
import path from "path";
import { IncomingForm } from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

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
      form.parse(req, async (err, fields, files) => {
        const {
          category_title,
          category_description,
          meta_tag,
          meta_desc,
          meta_keyword,
          canonical_url,
          category_image,
          category_icon,
        } = fields;

        let sql = "";
        let params = [];

        if (!files.category_icon && !files.category_image) {
          // No new images provided, updating other fields
          sql =
            "UPDATE `blog_category` SET `category_title`= ?, `category_description`= ?, `meta_tag`= ?, `meta_desc`= ?, `meta_keyword`= ?, `canonical_url`= ?, `category_image`= ?, `category_icon`= ?  WHERE blog_cate_id = ?";

          params = [
            category_title,
            category_description,
            meta_tag,
            meta_desc,
            meta_keyword,
            canonical_url,
            category_image,
            category_icon,
            id,
          ];
        } else {
          // Check and update each image if provided
          const updateImages = (imageField, imageFile, index) => {
            if (imageFile) {
              const oldPath = imageFile[0].filepath;
              const nFileName = `${Date.now()}_${index}.${
                imageFile[0].originalFilename
              }`;
              const newFileName = nFileName.replace(/\s/g, "");
              const projectDirectory = path.resolve(
                __dirname,
                "../../../../../public/assets/upload/blog"
              );
              const newPath = path.join(projectDirectory, newFileName);

              fs.copyFile(oldPath, newPath, (moveErr) => {
                if (moveErr) {
                  console.log(moveErr);
                  return res
                    .status(500)
                    .json({ message: `File ${index} Upload failed.` });
                }
              });

              return newFileName;
            }
            return imageField;
          };

          // Update images if provided
          let updatedimage = category_image;
          let updatedicon = category_icon;

          if (files.category_image) {
            updatedimage = updateImages(
              category_image,
              files.category_image,
              1
            );
          } 
          
          if (files.category_icon) {
            updatedicon = updateImages(
              category_icon,
              files.category_icon,
              2
            );
          }

          // SQL query for updating the database with new images
          sql =
          "UPDATE `blog_category` SET `category_title`= ?, `category_description`= ?, `meta_tag`= ?, `meta_desc`= ?, `meta_keyword`= ?, `canonical_url`= ?, `category_image`= ?, `category_icon`= ?  WHERE blog_cate_id = ?";

          params = [
            category_title,
            category_description,
            meta_tag,
            meta_desc,
            meta_keyword,
            canonical_url,
            updatedimage,
            updatedicon,
            id,
          ];
        }

        const result = await conn.query(sql, params);
        res.status(200).json(result);
      });
    } catch (err) {
      console.log(err);
    }
  }
}
