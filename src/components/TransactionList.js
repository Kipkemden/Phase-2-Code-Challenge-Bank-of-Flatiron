import React, { useState } from "react";
import Transaction from "./Transaction";


function TransactionList({ transactions, onDeleteTransaction, search, setTransactions }) {
  

  //Sorting Functionality
  const [sortStrategy] = useState({
    date: -1,
    description: -1,
    category: -1,
    amount: -1
  })
  
  function updateSortStrategy(item){
    sortStrategy[item] = sortStrategy[item] * -1 
  }


  function sortTransactionList(event){
    const sortBy  = event.target.textContent.toLowerCase()
    updateSortStrategy(sortBy)

    let transactionsCopy 
    
    if(sortBy === "category" || sortBy === "description"){
      transactionsCopy = [...transactions].sort((a, b) => {
        if(a[sortBy].toLowerCase() > b[sortBy].toLowerCase()){
          return sortStrategy[sortBy]
        }else if(a[sortBy].toLowerCase() < b[sortBy].toLowerCase()){
          return sortStrategy[sortBy] * -1
        }else {
          return 0
        }
      })
    }
    setTransactions(transactionsCopy)
  }

  //Search functionality
  let transactionList = "Loading transactions..."

  if(transactions){
    const filteredTransactions = transactions.filter(transaction => {
      return (
        transaction.description.toLowerCase().includes(search.toLowerCase())) ||
        transaction.category.toLowerCase().includes(search.toLowerCase())
    })

    transactionList = filteredTransactions.map(transaction => {
      return <Transaction key={transaction.id} transaction={transaction} onDeleteTransaction={onDeleteTransaction} setTransactions={setTransactions}/>
    })
  }

  return (
    <table className="ui celled striped padded table">
      <tbody>
        <tr>
          <th>
            <h3 className="ui center aligned header">Date</h3>
          </th>
          <th>
            <h3 className="ui center aligned header" onClick={sortTransactionList}>Description<i className="fa-solid fa-sort"></i></h3>
          </th>
          <th>
            <h3 className="ui center aligned header" onClick={sortTransactionList}>Category<i className="fa-solid fa-sort"></i></h3>
          </th>
          <th>
            <h3 className="ui center aligned header">Amount</h3>
          </th>
          <th>
            <h3 className="ui center aligned header">Action</h3>
          </th>
        </tr>
        {transactionList}
      </tbody>
    </table>
  );
}

export default TransactionList;