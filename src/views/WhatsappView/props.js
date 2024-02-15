import {
  handleWhatsappMessage,
  getHotelData,
} from '../../Redux/action';

export const mapStateToProps = (state) => ({

});

export const mapDispatchToProps = (dispatch) => ({
  getHotelData: () => dispatch(getHotelData()),
  handleWhatsappMessage: (phoneNo) => dispatch(handleWhatsappMessage(phoneNo)),
});