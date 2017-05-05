<template>
  <b-modal
    :id="id"
    title="CURL Command"
    :hide-footer="true"
    :close-on-backdrop="false"
  >
    <b-form-input textarea :rows="10" :value="curl"/>
  </b-modal>
</template>

<script>
import buildCurl from '../services/buildCurl'

export default {
  props: ["inProgress", "id", "request"],
  computed: {
    curl () {
      return buildCurl(this.request)
    }
  }
}
</script>
