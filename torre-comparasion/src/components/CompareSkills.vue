<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4">
        <SkillsOpportunity :showInfo="showInfo" :skills="skills" />
      </v-col>
      <v-col cols="12" md="4">
        <SkillsCandidate
          :showInfo="showInfo"
          :skills="skills"
          candidateNumber="1"
          :candidateColor="candidateColor1"
        />
      </v-col>
      <v-col cols="12" md="4">
        <SkillsCandidate
          :showInfo="showInfo"
          :skills="skills"
          candidateNumber="2"
          :candidateColor="candidateColor2"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { Global } from "../Config";
import SkillsOpportunity from "./SkillsOpportunity";
import SkillsCandidate from "./SkillsCandidate";

export default {
  name: "CompareSkills",
  components: {
    SkillsOpportunity,
    SkillsCandidate,
  },
  mounted() {
    this.$root.$on(Global.Events.opportunityChange, (id, info) => {
      if (info != null) {
        this.skills = info;
        this.opportunityId = id;
        this.compareSkills();
      }
    });
    this.$root.$on(Global.Events.candidateInfo + "1", (result) => {
      if (result == null) {
        this.infoReady1 = false;
      } else {
        this.infoReady1 = true;
      }
      this.compareSkills();
    });
    this.$root.$on(Global.Events.candidateInfo + "2", (result) => {
      if (result == null) {
        this.infoReady2 = false;
      } else {
        this.infoReady2 = true;
      }
      this.compareSkills();
    });
  },
  data: () => ({
    showInfo: false,
    opportunityId: "",
    skills: [],
    candidateColor1: Global.Colors.Candidate1Card,
    candidateColor2: Global.Colors.Candidate2Card,
    infoReady1: false,
    infoReady2: false,
  }),
  methods: {
    compareSkills: function() {
      if (this.opportunityId != "" && this.infoReady1 && this.infoReady2) {
        this.showInfo = true;
      } else {
        this.showInfo = false;
      }
    },
  },
};
</script>
