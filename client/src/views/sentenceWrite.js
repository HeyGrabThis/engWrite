import { useEffect, useState } from 'react';
import axios from 'axios';

const SentenceWrite = () => {
  //선택된 단어 디자인 바꾸기
  let [selected, setSelected] = useState([]);
  const changeWordDesign = (idx) => {
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
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
          {engSentence
            ? engSentence.map((elm, idx) => {
                return <div key={idx} className='answer-sentenceWord'></div>;
              })
            : null}
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
