import React, { useState } from 'react';

const CATEGORIES = ['Food', 'Outside Travel', 'College Outing', 'Others'];

const ExpenseForm = ({ onAdd }) => {
  const [form, setForm] = useState({
    title: '',
    amount: '',
    category: 'Food',
    date: new Date().toISOString().split('T')[0],
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.amount) return;
    setLoading(true);
    try {
      await onAdd({ ...form, amount: parseFloat(form.amount) });
      setForm({
        title: '',
        amount: '',
        category: 'Food',
        date: new Date().toISOString().split('T')[0],
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4" id="expense-form">
      <div className="row g-2">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Expenses Title"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            id="expense-title-input"
          />
        </div>
        <div className="col-md-6">
          <input
            type="number"
            className="form-control form-control-sm"
            placeholder="Amount (₹)"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
            id="expense-amount-input"
          />
        </div>
        <div className="col-md-4">
          <select
            className="form-select form-select-sm"
            name="category"
            value={form.category}
            onChange={handleChange}
            id="expense-category-select"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <input
            type="date"
            className="form-control form-control-sm"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
            id="expense-date-input"
          />
        </div>
        <div className="col-md-4">
          <button
            type="submit"
            className="btn btn-primary btn-sm w-100"
            disabled={loading}
            id="expense-submit-btn"
          >
            {loading ? (
              <span className="spinner-border spinner-border-sm me-1" />
            ) : (
              <i className="bi bi-plus-circle me-1"></i>
            )}
            Add Expense
          </button>
        </div>
      </div>
    </form>
  );
};

export default ExpenseForm;
