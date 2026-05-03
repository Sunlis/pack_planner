import React from 'react';

export const BUTTON_STYLE: React.CSSProperties = {
  borderRadius: '1rem',
  lineHeight: '1rem',
  padding: '0.5rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  justifyContent: 'center',
  textDecoration: 'none',
  fontSize: '0.7rem',
  minWidth: '3rem',
};

export const PILL_STYLE: React.CSSProperties = {
  borderRadius: '10rem',
  padding: '0.1rem 0.3rem',
  backgroundColor: 'rgba(0, 0, 0, 0.1)',
};

export const HOLLOW_PILL_STYLE: React.CSSProperties = {
  border: '1px solid rgba(0, 0, 0, 0.3)',
  borderRadius: '10rem',
  padding: '0.1rem 0.3rem',
};