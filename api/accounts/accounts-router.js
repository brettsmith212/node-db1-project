const router = require("express").Router();
const Accounts = require("./accounts-model");
const {
  checkAccountId,
  checkAccountNameUnique,
  checkAccountPayload,
} = require("./accounts-middleware");

router.get("/", async (req, res, next) => {
  try {
    const data = await Accounts.getAll();
    res.json(data);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", checkAccountId, async (req, res) => {
  try {
    let user = req.user;
    res.status(200).json(user);
  } catch (e) {
    res.status(500).json({ message: "error getting user" });
  }
});

router.post("/", (req, res, next) => {
  // DO YOUR MAGIC
});

router.put("/:id", (req, res, next) => {
  // DO YOUR MAGIC
});

router.delete("/:id", (req, res, next) => {
  // DO YOUR MAGIC
});

router.use((err, req, res, next) => {
  // eslint-disable-line
  // DO YOUR MAGIC
});

module.exports = router;
