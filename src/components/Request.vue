<template>
  <form @submit.prevent="send" @reset="reset">
    <b-card showHeader class="mb-3">
      <strong slot="header">
        <i class="fa fa-arrow-circle-right"/> Request
      </strong>

      <div class="form-group row">
        <div class="col-sm-2 pr-0">
          <b-form-select v-model="request.method" :options="options"/>
        </div>
        <div class="col-sm-10">
          <input type="text" class="form-control" v-model="request.url" placeholder="URL (http://~)"/>
        </div>
      </div>

      <div class="form-group">
      <label>
        Query String
      </label>
        <div class="row" v-for="query in queries">
          <div class="col-sm-4">
            <b-form-input :value="query.key"/>
          </div>
          <div class="col-sm-8">
            <b-form-input :value="query.val"/>
          </div>
        </div>
      </div>

      <b-form-fieldset label="Body">
        <b-form-input textarea :rows="3" v-model="request.text"/>
      </b-form-fieldset>

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
  computed: {
    queries () {
      return Object.keys(this.request.query).map(key => {
        return {key: key, val: this.request.query[key]}
      })
    }
  },
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
