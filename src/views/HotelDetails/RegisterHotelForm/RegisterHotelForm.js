import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Autocomplete } from '@mui/material';

const RegisterHotelForm = ({ open, setOpenAddBuisness, handleHotelDetails }) => {
  // Initial state for form data
  const [formData, setFormData] = useState({
    hotelName: '',
    location: '',
    description: '',
    aiDescription: '',
    numOfRooms: '',
    slogan: '',
  });

  // Locations array updated with more locations
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

  // Handles changes in the text fields and updates state
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handles autocomplete location selection
  const handleLocationChange = (event, newValue) => {
    setFormData(prevState => ({
      ...prevState,
      location: newValue,
    }));
  };

  // Handles form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    console.log(formData); // Log or handle formData as needed
    // name, location, description, customAIDescription, room, slogan
    const data = {
      name: formData.hotelName,
      location: formData.location,
      description: formData.description,
      customAIDescription: formData.aiDescription,
      room: formData.numOfRooms,
      slogan: formData.slogan,
    }
    console.log(data); // Log or handle formData as needed
    try {
      await handleHotelDetails(data);
      setOpenAddBuisness(false); // Close the dialog on success
    } catch (err) {
      alert('Something went wrong!!');
    }
  };

  // Closes the dialog without submitting the form
  const handleClose = () => {
    setOpenAddBuisness(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Enter business Details</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit} autoComplete="off">
          <TextField
            autoFocus
            margin="dense"
            id="hotelName"
            label="Business Name"
            type="text"
            fullWidth
            name="hotelName"
            value={formData.hotelName}
            onChange={handleInputChange}
          />
          <Autocomplete
            options={locationsInIndia}
            value={formData.location}
            onChange={handleLocationChange}
            renderInput={(params) => (
              <TextField
                {...params}
                margin="dense"
                label="Location"
                name="location"
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
            id="aiDescription"
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
            id="numOfRooms"
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
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default RegisterHotelForm;
