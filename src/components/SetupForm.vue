<template>
  <main>
    <section class="quiz quiz-small">
      <form class="setup-form">
        <h2>setup quiz</h2>
        <div class="form-control">
          <label htmlFor="amount">number of questions</label>
          <input
            v-model="quiz.amount"
            type="number"
            name="amount"
            id="amount"
            class="form-input"
            min="{{1}}"
            max="{{50}}"
          />
        </div>

        <div class="form-control">
          <label htmlFor="category">category</label>
          <select
            name="category"
            id="category"
            class="form-input"
            v-model="quiz.category"
          >
            <option value="sports">sports</option>
            <option value="history">history</option>
            <option value="politics">politics</option>
          </select>
        </div>

        <div class="form-control">
          <label htmlFor="difficulty">select difficulty</label>
          <select
            name="difficulty"
            id="difficulty"
            class="form-input"
            v-model="quiz.difficulty"
          >
            <option value="easy">easy</option>
            <option value="medium">medium</option>
            <option value="hard">hard</option>
          </select>
        </div>

        <p v-show="error" class="error">
          can't generate questions, please try different options
        </p>

        <button type="submit" @click.prevent="handleSubmit" class="submit-btn">
          start
        </button>
      </form>
    </section>
  </main>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
import axios from "axios";
export default {
  name: "SetupForm",
  components: {},
  data() {
    return {
      table: {
        sports: 21,
        history: 23,
        politics: 24,
      },
    };
  },
  computed: {
    ...mapState(["error", "quiz", "API_ENPOINT", "loading", "waiting"]),
  },
  methods: {
    ...mapMutations(["handleSubmit"]),
    ...mapActions(["fetchQuestions"]),

    async handleSubmit() {
      const { amount, category, difficulty } = this.quiz;
      console.log(amount, category, difficulty);
      const url = `https://opentdb.com/api.php?amount=${amount}&category=${this.table[category]}&difficulty=${difficulty}&type=multiple`;
      this.fetchQuestions(url);
      console.log("loading:", this.loading, this.waiting);
    },
  },
};
</script>
