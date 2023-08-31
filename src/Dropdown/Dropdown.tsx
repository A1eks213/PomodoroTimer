import React, { useEffect, useRef, useState } from 'react';
import styles from './dropdown.module.css';

interface IDropdownProps {
  button: React.ReactNode;
  children: React.ReactNode;
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: ()=> void;
}

const noop = () => {};
export function Dropdown({button, children, isOpen, onClose = noop, onOpen = noop}: IDropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(isOpen);
  useEffect(() => setIsDropdownOpen(isOpen), [isOpen])
  useEffect(() => isDropdownOpen ? onOpen() : onClose(),
  // eslint-disable-next-line
    [isDropdownOpen])
  const handleOpen = () => {
    if (isOpen === undefined) {
      setIsDropdownOpen(!isDropdownOpen)
    }
  }
  const refContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleCkick(event: MouseEvent) {
      if (event.target instanceof Node && !refContainer.current?.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('click', handleCkick)

    return () => {
      document.removeEventListener('click', handleCkick)
    }
  }, [])
  
  return (
    <div className={styles.container} ref={refContainer}>
      <div onClick={handleOpen}>
        {button}
        <div>
          {isDropdownOpen && (
            <div className={styles.listContainer}>
              <div className={styles.list} onClick={() => setIsDropdownOpen(false)}>
                {children}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
