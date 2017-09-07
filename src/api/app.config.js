const Config = {
  apiUrlBase: '/',
  appTitle: 'Just Got Made',
  appTitleShort: 'JGM',
  appDescription: 'An ES6 Vue.js client consuming two APIs',
  appIcon: 'assets/app-icon.png',
  appLogo: '/static/images/logo.png',
  missingImageUrl: '/static/no-img.png',
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
    directoryDisabled: '/directory-draft-makers/',
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
    weekenderExternal: 'http://www.justgotmadeweekender.com/',
    privacy: '/privacy-policy/',
    disclaimer: '/disclaimer/',
    contact: '/contact/',
    newsletter: 'http://eepurl.com/lobiL'
  },
  titles: {
    defaultSalutation: 'Welcome to',
    about: 'About',
    journal: 'Journal',
    archive: 'Archived posts',
    archivesTitle: 'Archives',
    category: 'Category',
    categoriesTitle: 'Categories',
    youMightAlsoLike: 'You might also like',
    otherLinks: 'Other links',
    signUp: 'Sign Up',
    weekender: 'Weekender',
    privacyPolicy: 'Privacy Policy',
    disclaimer: 'Disclaimer',
    contact: 'Contact',
    searchAll: 'Search all',
    suppliers: 'Suppliers',
    back: 'Go back',
    directory: {
      filterBy: 'Filter by',
      directory: 'Directory',
      draftMakers: 'Draft Makers',
      region: 'Region',
      businessTypes: 'Business Types',
      products: 'Products',
      serviceTypes: 'Service types',
      filterData: {
        regions: 'Location',
        businessTypes: 'Who do you need?',
        products: 'What are you making?',
        projects: 'Projects',
        customer: 'Customer',
        serviceTypes: 'What do you need?',
        suppliersNumber: 'Suppliers Number'
      },
      description: 'Description',
      tags: 'Tags',
      contactDetails: 'Contact Details',
      openingHours: 'Opening Hours',
      socialNetworks: 'Social Networks',
      website: 'Website',
      map: 'Map',
      customer: 'Customer',
      makerDetails: 'Maker details',
      directoryAZ: 'Directory A-Z'
    },
    registerAndAuthentication: {
      titleReg: 'Register New User',
      descriptionReg: 'Create a brand new user and add them to this site',
      username: 'Username',
      email: 'Email',
      fullName: 'Full Name',
      firstName: 'First Name',
      lastName: 'Last Name',
      website: 'Website',
      password: 'Password',
      password2: 'Password Again',
      password2placeholder: 'Re-type password',
      userRole: 'User Role',
      keepPass: 'Remember my password',
      registerError: 'Error:',
      pleaseValidateRegisterForm: 'Please make sure the register form is valid in order to be able to create a new user',
      markedFields: 'Marked fields are required',
      registerSubmit: 'Register'
    },
    searchPlaceholder: 'Search supplier, products, services, region, tags...'
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
  pageNotFound: {
    title: '',
    content: ''
  },
  social: {
    sharer: {
      facebookUrl: 'http://www.facebook.com/sharer.php?u=',
      twitterURl: 'http://twitter.com/?status=',
      pinterestCode: '<a href="javascript:void((function()%7Bvar%20e=document.createElement(&apos;script&apos;);e.setAttribute(&apos;type&apos;,&apos;text/javascript&apos;);e.setAttribute(&apos;charset&apos;,&apos;UTF-8&apos;);e.setAttribute(&apos;src&apos;,&apos;http://assets.pinterest.com/js/pinmarklet.js?r=&apos;+Math.random()*99999999);document.body.appendChild(e)%7D)());" data-icon="\\e004"></a>'
    },
    links: {
      facebook: 'https://www.facebook.com/JustGotMade',
      twitter: 'https://twitter.com/Just_Got_Made',
      instagram: 'https://instagram.com/justgotmade/',
      theDots: 'http://the-dots.co.uk/justgotmade'
    }
  }
}

export default Config
