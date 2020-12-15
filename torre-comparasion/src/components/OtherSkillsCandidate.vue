<template>
  <v-card v-if="showInfo" dark>
    <v-card-title :class="cardClass">
      Candidate Skills+
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-alert
        dense
        icon="mdi-briefcase-outline"
        type="success"
        v-for="item in infoUser.strengths"
        :key="item.name"
      >
        {{ item.name }}
      </v-alert>
      <v-alert
        dense
        type="info"
        v-for="item in infoUser.interests"
        :key="item.name"
        icon="mdi-school-outline"
      >
        {{ item.name }}
      </v-alert>
    </v-card-text>
  </v-card>
</template>

<script>
import { Global } from "../Config";
export default {
  name: "OtherSkillsCandidate",
  props: {
    showInfo: {
      type: Boolean,
      default: false,
    },
    skills: {
      type: Array,
      default: null,
    },
    candidateColor: {
      type: String,
    },
    candidateNumber: {
      type: String,
    },
  },
  data: () => ({
    strenghts: null,
    interests: null,
    infoUser: null,
  }),
  created() {
    this.cardClass = "headline " + this.candidateColor;
    this.$root.$on(
      Global.Events.candidateInfo + this.candidateNumber,
      (result) => {
        this.infoUser = result;
        this.checkSkills();
      }
    );
  },
  watch: {
    skills: function() {
      if (this.skills != null && this.skills.length > 0) {
        this.checkSkills();
      }
    },
    showInfo: function() {},
  },
  methods: {
    checkSkills: function() {
      if (
        this.skills != null &&
        this.skills.length > 0 &&
        this.infoUser != null
      ) {
        this.strenghts = this.infoUser.strengths.map(function(s) {
          return s.name;
        });
        this.interests = this.infoUser.interests.map(function(s) {
          return s.name;
        });
      }
    },
  },
};
</script>
