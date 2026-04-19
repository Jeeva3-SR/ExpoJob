import React, { useState, useEffect, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import JobForm from './components/JobForm';
import JobList from './components/JobList';

import {
  getExpenses, createExpense, deleteExpense,
  getJobs, createJob, updateJob, deleteJob,
} from './api';

import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

function App() {
  // ─── Expense State ──────────────────────────
  const [expenses, setExpenses] = useState([]);
  const [expenseTotal, setExpenseTotal] = useState(0);
  const [expenseFilters, setExpenseFilters] = useState({});

  // ─── Job State ──────────────────────────────
  const [jobs, setJobs] = useState([]);
  const [jobFilters, setJobFilters] = useState({});

  // ─── Fetch Expenses ─────────────────────────
  const fetchExpenses = useCallback(async () => {
    try {
      const { data } = await getExpenses(expenseFilters);
      setExpenses(data);
      setExpenseTotal(data.reduce((sum, e) => sum + e.amount, 0));
    } catch (err) {
      console.error('Failed to fetch expenses', err);
    }
  }, [expenseFilters]);

  // ─── Fetch Jobs ─────────────────────────────
  const fetchJobs = useCallback(async () => {
    try {
      const { data } = await getJobs(jobFilters);
      setJobs(data);
    } catch (err) {
      console.error('Failed to fetch jobs', err);
    }
  }, [jobFilters]);

  useEffect(() => { fetchExpenses(); }, [fetchExpenses]);
  useEffect(() => { fetchJobs(); }, [fetchJobs]);

  // ─── Expense Handlers ──────────────────────
  const handleAddExpense = async (data) => {
    await createExpense(data);
    fetchExpenses();
  };

  const handleDeleteExpense = async (id) => {
    await deleteExpense(id);
    fetchExpenses();
  };

  const handleExpenseFilter = (filters) => {
    setExpenseFilters(filters);
  };

  // ─── Job Handlers ─────────────────────────
  const handleAddJob = async (data) => {
    await createJob(data);
    fetchJobs();
  };

  const handleDeleteJob = async (id) => {
    await deleteJob(id);
    fetchJobs();
  };

  const handleJobStatusUpdate = async (id, status) => {
    await updateJob(id, { status });
    fetchJobs();
  };

  const handleJobFilter = (filters) => {
    setJobFilters(filters);
  };

  // ─── Chart Data ────────────────────────────
  const categoryTotals = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: ['#f97316', '#3b82f6', '#8b5cf6', '#64748b'],
        borderWidth: 0,
        hoverOffset: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom', labels: { font: { size: 11 }, padding: 12 } },
    },
  };

  const jobStatusCounts = jobs.reduce(
    (acc, j) => {
      acc[j.status] = (acc[j.status] || 0) + 1;
      return acc;
    },
    { Applied: 0, Shortlisted: 0, Rejected: 0, Accepted: 0 }
  );

  const jobChartData = {
    labels: ['Applied', 'Shortlisted', 'Rejected', 'Accepted'],
    datasets: [
      {
        data: [
          jobStatusCounts.Applied,
          jobStatusCounts.Shortlisted,
          jobStatusCounts.Rejected,
          jobStatusCounts.Accepted,
        ],
        backgroundColor: ['#3b82f6', '#f59e0b', '#ef4444', '#22c55e'],
        borderWidth: 0,
        hoverOffset: 8,
      },
    ],
  };

  return (
    <div className="app-root">
      {/* ─── Top Bar ──────────────────────────── */}
      <nav className="navbar-glass" id="dashboard-navbar">
        <div className="container-fluid px-4 py-2 d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-2">
            <span className="logo-icon">🏫</span>
            <h1 className="navbar-brand-text mb-0"><b>Dashboard </b></h1>
          </div>
          <div className="d-flex gap-3">
            <div className="summary-pill" id="summary-expenses">
              <span className="pill-label">Total Expenses</span>
              <span className="pill-value text-warning">
                ₹{expenseTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="summary-pill" id="summary-applications">
              <span className="pill-label">Applications</span>
              <span className="pill-value text-info">{jobs.length}</span>
            </div>
          </div>
        </div>
      </nav>

      {/* ─── Split Panels ─────────────────────── */}
      <div className="split-container">
        {/* LEFT — Expenses */}
        <div className="panel panel-left" id="expense-panel">
          <div className="panel-header">
            <h2 className="panel-title">
              <span className="panel-icon"></span> Expense Tracker
            </h2>
          </div>
          <div className="panel-body">
            <ExpenseForm onAdd={handleAddExpense} />

            {/* Mini Chart */}
            {Object.keys(categoryTotals).length > 0 && (
              <div className="chart-container mb-3" id="expense-chart">
                <Doughnut data={chartData} options={chartOptions} />
              </div>
            )}

            <ExpenseList
              expenses={expenses}
              total={expenseTotal}
              onDelete={handleDeleteExpense}
              onFilter={handleExpenseFilter}
            />
          </div>
        </div>

        {/* DIVIDER */}
        <div className="panel-divider"></div>

        {/* RIGHT — Jobs */}
        <div className="panel panel-right" id="job-panel">
          <div className="panel-header">
            <h2 className="panel-title">
              <span className="panel-icon"></span> Job Application Tracker
            </h2>
          </div>
          <div className="panel-body">
            <JobForm onAdd={handleAddJob} />

            {/* Mini Chart */}
            {jobs.length > 0 && (
              <div className="chart-container mb-3" id="job-chart">
                <Doughnut data={jobChartData} options={chartOptions} />
              </div>
            )}

            <JobList
              jobs={jobs}
              onDelete={handleDeleteJob}
              onStatusUpdate={handleJobStatusUpdate}
              onFilter={handleJobFilter}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
