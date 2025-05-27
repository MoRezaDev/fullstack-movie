import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "شنبه", visits: 120 },
  { day: "یک‌شنبه", visits: 200 },
  { day: "دوشنبه", visits: 150 },
  { day: "سه‌شنبه", visits: 250 },
  { day: "چهارشنبه", visits: 300 },
  { day: "پنج‌شنبه", visits: 180 },
  { day: "جمعه", visits: 100 },
];

const LineChartData = () => {
  return (
    <div className="bg-zinc-900 p-4 rounded-2xl shadow-lg w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="day" stroke="#aaa" />
          <YAxis stroke="#aaa" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f1f1f",
              border: "1px solid #333",
              color: "#fff",
            }}
            itemStyle={{ color: "#fff" }}
            cursor={{ stroke: "#38bdf8", strokeWidth: 1 }}
          />
          <Line
            type="monotone"
            dataKey="visits"
            stroke="#38bdf8"
            strokeWidth={2}
            dot={{ r: 5, fill: "#38bdf8" }}
            activeDot={{
              r: 7,
              stroke: "#38bdf8",
              strokeWidth: 2,
              fill: "#0f172a",
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartData;
