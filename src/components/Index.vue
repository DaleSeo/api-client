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
        <br/>
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

import toastr from 'toastr'
toastr.options = {
  "positionClass": "toast-bottom-full-width"
}

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
      response: {},
      inProgress: false
    }
  },
  firebase: {
    calls: db.ref('calls')
  },
  methods: {
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
      apiCaller.call(this.request, (err, response) => {
        if (err) return window.alert(err)
        this.response = response
        this.createCall({
          date: new Date(),
          req: this.request,
          res: this.response
        })
        toastr.success('Successfully Called!')
        this.inProgress = false
      })
    },
    reset () {
      console.log('Index#reset')
      this.response = {}
      toastr.success('Reset!')
    },
    selectCall (call) {
      console.log('Index#selectCall', call)
      this.request = Object.assign({}, call.req)
      this.response = Object.assign({}, call.res)
    },
    createCall (call) {
      console.log('Index#createCall', call)
      this.$firebaseRefs.calls.push(call)
    },
    removeCall (call) {
      console.log('Index#removeCall', call)
      this.$firebaseRefs.calls.child(call['.key']).remove()
        .then(_ => toastr.success('Removed!'))
        .catch(err => toastr.error(err))
    }
  }
}
</script>

<style>
</style>
