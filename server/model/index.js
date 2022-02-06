const mongoose = require('mongoose');




mongoose.connect("mongodb://localhost:27017/sagacity-live", { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', function () {
    console.log("MONGODB connected");
});

mongoose.connection.on("disconnected", () => {
    console.log("MONGODB disconnected");
    process.exit(1);
});

mongoose.connection.on("error", (err) => {
    console.log("MongoDB disconnected due to : " + err);
    process.exit(1);
});

process.on("SIGINT", () => {
    console.log("App is terminating");
    mongoose.connection.close(() => {
        console.log("MONGODB disconnected");
        process.exit(0);
    })
})


const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: String,
});






const User = mongoose.model("user", userSchema);



module.exports = {
    User,
}







