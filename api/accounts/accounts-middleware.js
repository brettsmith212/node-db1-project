const Accounts = require("./accounts-model");

exports.checkAccountPayload = (req, res, next) => {
  let { name, budget } = req.body;
  if (!name || !budget) {
    res.status(400).json({ message: "name and budget are required" });
    return;
  } else if (name.trim().length < 3 || name.trim().length > 100) {
    res
      .status(400)
      .json({ message: "name of account must be between 3 and 100" });
    return;
  } else if (typeof budget !== "number") {
    res.status(400).json({ message: "budget of account must be a number" });
    return;
  } else if (budget < 0 || budget > 1000000) {
    res
      .status(400)
      .json({ message: "budget of account is too large or too small" });
    return;
  }

  next();
};

exports.checkAccountNameUnique = async (req, res, next) => {
  let { name } = req.body;
  let allAccounts = await Accounts.getAll();
  let duplicateAccts = allAccounts.filter((account) => account.name === name);
  if (duplicateAccts.length > 0) {
    res.status(400).json({ message: "that name is taken" });
    return;
  }

  next();
};

exports.checkAccountId = async (req, res, next) => {
  let { id } = req.params;
  let user = await Accounts.getById(id);
  if (user.length === 0) {
    res.status(404).json({ message: "account not found" });
    return;
  }

  req.user = user;
  next();
};
