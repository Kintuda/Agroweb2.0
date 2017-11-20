var crypto = require('crypto')

var hashPwd = function (pwd) {
  var hashed = crypto
    .createHash('sha256')
    .update(pwd, 'utf8')
    .digest('hex')

  return hashed
}

var service = {
  hashPwd: hashPwd,
  compare: function (toHash, hashed) {
    var newHashed = hashPwd(toHash)

    return newHashed === hashed
  }
}

module.exports = service
