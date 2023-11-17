// AddEmployeePage.js
import React from 'react';
import AddEmployeeForm from './AddEmployeeForm';
import Swal from 'sweetalert2';

const AddEmployeePage = ({ addEmployee, closeForm }) => {
  return (
    <div>
      <h2>Add Employee</h2>
      <AddEmployeeForm
        addEmployee={addEmployee}
        closeForm={() => {
          closeForm();
          Swal.close();
        }}
      />
    </div>
  );
};

export default AddEmployeePage;
