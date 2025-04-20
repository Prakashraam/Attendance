import { useState, useEffect } from "react";
import Card from "../../components/common/Card";
import Select from "../../components/common/Select";
import Button from "../../components/common/Button";
import { getLeaveRequests, updateLeaveStatus } from "../../services/leave";

// Mock data for initial testing
const MOCK_LEAVE_REQUESTS = [
  {
    id: 1,
    employeeId: "EMP001",
    employeeName: "John Doe",
    leaveType: "Privilege Leave",
    startDate: "2024-03-01",
    endDate: "2024-03-03",
    status: "Pending",
    reason: "Family function",
    appliedDate: "2024-02-25",
  },
  // Add more mock data as needed
];

export default function LeaveManagement() {
  const [leaveRequests, setLeaveRequests] = useState(MOCK_LEAVE_REQUESTS);
  const [filter, setFilter] = useState("Pending");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchLeaveRequests();
  }, [filter]);

  const fetchLeaveRequests = async () => {
    try {
      setIsLoading(true);
      // In development, use mock data instead of API call
      // const data = await getLeaveRequests({ status: filter });
      // setLeaveRequests(data);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLeaveRequests(
        MOCK_LEAVE_REQUESTS.filter(
          (request) => filter === "All" || request.status === filter
        )
      );
    } catch (error) {
      console.error("Error fetching leave requests:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      setIsLoading(true);
      // In development, update local state instead of API call
      // await updateLeaveStatus(id, newStatus);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLeaveRequests(
        leaveRequests.map((request) =>
          request.id === id ? { ...request, status: newStatus } : request
        )
      );
    } catch (error) {
      console.error("Error updating leave status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">
          Leave Management
        </h1>
        <div className="mt-4 sm:mt-0">
          <Select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            options={[
              { value: "All", label: "All Requests" },
              { value: "Pending", label: "Pending" },
              { value: "Approved", label: "Approved" },
              { value: "Rejected", label: "Rejected" },
            ]}
            className="w-48"
          />
        </div>
      </div>

      <Card>
        {isLoading ? (
          <div className="text-center py-4">Loading...</div>
        ) : leaveRequests.length === 0 ? (
          <div className="text-center py-4 text-gray-500">
            No leave requests found
          </div>
        ) : (
          <ul role="list" className="divide-y divide-gray-200">
            {leaveRequests.map((request) => (
              <li key={request.id} className="py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-primary-600">
                      {request.employeeName} ({request.employeeId})
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      {request.leaveType} •{" "}
                      {new Date(request.endDate).getDate() -
                        new Date(request.startDate).getDate() +
                        1}{" "}
                      days
                    </p>
                  </div>
                  {request.status === "Pending" && (
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() =>
                          handleStatusUpdate(request.id, "Approved")
                        }
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() =>
                          handleStatusUpdate(request.id, "Rejected")
                        }
                      >
                        Reject
                      </Button>
                    </div>
                  )}
                  {request.status !== "Pending" && (
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${
                        request.status === "Approved"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {request.status}
                    </span>
                  )}
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      From: {new Date(request.startDate).toLocaleDateString()}
                    </p>
                    <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                      To: {new Date(request.endDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <p>
                      Applied on{" "}
                      {new Date(request.appliedDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                {request.reason && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Reason: {request.reason}
                    </p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
