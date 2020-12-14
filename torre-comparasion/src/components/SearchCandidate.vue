<template>
  <v-card dark>
    <v-card-title :class="candidateClass">
      Search for Candidate
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-text-field
        v-model="candidate"
        :loading="isLoading"
        :label="candidateLabel"
        placeholder="Search a candidate for you offer"
        clearable
        outlined
      ></v-text-field>
      <v-autocomplete
        v-if="searchFinish"
        v-model="candidates"
        label="Candidates"
        placeholder="Select the correct candidate"
        :items="items"
        item-value="id"
        item-text="Description"
        outlined
      >
        <template v-slot:selection="data">
          <v-chip
            v-bind="data.attrs"
            :input-value="data.selected"
            close
            @click="data.select"
            @click:close="remove(data.item)"
            :color="candidateColor"
          >
            <v-avatar left>
              <v-img :src="data.item.userImage"></v-img>
            </v-avatar>
            {{ data.item.Description }}
          </v-chip>
        </template>
        <template v-slot:item="data">
          <v-list-item-avatar>
            <v-img :src="data.item.userImage"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-html="data.item.Description">
            </v-list-item-title>
          </v-list-item-content>
        </template>
      </v-autocomplete>
    </v-card-text>
  </v-card>
</template>

<script>
import { Global } from "../Config";
import _ from "lodash";
export default {
  name: "SearchCandidate",
  props: {
    candidateNumber: {
      type: String,
    },
    candidateColor: {
      type: String,
    },
  },
  created() {
    this.debouncedGetCandidate = _.debounce(this.getCandidates, 800);
    this.candidateLabel = "Candidate " + this.candidateNumber;
    this.candidateClass = "headline " + this.candidateColor;
  },
  mounted() {},
  data: () => ({
    descriptionLimit: 60,
    candidateLabel: null,
    entries: [],
    isLoading: false,
    candidate: null,
    candidates: null,
    organization: null,
    searchFinish: false,
    skills: [],
  }),
  computed: {
    items() {
      return this.entries.map((entry) => {
        const Description =
          entry.name.length > this.descriptionLimit
            ? entry.name.slice(0, this.descriptionLimit) + "..."
            : entry.name;

        const id = entry.username;
        const userImage = entry.picture;

        return Object.assign({}, entry, { Description, id, userImage });
      });
    },
  },
  watch: {
    candidate: function(val) {
      this.candidateName = val;
      if (this.candidateName != null) {
        this.isLoading = true;
      } else {
        this.searchFinish = false;
      }
      this.debouncedGetCandidate();
    },
    candidates: function(val) {
      this.$root.$emit(Global.Events.candidateChange, this.candidateNumber, val)
    },
  },
  methods: {
    getCandidates: function() {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: { term: this.candidateName } }),
      };
      this.candidates = ""
      if (this.candidateName != null) {
        // Lazily load input items
        fetch(Global.API.searchUsersAPI, requestOptions)
          .then((res) => res.json())
          .then((res) => {
            this.results = JSON.parse(JSON.stringify(res));
            this.entries = res.results;
            this.count = res.size;
            this.isLoading = false;
            this.searchFinish = true;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    remove() {
      this.candidates=""
    },
  },
};
</script>
