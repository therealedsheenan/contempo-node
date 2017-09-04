import jwt from 'express-jwt'
import secret from '../config/secret'

// getting Token or Bearer
const getTokenFromHeader = (req) => {
  if ((req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') ||
    (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')) {
    return req.headers.authorization.split(' ')[1]
  }

  return null
}

const auth = {
  required: jwt({
    secret: secret.key,
    userProperty: 'payload',
    getToken: getTokenFromHeader
  }),
  optional: jwt({
    secret: secret.key,
    userProperty: 'payload',
    credentialsRequired: false,
    getToken: getTokenFromHeader
  })
}

export default auth
