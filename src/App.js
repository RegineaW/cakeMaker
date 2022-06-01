import "./styles.css";
import { useState, useEffect } from "react";
import data from "./data-file.json";
import _ from "lodash";
import cakes from "./cakes.json";

function Question(props) {
  return <p>{props.question}</p>;
}

function Answers(props) {
  function handleNextQuestion(e) {
    // Adding each index (e.target.id) to the result cake array
    props.setResultCake((currentResultCake) => {
      let newArr = [...currentResultCake, parseInt(e.target.id, 10)];
      return newArr;
    });

    props.setCurrentQuestion((currentQuestion) => currentQuestion + 1);
  }
  return props.answers.map(function (pic, index) {
    return (
      <button key={index} className="cakeButtons">
        <img
          id={index}
          src={pic}
          alt="cake"
          onClick={(e) => handleNextQuestion(e)}
        />
      </button>
    );
  });
}

function ResultPage(props) {
  const [finalCake, setFinalCake] = useState("");
  // 1. Iterate over cakes array
  // 2. Compare if current cake choices arr == resultCake
  useEffect(() => {
    for (let i = 0; i < cakes.length; i++) {
      if (_.isEqual(props.resultCake, cakes[i].choices)) {
        // 3. If equal, add image url to a state var
        setFinalCake(cakes[i].image);
      }
    }
  }, [props.resultCake, props.finalCake]);

  function handleStartOver() {
    props.setCurrentQuestion(0);
    props.setResultCake([]);
  }

  // 4. Print image url src as the state var
  return (
    <div>
      <h1>
        <span role="img" aria-label="finalCake">
          🎉 Final Cake 🎉
        </span>
      </h1>
      <img src={finalCake} alt="finalCake" />
      <br />
      <button className="startOver" onClick={handleStartOver}>
        Start Over
      </button>
    </div>
  );
}

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [resultCake, setResultCake] = useState([]);
  return (
    <div className="App">
      {currentQuestion < data.length ? (
        <div>
          <h1>
            <span role="img" aria-label="cake">
              🎂 Welcome To Cake Maker 🎂
            </span>
          </h1>
          <Question question={data[currentQuestion].question.text} />
          <Answers
            answers={data[currentQuestion].question.choices}
            setCurrentQuestion={setCurrentQuestion}
            setResultCake={setResultCake}
          />
        </div>
      ) : (
        <div>
          <ResultPage
            resultCake={resultCake}
            setResultCake={setResultCake}
            setCurrentQuestion={setCurrentQuestion}
          />
        </div>
      )}
    </div>
  );
}
