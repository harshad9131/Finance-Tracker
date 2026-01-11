import React, { useState, useEffect } from 'react';
import { Wallet, TrendingUp, DollarSign } from 'lucide-react';
import Header from './components/Header';
import SummaryCard from './components/SummaryCard';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import SpendingChart from './components/SpendingChart';

function App() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('transactions');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const categoryColors = {
    Food: 'bg-red-500',
    Transport: 'bg-blue-500',
    Entertainment: 'bg-purple-500',
    Bills: 'bg-yellow-500',
    Shopping: 'bg-green-500',
    Other: 'bg-gray-500'
  };

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = totalIncome - totalExpenses;

  const categories = ['Food', 'Transport', 'Entertainment', 'Bills', 'Shopping', 'Other'];
  const categoryTotals = categories.map(cat => ({
    name: cat,
    total: transactions
      .filter(t => t.category === cat && t.type === 'expense')
      .reduce((acc, curr) => acc + curr.amount, 0),
    color: categoryColors[cat]
  }));

  const handleAddTransaction = (newTransaction) => {
    setTransactions([...transactions, newTransaction]);
  };

  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <SummaryCard
            title="Income"
            amount={totalIncome}
            icon={Wallet}
            color="text-green-500"
          />
          <SummaryCard
            title="Expenses"
            amount={totalExpenses}
            icon={TrendingUp}
            color="text-red-500"
          />
          <SummaryCard
            title="Balance"
            amount={balance}
            icon={DollarSign}
            color={balance >= 0 ? 'text-blue-500' : 'text-red-500'}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <TransactionForm onAddTransaction={handleAddTransaction} />
            <SpendingChart categoryTotals={categoryTotals} />
          </div>
          <TransactionList
            transactions={transactions}
            onDeleteTransaction={handleDeleteTransaction}
          />
        </div>
      </main>
    </div>
  );
}

export default App;