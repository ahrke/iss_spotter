const request = require('request-promise-native');

const fetchMyIP = () => {
  const ipURL = 'https://api6.ipify.org?format=json';

  return new Promise((resolve, reject) => {
    request(ipURL)
      .then(ip => resolve(JSON.parse(ip)["ip"]))
      .catch(err => reject(err));
  });
};

const fetchCoordsByIP = (ip) => {
  const vigilantURL = 'https://ipvigilante.com/' + ip;
  
  return new Promise((resolve, reject) => {
    request(vigilantURL)
      .then(result => {
        let data = JSON.parse(result).data;
        let coords = {
          longitude: data.longitude,
          latitude: data.latitude
        };
        resolve(coords);
      })
      .catch(err => reject(err));
  });
};

const fetchFlyOverTime = (coords) => {
  const flyoverURL = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;

  return new Promise((resolve, reject) => {
    request(flyoverURL)
      .then(result => resolve(JSON.parse(result).response))
      .catch(err => reject(err));
  });
};

const nextISSTimesForMyLocation = (flyovertimes) => {
  for (let pass in flyovertimes) {
    console.log(`Next pass at ${Date(flyovertimes[pass].risetime)} for ${flyovertimes[pass].duration} seconds!`);
  }
};

module.exports = {
  fetchCoordsByIP,
  fetchMyIP,
  fetchFlyOverTime,
  nextISSTimesForMyLocation
};