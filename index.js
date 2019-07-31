const { fetchMyIP, fetchCoordsByIP, fetchFlyOverTime, nextISSTimesForMyLocation } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log(`didn't work...`,error);
    return;
  }

  console.log(`hurrah! our ip is...${ip}`);
  fetchCoordsByIP(ip, (err, coords) => {
    if (err) {
      console.log(`uh oh...error with coordsFromIP...${err}`);
      return;
    }
    
    console.log(`our coords are...${coords.longitude}, ${coords.latitude}`);

    fetchFlyOverTime(coords, (err, data) => {
      if (err) {
        console.log(`aww man...we ran into issues...${err}`);
        return;
      }

      nextISSTimesForMyLocation(data, (passes) => {
        console.log(passes);
      });
    
      // console.log(`results from fetchFlyover:\n${(JSON.stringify(data))}`);
    });
  });
});

