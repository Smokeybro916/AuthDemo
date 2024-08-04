const express = require('express'); 
const app = express();
const User = require('./modles/user');
const mongoose = require('mongoose');
const bcyrpt = require('bcrypt');

mongoose.connect('mongodb://127.0.0.1:27017/loginDemo', {useNewUrlParsel})
  .then(() => {
    console.log('Connected!');
  })
  .catch(err => {
    console.log("Oh no mongo connection error!")
    console.log(err)
  })

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.render('This is the home page')
})

app.post('/register', async(req, res) => {
  const {password, ursername} = req.body;
  const hash = await bcrypt.hash(password, 12);
  const user = new User ({
    username,
    password: hash
  })
  await user.save();
  res.redirect('/');
})

app.get('/login', (req,res) => {
  res.render('login')
})

app.post('/login', async (req,res) => {
  const {username, password} = req.body;
  const user = await User.findOne({username });
  const validPassword = await bcrypt.compare(password, user.password);
  if(validPassword){
    res.send("Welcome")
  }else {
    res.send("Try Again")
  }
})

app.get('/secret', (req, res) => {
  res.send('This is secret!')
})

app.listen(3000, () => {
  console.log("Serving your app!")
})