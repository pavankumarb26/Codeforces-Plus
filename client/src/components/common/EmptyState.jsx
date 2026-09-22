import React from 'react';
import { Inbox } from 'lucide-react';

export const EmptyState = ({
  icon: Icon = Inbox,
  title = 'No items found',
  description = 'There is no data to display right now.',
  action = null
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed border-dark-border rounded-xl bg-dark-card/30">
      <div className="p-3 bg-slate-800/50 rounded-lg text-slate-400 mb-3">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-base font-semibold text-slate-200 font-heading mb-1">{title}</h3>
      <p className="text-sm text-slate-400 max-w-sm mb-4">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
};
