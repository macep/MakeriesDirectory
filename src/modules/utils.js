import Config from '../api/app.config'

const isTouch = () => {
  try {
    document.createEvent('TouchEvent')
    return true
  } catch (e) {
    return false
  }
}

const stopZoomingWhenDoubleTapped = () => {
  let timeout
  let lastTap = 0
  const wrapper = document.getElementById('app')

  wrapper.addEventListener('touchend', e => {
    const currentTime = new Date().getTime()
    const tapLength = currentTime - lastTap

    clearTimeout(timeout)
    if (tapLength < 500 && tapLength > 0) {
      e.preventDefault()
    } else {
      timeout = setTimeout(() => {
        clearTimeout(timeout)
      }, 500)
    }
    lastTap = currentTime
  })
}

const getRouteFromWpMenus = (url) => {
  const domainUrl = Config.wpDomain
  const domainLength = domainUrl.length
  const internalLocation = '^' + domainUrl
  const internalLocationRegExp = new RegExp(internalLocation)
  return (url.match(internalLocationRegExp) === null) ? {url: url, flag: 'absolute'} : {url: url.slice(domainLength - 1), flag: 'relative'}
}

const friendlyMonth = (month) => {
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  return arguments[0] === 'list' ? monthNames : monthNames[parseInt(month)]
}

const removeArrayDuplicates = (array) => array.filter((elem, idx, self) => idx === self.indexOf(elem))

const findOccurences = (array, withUrl, urlPrefix) => {
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

const friendlyUrl = (str) => str.split(' ').join('-').replace('_', '-').replace(/[^a-zA-Z0-9-]/g, '')

const sortObjectProperties = (object) => {
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

const getNthFragment = (str, nth) => str.split('/')[nth]

const getSubstringBetweenSubstrings = (str, first, second) => str.match(new RegExp(first + '(.*)' + second))

const cleanupAuthCanceledSessions = () => {
  for (let key in localStorage) {
    if (key.split('.')[0] === 'com' && key.split('.')[1] === 'auth0' && key.split('.')[2] === 'auth') {
      localStorage.removeItem(key)
    }
  }
}

const isEmail = (str) => /^(([^<>()[\]\\.,;:#\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,6}))$/.test(str)

const isWebsite = (str) => /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(#[-a-z\d_]*)?$/i.test(str)

const azDirectory = (directory) => {
  let letter = ''
  let azObject = {}
  let azValNameNonAlpha = []

  directory.forEach(item => {
    item.routeTo = `${Config.routerSettings.makerDetail}${item.id}/${item.name.split(' ').join('-')}`

    // sort the collection by initial char, case insensitive
    letter = item.name.charAt(0).toUpperCase()

    if (azObject[letter] === undefined) {
      azObject[letter] = []
    }

    azObject[letter].push(item)
  })

  for (let prop in azObject) {
    if (prop.match(/^[A-Za-z]+$/) === null) {
      azValNameNonAlpha = azValNameNonAlpha.concat(azObject[prop])
      if (prop !== '0-9') {
        delete azObject[prop]
      }
    }
  }

  azObject['0-9'] = azValNameNonAlpha

  // prepare the route property
  for (let value in azObject) {
    azObject[value].forEach((item) => {
      item.routeTo = `${Config.routerSettings.makerDetail}${item.id}/${friendlyUrl(item.name)}`
    })
  }
  return azObject
}

export {
  isTouch,
  stopZoomingWhenDoubleTapped,
  getRouteFromWpMenus,
  friendlyMonth,
  removeArrayDuplicates,
  findOccurences,
  friendlyUrl,
  sortObjectProperties,
  getNthFragment,
  getSubstringBetweenSubstrings,
  cleanupAuthCanceledSessions,
  isEmail,
  isWebsite,
  azDirectory
}
