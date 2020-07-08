/*eslint-disable*/
const express = require('express');
const app = express();
const routes = require('./controllers');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');

app.use(bodyParser.json());
app.use(cors({
  origin : [
    'http://localhost:3000', 
    'http://localhost:3001', 
    "http://mango-client.s3-website.ap-northeast-2.amazonaws.com"
  ],
  methods:['GET', 'POST']
}));

app.use('/signin', routes.signin);
app.use('/signup', routes.signup);
app.use('/signout', routes.signout);
app.use('/refresh', routes.refresh);
app.post('/ratingMusic', routes.ratingMusic);
app.get('/getMusiclists', routes.getMusiclists);
app.post('/postMusiclist', routes.postMusiclist);
app.post('/addMusic', routes.addMusic);
app.post('/deleteMusic', routes.deleteMusic);
app.post('/delRatingMusic', routes.delRatingMusic);
app.get('/getRatingMusiclist', routes.getRatingMusiclist);
app.post('/postRatingMusiclist', routes.postRatingMusiclist);
app.use('/deleteMusiclist', routes.deleteMusiclist);
app.get('/recommendedMusic', routes.recommendedMusic);
app.post('/rename', routes.rename);
app.get('/musicAverage', routes.musicAverage);

const open = app.listen(3000, () => {
  console.log('3000 port start');
});

module.exports = open;