<template>
  <div :class="[isModalOpen ? 'modal-container isOpen' : 'modal-container']">
    <div class="modal-content">
      <h2>congrats!</h2>
      <p>
        You answered {{ ((correct / questions.length) * 100).toFixed(0) }}% of
        questions correctly
      </p>
      <button class="close-btn" @click="closeModal">play again</button>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "Modal",
  data() {
    return {};
  },
  methods: {
    ...mapMutations(["closeModal"]),
  },
  computed: {
    ...mapState(["isModalOpen", , "correct", "questions"]),
  },
  mounted() {
    console.log(this.isModalOpen);
  },
};
</script>
