import './App.css';
import { useState, useEffect } from 'react';
import StartGame from './Component/StartGame';
import PlayAgain from './Component/PlayAgain';
import PlayNumber from './Component/PLayNumber';
import StarsDisplay from './Component/StarsDisplay';
import utils from "./Component/MatchScine";

function App() {
  const [gameId, setGameId] = useState(1);
  const [start, setStart] = useState(false);
  const title = "Game star";
  const toggleItem = () => {
      setStart(true);
  };

  return (
    <div>
      {start === true ? <Game key={ gameId } startNewGame={() => setGameId(gameId + 1)} exit = {() => setStart(false) }/> 
                      : <StartGame startMatchGame={ toggleItem } title={ title } />}
    </div>
  );
}

//custom hook
const useGameStar = () => {
    //số sao
  const [stars, setStars] = useState(utils.random(1, 9));
  //dãy số chưa chọn
  const [availableNums, setAvailableNums] = useState(utils.range(1, 9));
  //mảng 2 số được chọn
  const [candidateNums, setCandicateNums] = useState([]);
  //play again
  const [secondTime, setSecondTime] = useState(10);
  //Dếm ngược thời gian sử dụng effect hooks
  useEffect(() => {
    if(secondTime > 0 && availableNums.length > 0){
      const timerId = setTimeout(() => {
        setSecondTime(secondTime - 1);
      }, 1000);

      return () => clearTimeout(timerId);
    }
  });
    //setup lại mảng chưa chọn và đã chọn
    const setGameStar = (newCandidateNums) => {
      if(utils.sum(newCandidateNums) !== stars){
        setCandicateNums(newCandidateNums);
      }
      else{
          //setup lại mảng chưa chọn
          const newAvailableNums = availableNums.filter(
                n => !newCandidateNums.includes(n));
          setAvailableNums(newAvailableNums);
          //setup lại số sao(random)
          setStars(utils.randomSumIn(newAvailableNums, 9));
          //setup lại mảng đã chọn
          setCandicateNums([]);
      }
    };

    return { stars, availableNums, candidateNums, secondTime, setGameStar };
};

//custom hook
const Game = (props) => {
  const {
    stars,
    availableNums,
    candidateNums, 
    secondTime, 
    setGameStar
  } = useGameStar();
//người chơi chọn giá trị đúng hay sai trả về bool
  const candidateAreWrong = utils.sum(candidateNums) > stars;
  const gameStatus = availableNums.length === 0 
        ? 'won' : 
        secondTime === 0 ? 'lost' : 'active';

  //kiểm tra giá trị số đã chọn
  //num số nút
  const numberStatus = number => {
      //kiểm tra trong dãy số chưa chọn đã tồn tại số chọn chưa
      if(!availableNums.includes(number)){
        //so da choi
        return 'used';
      }
      //kiểm tra số chọn có trong dãy số đã chọn
      if(candidateNums.includes(number)){
        //kiểm tra tổng số đã chọn/ true => sai(đổ) | false => cần chọn thêm giá trị để đúng với số sao
        return candidateAreWrong ? 'wrong' : 'candidate';
      }
      //chưa chọn
      return 'available';
  };

  //number: props.number | currentStatus: props.status
  const onNumberClick = (number, currentStatus) => {
      if(currentStatus === 'used' || gameStatus !== 'active'){
        return;
      }

      const newCandidateNums = 
            //kiểm tra status nếu màu xám chưa chọn true => mảng số đã chọn thêm giá trị nút đó
            //false => 
            currentStatus === 'available' ? 
                candidateNums.concat(number) : candidateNums.filter(cn =>  cn !== number);//loại bỏ số đã chọn
      
      setGameStar(newCandidateNums);
  };

  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className="body">
        <div className="left">
            { gameStatus !== 'active' 
            ? ( <PlayAgain onClick = { props.startNewGame } gameStatus = { gameStatus } exit= { props.exit } /> ) 
            : ( <StarsDisplay count ={ stars } /> )}
        </div>
        <div className="right">
          { utils.range(1, 9).map(node => 
              <PlayNumber 
                status = { numberStatus(node) }
                onClick = { onNumberClick }
                key={node} 
                number={node} />
          )}
        </div>
      </div>
      <div className="timer">Time Remaining: {secondTime}</div>
    </div>
  );
};



export default App;
