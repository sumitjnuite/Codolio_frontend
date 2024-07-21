import React, { useState } from "react";

const PopupModal = () => {
  // ------------------------
  const [isOpen, setIsOpen] = useState(false); // to open close form model
  // Initialize selectedField with 'Income' to ensure one element is always selected
  const [selectedField, setSelectedField] = useState("Income");
  const [formData, setFormData] = useState({
    // type: "",
    date: "",
    amount: "",
    category: "",
    title: "",
    notes: "",
  });

  // ---------------
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  // --------------------------

  const handleSelectField = (field) => {
    setSelectedField(field);
  };

  const getFieldStyle = (field) => {
    if (selectedField === field) {
      return field === "Income"
        ? { backgroundColor: "#ebffce" }
        : { backgroundColor: "#fee4e3" };
    }
    return {};
  };

  //   ---------------------

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const transactionData = {
      type: selectedField === "Income" ? "Income" : "Expense",
      ...formData,
    };

    console.log("Transaction Data:", transactionData);

    // Perform further actions such as sending the data to a server or updating the state
    // Example:
    // addTransaction(transactionData);
    // Or if using a server:
    await fetch('http://localhost:4000/api/transaction/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transactionData),
    });

    // Close the modal
    setIsOpen(false);

    // Clear the form
    setFormData({
      date: "",
      amount: "",
      category: "",
      title: "",
      notes: "",
    });
    setSelectedField("Income");
  };

  return (
    <div className="">
      <button
        className="grid place-items-center  fixed  right-8 bottom-8 rounded-full bg-pink-400 w-16 h-16 text-white text-3xl"
        onClick={toggleModal}
      >
        +
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 p-4">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
            <div className="flex justify-end">
              <button className="text-gray-600" onClick={toggleModal}>
                &times;
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleFormSubmit}>
              <div className="flex">
                <input
                  className="outline-none mb-4 text-xl font-semibold w-[50%] text-center p-2 hover:bg-blue-50"
                  readOnly
                  type="text"
                  placeholder="INCOME"
                  value="INCOME"
                  onClick={() => handleSelectField("Income")}
                  style={getFieldStyle("Income")}
                />
                <input
                  className="outline-none mb-4 text-xl font-semibold w-[50%] text-center p-2 hover:bg-blue-50"
                  readOnly
                  type="text"
                  placeholder="EXPENSE"
                  value="EXPENSE"
                  onClick={() => handleSelectField("Expense")}
                  style={getFieldStyle("Expense")}
                />
              </div>
              <div className="flex items-center  md:gap-4 ">
                <label
                  className="block text-md font-bold min-w-24"
                  htmlFor="date"
                >
                  Date
                </label>
                <input
                  className="w-full p-1 mt-1 bg-slate-100 border border-gray-300 rounded-sm"
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="flex items-center md:gap-4 ">
                <label
                  className="block text-md font-bold min-w-24"
                  htmlFor="amount"
                >
                  Amount
                </label>
                <input
                  className="w-full p-1 mt-1 bg-slate-100 border border-gray-300 rounded-sm"
                  type="number"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="flex items-center md:gap-4 ">
                <label
                  className="block text-md font-bold min-w-24"
                  htmlFor="category"
                >
                  Category
                </label>
                <select
                  className="w-full p-1 mt-1 bg-slate-100 border border-gray-300 rounded-sm"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Category</option>
                  <option value="Bonus">Bonus</option>
                  <option value="Education">Education</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Food">Food</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Gift">Gift</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Investment">Investment</option>
                  <option value="Rent">Rent</option>
                  <option value="Salary">Salary</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Transportation">Transportation</option>
                  <option value="Travel">Travel</option>
                  <option value="Utilities">Utilities</option>
                </select>
              </div>

              <div className="flex items-center md:gap-4 ">
                <label
                  className="block text-md font-bold min-w-24"
                  htmlFor="title"
                >
                  Title
                </label>
                <input
                  className="w-full p-1 mt-1 bg-slate-100 border border-gray-300 rounded-sm"
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold" htmlFor="notes">
                  Notes
                </label>
                <textarea
                  className="w-full p-2 mt-1 bg-slate-100 border border-gray-300 rounded-sm"
                  id="notes"
                  name="notes"
                  rows="3"
                  value={formData.notes}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex justify-end">
                <button
                  className="px-4 py-1 font-semibold text-white bg-red-700 rounded-sm"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupModal;
