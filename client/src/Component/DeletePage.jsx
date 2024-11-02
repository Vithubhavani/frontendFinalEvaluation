

export default function DeletePage({ onConfirm, onCancel }) {
  return (
    <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        padding: '20px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)'
      }}>
      <h3>Are you sure you want to delete this task?</h3>
      <button onClick={onConfirm} style={{ marginRight: '10px' }}>Delete</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
}

