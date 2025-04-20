import { format } from "date-fns";
import Button from "../../components/common/Button";

export default function LeaveRequests({
  requests,
  onApprove,
  onReject,
  isLoading,
}) {
  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {requests.map((request) => (
          <li key={request.id}>
            <div className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <p className="truncate text-sm font-medium text-primary-600">
                    {request.employeeName}
                  </p>
                  <p className="ml-4 text-sm text-gray-500">
                    {request.employeeId}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => onApprove(request.id)}
                    disabled={isLoading}
                  >
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => onReject(request.id)}
                    disabled={isLoading}
                  >
                    Reject
                  </Button>
                </div>
              </div>
              <div className="mt-2 sm:flex sm:justify-between">
                <div className="sm:flex">
                  <p className="flex items-center text-sm text-gray-500">
                    {request.leaveType}
                  </p>
                  <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                    {format(new Date(request.startDate), "dd MMM yyyy")} -
                    {format(new Date(request.endDate), "dd MMM yyyy")}
                  </p>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                  <p>
                    Applied on{" "}
                    {format(new Date(request.appliedDate), "dd MMM yyyy")}
                  </p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
