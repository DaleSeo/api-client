export default function resolveErrorMessage (error) {
  if (error.name === 'SyntaxError') {
    return 'Invalid JSON format.'
  }

  if (error.message === 'ENOTFOUND') {
    return 'The url is not found.'
  } else if (error.message === 'ECONNREFUSED') {
    return 'The connection refused.'
  }
  return 'Unknown.'
}
