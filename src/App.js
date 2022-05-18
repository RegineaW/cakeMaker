import "./styles.css";
import { useState, useEffect } from "react";
import data from "./data-file.json";

function Question(props) {
  return <div>{props.question}</div>;
}

function Answers(props) {
  // const [resultCake, setResultCake] = useState([]);
  function handleNextQuestion(index) {
    // console.log(resultCake);
    // let newArr = resultCake.concat(index);
    // setResultCake(newArr);
    // console.log(resultCake);
    props.setCurrentQuestion(props.currentQuestion + 1);
  }
  return props.answers.map(function (pic, index) {
    return (
      <button>
        <img src={pic} alt="cake" onClick={handleNextQuestion} />
      </button>
    );
  });
}

function ResultPage(props) {
  return <div> final cake </div>;
}

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (currentQuestion + 1 > data.length) {
      // console.log(currentQuestion);
      // console.log(data.length);
      setGameOver(true);
    }
  }, [currentQuestion]);

  return (
    <div className="App">
      {!gameOver ? (
        <div>
          <h1>Welcome To Cake Maker</h1>
          <Question question={data[currentQuestion].question.text} />
          <Answers
            answers={data[currentQuestion].question.choices}
            currentQuestion={currentQuestion}
            setCurrentQuestion={setCurrentQuestion}
          />
        </div>
      ) : (
        <div>
          <ResultPage />
        </div>
      )}
    </div>
  );
}
