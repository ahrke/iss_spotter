const { fetchMyIP, fetchCoordsByIP, fetchFlyOverTime, nextISSTimesForMyLocation } = require('./iss_promised');

fetchMyIP()
  .then((ip) => fetchCoordsByIP(ip))
  .then((coords) => fetchFlyOverTime(coords))
  .then((flyTimes) => nextISSTimesForMyLocation(flyTimes))
  .catch(err => console.log(`error: ${err}`));