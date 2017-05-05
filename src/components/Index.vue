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

export default {
  components: {
    Request, Response, History,
  },
  data () {
    return {
      request: this.initRequest(),
      response: {},
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
        url: '',
        text: ''
      }
    },
    send () {
      console.log('Index#send')
      if (this.request.text.trim()) {
        try {
          this.request.body = JSON.parse(this.request.text)
        } catch (err) {
          return window.alert(err)
        }
      }
      this.inProgress = true
      callApi(this.request)
        .then(response => {
          console.log('response:', response)
          if (response.error) {
            toastr.error('Failed to call!')
          } else {
            toastr.success('Successfully called.')
          }
          this.response = response
          let call = {
            date: new Date().getTime(),
            req: this.request,
            res: this.response
          }
          this.createCall(call)
          this.inProgress = false
        })
        .catch(err => {
          console.error('err:', err)
          window.alert(err)
        })
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
