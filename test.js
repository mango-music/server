let trained = {};

let train1= (data, x, y, val)=> {
  if (!x) x = 0;
  if (!y) y = 1;
  if (!val) val = 2;
  let userBase = {}, itemBase = {}, itemRank = {};

  for (let i = 0; i < data.length; i++) {
    let userId = data[i][x];
    let itemId = data[i][y];
    let feature = data[i][val] * 1;

    if (!userBase[userId]) userBase[userId] = [];
    userBase[userId].push({itemId: itemId, feature: feature});

    if (!itemBase[itemId]) itemBase[itemId] = [];
    itemBase[itemId].push({userId: userId, feature: feature});

    if (!itemRank[itemId]) itemRank[itemId] = 0;
    itemRank[itemId] += feature;
  }

  let ranking = [];
  for (let itemId in itemRank)
    ranking.push({itemId: itemId, play: itemRank[itemId]});
  ranking.sort((a, b)=> b.play - a.play);

  trained.userBase = userBase;
  trained.itemBase = itemBase;
  trained.ranking = ranking;
};

let recommendToUser = (userId, count) => {
  let userList = trained.userBase[userId];
  if (userList)
    return recommendByArray(userList, count);
  else
    return trained.ranking.splice(0, count);
};

let app = {};
let recommendByArray = (listenList, count)=> {
  let alreadyIn = {};
  let similarUsers = {};
  for (let i = 0; i < listenList.length; i++) {
    alreadyIn[listenList[i].itemId] = true;
    let similarUserList = trained.itemBase[listenList[i].itemId];
    for (let j = 0; j < similarUserList.length; j++) {
      if (!similarUsers[similarUserList[j].userId])
        similarUsers[similarUserList[j].userId] = 0;
      similarUsers[similarUserList[j].userId] += similarUserList[j].feature * listenList[i].feature;
    }
  }

  let relatedUsers = [];
  for (let userId in similarUsers)
    relatedUsers.push({id: userId, score: similarUsers[userId]});
  relatedUsers.sort((a, b)=> b.score - a.score);

  let playlist = {};
  let playlistCount = 0;
  for (let i = 0; i < relatedUsers.length; i++) {
    if (app.maxRelatedUser !== 0 && i > app.maxRelatedUser)
      break;
    let userId = relatedUsers[i].id;
    let userScore = relatedUsers[i].score;
    let userList = trained.userBase[userId];

    for (let j = 0; j < userList.length; j++) {
      if (alreadyIn[userList[j].itemId]) continue;
      if (app.maxRelatedItem !== 0 && j > app.maxRelatedItem)
        break;
      if (!playlist[userList[j].itemId]) {
        playlist[userList[j].itemId] = 0;
        playlistCount++;
      }

      playlist[userList[j].itemId] += userScore;
    }
  }

  let result = [];
  for (let itemId in playlist)
    result.push({itemId: itemId, score: Math.round(Math.log(playlist[itemId] + 1) * 100) / 100});
  result.sort((a, b)=> b.score - a.score);
  result.splice(count);

  for (let i = 0; i < trained.ranking.length; i++) {
    if (result.length >= count) break;
    if (!playlist[trained.ranking[i].itemId])
      result.push(trained.ranking[i]);
  }

  return result;
};
// const model = tf.sequential();
// model.add(tf.layers.dense({ units: 1, inputShape: [200] }));
// model.compile({
//   loss: 'meanSquaredError',
//   optimizer: 'sgd',
//   metrics: ['MAE']
// });
// 
// 
// Generate some random fake data for demo purpose.
// const xs = tf.randomUniform([10000, 200]);
// const ys = tf.randomUniform([10000, 1]);
// const valXs = tf.randomUniform([1000, 200]);
// const valYs = tf.randomUniform([1000, 1]);
// 
// 
// Start model training process.
// async function train3() {
//   await model.fit(xs, ys, {
// epochs: 100,
// validationData: [valXs, valYs],
// Add the tensorBoard callback here.
// callbacks: tf.node.tensorBoard('/tmp/fit_logs_1')
//   });
// }
// train();