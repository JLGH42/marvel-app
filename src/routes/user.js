const express = require("express");
const router = express.Router();

const User = require("../model/usersSchema");
const Auth = require("../middleware/Auth");

router.post("/register", async (req, res) => {
  try {
    const user = new User({
      ...req.body,
    });
    const token = await user.generateAuthToken();
    await user.save();
    res.send({ user, token }).status(201);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.status(200).send({ user, token });
  } catch (error) {
    res.status(400).send({ error: "Unable to login" });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send({ error: "No user found" });
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.patch("/:id", async (req, res) => {
  const updates = Object.keys(req.body); //convert to an array
  const possibleUpdates = ["username", "email"];
  const isUpdate = updates.every((update) => possibleUpdates.includes(update));

  if (!isUpdate) return res.status(400).send({ error: "Cannot update field" });

  try {
    const user = User.findById(req.params.id);
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();
    if (!user) {
      return res.status(404).send("No user found");
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/:id", async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).send({ error: "No user found" });
  res.status(200).send(user);
});

module.exports = router;
