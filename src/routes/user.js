const express = require("express");
const router = express.Router();

const User = require("../model/usersSchema");

router.post("/register", async (req, res) => {
  try {
    const newUser = new User({
      ...req.body,
    });
    await newUser.save();
    res.send("New User Created").status(201);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const existingUser = await User.findById(req.params.id);
    if (!existingUser) return res.status(400).send({ error: "No user found" });
    res.status(200).send(existingUser);
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
    const foundUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!foundUser) {
      return res.status(404).send("No user found");
    }
    res.status(200).send(foundUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/:id", async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(400).send({ error: "No user found" });
  res.status(200).send(user);
});

module.exports = router;
