import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import styles from "./ShowSchool.module.css";

const ShowSchools = () => {
  const [schools, setSchools] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("api/showSchool");
        setSchools(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const filteredSchools = schools.filter(
    (school) =>
      school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link className={styles.link} href="/">
          Add-Data
        </Link>
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search Your School ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <h1> Your-Schools</h1>
      <div className={styles.schoolList}>
        {filteredSchools.map((school) => (
          <div key={school.id} className={styles.schoolCard}>
            {/* Updated img tag */}
            <img
              src={`/schoolImages/${school.imageName}`} 
              alt={school.name}
              onError={(e) => console.error("Error loading image:", e)}
            />
            <div className={styles.schoolInfo}>
              <h2>{school.name}</h2>
              <p>Address: {school.address}</p>
              <p>City: {school.city}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowSchools;
