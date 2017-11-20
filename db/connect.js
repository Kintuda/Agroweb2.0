const Pool = require('pg').Pool

const dbConfig = {
  host: 'ec2-50-17-253-3.compute-1.amazonaws.com',
  database: 'd7pjvncn8ipe8t',
  user: 'yiqmzbtvshmkud',
  password: 'f4d99bbf6332e92645c0247e02683d6b8f9e1ecb9b44687728196d3d24499e88',
  port: 5432,
  ssl: true
}
const pool = new Pool(dbConfig)
module.exports = {
  pool,
  query: (text, params = []) => {
    return pool.query(text, params)
  }
}
