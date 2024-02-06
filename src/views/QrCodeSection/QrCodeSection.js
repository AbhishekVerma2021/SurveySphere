import React, { useEffect, useState } from 'react';
import './QrCodeSection.css';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import { AddIcCallOutlined, QrCode, QrCode2 } from '@mui/icons-material';
import { Button, Card, Grid, IconButton, Typography } from '@mui/material';
import MDTypography from 'components/MDTypography';
import MDBox from 'components/MDBox';
import CreateQRDialog from './CreateQRDialog';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import QrSectionBackground from '../../Images/stepper.svg'



const QrCodeSection = (props) => {
  const {
    getHotelData,
    hotelDetailsRedux,
  } = props;

  const [error, setError] = useState(true);

  const getData = async () => {
    try {
      await getHotelData();
    }
    catch (err) {
      alert('Something went wrong!!')
    };
  };

  useEffect(() => {
    getData();
  }, [])

  useEffect(() => {
    setError(!(hotelDetailsRedux && hotelDetailsRedux.business_id && hotelDetailsRedux.business_id.length > 0));
  }, [hotelDetailsRedux])

  const [openQRDialog, setOpenQrDialog = { setOpenQrDialog }] = useState(false);
  return (<>
    <DashboardLayout>
      <DashboardNavbar />
      <Grid item xs={12} mt={4} className='getYourQrSectionContainer'>
        <img src={QrSectionBackground} className='qrCodeSVG' alt="" />
        {/* <Card> */}
        <div className="getYourQrSection">
          <div className="headerForGetQr">
            Get your own review QR code
          </div>
          <div className='decriptionGetQr'>
            Click on the button to download your QR!
          </div>
          <Button disabled={error} variant='contained' onClick={() => setOpenQrDialog(true)} sx={{ color: 'white !important' }}>
            View QR Template
          </Button>
        </div>
        {/* </Card> */}
      </Grid>
      <CreateQRDialog open={openQRDialog} setOpenQrDialog={setOpenQrDialog} />
    </DashboardLayout>
  </>)
};

export default QrCodeSection;