import Vue from 'vue'
import _ from 'lodash'

export default function ({$axios}) {
    $axios.defaults.transformResponse = _.concat($axios.defaults.transformResponse, [
        function (data, header) {
          if (header['content-type'] = 'application/xml' && typeof data === 'string') {
            let result
            $xml2js.parseString(data, (err, data) => {
              if (err) {
                throw err
              }
              result = data
            })
            return result
          }
          return data
        }
    ])
}
