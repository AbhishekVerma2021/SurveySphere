import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Autocomplete } from '@mui/material';

const EditBusinessDetailsDialog = (props) => {
  const {
    setOpenEditBuisness,
    open,
    hotelDetailsRedux,
    updateHotelDetals
  } = props;



  const [formData, setFormData] = useState({
    hotelName: '',
    location: '',
    description: '',
    aiDescription: '',
    numOfRooms: '',
    slogan: '',
  });

  useEffect(() => {
    const {
      name,
      location,
      description,
      customAIDescription,
      room,
      slogan,
    } = hotelDetailsRedux;
    setFormData({
      hotelName: name,
      location,
      description,
      numOfRooms: room,
      slogan,
      aiDescription: customAIDescription,
    })
  }, [hotelDetailsRedux]);


  const locationsInIndia = [
    "Mumbai, Maharashtra",
    "Delhi, Delhi",
    "Bangalore, Karnataka",
    "Hyderabad, Telangana",
    "Ahmedabad, Gujarat",
    "Chennai, Tamil Nadu",
    "Kolkata, West Bengal",
    "Pune, Maharashtra",
    "Jaipur, Rajasthan",
    "Lucknow, Uttar Pradesh",
    "Kanpur, Uttar Pradesh",
    "Nagpur, Maharashtra",
    "Indore, Madhya Pradesh",
    "Thane, Maharashtra",
    "Bhopal, Madhya Pradesh",
    "Visakhapatnam, Andhra Pradesh",
    "Pimpri-Chinchwad, Maharashtra",
    "Patna, Bihar",
    "Vadodara, Gujarat",
    "Ghaziabad, Uttar Pradesh",
    "Ludhiana, Punjab",
    "Agra, Uttar Pradesh",
    "Nashik, Maharashtra",
    "Faridabad, Haryana",
    "Meerut, Uttar Pradesh",
    "Rajkot, Gujarat",
    "Kalyan-Dombivli, Maharashtra",
    "Vasai-Virar, Maharashtra",
    "Varanasi, Uttar Pradesh",
    "Srinagar, Jammu and Kashmir",
    "Aurangabad, Maharashtra",
    "Dhanbad, Jharkhand",
    "Amritsar, Punjab",
    "Navi Mumbai, Maharashtra",
    "Allahabad, Uttar Pradesh",
    "Ranchi, Jharkhand",
    "Howrah, West Bengal",
    "Coimbatore, Tamil Nadu",
    "Jabalpur, Madhya Pradesh",
    "Gwalior, Madhya Pradesh",
    "Vijayawada, Andhra Pradesh",
    "Jodhpur, Rajasthan",
    "Madurai, Tamil Nadu",
    "Raipur, Chhattisgarh",
    "Kota, Rajasthan",
    "Guwahati, Assam",
    "Chandigarh, Chandigarh",
    "Solapur, Maharashtra",
    "Hubli-Dharwad, Karnataka",
    "Bareilly, Uttar Pradesh",
    "Mysore, Karnataka",
    "Tiruchirappalli, Tamil Nadu",
    "Gurgaon, Haryana",
    "Aligarh, Uttar Pradesh",
    "Jalandhar, Punjab",
    "Bhubaneswar, Odisha",
    "Salem, Tamil Nadu",
    "Mira-Bhayandar, Maharashtra",
    "Warangal, Telangana",
    "Thiruvananthapuram, Kerala",
    "Guntur, Andhra Pradesh",
    "Bhiwandi, Maharashtra",
    "Saharanpur, Uttar Pradesh",
    "Gorakhpur, Uttar Pradesh",
    "Bikaner, Rajasthan",
    "Amravati, Maharashtra",
    "Noida, Uttar Pradesh",
    "Jamshedpur, Jharkhand",
    "Bhilai, Chhattisgarh",
    "Cuttack, Odisha",
    "Firozabad, Uttar Pradesh",
    "Kochi, Kerala",
    "Bhavnagar, Gujarat",
    "Dehradun, Uttarakhand",
    "Durgapur, West Bengal",
    "Asansol, West Bengal",
    "Nanded, Maharashtra",
    "Kolhapur, Maharashtra",
    "Ajmer, Rajasthan",
    "Gulbarga, Karnataka",
    "Jamnagar, Gujarat",
    "Ujjain, Madhya Pradesh",
    "Loni, Uttar Pradesh",
    "Siliguri, West Bengal",
    "Jhansi, Uttar Pradesh",
    "Ulhasnagar, Maharashtra",
    "Nellore, Andhra Pradesh",
    "Jammu, Jammu and Kashmir",
    "Sangli-Miraj & Kupwad, Maharashtra",
    "Belgaum, Karnataka",
    "Mangalore, Karnataka",
    "Ambattur, Tamil Nadu",
    "Tirunelveli, Tamil Nadu",
    "Malegaon, Maharashtra",
    "Gaya, Bihar",
    "Jalgaon, Maharashtra",
    "Udaipur, Rajasthan",
    "Maheshtala, West Bengal",
    "Davangere, Karnataka",
    "Kozhikode, Kerala",
    "Kurnool, Andhra Pradesh",
    "Rajahmundry, Andhra Pradesh",
    "Bokaro, Jharkhand",
    "South Dumdum, West Bengal",
    "Bellary, Karnataka",
    "Patiala, Punjab",
    "Gopalpur, West Bengal",
    "Agartala, Tripura",
    "Bhagalpur, Bihar",
    "Muzaffarnagar, Uttar Pradesh",
    "Bhatpara, West Bengal",
    "Panihati, West Bengal",
    "Latur, Maharashtra",
    "Dhule, Maharashtra",
    "Rohtak, Haryana",
    "Korba, Chhattisgarh",
    "Bhilwara, Rajasthan",
    "Brahmapur, Odisha",
    "Muzaffarpur, Bihar",
    "Ahmednagar, Maharashtra",
    "Mathura, Uttar Pradesh",
    "Kollam, Kerala",
    "Avadi, Tamil Nadu",
    "Kadapa, Andhra Pradesh",
    "Kamarhati, West Bengal",
    "Sambalpur, Odisha",
    "Bilaspur, Chhattisgarh",
    "Shahjahanpur, Uttar Pradesh",
    "Satara, Maharashtra",
    "Bijapur, Karnataka",
    "Rampur, Uttar Pradesh",
    "Shivamogga, Karnataka",
    "Chandrapur, Maharashtra",
    "Junagadh, Gujarat",
    "Thrissur, Kerala",
    "Alwar, Rajasthan",
    "Bardhaman, West Bengal",
    "Kulti, West Bengal",
    "Kakinada, Andhra Pradesh",
    "Nizamabad, Telangana",
    "Parbhani, Maharashtra",
    "Tumkur, Karnataka",
    "Hisar, Haryana",
    "Ozhukarai, Puducherry",
    "Bihar Sharif, Bihar",
    "Panipat, Haryana",
    "Darbhanga, Bihar",
    "Bally, West Bengal",
    "Aizawl, Mizoram",
    "Dewas, Madhya Pradesh",
    "Ichalkaranji, Maharashtra",
    "Tirupati, Andhra Pradesh",
    "Karnal, Haryana",
    "Bathinda, Punjab",
    "Jalna, Maharashtra",
    "Eluru, Andhra Pradesh",
    "Barasat, West Bengal",
    "Kirari Suleman Nagar, Delhi",
    "Purnia, Bihar",
    "Satna, Madhya Pradesh",
    "Mau, Uttar Pradesh",
    "Sonipat, Haryana",
    "Farrukhabad, Uttar Pradesh",
    "Sagar, Madhya Pradesh",
    "Rourkela, Odisha",
    "Durg, Chhattisgarh",
    "Imphal, Manipur",
    "Ratlam, Madhya Pradesh",
    "Hapur, Uttar Pradesh",
    "Arrah, Bihar",
    "Karimnagar, Telangana",
    "Anantapur, Andhra Pradesh",
    "Etawah, Uttar Pradesh",
    "Ambernath, Maharashtra",
    "North Dumdum, West Bengal",
    "Bharatpur, Rajasthan",
    "Begusarai, Bihar",
    "New Delhi, Delhi",
    "Gandhidham, Gujarat",
    "Baranagar, West Bengal",
    "Tiruvottiyur, Tamil Nadu",
    "Pondicherry, Puducherry",
    "Sikar, Rajasthan",
    "Thoothukudi, Tamil Nadu",
    "Rewa, Madhya Pradesh",
    "Mirzapur, Uttar Pradesh",
    "Raichur, Karnataka",
    "Pali, Rajasthan",
    "Ramagundam, Telangana",
    "Haridwar, Uttarakhand",
    "Vijayanagaram, Andhra Pradesh",
    "Katihar, Bihar",
    "Nagercoil, Tamil Nadu",
    "Sri Ganganagar, Rajasthan",
    "Karawal Nagar, Delhi",
    "Mango, Jharkhand",
    "Thanjavur, Tamil Nadu",
    "Bulandshahr, Uttar Pradesh",
  ];


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleClose = () => {
    setOpenEditBuisness(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    const data = {
      name: formData.hotelName,
      location: formData.location,
      description: formData.description,
      customAIDescription: formData.aiDescription,
      room: formData.numOfRooms,
      slogan: formData.slogan,
    }
    try {
      await updateHotelDetals(data);
    }
    catch (error) {
      alert("Something went wrong!!")
    };
    // Here you would typically handle the form submission, like sending data to a server.
    // For demonstration, we just log the form data to the console.
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Edit Business Details</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            autoFocus
            margin="dense"
            id="hotel-name"
            label="Hotel Name"
            type="text"
            fullWidth
            name="hotelName"
            value={formData.hotelName}
            onChange={handleInputChange}
          />
          <Autocomplete
            options={locationsInIndia}
            autoHighlight
            value={formData.location}
            onInputChange={(event, newInputValue) => {
              setFormData({
                ...formData,
                location: newInputValue
              });
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                margin="dense"
                label="Location"
                name="location"
                fullWidth
              />
            )}
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            multiline
            rows={4}
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="ai-description"
            label="AI Description"
            type="text"
            fullWidth
            multiline
            rows={4}
            name="aiDescription"
            value={formData.aiDescription}
            onChange={handleInputChange}
          />
          {/* <TextField
            margin="dense"
            id="num-of-rooms"
            label="Number of Rooms"
            type="number"
            fullWidth
            name="numOfRooms"
            value={formData.numOfRooms}
            onChange={handleInputChange}
          /> */}
          <TextField
            margin="dense"
            id="slogan"
            label="Slogan"
            type="text"
            fullWidth
            name="slogan"
            value={formData.slogan}
            onChange={handleInputChange}
          />
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
            <Button type="submit">Save</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditBusinessDetailsDialog;
