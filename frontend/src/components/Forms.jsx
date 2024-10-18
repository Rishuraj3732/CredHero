import React, { useState } from 'react';

export default function Forms() {
  const [formData, setFormData] = useState({
    credit_lines_outstanding: '',
    loan_amt_outstanding: '',
    total_debt_outstanding: '',
    income: '',
    years_employed: '',
    fico_score: ''
  });

  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [errorMessage, setErrorMessage] = useState(''); // State to store error messages

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Reset error message before a new submission

    try {
      const response = await fetch('http://127.0.0.1:8000/predictions/predict/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Check if the response is ok (status in the range 200-299)
      if (!response.ok) {
        const errorResult = await response.json(); // Get the error details
        setErrorMessage(errorResult.error || 'An unknown error occurred.');
        return; // Exit the function, no need to process further
      }

      // Process successful response
      const result = await response.json();
      alert(`Loan Decision: ${result.loan_decision ? 'Approved' : 'Denied'}`); // Display loan decision based on the API response
      setIsModalOpen(true); // Open the modal on success

    } catch (error) {
      // Handle network or other unexpected errors
      setErrorMessage('Failed to submit the form. Please check your internet connection or try again later.');
      console.error('Error:', error);
    }
  };
  return (
    <>
      {/* Form Container */}
       {/* Flexbox to center the form container */}
        <form className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm mx-96 grid grid-cols-2 gap-6" onSubmit={handleSubmit}>
          {/* Row 1 */}
          <div className="col-span-1">
            <label htmlFor="credit_lines_outstanding" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Credit Lines Outstanding</label>
            <input
              type="number"
              id="credit_lines_outstanding"
              name="credit_lines_outstanding"
              value={formData.credit_lines_outstanding}
              onChange={handleChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>

          <div className="col-span-1">
            <label htmlFor="loan_amt_outstanding" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Loan Amount Outstanding</label>
            <input
              type="number"
              id="loan_amt_outstanding"
              name="loan_amt_outstanding"
              value={formData.loan_amt_outstanding}
              onChange={handleChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>

          {/* Row 2 */}
          <div className="col-span-1">
            <label htmlFor="total_debt_outstanding" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Total Debt Outstanding</label>
            <input
              type="number"
              id="total_debt_outstanding"
              name="total_debt_outstanding"
              value={formData.total_debt_outstanding}
              onChange={handleChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>

          <div className="col-span-1">
            <label htmlFor="income" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Income</label>
            <input
              type="number"
              id="income"
              name="income"
              value={formData.income}
              onChange={handleChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>

          {/* Row 3 */}
          <div className="col-span-1">
            <label htmlFor="years_employed" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Years Employed</label>
            <input
              type="number"
              id="years_employed"
              name="years_employed"
              value={formData.years_employed}
              onChange={handleChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>

          <div className="col-span-1">
            <label htmlFor="fico_score" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">FICO Score</label>
            <input
              type="number"
              id="fico_score"
              name="fico_score"
              value={formData.fico_score}
              onChange={handleChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>

          {/* Submit Button - spans both columns */}
          <div className="col-span-2 text-center">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Submit
            </button>
          </div>
        </form>
    

      {/* Modal (Popup) */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm text-center">
            <h2 className="text-xl font-semibold mb-4">Success</h2>
            <p>Form submitted successfully!</p>
            <button
              onClick={() => setIsModalOpen(false)} // Close modal
              className="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
