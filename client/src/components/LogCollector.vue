<template>
  <div class="container">
    <h1 class="is-size-1">{{ title }}</h1>

    <!-- Input fields and submit button -->
    <div class="field is-grouped is-grouped-centered mt-5">
      <div class="control">
        <input
          id="fileName"
          v-model="fileName"
          class="input"
          type="text"
          placeholder="File Name">
      </div>
      <div class="control">
        <input
          id="numberOfLines"
          v-model="numberOfLines"
          class="input"
          type="text"
          placeholder="Number of Lines">
      </div>
      <div class="control">
        <input
          id="keyword"
          v-model="keyword"
          class="input"
          type="text"
          placeholder="Keyword">
      </div>
      <p class="control">
        <a
          class="button is-primary"
          @click="getLogs"
        >
          Submit
        </a>
      </p>
    </div>

    <!-- Data display table -->
    <div class="box mt-6">
      <table class="table is-bordered is-striped is-hoverable is-fullwidth">
        <thead>
          <th>Number</th>
          <th>Message</th>
        </thead>
        <tbody>
          <tr
            v-for="(log, index) in logData"
            v-bind:key="index"
          >
            <td>{{ index + 1 }}</td>
            <td class="has-text-left">{{ log }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <br>

  </div>
</template>

<script>
import axios from 'axios'
import { ref } from 'vue'

export default {
  name: 'LogCollector',
  props: {},
  setup () {
    const title = ref('')
    title.value = 'Log Collector 9000'

    const fileName = ref('')
    const numberOfLines = ref('')
    const keyword = ref('')

    const logData = ref()

    // Retrieves the requested logs via API call
    function getLogs() {
      axios.get(`http://localhost:3000/api/view/file?fn=${fileName.value}&n=${numberOfLines.value}&kw=${keyword.value}`)
        .then(response => {
          if (response.data.success == true) {
            logData.value = response.data.data
          }
          else {
            alert(response.data.message)
          }
        })
    }
    
    return {
      title,
      getLogs,
      fileName,
      numberOfLines,
      keyword,
      logData
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
