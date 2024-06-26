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

router.post("/logout", Auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token === req.token
    );
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

router.post("/logout/all", Auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

router.get("/profile", Auth, async (req, res) => {
  res.send(req.user);
});

router.get("/", async (req, res) => {
  try {
    const user = await User.findById(req.body.id);
    if (!user) return res.status(404).send({ error: "No user found" });
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.patch("/", Auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const possibleUpdates = ["username", "email"];
  const isUpdate = updates.every((update) => possibleUpdates.includes(update));

  if (!isUpdate) return res.status(400).send({ error: "Cannot update field" });

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.status(200).send(req.user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/delete/me", Auth, async (req, res) => {
  try {
    await req.user.remove();
    res.status(200).send(req.user);
  } catch (error) {
    res.status(401).send();
  }
});

module.exports = router;
