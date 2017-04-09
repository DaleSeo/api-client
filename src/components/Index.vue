<template>
  <div class="container">
    <PageHeader>API Client</PageHeader>
    <div class="row">
      <div class="col-md-4">
        <History/>
      </div>
      <div class="col-md-8">
        <Request/>
        <Response/>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from './PageHeader.vue'
import History from './History.vue'
import Request from './Request.vue'
import Response from './Response.vue'

export default {
  components: {
    PageHeader, History, Request, Response
  }
}
</script>

<style>
</style>
