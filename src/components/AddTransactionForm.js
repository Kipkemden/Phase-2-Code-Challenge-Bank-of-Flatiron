import React, { useState } from "react";

function AddTransactionForm({ onAddTransaction }) {

  const transactionsUrl = "http://localhost:8001/transactions"

  const [formData, setFormData] = useState({
    date: "",
    description: "",
    category: "",
    amount: ""
  })

  //Post New Transaction to Server
  function handleSubmit (event) {
    event.preventDefault();

    fetch(`${transactionsUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => onAddTransaction(data))
  }

  function handleChange(event) {
    const key = event.target.name;
    let value = event.target.value;

    // Convert date value to ISO format
    if (key === 'date') {
      value = new Date(value).toISOString().slice(0, 10);
    }

    setFormData({
      ...formData,
      [key]: value
    });
  }

  return (
    <div className="ui segment">
      <form className="ui form" onSubmit={handleSubmit}>
        <div className="inline fields">
          <input 
            type="date" 
            name="date" 
            value={formData.date} 
            onChange={handleChange}
          />
          <input 
            type="text" 
            name="description" 
            value={formData.description} 
            placeholder="Description"
            onChange={handleChange}
          />
          <input
            type="text" 
            name="category" 
            value={formData.category} 
            placeholder="Category" 
            onChange={handleChange}
          />
          <input 
            type="number" 
            name="amount" 
            value={formData.amount} 
            placeholder="Amount" 
            step="0.01"
            onChange={handleChange}
          />
        </div>
        <button className="ui button" type="submit">
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default AddTransactionForm;
