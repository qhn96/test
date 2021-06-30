const HttpStatus = require("http-status");
const axios = require("axios");
const ObjectId = require("mongoose").Types.ObjectId;
const { Space } = require("./space.model");
const httpStatus = require("http-status");

module.exports = {
  synchronize: async (req, res, next) => {
    try {
      const date = new Date();
      const { data } = await axios.get(process.env.Data);
      if (!data) {
        res.json({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: "can't check data",
        });
      }
      for (i = 0; i < data.length; i++) {
        const space = await Space.findOne({ _id: ObjectId(data[i].id) });
        if (!space) {
          const newSpace = new Space();
          newSpace._id = data[i].id;
          newSpace.name = data[i].name ? data[i].name : "";
          newSpace.flight_number = data[i].flight_number
            ? data[i].flight_number
            : -1;
          newSpace.links.patch = data[i].links.patch ? data[i].links.patch : {};
          newSpace.details = data[i].details ? data[i].details : "";
          newSpace.date_utc = data[i].date_utc
            ? new Date(data[i].date_utc)
            : date;
          await newSpace.save();
        } else {
          space.name = data[i].name ? data[i].name : "";
          space.flight_number = data[i].flight_number
            ? data[i].flight_number
            : -1;
          space.links.patch = data[i].links.patch ? data[i].links.patch : {};
          space.details = data[i].details ? data[i].details : "";
          space.date_utc = data[i].date_utc ? new Date(data[i].date_utc) : date;
          await space.save();
        }
      }

      res.status(200).json({
        status: HttpStatus.ok,
        message: "Synchronize launches success",
      });
    } catch (error) {
      next(error);
    }
  },
  search: async (req, res, next) => {
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    if (startDate > endDate) {
      res.json({
        status: HttpStatus.BAD_REQUEST,
        message: "Invalid Date Range",
      });
    }
    try {
      const data = await Space.find({
        date_utc: { $gte: startDate, $lte: endDate },
      });
      res.json({
        data,
        status: httpStatus.ok,
        message: "search success",
        length: data.length,
      });
    } catch (error) {
      next(error);
    }
  },
};
