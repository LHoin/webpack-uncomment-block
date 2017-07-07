# 用于取消注释HTML代码片段的webpack插件

## 使用方法
```
const UncommentBlock = require('webpack-uncomment-block'); 
const uncommentBlockPlugin = new UncommentBlock({
  cwd: 'src/html', // 工作目录
  src: '**/*.html ', // 处理文件
  dest: 'prd/html' // 输出目录
});
```
## 使用效果：

### 原始html代码
```
<!DOCTYPE html>
<html>
  <head>
    <meta charset='utf-8'>
    <title>Rights Management</title>
    <!-- comment-open
    <link rel="stylesheet" href="/vendor.css" />
    <link rel="stylesheet" href="/rights/index.css" />
    -->
  </head>
  <body>
    <div id="root">
    </div>
    <script src="/vendor.js"></script>
    <script src="/rights/index.js"></script>
  </body>
</html>
```
### 处理后代码
```
<!DOCTYPE html>
<html>
  <head>
    <meta charset='utf-8'>
    <title>Rights Management</title>
    
    <link rel="stylesheet" href="//mobileqzz.beta.qunar.com/auth-ctrl/prd/assets/css/vendor-9c0ff273.css" />
    <link rel="stylesheet" href="/vendor.css" />
    
  </head>
  <body>
    <div id="root">
    </div>
    <script src="/vendor.js"></script>
    <script src="/rights/index.js"></script>
  </body>
</html>
```
