import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'

export function getHotKey() {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'

  const data = Object.assign({}, commonParams, {
    uin: 0,
    needNewCode: 1,
    platform: 'h5'
  })

  return jsonp(url, data, options)
}

export function search(query, page, zhida) {
  const url = 'https://c.y.qq.com/soso/fcgi-bin/client_search_cp'

  const data = Object.assign({}, commonParams, {
    w: query,
    p: page,
    perpage: 20,
    n: 20,
    catZhida: zhida ? 1 : 0,
    zhidaqu: 1,
    ct: 24,
    qqmusic_ver: 1298,
    new_json: 1,
    searchid: 66515943800165849,
    t: 0,
    aggr: 1,
    cr: 1,
    lossless: 0,
    flag_qc: 0,
    loginUin: 0,
    hostUin: 0,
    notice: 0,
    needNewCode: 0
  })

  return jsonp(url, data, options)
}