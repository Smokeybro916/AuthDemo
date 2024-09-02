const express = require('express'); 
const app = express();
const User = require('./modles/user');
const mongoose = require('mongoose');
const bcyrpt = require('bcrypt');
const session = require('express-session');

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
app.use(session({secret: 'notagoodsecret'}));

app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.render('This is the home page')
})

app.post('/register', async(req, res) => {
  const {password, username} = req.body;
  const hash = await bcrypt.hash(password, 12);
  const user = new User ({
    username,
    password: hash
  })
  await user.save();
  req.session.user_id = user._id;
  res.redirect('/');
})

app.get('/login', (req,res) => {
  res.render('login')
})

app.post('/login', async (req,res) => {
  const {username, password} = req.body;
  const user = await User.findOne({username});
  const validPassword = await bcrypt.compare(password, user.password);
  if(validPassword){
    req.session.user_id = user._id;
    res.redireect('/secrect')
  }else {
    res.redirect('/login')
  }
})

app.post('/logout', (req, res) => {
  req.session.user_id = null;
  res.redirect('/login');
})

app.get('/secret', (req, res) => {
  if(!req.session.user_id){
    return res.redirect('/login')
  }
  res.render('secret')
})

app.listen(3000, () => {
  console.log("Serving your app!")
})