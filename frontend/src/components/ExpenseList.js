import React, { useState } from 'react';

const CATEGORIES = ['All', 'Food', 'Travel', 'Bills', 'Others'];

const categoryIcon = {
  Food: '🍔',
  Travel: '✈️',
  Bills: '📄',
  Others: '📦',
};

const ExpenseList = ({ expenses, total, onDelete, onFilter }) => {
  const [filterCategory, setFilterCategory] = useState('All');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleCategoryFilter = (cat) => {
    setFilterCategory(cat);
    onFilter({ category: cat, startDate, endDate });
  };

  const handleDateFilter = () => {
    onFilter({ category: filterCategory, startDate, endDate });
  };

  const clearFilters = () => {
    setFilterCategory('All');
    setStartDate('');
    setEndDate('');
    onFilter({});
  };

  return (
    <div id="expense-list">
      {/* Filter Bar */}
      <div className="d-flex flex-wrap gap-2 mb-3 align-items-end">
        <div>
          <label className="form-label mb-0 small text-muted">Category</label>
          <select
            className="form-select form-select-sm"
            value={filterCategory}
            onChange={(e) => handleCategoryFilter(e.target.value)}
            id="expense-filter-category"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="form-label mb-0 small text-muted">From</label>
          <input
            type="date"
            className="form-control form-control-sm"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            id="expense-filter-start"
          />
        </div>
        <div>
          <label className="form-label mb-0 small text-muted">To</label>
          <input
            type="date"
            className="form-control form-control-sm"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            id="expense-filter-end"
          />
        </div>
        <button
          className="btn btn-outline-secondary btn-sm"
          onClick={handleDateFilter}
          id="expense-filter-apply-btn"
        >
          Apply
        </button>
        <button
          className="btn btn-outline-danger btn-sm"
          onClick={clearFilters}
          id="expense-filter-clear-btn"
        >
          Clear
        </button>
      </div>

      {/* Total */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <span className="text small fw-bold">{expenses.length} expense(s)</span>
        <span className="badge bg-gradient-primary fs-6 px-3 py-2" style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '12px',
        }}>
          Total: ₹{total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
        </span>
      </div>

      {/* Table */}
      <div className="table-responsive" style={{ maxHeight: '340px', overflowY: 'auto' }}>
        <table className="table table-hover table-sm align-middle mb-0" id="expense-table">
          <thead className="table-dark sticky-top">
            <tr>
              <th>Title</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Date</th>
              <th style={{ width: '50px' }}></th>
            </tr>
          </thead>
          <tbody>
            {expenses.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center text  fw-bold">
                  No expenses yet. Start tracking!
                </td>
              </tr>
            ) : (
              expenses.map((exp) => (
                <tr key={exp._id} className="expense-row">
                  <td className="fw-medium">{exp.title}</td>
                  <td className="text-success fw-bold">₹{exp.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                  <td>
                    <span className="badge bg-light text-dark border">
                      {exp.category}
                    </span>
                  </td>
                  <td className="text-success fw-bold">
                    {new Date(exp.date).toLocaleDateString('en-IN')}
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-danger btn-sm rounded-circle p-0"
                      style={{ width: '28px', height: '28px' }}
                      onClick={() => onDelete(exp._id)}
                      title="Delete"
                      id={`expense-delete-${exp._id}`}
                    >
                      ×
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseList;
