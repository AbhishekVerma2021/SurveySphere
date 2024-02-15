/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";


// Data
import reportsBarChartData from "views/dashboard/data/reportsBarChartData";
import reportsLineChartData from "views/dashboard/data/reportsLineChartData";
import StarRateIcon from '@mui/icons-material/StarRate';
// Dashboard components
import Projects from "views/dashboard/components/Projects";
import { useEffect, useState } from "react";
// import OrdersOverview from "views/dashboard/components/OrdersOverview";
import GroupIcon from '@mui/icons-material/Group';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import MoneyIcon from '@mui/icons-material/Money';
const Dashboard = (props) => {
  const { sales, tasks } = reportsLineChartData;
  const [barCharData, setBarChartData] = useState({});
  const [lineChartOneData, setLineChartOneData] = useState({});
  const [lineChartTwoData, setLineChartTwoData] = useState({});
  const [secBarData, setSecBarData] = useState({});
  // const [fData, setFData] = useState();
  const [sData, setSData] = useState();
  const [thData, setThData] = useState();
  const [foData, setFoData] = useState();

  const {
    getBarData,
    getLineOneData,
    getLineTwoData,
    barGraphData,
    lineGraph1Data,
    lineGraph2Data,
    getDashBoardCountData,
    dashBoardCountData,
    getActiveSubscriptions,
    activePlanName,
  } = props;

  const [activePlan, setActivePlan] = useState("");

  useEffect(() => {
    const getAllGraphsData = async () => {
      try {
        await getBarData();
        await getLineOneData();
        await getLineTwoData();
        await getDashBoardCountData();
        await getActiveSubscriptions();
      }
      catch (er) {
        alert('Something Went Wrong !!!')
      };
    };
    getAllGraphsData();
  }, []);

  useEffect(() => {
    setActivePlan(activePlanName);
  }, [activePlanName])


  const handleBarChardData = (Data) => {
    // console.log(Data)
    const barData = {
      labels: ["S", "M", "T", "W", "T", "F", "S"],
      datasets: { label: "Reviews", data: Data.map(review => review.count) }
    }
    setBarChartData(barData);
  };

  const handleLineOneChartData = (Data) => {
    const line1Data = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: { labels: 'Reviews this Month', data: Data.map(review => review.count), },
    };

    setLineChartOneData(line1Data);
    // sales: {
    //   labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    //   datasets: { label: "Mobile apps", data: [50, 40, 300, 320, 500, 350, 200, 230, 500] },
    // },
  };

  const handleLineTwoChartData = (Data) => {
    const line2Data = {
      labels: ["S", "M", "T", "W", "T", "F", "S"],
      datasets: { labels: 'Avg Stars', data: Data.map(review => review.averageRating ? review.averageRating : 0), },
    };

    setLineChartTwoData(line2Data);
    // tasks: {
    //   labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    //   datasets: { label: "Desktop apps", data: [50, 40, 300, 220, 500, 250, 400, 230, 500] },
    // },
  };


  const handleDashboardCountData = (Data) => {
    const { totalReviews, totalReviewsToday, fiveStarReviews, fourStarReviews, threeStarReviews, twoStarReviews, oneStarReviews } = Data;
    // console.log(fiveStarReviews, fourStarReviews, threeStarReviews, twoStarReviews, oneStarReviews)
    const bar2Data = {
      labels: ["1⭐", "2⭐", "3⭐", "4⭐", "5⭐"],
      datasets: { label: "Rating", data: [fiveStarReviews, fourStarReviews, threeStarReviews, twoStarReviews, oneStarReviews].reverse() }
    }
    const averageFiveStarRating = fiveStarReviews / (fiveStarReviews + fourStarReviews + threeStarReviews + twoStarReviews + oneStarReviews)
    // setFData('Half Yearly')
    setSData(totalReviews)
    setThData(totalReviewsToday)
    setFoData(averageFiveStarRating.toFixed(2))
    setSecBarData(bar2Data);
  };


  useEffect(() => {
    // console.log(barCharData.length)
    barGraphData && barGraphData.length > 0 && handleBarChardData(barGraphData);
    lineGraph1Data && lineGraph1Data.length > 0 && handleLineOneChartData(lineGraph1Data);
    lineGraph2Data && lineGraph2Data.length > 0 && handleLineTwoChartData(lineGraph2Data);
    dashBoardCountData && Object.values(dashBoardCountData).length > 0 && handleDashboardCountData(dashBoardCountData);
  }, [barGraphData, lineGraph1Data, lineGraph2Data, dashBoardCountData])
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon={<MoneyIcon/>}
                title="Current Active Plan"
                count={activePlan ? activePlan : "None"}
                percentage={{
                  color: "success",
                  amount: '12/10/2024',
                  label: "Validity ",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon={<GroupIcon/>}
                title="Total Review's"
                count={sData}
                percentage={{
                  color: "success",
                  amount: "+3%",
                  label: "than last month",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon={<SupervisedUserCircleIcon/>}
                title="Todays Review count"
                count={thData}
                percentage={{
                  color: "success",
                  amount: "+1%",
                  label: "than yesterday",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon={<StarRateIcon/>}
                title="Average 5⭐ Rating"
                count={foData  > 0 ? foData : 0}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Updated Yesterday",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="Reviews per week"
                  description="Progress of your hotel this week"
                  date="last calculated recently"
                  chart={barCharData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="Monthly Reviews"
                  description="Progress of your hotel this month"
                  date="Updated last Month"
                  chart={lineChartOneData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="Average rating this week"
                  description="Your average rating this week"
                  date="Updated last day"
                  chart={lineChartTwoData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="error"
                  title="Star ⭐ ratings this week"
                  description="Your ⭐ rating count for this week"
                  date="Updated last day"
                  chart={secBarData}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              {/* <Projects /> */}
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              {/* <OrdersOverview /> */}
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
