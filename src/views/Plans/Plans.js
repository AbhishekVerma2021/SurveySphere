import React, { useEffect, useState } from 'react';
import './Plans.css';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import PricingCard from "./PricingCard";
import { Grid } from '@mui/material';
// import { getPlansData } from 'Redux/action';


const plansDummyData = [
  {
    planName: 'Monthly',
    price: '$100',
    _id: 'hiuh234huih234nj34nj565nj67n77',
    frequency: 'Monthly',
    hotelCount: 157,
    priceColor: '#e63d39',
    dummyFeatures: [
      { name: 'Email Survey', available: true },
      { name: 'Multi-Property', available: false },
      { name: 'QR Service', available: true },
      { name: '24/7 Support', available: true },
      { name: 'Alerts & Notifications', available: false }
    ]
  },
  {
    planName: 'Quaterly',
    price: '$150',
    _id: 'hiuh234huih234nj34nj565nj67n77',
    frequency: 'Quaterly',
    hotelCount: 334,
    priceColor: '#16bbcf',
    dummyFeatures: [
      { name: 'Email Survey', available: false },
      { name: 'Multi-Property', available: true },
      { name: 'QR Service', available: true },
      { name: '24/7 Support', available: false },
      { name: 'Alerts & Notifications', available: false }
    ]
  },
  {
    planName: 'Half yearly',
    price: '$200',
    _id: 'hiuh234huih234nj34nj565nj67n77',
    frequency: 'Half yearly',
    hotelCount: 124,
    priceColor: '#fb9006',
    dummyFeatures: [
      { name: 'Email Survey', available: true },
      { name: 'Multi-Property', available: true },
      { name: 'QR Service', available: false },
      { name: '24/7 Support', available: true },
      { name: 'Alerts & Notifications', available: false }
    ]
  },
  {
    planName: 'Yearly',
    price: '$180',
    _id: 'hiuh234huih234nj34nj565nj67n77',
    frequency: 'Yearly',
    hotelCount: 903,
    priceColor: '#4ba64f',
    dummyFeatures: [
      { name: 'Email Survey', available: false },
      { name: 'Multi-Property', available: false },
      { name: 'QR Service', available: true },
      { name: '24/7 Support', available: true },
      { name: 'Alerts & Notifications', available: true }
    ]
  }
];


import registerHotel from '../../Images/hotelNotRegisterd.svg';


const Plans = (props) => {

  const {
    allPlansData,
    getPlansData,
    getActiveSubscriptions,
    activePlanDataId,
    hotelDetailsRedux,
    getHotelData,
    activeHotelFlag,
  } = props;

  const [plansData, setPlansData] = useState([]);
  const [hotelExistFlag, setHotelExistFlag] = useState(false);
  useEffect(() => {
    const getData = async () => {
      try {
        await getPlansData();
        await getActiveSubscriptions();
        await getHotelData();
      }
      catch (err) {
        alert("Something went wrong!!");
      }
    };
    getData();
  }, []);

  useEffect(() => {
    setPlansData(allPlansData);
    setHotelExistFlag(activeHotelFlag);
  }, [allPlansData, activeHotelFlag]);


  return (<>
    <DashboardLayout>
      <DashboardNavbar />
      <Grid item xs={12} mt={4}>

        {hotelDetailsRedux ? <div className="planCardsContainer">
          {plansData && plansData.length > 0 && plansData.map((data, index) => {
            return (<PricingCard
              priceId={data.priceId}
              productId={data.productId}
              planName={data.name}
              interval={index === 0 ? "Monthly" : index === 1 ? "Quaterly" : index === 2 ? "Half Yearly" : "Yearly"}
              price={data.price}
              _id={data._id}
              metaId={data.metaId}
              trialDays={data.trialDays}
              hotelCount={200}
              priceColor={index === 0 ? '#e63d39' : index === 1 ? '#16bbcf' : index === 2 ? '#fb9006' : '#4ba64f'}
            // buttonText="Edit Plan details"
            // frequency={data.frequency}
            // features={data.dummyFeatures}
            />)
          })}
        </div> : <div className='noPlansView'>
          <img src={registerHotel} alt="Hotel Not Registerd!!" />
          <div>Please register your hotel details before accessing plans</div>
        </div>}

      </Grid>
    </DashboardLayout>
  </>);
};

export default Plans;