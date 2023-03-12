var express = require('express');
var router = express.Router();
var adminHelpers = require('../Helpers/adminHelpers');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/signup', (req, res) => {
  console.log(req.body)
  //console.log(req.data);
  var user = req.body;


  // const now = new Date();
  // const hours = now.getHours(); // Get the current hour (0-23)
  // const minutes = now.getMinutes(); // Get the current minute (0-59)
  // const seconds = now.getSeconds(); // Get the current second (0-59)
  // const milliseconds = now.getMilliseconds(); // Get the current millisecond (0-999)

  // console.log(`Current time: ${hours}:${minutes}:${seconds}.${milliseconds}`);

  adminHelpers.DoSignup(user).then((result) => {
  //  console.log("result: ", result);
    res.json({message: result});
  })
})

router.post('/login',(req,res)=>{
  adminHelpers.DoLogin(req.body).then((UserStatus)=>{
    // console.log(UserStatus);
    res.json({UserStatus})
  })

})

module.exports = router;
