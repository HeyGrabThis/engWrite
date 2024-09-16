import { useEffect, useState } from 'react';
import axios from 'axios';

const SentenceWrite = () => {
  //선택된 단어 디자인 바꾸기
  let [selected, setSelected] = useState([]); //선택된 상태 저장
  let [selCopy, setSelCopy] = useState([]); // 몇개의 상태가 필요한지 false배열로 카피
  const changeWordDesign = (idx) => {
    console.log(selected);
    if (selected[idx] === false) {
      let copy = [...selected];
      copy[idx] = true;
      setSelected(copy);
    }
  };
  // 문장들은 db에서 가져오기
  const [korSentence, setKorSentence] = useState('');
  const [engSentence, setEngSentence] = useState([]);
  const [engSentenceAns, setEngSentenceAns] = useState([]);
  //한글 문장이 바뀌면 영어 문장 찢어둔거 가져오기
  useEffect(() => {
    axios
      .get('/api/sentences')
      .then((res) => {
        let sentences = res.data;
        if (!sentences) {
          console.log('데이터 없음');
        }
        setKorSentence(sentences.kor);
        setEngSentence(sentences.eng);
        setEngSentenceAns(sentences.engAnswer);
        //selected에도 넣기 => 각각 선택된 상태를 저장하기위해
        let falseArr = sentences.eng.map((elm) => {
          return (elm = false);
        });
        setSelected(falseArr);
        setSelCopy(falseArr);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //선택한 영어단어 화면에 순서대로 표시하기
  let [word, setWord] = useState([]);
  let [tureWords, setTrueWords] = useState(0); //0은 평시, 1은 맞았을 때, 2는 틀렸을 때
  const writeWord = (elm) => {
    let wordCopy = [...word];
    //이미 같은 요소있는지 확인
    const sameWord = wordCopy.indexOf(elm);
    if (sameWord !== -1) {
      return;
    }
    wordCopy.push(elm);
    setWord(wordCopy);
    //4번째 값이 있을 때
    if (wordCopy[3]) {
      //정답과 같으면 trueWords의 상태 1로 변경
      if (JSON.stringify(wordCopy) === JSON.stringify(engSentenceAns)) {
        setTrueWords(1);
      } else {
        //정답과 다르면 trueWords의 상태 2로 변경
        setTrueWords(2);
      }
    }
  };
  //흔드는 애니메이션 상태
  let [vibeState, setVibeState] = useState(false);
  //단어 배열 상태에 따라 정답처리 및 오답처리
  useEffect(() => {
    if (tureWords === 0) {
      return;
    } else if (tureWords === 1) {
      //성공 페이지 띄우고 다음으로 넘기기
    } else if (tureWords === 2) {
      //다시 하게끔
      setVibeState(true); //바이브레이션 주고
      setTimeout(() => {
        setVibeState(false);
        setWord([]);
        //아까 복사해둔 false배열 사용
        setSelected(selCopy);
        setTrueWords(0);
      }, 500); //0.5초 뒤 해제
    }
  }, [tureWords]);

  //삭제버튼 눌렀을 때
  const deleteWords = () => {
    setSelected(selCopy);
    setTrueWords(0);
    setWord([]);
  };

  return (
    <div className='write-background'>
      <div className='question-background'>
        <div className='question-homeButton'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='3.5vh'
            height='3.5vh'
            viewBox='0 0 24 24'
            fill='none'
          >
            <path
              d='M20 8.00001L14 2.74001C13.45 2.24805 12.7379 1.97607 12 1.97607C11.2621 1.97607 10.55 2.24805 10 2.74001L4 8.00001C3.68237 8.28408 3.4289 8.63256 3.25647 9.02225C3.08404 9.41194 2.99661 9.83389 3 10.26V19C3 19.7957 3.31607 20.5587 3.87868 21.1213C4.44129 21.6839 5.20435 22 6 22H18C18.7956 22 19.5587 21.6839 20.1213 21.1213C20.6839 20.5587 21 19.7957 21 19V10.25C21.002 9.82557 20.9138 9.40555 20.7415 9.01769C20.5691 8.62983 20.3164 8.28296 20 8.00001ZM14 20H10V15C10 14.7348 10.1054 14.4804 10.2929 14.2929C10.4804 14.1054 10.7348 14 11 14H13C13.2652 14 13.5196 14.1054 13.7071 14.2929C13.8946 14.4804 14 14.7348 14 15V20ZM19 19C19 19.2652 18.8946 19.5196 18.7071 19.7071C18.5196 19.8946 18.2652 20 18 20H16V15C16 14.2044 15.6839 13.4413 15.1213 12.8787C14.5587 12.3161 13.7956 12 13 12H11C10.2043 12 9.44129 12.3161 8.87868 12.8787C8.31607 13.4413 8 14.2044 8 15V20H6C5.73478 20 5.48043 19.8946 5.29289 19.7071C5.10536 19.5196 5 19.2652 5 19V10.25C5.00018 10.108 5.03059 9.9677 5.08922 9.83839C5.14784 9.70907 5.23333 9.59372 5.34 9.50001L11.34 4.25001C11.5225 4.08969 11.7571 4.00127 12 4.00127C12.2429 4.00127 12.4775 4.08969 12.66 4.25001L18.66 9.50001C18.7667 9.59372 18.8522 9.70907 18.9108 9.83839C18.9694 9.9677 18.9998 10.108 19 10.25V19Z'
              fill='rgb(75,75,75)'
            />
          </svg>
        </div>
        <div className='question-arrowButtons'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='28'
            height='28'
            viewBox='0 0 16 16'
            fill='none'
            className='leftArrow'
          >
            <path
              d='M15 8L2.5 8'
              stroke='rgb(97, 97, 97)'
              strokeWidth='2'
              strokeLinecap='round'
            />
            <path
              d='M8 1.5L1.78284 7.71716C1.62663 7.87337 1.62663 8.12663 1.78284 8.28284L8 14.5'
              stroke='rgb(97, 97, 97)'
              strokeWidth='2'
              strokeLinecap='round'
            />
          </svg>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='28'
            height='28'
            viewBox='0 0 16 16'
            fill='none'
            className='rightArrow'
          >
            <path
              d='M1.5 8L14 8'
              stroke='rgb(97, 97, 97)'
              strokeWidth='2'
              strokeLinecap='round'
            />
            <path
              d='M8.5 1.5L14.7172 7.71716C14.8734 7.87337 14.8734 8.12663 14.7172 8.28284L8.5 14.5'
              stroke='rgb(97, 97, 97)'
              strokeWidth='2'
              strokeLinecap='round'
            />
          </svg>
        </div>
        <div className='question-sentence'>
          <span className='question-sentenceKor'>
            {korSentence ? korSentence : null}
          </span>
        </div>

        <div className='answer-sentence'>
          <div className='delBtn' style={{ visibility: 'hidden' }}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
            >
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM8.29289 8.29289C8.68342 7.90237 9.31658 7.90237 9.70711 8.29289L12 10.5858L14.2929 8.29289C14.6834 7.90237 15.3166 7.90237 15.7071 8.29289C16.0976 8.68342 16.0976 9.31658 15.7071 9.70711L13.4142 12L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L12 13.4142L9.70711 15.7071C9.31658 16.0976 8.68342 16.0976 8.29289 15.7071C7.90237 15.3166 7.90237 14.6834 8.29289 14.2929L10.5858 12L8.29289 9.70711C7.90237 9.31658 7.90237 8.68342 8.29289 8.29289Z'
                fill='rgb(52, 52, 70)'
              />
            </svg>
          </div>
          {engSentence
            ? engSentence.map((elm, idx) => {
                return (
                  <div
                    key={idx}
                    className={`answer-sentenceWord ${
                      vibeState ? 'vibration' : ''
                    }`}
                  >
                    {word[idx]}
                  </div>
                );
              })
            : null}
          <div className='delBtn' onClick={deleteWords}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
            >
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM8.29289 8.29289C8.68342 7.90237 9.31658 7.90237 9.70711 8.29289L12 10.5858L14.2929 8.29289C14.6834 7.90237 15.3166 7.90237 15.7071 8.29289C16.0976 8.68342 16.0976 9.31658 15.7071 9.70711L13.4142 12L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L12 13.4142L9.70711 15.7071C9.31658 16.0976 8.68342 16.0976 8.29289 15.7071C7.90237 15.3166 7.90237 14.6834 8.29289 14.2929L10.5858 12L8.29289 9.70711C7.90237 9.31658 7.90237 8.68342 8.29289 8.29289Z'
                fill='rgb(52, 52, 70)'
              />
            </svg>
          </div>
        </div>
        <div className='choice-sentence'>
          {engSentence
            ? engSentence.map((elm, idx) => {
                return (
                  <div
                    key={idx}
                    className={`choice-sentenceWord ${
                      selected[idx] ? 'active' : ''
                    }`}
                    onClick={() => {
                      changeWordDesign(idx);
                      writeWord(elm);
                    }}
                  >
                    {elm}
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
};

export default SentenceWrite;
