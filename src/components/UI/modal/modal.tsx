import React from 'react';
import styles from './modal.module.css'

interface Props {
  active: boolean
  setActive: (active: boolean) => void
  children: React.ReactNode
}

export const Modal: React.FC<Props> = ({ active,setActive, children }) => {
  return (
    <div className={active ? styles.modal + ' ' + styles.active : styles.modal} >
      <div className={active ? styles.modalContent + ' ' + styles.active : styles.modalContent} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};