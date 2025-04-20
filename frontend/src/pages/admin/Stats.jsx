import Card from "../../components/common/Card";
import {
  UsersIcon,
  ClockIcon,
  ExclamationCircleIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";

export default function Stats({ data }) {
  const stats = [
    {
      name: "Total Employees",
      value: data?.totalEmployees || 0,
      icon: UsersIcon,
      change: data?.employeeChange || 0,
      changeType: "increase",
    },
    {
      name: "Present Today",
      value: data?.presentToday || 0,
      icon: ClockIcon,
      change: data?.presentChange || 0,
      changeType: "increase",
    },
    {
      name: "On Leave",
      value: data?.onLeave || 0,
      icon: CalendarIcon,
      change: data?.leaveChange || 0,
      changeType: "decrease",
    },
    {
      name: "Absent",
      value: data?.absent || 0,
      icon: ExclamationCircleIcon,
      change: data?.absentChange || 0,
      changeType: "decrease",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((item) => (
        <Card key={item.name} className="px-4 py-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <item.icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  {item.name}
                </dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">
                    {item.value}
                  </div>
                  {item.change !== 0 && (
                    <div
                      className={`ml-2 flex items-baseline text-sm font-semibold ${
                        item.changeType === "increase"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {item.change > 0 ? "+" : ""}
                      {item.change}%
                    </div>
                  )}
                </dd>
              </dl>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
