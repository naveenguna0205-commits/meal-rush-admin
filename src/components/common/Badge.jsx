import React from 'react';

export const Badge = ({ children, variant = 'neutral', size = 'md', className = '' }) => {
  const variantStyles = {
    neutral: 'bg-slate-100 text-slate-700 border-slate-200',
    primary: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-50 text-amber-800 border-amber-200',
    danger: 'bg-rose-50 text-rose-700 border-rose-200',
    info: 'bg-sky-50 text-sky-700 border-sky-200',
    purple: 'bg-purple-50 text-purple-700 border-purple-200',
  };

  const sizeStyles = {
    xs: 'px-1.5 py-0.5 text-[10px] font-semibold',
    sm: 'px-2 py-0.5 text-xs font-medium',
    md: 'px-2.5 py-1 text-xs font-semibold',
    lg: 'px-3 py-1.5 text-sm font-semibold'
  };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border shadow-sm ${variantStyles[variant] || variantStyles.neutral} ${sizeStyles[size]} ${className}`}>
      {children}
    </span>
  );
};

export const StatusBadge = ({ status }) => {
  switch (status) {
    case 'Active Delivery':
    case 'Delivering':
      return <Badge variant="primary"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>Active Delivery</Badge>;
    case 'Delivered':
    case 'Completed':
    case 'Verified':
    case 'Approved':
    case 'Online':
    case 'Paid':
    case 'Active':
      return <Badge variant="success"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>{status}</Badge>;
    case 'Confirmed':
      return <Badge variant="info"><span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>Confirmed</Badge>;
    case 'Pending':
    case 'Pending Review':
    case 'Pending Approval':
    case 'Under Review':
    case 'Pending Payout':
      return <Badge variant="warning"><span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>{status}</Badge>;
    case 'Cancelled':
    case 'Failed':
    case 'Rejected':
    case 'Suspended':
    case 'Blocked':
      return <Badge variant="danger"><span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>{status}</Badge>;
    case 'Offline':
    case 'Paused':
      return <Badge variant="neutral"><span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>{status}</Badge>;
    default:
      return <Badge variant="neutral">{status}</Badge>;
  }
};
