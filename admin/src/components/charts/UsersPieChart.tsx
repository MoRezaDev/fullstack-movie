"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "کاربران", value: 400 },
  { name: "پست‌ها", value: 300 },
  { name: "کامنت‌ها", value: 300 },
  { name: "درخواست‌ها", value: 200 },
];

const COLORS = ["#38bdf8", "#f472b6", "#34d399", "#facc15"];

const UsersPieChart = () => {
  return (
    <div className="bg-zinc-900 p-4 rounded-2xl  shadow-lg w-full flex  gap-6">
      {/* Pie Chart */}
      <div className="w-full md:w-2/3 h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f1f1f",
                border: "1px solid #333",
                color: "#fff",
              }}
              itemStyle={{ color: "#fff" }}
              cursor={{ fill: "transparent" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Data Summary */}
      <div className="w-full lg:w-1/3 hidden flex-col justify-center gap-4 lg:flex  ">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-zinc-800 rounded-xl px-4 py-2"
          >
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-sm text-gray-300">{item.name}</span>
            </div>
            <span className="text-sm font-semibold text-white">
              {item.value.toLocaleString()} عدد
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersPieChart;
