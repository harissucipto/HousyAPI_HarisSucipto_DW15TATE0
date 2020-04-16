const express = require("express");
const router = express.Router();
const { signup } = require("../controllers/auth");

/*
url = {your_host}/api/v1/signin
mehtod = POST
request body = 

{
  "username": "spiderman",
  "password": "lovespiderman"
}
response body = 

{
  "data": {
     "username": "spiderman",
     “token”: “0sdnOJIoinsdo9878IJNBIniiuinINiuYIUY”
   }
}
*/

router.post("/", signup);

module.exports = router;
