// pages/api/productCategoryStatus/[[...ids]].js

import conn from "../../dbconfig/conn";

// export const config = {
//     api: {
//       externalResolver: true,
//     }
//   }

export default async function handler(req, res) {
  if (req.method == "PATCH") {
    try {
      // Query the database
      const { ids } = req.query; // This will contain the array of IDs
      console.log(ids);

      // Destructure the IDs from the array
      const [prod_id, status] = ids;

      if (status == 1) {
        const sql = "UPDATE product_master SET status=0 WHERE product_id = ?";
        const [rows] = await conn.query(sql, [prod_id]);

        res.status(200).json(rows);
      } else {
        const sql = "UPDATE product_master SET status=1 WHERE product_id = ?";
        const [rows] = await conn.query(sql, [prod_id]);

        res.status(200).json(rows);
      }
    } catch (err) {
      res.status(401).json({ message: "Connection Error" });
    }
  }
}
