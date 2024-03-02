import Sequilize from "sequelize";
import { connect } from "../config/dbconfig.js";

const Location = connect.define("location", {
  name: {
    type: Sequilize.STRING,
    required: true,
  },
  state: {
    type: Sequilize.STRING,
    required: true,
  },
  lat: {
    type: Sequilize.STRING,
    required: true,
  },
  lon: {
    type: Sequilize.STRING,
    required: true,
  },
});

Location.sync().then(() => {
  console.log("table created");
});

export default Location;
