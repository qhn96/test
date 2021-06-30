const mongoose = require("mongoose");
const { Schema } = mongoose;

const SpaceSchema = new Schema({
  fairings: {
    reused: Boolean,
    recovery_attempt: Boolean,
    recovered: Boolean,
    ships: [],
  },
  links: {
    patch: {
      small: String,
      large: String,
    },
    reddit: {
      campaign: { type: String, default: null },
      launch: { type: String, default: null },
      media: { type: String, default: null },
      recovery: { type: String, default: null },
    },

    flickr: { small: [], original: [] },
    presskit: { type: String, default: null },
    webcast: String,
    youtube_id: String,
    article: String,
    wikipedia: String,
  },
  static_fire_date_utc: Date,
  static_fire_date_unix: Number,
  tbd: Boolean,
  net: Boolean,
  window: Number,
  rocket: String,
  success: Boolean,
  details: String,
  crew: [],
  ships: [],
  capsules: [],
  payloads: [],
  launchpad: String,
  auto_update: Boolean,
  launch_library_id: String,
  failures: [
    {
      time: Number,
      altitude: Number,
      reason: String,
    },
  ],
  flight_number: Number,
  name: String,
  date_utc: Date,
  date_unix: Number,
  date_local: Date,
  date_precision: String,
  upcoming: Boolean,
  cores: [
    {
      core: String,
      flight: Number,
      gridfins: Boolean,
      legs: Boolean,
      reused: Boolean,
      landing_attempt: Boolean,
      landing_success: { type: String, default: null },
      landing_type: { type: String, default: null },
      landpad: { type: String, default: null },
    },
  ],
});

const Space = mongoose.model("Space", SpaceSchema);

module.exports = { Space };
