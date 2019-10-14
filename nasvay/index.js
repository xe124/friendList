const mongoseDB = 'сюдаимябазынапиши';

var express = require('express');
var app = express();

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var conn = mongoose.connection;

var cors = require('cors');
app.use(cors({ origin: 'http://localhost:3000', credentials :  true}));

mongoose.connect('mongodb://localhost:27017/vkfriends', {
  useNewUrlParser: true, useUnifiedTopology: true
});
mongoose.model('users', new Schema({ name: String, lastName: String, id: Number, DickLength: Number }));

app.get('/huy', function (req, res) {
  res.send(req.query.string + 'ebaa')
});

app.get('/sort', (req, res) => {
  console.log(name = req.query.string.split(',').map(nm => nm.trim()));

  mongoose.model('users').find({
    name
  }, (err, data) => {
    if (err)
      throw err;

    result = [];
    // for (el of data)
    //   result += `У ${el.get('name')} длина расписоса ${el.get('dlinaChlena')}, а живёт он на ${el.get('address')}. \n`

    // console.log(result)

    for (el of data)
      result.push(el);

    console.log(result);
    
    keysSorted = Object.keys(result).sort((a, b) => ( result[a].get('dlinaChlena') - result[b].get('dlinaChlena') ))
    console.log(keysSorted);

    sortedArray = [];
    for (el of keysSorted)
      sortedArray.push(result[el]);
    console.log(sortedArray);
    

    sortedString = '';
    for (el of keysSorted)
      sortedString += `${result[el].get('dlinaChlena')}, `
    console.log(sortedString)

    thestring = '';
    for (el of result)
      thestring += `${el.get('dlinaChlena')}, `

    res.send(thestring)
  })
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
