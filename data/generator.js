const Data = require(`./generate`);

const generateEntity = () => {
  const getRandomAvatar = () => {
    return `https://robohash.org/${(Math.random() + 1).toString(36).substring(4)}`;
  };

  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  const getRandomValue = (arr) => arr[Math.floor(arr.length * Math.random())];

  const getArrayWithRandomLength = (arr) => {
    return arr.slice(0, getRandomNumber(1, arr.length));
  };

  const coordinateX = getRandomNumber(300, 900);
  const coordinateY = getRandomNumber(150, 500);

  const data = {
    "author": {
      "avatar": getRandomAvatar()
    },

    "offer": {
      "title": getRandomValue(Data.TITLES),
      "address": `${coordinateX}, ${coordinateY}`,
      "price": getRandomNumber(1000, 1000000),
      "type": getRandomValue(Data.PLACE_TYPES),
      "rooms": getRandomNumber(1, 5),
      "guests": getRandomNumber(1, 10),
      "checkin": getRandomValue(Data.TIMES),
      "checkout": getRandomValue(Data.TIMES),
      "features": getArrayWithRandomLength(Data.FEATURES),
      "description": ``,
      "photos": Data.PHOTOS
    },

    "location": {
      "x": coordinateX,
      "y": coordinateY
    }
  };

  return JSON.stringify(data);
};

module.exports = {
  generateEntity
};
