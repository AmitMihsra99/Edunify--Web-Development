// pages/api/insertData.js
import pool from '../../../config/db';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const imageDirectory = path.join(process.cwd(), 'public', 'schoolImages');
    cb(null, imageDirectory);
  },
  filename: (req, file, cb) => {
    const imageFileName = `${Date.now()}_${file.originalname}`;
    cb(null, imageFileName);
  },
});

const upload = multer({ storage: storage });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  try {
    await new Promise((resolve, reject) => {
      upload.single('image')(req, res, (err) => {
        if (err) {
          reject(err);
        } else {
          // Log file path after successful upload
          if (req.file) {
            console.log('File path:', req.file.path);
            console.log('File name:', req.file.filename); // Check if 'filename' is available
          }
          resolve();
        }
      });
    });

    const newData = req.body; // Assuming the data is sent in the request body

    const insertQuery = `
        INSERT INTO schools (name, address, city, state, contact, image, email_id) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    pool.query(insertQuery, [
      newData.name,
      newData.address,
      newData.city,
      newData.state,
      newData.contact,
      req.file.filename, // Use 'filename' instead of 'imageFileName'
      newData.email_id,
    ], (err, results) => {
      if (err) {
        console.error('Error inserting data:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      console.log('Database insertion successful:', results);

      return res.status(200).json({
        message: 'Data inserted successfully',
        insertedId: results.insertId,
        affectedRows: results.affectedRows,
      });
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
