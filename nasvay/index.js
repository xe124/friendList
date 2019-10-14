const mongoseDB = 'usersdb';

var express = require('express');
var app = express();

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var conn = mongoose.connection;

var cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

mongoose.connect('mongodb://localhost:27017/' + mongoseDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.model('users', new Schema({
  name: String,
  lastName: String,
  id: Number,
  DickLength: Number
}));

app.get('/:huy', function (req, res) {
  const text = req.params.huy;
  console.log(text);

  mongoose.model('users').find({
      name: text
    },
    (err, data) => {
      if (err)
        throw err;
      console.log(data)
      res.send(data)
    }
  );

});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));