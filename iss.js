const request = require('request');

const fetchMyIP = function(callback) {
  const ipURL = 'https://api6.ipify.org?format=json';

  request(ipURL, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    let ip = JSON.parse(body)["ip"];

    if (ip) {
      callback(null, ip);
    }
  });
};

const fetchCoordsByIP = (ip, callback) => {
  const vigilantURL = 'https://ipvigilante.com/8.8.8.8';
  
  request(vigilantURL, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    let data = JSON.parse(body).data;
    let coords = {
      longitude: data.longitude,
      latitude: data.latitude
    };
    callback(null, coords);
  });
};

const fetchFlyOverTime = (coords, callback) => {
  const flyoverURL = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;

  request(flyoverURL, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      let msg = `StatusCode returned ${response.statusCode}, resulting in likely error. Body returned: ${body}`;
      callback(Error(msg), null);
      return;
    }
    
    let data = JSON.parse(body).response;
    callback(null, data);
  });
};

const nextISSTimesForMyLocation = (flyovertimes, callback) => {
  let passes = [];

  for (let pass in flyovertimes) {
    passes.push(`Next pass at ${Date(flyovertimes[pass].risetime)} for ${flyovertimes[pass].duration} seconds!`);
  }

  callback(passes);
};

module.exports = {
  fetchCoordsByIP,
  fetchMyIP,
  fetchFlyOverTime,
  nextISSTimesForMyLocation
};