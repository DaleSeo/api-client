<template>
  <div class="container">
    <div class="row">
      <div class="col-md-7">
        <Request :request="request" @send="send" @reset="reset"/>
        <Response :response="response"/>
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

import db from '../services/database'
import ApiCaller from '../services/ApiCaller'
const apiCaller = new ApiCaller()

export default {
  components: {
    Request, Response, History,
  },
  data () {
    return {
      request: {
        method: 'GET',
        url: 'http://jsonplaceholder.typicode.com/posts/1',
        text: ''
      },
      response: {}
    }
  },
  firebase: {
    calls: db.ref('calls').limitToLast(20)
  },
  methods: {
    send () {
      console.log('# send()')
      if (this.request.text.trim()) {
        try {
          this.request.body = JSON.parse(this.request.text)
        } catch (err) {
          return window.alert(err)
        }
      }
      apiCaller.call(this.request, (err, response) => {
        if (err) return window.alert(err)
        this.response = response
        this.createCall({
          date: Date(),
          req: this.request,
          res: this.response
        })
      })
    },
    reset () {
      this.response = {}
      console.log('# reset()')
    },
    selectCall (call) {
      this.request = Object.assign({}, call.req)
      this.response = Object.assign({}, call.res)
    },
    createCall (call) {
      this.$firebaseRefs.calls.push(call)
    },
    removeCall (call) {
      console.log('# removeCall()')
      this.$firebaseRefs.calls.child(call['.key']).remove()
    }
  }
}
</script>

<style>
</style>
