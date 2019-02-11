const wpDomain = process.env.NODE_ENV === 'development' ? 'http://justgotmade.com:8888/' : 'http://wp.macep23.com/'

export default {
  apiUrlBase: '/',
  appTitle: 'Just Got Made',
  appTitleShort: 'JGM',
  appDescription: 'An ES6 Vue.js client consuming two APIs',
  appIcon: 'assets/app-icon.png',
  appLogo: '/static/images/logo.svg',
  missingImageUrl: '/static/no-img.png',
  missingAvatar: 'http://via.placeholder.com/100x100?text=AVATAR',
  wpDomain,
  apiV2Root: 'http://api.macep23.com/v2/',
  loadDbName: 'justGotMadeLocal',
  directoryBannerHeight: '300px',
  analyticsPath: '//www.google-analytics.com/analytics.js',
  activityLoaderImg: '/static/images/jgm-star-empty.svg',
  // genericCachingTime: 6e5,
  genericCachingTime: 864e5,
  verificationURLLifetime: 5, // time [days] for the verification URL Lifetime, sync with https://manage.auth0.com/#/emails -- URL Lifetime
  recentPostsNumber: 3,
  routerSettings: {
    userMetadataRetrievalUrl: 'https://jgm:eu:auth0:com/user_metadata', // sync this with https://manage.auth0.com/#/rules/rul_CQ7VKCGBHteUTP07
    about: '/about/',
    directory: '/directory/',
    directoryAll: '/directory/all',
    directoryDisabled: '/directory-draft-makers/',
    filterDirectory: '/directory/filterBy/',
    filterBy: {
      region: '/directory/filter-by/location/',
      products: '/directory/filter-by/products/',
      businessTypes: '/directory/filter-by/business-types/',
      serviceTypes: '/directory/filter-by/service-types/'
    },
    filterAZ: '/directory-A-Z/',
    makerDetail: '/directory/',
    journal: '/journal/',
    category: '/journal/category/',
    archive: '/journal/archive/',
    journalSingle: '/journal/',
    signUp: '/sign-up/',
    weekender: '/justgotmade-weekender/',
    weekenderExternal: 'http://www.justgotmadeweekender.com/',
    privacy: '/privacy-policy/',
    disclaimer: '/disclaimer/',
    userActivation: '/user-activation/',
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
    userActivationTitle: 'User Activation',
    userActivationSuccessMessage: 'Your email was verified.',
    userActivationSuccessMessage2: 'Now you\'re redirected to the login page where you can authenticate using your newly created credentials.',
    userActivationFailureMessage: 'User activation failed.',
    userActivationFailureMessage2: 'Please try to create a valid user.',
    contact: 'Contact',
    searchAll: 'Search all',
    searchResults: 'Search results',
    listAll: 'List all',
    suppliers: 'Suppliers',
    featuredSuppliers: 'Featured Suppliers',
    back: 'Go back',
    directory: {
      filterBy: 'Filter by',
      directory: 'Directory',
      draftMakers: 'Draft Makers',
      draft: 'Draft',
      address: 'Address',
      region: 'Region',
      materials: 'Materials',
      businessTypes: 'Business Types',
      productTypes: 'Product Types',
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
      directoryAZ: 'Directory A-Z',
      mainServices: 'Main Services',
      mainMaterialsUsed: 'Main Materials Used',
      typicalProductsMade: 'Typical Products Made',
      capacity: 'Capacity',
      cost: 'Cost',
      contactName: 'Contact name',
      position: 'Position',
      emailContact: 'Email Contact',
      getUs: 'Get Us',
      testimonials: 'Testimonials',
      ourStory: 'Our Story',
      thisCompanyIsSpecial: 'This Company is Special',
      getInTouch: 'Get in touch',
      getSpecific: 'Get Specific'
    },
    registerAndAuthentication: {
      titleReg: 'Create your new account',
      descriptionReg: 'Welcome to the locally made movement! Please take a minute to fill in your details below.',
      titleAuth: 'Login to your account',
      descriptionAuth: 'Full access to our directory data a couple of clicks away',
      descriptionAuth2: 'By signing into Just Got Made, you help to protect our craftspeople from spambots, we keep all your details private and protected.',
      socialSignIn: 'Sign in with social media:',
      titleResetPass: 'Reset your forgotten password',
      descriptionResetPass: 'Enter the email address you register with and we\'ll send you a link where you can change it',
      registerAgain: `Register again, previous atempt failed.`,
      orIfRememberHere: `Or if you recall, please login`,
      ifIsntYou: `If you didn't receive the email it's most likely that you mistyped the email address`,
      orRegisterHere: `If you don’t have an account, you can easily`,
      orRegisterNewHere: `Or if you want to make a new account, you can easily`,
      orLoginHere: `Already have an account? Please`,
      username: 'Username (= Email)',
      usernameOrEmail: 'Username or Email Address',
      email: 'Email',
      fullName: 'Full Name',
      firstName: 'First Name',
      lastName: 'Last Name',
      website: 'Website',
      password: 'Password',
      password2: 'Verify Password',
      password2placeholder: 'Re-type password',
      userRole: 'User Role',
      keepPass: 'Remember my password',
      error: 'Error:',
      success: 'Success:',
      userCreatedMessage: 'User created! Please check the email you register with for user activation.',
      pleaseValidateRegisterForm: 'Please make sure the register form is valid in order to be able to create a new user',
      pleaseValidateLoginForm: 'Please make sure the login form fields are valid.',
      pleaseValidateResetPassForm: 'Please make sure the email address is valid.',
      markedFields: 'Marked fields are required',
      loginSubmit: 'Login',
      resetPassSubmit: 'Reset Password',
      registerSubmit: 'Register',
      salutation: 'Hi',
      thanksForRegisteringTitle: 'Thanks for registering',
      thanksForRegistering: 'Thanks for registering with Just Got Made. It would really help us if you answered these simple questions (we\'re not making them public)',
      businessOrPersonalUse: 'Will you be using the Just Got Made Directory for Business or Personal uses?',
      partyHat: '/static/images/party-hat.png',
      topHat: '/static/images/top-hat.png',
      personalUse: 'Personal Use',
      businessUse: 'Business Use',
      companyName: 'Company Name',
      whereAreYou: 'Where are you',
      chooseLocation: 'Choose your location',
      whatInterestedIn: 'What are you interested in finding?',
      chooseInterest: 'Choose your interest',
      whatInterestedInOptions: ['Small to mid scale manufacturers', 'A maker to commission  ', 'Material suppliers ', 'Equipment suppliers ', 'Business services ', 'Design services ', 'Makerspaces/workspaces ', 'Other, please specify'],
      youMainAreaOfBusiness: 'What are your main areas of business?',
      chooseArea: 'Choose your business area',
      youMainAreaOfBusinessOptions: ['Accessories, Hats and Bags', 'Art and Prints', 'Beauty and Wellbeing', 'Bespoke Build and Fabrication', 'Ceramics, Glass and Metalwork', 'Children\'s Kit ', 'Crafts and Sewing', 'Design', 'Exhibition and Display', 'Fashion', 'Food & Drink', 'Furniture and Lighting', 'Interior Accessories and Homewares', 'Jewellery', 'Packaging', 'Personalised Merchandise', 'Printed Matter and Stationery', 'Props', 'Tech and Electronics Goods', 'Textiles', 'Toys & Games', 'Traditional Heritage Skills', 'Other, please specify'],
      offerNewsletter: 'Do you wish to receive the Just Got Made newsletter?',
      offerOffersAndInvites: 'Do you wish to receive our trade-only offers and invites to trade events?',
      agreed: 'By signing up I accept Just Got Made’s Terms & Conditions',
      save: 'Save',
      quitDontSave: 'Quit without saving'
    },
    searchPlaceholder: 'Search all suppliers, products, services, regions, tags…'
  },
  username: {
    length: {
      min: 6, // sync with https://manage.auth0.com/#/connections/database/con_0OrF26QugqaycgOY/settings - inclusive values
      max: 18
    }
  },
  password: {
    length: {
      min: 8, // sync with https://manage.auth0.com/#/connections/database/con_0OrF26QugqaycgOY/security - inclusive values
      max: 20
    }
  },
  postsIDs: {
    sliderPosts: 863,
    bannerPosts: 864,
    directoryBanners: 865
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
