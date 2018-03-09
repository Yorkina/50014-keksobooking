const Data = require(`./generate`);

const generateEntity = () => {
  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  const getRandomValue = (arr) => arr[Math.floor(arr.length * Math.random())];

  const getArrayWithRandomLength = (arr) => {
    return arr.slice(0, getRandomNumber(1, arr.length));
  };

  const getRandomAvatar = () => {
    return `https://robohash.org/${(Math.random() + 1).toString(36).substring(4)}`;
  };

  const coordinateX = getRandomNumber(300, 900);
  const coordinateY = getRandomNumber(150, 500);

  return {
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
    },
    "date": new Date().setDate(getRandomNumber(1, 28))
  };
};

const createData = (quantity) => {
  const data = [];
  for (let i = 0; i < quantity; i++) {
    data.push(generateEntity());
  }
  return data;
};

module.exports = {
  generateEntity,
  createData
};
