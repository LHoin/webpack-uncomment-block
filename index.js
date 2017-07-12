var path = require('path');
var fs = require('fs');
var extend = require('util')._extend;
var mkdirp = require('mkdirp');
var packingGlob = require('packing-glob');

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
      var dataHandled = data.replace(pattern, (...args) => {
        if (args.length > 2) {
          return args[1];
        }
      });
      fs.writeFileSync(dest, dataHandled);
    });
  });
};

module.exports = UncommentBlock;
