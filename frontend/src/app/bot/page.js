// spending.js
"use client";

import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './style.css';
import AppLogo from "@/components/appLogo";
import SpendingData from './spendingData';
import SpendingLimits from './spendingLimit';

function SpendingPage() {
  return (
    <>
      <SpendingData/>
      <SpendingLimits/>
    </>
  )
}
export default SpendingPage;  