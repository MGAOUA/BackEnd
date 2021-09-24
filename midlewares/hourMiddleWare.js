const verifyMorning = (req, res, next) => {
  const date = new Date();
  const hour = date.getHours();

  console.log(hour);
  if (8 <= hour && hour <= 14) return next();
  return res.status(404).send({
    message: "we are closed",
    data: {},
  });
};

module.exports = {
  verifyMorning,
};
