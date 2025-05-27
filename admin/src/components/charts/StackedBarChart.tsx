import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";

const data = [
  { name: "شنبه", active: 200, inactive: 100 },
  { name: "یک‌شنبه", active: 250, inactive: 90 },
  { name: "دوشنبه", active: 150, inactive: 120 },
  { name: "سه‌شنبه", active: 300, inactive: 80 },
  { name: "چهارشنبه", active: 280, inactive: 60 },
  { name: "پنج‌شنبه", active: 180, inactive: 100 },
  { name: "جمعه", active: 120, inactive: 150 },
];

export default function StackedBarChart() {
  return (
    <div className="bg-zinc-900 p-4 rounded-2xl shadow-lg w-full h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="name" stroke="#aaa" />
          <YAxis stroke="#aaa" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f1f1f",
              border: "1px solid #333",
              color: "#fff",
            }}
            itemStyle={{ color: "#fff" }}
            cursor={{ fill: "transparent" }}
          />
          <Legend wrapperStyle={{ color: "#ccc" }} />
          <Bar dataKey="active" stackId="users" fill="#8b5cf6" />
          <Bar dataKey="inactive" stackId="users" fill="#272d30    " />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
