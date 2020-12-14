<template>
  <div>
    <CompareSkills />
    <v-divider />
  </div>
</template>

<script>
import CompareSkills from "./CompareSkills";
import { Global } from "../Config";
export default {
  name: "CompareAll",
  components: {
    CompareSkills,
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
        console.log(info)
      this.$root.$emit(Global.Events.candidateInfo + candidateNumber, info);
    },
  },
};
</script>
