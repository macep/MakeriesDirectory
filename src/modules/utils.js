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
  let wrapper = document.getElementById('app')

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

let getRouteFromWpMenus = (url) => {
  let domainUrl = Config.wpDomain
  let domainLength = domainUrl.length
  let internalLocation = '^' + domainUrl
  let internalLocationRegExp = new RegExp(internalLocation)
  return (url.match(internalLocationRegExp) === null) ? {url: url, flag: 'absolute'} : {url: url.slice(domainLength - 1), flag: 'relative'}
}

let friendlyMonth = (month) => {
  let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  return arguments[0] === 'list' ? monthNames : monthNames[parseInt(month)]
}

let removeArrayDuplicates = (array) => array.filter((elem, idx, self) => idx === self.indexOf(elem))

let findOccurences = (array, withUrl, urlPrefix) => {
  let a = []
  let b = []
  let c = []
  let prev

  if (urlPrefix === null) {
    urlPrefix = ''
  }

  array.sort().forEach(el => {
    if (el !== prev) {
      a.push(el)
      b.push(1)
    } else {
      b[b.length - 1]++
    }
    prev = el
  })

  a.forEach((el, i) => {
    c.push({
      el: el,
      occurences: b[i]
    })

    if (withUrl) {
      c[i].url = urlPrefix + friendlyUrl(a[i])
    }
  })

  return c
}

let friendlyUrl = (val) => val.split(' ').join('-').replace(/,/g, '')

let sortObjectProperties = (object) => {
  let sorted = {}
  let key
  let a = []

  for (key in object) {
    if (object.hasOwnProperty(key)) {
      a.push(key)
    }
  }
  a.sort()
  for (key = 0; key < a.length; key++) {
    sorted[a[key]] = object[a[key]]
  }
  return sorted
}

let getNthFragment = (string, nth) => string.split('/')[nth]

export {
  isTouch,
  stopZoomingWhenDoubleTapped,
  getRouteFromWpMenus,
  friendlyMonth,
  removeArrayDuplicates,
  findOccurences,
  friendlyUrl,
  sortObjectProperties,
  getNthFragment
}
