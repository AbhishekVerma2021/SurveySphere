import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  GET_HOTEL_DATA_PENDING,
  GET_HOTEL_DATA_FULFILLED,
  GET_HOTEL_DATA_REJECTED,
  DELETE_HOTEL_DATA_PENDING,
  DELETE_HOTEL_DATA_FULFILLED,
  DELETE_HOTEL_DATA_REJECTED,
  GET_REVIEWS_DATA_PENDING,
  GET_REVIEWS_DATA_FULFILLED,
  GET_REVIEWS_DATA_REJECTED,
  UPDATE_PLATFORMS_STATUS_PENDING,
  UPDATE_PLATFORMS_STATUS_FULFILLED,
  UPDATE_PLATFORMS_STATUS_REJECTED,
  GET_PLANS_DATA_PENDING,
  GET_PLANS_DATA_FULFILLED,
  GET_PLANS_DATA_REJECTED,
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
  SELECT_PLAN_PENDING,
  SELECT_PLAN_FULFILLED,
  SELECT_PLAN_REJECTED,
  HANDLE_BILLING_PAGE_PENDING,
  HANDLE_BILLING_PAGE_FULFILLED,
} from './actionTypes';

const initialState = {
  dummyState: 'TESTING REDUX IN APP',
  activeUserDetails: {},
  ussToken: '',
  refreshToken: '',
  isUserLoggedIn: false,
  allPlansData: [],
  sessionId: undefined,
  isFullPageLoading: false,
  activeHotelFlag: false,
  hotelDetailsRedux: {

    // facebook_id 
    // instagram_id 
    // x_id 
    // glassdoor_id 
    //place_id
  },
  allReviewsData: [],
  emailVerifyFlag: false,
  activePlanName: "",
  // plansData: [],
  billingUrl: "",
  barGraphData: [],
  lineGraph1Data: [],
  lineGraph2Data: [],
  activePlanDataId: "",
  dashBoardCountData: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_STATE: {
      const state = action.payload;
      return {
        ...state,
        dummyState: state ? 'SUCCESSFULL REDUX TESTING DONE' : 'CHANGED_AGAIN',
      }
    };

    case UPDATE_HOTEL_DATA_PENDING: {
      return {
        ...state,
        isFullPageLoading: true,
      };
    };
    case UPDATE_HOTEL_DATA_FULFILLED: {
      const data = action.payload;
      toast.success("Hotel updated successfully!!")
      return {
        ...state,
        hotelDetailsRedux: data,
        isFullPageLoading: false,
      };
    };
    case UPDATE_HOTEL_DATA_REJECTED: {
      toast.error("Some error occured while updating hotel! ")
      return {
        ...state,
        isFullPageLoading: false,
      };
    };

    case SELECT_PLAN_PENDING: {
      return {
        ...state,
        isFullPageLoading: true,
      };
    };
    case SELECT_PLAN_FULFILLED: {
      const { sessionId } = action.payload;
      toast.info("You are being redirected to checkout");
      return {
        ...state,
        sessionId: sessionId,
        isFullPageLoading: false,
      };
    };
    case SELECT_PLAN_REJECTED: {
      toast.error("Some error in selecting plan!!");
      return {
        ...state,
        isFullPageLoading: false,
      };
    };

    case GET_REFRESH_TOKEN_PENDING: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case GET_REFRESH_TOKEN_FULFILLED: {
      const { accessToken, refreshToken } = action.payload;
      // console.log(token)
      // console.log(action.payload)
      localStorage.setItem('TOKEN', accessToken);
      localStorage.setItem('REFRESH_TOKEN', refreshToken);
      // toast.success('Recieved Refresh Token!!!')
      return {
        ...state,
      }
    }
    case GET_REFRESH_TOKEN_REJECTED: {
      toast.error(action.payload, {
        position: 'bottom-right'
      });
      return {
        ...state,
      }
    }
    case LOGIN_PENDING: {
      return {
        ...state,
        isFullPageLoading: true,
      }
    }
    case LOGIN_FULFILLED: {

      const { user, resultMessage, accessToken, refreshToken } = action.payload;
      const { password, ...activeUserDetails } = user;
      if (accessToken) {
        localStorage.setItem('TOKEN', accessToken);
      }
      if (refreshToken) {
        localStorage.setItem('REFRESH_TOKEN', refreshToken);
      }
      console.log(activeUserDetails.name)
      toast.success(`Welcome ${activeUserDetails?.name}`)
      return {
        ...state,
        activeUserDetails,
        ussToken: accessToken,
        refreshToken,
        isUserLoggedIn: true,
        isFullPageLoading: false,
      }
    };

    case LOGIN_REJECTED: {
      // console.log(action.payload)
      const error = action.payload;
      const { response: { data: { message } } } = error;
      toast.error(message)
      return {
        ...state,
        isFullPageLoading: false,
      }
    };

    case SIGNUP_PENDING: {
      return {
        ...state,
        isFullPageLoading: true,
      }
    };
    
    case SIGNUP_FULFILLED: {
      // console.log(action.payload)
      return {
        ...state,
        emailVerifyFlag: true,
        isFullPageLoading: false,
      }
    };
    case SIGNUP_REJECTED: {
      const { data: { message } } = action.payload;
      toast.error(message)
      return {
        ...state,
        emailVerifyFlag: false,
        isFullPageLoading: false,
      }
    }

    case VALIDATE_TOKEN_PENDING: {
      return {
        ...state,
        isFullPageLoading: true,
      }
    }
    case VALIDATE_TOKEN_FULFILLED: {
      const user = action.payload;
      // console.log(user);
      return {
        ...state,
        activeUserDetails: user,
        isUserLoggedIn: true,
        isFullPageLoading: false,
      }
    }
    case VALIDATE_TOKEN_REJECTED: {
      toast.error('Not authenticated!!!');
      return {
        ...state,
        isUserLoggedIn: false,
        isFullPageLoading: false,
        activeUserDetails: {},
        ussToken: '',
        refreshToken: '',
        // isUserLoggedIn: false,
        allPlansData: [],
        sessionId: undefined,
        // isFullPageLoading: false,
        activeHotelFlag: false,
        hotelDetailsRedux: {
      
          // facebook_id 
          // instagram_id 
          // x_id 
          // glassdoor_id 
          //place_id
        },
        allReviewsData: [],
        emailVerifyFlag: false,
        activePlanName: "",
        // plansData: [],
        billingUrl: "",
        barGraphData: [],
        lineGraph1Data: [],
        lineGraph2Data: [],
        activePlanDataId: "",
        dashBoardCountData: {},
      }
    }

    case CREATE_HOTEL_PENDING: {
      return {
        ...state,
        isFullPageLoading: true,
      }
    }
    case CREATE_HOTEL_FULFILLED: {
      // console.log(action.payload);
      const hotelData = action.payload;
      return {
        ...state,
        hotelDetailsRedux: hotelData,
        isFullPageLoading: false,
      }
    }
    case CREATE_HOTEL_REJECTED: {
      return {
        ...state,
        isFullPageLoading: false,
      }
    }
    case GET_HOTEL_DATA_PENDING: {
      return {
        ...state,
        isFullPageLoading: true,
      }
    }
    case GET_HOTEL_DATA_FULFILLED: {
      // console.log(action.payload);
      const hotelData = action.payload;
      return {
        ...state,
        hotelDetailsRedux: hotelData,
        isFullPageLoading: false,
        activeHotelFlag: true,
      }
    }
    case GET_HOTEL_DATA_REJECTED: {
      return {
        ...state,
        activeHotelFlag: false,
        isFullPageLoading: false,
      }
    };

    case DELETE_HOTEL_DATA_PENDING: {
      return {
        ...state,
        isFullPageLoading: true,
      }
    }
    case DELETE_HOTEL_DATA_FULFILLED: {
      return {
        ...state,
        hotelDetailsRedux: {},
        isFullPageLoading: false,
      }
    }
    case DELETE_HOTEL_DATA_REJECTED: {
      return {
        ...state,
        isFullPageLoading: false,
      }
    }
    case GET_REVIEWS_DATA_PENDING: {
      return {
        ...state,
        isFullPageLoading: true,
      }
    }
    case GET_REVIEWS_DATA_FULFILLED: {
      const { reviews } = action.payload;
      return {
        ...state,
        allReviewsData: reviews,
        isFullPageLoading: false,
      }
    }
    case GET_REVIEWS_DATA_REJECTED: {
      return {
        ...state,
        isFullPageLoading: false,
      };
    };
    case UPDATE_PLATFORMS_STATUS_PENDING: {
      return {
        ...state,
        isFullPageLoading: true,
      };
    };

    case UPDATE_PLATFORMS_STATUS_FULFILLED: {
      const hotelData = action.payload;
      return {
        ...state,
        hotelDetailsRedux: hotelData,
        isFullPageLoading: false,
      };
    };
    case UPDATE_PLATFORMS_STATUS_REJECTED: {
      return {
        ...state,
        isFullPageLoading: false,
      };
    };

    case GET_PLANS_DATA_PENDING: {
      return {
        ...state,
        isFullPageLoading: true,
      };
    };
    case GET_PLANS_DATA_FULFILLED: {
      const data = action.payload;
      return {
        ...state,
        allPlansData: data,
        isFullPageLoading: false,
      };
    };
    case GET_PLANS_DATA_REJECTED: {
      return {
        ...state,
        isFullPageLoading: false,
      };
    };
    case GET_BAR_DATA_PENDING: {
      return {
        ...state,
        isFullPageLoading: true,
      };
    };
    case GET_BAR_DATA_FULFILLED: {
      const data = action.payload;
      return {
        ...state,
        isFullPageLoading: false,
        barGraphData: data,
      };
    };
    case GET_BAR_DATA_REJECTED: {
      return {
        ...state,
        isFullPageLoading: false,
      };
    };
    case GET_LINE_ONE_DATA_PENDING: {
      return {
        ...state,
        isFullPageLoading: true,
      };
    };
    case GET_LINE_ONE_DATA_FULFILLED: {
      const data = action.payload;
      return {
        ...state,
        lineGraph1Data: data,
        isFullPageLoading: false,
      };
    };
    case GET_LINE_ONE_DATA_REJECTED: {
      return {
        ...state,
        isFullPageLoading: false,
      };
    };
    case GET_LINE_TWO_DATA_PENDING: {
      return {
        ...state,
        isFullPageLoading: true,
      };
    };
    case GET_LINE_TWO_DATA_FULFILLED: {
      const data = action.payload;
      return {
        ...state,
        lineGraph2Data: data,
        isFullPageLoading: false,
      };
    };
    case GET_LINE_TWO_DATA_REJECTED: {
      return {
        ...state,
        isFullPageLoading: false,
      };
    };

    case GET_DASHBOARD_COUNT_DATA_PENDING: {
      return {
        ...state,
        isFullPageLoading: true,
      };
    };
    case GET_DASHBOARD_COUNT_DATA_FULFILLED: {
      const data = action.payload;
      return {
        ...state,
        dashBoardCountData: data,
        isFullPageLoading: false,
      };
    };
    case GET_DASHBOARD_COUNT_DATA_REJECTED: {
      return {
        ...state,
        isFullPageLoading: false,
      };
    };

    case GET_ACTIVE_PLAN_PENDING: {
      return {
        ...state,
        isFullPageLoading: true,
      };
    };
    case GET_ACTIVE_PLAN_FULFILLED: {
      const { priceId, name, } = action.payload[0];
      // console.log(action.payload[0])
      return {
        ...state,
        activePlanDataId: priceId,
        isFullPageLoading: false,
        activePlanName: name,
      };
    };
    case GET_ACTIVE_PLAN_REJECTED: {

      return {
        ...state,
        isFullPageLoading: false,
      };
    }

    case HANDLE_BILLING_PAGE_PENDING: {
      return {
        ...state,
        isFullPageLoading: true,
      };
    };
    case HANDLE_BILLING_PAGE_FULFILLED: {
      const { url } = action.payload;
      window.open(url, "_blank");
      return {
        ...state,
        billingUrl: url,
        isFullPageLoading: false,
      }
    }
    default: return state;
  }
};

export default reducer;