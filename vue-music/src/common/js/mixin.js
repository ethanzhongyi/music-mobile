import {mapGetters, mapMutations, mapActions} from 'vuex'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util'

export const playlistMixin = {
  computed: {
    ...mapGetters([
      'playlist'
    ])
  },
  mounted() {
    this.handlePlaylist(this.playlist)
  },
  activated() {
    this.handlePlaylist(this.playlist)
  },
  watch: {
    playlist(newVal) {
      this.handlePlaylist(newVal)
    }
  },
  methods: {
    handlePlaylist() {
      throw new Error('component must implement handlePlaylist method')
    }
  }
}

export const playerMixin = {
  computed: {
    iconMode() {
        return this.mode === playMode.sequence ? 'icon-sequence': this.mode === playMode.loop ? 'icon-loop' : 'icon-random'
      },
      ...mapGetters([
        'playlist',
        'currentSong',
        'mode',
        'sequenceList',
        'favoriteList'
      ])
  },
  methods: {
    changeMode() {
        /* 改变播放模式【单曲循环，随机播放，顺序播放】：通过 ...mapGetters 拿到 vuex 里面的[state] mode，
        *  在此方法改变mode的值[0, 1, 2]，然后通过...mapMutation去修改state
        */
        const mode = (this.mode + 1) % 3
        this.setPlayMode(mode)
        let list = null
        if (mode === playMode.random) {
          list = shuffle(this.sequenceList)
        } else {
          list = this.sequenceList
        }
        this.resetCurrentIndex(list)
        this.setPlaylist(list)
      },
      resetCurrentIndex(list) {
        let index = list.findIndex((item) => {
          return item.id === this.currentSong.id
        })
        this.setCurrentIndex(index)
      },
      toogleFavorite(song) {
        if (this.isFavorite(song)) {
          this.deleteFavoriteList(song)
        } else {
          this.setFavoriteList(song)
        }
      },
      getFavoriteIcon(song) {
        if (this.isFavorite(song)) {
          return 'icon-favorite'
        }
        return 'icon-not-favorite'
      },
      isFavorite(song) {
        const index = this.favoriteList.findIndex((item) => {
          return item.id === song.id
        })
        return index > -1
      },
      ...mapMutations({
      setPlayMode: 'SET_PLAY_MODE',
      setPlaylist: 'SET_PLAYLIST',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setPlayingState: 'SET_PLAYING_STATE'
    }),
      ...mapActions([
        'setFavoriteList',
        'deleteFavoriteList'
      ])
  }
}

export const searchMixin = {
  data() {
    return {
      query: '',
      refreshDelay: 120
    }
  },
  computed: {
    ...mapGetters([
      'searchHistory'
    ])
  },
  methods: {
    onQueryChange(query) {
      this.query = query
    },
    blurInput() {
      this.$refs.searchBox.blur()
    },
    addQuery(query) {
      this.$refs.searchBox.setQuery(query)
    },
    saveSearch() {
      this.saveSearchHistory(this.query)
    },
    ...mapActions([
      'saveSearchHistory',
      'deleteSearchHistory'
    ])
  }
}
