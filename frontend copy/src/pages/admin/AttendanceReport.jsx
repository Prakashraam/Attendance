import { useState } from "react";
import { format } from "date-fns";
import Card from "../../components/common/Card";
import Input from "../../components/common/Input";
import Select from "../../components/common/Select";
import Button from "../../components/common/Button";
import AttendanceTable from "./AttendanceTable";
import {
  getAttendanceReport,
  exportAttendanceReport,
} from "../../services/attendance";

export default function AttendanceReport() {
  const [filters, setFilters] = useState({
    startDate: format(new Date(), "yyyy-MM-dd"),
    endDate: format(new Date(), "yyyy-MM-dd"),
    shift: "",
    status: "",
  });
  const [attendance, setAttendance] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    try {
      setIsLoading(true);
      const data = await getAttendanceReport(filters);
      setAttendance(data);
    } catch (error) {
      console.error("Error fetching attendance report:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = async (format) => {
    try {
      const blob = await exportAttendanceReport({ ...filters, format });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `attendance-report-${format(
        new Date(),
        "yyyy-MM-dd"
      )}.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting report:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Attendance Report
        </h1>
      </div>

      <Card>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Input
            type="date"
            label="Start Date"
            value={filters.startDate}
            onChange={(e) =>
              setFilters({ ...filters, startDate: e.target.value })
            }
          />
          <Input
            type="date"
            label="End Date"
            value={filters.endDate}
            onChange={(e) =>
              setFilters({ ...filters, endDate: e.target.value })
            }
          />
          <Select
            label="Shift"
            value={filters.shift}
            onChange={(e) => setFilters({ ...filters, shift: e.target.value })}
            options={[
              { value: "", label: "All Shifts" },
              { value: "1", label: "Shift 1" },
              { value: "2", label: "Shift 2" },
              { value: "3", label: "Shift 3" },
            ]}
          />
          <Select
            label="Status"
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            options={[
              { value: "", label: "All Status" },
              { value: "Present", label: "Present" },
              { value: "Absent", label: "Absent" },
              { value: "Leave", label: "Leave" },
            ]}
          />
        </div>
        <div className="mt-4 flex justify-end space-x-3">
          <Button onClick={handleSearch} isLoading={isLoading}>
            Search
          </Button>
          <Button variant="secondary" onClick={() => handleExport("xlsx")}>
            Export Excel
          </Button>
          <Button variant="secondary" onClick={() => handleExport("pdf")}>
            Export PDF
          </Button>
        </div>
      </Card>

      <AttendanceTable data={attendance} isLoading={isLoading} />
    </div>
  );
}
