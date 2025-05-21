import React, { useState, useEffect } from 'react';
import styles from '../../../styles/DeleteConfirmForm.module.css';

const DeleteConfirmForm = ({ onClose, onConfirm, lotId, lotName = '' }) => {
  const [inputConfirmation, setInputConfirmation] = useState('');

  useEffect(() => {
    const handleEsc = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const isConfirmEnabled = !lotName || inputConfirmation.toUpperCase() === 'XÓA';

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles['modal-header']}>
          <h2>Xác nhận xóa</h2>
          <button onClick={onClose} className={styles['close-button']}>
            ✕
          </button>
        </div>
        <div className={styles['modal-body']}>
          <p>
            Bạn có chắc chắn muốn xóa bãi đỗ {lotName ? `"${lotName}"` : ''} (ID:{' '}
            <strong>{lotId}</strong>)?
          </p>
          <p className={styles['warning-text']}>
            Hành động này không thể hoàn tác và tất cả dữ liệu liên quan sẽ bị xóa vĩnh viễn.
          </p>
          {lotName && (
            <div className={styles['input-group']}>
              <label>Nhập "XÓA" để xác nhận:</label>
              <input
                type="text"
                value={inputConfirmation}
                onChange={(e) => setInputConfirmation(e.target.value)}
                placeholder="XÓA"
              />
            </div>
          )}
        </div>
        <div className={styles['modal-footer']}>
          <button onClick={onClose} className={`${styles.btn} ${styles['cancel-btn']}`}>
            Hủy
          </button>
          <button
            onClick={onConfirm}
            className={`${styles.btn} ${styles['confirm-btn']} ${
              !isConfirmEnabled ? styles.disabled : ''
            }`}
            disabled={lotName && !isConfirmEnabled}
          >
            Xác nhận xóa
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmForm;