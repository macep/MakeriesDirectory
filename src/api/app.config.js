const Config = {
  apiUrlBase: '/',
  appTitle: 'Just Got Made',
  appTitleShort: 'JGM',
  appDescription: 'An ES6 Vue.js client consuming two APIs',
  appThemeColor: '#0D2B3B',
  appBgColor: '#EEC9C3',
  appIcon: 'assets/app-icon.png',
  missingImageUrl: 'assets/app-icon.png',
  wpDomain: 'http://justgotmade.com:8888/',
  dotNetDomain: 'http://makeriesnew.azurewebsites.net/',
  dotNetToken: 'MzM0N2NjYTItOTgwYy00YTE0LWExNGItNTlkMGZlYzZkMTc4OjQ2ZGU4MzI3LWM3ZDItNGVkMi1iYjFjLTBlMTExZmZhYzMyOQ==',
  loadDbName: 'justGotMadeLocal',
  analyticsPath: '//www.google-analytics.com/analytics.js',
  activityLoaderImg: '/static/images/jgm-star-empty.svg',
  genericCachingTime: 864e5,
  recentPostsNumber: 3,
  routerSettings: {
    about: '/about/',
    directory: '/directory/',
    filterDirectory: '/directory/filterBy/',
    filterBy: {
      region: '/directory/filter-by/location/',
      products: '/directory/filter-by/products/',
      businessTypes: '/directory/filter-by/business-types/',
      serviceTypes: '/directory/filter-by/service-types/'
    },
    filterAZ: '/directory-A-Z/',
    makerDetail: '/supplier/details/',
    journal: '/journal/',
    category: '/journal/category/',
    archive: '/journal/archive/',
    journalSingle: '/journal/',
    signUp: '/sign-up/',
    weekender: '/justgotmade-weekender/',
    privacy: '/privacy-policy/',
    disclaimer: '/disclaimer/',
    contact: '/contact/',
    newsletter: 'http://eepurl.com/lobiL'
  },
  titles: {
    archive: 'Achived posts:',
    category: 'Category:',
    searchAll: 'SEARCH ALL',
    suppliers: 'suppliers',
    directoryAZ: 'DIRECTORY A-Z'
  },
  postsIDs: {
    sliderPosts: 863,
    bannerPosts: 864
  },
  pagesIDs: {
    about: 2,
    directory: 5,
    journal: 7,
    privacy: 19,
    disclaimer: 21,
    contact: 23,
    aboutMore: 107,
    signup: 112,
    step1: 114,
    step2: 116,
    step3: 117,
    signupForm: 3688,
    aboutTitle: 3674,
    weekender: 3677
  },
  menusIDs: {
    primary: 2,
    secondary: 3
  },
  filterData: {
    regions: 'Location',
    businessTypes: 'WHO DO YOU NEED?',
    products: 'What are you making?',
    projects: 'Projects',
    customer: 'Customer',
    serviceTypes: 'WHAT DO YOU NEED?',
    suppliersNumber: 'Suppliers Number'
  },
  pageNotFound: {
    title: '',
    content: ''
  },
  social: {
    facebookUrl: 'http://www.facebook.com/sharer.php?u=',
    twitterURl: 'http://twitter.com/?status=',
    pinterestCode: '<a href="javascript:void((function()%7Bvar%20e=document.createElement(&apos;script&apos;);e.setAttribute(&apos;type&apos;,&apos;text/javascript&apos;);e.setAttribute(&apos;charset&apos;,&apos;UTF-8&apos;);e.setAttribute(&apos;src&apos;,&apos;http://assets.pinterest.com/js/pinmarklet.js?r=&apos;+Math.random()*99999999);document.body.appendChild(e)%7D)());" data-icon="\\e004"></a>'
  }
}

export default Config
