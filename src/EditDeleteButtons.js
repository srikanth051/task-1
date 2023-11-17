import React from 'react';
import Button from '@mui/material/Button';

const EditDeleteButtons = ({ onEdit, onDelete }) => {
  return (
    <div className="edit-delete-buttons">
      <Button onClick={onEdit} variant="contained" color="primary">
        Edit
      </Button>
      <Button onClick={onDelete} variant="contained" color="error">
        Delete
      </Button>
    </div>
  );
};

export default EditDeleteButtons;
