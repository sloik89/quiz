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
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: "sports",
    difficulty: "easy",
  });
  const handleNextQuestion = () => {
    setIndex((oldIndex) => {
      const index = oldIndex + 1;
      if (index > questions.length - 1) {
        openModal();
        return 0;
      }
      return index;
    });
  };
  const checkAnswer = (value) => {
    if (value) {
      setCorrect((oldState) => oldState + 1);
    }
    handleNextQuestion();
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setCorrect(0);
    setWaiting(true);
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
  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuiz({ ...quiz, [name]: value });
    console.log(name, value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
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
        closeModal,
        isModalOpen,
        handleChange,
        handleSubmit,
        quiz,
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
