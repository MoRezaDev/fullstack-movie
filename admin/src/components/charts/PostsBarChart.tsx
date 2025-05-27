import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "فروردین", posts: 30 },
  { name: "اردیبهشت", posts: 45 },
  { name: "خرداد", posts: 70 },
  { name: "تیر", posts: 55 },
];

const PostsBarChart = () => {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#aaa" />
        <YAxis stroke="#aaa" />
        <Tooltip
          cursor={{ fill: "transparent" }}
          contentStyle={{
            backgroundColor: "#222",
            borderColor: "#333",
            color: "#fff",
          }}
        />
        <Bar
          dataKey="posts"
          fill="#38bdf8"
          radius={[4, 4, 0, 0]}
          activeBar={false}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default PostsBarChart;
