const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const PORT = process.env.PORT || 5000;
const { User } = require('./model');
const authRoutes = require('./routes/auth-routes');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const app = express();


app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true,
}));



app.use("/auth", authRoutes);




app.use((req, res, next) => {
    if (!req.cookies.jToken) {
        res.status(401).send("include http-only credentials with every request")
        return;
    }
    jwt.verify(req.cookies.jToken, "123456", function (err, decodedData) {
        if (!err) {
            var token = jwt.sign({
                id: decodedData.id,
                name: decodedData.name,
                email: decodedData.email,
                role: decodedData.role,
                id: decodedData.id,

            }, "123456")
            res.cookie('jToken', token, {
                maxAge: 86_400_000,
                httpOnly: true
            });
            req.body.jToken = decodedData;
            req.headers.jToken = decodedData;
            next();
        } else {
            res.status(401).send("invalid token")
        }
    })
})



app.get('/profile', async (req, res) => {
    // Fine User who is logged in.
    try {
        const user = await User.findById(req.body.jToken.id, "name email role")
        if (user) {
            res.json({
                user,
            })
        } else {
            res.status(500).json({
                message: 'server error'
            })
        }
    } catch (err) {
        res.json({
            message: 'server error'
        })
    }


})







app.get('/logout', (req, res) => {
    res.clearCookie("jToken");

    return res.json({
        message: "logout successfully",
    })
})



app.listen(PORT, () => {
    console.log('server listening on ', PORT);
})