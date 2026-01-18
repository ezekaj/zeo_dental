import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const { t } = useTranslation();

  const statusConfig: Record<string, { bg: string; text: string; dot: string }> = {
    pending: {
      bg: 'bg-amber-50',
      text: 'text-amber-700',
      dot: 'bg-amber-500',
    },
    confirmed: {
      bg: 'bg-green-50',
      text: 'text-green-700',
      dot: 'bg-green-500',
    },
    cancelled: {
      bg: 'bg-red-50',
      text: 'text-red-700',
      dot: 'bg-red-500',
    },
    completed: {
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      dot: 'bg-blue-500',
    },
    no_show: {
      bg: 'bg-gray-100',
      text: 'text-gray-600',
      dot: 'bg-gray-400',
    },
  };

  const config = statusConfig[status] || statusConfig.pending;
  const sizeClasses = size === 'sm' ? 'text-[9px] px-2 py-0.5' : 'text-[10px] px-3 py-1';

  const statusLabels: Record<string, string> = {
    pending: t('receptionist.filters.pending'),
    confirmed: t('receptionist.filters.confirmed'),
    cancelled: t('receptionist.filters.cancelled'),
    completed: t('receptionist.filters.completed'),
    no_show: t('receptionist.filters.noShow'),
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 ${config.bg} ${config.text} ${sizeClasses} uppercase tracking-wider font-semibold rounded-full`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${config.dot} ${status === 'pending' ? 'animate-pulse' : ''}`}
      />
      {statusLabels[status] || status}
    </span>
  );
};
