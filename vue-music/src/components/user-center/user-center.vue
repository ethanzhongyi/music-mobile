<template>
  <transition name="slide">
    <div class="user-center">
      <div class="back">
        <i class="icon-back"></i>
      </div>
      <div class="switches-wrapper">
        <switches @switch='switchItem' :currentIndex='currentIndex' :switches='switches'></switches>
      </div>
      <div ref="playBtn" class="play-btn">
        <i class="icon-play"></i>
        <span class="text">随机播放全部</span>
      </div>
      <div class="list-wrapper" ref="listWrapper">
        <scroll ref='favoriteList' class='list-scroll' v-if='currentIndex === 0' :data='favoriteList'>
            <div class="list-inner">
              <song-list @select='selectSong' :songs='favoriteList'></song-list>
            </div>
          </scroll>
          <scroll ref="searchList" v-if="currentIndex===1" class="list-scroll"
                  :data="playHistory">
            <div class="list-inner">
              <song-list @select='selectSong' :songs='playHistory'></song-list>
            </div> 
          </scroll>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Switches from 'base/switches/switches'
  import {mapGetters, mapActions} from 'vuex'
  import Song from 'common/js/song'
  import Scroll from 'base/scroll/scroll'
  import SongList from 'base/song-list/song-list'

  export default {
    data() {
      return {
        currentIndex: 0,
        switches: [{
          name: '我喜欢的'
        },{
          name: '最近听的'
        }]
      }
    },
    computed: {
      ...mapGetters([
        'favoriteList',
        'playHistory'
      ])
    },
    methods: {
      switchItem(index) {
        this.currentIndex = index
      },
      selectSong(song) {
        this.insertSong(new Song(song))
      },
      ...mapActions([
        'insertSong'
      ])
    },
    components: {
      Switches,
      Scroll,
      SongList
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .user-center
    position: fixed
    top: 0
    bottom: 0
    z-index: 100
    width: 100%
    background: $color-background
    &.slide-enter-active, &.slide-leave-active
      transition: all 0.3s
    &.slide-enter, &.slide-leave-to
      transform: translate3d(100%, 0, 0)
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .switches-wrapper
      margin: 10px 0 30px 0
    .play-btn
      box-sizing: border-box
      width: 135px
      padding: 7px 0
      margin: 0 auto
      text-align: center
      border: 1px solid  $color-text-l
      color: $color-text-l
      border-radius: 100px
      font-size: 0
      .icon-play
        display: inline-block
        vertical-align: middle
        margin-right: 6px
        font-size: $font-size-medium-x
      .text
        display: inline-block
        vertical-align: middle
        font-size: $font-size-small
    .list-wrapper
      position: absolute
      top: 110px
      bottom: 0
      width: 100%
      .list-scroll
        height: 100%
        overflow: hidden
        .list-inner
          padding: 20px 30px
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>