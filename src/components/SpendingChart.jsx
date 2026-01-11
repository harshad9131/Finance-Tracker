import React from 'react';

function SpendingChart({ categoryTotals }) {
  const maxTotal = Math.max(...categoryTotals.map(cat => cat.total));

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Spending by Category</h2>
      <div className="space-y-4">
        {categoryTotals.map(category => (
          <div key={category.name}>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>{category.name}</span>
              <span>${category.total}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className={`h-2.5 rounded-full ${category.color}`}
                style={{ width: `${(category.total / maxTotal) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SpendingChart;