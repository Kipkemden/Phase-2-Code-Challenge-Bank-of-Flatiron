import React, { useEffect, useState } from "react";
import TransactionList from "./TransactionList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

function AccountContainer() {

  const transactionsUrl = "http://localhost:4001/transactions"
  const [transactions, setTransactions]  = useState([]);

//Fetch Transactions
  useEffect(() => {
    fetch(`${transactionsUrl}`)
    .then(response => response.json())
    .then(data => setTransactions(data));
  }, [])


//Create a new transaction
function addNewTransaction (newTransaction) {
  const updatedTransactions = [...transactions, newTransaction]
  setTransactions(updatedTransactions);
}  

//Delete a transaction
function deleteTransaction(id) {
  const updatedTransactions = transactions.filter(transaction => transaction.id !== id);
  setTransactions(updatedTransactions);
}

//Search Functionality
const[search, setSearch] = useState("")

//Sort Functionality

  return (
    <div>
      <Search search={search} setSearch={setSearch}/>
      <AddTransactionForm onAddTransaction={addNewTransaction} />
      <TransactionList transactions={transactions} onDeleteTransaction={deleteTransaction} search={search} setTransactions={setTransactions}/>
    </div>
  );
}

export default AccountContainer;