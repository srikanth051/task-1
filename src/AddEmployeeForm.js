// AddEmployeeForm.jsx
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AddEmployeeForm = ({ addEmployee, closeForm }) => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  const handleSubmit = () => {
    const employee = {
      name,
      position,
      fromDate,
      toDate,
    };

    if (name && position) {
      addEmployee(employee);
      closeForm();
      Swal.fire('Success', 'Employee added successfully!', 'success');
    } else {
      Swal.showValidationMessage('Please fill in all fields.');
    }
  };

  return (
    <div>
      <label htmlFor="swal-input-name">Name:</label>
      <input
        id="swal-input-name"
        className="swal2-input"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label htmlFor="swal-input-position">Position:</label>
      <input
        id="swal-input-position"
        className="swal2-input"
        placeholder="Position"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
      />

      <label htmlFor="swal-input-fromDate">From Date:</label>
      <DatePicker
        id="swal-input-fromDate"
        selected={fromDate}
        onChange={(date) => setFromDate(date)}
      />

      <label htmlFor="swal-input-toDate">To Date:</label>
      <DatePicker
        id="swal-input-toDate"
        selected={toDate}
        onChange={(date) => setToDate(date)}
      />

      <button type="button" onClick={handleSubmit}>
        Add Employee
      </button>
    </div>
  );
};

export default AddEmployeeForm;
