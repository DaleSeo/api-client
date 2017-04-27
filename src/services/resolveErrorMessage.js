export default function resolveErrorMessage (error) {
  if (error.code === 'ENOTFOUND') {
    return 'The url is not accessible.'
  }
  return 'Unknown.'
}
