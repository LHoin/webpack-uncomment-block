# 用于取消注释代码片段的webpack插件

## 使用方法
```
const UncommentBlock = require('webpack-uncomment-block'); 
const uncommentBlockPlugin = new UncommentBlock({
  cwd: 'src/html', // 工作目录
  src: '**/*.html ', // 处理文件
  dest: 'prd/html', // 输出目录
  pattern: 'html' // String, RegExp或者Function。默认值为'html'
});
```

### pattern可选值
String: 'html', 'js', 'css'；预置对3种代码处理。
RegExp: 使用正则来替换注释代码。
Function: 接受一个字符串参数，该参数为文件内容，返回处理后的字符串。 

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
    
    <link rel="stylesheet" href="/vendor.css" />
    <link rel="stylesheet" href="/rights/index.css" />
    
  </head>
  <body>
    <div id="root">
    </div>
    <script src="/vendor.js"></script>
    <script src="/rights/index.js"></script>
  </body>
</html>
```
