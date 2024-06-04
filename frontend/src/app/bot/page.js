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

function SpendingPage() {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [limitCategory, setLimitCategory] = useState('');
  const [limitAmount, setLimitAmount] = useState('');
  const [limitTime, setLimitTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Spending data:', { amount, category, date });
  };

  const handleLimitSubmit = (e) => {
    e.preventDefault();
    console.log('Spending limit data:', { limitCategory, limitAmount, limitTime });
  };

  return (
    <div className="container mt-5">
      <header className="py-3 header">
        <div className="container-fluid">
          <div className="row align-items-center justify-content-center">
            <div className="col-md-4 text-center">
              <a className="text-dark logo" href="#">
                <AppLogo />
              </a>
            </div>
          </div>
        </div>
      </header>
      <div className="card mx-auto" style={{ maxWidth: '600px' }}>
        <div className="card-body">
          <h2 className="card-title text-center">Upload Spending Data</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="amount" className="form-label">Amount Spent (USD)</label>
              <input
                type="number"
                className="form-control"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="category" className="form-label">Category of Spending</label>
              <select
                className="form-control"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="date" className="form-label">Date of Spending</label>
              <input
                type="date"
                className="form-control"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Upload Spending Data</button>
          </form>
        </div>
      </div>

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

      <div className="card mx-auto mt-4" style={{ maxWidth: '600px' }}>
        <div className="card-body">
          <h2 className="card-title text-center">Spending Analysis</h2>
          <LineChart width={500} height={300} data={spendingData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="spending" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </div>
      </div>
    </div>
  );
}

export default SpendingPage;
