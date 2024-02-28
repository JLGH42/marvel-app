const jwt = require("jsonwebtoken");
const User = require("../model/usersSchema");

const Auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.SECRET);

    const user = await User.findOne({
      _id: decoded.id,
      "tokens.token": token,
    });
    if (!user) throw new Error();
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Unauthorised" });
  }
};

module.exports = Auth;
