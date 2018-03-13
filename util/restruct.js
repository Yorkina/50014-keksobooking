const restruct = (data) => {
  return {
    author: {
      name: data.name,
      avatar: data.avatar,
    },
    preview: data.preview,
    offer: {
      title: data.title,
      address: data.address,
      description: data.description,
      price: parseInt(data.price, 10),
      type: data.type,
      rooms: parseInt(data.rooms, 10),
      guests: parseInt(data.guests, 10),
      checkin: data.checkin,
      checkout: data.checkout,
      features: data.features,
    },
    location: {
      x: parseInt(data.x, 10),
      y: parseInt(data.y, 10),
    },
    date: data.date
  };
};

module.exports = restruct;
