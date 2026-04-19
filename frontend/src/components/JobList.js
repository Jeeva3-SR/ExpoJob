import React, { useState } from 'react';

const STATUSES = ['All', 'Applied', 'Shortlisted', 'Rejected', 'Accepted'];

const statusColor = {
  Applied: '#3b82f6',
  Shortlisted: '#f59e0b',
  Rejected: '#ef4444',
  Accepted: '#22c55e',
};

const statusBg = {
  Applied: 'rgba(59,130,246,0.12)',
  Shortlisted: 'rgba(245,158,11,0.12)',
  Rejected: 'rgba(239,68,68,0.12)',
  Accepted: 'rgba(34,197,94,0.12)',
};

const JobList = ({ jobs, onDelete, onStatusUpdate, onFilter }) => {
  const [filterStatus, setFilterStatus] = useState('All');

  const handleStatusFilter = (status) => {
    setFilterStatus(status);
    onFilter({ status });
  };

  const clearFilter = () => {
    setFilterStatus('All');
    onFilter({});
  };

  return (
    <div id="job-list">
      {/* Filter Bar */}
      <div className="d-flex flex-wrap gap-2 mb-3 align-items-center">
        <label className="form-label mb-0 small text-muted me-1">Status:</label>
        {STATUSES.map((s) => (
          <button
            key={s}
            className={`btn btn-sm ${filterStatus === s ? 'btn-dark' : 'btn-outline-secondary'}`}
            onClick={() => s === 'All' ? clearFilter() : handleStatusFilter(s)}
            id={`job-filter-${s.toLowerCase()}`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Summary badges */}
      <div className="d-flex gap-2 mb-3 flex-wrap">
        {['Applied', 'Shortlisted', 'Rejected', 'Accepted'].map((s) => {
          const count = jobs.filter((j) => j.status === s).length;
          return (
            <span
              key={s}
              className="badge px-2 py-1"
              style={{
                backgroundColor: statusBg[s],
                color: statusColor[s],
                border: `1px solid ${statusColor[s]}`,
                borderRadius: '8px',
                fontSize: '0.75rem',
              }}
            >
              {s}: {count}
            </span>
          );
        })}
      </div>

      {/* Table */}
      <div className="table-responsive" style={{ maxHeight: '340px', overflowY: 'auto' }}>
        <table className="table table-hover table-sm align-middle mb-0" id="job-table">
          <thead className="table-dark sticky-top">
            <tr>
              <th>Company</th>
              <th>Role</th>
              <th>Status</th>
              <th>Date</th>
              <th style={{ width: '50px' }}></th>
            </tr>
          </thead>
          <tbody>
            {jobs.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center text fw-bold py-4">
                  No applications yet. Start applying!
                </td>
              </tr>
            ) : (
              jobs.map((job) => (
                <tr key={job._id} className="job-row">
                  <td className="fw-medium">{job.companyName}</td>
                  <td className="text-muted">{job.role || '—'}</td>
                  <td>
                    <select
                      className="form-select form-select-sm py-0"
                      style={{
                        width: '120px',
                        backgroundColor: statusBg[job.status],
                        color: statusColor[job.status],
                        fontWeight: 600,
                        border: `1.5px solid ${statusColor[job.status]}`,
                        borderRadius: '6px',
                      }}
                      value={job.status}
                      onChange={(e) => onStatusUpdate(job._id, e.target.value)}
                      id={`job-status-update-${job._id}`}
                    >
                      {['Applied', 'Shortlisted', 'Rejected', 'Accepted'].map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td className="text-muted small">
                    {new Date(job.dateApplied).toLocaleDateString('en-IN')}
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-danger btn-sm rounded-circle p-0"
                      style={{ width: '28px', height: '28px' }}
                      onClick={() => onDelete(job._id)}
                      title="Delete"
                      id={`job-delete-${job._id}`}
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

export default JobList;
