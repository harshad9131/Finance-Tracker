import React from 'react';

function SummaryCard({ title, amount, icon: Icon, color }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Icon className={`h-6 w-6 ${color}`} />
          <h3 className="ml-2 text-sm font-medium text-gray-900">{title}</h3>
        </div>
        <span className={`text-lg font-semibold ${color}`}>${amount}</span>
      </div>
    </div>
  );
}

export default SummaryCard;