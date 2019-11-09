const ObjectsToCsv = require("objects-to-csv");

module.exports = {
  async appendCsv(obj, filePath) {
    const csv = new ObjectsToCsv([obj]);

    // Save to file:
    await csv.toDisk(filePath, { append: true });
  }
};
