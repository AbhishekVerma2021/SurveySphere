// PricingCard.js
import React, { useEffect, useState } from 'react';
import './PricingCard.css'; // Make sure to create a CSS file with the same name
import ViewPlanDialog from '../ViewPlanDialog';
import { Button } from '@mui/material';


const PricingCard = (props) => {
  // { planName, price, frequency, hotelCount, _id, features, buttonText, priceColor }
  const {
    priceId,
    productId,
    planName,
    interval,
    price,
    _id,
    metaId,
    trialDays,
    hotelCount,
    priceColor,
    buttonText,
    activePlanDataId,
  } = props;



  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [disableButton, setDisableButton] = useState(true);
  useEffect(() => {
    setDisableButton(priceId === activePlanDataId);
    console.log(activePlanDataId)
  }, [activePlanDataId, priceId]);
  // console.log(activePlanDataId,",", priceId)
  return (
    <div className="pricing-card">
      <div className="card-header">
        <h2 className='carPlanName'>{planName}</h2>
        <div className='hotelCountForplan'>Try our plan for {trialDays} days for free.</div>
        <p className="price" style={{ backgroundColor: priceColor }}>
          <span>
          ₹{price}
          </span>
          <span className="frequency">/{interval}</span>
        </p>
      </div>
      {/* <ul className="features-list">
        <div className='featuresHeader'>Features:</div>
        {features.map((feature, index) => (
          <li key={index} className={feature.available ? 'available plansFeature' : 'unavailable plansFeature'}>
            {feature.name}
          </li>
        ))}
      </ul> */}
      {/* {JSON.stringify(activePlanDataId===priceId)} */}
      <Button variant='outlined' disabled={activePlanDataId && activePlanDataId.length > 0} sx={{ color: activePlanDataId && activePlanDataId === priceId ? `Red !important`
      : `${priceColor} !important`, border: `2px solid ${priceColor}`, width: '150px' }}
      className="start-trial-btn" onClick={() => setOpenEditDialog(true)}>
        {activePlanDataId === priceId ? "Active Plan" : "Select Plan"}</Button>
      <ViewPlanDialog open={openEditDialog} planName={planName} _id={_id} productId={productId} priceId={priceId} metaId={metaId} setOpenEditDialog={setOpenEditDialog} />
    </div>
  );
};

export default PricingCard;
