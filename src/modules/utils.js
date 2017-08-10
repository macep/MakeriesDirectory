import Config from '../api/app.config'

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
  let domainUrl = Config.wpDomain
  let domainLength = domainUrl.length
  let internalLocation = '^' + domainUrl
  let internalLocationRegExp = new RegExp(internalLocation)
  return (url.match(internalLocationRegExp) === null) ? {url: url, flag: 'absolute'} : {url: url.slice(domainLength), flag: 'relative'}
}

let friendlyMonth = (month) => {
  let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  return arguments[0] === 'list' ? monthNames : monthNames[parseInt(month)]
}

export {
  isTouch,
  stopZoomingWhenDoubleTapped,
  relativePath,
  friendlyMonth
}
