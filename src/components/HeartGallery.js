import { useState } from 'react';
import styles from './HeartGallery.module.css';
import Lightbox from './Lightbox';

const heartMask = [
  [0,1,1,0,0,1,1,0],
  [1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1],
  [0,1,1,1,1,1,1,0],
  [0,0,1,1,1,1,0,0],
  [0,0,0,1,1,0,0,0],
];

export default function HeartGallery({ items }) {
  const [selected, setSelected] = useState(null);
  let mediaIndex = 0;
  let animationDelay = 0;

  return (
    <div className={styles.wrapper}>
      <div className={styles.grid}>
        {heartMask.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            if (cell === 1 && mediaIndex < items.length) {
              const media = items[mediaIndex++];
              animationDelay += 0.08;
              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={styles.cell}
                  style={{ animationDelay: `${animationDelay}s` }}
                  onClick={() => setSelected(media)}
                >
                  {media.type === 'image' ? (
                    <img src={media.src} alt="" />
                  ) : (
                    <video src={media.src} muted autoPlay loop />
                  )}
                </div>
              );
            }
            animationDelay += 0.08;
            return <div key={`${rowIndex}-${colIndex}`} className={styles.empty}></div>;
          })
        )}
      </div>

      {selected && (
        <Lightbox
          type={selected.type}
          src={selected.src}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
