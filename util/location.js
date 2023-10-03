const axios = require('axios')

const HttpError = require('../models/http-error')

const API_KEY = process.env.LOCATION_API_KEY

const getCoordsForAddress = async (address) => {
  const query = encodeURIComponent(address)

  // API From https://opencagedata.com/api
  try {
    const response = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${API_KEY}`
    )

    const data = response.data

    if (!data) {
      throw new HttpError(
        'Could not find the location for the specified address',
        404
      )
    }

    const coordinates = response.data.results[0].geometry

    return coordinates
  } catch (error) {
    console.error(error)
    throw new HttpError('Error fetching coordinates', 500)
  }
}

module.exports = getCoordsForAddress
