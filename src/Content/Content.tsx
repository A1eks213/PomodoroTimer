import React from 'react';
// import styles from './content.module..css';

interface IContentProps {
  children?: React.ReactNode;
}
export function Content({children}: IContentProps) {
  return (
    <div className='content'>
      {children}
    </div>
  );
}
