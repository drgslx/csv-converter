"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    setLoading(true); // Set loading to true before fetching data
    try {
      const response = await fetch("/api/get-json"); // Fetching from the Next.js API route
      await response.json();
      setData(users);
    } catch (error) {
      console.error("Error fetching data:", error);
    } 
      setLoading(false); // Set loading to false after data is fetched or an error occurs
  }

  useEffect(() => {
    fetchData();
  }, []);

  // Extract headers from the data if it exists

  return (
    <div className="mx-auto">
      <h1 className="text-2xl font-bold">JSON Data:</h1>

      {loading ? (
        <p>Loading...</p> // Display loading message while fetching data
      ) : data.length > 0 ? (
        <div>
          {data.map((user, index) => (
            <p key={index}>{user.name}</p>
          ))}
        </div>
      ) : (
        <p>No data available yet</p>
      )}
    </div>
  );
}
