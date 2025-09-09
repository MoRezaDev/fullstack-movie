import Breadcrumb from "../../../components/BreadCrumb";
import Card from "../../../components/Card";
import PostsBarChart from "../../../components/charts/PostsBarChart";
import CustomPieChart from "../../../components/charts/UsersPieChart";
import LineChartData from "../../../components/charts/LineChart";
import StackedBarChart from "../../../components/charts/StackedBarChart";
import { useNavigation } from "react-router";
import NavigationLoader from "../../../components/NavigationLoader";

export default function Dashboard() {
  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);

  if (isNavigating) return <NavigationLoader />;
  return (
    <div className="p-4  ">
      <Breadcrumb />
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-blue-500" title="تعداد کاربران">
          <p className="text-sm text-green-500">100</p>
        </Card>
        <Card title="تعداد مشاهده ها">
          <p className="text-sm text-green-500">۵۴۳</p>
        </Card>
        <Card title="تعداد مشترکین VIP">
          <p className="text-sm text-green-500">30</p>
        </Card>
        <Card title="تعداد کامنت ها">
          <p className="text-sm text-green-500">40</p>
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
