import React, { useState } from 'react';
import Swal from 'sweetalert2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const EditEmployeeForm = ({ selectedEmployee, editEmployee }) => {
  const [name, setName] = useState(selectedEmployee.name);
  const [position, setPosition] = useState(selectedEmployee.position);
  const [fromDate, setFromDate] = useState(selectedEmployee.fromDate);
  const [toDate, setToDate] = useState(selectedEmployee.toDate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && position) {
      const updatedEmployee = {
        ...selectedEmployee,
        name,
        position,
        fromDate,
        toDate,
      };
      editEmployee(updatedEmployee);
      Swal.fire('Success', 'Employee updated successfully!', 'success');
    } else {
      Swal.fire('Error', 'Please fill in all fields.', 'error');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Position:
        <input type="text" value={position} onChange={(e) => setPosition(e.target.value)} />
      </label>
      <label>
        From Date:
        <DatePicker selected={fromDate} onChange={(date) => setFromDate(date)} />
      </label>
      <label>
        To Date:
        <DatePicker selected={toDate} onChange={(date) => setToDate(date)} />
      </label>
      <button type="submit">Update Employee</button>
    </form>
  );
};

export default EditEmployeeForm;