import { useState, useEffect } from "react";
import Stats from "./Stats";
import AttendanceTable from "./AttendanceTable";
import LeaveRequests from "./LeaveRequests";
import { getTodayAttendance } from "../../services/attendance";
import { getLeaveRequests, updateLeaveStatus } from "../../services/leave";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        const [attendanceData, leaveData] = await Promise.all([
          getTodayAttendance(),
          getLeaveRequests({ status: "Pending" }),
        ]);

        setStats({
          totalEmployees: 100, // Replace with actual data
          presentToday: attendanceData.presentCount,
          onLeave: attendanceData.leaveCount,
          absent: attendanceData.absentCount,
        });
        setAttendance(attendanceData.records);
        setLeaveRequests(leaveData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleLeaveApproval = async (id, status) => {
    try {
      await updateLeaveStatus(id, status);
      setLeaveRequests(leaveRequests.filter((request) => request.id !== id));
    } catch (error) {
      console.error("Error updating leave status:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      </div>

      <Stats data={stats} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Today's Attendance
          </h2>
          <AttendanceTable data={attendance} isLoading={isLoading} />
        </div>

        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Pending Leave Requests
          </h2>
          <LeaveRequests
            requests={leaveRequests}
            onApprove={(id) => handleLeaveApproval(id, "Approved")}
            onReject={(id) => handleLeaveApproval(id, "Rejected")}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
