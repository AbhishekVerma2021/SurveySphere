import { connect } from "react-redux";
import WhatsappView from "./WhatsappView";
import { mapDispatchToProps, mapStateToProps } from "./props";
export default connect(mapStateToProps, mapDispatchToProps)(WhatsappView);