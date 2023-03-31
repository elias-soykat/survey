const mongoose = require("mongoose");
const { MONGO_DOMAIN, MONGO_NAME, MONGO_POSTFIX, NODE_ENV } = process.env;

const mongoConnect = async () => {
  try {
    const conn = await mongoose.connect(
      `${MONGO_DOMAIN}/${MONGO_NAME}-${NODE_ENV}${MONGO_POSTFIX}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = mongoConnect;
