export default {
  key: process.env.NODE_ENV === 'production' ? process.env.SECRET : 'secret'
}
