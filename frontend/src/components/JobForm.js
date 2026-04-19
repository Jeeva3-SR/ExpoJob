import React, { useState } from 'react';

const STATUSES = ['Applied', 'Shortlisted', 'Rejected', 'Accepted'];

const JobForm = ({ onAdd }) => {
  const [form, setForm] = useState({
    companyName: '',
    role: '',
    status: 'Applied',
    dateApplied: new Date().toISOString().split('T')[0],
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.companyName) return;
    setLoading(true);
    try {
      await onAdd(form);
      setForm({
        companyName: '',
        role: '',
        status: 'Applied',
        dateApplied: new Date().toISOString().split('T')[0],
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4" id="job-form">
      <div className="row g-2">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Company Name"
            name="companyName"
            value={form.companyName}
            onChange={handleChange}
            required
            id="job-company-input"
          />
        </div>
        <div className="col-md-6">
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Rolee (optional)"
            name="role"
            value={form.role}
            onChange={handleChange}
            id="job-role-input"
          />
        </div>
        <div className="col-md-4">
          <select
            className="form-select form-select-sm"
            name="status"
            value={form.status}
            onChange={handleChange}
            id="job-status-select"
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <input
            type="date"
            className="form-control form-control-sm"
            name="dateApplied"
            value={form.dateApplied}
            onChange={handleChange}
            required
            id="job-date-input"
          />
        </div>
        <div className="col-md-4">
          <button
            type="submit"
            className="btn btn-success btn-sm w-100"
            disabled={loading}
            id="job-submit-btn"
          >
            {loading ? (
              <span className="spinner-border spinner-border-sm me-1" />
            ) : (
              <i className="bi bi-plus-circle me-1"></i>
            )}
            Add Application
          </button>
        </div>
      </div>
    </form>
  );
};

export default JobForm;
