// spending.js
"use client";

import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './style.css';
import AppLogo from "@/components/appLogo";

const categories = [
  'Transportation',
  'Food',
  'Utilities',
  'Clothing',
  'Medical/Healthcare',
  'Personal',
  'Gifts/Donations',
  'Entertainment',
  'Housing'
];

const spendingData = [
  { name: 'Jan', spending: 400 },
  { name: 'Feb', spending: 300 },
  { name: 'Mar', spending: 500 },
  { name: 'Apr', spending: 700 },
  { name: 'May', spending: 600 },
];

function SpendingLimits() {
  
  const [limitCategory, setLimitCategory] = useState('');
  const [limitAmount, setLimitAmount] = useState('');
  const [limitTime, setLimitTime] = useState('');

  

  const handleLimitSubmit = (e) => {
    e.preventDefault();
    console.log('Spending limit data:', { limitCategory, limitAmount, limitTime });
  };

  return (
    <div className="container mt-5">
      
      <div className="card mx-auto mt-4" style={{ maxWidth: '600px' }}>
        <div className="card-body">
          <h2 className="card-title text-center">Set Spending Limits</h2>
          <form onSubmit={handleLimitSubmit}>
            <div className="mb-3">
              <label htmlFor="limitCategory" className="form-label">Category for Spending Limit</label>
              <select
                className="form-control"
                id="limitCategory"
                value={limitCategory}
                onChange={(e) => setLimitCategory(e.target.value)}
                required
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="limitAmount" className="form-label">Limit Amount (USD)</label>
              <input
                type="number"
                className="form-control"
                id="limitAmount"
                value={limitAmount}
                onChange={(e) => setLimitAmount(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="limitTime" className="form-label">Active Time for Limit</label>
              <select
                className="form-control"
                id="limitTime"
                value={limitTime}
                onChange={(e) => setLimitTime(e.target.value)}
                required
              >
                <option value="">Select a time frame</option>
                <option value="day">Day</option>
                <option value="week">Week</option>
                <option value="month">Month</option>
                <option value="year">Year</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary w-100">Set Spending Limit</button>
          </form>
        </div>
      </div>

    </div>
  );
}

export default SpendingLimits;
