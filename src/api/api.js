import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

function buildResourceUrl (base, resource) {
  return base[base.length - 1] === '/'
    ? base + resource
    : base + '/' + resource
}

function createRestfulApi (url) {
  return {
    list: function (headers) {
      return Vue.http.get(url).then((resp) => {
        return Promise.resolve(resp.json())
      }).catch((resp) => {
        console.log(`list ${url} failed: ${resp.status} ${resp.body}`)
        return Promise.reject({status: resp.status, message: 'list failed'})
      })
    },
    get: function (id, headers) {
      let resUrl = `${url}/${id}`
      return Vue.http.get(resUrl).then((resp) => {
        return Promise.resolve(resp.json())
      }).catch((resp) => {
        console.log(`get ${url}/${id} failed: ${resp.status} ${resp.body}`)
        return Promise.reject({status: resp.status, message: 'get failed'})
      })
    },
    create: function (data, headers) {
      return {}
    },
    update: function (id, data, headers) {
      return {}
    },
    delete: function (id, headers) {
      return {}
    }
  }
}

export default {
  reports: createRestfulApi(buildResourceUrl('http://localhost:8080/', 'reports'))
}
