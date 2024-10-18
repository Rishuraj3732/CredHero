import React, { useState } from 'react';

function Searchpage() {
  const [searchTerm, setSearchTerm] = useState(''); // To store search input
  const [filteredResults, setFilteredResults] = useState([]); // To store search results
  const [error, setError] = useState(null); // To handle errors

  // Handle search input change
  const handleSearch = async (e) => {
    setSearchTerm(e.target.value);

    if (e.target.value === '') {
      setFilteredResults([]); // Clear results if search is empty
    } else {
      try {
        const response = await fetch(`http://localhost:8080/api/details/city?city=${e.target.value}`);
        if (!response.ok) {
          throw new Error('Error fetching data');
        }
        const data = await response.json();
        setFilteredResults(data);
      } catch (error) {
        console.error('Error fetching details:', error);
        setError('Unable to fetch results. Please try again later.');
      }
    }
  };

  return (
    <>
      {/* Search form */}
      <form className="mx-96 w-3/6" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Locations..."
            value={searchTerm}
            onChange={handleSearch}
            required
          />
        </div>
      </form>

      {/* Search results */}
      <div className="mt-6 mx-96 w-3/6">
        {error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : filteredResults.length > 0 ? (
          <ul className="bg-white p-4 rounded-lg shadow-md">
            {filteredResults.map((detail) => (
              <li key={detail.id} className="p-2 border-b border-gray-200">
                <p className="font-semibold">Owner: {detail.ownerName}</p>
                <p>City: {detail.city}</p>
                <p>Phone: {detail.phone}</p>
                <p>Address: {detail.address}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-600">No results found</p>
        )}
      </div>
    </>
  );
}

export default Searchpage;
