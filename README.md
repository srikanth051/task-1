# Employee Management System

## Overview

The Employee Management System is a React web application designed for efficiently managing employee records. The application utilizes the IndexedDB concept for local data storage, providing features for adding, updating, and deleting employee details. Additionally, it incorporates swipe gestures for a seamless user experience.

## Functionality

- **Add Employee:** Easily add new employees by providing their name, position, start date, end date (if applicable), and current employment status.

- **Update Employee:** Swipe right on an employee record to initiate an update. Modify details such as name, position, and employment dates.

- **Delete Employee:** Swipe left on an employee record to trigger the delete action. A confirmation prompt ensures the prevention of accidental deletions.

- **Local Data Storage:** IndexedDB is employed for local data storage, allowing users to access their employee records even when offline.

## Deployment

The application is deployed using GitHub Pages and can be accessed [here](#). 

## Usage

1. Visit the [Employee Management System](https://srikanth051.github.io/task-1/) deployed on GitHub Pages.

2. Use the "Add Employee" button to include new employees in the system.

3. Swipe right on an employee's entry to edit their details.

4. Swipe left on an employee's entry to delete the record, with a confirmation prompt.

5. The list is organized into present and past employees based on their employment status.

6. If no employee data is found, an informative image is displayed.

## Local Development

To run the app locally:

1. **Clone the repository:**

    ```bash
    git clone https://github.com/srikanth051/task-1.git
    cd employee-management-system
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Start the development server:**

    ```bash
    npm start
    ```

    Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Make your changes and test the app locally.**

## Technologies Used

- **React:** The application is built using the React library, providing a component-based architecture for efficient development.

- **IndexedDB:** IndexedDB is utilized for local data storage, allowing the application to store employee details locally on the user's device.

- **Swipe Gestures:** Swipe gestures are implemented to enhance user interaction. Users can swipe right to update a record and swipe left to delete a record.

- **GitHub Pages:** The application is deployed using GitHub Pages, providing a simple and free hosting solution for static websites.

- **SweetAlert2:** SweetAlert2 is used for interactive alerts, providing a more user-friendly experience when adding, editing, or deleting employee records.



