<template>
  <form @submit.prevent="send" @reset="reset">
    <b-card showHeader class="mb-3">
      <strong slot="header">
        <i class="fa fa-arrow-circle-right"/> Request
      </strong>

      <div class="form-group row">
        <div class="col-md-2">
          <b-form-select v-model="request.method" :options="options"/>
        </div>
        <div class="col-md-10">
          <input type="text" class="form-control" v-model="request.url" placeholder="http://"/>
        </div>
      </div>
      <div class="form-group">
        <label for="text">Body</label>
        <b-form-input id="text" textarea :rows="3" v-model="request.text"/>
      </div>
    </b-card>
    <div class="text-right">
      <b-button type="submit" variant="primary" :disabled="inProgress">
        <i class="fa fa-paper-plane-o"/> Call
      </b-button>
      <b-button type="button" v-b-modal.modal variant="success" :disabled="inProgress">
        <i class="fa fa-code"/> CURL
      </b-button>
      <b-button type="reset" variant="secondary" :disabled="inProgress">
        <i class="fa fa-undo"/> Reset
      </b-button>
    </div>
    <div class="my-3">
      <b-progress :value="100" animated v-show="inProgress"/>
    </div>
    <Curl id="modal" :request="request"/>
  </form>
</template>

<script>
import Curl from './Curl.vue'

export default {
  components: {Curl},
  props: ['request', 'inProgress'],
  data() {
    return {
      options: ['GET', 'POST', 'PUT', 'DELETE']
    }
  },
  methods: {
    send () {
      this.$emit('send')
    },
    reset () {
      this.$emit('reset')
    }
  }
}
</script>

<style scoped>
.vcenter {
  display: inline-block;
  vertical-align: middle;
  float: none;
}
</style>
