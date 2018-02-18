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
    const newArray = arr.slice(0, arr.length - 1);
    return newArray.slice(0, getRandomNumber(0, arr.length));
  };

  const getShuffledArrayString = (arrayToShuffle) => {
    let temporaryString = [];
    for (let i = arrayToShuffle.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      temporaryString = arrayToShuffle[i];
      arrayToShuffle[i] = arrayToShuffle[j];
      arrayToShuffle[j] = temporaryString;
    }
    return temporaryString;
  };

  const coordinateX = getRandomNumber(300, 900);
  const coordinateY = getRandomNumber(150, 500);

  const data = {
    "author": {
      "avatar": getRandomAvatar()
    },

    "offer": {
      "title": getShuffledArrayString(Data.TITLES),
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
