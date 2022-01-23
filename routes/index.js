var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient
var details;
var admin;

/* GET home page. */
router.get('/', function (req, res, next) {



  MongoClient.connect('mongodb://localhost:27017', (err, client) => {

    if (err)
      console.log('database connection faild...')
    else {


      var db = client.db("crud")
      let det = db.collection("details").find().toArray((err, resullt) => {

        if (err)
          console.log("err")
        else {

          details = resullt
          return resullt

        }

      });

      console.log('Database connected...')
    }
  })



  res.render('index', { details });
}


);

router.post('/a', function (req, res, next) {

  MongoClient.connect('mongodb://localhost:27017', (err, client) => {

    if (err)
      console.log('Post database connection faild...')
    else {
      console.log('post Database connected...')
      client.db('crud').collection('details').insertOne(req.body)
      res.send("Post Added ...")



    }

  })


}
);

router.get('/admin', function (req, res, next) {
  res.render('admin_sign', {});



}
)

router.get('/admin1', function (req, res, next) {
  res.render('admin', {});



}
)


router.post('/admin-sign', function (req, res, next) {
  res.render('admin_sign', {});
  
  let pass=1234;
  let a_name="jadhu";
  
  console.log(req.body)
  if(req.body.admin_name==a_name&&req.body.admin_pass==pass)
    {res.render('admin', {});}

  else{res.send("login failed...")
         
      }

}
)



module.exports = router;