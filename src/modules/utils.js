let isTouch = () => {
  try {
    document.createEvent('TouchEvent')
    return true
  } catch (e) {
    return false
  }
}

let stopZoomingWhenDoubleTapped = () => {
  let timeout
  let lastTap = 0
  let wrapper = document.getElementById('wrapper')

  wrapper.addEventListener('touchend', function (e) {
    let currentTime = new Date().getTime()
    let tapLength = currentTime - lastTap

    clearTimeout(timeout)
    if (tapLength < 500 && tapLength > 0) {
      e.preventDefault()
    } else {
      timeout = setTimeout(function () {
        clearTimeout(timeout)
      }, 500)
    }
    lastTap = currentTime
  })
}

let relativePath = (url) => {
  let domain = window.location.protocol + '//' + window.location.hostname + (window.location.port.length === 4 ? ':8888/' : '')
  return url.substr(domain.length + 1, url.length)
}

let selectPage = (id) => {
  return id
}

export {
  isTouch,
  stopZoomingWhenDoubleTapped,
  relativePath,
  selectPage
}
