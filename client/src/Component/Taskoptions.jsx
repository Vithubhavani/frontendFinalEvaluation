import  { useState } from 'react';
import styles from './Taskoptions.module.css'

export default function TaskOptions({ taskId, onDelete,onShare,onEdit }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={styles.threedot}>...</button>

      {isMenuOpen && (
        <div className={styles.buttons}>
          <button onClick={() => onEdit(taskId)} className={styles.button}>Edit</button>
          <button onClick={() => onDelete(taskId)} className={styles.button}>Delete</button>
          <button onClick={() => onShare(taskId)} className={styles.button}>Share</button>
        </div>
      )}
    </div>
  );
}
