import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Badge } from './badge';

interface CompletionBadgeProps {
  serviceId: string;
  className?: string;
}

export const CompletionBadge: React.FC<CompletionBadgeProps> = ({ serviceId, className = '' }) => {
  const completedServices = JSON.parse(localStorage.getItem('completedServices') || '[]');
  const isCompleted = completedServices.includes(serviceId);

  if (!isCompleted) return null;

  return (
    <Badge variant="secondary" className={`bg-green-100 text-green-800 border-green-200 ${className}`}>
      <CheckCircle className="w-3 h-3 mr-1" />
      Completed
    </Badge>
  );
};