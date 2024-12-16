const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;

const { MongoClient } = require('mongodb');

let db;
const url = process.env.DB_URL;
new MongoClient(url)
  .connect()
  .then((client) => {
    console.log('DB연결성공');
    db = client.db('eng_write');

    app.listen(PORT, () => {
      console.log('http://localhost:5000 에서 서버 실행중');
    });
  })
  .catch((err) => {
    console.log(err);
  });

// 현재 문장 인덱스를 저장할 변수
let currentSentenceIndex = 0;

app.get('/api/sentences', async (req, res) => {
  try {
    // DB에서 코스 데이터 가져오기
    const course = await db
      .collection('kor_eng_course')
      .findOne({ title: 'basic' });

    if (!course || !course.contents.length) {
      console.log('데이터가 없습니다');
      return res.status(404).send('데이터가 없습니다');
    }

    // 현재 인덱스의 문장 가져오기
    const currentSentence = course.contents[currentSentenceIndex];

    // 다음 문장을 위해 인덱스 증가
    currentSentenceIndex = (currentSentenceIndex + 1) % course.contents.length;

    // 영어 문장 분리 및 섞기
    const engSpt = currentSentence.eng.split(' ');
    const engSptSff = shuffle(engSpt);

    const sentences = {
      kor: currentSentence.kor,
      eng: engSptSff,
      engAnswer: engSpt,
    };
    console.log(sentences);
    res.send(sentences);
  } catch (error) {
    console.error(error);
    res.status(500).send('서버 에러');
  }
});

// 배열을 섞는 함수
const shuffle = (array) => {
  let arrSff = [...array];
  for (let i = arrSff.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arrSff[i], arrSff[j]] = [arrSff[j], arrSff[i]];
  }
  if (JSON.stringify(arrSff) === JSON.stringify(array)) {
    return shuffle(array);
  }
  return arrSff;
};

app.get('/', (req, res) => {
  res.send('반갑다');
});
