<template>
  <SetupForm v-if="waiting" />
  <Loading v-else-if="loading" />
  <main v-else>
    <Modal />
    <section class="quiz">
      <p class="correct-answers">correct answers : {{ correct }}/{{ index }}</p>
      <article class="container">
        <h2>
          {{ question.question }}
        </h2>
        <div class="btn-container">
          <button
            v-for="(answer, index) in question.answers"
            :key="index"
            class="answer-btn"
            @click="checkAnswer(question.correct_answer === answer)"
          >
            {{ answer }}
          </button>
        </div>
      </article>
      <button class="next-question" @click="nextQuestion">next question</button>
    </section>
  </main>
</template>

<script>
import Modal from "./components/Modal";
import Loading from "./components/Loading";
import SetupForm from "./components/SetupForm";
import { mapState, mapMutations, mapGetters } from "vuex";
import "./assets/style.css";
import axios from "axios";
export default {
  name: "App",
  components: {
    Loading,
    Modal,
    SetupForm,
  },
  data() {
    return {};
  },

  computed: {
    ...mapState([
      "waiting",
      "loading",
      "tempUrl",
      "questions",
      "correct",
      "index",
      "question",
      "answers",
    ]),
    ...mapGetters(["question"]),
  },
  methods: {
    ...mapMutations(["nextQuestion", "goodAnswer"]),
    checkAnswer(value) {
      if (value) {
        this.goodAnswer();
      }
      this.nextQuestion();
    },
  },
  mounted() {
    console.log("loading:", this.loading, this.waiting);
  },
};
</script>

<style></style>
