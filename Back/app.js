const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const patientRoutes = require("./routes/patientRoutes");
const cookieParser = require("cookie-parser");
const registerRoute = require("./routes/registerRoute");
const doctorRoute = require("./routes/doctorRoute");
const adminRoutes = require("./routes/adminRoutes");
const logoutRoute = require("./routes/logoutRoute");
const cors = require("cors");
const app = express();

dotenv.config({ path: "./.env" });

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

const dbURI = process.env.DATABASE;
const port = process.env.PORT || 5000;

mongoose.set('strictQuery', true);


mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
    // useCreateIndex: true,
})

.then(() => {
        app.listen(port);
        console.log("connected to db and listening at port 5000");
    })
    .catch((err) => {
        console.error('Database connection error:', err);
        app.listen(port);
        app.get("/", (req, res) => {
            res.send(
                "Something Went Wrong! Please Try again after some time, if problem persists please contact us."
            );
        });
    });


app.use(authRoutes);
app.use(registerRoute);
app.use(doctorRoute);
app.use(patientRoutes);
app.use(adminRoutes);
app.use(logoutRoute);


if (process.env.NODE_ENV == "production") {

    app.use(express.static("client/build"));
    const path = require("pth");
    app.get("*", function(req, res) {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));

    });

}