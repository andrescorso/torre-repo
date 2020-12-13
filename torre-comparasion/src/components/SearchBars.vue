<template>
    <v-container>
        <v-row>
            <v-col cols="1" md="1" />
            <v-col cols="10">
                <OpportunitySearch cols="6" md="12"/>
            </v-col>
            <v-col cols="1" md="1" />
        </v-row>
    </v-container>
</template>

<script>
import OpportunitySearch from "./OpportunitySearch"
export default {
    name: "SearchBars",
    components: {
        OpportunitySearch
    }
}
</script>