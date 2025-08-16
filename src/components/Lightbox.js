import { useEffect, useRef, useState } from 'react';
import styles from './Lightbox.module.css';

export default function Lightbox({ type = 'image', src, onClose }) {
  const boxRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const onKey = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  const handleBackdropClick = (e) => {
    if (boxRef.current && !boxRef.current.contains(e.target)) {
      handleClose();
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div 
      className={`${styles.backdrop} ${isVisible ? styles.visible : ''}`}
      onClick={handleBackdropClick}
    >
      <div 
        className={`${styles.box} ${isVisible ? styles.visible : ''}`} 
        ref={boxRef}
        role="dialog" 
        aria-modal="true"
      >
        <button 
          className={styles.close} 
          aria-label="Закрыть" 
          onClick={handleClose}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        
        <div className={styles.contentWrapper}>
          <div className={styles.content}>
            {type === 'image' ? (
              <img src={src} alt="" className={styles.media} />
            ) : (
              <video src={src} controls autoPlay className={styles.media} />
            )}
          </div>
        </div>
        
        <div className={styles.footer}>
          <button className={styles.downloadBtn} onClick={() => {
            const link = document.createElement('a');
            link.href = src;
            link.download = src.split('/').pop() || 'download';
            link.click();
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M21 15V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V15M7 10L12 15M12 15L17 10M12 15V3" 
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Скачать
          </button>
        </div>
      </div>
    </div>
  );
}