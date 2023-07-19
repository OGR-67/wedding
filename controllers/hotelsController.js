const axios = require("axios");

const options = {
  method: 'GET',
  url: 'https://hotels-com-provider.p.rapidapi.com/v2/hotels/search',
  params: {
    domain: 'FR',
    sort_order: 'DISTANCE',
    locale: 'fr_FR',
    checkout_date: '2023-09-27',
    region_id: '500493',
    adults_number: '2',
    checkin_date: '2023-09-26',
    guest_rating_min: '8',
    lodging_type: 'HOTEL,APART_HOTEL'
  },
  headers: {
    'X-RapidAPI-Key': 'faf665f2b9msh45eb67b090b9ceep1c082cjsnca0b910f3aa3',
    'X-RapidAPI-Host': 'hotels-com-provider.p.rapidapi.com'
  }
};

const getHotels = async (req, res) => {
  try {
    const response = await axios.request(options);
    const results = response.data.properties.slice(0, 10);
    const context = {
      hotels: results,
    };
    res.render("pages/hotels.ejs", context);
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
};

exports.getHotels = getHotels;