<template>
  <div>
    <CompareSkills />
    <v-divider />
    <CompareOtherSkills />
  </div>
</template>

<script>
import CompareSkills from "./CompareSkills";
import CompareOtherSkills from "./CompareOtherSkills";
import { Global } from "../Config";
export default {
  name: "CompareAll",
  components: {
    CompareSkills,
    CompareOtherSkills
  },
  mounted() {
    this.$root.$on(
      Global.Events.candidateChange,
      (candidateNumber, candidateId) => {
        if (candidateId != "") {
          const requestOptions = {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          };
          fetch(Global.API.user + candidateId, requestOptions)
            .then((res) => res.json())
            .then((res) => {
              this.emitInfo(candidateNumber, res);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          this.$root.$emit(Global.Events.candidateInfo + candidateNumber, null);
        }
      }
    );
  },
  methods: {
    emitInfo: function(candidateNumber, info) {
      this.$root.$emit(Global.Events.candidateInfo + candidateNumber, info);
    },
  },
};
</script>
