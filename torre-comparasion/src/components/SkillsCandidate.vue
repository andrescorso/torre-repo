<template>
  <v-card v-if="showInfo" dark>
    <v-card-title :class="cardClass">
      Candidate Skills
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-alert
        dense
        icon="mdi-briefcase-outline"
        type="success"
        v-for="item in satisfy"
        :key="item.name"
      >
        {{ item.name }}
      </v-alert>
      <v-alert
        dense
        type="success"
        v-for="item in exceeds"
        :key="item.name"
        icon="mdi-briefcase"
      >
        {{ item.name }}
      </v-alert>
      <v-alert
        dense
        type="info"
        v-for="item in learning"
        :key="item.name"
        icon="mdi-school-outline"
      >
        {{ item.name }}
      </v-alert>
      <v-alert
        dense
        type="warning"
        v-for="item in partial"
        :key="item.name"
        icon="mdi-school-outline"
      >
        {{ item.name }}
      </v-alert>
      <v-alert dense type="error" v-for="item in fails" :key="item.name">
        {{ item.name }}
      </v-alert>
    </v-card-text>
  </v-card>
</template>

<script>
import { Global } from "../Config";
export default {
  name: "SkillsCandidate",
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
    experience: null,
    develop: null,
    satisfy: null,
    exceeds: null,
    learning: null,
    partial: null,
    fails: null,
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
        this.experience = this.skills.filter(function(e) {
          return e.experience != "potential-to-develop";
        });
        this.develop = this.skills.filter(function(e) {
          return e.experience == "potential-to-develop";
        });
        let strenghts = this.infoUser.strengths.map(function(s) {
          return s.name;
        });
        let interests = this.infoUser.interests.map(function(s) {
          return s.name;
        });
        if (strenghts.length > 0) {
          // Skill with experience that match with candidate strenghts
          this.satisfy = this.experience.filter(function(e) {
            return strenghts.includes(e.name);
          });
          // Skill without experience that match with candidate strenghts
          this.exceeds = this.develop.filter(function(e) {
            return strenghts.includes(e.name);
          });
        } else {
          this.satisfy = null;
          this.exceeds = null;
          strenghts = [];
        }

        if (interests.length > 0) {
          // Skill with experience that match with candidate interests
          this.partial = this.experience.filter(function(e) {
            return interests.includes(e.name);
          });
          // Skill without experience that match with candidate interests
          this.learning = this.develop.filter(function(e) {
            return interests.includes(e.name);
          });
        } else {
          this.partial = null;
          this.learning = null;
          interests = [];
        }
        // No match
        this.fails = this.skills.filter(function(e) {
          return !interests.includes(e.name) && !strenghts.includes(e.name);
        });
      }
    },
  },
};
</script>
