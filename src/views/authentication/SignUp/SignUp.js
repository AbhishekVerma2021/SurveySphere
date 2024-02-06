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

// react-router-dom components
import { Link } from "react-router-dom";
import verifyMailImg from '../../../Images/mailVerify.svg'
// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "views/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import { useEffect, useState } from "react";
import { Tooltip } from "@mui/material";
// import { makeStyles } from '@mui/styles';

function SignUp(props) {
  const {
    handleSignup,
    emailVerifyFlag,
  } = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const [verifyFlag, setVerifyFlag] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setVerifyFlag(emailVerifyFlag);
    // console.log(emailVerifyFlag);
  }, [emailVerifyFlag])
  // console.log(emailVerifyFlag)

  const handleSubmit = async () => {
    try {
      if (!(!name || !email || !password || email.length === 0 || password.length === 0 || name.length === 0)) {
        await handleSignup(email, password, name);
      }
    }
    catch (err) {
      alert('Something went wrong!!!')
    }
  }
  return (
    <CoverLayout landingFormFlag={false} image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Join us today
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            {!verifyFlag ? 'Enter your email and password to register' : `An verification email is sent to ${email}`}
          </MDTypography>
        </MDBox>
        {verifyFlag ?
          <MDBox pt={4} pb={3} px={3} >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
              <span>
                Verification mail sent.
              </span>
              <img src={verifyMailImg} height={'200px'} alt="" />
            </div>
          </MDBox> : <MDBox pt={4} pb={3} px={3}>
            <MDBox component="form" role="form">
              <MDBox mb={2}>
                <MDInput onChange={(e) => setName(e.target.value)} type="text" label="Name" variant="standard" fullWidth />
              </MDBox>
              <MDBox mb={2}>
                <MDInput onChange={(e) => setEmail(e.target.value)} type="email" label="Email" variant="standard" fullWidth />
              </MDBox>
              <MDBox mb={2}>
                <MDInput onChange={(e) => setPassword(e.target.value)} type="password" label="Password" variant="standard" fullWidth />
              </MDBox>
              <MDBox display="flex" alignItems="center" ml={-1}>
                <Checkbox value={checked} onChange={() => setChecked(!checked)} />
                <MDTypography
                  variant="button"
                  fontWeight="regular"
                  color="text"
                  sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                >
                  &nbsp;&nbsp;I agree the&nbsp;
                </MDTypography>
                <MDTypography
                  component="a"
                  href="#"
                  variant="button"
                  fontWeight="bold"
                  color="info"
                  textGradient
                >
                  Terms and Conditions
                </MDTypography>
              </MDBox>
              <Tooltip title={(!name || !email || !password || email.length === 0 || password.length === 0 || name.length === 0) ? 'All field are required!!' : 'Click to register!!'}>
                <MDBox mt={4} mb={1}>
                  <MDButton onClick={() => handleSubmit()} disabled={!checked || !name || !email || !password || email.length === 0 || password.length === 0 || name.length === 0} variant="gradient" color="info" fullWidth>
                    sign up
                  </MDButton>
                </MDBox>
              </Tooltip>
              <MDBox mt={3} mb={1} textAlign="center">
                <MDTypography variant="button" color="text">
                  Already have an account?{" "}
                  <MDTypography
                    component={Link}
                    to="/authentication/sign-in"
                    variant="button"
                    color="info"
                    fontWeight="medium"
                    textGradient
                  >
                    Sign In
                  </MDTypography>
                </MDTypography>
              </MDBox>
            </MDBox>
          </MDBox>}
      </Card>
    </CoverLayout>
  );
}

export default SignUp;
