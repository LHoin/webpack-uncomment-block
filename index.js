var path = require('path');
var fs = require('fs');
var extend = require('util')._extend;
var mkdirp = require('mkdirp');
var packingGlob = require('packing-glob');

var COMMON_PATTERN = {
  html: /<!--\s*comment-open((.*?[\n\s]*)*?)-->/ig,
  js: /\/\*\s*comment-open((.*?[\n\s]*)*?)\*\//ig
};
COMMON_PATTERN.css = COMMON_PATTERN.js;

if (!extend) {
  extend = function(target, source) {
    return Object.assign(target, source);
  };
}

function defaultOpts() {
  return {
    pattern: /<!--\s*comment-open((.*?[\n\s]*)*?)-->/ig
  };
}

function UncommentBlock(options) {
  this.options = extend(defaultOpts(), options);
  var pattern = this.options.pattern;
  if (pattern.constructor.name.toLowerCase() === 'string') {
    pattern = COMMON_PATTERN[pattern] || COMMON_PATTERN.html;
  }
  if (pattern.constructor.name.toLowerCase() === 'regexp') {
    this.replace = function(data) {
      return data.replace(pattern, function() {
        if (arguments.length > 2) {
          return arguments[1];
        }
      });
    };
  } else if (pattern.constructor.name.toLowerCase() === 'function') {
    this.replace = pattern;
  }
}

UncommentBlock.prototype.apply = function(compiler) {
  var self = this;
  compiler.plugin('done', function(stats) {
    var src = self.options.src;
    var pattern = this.options.pattern;
    packingGlob(src, self.options).forEach(function(file) {
      var fullpath = path.join(self.options.cwd, file);
      var data = fs.readFileSync(fullpath, 'utf8');
      var dest = path.resolve(self.options.dest, file);
      var destDir = path.dirname(dest);
      if (!fs.existsSync(destDir)) {
        mkdirp.sync(destDir);
      }
      var dataHandled = self.replace(data);
      fs.writeFileSync(dest, dataHandled);
    });
  });
};

module.exports = UncommentBlock;
