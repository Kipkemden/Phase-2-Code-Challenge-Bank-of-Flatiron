import React from "react";

function Transaction({ transaction, onDeleteTransaction }) {
  const { id, date, description, category, amount} = transaction


  const transactionsUrl = "http://localhost:8001/transactions"


  //Delete transaction functionality
  function handleDelete() {
    fetch(`${transactionsUrl}/${id}`, {
      method: "DELETE"
    })
    onDeleteTransaction(id)
  }

  
  return (
    <tr>
      <td>{date}</td>
      <td>{description}</td>
      <td>{category}</td>
      <td>{amount}</td>
      <td><i className="fa-solid fa-trash-can" onClick={handleDelete}></i></td>
    </tr>
  );
}

export default Transaction;