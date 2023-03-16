var express = require('express');
var router = express.Router();
var adminHelpers = require('../Helpers/adminHelpers');
const mailer = require('../Helpers/mailer');
const fs = require('fs');
const { Stream } = require('stream');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('users/home');  
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
    res.json({ result });
  })
})

router.post('/login', (req, res) => {
  adminHelpers.DoLogin(req.body).then((UserStatus) => {
    // console.log(UserStatus);
    res.json({ UserStatus })
  })

})

router.post('/feedback', (req, res) => {
  console.log(req.body)
  mailer.sendFeedback(req.body).then((status) => {
    res.json({ status })
  })
})

router.post('/addFile', (req, res) => {
  console.log(req.body);
  // console.log(req.files.file);

  if (req.files) {
    var file = req.files.file
  }
  // console.log(__dirname)
  var status = false

  // var filename = req.body.Title+"_"+req.body.Sub+"_"+req.body.Sem+"_"+req.body.Rev+"_"+req.body.stream;
  //  console.log(filename)

  adminHelpers.addFiles(req.body).then((id) => {
    if (req.files) {
      file.mv('./public/files/' + id + ".pdf", (err) => {
        if (!err) {
          status = true;
          res.redirect('/');
        } else {
          console.log("Error at img1 " + err)
        }
      })
    }else{
      status = true;
      res.redirect('/');
    }
  })

})

module.exports = router;
