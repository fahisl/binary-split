var through = require('through2')
var os = require('os')

module.exports = BinarySplit

function BinarySplit (matcher) {
  if (!(this instanceof BinarySplit)) return new BinarySplit(matcher)
  var buffered
  return through(write, end)

  function write (buf, enc, done) {
    var offset = 0
    var lastMatch = 0
    if (buffered) {
      buf = Buffer.concat([buffered, buf])
      offset = buffered.length
      buffered = undefined
    }

    while (true) {
      var idx = firstMatch(buf, offset);
      if (idx !== -1) {
        this.push(buf.slice(lastMatch, idx))
        offset = idx + 1
        lastMatch = offset
      } else {
        buffered = buf.slice(lastMatch)
        break
      }
    }

    done()
  }

  function end (done) {
    if (buffered) this.push(buffered)
    done()
  }

  function firstMatch (buf, offset) {
    if (offset < buf.length) {
      for (var i = offset; i < buf.length; i++) {
        if (buf[i] === matcher) {
          return i;
        };
      }
    }

    // Offset exceeds buffer or found no match in buffer.
    return -1;
  }
}
