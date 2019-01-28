<template>
  <div class="progress-bar" ref="progressBar" @click='progressClick'>
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper" ref="progressBtn"
        @touchstart.prevent="progressTouchStart"
        @touchmove.prevent="progressTouchMove"
        @touchend="progressTouchEnd"
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { prefixStyle } from 'common/js/dom'

  const transform = prefixStyle('transform')
  const progresstnWidth = 16

  export default {
    props: {
      percent: {
        type: Number,
        default: 0
      }
    },
    created() {
      this.touch = {}
    },
    methods: {
      progressTouchStart(e) {
        this.touch.initiated = true
        this.touch.startX = e.touches[0].pageX
        this.touch.left = this.$refs.progress.clientWidth
      },
      progressTouchMove(e) {
        if (!this.touch.initiated) {
          return
        }
        const deltaX = e.touches[0].pageX - this.touch.startX
        const offsetWidth = Math.min(this.$refs.progressBar.clientWidth - progresstnWidth, Math.max(0, this.touch.left + deltaX))
        this._offset(offsetWidth)
      },
      progressTouchEnd(e) {
        this.touch.initiated = false
        const progressWidth = this.$refs.progressBar.clientWidth - progresstnWidth
        const percent = this.$refs.progress.clientWidth / progressWidth
        this._triggerPercent(percent)
      },
      progressClick(e) {
        const progressWidth = this.$refs.progressBar.clientWidth - progresstnWidth
        const pageX = e.pageX - 77
        const percent = pageX / progressWidth
        this._offset(pageX)
        this._triggerPercent(percent)
      },
      _triggerPercent(percent) {
        this.$emit('progressChange', percent)
      },
      _offset(offsetWidth) {
        this.$refs.progress.style.width = `${offsetWidth}px`
        this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px, 0, 0)`
      }
    },
    watch: {
      //监听 player页面 传来的时间百分比
      percent(newPercent) {
        if (newPercent >= 0 && !this.touch.initiated) {
          const progressWidth = this.$refs.progressBar.clientWidth - progresstnWidth
          const offsetWidth = progressWidth * newPercent
          this._offset(offsetWidth)
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .progress-bar
    height: 30px
    .bar-inner
      position: relative
      top: 13px
      height: 4px
      background: rgba(0, 0, 0, 0.3)
      .progress
        position: absolute
        height: 100%
        background: $color-theme
      .progress-btn-wrapper
        position: absolute
        left: -8px
        top: -13px
        width: 30px
        height: 30px
        .progress-btn
          position: relative
          top: 7px
          left: 7px
          box-sizing: border-box
          width: 16px
          height: 16px
          border: 3px solid $color-text
          border-radius: 50%
          background: $color-theme
</style>