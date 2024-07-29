import React from 'react';

interface ActivityIndicatorProps {
  size?: number;
}

const ActivityIndicator: React.FC<ActivityIndicatorProps> = ({ size = 30 }) => {
  return (
    <span
      className="animate-spin rounded-full border-4 border-solid border-blue-500 border-t-transparent"
      style={{
        height: `${size}px`,
        width: `${size}px`,
      }}
    />
  );
};

export default ActivityIndicator;