/* eslint-disable*/

//유클리드 계산
var dataset = {
  'Lee' : {
    'Believer' : 5,
    'Dali,Van,Picasso' : 4,
    '소주한잔' : 3.5,
    'Where is the love?' : 4.5,
    '수취인불명' : 4
  },
  'Kim' : {
    'Believer' : 5,
    '소주한잔' : 3.5,
    '마시멜로우' : 5,
    '수취인불명' : 4,
    'Where is the love?' : 4.5,
  },
  'Park' : {
    'Dali,van,Picasso' : 5,
    '소주한잔' : 5,
    'Where is the love?' : 2,
    '수취인불명' : 4,
    '기억의 습작' : 5
  }
};

/* 유사성 계산하는 보편적인 방법 2가지 

1. 유클리드 계산법 = 두 사용자 간의 유사성 점수를 계산하는 가장 간단한 방법 중 하나입니다. 데이터를 차트(x-y 축)의 한 점으로 표현하는 것이 포함되며, 각 사용자는 평가된 점수로부터 결과를 얻음.
2. 피어슨 상관계수 = 피어슨 상관 계수는 두 데이터 집합이 직선에 얼마나 잘 적합되는지 나타내는 측도입니다.공식은 유클리드 점수에 더 복잡하지만 데이터가 정규화되지 않은 경우 더 나은 결과를 제공합니다.

var euclid = Math.sqrt(Math.pow(4-3.5,2)+Math.pow(3.5-4.5,2)); // LEE와  KIM 'Believer'와 '소주한잔' 거리계산 = 1.118033988749895
유사한 사람들의 경우 0~1의 값사이에 1에 가까워지도록 값이 나와야 하기때문에 수식 변경
var reuclid = 1/ (1+ euclid);  0.4721359... 

*/
var euclidean_score = function (dataset, p1, p2) {
  var existp1p2 = {}; // 저장 항목이 두 항목에 모두 존재

  for(var key in dataset[p1]){
    if(key in dataset[p2]){
      existp1p2[key] = 1; // 데이터 집합이 p1과 p2인경우 하나의 스토어로 저장
    }
    if(len(existp1p2) ==0) return 0; // 데이터가 있는지 확인

    var sum_of_euclidean_dist = []; // 유클리드 거리를 저장하는 곳

    for(item in dataset[p1]){ // 유클리드거리 계산
      if(item in dataset[p2]){
        sum_of_euclidean_dist.push(Math.pow(dataset[p1] [item]-dataset[p2][item],2));
      }
    }
    var sum=0;
    for(var i=0;i<sum_of_euclidean_dist.length;i++){
      sum +=sum_of_euclidean_dist[i]; // 유클리드거리의 합계를 계산
    }
    var sum_sqrt = 1/(1 +Math.sqrt(sum)); // 유클리드거리는 0과 1사이로 존재해야 하며, 숫자로 커질수록 연관도가 높다.
    
    return sum_sqrt;
  }
};

var len  = function(obj){ // 객체의 길이를 계산해주는 도우미 함수
  var len=0;
  for(var i in obj){
    len++;
  }
  return len;
};