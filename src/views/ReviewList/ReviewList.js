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
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import './ReviewList.css';

// Data
import authorsTableData from "views/ReviewList/data/authorsTableData";
import projectsTableData from "views/ReviewList/data/projectsTableData";
import { useEffect, useState } from "react";
import MDAvatar from "components/MDAvatar";
import glassDoor from '../../Images/glassdoor.png';
import instagram from '../../Images/instagram.png';
import maps from '../../Images/maps.png';
import twitter from '../../Images/twitter.png';
import facebook from '../../Images/facebook.png';
import MDBadge from "../../components/MDBadge";

import ViewReviewDialog from "./ViewReviewDialog";
import Projects from "views/dashboard/components/Projects";
import { Icon } from "@mui/material";
import MDProgress from "components/MDProgress";
import { Google } from "@mui/icons-material";
import noDataImg from '../../Images/noReviewsList.svg';


const ReviewList = (props) => {
  const { columns, rows } = authorsTableData();
  const { columns: pColumns, rows: pRows } = projectsTableData();
  const [rowsData, setRowsData] = useState([]);
  const [openReviewDialog, setOpenReviewDialog] = useState(false);
  const [secTableRowsData, setSecTableRowsData] = useState([]);
  const [customerFeedback, setCustomerFeedback] = useState('');
  const {
    getReviewsData,
    allReviewsData,
    getHotelData,
    hotelDetailsRedux,
  } = props;

  const [activePlat, setActivePlat] = useState([]);

  useEffect(() => {
    const getHotelDetails = async () => {
      try {
        await getHotelData();
      }
      catch (err) {
        alert('Something went wrong!!')
      };
    };
    getHotelDetails();
  }, []);


  useEffect(() => {
    const { activePlatforms } = hotelDetailsRedux;
    setActivePlat(activePlatforms);
  }, [hotelDetailsRedux]);


  const Author = ({ image, name, description }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" className="platformNameInList" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption" component="div" className="reviewTextForReview">{description}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      {/* <MDTypography variant="caption">{description}</MDTypography> */}
    </MDBox>
  );

  const dataForRows = (reviewsData) => {
    let allRowsData = [];
    // console.log(reviewsData)
    reviewsData && reviewsData.length > 0 && reviewsData.map(review => {
      const { platform, starRating, creation_date, customer_feedback, _id, business_id } = review;
      const platformIcon = platform === 'google' ? maps : platform === 'instagram' ? instagram : platform === 'glassdoor' ? glassDoor : platform === 'twitter' ? twitter : facebook;
      const date = new Date(creation_date);
      const formattedDate = date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
      });

      const timeDate = new Date(creation_date);
      const formattedTime = timeDate.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });

      let singleData = {
        author: <Author image={platformIcon} name={platform} description={customer_feedback} />,
        function: <Job title={starRating} description="Organization" />,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent={formattedTime} color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
        employed: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {formattedDate}
          </MDTypography>
        ),
        action: (
          <MDTypography onClick={() => { setCustomerFeedback(customer_feedback); setOpenReviewDialog(true) }} component="a" href="#" variant="caption" color="text" fontWeight="medium">
            View Review
          </MDTypography>
        ),
      };
      allRowsData.push(singleData);
    });
    // console.log(allRowsData);
    setRowsData(allRowsData);
  };

  const Project = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" variant="rounded" />
      <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  const Progress = ({ color, value }) => (
    <MDBox display="flex" alignItems="center">
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {value}%
      </MDTypography>
      <MDBox ml={0.5} width="9rem">
        <MDProgress variant="gradient" color={color} value={value} />
      </MDBox>
    </MDBox>
  );

  const dataForSecondTable = () => {
    let googleCount = 0, glassDoorCount = 0, facebookCount = 0, twitterCount = 0, instagramCount = 0;
    allReviewsData && allReviewsData.length > 0 && allReviewsData.map(review => {
      const { platform } = review;
      switch (platform) {
        case 'glassdoor': {
          glassDoorCount++;
          break;
        }
        case 'instagram': {
          instagramCount++;
          break;
        }
        case 'facebook': {
          facebookCount++;
          break;
        }
        case 'twitter': {
          twitterCount++;
          break;
        }
        case 'google': {
          googleCount++;
          break;
        }
        default: break;
      };
    });
    const totalReviews = googleCount + glassDoorCount + instagramCount + twitterCount + facebookCount;
    let gPercent = (googleCount / totalReviews) * 100, tPercent = (twitterCount / totalReviews) * 100, glPercent = (glassDoorCount / totalReviews) * 100, fPercent = (facebookCount / totalReviews) * 100, iPercent = (instagramCount / totalReviews) * 100;
    const data = [{
      project: <Project image={maps} name="Google Maps" />,
      budget: (
        <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
          {googleCount}
        </MDTypography>
      ),
      status: (
        <MDBox ml={-1}>
          <MDBadge badgeContent={activePlat && activePlat.length > 0 && activePlat.includes("google") ? "ACTIVE" : "OFFLINE"} color={activePlat && activePlat.length > 0 && activePlat.includes("google") ? "success" : "dark"} variant="gradient" size="sm" />
        </MDBox>
      ),
      completion: <Progress color={gPercent > 80 ? "success" : gPercent > 40 ? "info" : "error"} value={gPercent.toFixed(2)} />,
      // action: (
      //   <MDTypography component="a" href="#" color="text">
      //     <Icon>more_vert</Icon>
      //   </MDTypography>
      // ),
    },
    {
      project: <Project image={instagram} name="Instagram" />,
      budget: (
        <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
          {instagramCount}
        </MDTypography>
      ),
      status: (
        <MDBox ml={-1}>
          <MDBadge badgeContent={activePlat && activePlat.length > 0 && activePlat.includes("instagram") ? "ACTIVE" : "OFFLINE"} color={activePlat && activePlat.length > 0 && activePlat.includes("instagram") ? "success" : "dark"} variant="gradient" size="sm" />
        </MDBox>
      ),
      completion: <Progress color={iPercent > 80 ? "success" : iPercent > 40 ? "info" : "error"} value={iPercent.toFixed(2)} />,
      // action: (
      //   <MDTypography component="a" href="#" color="text">
      //     <Icon>more_vert</Icon>
      //   </MDTypography>
      // ),
    },
    {
      project: <Project image={twitter} name="Twitter" />,
      budget: (
        <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
          {twitterCount}
        </MDTypography>
      ),
      status: (
        <MDBox ml={-1}>
          <MDBadge badgeContent={activePlat && activePlat.length > 0 && activePlat.includes("twitter") ? "ACTIVE" : "OFFLINE"} color={activePlat && activePlat.length > 0 && activePlat.includes("twitter") ? "success" : "dark"} variant="gradient" size="sm" />
        </MDBox>
      ),
      completion: <Progress color={tPercent > 80 ? "success" : tPercent > 40 ? "info" : "error"} value={tPercent.toFixed(2)} />,
      // action: (
      //   <MDTypography component="a" href="#" color="text">
      //     <Icon>more_vert</Icon>
      //   </MDTypography>
      // ),
    },
    {
      project: <Project image={glassDoor} name="Glassdoor" />,
      budget: (
        <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
          {glassDoorCount}
        </MDTypography>
      ),
      status: (
        <MDBox ml={-1}>
          <MDBadge badgeContent={activePlat && activePlat.length > 0 && activePlat.includes("glassdoor") ? "ACTIVE" : "OFFLINE"} color={activePlat && activePlat.length > 0 && activePlat.includes("glassdoor") ? "success" : "dark"} variant="gradient" size="sm" />
        </MDBox>
      ),
      completion: <Progress color={glPercent > 80 ? "success" : glPercent > 40 ? "info" : "error"} value={glPercent.toFixed(2)} />,
      // action: (
      //   <MDTypography component="a" href="#" color="text">
      //     <Icon>more_vert</Icon>
      //   </MDTypography>
      // ),
    },
    {
      project: <Project image={facebook} name="Facebook" />,
      budget: (
        <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
          {facebookCount}
        </MDTypography>
      ),
      status: (
        <MDBox ml={-1}>
          <MDBadge badgeContent={activePlat && activePlat.length > 0 && activePlat.includes("facebook") ? "ACTIVE" : "OFFLINE"} color={activePlat && activePlat.length > 0 && activePlat.includes("facebook") ? "success" : "dark"} variant="gradient" size="sm" />
        </MDBox>
      ),
      completion: <Progress color={fPercent > 80 ? "success" : fPercent > 40 ? "info" : "error"} value={fPercent.toFixed(2)} />,
      // action: (
      //   <MDTypography component="a" href="#" color="text">
      //     <Icon>more_vert</Icon>
      //   </MDTypography>
      // ),
    }];
    setSecTableRowsData(data);
  };


  useEffect(() => {
    const getReviewFromRedux = async () => {
      try {
        await getReviewsData();
      }
      catch (err) {
        alert('Something went wrong!!!')
      }
    };

    getReviewFromRedux();
  }, [])

  useEffect(() => {
    dataForRows(allReviewsData);
    dataForSecondTable();
  }, [allReviewsData])


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Reviews
                </MDTypography>
              </MDBox>
              {allReviewsData && allReviewsData.length > 0 ? <MDBox className="reviewsTableContainer" pt={3}>
                {rowsData && rowsData.length > 0 && <DataTable
                  table={{ columns, rows: rowsData }}
                  // allReviewsData={allReviewsData}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />}
              </MDBox> :
                <MDBox pt={3}>
                  <div className="noReviewView">
                    <img src={noDataImg} className="noReviewImg" alt="" />
                    <div>No reviews found yet!!</div>
                  </div>
                </MDBox>}
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Reviews Statics
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: pColumns, rows: secTableRowsData }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
      <ViewReviewDialog open={openReviewDialog} handleOpen={setOpenReviewDialog} description={customerFeedback} />
    </DashboardLayout>
  );
}

export default ReviewList;
