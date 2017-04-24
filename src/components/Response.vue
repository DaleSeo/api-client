<template>
  <div>
    <h4>RESPONSE</h4>
    <hr/>

    <div class="alert" :class="className">
      <span v-if="response.statusCode">{{response.statusCode}} {{response.statusMessage}}</span>
      <span v-else>HTTP Status</span>
    </div>

    <ul class="nav nav-tabs">
      <li :class="{active: tab === 'headers'}"><a href="#headers" @click="tab = 'headers'">Headers</a></li>
      <li :class="{active: tab === 'body'}"><a href="#body" @click="tab = 'body'">Body</a></li>
    </ul>

    <div class="tab-content">
      <div id="headers" v-show="tab === 'headers'">
        <pre v-if="response.headers" v-text="response.headers"/>
        <pre v-else>&nbsp;</pre>
      </div>
      <div id="body" v-show="tab === 'body'">
        <pre v-if="response.body" v-text="response.body"/>
        <pre v-else>&nbsp;</pre>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["response"],
  computed: {
    className () {
      switch (this.response.statusCode / 100) {
        case 2: return 'alert-success'
        case 4: return 'alert-warning'
        case 5: return 'alert-danger'
        default: return 'alert-info'
      }
    }
  },
  data () {
    return {
      tab: 'body'
    }
  }
}
</script>
