const Musics = require('../models').Musics;
const musicAverage = async (req, res) => {
  try {
    const musicList = await Musics.find();
    const musicRating = {};
    const peopleNumber = {};
    for(let music of musicList) {
      if(!musicRating[music.videoid]) {
        musicRating[music.videoid] = music.rating;
        peopleNumber[music.videoid] = 1; 
      }else {
        musicRating[music.videoid] = musicRating[music.videoid] * peopleNumber[music.videoid];
        musicRating[music.videoid] = musicRating[music.videoid] + music.rating;
        musicRating[music.videoid] = musicRating[music.videoid] / (peopleNumber[music.videoid] + 1); 
        peopleNumber[music.videoid]+=1;  
      }
    }
    res.status(200).json({musicRating, peopleNumber});
  }catch(err) {
    console.log(err);
    res.status(500).end('server error');
  }
};
  
module.exports = musicAverage;