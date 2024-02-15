import {
  ACTION_STATE,
  LOGIN_REJECTED,
  LOGIN_FULFILLED,
  LOGIN_PENDING,
  SIGNUP_PENDING,
  SIGNUP_FULFILLED,
  SIGNUP_REJECTED,
  GET_REFRESH_TOKEN_PENDING,
  GET_REFRESH_TOKEN_FULFILLED,
  GET_REFRESH_TOKEN_REJECTED,
  CREATE_HOTEL_PENDING,
  CREATE_HOTEL_FULFILLED,
  CREATE_HOTEL_REJECTED,
  VALIDATE_TOKEN_PENDING,
  VALIDATE_TOKEN_FULFILLED,
  VALIDATE_TOKEN_REJECTED,
  GET_PLANS_DATA_PENDING,
  GET_PLANS_DATA_FULFILLED,
  GET_PLANS_DATA_REJECTED,
  GET_REVIEWS_DATA_PENDING,
  GET_REVIEWS_DATA_FULFILLED,
  GET_REVIEWS_DATA_REJECTED,
  GET_HOTEL_DATA_PENDING,
  GET_HOTEL_DATA_FULFILLED,
  GET_HOTEL_DATA_REJECTED,
  DELETE_HOTEL_DATA_PENDING,
  DELETE_HOTEL_DATA_FULFILLED,
  DELETE_HOTEL_DATA_REJECTED,
  UPDATE_PLATFORMS_STATUS_PENDING,
  UPDATE_PLATFORMS_STATUS_FULFILLED,
  UPDATE_PLATFORMS_STATUS_REJECTED,
  GET_BAR_DATA_PENDING,
  GET_BAR_DATA_FULFILLED,
  GET_BAR_DATA_REJECTED,
  GET_LINE_ONE_DATA_PENDING,
  GET_LINE_ONE_DATA_FULFILLED,
  GET_LINE_ONE_DATA_REJECTED,
  GET_LINE_TWO_DATA_PENDING,
  GET_LINE_TWO_DATA_FULFILLED,
  GET_LINE_TWO_DATA_REJECTED,
  GET_DASHBOARD_COUNT_DATA_PENDING,
  GET_DASHBOARD_COUNT_DATA_FULFILLED,
  GET_DASHBOARD_COUNT_DATA_REJECTED,
  UPDATE_HOTEL_DATA_PENDING,
  UPDATE_HOTEL_DATA_FULFILLED,
  UPDATE_HOTEL_DATA_REJECTED,
  GET_ACTIVE_PLAN_PENDING,
  GET_ACTIVE_PLAN_FULFILLED,
  GET_ACTIVE_PLAN_REJECTED,
  SELECT_PLAN_FULFILLED,
  SELECT_PLAN_PENDING,
  SELECT_PLAN_REJECTED,
  HANDLE_BILLING_PAGE_PENDING,
  HANDLE_BILLING_PAGE_FULFILLED,
  HANDLE_BILLING_PAGE_REJECTED,
} from './actionTypes';

import { useNavigate } from 'react-router-dom';
import Axios from '../views/Services';

export const testingAction = (flag) => {
  return (dispatch) => {
    dispatch({ type: ACTION_STATE, payload: flag });
  }
};

export const updateHotelDetals = (data) => {
  return (dispatch) => {
    dispatch({ type: UPDATE_HOTEL_DATA_PENDING });
    Axios.put('/business', data)
      .then((res) => dispatch({ type: UPDATE_HOTEL_DATA_FULFILLED, payload: res.data }))
      .catch(err => dispatch({ type: UPDATE_HOTEL_DATA_REJECTED, payload: err }))
  };
};

export const validateToken = (navigate, componentPath) => {
  // const token = localStorage.getItem('TOKEN');
  return (dispatch) => {
    dispatch({ type: VALIDATE_TOKEN_PENDING });
    Axios.get('/user/verify-token')
      .then(res => {
        dispatch({ type: VALIDATE_TOKEN_FULFILLED, payload: res.data });
        navigate(componentPath);
      })
      .catch(er => {
        navigate("/authentication/sign-in");
        dispatch({ type: VALIDATE_TOKEN_REJECTED })
      });
  };
};

export const handleSignup = (email, password, name) => {
  return (dispatch) => {
    dispatch({ type: SIGNUP_PENDING });
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    Axios.post('/user', {
      email,
      password,
      name,
      language: 'en',
      platform: 'web',
      timezone: 0,
      deviceId: 'xxxxxxxxxxxxxx',
      type: 'user'
    })
      .then(res => dispatch({ type: SIGNUP_FULFILLED, payload: res }))
      .catch(er => dispatch({ type: SIGNUP_REJECTED, payload: er.response }));
  };
};


export const handleLogin = (email, password, navigate) => {
  // const navigate = useNavigate();
  return (dispatch) => {
    dispatch({ type: LOGIN_PENDING });
    Axios.post('/user/login', {
      email,
      password,
    })
      .then(res => {
        // console.log(res);
        navigate('/dashboard');
        dispatch({ type: LOGIN_FULFILLED, payload: res.data })
      })
      .catch(er => {
        navigate('authentication/sign-in');
        console.log(er);
        dispatch({ type: LOGIN_REJECTED, payload: er });
      })
  };
};

export const getAccessToken = () => {
  const data = {
    refreshToken: localStorage.getItem('REFRESH_TOKEN'),
  }
  console.log(data);
  return (dispatch) => {
    dispatch({ type: GET_REFRESH_TOKEN_PENDING })
    Axios.post('/user/refresh-token', data)
      .then(res => {
        dispatch({ type: GET_REFRESH_TOKEN_FULFILLED, payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: GET_REFRESH_TOKEN_REJECTED, payload: err });
      })
  }
};

export const handleHotelDetails = (dataObj) => {
  const { name, location, description, customAIDescription, room, slogan } = dataObj;
  return (dispatch) => {
    dispatch({ type: CREATE_HOTEL_PENDING });
    Axios.post('/business', {
      name,
      location,
      description,
      customAIDescription,
      room,
      slogan,
      place_id: 'xyz'
    })
      .then(res => {
        console.log(res.data);
        dispatch({ type: CREATE_HOTEL_FULFILLED, payload: res.data });
      })
      .catch(er => {
        dispatch({ type: CREATE_HOTEL_REJECTED, payload: er });
      })
  }
};

export const getHotelData = () => {
  // console.log('getHotelData')
  return (dispatch) => {
    dispatch({ type: GET_HOTEL_DATA_PENDING });
    Axios.get('/business')
      .then(res => {
        dispatch({ type: GET_HOTEL_DATA_FULFILLED, payload: res.data });
      })
      .catch(er => {
        dispatch({ type: GET_HOTEL_DATA_REJECTED, payload: er });
      })
  }
};

export const deleteHotelData = () => {
  // console.log('getHotelData')
  return (dispatch) => {
    dispatch({ type: DELETE_HOTEL_DATA_PENDING });
    Axios.delete('/business')
      .then(res => {
        dispatch({ type: DELETE_HOTEL_DATA_FULFILLED, payload: res.data });
      })
      .catch(er => {
        dispatch({ type: DELETE_HOTEL_DATA_REJECTED, payload: er });
      })
  }
};

export const getPlansData = () => {
  return (dispatch) => {
    dispatch({ type: GET_PLANS_DATA_PENDING });
    Axios.get('/admin/getplans')
      .then(res => {
        dispatch({ type: GET_PLANS_DATA_FULFILLED, payload: res.data });
      })
      .catch(er => {
        dispatch({ type: GET_PLANS_DATA_REJECTED, payload: er });
      });
  };
};

export const getActiveSubscriptions = () => {
  return (dispatch) => {
    dispatch({ type: GET_ACTIVE_PLAN_PENDING });
    Axios.get('payment/getSubscriptionStatus')
      .then(res => {
        dispatch({ type: GET_ACTIVE_PLAN_FULFILLED, payload: res.data });
      })
      .catch(er => {
        dispatch({ type: GET_ACTIVE_PLAN_REJECTED, payload: er });
      });
  };
};


export const selectPlan = (planId) => {
  return (dispatch) => {
    dispatch({ type: SELECT_PLAN_PENDING });
    Axios.post('/payment/createSubscription', {
      planId,
    })
      .then(res => {
        dispatch({ type: SELECT_PLAN_FULFILLED, payload: res.data });
      })
      .catch(er => {
        dispatch({ type: SELECT_PLAN_REJECTED, payload: er });
      });
  };
};


export const getReviewsData = () => {
  return (dispatch) => {
    dispatch({ type: GET_REVIEWS_DATA_PENDING });
    Axios.get('/review')
      .then(res => {
        dispatch({ type: GET_REVIEWS_DATA_FULFILLED, payload: res.data });
      })
      .catch(er => {
        dispatch({ type: GET_REVIEWS_DATA_REJECTED, payload: er.response });
      });
  };
};

export const handlebilling = () => {
  return (dispatch) => {
    dispatch({ type: HANDLE_BILLING_PAGE_PENDING });
    Axios.get('/payment/manage-subscription')
    .then(res => {
      // const { url } = res.data;
      dispatch({ type: HANDLE_BILLING_PAGE_FULFILLED, payload: res.data });
      // window.location.href = url;
    })
    .catch(err => {
      dispatch({ type: HANDLE_BILLING_PAGE_REJECTED, payload: err.response })
    })
  };
};

export const handlePlatformStatus = (activePlatform, instgramUrl, facebookUrl, glassdoorUrl, googleUrl, ai) => {
  return (dispatch) => {
    dispatch({ type: UPDATE_PLATFORMS_STATUS_PENDING });
    Axios.put('/business', {
      activePlatforms: activePlatform,
      instagram_id: instgramUrl,
      facebook_id: facebookUrl,
      glassdoor_id: glassdoorUrl,
      place_id: googleUrl,
      activeAI: ai,
    })
      .then(res => {
        dispatch({ type: UPDATE_PLATFORMS_STATUS_FULFILLED, payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: UPDATE_PLATFORMS_STATUS_REJECTED, payload: err });
      });
  };
};

export const getPlans = () => {
  return (dispatch) => {
    dispatch({ type: GET_PLANS_DATA_PENDING });
    Axios.get('/plans')
      .then(res => {
        dispatch({ type: GET_PLANS_DATA_FULFILLED, payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: GET_PLANS_DATA_REJECTED, payload: err });
      });
  };
};

export const getBarData = () => {
  return (dispatch) => {
    dispatch({ type: GET_BAR_DATA_PENDING });
    Axios.get('/metric/reviews/week')
      .then(res => {
        dispatch({ type: GET_BAR_DATA_FULFILLED, payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: GET_BAR_DATA_REJECTED, payload: err });
      });
  };
};

export const getLineOneData = () => {
  return (dispatch) => {
    dispatch({ type: GET_LINE_ONE_DATA_PENDING });
    Axios.get('/metric/reviews/month')
      .then(res => {
        dispatch({ type: GET_LINE_ONE_DATA_FULFILLED, payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: GET_LINE_ONE_DATA_REJECTED, payload: err });
      });
  };
};

export const getLineTwoData = () => {
  return (dispatch) => {
    dispatch({ type: GET_LINE_TWO_DATA_PENDING });
    Axios.get('/metric/reviews/week/average')
      .then(res => {
        dispatch({ type: GET_LINE_TWO_DATA_FULFILLED, payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: GET_LINE_TWO_DATA_REJECTED, payload: err });
      });
  };
};


export const getDashBoardCountData = () => {
  return (dispatch) => {
    dispatch({ type: GET_DASHBOARD_COUNT_DATA_PENDING });
    Axios.get('/metric')
      .then(res => {
        dispatch({ type: GET_DASHBOARD_COUNT_DATA_FULFILLED, payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: GET_DASHBOARD_COUNT_DATA_REJECTED, payload: err });
      });
  };
};


export const handleWhatsappMessage = (phoneNo) => {
  console.log(phoneNo);
  return (dispatch, getState) => {
    const { hotelDetailsRedux } = getState();
    console.log(hotelDetailsRedux)
    const { name, business_id } = hotelDetailsRedux;
    console.log(name,business_id)
    const message = `We value your feedback at ${name} and would love to hear your thoughts. 
    Could you spare a few moments to complete our quick survey? Your input will help us improve and serve you better.
     Thank you for your time and support! Here's the link: https://remi-back.onrender.com/feedback?business_id=${business_id}`
    window.open(`https://wa.me/91${phoneNo}?text=${message}`, '_blank');
  };
};