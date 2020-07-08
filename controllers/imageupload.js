// /*eslint-disable*/
// var express = require('express');
// var app = express();
// var moment = require('moment');
// const fs = require('fs');
// const multer = require('multer');
// /* 기본 저장 위치 */
// var UploadDir = './uploads/' + moment().format('YYYY') + '/' + moment().format('MM') + '/' + moment().format('DD');
// /* 폴더 생성 하기 */
// var oMDIR = (req, res, next ) => {
//   fs.mkdir('./uploads/' + moment().format('YYYY'), 0775, function(err){ return true; });
//   fs.mkdir('./uploads/' + moment().format('YYYY') + '/' + moment().format('MM'), 0775, function(err){ return true; });
//   fs.mkdir('./uploads/' + moment().format('YYYY') + '/' + moment().format('MM') + '/' + moment().format('DD'), 0775, function(err){ return true; });
//   next();
// };
// /* 폴더 생성 사용 등록 */
// app.use(oMDIR);
// /* 스토리지 설정 */
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, UploadDir);
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '_' + file.originalname);
//   },
// });
// // 파일 필터 적용 이미지 일 경우에만 업로드

// const upload = multer({storage: storage, fileFilter : ( req, file, cb ) => {
//   console.log(file.mimetype.indexOf('image'));
//   if (file.mimetype.indexOf('image') === -1){
//     cb(null, false);
//   }
//   else{ cb(null, true);	}
// } });

// app.use(express.json());
// app.get('/', function (req, res) {
//   var responseText = moment().format('YYYY') + '/' + moment().format('MM') + '/' + moment().format('DD');
//   res.send(responseText);
// });
// app.post('/upload', upload.single('file'), (req, res) => {
//   var bFlag = false;
//   if( typeof JSON.stringify(req.file) != 'undefined' ){ bFlag = true; }
//   res.json( { file : JSON.stringify(req.file), result : bFlag } );
// });

// app.listen(3000);