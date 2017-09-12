module.exports = (req, res, next) => {
  const credits = req.user.credits;
  if(credits < 1){
    return res.status(403).send({error: "Not enough credits"});
  }

  next();
}
