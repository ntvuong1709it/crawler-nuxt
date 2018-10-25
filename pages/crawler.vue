<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-textarea
          solo
          label="A list of url that you want to crawl. Eg: https://www.google.com/, https://github.com/, ..."
          auto-grow
          autofocus
          clearable
          v-model="extractUrls"
      ></v-textarea>
      <v-btn large @click="startCrawl">Start</v-btn>
    </v-layout>
  </v-container>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
import * as API from '~/service/rest.service'

export default {
  components: {
    Logo,
    VuetifyLogo
  },
  data() {
    return {
      db: {},
      crawlerService: {},
      extractUrls: "",
      crawlUrls: []
    }
  },
  created() {
  },
  methods: {
    startCrawl() {
      API.runScheduler("/scheduler", this.extractUrls)
    }
  }
}
</script>
