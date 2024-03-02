import Location from "../models/Location.js";
import BadRequestError from "../utils/bad-request-error.js";
import fs from "fs";
import csvParser from "csv-parse";
import { asyncHandler } from "../middleware/async.js";
import pkg from "sequelize";
const { QueryTypes } = pkg;

const uploadRecords = asyncHandler(async (req, res, next) => {
  const file = "public/files/data.json";
  fs.createReadStream(file)
    .pipe(
      csvParser({
        delimiter: "\t",
        endLine: "\n",
        escapeChar: '"',
        enclosedChar: '"',
      })
    )
    .on("data", async function (data) {
      data = data[0].split(",");
      await Location.create(data);
    })
    .on("end", function (data) {
      console.log("reading finished");
    });
  res.send({ success: true });
});

const getLocations = asyncHandler(async (req, res, next) => {
  const locationEntity = await sequelize.query("SELECT * FROM `location`", {
    type: QueryTypes.SELECT,
  });
  if (!location && locationEntity.length === 0) {
    return res.status(404).send({ success: true, message: "No records found" });
  }
  res.status(200).send({ success: true, data: locationEntity });
});
export { uploadRecords, getLocations };
