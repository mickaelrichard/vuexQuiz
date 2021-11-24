import { createStore } from "vuex";
const tempUrl =
  "https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple";
const API_ENDPOINT = "https://opentdb.com/api.php?";
const url = "";
const table = {
  sports: 21,
  history: 23,
  politics: 24,
};
import axios from "axios";

export default createStore({
  state: {
    isModalOpen: false,
    tempUrl:
      "https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple",
    API_ENDPOINT: "https://opentdb.com/api.php?",
    waiting: true,
    loading: false,
    questions: [],
    index: 0,
    correct: 0,
    error: false,
    quiz: {
      amount: 10,
      category: "easy",
      difficulty: "easy",
    },
  },
  mutations: {
    closeModal(state) {
      state.waiting = true;
      state.correct = 0;
      state.isModalOpen = false;
    },
    openModal(state) {
      state.isModalOpen = true;
    },
    setQuestions(state, data) {
      state.questions = data;
    },
    setLoading(state, bool) {
      state.loading = bool;
    },
    setWaiting(state, bool) {
      state.waiting = bool;
    },
    setError(state, bool) {
      state.error = bool;
    },
    goodAnswer(state) {
      state.correct = state.correct + 1;
    },
    nextQuestion(state) {
      state.index = state.index + 1;
      console.log(state.index, state.questions.length - 1);
      if (state.index > state.questions.length - 1) {
        state.isModalOpen = true;
        state.index = 0;
      }
    },
  },
  actions: {
    async fetchQuestions({ commit, state }, url) {
      const response = await axios(url).catch((err) => console.log(err));
      if (response) {
        const data = response.data.results;
        if (data.length > 0) {
          console.log(data);
          commit("setQuestions", data);
          console.log("questions", state.questions);
          commit("setWaiting", false);
          commit("setError", false);
        } else {
          commit("setWaiting", true);
          commit("setError", true);
        }
      } else {
        commit("setWaiting", true);
      }
    },
  },

  getters: {
    question(state) {
      const { question, incorrect_answers, correct_answer } =
        state.questions[state.index];
      let answers = [...incorrect_answers];
      const tempIndex = Math.floor(Math.random() * 4);
      if (tempIndex === 3) {
        answers.push(correct_answer);
      } else {
        answers.push(answers[tempIndex]);
        answers[tempIndex] = correct_answer;
      }
      return { question, correct_answer, answers };
    },
  },
});
