import pool from '../../../config/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    console.log('Fetching data from the database...');
    const selectQuery = `
      SELECT id, name, address, city, image
      FROM schooldb.schools
    `;

    pool.query(selectQuery, (err, results) => {
      if (err) {
        console.error('Error fetching data:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      console.log('Data fetched successfully:', results);

      const schools = results.map((school) => ({
        id: school.id,
        name: school.name,
        address: school.address,
        city: school.city,
        imageName: school.image, 
      }));

      console.log('Sending response:', schools);
      return res.status(200).json(schools);
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
