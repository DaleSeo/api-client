<template>
  <div>
    <form @submit.prevent="call" @reset="reset">
      <b-card no-block showHeader class="mb-3">
        <strong slot="header">
          <i class="fa fa-arrow-circle-right"/> Request
        </strong>

        <div class="form-group row mx-0 my-3">
          <div class="col-sm-2 pr-0">
            <b-form-select v-model="request.method" :options="options"/>
          </div>
          <div class="col-sm-10">
            <input type="text" class="form-control" v-model="request.url"/>
          </div>
        </div>

        <b-tabs small card ref="tabs" v-model="tabIndex">
          <b-tab title="Queries">
            <RequestQueries :queries="request.queries"/>
          </b-tab>
          <b-tab title="Headers">
            <RequestHeaders :headers="request.headers"/>
          </b-tab>
          <b-tab title="Body">
            <b-form-input textarea :rows="3" v-model="request.text"/>
          </b-tab>
        </b-tabs>
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
    </form>

    <div class="my-3">
      <b-progress :value="100" animated v-show="inProgress"/>
    </div>

    <Curl id="modal" :request="request"/>
  </div>
</template>

<script>
import RequestQueries from './RequestQueries.vue'
import RequestHeaders from './RequestHeaders.vue'
import Curl from './Curl.vue'

export default {
  components: {RequestQueries, RequestHeaders, Curl},
  props: ['request', 'inProgress'],
  data() {
    return {
      tabIndex: null,
      options: ['GET', 'POST', 'PUT', 'DELETE']
    }
  },
  methods: {
    call () {
      this.$emit('call')
    },
    reset () {
      this.$emit('reset')
    }
  }
}
</script>
