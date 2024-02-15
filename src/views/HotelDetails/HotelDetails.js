import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import React, { useEffect, useState } from 'react';
import './HotelDetails.css';
import RegisterHotelForm from './RegisterHotelForm';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import { Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';


import { useTheme, useMediaQuery } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditBuisnessDialog from './EditBuisnessDialog';
import addIcon from '../../Images/addHotelDetails.svg'
import EditIcon from '@mui/icons-material/Edit';
import hotelImg from '../../Images/hotelImg.png';
import hotel2Img from '../../Images/hotel2Img.png';
import hotel3Img from '../../Images/hotel3Img.png';

const HotelDetails = (props) => {


  const { hotelDetailsRedux, getHotelData, deleteHotelData } = props;

  const [openAddBuisness, setOpenAddBuisness] = useState(false);
  const [openEditBuisness, setOpenEditBuisness] = useState(false);
  const [openViewBuisness, setOpenViewBuisness] = useState(false);
  const theme = useTheme();
  const isXsScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [change, setChange] = useState(Object.keys(hotelDetailsRedux).length === 0);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);


  useEffect(() => {
    const getHotelDataFromRedux = async () => {
      try {
        await getHotelData();
      }
      catch (er) {
        alert('Something Went wrong !!!')
      }
    }
    getHotelDataFromRedux();
  }, []);

  useEffect(() => {
    // console.log(hotelDetailsRedux)
    setChange(Object.values(hotelDetailsRedux).length === 0)
  }, [hotelDetailsRedux])

  const handleDeleteHotel = () => {
    setOpenDeleteModal(true);
  };
  const handleDeleteHotelFromRedux = async () => {
    try {
      await deleteHotelData();
      setOpenDeleteModal(false);
    }
    catch (er) {
      alert('Something went wrong !!!');
    }
  };

  const { location, name, description, room, slogan, customAIDescription } = hotelDetailsRedux;

  const [openEditDialog, setOpenEditDialog] = useState(false);

  return (<>
    <DashboardLayout>
      <DashboardNavbar />
      <Grid item xs={12} pt={3}>
        <Card
          className={!change ? 'hotelDetailsBackground' : 'addHotelDetailsClass'}
          sx={{
            height: '79vh',
            maxHeight: 'fit-content',
            // backgroundImage: 'url(../../Images/formBack.svg) !important',
          }}>
          <MDBox
            mx={2}
            mt={-3}
            py={3}
            px={2}
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="info"
            className='hotelListLabelHeader'
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <MDTypography variant="h6" color="white">
              Your business Details
            </MDTypography>
            <div>
              {!change && <IconButton onClick={() => setOpenEditBuisness(true)}>
                <Tooltip title='Delete your hotel'>
                  <EditIcon sx={{ color: 'white !important' }} />
                </Tooltip>
              </IconButton>}

              {!change && <IconButton onClick={() => setOpenDeleteModal(true)}>
                <Tooltip title='Edit business details'>
                  <DeleteIcon sx={{ color: 'white !important' }} />
                </Tooltip>
              </IconButton>}
            </div>
          </MDBox>

          {change ? <div className="enterHotelDetailsMainContainer">
            <div className="plusIconContainer" onClick={() => { setOpenAddBuisness(true) }}>
              <img src={addIcon} alt="" />
            </div>
            <div className="enterDetails">
              Enter Details of your business
            </div>
          </div> :
            <div className="hoteldetailsMasterContainer">
              <div className="hotelNameContainer">
                <div className="logoHotelContainer">
                  <img src={hotelImg} alt="" />
                </div>
                <div className="hotelNameText">
                  {name}
                </div>
              </div>
              <div>
                <hr />
              </div>
              <div className="furtherDetails">
                <div className="locationContainer">
                  <div className="locationLabel">
                    Location:
                  </div>
                  <div className="locationText">
                    {location}
                  </div>
                </div>
                <div className='dividerContainer'>
                  <hr className='dividerHr' />
                </div>
                {/* <div className="locationContainer">
                  <div className="locationLabel">
                    No. of Rooms:
                  </div>
                  <div className="locationText">
                    {room}
                  </div>
                </div> */}
                {/* <div className='dividerContainer'>
                  <hr className='dividerHr' />
                </div> */}
                <div className="descriptionContainer">
                  <div className="descriptionLabel">
                    Description:
                  </div>
                  <div className="descriptionText">
                    {description}
                  </div>
                </div>
                <div className='dividerContainer'>
                  <hr className='dividerHr' />
                </div>
                <div className="locationContainer">
                  <div className="locationLabel">
                    Slogan:
                  </div>
                  <div className="locationText">
                    {slogan}
                  </div>
                </div>
                <div className='dividerContainer'>
                  <hr className='dividerHr' />
                </div>

                <div className="descriptionContainer">
                  <div className="descriptionLabel">
                    AI Description:
                  </div>
                  <div className="descriptionText">
                    {customAIDescription}
                  </div>
                </div>

              </div>
            </div>}
        </Card>
      </Grid>

      <Dialog open={openDeleteModal} onClose={() => setOpenDeleteModal(fasle)}>
        <DialogTitle sx={{ color: 'red' }}>
          Warning!!!
        </DialogTitle>
        <DialogContent>
          Are you sure you want to delete business details? Your reviews will be removed if done so!!!
        </DialogContent>
        <DialogActions>
          <Button variant='contained' sx={{ color: 'white !important', backgroundColor: 'red' }} onClick={() => handleDeleteHotelFromRedux()}>
            DELETE
          </Button>
          <Button onClick={() => setOpenDeleteModal(false)}>
            CLOSE
          </Button>
        </DialogActions>
      </Dialog>
      <RegisterHotelForm open={openAddBuisness} setOpenAddBuisness={setOpenAddBuisness} />

      <EditBuisnessDialog open={openEditBuisness} setOpenEditBuisness={setOpenEditBuisness} />
    </DashboardLayout>
  </>)
};
// Buisness.defaultProps = {
//   width: "auto",
//   sorted: "none",
//   align: "left",
// };
// Buisness.propTypes = {
//   width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//   children: PropTypes.node.isRequired,
//   sorted: PropTypes.oneOf([false, "none", "asce", "desc"]),
//   align: PropTypes.oneOf(["left", "right", "center"]),
// };
export default HotelDetails;