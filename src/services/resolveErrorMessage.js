export default function resolveErrorMessage (error) {
  if (error.code === 'ENOTFOUND') {
    return 'The url is not found.'
  } else if (error.code === 'ECONNREFUSED') {
    return 'The connection refused'
  }
  return 'Unknown.'
}
