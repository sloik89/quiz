import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
const tempUrl =
  "https://opentdb.com/api.php?amount=10&category=11&difficulty=easy&type=multiple";

const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  const [waiting, setWaiting] = useState(true);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [error, setError] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleNextQuestion = () => {
    setIndex((oldIndex) => {
      const index = oldIndex + 1;
      if (index > questions.length - 1) {
        return 0;
      }
      return index;
    });
  };
  const checkAnswer = (value) => {
    console.log(value);
    setCorrect((oldCorrect) => {
      if (value) {
        return oldCorrect + 1;
      }
      return oldCorrect;
    });
    handleNextQuestion();
  };
  const fetchQuestions = async (url) => {
    setLoading(true);
    setWaiting(false);
    const response = await axios(url).catch((err) => console.log(err));
    if (response) {
      const data = response.data.results;
      if (data.length > 0) {
        setQuestions(data);
        setLoading(false);
        setWaiting(false);
        setError(false);
      } else {
        setWaiting(true);
        setError(true);
      }
    }
    console.log(response);
  };
  useEffect(() => {
    fetchQuestions(tempUrl);
  }, []);
  return (
    <AppContext.Provider
      value={{
        waiting,
        loading,
        questions,
        index,
        correct,
        handleNextQuestion,
        checkAnswer,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
export { AppContext, AppProvider };
