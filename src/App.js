import React, { useState, useEffect } from 'react';
import { openDB } from 'idb';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import './App.css';
import addEmployeeGif from './add-user.png';
import EmployeeList from './EmployeeList';

const App = () => {
  const [employees, setEmployees] = useState([]);
  // eslint-disable-next-line
  const [selectedEmployee, setSelectedEmployee] = useState({});

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const db = await openDB('myDB', 1, {
          upgrade(db) {
            db.createObjectStore('employees', { keyPath: 'id', autoIncrement: true });
          },
        });
        const employees = await db.getAll('employees');
        setEmployees(employees);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  const isValidYear = (year) => {
    const currentYear = new Date().getFullYear();
    return year >= 1900 && year <= currentYear;
  };

  const openForm = (isEditing, employeeId) => {
    const title = isEditing ? 'Edit Employee' : 'Add Employee';

    const existingEmployee = employees.find((e) => e.id === employeeId);
    const employeeData = existingEmployee || {
      name: '',
      position: '',
      fromDate: '',
      toDate: '',
      isCurrentlyWorking: false,
    };

    setSelectedEmployee(employeeData);

    Swal.fire({
      title,
      html: `
        <input id="swal-input1" class="swal2-input" placeholder="Name" value="${employeeData.name}">
        <input id="swal-input2" class="swal2-input" placeholder="Position" value="${employeeData.position}">
        <input id="swal-input3" class="swal2-input" placeholder="From Date (YYYY-MM-DD)" type="text" onfocus="(this.type='date')" value="${employeeData.fromDate}">
        <input id="swal-input4" class="swal2-input" placeholder="To Date (YYYY-MM-DD)" type="text" onfocus="(this.type='date')" value="${employeeData.toDate}">
        <label for="swal-input5" class="swal2-checkbox-label">Currently Working</label>
        <input id="swal-input5" class="swal2-checkbox" type="checkbox" ${employeeData.isCurrentlyWorking ? 'checked' : ''}>
      `,
      focusConfirm: false,
      preConfirm: () => {
        const name = document.getElementById('swal-input1').value;
        const position = document.getElementById('swal-input2').value;
        const fromDateInput = document.getElementById('swal-input3');
        const toDateInput = document.getElementById('swal-input4');
        const isCurrentlyWorking = document.getElementById('swal-input5').checked;

        const fromDate = fromDateInput.value;
        const toDate = isCurrentlyWorking ? null : toDateInput.value;

        if (!name || !position || !fromDate || !isValidYear(new Date(fromDate).getFullYear())) {
          Swal.showValidationMessage('Please fill in valid Name, Position, and From Date');
          return false;
        }

        const employee = {
          id: isEditing ? employeeId : Date.now(),
          name,
          position,
          fromDate,
          toDate,
          isCurrentlyWorking,
        };

        const updateEmployee = async (employee) => {
          try {
            const db = await openDB('myDB', 1);
            await db.put('employees', employee);
            setEmployees([...employees.filter((e) => e.id !== employee.id), employee]);
            Swal.fire('Success', 'Employee updated successfully!', 'success');
          } catch (error) {
            console.error('Error updating employee:', error);
          }
        };

        const addEmployee = async (employee) => {
          try {
            const db = await openDB('myDB', 1);
            await db.add('employees', employee);
            setEmployees([...employees, employee]);
            Swal.fire('Success', 'Employee added successfully!', 'success');
          } catch (error) {
            console.error('Error adding employee:', error);
          }
        };

        if (isEditing) {
          updateEmployee(employee);
        } else {
          addEmployee(employee);
        }
      },
    });
  };

  const deleteEmployee = async (employeeId) => {
    try {
      const db = await openDB('myDB', 1);
      await db.delete('employees', employeeId);
      setEmployees(employees.filter((e) => e.id !== employeeId));
      Swal.fire('Success', 'Employee deleted successfully!', 'success');
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <div>
      <h1>Employee Management App</h1>
      <button className="gif-button" onClick={() => openForm(false)}>
        <img className="gif-image" src={addEmployeeGif} alt="Add Employee" />
      </button>
      <EmployeeList
        employees={employees}
        editEmployee={(employee) => {
          setSelectedEmployee(employee);
          openForm(true, employee.id);
        }}
        deleteEmployee={deleteEmployee}
      />
    </div>
  );
};

export default App;