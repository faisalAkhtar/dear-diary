var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var db = req.db;
  var journals = db.get('journals');
  journals.find({}, {}, function(e,docs) {
    res.render('index', {
      title: 'Daily Journal',
      'journals': docs
    });
  })
});

/* GET compose page. */
router.get('/compose', function(req, res) {
  res.render('compose', { title: 'Add Journal' });
});

/* POST journals page. */
router.post('/journals', function(req, res) {
  // Set our internal DB variable
  var db = req.db;

  // Get our form values. These rely on the "name" attributes
  var heading = req.body.heading;
  var text = req.body.text;

  // Set our collection
  var journals = db.get('journals');

  if(heading=="" || text=="")
    res.render('error', { error: "Nopsy bro", message: "Noooooooooooo!!!" })
  else {
    // Submit to the DB
    journals.insert({
        "heading" : heading,
        "text" : text,
        "composed" : new Date()
    }, function (err, doc) {
        if (err) {
          // If it failed, return error
          res.send("There was a problem adding the information to the database.");
        } else {
          // And forward to success page
          res.redirect("/");
        }
    });
  }
});

/* DELETE journals page. */
router.delete('/journals/:sid', function(req, res) {
  // Set our internal DB variable
  var db = req.db;

  // Get our form values. These rely on the "name" attributes
  var sid = req.params.sid;

  // Set our collection
  var journals = db.get('journals');

  // Submit to the DB
  journals.remove({
      "_id" : sid
  }, function (err, doc) {
      if (err) {
        // If it failed, return error
        res.send("There was a problem deleting the information to the database.");
      } else {
        // And forward to success page
        res.send(doc);
      }
  });
});

module.exports = router;
