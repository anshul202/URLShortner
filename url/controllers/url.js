const shortid = require("shortid");
const urls = require("../models/urls");

const handleCreateURL = async (req, res) => {
  if (!req.body.url) {
    return res.status(400).json({ error: "URL is required" });
  }
  const shortid1 = shortid(8);
  try {
    const result = await urls.create({
      shortid: shortid1,
      redirectUrl: req.body.url,
      visitHistory: [],
    });
  } catch (error) {}
  return res.json({ id: shortid1 });
};

const handleRedirection = async (req, res) => {
  const { shortid } = req.params;
  const result = await urls.findOne({ shortid: shortid });
  if (!result) {
    return res.status(404).json({ error: "No URL found" });
  }
  result.visitHistory.push({ timeStamp: Date.now() });
  if (result.visitHistory.length > 10) {
    result.visitHistory.shift();
  }
  await result.save();
  return res.redirect(result.redirectUrl);
};

module.exports = { handleCreateURL, handleRedirection };
