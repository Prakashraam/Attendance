import { useState } from "react";
import AttendanceTable from "../components/attendance/AttendanceTable";

export default function AttendanceReport() {
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );
  const [attendanceData] = useState([
    {
      date: "2024-03-01",
      inTime: "09:00 AM",
      outTime: "05:30 PM",
      shift: "Shift 1",
      duration: "8.5 hrs",
      status: "Present",
    },
    // Add more mock data as needed
  ]);

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Attendance Report
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            View and download your attendance records
          </p>
        </div>
      </div>

      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label
                htmlFor="month"
                className="block text-sm font-medium text-gray-700"
              >
                Select Month
              </label>
              <input
                type="month"
                name="month"
                id="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </div>
            <div className="flex items-end">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Download Report
              </button>
            </div>
          </div>
        </div>
      </div>

      <AttendanceTable attendanceData={attendanceData} />
    </div>
  );
}
