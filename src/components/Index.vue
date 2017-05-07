<template>
  <div class="container">
    <div class="row">
      <div class="col-md-7">
        <Request
          :request="request"
          :inProgress="inProgress"
          @send="send"
          @reset="reset"
        />
        <Response
          v-if="response.statusCode"
          :response="response"
        />
      </div>
      <div class="col-md-5">
        <History :calls="calls" @select="selectCall" @remove="removeCall"/>
      </div>
    </div>
  </div>
</template>

<script>
import Request from './Request.vue'
import Response from './Response.vue'
import History from './History.vue'

import toastr from 'toastr'

import db from '../services/database'
import callApi from '../services/callApi'

import resolveErrorMessage from '../services/resolveErrorMessage'

export default {
  components: {
    Request, Response, History,
  },
  data () {
    return {
      request: this.initRequest(),
      response: this.initResponse(),
      inProgress: false
    }
  },
  firebase: {
    calls: db.ref('calls')
  },
  methods: {
    initRequest () {
      return {
        method: 'GET',
        queries: [],
        headers: [],
        url: 'http://',
        text: ''
      }
    },
    initResponse () {
      return {
        statusCode: '',
        statusMessage: '',
        headers: {},
        body: {},
        text: ''
      }
    },
    send () {
      console.log('Index#send')
      this.inProgress = true
      this.response = this.initResponse()
      callApi(this.request)
        .then(response => {
          console.log('response:', response)
          toastr.success('Successfully called.')
          this.response = response
          let call = {
            date: new Date().getTime(),
            req: this.request,
            res: this.response
          }
          this.createCall(call)
        })
        .catch(err => {
          console.error('err:', err)
          toastr.error(resolveErrorMessage(err), 'Failed to call!')
        })
        .then(_ => this.inProgress = false)
    },
    reset () {
      console.log('Index#reset')
      this.request = this.initRequest()
      this.response = {}
      toastr.success('Reset.')
    },
    selectCall (call) {
      console.log('Index#selectCall', call)
      this.request = Object.assign(this.initRequest(), call.req)
      this.response = Object.assign({}, call.res)
    },
    createCall (call) {
      console.log('Index#createCall', call)
      this.$firebaseRefs.calls.push(call)
    },
    removeCall (call) {
      console.log('Index#removeCall', call)
      this.$firebaseRefs.calls.child(call['.key']).remove()
        .then(_ => toastr.success('Removed.'))
        .catch(err => toastr.error(err))
    }
  }
}
</script>

<style>
</style>
