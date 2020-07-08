const recommended = (musiclist, user_id) => {
  const dataset = {};
  for(let i = 0; i < musiclist.length; i++) {
    if(!dataset[musiclist[i].user_id]) {
      dataset[musiclist[i].user_id] = {};
    }
    const {videoid, title, thumbnail} = musiclist[i];
    let a = JSON.stringify({videoid, title, thumbnail});
    dataset[musiclist[i].user_id][a] = musiclist[i].rating;  
  }

  return recommendation_eng(dataset, user_id, pearson_correlation);
};


let pearson_correlation = function(dataset,p1,p2){
  let existp1p2 = {};
  for(let item in dataset[p1]){
    if(item in dataset[p2]){
      existp1p2[item] = 1;
    }
  }

  let num_existence = len(existp1p2);
  if(num_existence ==0) return 0; 
  let p1_sum=0, // p1과 p2의 합과 제곱근의 합을 저장한다.
    p2_sum=0,
    p1_sq_sum=0,
    p2_sq_sum=0,
    prod_p1p2 = 0;
  for(let item in existp1p2){ // 각 데이터의 합과 제곱근을 계산한다 
    p1_sum += dataset[p1][item]; // p1 음악의 점수를 더해준다   겹치는거 한에서
    p2_sum += dataset[p2][item]; // p2 음악의 점수를 더해준다
    p1_sq_sum += Math.pow(dataset[p1][item],2); // p1 음악의 점수를 2제곱해서 더해줌
    p2_sq_sum += Math.pow(dataset[p2][item],2); // p2 음악의 점수를 2제곱해서 더해줌
    prod_p1p2 += dataset[p1][item]*dataset[p2][item]; // p1, p2 음악의 점수를 곱해서 더해줌
  }
  let numerator =prod_p1p2 - (p1_sum*p2_sum/num_existence); // 피어슨상관계수 결과값은 -1과 1사이에 존재해야 
  let st1 = p1_sq_sum - Math.pow(p1_sum,2)/num_existence; 
  let st2 = p2_sq_sum - Math.pow(p2_sum,2)/num_existence;
  let denominator = Math.sqrt(st1*st2);
  if(denominator ==0) return 0;
  else {
    let val = numerator / denominator;
    return val;
  }
};


let len  = function(obj){ // 객체의 길이를 계산해주는 도우미 함수
  let len=0;
  for(let i in obj){
    len++;
  }
  return len;
};

let recommendation_eng = function(dataset,person,distance){
 
  let totals = {
      setDefault:function(props,value){
        if(!this[props]){
          this[props] =0;
        }

        this[props] += value;
      }
    },
    simsum = {
      setDefault:function(props,value){
        if(!this[props]){
          this[props] =0;
        }
        this[props] += value;
      }
    },
    rank_lst =[];
  for(let other in dataset){
    if(other ===person) continue;
    let similar = distance(dataset,person,other);
    
    if(similar <= 0.5) continue;
    for(let item in dataset[other]){
      if(!(item in dataset[person]) ||(dataset[person][item]==0)){
        totals.setDefault(item,dataset[other][item]*similar);
        simsum.setDefault(item,similar);
      }
    }
  }
  
  for(let item in totals){ 
    if(typeof totals[item] !="function"){
           
      let val = totals[item] / simsum[item];
      rank_lst.push({val:val,items:item});
    }
  }
  rank_lst.sort(function(a,b){
    return b.val < a.val ? -1 : b.val > a.val ? 
      1 : b.val >= a.val ? 0 : NaN;
  });
  let recommend = []; 
  for(let i in rank_lst){
    if(recommend.length === 100) break;
    if(rank_lst[i].val < 3) break;
    
    recommend.push(JSON.parse(rank_lst[i].items));
  }
  return recommend;
};


module.exports = recommended;


