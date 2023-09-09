const dotenv = require("dotenv").config({ path: __dirname + "/.env" });

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      "process.env.REACT_APP_SERVER_DOMAIN": JSON.stringify(
        process.env.REACT_APP_SERVER_DOMAIN
      ),
    }),
  ].filter(Boolean),
};
