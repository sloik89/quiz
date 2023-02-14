import React from "react";
import { useGlobalContext } from "./context";
import SetupForm from "./SetupForm";
import Loading from "./Loading";
import Modal from "./Modal";
function App() {
  const {
    index,
    correct,
    loading,
    waiting,
    questions,
    handleNextQuestion,
    checkAnswer,
  } = useGlobalContext();
  if (waiting) {
    return <SetupForm />;
  }
  if (loading) {
    return <Loading />;
  }
  const { question, incorrect_answers, correct_answer } = questions[index];
  const answers = [...incorrect_answers, correct_answer];
  return (
    <main className="App">
      <Modal />
      <section className="quiz">
        <p className="correct-answers">
          correct answers:{correct}/{index}
        </p>
        <article className="container">
          <h2 dangerouslySetInnerHTML={{ __html: question }} />
          <div className="btn-container">
            {answers.map((answer, idx) => {
              return (
                <button
                  key={idx}
                  className="answer-btn"
                  dangerouslySetInnerHTML={{ __html: answer }}
                  onClick={() => checkAnswer(answer === correct_answer)}
                />
              );
            })}
          </div>
        </article>
        <button onClick={handleNextQuestion} className="next-question">
          next question
        </button>
      </section>
    </main>
  );
}

export default App;
