import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'
import axios from 'axios'

//通过jsonp 请求的slider轮播图的数据
export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  
  const data = Object.assign({}, commonParams, {
  	platform: 'h5',
  	uin: 0,
  	needNewCode: 1
  })

  return jsonp(url, data, options)
}

//通过jsonp 请求的歌单数据
export function getDiscList() {
  const url = '/api/getDiscList'

  const data = Object.assign({}, commonParams, {
  	platform: 'yqq.json',
  	categoryId: 10000000,
  	sortId: 5,
  	picmid: 1,
  	sin: 0,
    ein: 29,
    hostUin: 0,
    needNewCode: 0,
  	rnd: Math.random(),
  	format: 'json'
  })

  //return jsonp(url, data, options)
  return axios.get(url,{
  	params: data
  }).then((res) => {
  	return Promise.resolve(res.data)
  })
}