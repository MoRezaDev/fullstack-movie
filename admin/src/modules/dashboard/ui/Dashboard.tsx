import Breadcrumb from "../../../components/BreadCrumb";
import Card from "../../../components/Card";
import PostsBarChart from "../../../components/charts/PostsBarChart";
import CustomPieChart from "../../../components/charts/UsersPieChart";
import LineChartData from "../../../components/charts/LineChart";
import StackedBarChart from "../../../components/charts/StackedBarChart";

export default function Dashboard() {
  return (
    <div className="p-4">
      <Breadcrumb />
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card title="تعداد کاربران">
          <p className="text-2xl font-bold">۵۴۳</p>
        </Card>
        <Card title="تعداد کاربران">
          <p className="text-2xl font-bold">۵۴۳</p>
        </Card>
        <Card title="تعداد کاربران">
          <p className="text-2xl font-bold">۵۴۳</p>
        </Card>
        <Card title="تعداد کاربران">
          <p className="text-2xl font-bold">۵۴۳</p>
        </Card>
      </div>
      <div
        style={{ direction: "ltr" }}
        className="mt-4 grid md:grid-cols-2 gap-4 text-xs"
      >
        <Card>
          <PostsBarChart />
        </Card>
        <Card>
          <CustomPieChart />
        </Card>
        <Card>
          <LineChartData />
        </Card>
        <Card>
          <StackedBarChart />
        </Card>
      </div>
    </div>
  );
}
