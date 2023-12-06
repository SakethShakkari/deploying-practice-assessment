
function validateZip(req, res, next) {
  const pattern = /^\d{5}$/;
  const zipCode = req.params.zip;

if (pattern.test(zipCode) && zipCode.length === 5) {
  console.log({zipCode});
  next();
} else {
  next(`Zip (${zipCode}) is invalid!`)
}
}

module.exports = validateZip;
