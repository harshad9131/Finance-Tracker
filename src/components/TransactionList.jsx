import React from 'react';
import { Trash2 } from 'lucide-react';

function TransactionList({ transactions, onDeleteTransaction }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Transactions</h2>
      <div className="space-y-4">
        {transactions.map(transaction => (
          <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">{transaction.description}</p>
              <p className="text-sm text-gray-500">
                {transaction.category} • {transaction.date}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className={`font-semibold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                {transaction.type === 'income' ? '+' : '-'}${transaction.amount}
              </span>
              <button
                onClick={() => onDeleteTransaction(transaction.id)}
                className="text-gray-400 hover:text-red-500"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
        {transactions.length === 0 && (
          <p className="text-center text-gray-500">No transactions yet</p>
        )}
      </div>
    </div>
  );
}

export default TransactionList;