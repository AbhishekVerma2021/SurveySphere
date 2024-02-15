import React, { useEffect, useState } from 'react';
import './WhatsappView.css';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import { Button, TextField } from '@mui/material';
import whatsappIcon from '../../Images/whatsapp.png';

const WhatsappView = (props) => {

  const [phoneNo, setPhoneNo] = useState();

  const {
    handleWhatsappMessage,
    getHotelData,
  } = props;


  useEffect(() => {
    const getHotelDetails = async () => {
      try {
        await getHotelData();
      }
      catch (err) {
        alert("Something went wrong!!")
      };
    };
    getHotelDetails();
  }, []);

  
  const handleSubmit = async () => {
    try {
      await handleWhatsappMessage(phoneNo);
    }
    catch (err) {
      alert("Something went wrong!!")
    };
  }


  return (<>
    <DashboardLayout>
      <DashboardNavbar />
      <div className="whatsappViewContainer">
        <div className="whatsappImageContainer">
          <img src={whatsappIcon} alt="" />
        </div>
        <div>Notify your customers on Whatsapp</div>
        <div className="whatsappInputContainer">
          <TextField
            margin="dense"
            id="phoneNumber"
            label="Enter Phone Number"
            type="number"
            fullWidth
            name="slogan"
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
          />
        </div>
        <div className="submitWhtsappContainer">
          <Button variant='contained' onClick={() => handleSubmit()} sx={{ color: "white !important" }}>Send Survey Notification</Button>
        </div>
      </div>
    </DashboardLayout>
  </>);

};


const getMessage=(link,businessName)=>
{
  return  `

  We value your feedback at ${link} and would love to hear your thoughts. 
  Could you spare a few moments to complete our quick survey? Your input will help us improve and serve you better.\n
   Thank you for your time and support! Here's the link: ${businessName}`
}
export default WhatsappView;