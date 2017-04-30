<template>
  <b-modal
    :id="id"
    title="CURL Command"
    :hide-footer="true"
    :close-on-backdrop="false"
  >
    <div class="bg-faded">
      {{curlText}}
    </div>
  </b-modal>
</template>

<script>
export default {
  props: ["inProgress", "id", "request"],
  computed: {
    curlText () {
      let curl = 'curl ' + this.request.url
      curl += ' -X ' + this.request.method
      curl += ` -d '${this.request.text}'`
      return curl
    }
  }
}
</script>
