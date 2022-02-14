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
    res.status(500).json({ message: "error getting account" });
  }
});

router.post(
  "/",
  checkAccountNameUnique,
  checkAccountPayload,
  async (req, res) => {
    // DO YOUR MAGIC
    try {
      let { name, budget } = req.body;
      let postedAccount = await Accounts.create({
        name: name.trim(),
        budget: +budget,
      });
      res.status(201).json(postedAccount);
    } catch (e) {
      res.status(500).json({ message: "error adding account" });
    }
  }
);

router.put(
  "/:id",
  checkAccountId,
  checkAccountNameUnique,
  checkAccountPayload,
  async (req, res) => {
    // DO YOUR MAGIC
    try {
      let { name, budget } = req.body;
      let { id } = req.params;
      let postedAccount = await Accounts.updateById(id, {
        name: name.trim(),
        budget,
      });
      res.status(201).json(postedAccount);
    } catch (e) {
      res.status(500).json({ message: "error adding account" });
    }
  }
);

router.delete("/:id", (req, res, next) => {
  // DO YOUR MAGIC
});

router.use((err, req, res, next) => {
  // eslint-disable-line
  // DO YOUR MAGIC
});

module.exports = router;
