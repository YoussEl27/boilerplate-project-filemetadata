var express = require('express');
var cors = require('cors');
require('dotenv').config()
const multer = require('multer');


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
  const file = req.file
  if (!file) return res.json({error: 'File doesn\'t exist'});

  res.json({
    name: file.originalname,
    type: file.mimetype,
    size: file.size,
  })
})



const port = process.env.PORT || 3001;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
