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

import { useEffect, useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { Button, TextField } from "@mui/material";
import { connect } from "react-redux";
import {
  handlePlatformStatus,
  getHotelData,
} from '../../../../Redux/action';
import { Link } from "react-router-dom";

const PlatformSettings = (props) => {

  //AI

  const {
    hotelDetailsRedux,
    handlePlatformStatus,
  } = props;
  const { activeAI, activePlatforms, facebook_id, instagram_id, x_id, glassdoor_id, place_id } = hotelDetailsRedux;
  const [ai, setai] = useState('');
  const [instgramUrl, setinstagramUrl] = useState(instagram_id);
  const [glassdoorUrl, setGlassdoorUrl] = useState(glassdoor_id);
  const [googleUrl, setGoogleUrl] = useState(place_id);
  const [facebookUrl, setFacebookurl] = useState(facebook_id);

  const [toggleInstagram, setToggleInstagram] = useState();
  const [toggleGlassdoor, setToggleGlassdoor] = useState();
  const [toggleTwitter, setToggleTwitter] = useState();
  const [toggleFacebook, setToggleFacebook] = useState();
  const [toggleGoogle, setToggleGoogle] = useState();

  const handleSubmit = async () => {
    console.log('handleSubmit')
    try {
      // let array = ['instagram', 'google', 'facebook', 'glassdoor', 'twitter'];
      const arr = [];
      if (toggleInstagram) {
        arr.push('instagram');
      }
      if (toggleGlassdoor) {
        arr.push('glassdoor');
      }
      if (toggleTwitter) {
        arr.push('twitter');
      }
      if (toggleFacebook) {
        arr.push('facebook');
      }
      if (toggleGoogle) {
        arr.push('google');
      }


      await handlePlatformStatus(arr, instgramUrl, facebookUrl, glassdoorUrl, googleUrl, ai);
    }
    catch (err) {
      alert('Something went wrong !!')
    }
  };

  useEffect(() => {
    activePlatforms && activePlatforms.length > 0 && setinstagramUrl(instagram_id);
    activePlatforms && activePlatforms.length > 0 && setGlassdoorUrl(glassdoor_id);
    activePlatforms && activePlatforms.length > 0 && setGoogleUrl(place_id);
    activePlatforms && activePlatforms.length > 0 && setFacebookurl(facebook_id);
    activePlatforms && activePlatforms.length > 0 && setToggleInstagram(activePlatforms.includes('instagram'));
    activePlatforms && activePlatforms.length > 0 && setToggleGlassdoor(activePlatforms.includes('glassdoor'))
    activePlatforms && activePlatforms.length > 0 && setToggleTwitter(activePlatforms.includes('twitter'))
    activePlatforms && activePlatforms.length > 0 && setToggleFacebook(activePlatforms.includes('facebook'))
    activePlatforms && activePlatforms.length > 0 && setToggleGoogle(activePlatforms.includes('google'))
    setai(activeAI);
    // console.log(activeAI);
  }, [activePlatforms, activeAI])




  return (
    <Card sx={{ boxShadow: "none" }}>
      <MDBox p={2}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          Review settings
        </MDTypography>
      </MDBox>
      {hotelDetailsRedux && Object.keys(hotelDetailsRedux).length > 0 ? <MDBox pt={1} pb={2} px={2} lineHeight={1.25}>
        <MDTypography variant="caption" fontWeight="bold" color="text" textTransform="uppercase">
          Platforms
        </MDTypography>
        <MDBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>
          <MDBox mt={0.5}>
            <Switch checked={toggleInstagram} onChange={() => setToggleInstagram(!toggleInstagram)} />
          </MDBox>
          <MDBox width="40%" ml={0.5}>
            <MDTypography variant="button" fontWeight="regular" color="text">
              Instagram
            </MDTypography>
          </MDBox>
          <TextField
            value={instgramUrl}
            variant="outlined"
            disabled={!toggleInstagram}
            label="Your Instagram Page URL"
            onChange={(e) => setinstagramUrl(e.target.value)}
            InputLabelProps={{
              shrink: !!instgramUrl || !toggleInstagram,
            }}
          />
        </MDBox>
        <MDBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>
          <MDBox mt={0.5}>
            <Switch checked={toggleTwitter} onChange={() => setToggleTwitter(!toggleTwitter)} />
          </MDBox>
          <MDBox width="40%" ml={0.5}>
            <MDTypography variant="button" fontWeight="regular" color="text">
              Twitter
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>
          <MDBox mt={0.5}>
            <Switch checked={toggleFacebook} onChange={() => setToggleFacebook(!toggleFacebook)} />
          </MDBox>
          <MDBox width="40%" ml={0.5}>
            <MDTypography variant="button" fontWeight="regular" color="text">
              Facebook
            </MDTypography>
          </MDBox>
          <TextField
            value={facebookUrl}
            variant="outlined"
            disabled={!toggleFacebook}
            label="Your Facebook Page URL"
            onChange={(e) => setFacebookurl(e.target.value)}
            InputLabelProps={{
              shrink: !!facebookUrl || !toggleFacebook,
            }}
          />
        </MDBox>
        <MDBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>
          <MDBox mt={0.5}>
            <Switch checked={toggleGlassdoor} onChange={() => setToggleGlassdoor(!toggleGlassdoor)} />
          </MDBox>
          <MDBox width="40%" ml={0.5}>
            <MDTypography variant="button" fontWeight="regular" color="text">
              Glassdoor
            </MDTypography>
          </MDBox>
          <TextField
            value={glassdoorUrl}
            variant="outlined"
            disabled={!toggleGlassdoor}
            label="Your Glassdoor Page URL"
            onChange={(e) => setGlassdoorUrl(e.target.value)}
            InputLabelProps={{
              shrink: !!googleUrl || !toggleGoogle,
            }}
          />
        </MDBox>
        <MDBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>
          <MDBox mt={0.5}>
            <Switch checked={toggleGoogle} onChange={() => setToggleGoogle(!toggleGoogle)} />
          </MDBox>
          <MDBox width="40%" ml={0.5}>
            <MDTypography variant="button" fontWeight="regular" color="text">
              Google Maps
            </MDTypography>
          </MDBox>
          <TextField
            value={googleUrl}
            variant="outlined"
            disabled={!toggleGoogle}
            label="Your google maps Place ID"
            onChange={(e) => setGoogleUrl(e.target.value)}
            InputLabelProps={{
              shrink: !!googleUrl || !toggleGoogle,
            }}
          />
        </MDBox>
        <MDBox mt={3}>
          <MDTypography variant="caption" fontWeight="bold" color="text" textTransform="uppercase">
            AI SETTINGS
          </MDTypography>
        </MDBox>
        <MDBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>
          <MDBox mt={0.5}>
            <Switch checked={ai === 'chatgpt3.5'} onChange={() => setai('chatgpt3.5')} />
          </MDBox>
          <MDBox width="80%" ml={0.5}>
            <MDTypography variant="button" fontWeight="regular" color="text">
              Chat GPT 3.5
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>
          <MDBox mt={0.5}>
            <Switch checked={ai === 'chatgpt4'} onChange={() => setai('chatgpt4')} />
          </MDBox>
          <MDBox width="80%" ml={0.5}>
            <MDTypography variant="button" fontWeight="regular" color="text">
              Chat GPT 4
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>
          <MDBox mt={0.5}>
            <Switch checked={ai === 'gemini'} onChange={() => setai('gemini')} />
          </MDBox>
          <MDBox width="80%" ml={0.5}>
            <MDTypography variant="button" fontWeight="regular" color="text">
              Google Gemini
            </MDTypography>
          </MDBox>
        </MDBox>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button onClick={() => handleSubmit()} variant="contained" sx={{ color: 'white !important', margin: '10px 0px' }}>SUBMIT</Button>
        </div>
      </MDBox> : <MDBox pt={1} pb={2} px={2} lineHeight={1.25}>
            Please <Link style={{ color: "blue" }} to="/businessDetails">register</Link> your hotel.
        </MDBox>}
    </Card>
  );
}

const mapStateToProps = (state) => ({
  hotelDetailsRedux: state.hotelDetailsRedux,
});

const mapDispatchToProps = (dispatch) => ({
  handlePlatformStatus: (activePlatform, instgramUrl, facebookUrl, glassdoorUrl, googleUrl, ai) => dispatch(handlePlatformStatus(activePlatform, instgramUrl, facebookUrl, glassdoorUrl, googleUrl, ai)),
  getHotelData: () => dispatch(getHotelData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlatformSettings);
