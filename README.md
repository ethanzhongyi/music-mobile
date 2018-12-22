## 移动端音乐app-vue2.0

#### 2.3 

修改 webpack.base.conf.js ：

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
//意思是在该文件的上级目录下寻找，即根目录 [注： ‘.’ 一个点是当前目录 , ‘..’2个点是上级目录]

resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'src': resolve('src'),
      'common': resolve('src/common'),
    }
  }
  //src/common 的alias别名为 common
