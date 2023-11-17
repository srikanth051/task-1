import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { useGesture } from 'react-use-gesture';
import Swal from 'sweetalert2';
import EditDeleteButtons from './EditDeleteButtons';

const EmployeeListItem = ({ employee, editEmployee, deleteEmployee }) => {
  const [isSelected, setIsSelected] = useState(false);
  const [isCursorOver, setIsCursorOver] = useState(false);

  const [props, set] = useSpring(() => ({ x: 0, color: 'transparent' }));

  const bind = useGesture({
    onDrag: ({ down, movement: [mx], direction: [xDir] }) => {
      set({
        x: down ? mx : 0,
        color: xDir > 0 ? (mx > window.innerWidth / 2 ? 'yellow' : 'transparent') : 'red',
      });

      if (!down && Math.abs(mx) > window.innerWidth / 2) {
        if (xDir > 0) {
          editEmployee(employee);
        } else {
          Swal.fire({
            title: 'Delete Employee',
            text: 'Are you sure you want to delete this employee?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
          }).then((result) => {
            if (result.isConfirmed) {
              deleteEmployee(employee.id);
            }
          });
        }
      }
    },
    onMouseEnter: () => {
      setIsCursorOver(true);
    },
    onMouseLeave: () => {
      setIsCursorOver(false);
    },
    onClick: () => {
      setIsSelected(!isSelected);
    },
  });

  return (
    <animated.div
      className={`employee-list-item ${isSelected ? 'selected' : ''}`}
      {...bind()}
      style={{
        position: 'relative',
        transform: props.x.interpolate((x) => `translate3d(${x}px, 0, 0)`),
        background: `linear-gradient(to right, ${props.color} 50%, transparent 50%)`,
      }}
    >
      <div>ID: {employee.id}</div>
      <div>Name: {employee.name}</div>
      <div>Position: {employee.position}</div>
      <div>
        Duration: {employee.isCurrentlyWorking ? 'Currently Working' : `${employee.fromDate} - ${employee.toDate}`}
      </div>

      {isCursorOver && (
        <EditDeleteButtons
          onEdit={() => editEmployee(employee)}
          onDelete={() => deleteEmployee(employee.id)}
        />
      )}
    </animated.div>
  );
};

const EmployeeList = ({ employees, editEmployee, deleteEmployee }) => {
  const presentEmployees = employees.filter((employee) => employee.isCurrentlyWorking);
  const pastEmployees = employees.filter((employee) => !employee.isCurrentlyWorking);

  return (
    <div className="employee-list">
      

      <div className="employee-list-section">
        <div className="employee-list-section-title">Present Employees</div>
        {presentEmployees.map((employee) => (
          <EmployeeListItem
            key={employee.id}
            employee={employee}
            editEmployee={editEmployee}
            deleteEmployee={deleteEmployee}
          />
        ))}
      </div>

      <div className="employee-list-section">
        <div className="employee-list-section-title">Past Employees</div>
        {pastEmployees.map((employee) => (
          <EmployeeListItem
            key={employee.id}
            employee={employee}
            editEmployee={editEmployee}
            deleteEmployee={deleteEmployee}
          />
        ))}
      </div>
    </div>
  );
};

export default EmployeeList;
