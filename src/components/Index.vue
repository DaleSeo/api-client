<template>
  <div class="container">
    <PageHeader>API Client</PageHeader>
    <div class="row">
      <div class="col-md-4">
        <History/>
      </div>
      <div class="col-md-8">
        <Request :request="request" @send="send" @reset="reset"/>
        <Response :response="response"/>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from './PageHeader.vue'
import History from './History.vue'
import Request from './Request.vue'
import Response from './Response.vue'

import ApiCaller from '../services/ApiCaller'
const apiCaller = new ApiCaller()

export default {
  components: {
    PageHeader, History, Request, Response
  },
  data () {
    return {
      request: {
        method: 'GET',
        url: 'http://jsonplaceholder.typicode.com/posts/1',
        body: ''
      },
      response: {}
    }
  },
  methods: {
    send () {
      console.log('# send()')
      apiCaller.call(this.request, (err, response) => {
        if (err) return window.alert(err)
        this.response = response
      })
    },
    reset() {
      console.log('# reset()')
      this.response = {}
    }
  }
}
</script>

<style>
</style>
