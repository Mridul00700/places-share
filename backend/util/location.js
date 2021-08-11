const axios = require('axios');
const HttpError = require('../models/http-error');
const API = 'AIzaSyDsL-tv2AxsOSLZM3j-uYtYLCtMb86FzvQ';


async function getCoordsForAddress(address) {


    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API}`);

    const data = response.data;

    if (!data || data.status === "ZERO_RESULTS") {
        const err = new HttpError('No such place found for specified address.', 422);
        throw err;
    }
    const coordinates = data.results[0].geometry.location;
    return coordinates;
}

module.exports = getCoordsForAddress;