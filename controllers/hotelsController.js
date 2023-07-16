const axios = require("axios");

const getHotels = (req, res) => {
  const options = {
    method: "GET",
    url: "https://hotels4.p.rapidapi.com/properties/list",
    params: {
      destinationId: "503397",
      pageNumber: "1",
      pageSize: "6",
      checkIn: "2020-01-08",
      checkOut: "2020-01-15",
      adults1: "1",
      sortOrder: "PRICE",
      locale: "fr_FR",
      currency: "EUR",
    },
    headers: {
      "X-RapidAPI-Key": "faf665f2b9msh45eb67b090b9ceep1c082cjsnca0b910f3aa3",
      "X-RapidAPI-Host": "hotels4.p.rapidapi.com",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      let results = response.data.data.body.searchResults.results;
      let context = {
        hotels: results,
      };
      res.render("pages/hotels.ejs", context);
    })
    .catch(function (error) {
      console.error(error);
    });
};

exports.getHotels = getHotels;