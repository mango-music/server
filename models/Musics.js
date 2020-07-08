const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const musicsSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  thumbnail: {type: String, required: true},
  videoid: {type: String, required: true},
  title: {type: String, required: true},
  rating: {type: Number, required: true},
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
}, {
  versionKey: false
});
musicsSchema.plugin(findOrCreate);
module.exports = mongoose.model('Music', musicsSchema);


// 추가가 될때, 점수를 매길때
// musics 데이터베이스에 들어간다
// musics 데이터베이스에 들어갈때 콜백으로 list를 업데이트한다 > ?
// 클라이언트에서 음악 추가 버튼을 누르면? 
// 리스트 네임이랑? 음악을 같이 받아야할까
// 만약 같이 받는다면? 음악을 musics 컬렉션에 추가 해주고 그 네임에 musliclist
// 를 파인드 all 해서 넣어준다?; 