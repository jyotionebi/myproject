import React from 'react';

interface SimpleButtonProps {
  text: string;
  onClick?: () => void;
  color?: string;
  type?: 'button' | 'submit' | 'reset';
}

const SimpleButton: React.FC<SimpleButtonProps> = ({ text, onClick, color = 'blue', type = 'button' }) => {
  return (
    <button
      type={type}
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