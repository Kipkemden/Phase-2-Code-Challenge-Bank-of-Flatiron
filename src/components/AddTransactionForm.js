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
    // console.log(formData);
  }

  function handleChange(event) {
    const key = event.target.name
    setFormData({
      ...formData,
      [key]: event.target.value
    })
  }

    return (
    <div className="ui segment">
      <form className="ui form" onSubmit={handleSubmit}>
        <div className="inline fields">
          <input 
          type="data" 
          name="data" 
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