var express = require('express')
var router = express.Router()
var db = require('../db/connect')
var criptografia = require('../config/criptografia')
var passport = require('passport')
// antes de fazer qualquer coisa, verifica se está autenticado
router.use(function(req, res, next) {
  if (
    req.isAuthenticated() &&
    ['/users/login', '/users/cadastro'].indexOf(req.originalUrl) > -1
  ) {
    return res.redirect('/')
  }
  next()
})
/* GET users listing. */
router.get('/cadastro', function(req, res, next) {
  res.render('users/register', {
    user: {},
    nome: ''
  })
})

router.get('/login', function(req, res, next) {
  res.render('users/login', {
    nome: ''
  })
})

router.post('/login', function(req, res, next) {
  console.log(req.body)
  if (!(req.body.email && req.body.senha)) {
    res.render('users/login', {
      error: 'Todos os campos são obrigatórios!',
      user: req.body
    })
  }
  try {
    passport.authenticate('local', function(err, user, info) {
      if (err) {
        res.render('users/login', {
          title: 'Acesso ao Sistema',
          error: err,
          user: req.body
        })
      }

      if (!user) {
        res.render('users/login', {
          title: 'Acesso ao Sistema',
          error: 'Erro desconhecido!',
          user: req.body
        })
      }

      // req / res held in closure
      req.logIn(user, function(err) {
        if (err) {
          res.render('users/login', {
            title: 'Acesso ao Sistema',
            error: err,
            user: req.body
          })
        }

        return res.redirect('/')
      })
    })(req, res)
  } catch (error) {
    res.render('users/login', {
      title: 'Acesso ao Sistema',
      error: error,
      user: req.body
    })
  }
});
router.post('/cadastro', async function(req, res, next) {
  var user = req.body

  var sql = `SELECT * FROM usuarios WHERE email = $1`

  var userInDb = await db.query(sql, [user.email])

  if (userInDb.rowCount > 0) {
    req.body.senha = ''
    return res.render('../views/users/register', {
      title: 'Cadastro de Usuário',
      error: 'Este email já está cadastrado no nosso sistema!',
      user: req.body
    })
  }

  var senha = criptografia.hashPwd(user.senha)
  sql = `
  INSERT INTO usuarios(email, senha, ativo, data_cadastro, nome_completo,fone)
  VALUES ($1, $2, TRUE, CURRENT_DATE, $3,$4);`

  try {
    var result = await db.query(sql, [user.email, senha, user.nome_completo,user.fone])

    if (result.rowCount === 0) {
      req.body.senha = ''
      return res.render('../views/users/register', {
        title: 'Cadastro de Usuário',
        error: 'Não foi possível incluir o usuário!',
        user: req.body
      })
    }
    passport.authenticate('local', function(err, user, info) {
      if (err) {
        req.body.senha = ''
        return res.render('../views/users/register', {
          title: 'Cadastro de Usuário',
          error: err,
          user: req.body
        })
      }

      if (!user) {
        req.body.senha = ''
        return res.render('../views/users/register', {
          title: 'Cadastro de Usuário',
          error: 'Erro desconhecido!',
          user: req.body
        })
      }

      // req / res held in closure
      req.logIn(user, function(err) {
        if (err) {
          req.body.senha = ''
          return res.render('../views/users/register', {
            title: 'Cadastro de Usuário',
            error: err,
            user: req.body
          })
        }

        return res.redirect('/')
      })
    })(req, res)
  } catch (error) {
    req.body.senha = ''
    return res.render('../views/users/register', {
      title: 'Cadastro de Usuário',
      error: error,
      user: req.body
    })
  }
})

router.get('/logout', function(req, res, next) {
  req.logout()
  res.redirect('/')
})
module.exports = router;
