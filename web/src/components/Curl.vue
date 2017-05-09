<template>
  <b-modal
    :id="id"
    title="CURL Command"
    :close-on-backdrop="false"
  >
    <b-form-input textarea :rows="10" :value="curl"/>
    <div slot="modal-footer">
      <b-btn variant="primary"
        v-clipboard:copy="curl"
        v-clipboard:success="onCopy"
        v-clipboard:error="onError"
      ><i class="fa fa-clone"/> Copy</b-btn>
    </div>
  </b-modal>
</template>

<script>
import toastr from 'toastr'
import buildCurl from '../services/buildCurl'

export default {
  props: ["id", "request"],
  computed: {
    curl () {
      return buildCurl(this.request)
    }
  },
  methods: {
    onCopy (e) {
      toastr.success('Copied to clipboard')
    },
    onError (e) {
      toastr.error('Failed to copy')
    }
  }
}
</script>
