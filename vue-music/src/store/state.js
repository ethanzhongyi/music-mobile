import {playMode} from 'common/js/config'
import {loadSearch} from 'common/js/cache'

//playlist: 播放列表（当顺序播放时 和 sequenceList 是一样的，随机播放时就不一样）
//sequenceList： 顺序列表

const state = {
  singer: {},
  playing: false,
  fullScreen: false,
  playlist: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: -1,
  disc: {},
  topList: {},
  searchHistory: loadSearch(),
  playHistory: []
}

export default state