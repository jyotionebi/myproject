// src/components/widgets/SimpleButton.tsx
import React from 'react';

interface SimpleButtonProps {
  text: string;
  onClick?: () => void;
  color?: string;
}

const SimpleButton: React.FC<SimpleButtonProps> = ({ text, onClick, color = 'blue' }) => {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: color,
        color: 'white',
        padding: '8px 16px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        margin: '4px'
      }}
    >
      {text}
    </button>
  );
};

export default SimpleButton;