<template>
  <div>
      {{opportunityId}}
      <br>
      {{skills}}
      <br>
      {{candidateId1}}
      <br>
      {{candidateId2}}
  </div>
</template>

<script>
import {Global} from '../Config'
export default {
  name: "CompareSkills",
  mounted() {
    this.$root.$on(Global.Events.opportunityChange, (id, skills) => {
      this.opportunityId = id;
      this.skills = skills;
    });
    this.$root.$on(Global.Events.candidateChange, (candidateNumber, candidateId) => {
        if(candidateNumber == '1'){
            this.candidateId1 = candidateId
        }else{
            this.candidateId2 = candidateId
        }
    });
  },
  data: () => ({
    opportunityId: null,
    skills: null,
    candidateId1: null,
    candidateId2: null,
  }),
  methods: {
      compareSkills: function(){
          if (this.opportunityId != null && this.skills != null){
              console.log("OK")
          }
      }
  },
};
</script>
