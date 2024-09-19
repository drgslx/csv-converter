"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true); // Set loading to true before fetching data
      try {
        const response = await fetch("/api/db-convert"); // Fetching from the Next.js API route
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched or an error occurs
      }
    }

    fetchData();
  }, []);

  // Extract headers from the data if it exists
  const headers = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <div className="mx-auto">
      <h1 className="text-2xl font-bold">CSV Data:</h1>
      {loading ? (
        <p>Loading...</p> // Display loading message while fetching data
      ) : data.length > 0 ? (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-200">
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  className="px-6 py-12 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  <p className="px-2 mx-auto flex flex-row justify-between">
                    {header}
                  </p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 max-w-2xl">
            {data.slice(0, 7).map((index) => (
              <tr key={index}>
                {headers.map((header) => (
                  <td
                    key={header}
                    className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                  >
                    <div className="px-12">{[header]}</div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data available yet</p>
      )}
    </div>
  );
}
