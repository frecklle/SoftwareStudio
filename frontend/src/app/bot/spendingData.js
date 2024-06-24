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


function SpendingData() {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    const formData = {
        "amount": Number,
        "category": Text,
        "date": Date
    }
    alert(JSON.stringify(formData));
    try {
      const response = await fetch('http://localhost:8000/spendingData', {
        method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: localStorage.getItem("token"),
                },
                body: JSON.stringify(formData),
            });
        if (response.ok){
          setMessage('Data is uploaded successfully!');
          setTimeout(() => {
            window.location.href = '/bot';
          }, 2000);
        } else {
          setMessage('Failed to upload data');
        }
    } catch (error){
      console.error('Error uploading data:', error);
      setMessage('Internal Server Error');
    } finally {
      setLoading(false);
    }
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
    </div>
  );
}

export default SpendingData;
