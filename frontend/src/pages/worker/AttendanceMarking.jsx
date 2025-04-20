import { useState, useEffect } from "react";
import { format } from "date-fns";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import { SHIFTS } from "../../utils/constants";

// Move the mock function outside the component
const mockMarkAttendance = async (employeeId) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (!employeeId.match(/^EMP\d{3}$/)) {
    throw new Error("Invalid Employee ID format");
  }
  return true;
};

export default function AttendanceMarking() {
  const [employeeId, setEmployeeId] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      await mockMarkAttendance(employeeId);
      setMessage({
        type: "success",
        text: `Attendance marked successfully at ${format(
          new Date(),
          "hh:mm:ss a"
        )}`,
      });
      setEmployeeId("");
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message || "Failed to mark attendance",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Clock Display */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-gray-900 tracking-tight">
              {format(currentTime, "hh:mm:ss")}
            </h1>
            <p className="mt-2 text-xl text-gray-500">
              {format(currentTime, "EEEE, MMMM do, yyyy")}
            </p>
          </div>
        </div>
      </div>

      {/* Attendance Form */}
      <div className="max-w-lg mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="employeeId"
                className="block text-2xl font-medium text-gray-700 text-center"
              >
                Enter Employee ID
              </label>
              <div className="mt-4">
                <input
                  type="text"
                  id="employeeId"
                  name="employeeId"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value.toUpperCase())}
                  className="block w-full text-center text-4xl py-8 px-4 border-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="EMP001"
                  required
                  disabled={isLoading}
                  autoComplete="off"
                  pattern="EMP\d{3}"
                  title="Please enter a valid Employee ID (e.g., EMP001)"
                />
              </div>
            </div>

            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full py-6 text-xl"
            >
              {isLoading ? "Processing..." : "Mark Attendance"}
            </Button>
          </form>

          {message && (
            <div
              className={`mt-4 p-4 rounded-md ${
                message.type === "success"
                  ? "bg-green-50 text-green-800"
                  : "bg-red-50 text-red-800"
              }`}
            >
              {message.text}
            </div>
          )}
        </Card>

        {/* Shift Information */}
        <Card className="mt-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Current Shifts
          </h2>
          <div className="space-y-4">
            {Object.values(SHIFTS).map((shift) => (
              <div key={shift.id} className="flex justify-between items-center">
                <span className="text-gray-600">{shift.name}</span>
                <span className="text-gray-900">
                  {shift.startTime} - {shift.endTime}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
