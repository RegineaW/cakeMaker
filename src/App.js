import "./styles.css";
import data from "./data-file.json";

function Question(props) {
  return <div>{props.question}</div>;
}

function Answers(props) {
  return props.answers.map(function (pic) {
    return <img src={pic} />;
  });
}

function NextQuestion(props) {
  return <button>Next Question</button>;
}

export default function App() {
  let currentQuestion = 0;
  return (
    <div className="App">
      <h1>Welcome To Cake Maker</h1>
      <Question question={data[currentQuestion].question.text} />
      <Answers answers={data[currentQuestion].question.choices} />
      <NextQuestion />
    </div>
  );
}
