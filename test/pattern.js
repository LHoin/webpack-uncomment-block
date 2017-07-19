const assert = require('assert');
const UncommentBlock = require('../index');

describe('[html pattern]', function() {
  const inst = new UncommentBlock({
    pattern: 'html'
  });
  const testData = `<!-- comment-open Learn wisdom by the follies of others. -->`;
  const expectData = ` Learn wisdom by the follies of others. `;
  it('should return' + expectData, function() {
    assert.equal(inst.replace(testData), expectData);
  });
});

describe('[js pattern]', function() {
  const inst = new UncommentBlock({
    pattern: 'js'
  });
  const testData = `
    /* comment-open
      what you think is not true. 
    */
  `;
  const expectData= `
    
      what you think is not true. 
    
  `;
  it('should return' + expectData, function() {
    assert.equal(inst.replace(testData), expectData);
  });
});

describe('[css pattern]', function() {
  const inst = new UncommentBlock({
    pattern: 'css'
  });
  const testData = `
    /* comment-open
      you make me confused.
    */
  `;
  const expectData= `
    
      you make me confused.
    
  `;
  it('should return' + expectData, function() {
    assert.equal(inst.replace(testData), expectData);
  });
});
