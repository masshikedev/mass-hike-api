const baseCallback = res => {
  return (err, item) => {
    console.log(item);
    if (err) {
      res.status(500).send({ error: 'An error has occured' });
    } else {
      res.status(200).send(item);
    }
  };
};

module.exports = baseCallback;
