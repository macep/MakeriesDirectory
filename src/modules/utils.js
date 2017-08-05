
let relativePath = (url) => {
  let domain = window.location.protocol + '//' + window.location.hostname + (window.location.port.length === 4 ? ':8888/' : '')
  return url.substr(domain.length + 1, url.length)
}

export {
  relativePath
}
