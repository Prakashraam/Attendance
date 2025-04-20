# Attendance System Design Document

## Introduction

This document outlines the design and implementation plan for a web-based attendance system tailored to the specified requirements. The system will track employee attendance across three shifts, manage leave policies, generate reports, send notifications, and provide a responsive interface for both mobile and desktop users. The system will also support automatic leave calculations and alerts for leave thresholds.

## Requirements

The attendance system must include the following features:

- **Data Collection**: Collect raw attendance data, possibly from a mill (e.g., biometric devices or manual entry).
- **Leave Policy**: Support 15 days of privilege leave per year, 4 casual leaves (CL), with a monthly schedule of 31 days (6 working days, 1 weekly off).
- **Shifts**: Manage three shifts:
  - Shift 1: 8:00 AM - 4:30 PM (8.5 hours)
  - Shift 2: 4:30 PM - 1:00 AM (8.5 hours)
  - Shift 3: 1:00 AM - 8:00 AM (7 hours)
  - Half-day shifts (e.g., 7:59 AM - 12:00 PM for Shift 1).
- **Attendance Types**: Record attendance as Present, Privilege Leave (with salary), Normal Leave, or Week Off.
- **Employee Access**: Allow employees to log in with their employee number, select a month and date, and view a duty report with columns: Date, In-Time, Out-Time, Shift, Duration. Reports should be exportable in Excel format.
- **Platform**: Provide a responsive web application accessible on mobile and desktop devices.
- **Notifications**: Send notifications to all workers for general announcements and to individual employees for leave-related updates. Employees should view 6 months of historical data.
- **Today's Data**: Display attendance data for the current day with a date range (e.g., from 1/3/25 to 2/5/25 when viewed on 3/5/25).
- **Leave Tracking**: Show total leaves taken on the dashboard. Automatically calculate attendance status (full day, half day) based on in/out times (e.g., 9:05 AM - 12:35 PM as half day).
- **Reports**: Generate reports in Excel and PDF formats.
- **Alerts**: Display a popup message when an employee has taken 15-19 days of leave.

## System Architecture

### Database Design

A relational database (e.g., MySQL or PostgreSQL) will store the system's data. The key tables are:

| Table         | Fields                                                                                                           |
| ------------- | ---------------------------------------------------------------------------------------------------------------- |
| Employees     | EmployeeID, Name, Department, ShiftID, PrivilegeLeaveBalance, NormalLeaveBalance, CLBalance                      |
| Shifts        | ShiftID, Name, StartTime, EndTime, IsHalfDay                                                                     |
| Attendance    | AttendanceID, EmployeeID, Date, InTime, OutTime, ShiftID, Status (Present, PrivilegeLeave, NormalLeave, WeekOff) |
| Leaves        | LeaveID, EmployeeID, LeaveType (Privilege, Normal, CL), StartDate, EndDate, Status (Applied, Approved, Rejected) |
| Notifications | NotificationID, Message, SentTo (EmployeeID or All), DateSent                                                    |
| Settings      | SettingID, WeeklyOffDay, LeavePolicies                                                                           |

### Frontend

The frontend will be built using [React](https://reactjs.org/) with [Bootstrap](https://getbootstrap.com/) for responsive design. Key components include:

- **Login Page**: Authenticate employees and admins using their employee number.
- **Dashboard**: Display total leaves taken, upcoming leaves, and today's attendance status.
- **Attendance Report**: Allow employees to select a month/year and view a table with Date, In-Time, Out-Time, Shift, and Duration.
- **Leave Application Form**: Enable employees to apply for leaves.
- **Notification System**: Show in-app notifications for leave approvals and general announcements.

### Backend

The backend will be developed using [Node.js with Express](https://expressjs.com/) or [Django](https://www.djangoproject.com/). Key API endpoints include:

- `/login`: Authenticate users (using JWT).
- `/attendance`: Fetch attendance data for a given employee and date range.
- `/leave/apply`: Submit a leave application.
- `/leave/approve`: Approve or reject leave requests (admin only).
- `/report/generate`: Generate Excel or PDF reports.

### Integration

- **Data Collection**: If attendance data comes from biometric devices at the mill, implement APIs or data import mechanisms to sync data.
- **Notifications**: Use [Nodemailer](https://nodemailer.com/) for email notifications or integrate with an SMS gateway for broader reach.

### Report Generation

- **Excel Reports**: Use [exceljs](https://github.com/exceljs/exceljs) (Node.js) or [openpyxl](https://openpyxl.readthedocs.io/) (Python) to generate Excel files with attendance details.
- **PDF Reports**: Use [pdfkit](https://github.com/foliojs/pdfkit) to create PDF reports.

### Automatic Leave Calculation

Attendance status will be determined based on in/out times relative to shift timings:

- **Full Day**: Employee covers the entire shift (e.g., 8:00 AM - 4:30 PM for Shift 1).
- **Half Day**: Employee covers at least one half of the shift:
  - Shift 1: First half (8:00 AM - 12:00 PM) or second half (12:00 PM - 4:30 PM).
  - Example: 9:05 AM - 12:35 PM is half day (first half).
- **Leave**: If no attendance is recorded and a leave is approved, mark as Privilege Leave or Normal Leave. If no leave is applied, mark as Normal Leave (potentially unexcused absence).
- **Week Off**: Automatically mark based on the weekly off day (e.g., Sunday).

### Notifications and Alerts

- **General Notifications**: Send announcements to all workers via in-app notifications or email.
- **Leave Notifications**: Notify employees of leave approvals/rejections.
- **Popup Alerts**: Use JavaScript to display a popup when an employee's leave balance reaches 15-19 days (likely Privilege Leave).

### Data Viewing

- **6 Months of Data**: Allow employees to view attendance and leave data for the past 6 months.
- **Today's Data**: Show attendance from the start of the month to the current date (e.g., 1/3/25 to 2/5/25 when viewed on 3/5/25).

## Implementation Plan

### Step 1: Evaluate Open-Source Solutions

Explore the following open-source systems for potential customization:

- **[Horilla Open Source HR Software](https://www.horilla.com/features/attendance/)**: Offers attendance tracking, check-in/out systems, and leave management. Customize to support specific shift timings and half-day logic.
- **[Open HRMS](https://www.openhrms.com/leave-and-attendance-manager/)**: Supports biometric integration and leave tracking. Extend for notification features and report formats.
- **[Attendance_Management_System (GitHub)](https://github.com/aliatayee/Attendance_Management_System)**: A Laravel-based system with biometric support. Modify to include your leave policies and alert system.

### Step 2: Define Custom Rules

Clarify the following:

- **Half-Day Logic**: Confirm how half-day attendance is determined (e.g., minimum hours or specific time windows).
- **Normal Leave**: Determine if Normal Leave includes unexcused absences or is a separate leave type.
- **Casual Leave (CL)**: Verify if CL is part of Normal Leave or a distinct category.

### Step 3: Choose a Tech Stack

If building from scratch, use:

- **Frontend**: React with Bootstrap
- **Backend**: Node.js with Express or Django
- **Database**: MySQL or PostgreSQL
- **Authentication**: JWT
- **Reports**: exceljs (Excel), pdfkit (PDF)
- **Notifications**: Nodemailer (email) or SMS gateway

### Step 4: Develop the System

- **Database**: Set up the schema as outlined.
- **Backend**: Implement APIs and business logic for attendance, leaves, and reports.
- **Frontend**: Build responsive components for user interaction.
- **Integration**: Connect with biometric devices or manual data entry systems.

### Step 5: Testing

Test the system for:

- Correct shift assignments and attendance calculations.
- Leave balance updates and notifications.
- Report generation in Excel and PDF formats.
- Responsive design on mobile and desktop.

### Step 6: Deployment

Deploy the application on a hosting service like [AWS](https://aws.amazon.com/) or [Heroku](https://www.heroku.com/). Ensure secure access and data privacy.

## Sample Database Schema

Below is a sample SQL schema for the key tables:

```sql
CREATE TABLE Employees (
    EmployeeID VARCHAR(50) PRIMARY KEY,
    Name VARCHAR(100),
    Department VARCHAR(50),
    ShiftID INT,
    PrivilegeLeaveBalance DECIMAL(4,1),
    NormalLeaveBalance DECIMAL(4,1),
    CLBalance DECIMAL(4,1),
    FOREIGN KEY (ShiftID) REFERENCES Shifts(ShiftID)
);

CREATE TABLE Shifts (
    ShiftID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(50),
    StartTime TIME,
    EndTime TIME,
    IsHalfDay BOOLEAN
);

CREATE TABLE Attendance (
    AttendanceID INT PRIMARY KEY AUTO_INCREMENT,
    EmployeeID VARCHAR(50),
    Date DATE,
    InTime TIME,
    OutTime TIME,
    ShiftID INT,
    Status ENUM('Present', 'PrivilegeLeave', 'NormalLeave', 'WeekOff'),
    FOREIGN KEY (EmployeeID) REFERENCES Employees(EmployeeID),
    FOREIGN KEY (ShiftID) REFERENCES Shifts(ShiftID)
);

CREATE TABLE Leaves (
    LeaveID INT PRIMARY KEY AUTO_INCREMENT,
    EmployeeID VARCHAR(50),
    LeaveType ENUM('Privilege', 'Normal', 'CL'),
    StartDate DATE,
    EndDate DATE,
    Status ENUM('Applied', 'Approved', 'Rejected'),
    FOREIGN KEY (EmployeeID) REFERENCES Employees(EmployeeID)
);

CREATE TABLE Notifications (
    NotificationID INT PRIMARY KEY AUTO_INCREMENT,
    Message TEXT,
    SentTo VARCHAR(50),
    DateSent DATETIME
);

CREATE TABLE Settings (
    SettingID INT PRIMARY KEY AUTO_INCREMENT,
    WeeklyOffDay VARCHAR(10),
    LeavePolicies JSON
);
```

## Customization Notes

- **Shift Timings**: Configure shifts to match the specified timings. Note that Shift 3 (1:00 AM - 8:00 AM) is 7 hours, which may need clarification or adjustment to align with other shifts (8.5 hours).
- **Leave Alerts**: Implement client-side JavaScript to check leave balances and trigger popups when 15-19 days are reached.
- **Data Integration**: If mill data comes from biometric devices, use APIs or CSV imports to populate the Attendance table.

## Conclusion

By customizing an open-source solution like [Horilla](https://www.horilla.com/features/attendance/) or building from scratch with the outlined tech stack, you can create a robust attendance system that meets all requirements. Ensure thorough testing and secure deployment to provide a reliable user experience.
