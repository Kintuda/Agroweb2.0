const criptografia = require('../criptografia')
const LocalStrategy = require('passport-local').Strategy
const db = require('../../db/connect')
var passport = require('passport')

module.exports = function () {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'senha'
      },
      async function (email, senha, cb) {
        var sql = 'SELECT * FROM usuarios WHERE email=$1'
        var result = await db.query(sql, [email])

        if (result.rowCount > 0) {
          const first = result.rows[0]
          var isEqual = criptografia.compare(senha, first.senha)
          if (isEqual) {
            cb(null, {
              id: first.id,
              username: first.email,
              data_cadastro: first.data_cadastro,
              ativo: first.ativo,
              nome_completo: first.nome_completo,
              email:first.email
            })
          } else {
            cb(null, false)
          }
        } else {
          cb(null, false)
        }
      }
    )
  )

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, cb) => {
    db.query(
      'SELECT id, email, ativo, data, nome_completo FROM usuarios WHERE email=$1',
      [parseInt(id, 10)],
      (err, results) => {
        if (err) {
          console.log('Error when selecting user on session deserialize', err)
          return cb(err)
        }

        cb(null, results.rows[0])
      }
    )
  })
}
