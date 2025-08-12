import { useEffect, useRef } from 'react';
import styles from './Lightbox.module.css';

export default function Lightbox({ type = 'image', src, onClose }) {
  const boxRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (boxRef.current && !boxRef.current.contains(e.target)) onClose();
  };

  return (
    <div className={styles.backdrop} onMouseDown={handleBackdropClick}>
      <div className={styles.box} ref={boxRef} role="dialog" aria-modal="true">
        <button className={styles.close} aria-label="Закрыть" onClick={onClose}>×</button>
        <div className={styles.content}>
          {type === 'image' ? (
            <img src={src} alt="" />
          ) : (
            <video src={src} controls />
          )}
        </div>
      </div>
    </div>
  );
}
