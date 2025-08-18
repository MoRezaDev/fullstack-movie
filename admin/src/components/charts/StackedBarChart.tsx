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
  { name: "شنبه", "کاربران فعال": 200, "کاربران غیرفعال": 100 },
  { name: "یک‌شنبه", "کاربران فعال": 250, "کاربران غیرفعال": 90 },
  { name: "دوشنبه", "کاربران فعال": 150, "کاربران غیرفعال": 120 },
  { name: "سه‌شنبه", "کاربران فعال": 300, "کاربران غیرفعال": 80 },
  { name: "چهارشنبه", "کاربران فعال": 280, "کاربران غیرفعال": 60 },
  { name: "پنج‌شنبه", "کاربران فعال": 180, "کاربران غیرفعال": 100 },
  { name: "جمعه", "کاربران فعال": 120, "کاربران غیرفعال": 150 },
];

export default function StackedBarChart() {
  return (
    <div className="bg-zinc-900 p-4 rounded-2xl shadow-lg w-full h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="name" stroke="#aaa"></XAxis>
          <YAxis stroke="#aaa"></YAxis>
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
          <Bar dataKey="کاربران فعال" stackId="users" fill="#8b5cf6" />
          <Bar dataKey="کاربران غیرفعال" stackId="users" fill="#3b4549    " />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
