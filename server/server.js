const express = require('express');
const app = express();
const PORT = 5000;

app.listen(PORT, () => {
  console.log('http://localhost:5000 에서 서버 실행중');
});

//접근한 페이지에 따라 한글과 영어 문장 찢어서 보내기
app.get('/api/sentences', (req, res) => {
  //db에 접근해서 한글문장 영어문장 가져오기
  //
  //
  const dbSentences = {
    kor: '당신의 가방에 무엇이 들었나요?',
    eng: "What's in your bag?",
  };
  //db에서 가져온 데이터중 영어 문장을 띄어쓰기로 나눠서 배열로 담기
  const engSpt = dbSentences.eng.split(' ');
  //engSpt에 담긴 요소를 무작위로 섞기위한 함수
  const shuffle = (array) => {
    let arrSff = [...array];
    for (let i = arrSff.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [arrSff[i], arrSff[j]] = [arrSff[j], arrSff[i]];
    }
    //섞은 것과 원래 것이 같으면 다시 섞기
    if (arrSff === array) {
      for (let i = arrSff.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arrSff[i], arrSff[j]] = [arrSff[j], arrSff[i]];
      }
    }
    return arrSff;
  };
  //섞기
  const engSptSff = shuffle(engSpt);

  const sentences = {
    kor: '당신의 가방에 무엇이 들었나요?',
    eng: engSptSff,
    engAnswer: engSpt,
  };
  res.send(sentences);
});

app.get('/', (req, res) => {
  res.send('반갑다');
});
