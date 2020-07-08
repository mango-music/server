/*eslint-disable*/
// 피어슨 상관계수 계산
// 유사도를 계산하면 계-1 ~ 1까지의 값이 나온다.
// 완전히 동일할수록 1에 가까워지고 완전히 다를수록 -1에 가까워진다. 
const music = [ {   
  user_id: "1",
  videoid: "1UExGZ3F1TG5MNTlhbEdKY2RjMEJFWkpiMnA3SWdrTDBPZS4zNDI1RjdEMkE5MjdFNzky",
  rating: 1,
  thumbnail: "1https://i.ytimg.com/vi/rOCymN-Rwiw/sddefault.jpg",
  title: "[슬기로운 의사생활 OST Part 11] 전미도 (JEON MI DO) - 사랑하게 될 줄 알았어 (I Knew I Love) MV" },
  {user_id: "1",
  videoid: "1UExGZ3F1TG5MNTlhbEdKY2RjMEJFWkpiMnA3SWdrTDBPZS4zNDI1RjdEMkE5MjdFNzky",
  rating: 2,
  thumbnail: "2https://i.ytimg.com/vi/rOCymN-Rwiw/sddefault.jpg",
  title: "2[슬기로운 의사생활 OST Part 11] 전미도 (JEON MI DO) - 사랑하게 될 줄 알았어 (I Knew I Love) MV" },
  {user_id: "1",
  videoid: "2UExGZ3F1TG5MNTlhbEdKY2RjMEJFWkpiMnA3SWdrTDBPZS4zNDI1RjdEMkE5MjdFNzky",
  rating: 1,
  thumbnail: "3https://i.ytimg.com/vi/rOCymN-Rwiw/sddefault.jpg",
  title: "3[슬기로운 의사생활 OST Part 11] 전미도 (JEON MI DO) - 사랑하게 될 줄 알았어 (I Knew I Love) MV" },
  {user_id: "1",
  videoid: "3UExGZ3F1TG5MNTlhbEdKY2RjMEJFWkpiMnA3SWdrTDBPZS4zNDI1RjdEMkE5MjdFNzky",
  rating: 2,
  thumbnail: "4https://i.ytimg.com/vi/rOCymN-Rwiw/sddefault.jpg",
  title: "4[슬기로운 의사생활 OST Part 11] 전미도 (JEON MI DO) - 사랑하게 될 줄 알았어 (I Knew I Love) MV" },
  {user_id: "2",
  videoid: "1UExGZ3F1TG5MNTlhbEdKY2RjMEJFWkpiMnA3SWdrTDBPZS4zNDI1RjdEMkE5MjdFNzky",
  rating: 4,
  thumbnail: "1https://i.ytimg.com/vi/rOCymN-Rwiw/sddefault.jpg",
  title: "[슬기로운 의사생활 OST Part 11] 전미도 (JEON MI DO) - 사랑하게 될 줄 알았어 (I Knew I Love) MV" },
  {user_id: "2",
  videoid: "1UExGZ3F1TG5MNTlhbEdKY2RjMEJFWkpiMnA3SWdrTDBPZS4zNDI1RjdEMkE5MjdFNzky",
  rating: 5,
  thumbnail: "2https://i.ytimg.com/vi/rOCymN-Rwiw/sddefault.jpg",
  title: "2[슬기로운 의사생활 OST Part 11] 전미도 (JEON MI DO) - 사랑하게 될 줄 알았어 (I Knew I Love) MV" },
  {user_id: "3",
videoid: "1UExGZ3F1TG5MNTlhbEdKY2RjMEJFWkpiMnA3SWdrTDBPZS4zNDI1RjdEMkE5MjdFNzky",
rating: 4,
thumbnail: "1https://i.ytimg.com/vi/rOCymN-Rwiw/sddefault.jpg",
title: "[슬기로운 의사생활 OST Part 11] 전미도 (JEON MI DO) - 사랑하게 될 줄 알았어 (I Knew I Love) MV" },
{user_id: "3",
videoid: "1UExGZ3F1TG5MNTlhbEdKY2RjMEJFWkpiMnA3SWdrTDBPZS4zNDI1RjdEMkE5MjdFNzky",
rating: 5,
thumbnail: "2https://i.ytimg.com/vi/rOCymN-Rwiw/sddefault.jpg",
title: "2[슬기로운 의사생활 OST Part 11] 전미도 (JEON MI DO) - 사랑하게 될 줄 알았어 (I Knew I Love) MV" },
{user_id: "3",
videoid: "77UExGZ3F1TG5MNTlhbEdKY2RjMEJFWkpiMnA3SWdrTDBPZS4zNDI1RjdEMkE5MjdFNzky",
rating: 4,
thumbnail: "1https://i.ytimg.com/vi/rOCymN-Rwiw/sddefault.jpg",
title: "[슬기로운 의사생활 OST Part 11] 전미도 (JEON MI DO) - 사랑하게 될 줄 알았어 (I Knew I Love) MV" },
{user_id: "3",
videoid: "7777UExGZ3F1TG5MNTlhbEdKY2RjMEJFWkpiMnA3SWdrTDBPZS4zNDI1RjdEMkE5MjdFNzky",
rating: 5,
thumbnail: "2https://i.ytimg.com/vi/rOCymN-Rwiw/sddefault.jpg",
title: "2[슬기로운 의사생활 OST Part 11] 전미도 (JEON MI DO) - 사랑하게 될 줄 알았어 (I Knew I Love) MV" }

]

let dataset2 = {};
for(let i = 0; i < music.length; i++) {
  if(!dataset2[music[i].user_id]) {
    dataset2[music[i].user_id] = {};
  }
  const {videoid, title, thumbnail} = music[i]
  let a = JSON.stringify({videoid, title, thumbnail})
  dataset2[music[i].user_id][a] = music[i].rating;  
}
let pearson_correlation = function(dataset,p1,p2){
  let existp1p2 = {};
  // console.log(dataset[p1], dataset[p2])
  for(item in dataset[p1]){
    if(item in dataset[p2]){
      existp1p2[item] = 1;
    }
  }

  let num_existence = len(existp1p2);
  console.log(num_existence)
  if(num_existence ==0) return 0; 
  let p1_sum=0, // p1과 p2의 합과 제곱근의 합을 저장한다.
    p2_sum=0,
    p1_sq_sum=0,
    p2_sq_sum=0,
    prod_p1p2 = 0;
  for(let item in existp1p2){ // 각 데이터의 합과 제곱근을 계산한다 
    // console.log(dataset[p1][item])
    p1_sum += dataset[p1][item]; // p1 음악의 점수를 더해준다   겹치는거 한에서
    p2_sum += dataset[p2][item]; // p2 음악의 점수를 더해준다
    p1_sq_sum += Math.pow(dataset[p1][item],2); // p1 음악의 점수를 2제곱해서 더해줌
    p2_sq_sum += Math.pow(dataset[p2][item],2); // p2 음악의 점수를 2제곱해서 더해줌
    prod_p1p2 += dataset[p1][item]*dataset[p2][item]; // p1, p2 음악의 점수를 곱해서 더해줌
  }
  let numerator =prod_p1p2 - (p1_sum*p2_sum/num_existence); // 피어슨상관계수 결과값은 -1과 1사이에 존재해야 하며, 
  let st1 = p1_sq_sum - Math.pow(p1_sum,2)/num_existence; 
  let st2 = p2_sq_sum - Math.pow(p2_sum,2)/num_existence;
  let denominator = Math.sqrt(st1*st2);
  // console.log(st1, st2)
  if(denominator ==0) return 0;
  else {
    // console.log(numerator, denominator)
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
let a = pearson_correlation(dataset2, '2', '1')
console.log(a);

/*
유사성 점수가 만들어진 후, 우리는 우리가 원하는 사용자들과 관련하여 순위를 매기는 기능을 만듭니다. 즉, 음악의 같은 취향을 가진
*/

// let similar_user = function(dataset,person,num_user,distance){
  // let scores=[];;
  // for(let others in dataset){
    // if(others != person && typeof(dataset[others])!="function"){
      // let val = distance(dataset,person,others);
      // let p = others;
      // scores.push({val:val,p:p});
    // }
  // }
  // scores.sort(function(a,b){
    // return b.val < a.val ? -1 : b.val > a.val ? 1 : b.val >= a.val ? 0 : NaN;
  // });
  // let score=[];
  // for(let i =0;i<num_user;i++){
    // score.push(scores[i]);
  // }
  // return score;    
// };

/* 
이 기능은 사용자를 비교할 때 사용자가 자신과 비교되지 않는지 확인합니다. 
그런 다음 정렬된 결과의 사용자 수를 반환합니다.
*/
// console.log(similar_user(dataset2,'2',2,pearson_correlation)); 

// (dataset, '유사성검색하고싶은 유저', '찾고싶은 유저 숫자',피어슨_상관관계 메소드')

/*
[ {val: 0.9285714285714296, p: "Park"}
  {val: -0.8660254037844387, p: "Lee"} ]
*/

let recommendation_eng = function(dataset,person,distance){
 
  let totals = {
    //세타함수의 생성을 피하게 한다.
    //생성하지 않을 경우 객체에 속성이 있는지 확인하고 값을 추가합니다.
    //세터함수때문에 기능 속성을 변환할때, 데이터집합에 만들어집니다.
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
    // console.log(dataset, person, other)
    let similar = distance(dataset,person,other);
    console.log(similar);
    if(similar <= 0.5) continue;
    for(let item in dataset[other]){
      // console.log(item);
      if(!(item in dataset[person]) ||(dataset[person][item]==0)){
        //세터가 결과를 보기좋게 해줍니다
        console.log(dataset[person][item])
        totals.setDefault(item,dataset[other][item]*similar);
        simsum.setDefault(item,similar);
      }
    }
  }
  
  for(let item in totals){
  // 세터함수가 수행하는 작업, 객체의 기능을 피할 수 있는 방법  
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
    if(rank_lst[i].val < 3) {
      break;
    }
    recommend.push(JSON.parse(rank_lst[i].items));
  }
  let rating = [];
  for(let music in  dataset[person]) {
    rating.push({val : dataset[person][music], items: music});
  }
  for(let j in rating) {
    if(rating[j].val < 3) {
      break;
    }
    recommend.push(JSON.parse(rating[j].items));
  }
  
  return recommend;
};

console.log(recommendation_eng(dataset2, '2', pearson_correlation))












































































































































































































































































