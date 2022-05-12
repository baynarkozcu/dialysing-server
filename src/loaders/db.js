const Mongoose = require("mongoose");
const db = Mongoose.connection;

db.once("open", () => {
  console.log("MongoDB bağlantısı kuruldu");
});

const connectDB = async () => {
  await Mongoose.connect(`mongodb+srv://enes:MmNnEGo98Om1gFBK@cluster0.gp9bi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = {
  connectDB,
};
