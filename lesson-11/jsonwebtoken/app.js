import jwt from "jsonwebtoken";
import "dotenv/config";

const {JWT_SECRET} = process.env;

const payload = {
    email: "wefoyig721@abatido.com"
};

const jwtToken = jwt.sign(payload, JWT_SECRET, {expiresIn: "24h"});
// console.log(jwtToken);
const decodeToken = jwt.decode(jwtToken);
// console.log(decodeToken);

try {
    const {email} = jwt.verify(jwtToken, JWT_SECRET);
    // console.log(email);
    const invalidToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IndlZm95aWc3MjFAYWJhdGlkby5jb20iLCJpYXQiOjE3MjcxMTMwNDYsImV4cCI6MTcyNzE5OTQ0Nn0.zDoxmWLghEk3uPWvJJgf7gPUyUSohyzlsVRP0hhpoU3";
    jwt.verify(invalidToken, JWT_SECRET);
}
catch(error) {
    console.log(error.message);
}