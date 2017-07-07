const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');
const packingGlob = require('packing-glob');

function UncommentBlock(options) {
  this.options = options || {};
}

UncommentBlock.prototype.apply = function(compiler) {
  compiler.plugin('done', (stats) => {
    const patterns = this.options.src;
    packingGlob(patterns, this.options).forEach((file) => {
      const fullpath = path.join(this.options.cwd, file);
      const data = fs.readFileSync(fullpath, 'utf8');
      const dest = path.resolve(this.options.dest, file);
      const destDir = path.dirname(dest);
      if (!fs.existsSync(destDir)) {
        mkdirp.sync(destDir);
      }
      const dataHandled = data.replace(/<!--\s*comment-open((.*?[\n\s]*)*?)-->/ig, (...args) => {
        if (args.length > 2) {
          return args[1]; 
        }
      });
      fs.writeFileSync(dest, dataHandled);
    });
  });
};

module.exports = UncommentBlock;
