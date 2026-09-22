import React from 'react';
import { getVerdictDetails } from '../../utils/formatters';

export const VerdictBadge = ({ verdict }) => {
  const { label, color } = getVerdictDetails(verdict);
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-mono font-medium border ${color}`}>
      {label}
    </span>
  );
};
