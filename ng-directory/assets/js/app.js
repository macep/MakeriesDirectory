(function() {'use strict';

	var spaSufix = '';
	var wpThemeDirectory = 'http://justgotmade.com:8888/wp-content/themes/justgotmade';
    // var wpThemeDirectory = 'http://www.justgotmade.com/website/wp-content/themes/justgotmade';
    var ngDirLocation = wpThemeDirectory + '/ng-directory/';
	var isLive = true;



	angular.module('makeries', [
		'ga',
		'ui.router',
		'angular.filter'
		])

	.config(config)

	.run(run)

	.factory("ApiService", ApiService)
	.factory("FilteredContentService", FilteredContentService)

	.directive('makeTitle', makeTitle)
	.directive('makeAccordion', makeAccordion)
	.directive('appView', appView)
	.directive('googleMap', googleMap)
	.directive('analyticsLink', analyticsLink)

	.controller('DirectoryController', DirectoryController)
	.controller('ListingController', ListingController)
	.controller('FilterController', FilterController)
	.controller('AZFilterController', AZFilterController)
	.controller('DetailController', DetailController)
	;




	// config
	config.$inject = ['$stateProvider', '$locationProvider'];
	function config($stateProvider, $locationProvider) {

		$stateProvider
		.state('directory', {
			url: '',
			templateUrl: isLive ? ngDirLocation + 'templates/directory.html' : './templates/directory.html',
			controller: 'DirectoryController',
			controllerAs: 'vm',
			title: 'List',
			redirectTo: 'directory.list'
		})
		.state('directory.list', {
			url: '/suppliers',
			templateUrl: isLive ? ngDirLocation + 'templates/listing.html' : './templates/listing.html',
			controller: 'ListingController',
			controllerAs: 'vm',
			title: 'List'
		})
		.state('directory.filter', {
			url: '/suppliers/filter-by/:filter/:search',
			templateUrl: isLive ? ngDirLocation + 'templates/filtering.html' : './templates/filtering.html',
			controller: 'FilterController',
			controllerAs: 'vm'
		})
		.state('directory.az', {
			url: '/suppliers/az-filter',
			templateUrl: isLive ? ngDirLocation + 'templates/azfiltering.html' : './templates/azfiltering.html',
			controller: 'AZFilterController',
			controllerAs: 'vm',
			title: 'Filtering Options'
		})
		.state('details', {
			url: '/supplier/details/:id/:page',
			templateUrl: isLive ? ngDirLocation + 'templates/details.html' : './templates/details.html',
			controller: 'DetailController',
			controllerAs: 'vm'
		})
		;

		$locationProvider.html5Mode({
			enabled: false,
			requireBase: false
		});

		$locationProvider.hashPrefix(spaSufix);
	}




	// run
	run.$inject = ['$rootScope', '$state', '$location', '$window'];
	function run($rootScope, $state, $location, $window) {
		FastClick.attach(document.body);

		$rootScope.$on("$locationChangeStart", function (event, nextUrl, currentUrl) {
			$window.ga && $window.ga('send', 'pageview', {'page': nextUrl});
		});

		$rootScope.$on('$stateChangeStart', function(e, to, params) {
			if (to.redirectTo) {
				e.preventDefault();
				$state.go(to.redirectTo, params)
			}
		});
	}




	// ApiService
	ApiService.$inject = ['$http', '$q', '$log'];
	function ApiService($http, $q, $log) {

        var ApiService = function () {};

        ApiService.prototype.callApi = function (method, uri, id, data, callOptions) {
            var token = 'MzM0N2NjYTItOTgwYy00YTE0LWExNGItNTlkMGZlYzZkMTc4OjQ2ZGU4MzI3LWM3ZDItNGVkMi1iYjFjLTBlMTExZmZhYzMyOQ==';

            var result = $q.defer();
            var timeout = $q.defer();

            var apiConfig = {};
            var options = callOptions || {};
            var hasTimedOut = false;
            var timeoutSecConst = 3e4;

            var headers = {
                'useXDomain': true,
                'X-Requested-With': '',
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': token ? "Basic " + token : null
            };

            var completeUrl = '';
            var apiOptions = {};

            apiConfig.apiPath = 'http://makeriesnew.azurewebsites.net/';
            // if absoluteUri is present in the callOptions, then apiPath will be ignored
            completeUrl = options.absoluteUri ? uri : apiConfig.apiPath + (id ? uri += id : uri);

            apiOptions = {
                url: completeUrl,
                method: method,
                headers: headers,
                timeout: timeout.promise,
                cache: true
            };

            setTimeout(function () {
                hasTimedOut = true;
                timeout.resolve();
            }, (timeoutSecConst));

            $http(apiOptions)
                .success(function (data) {
                    result.resolve(data);
                })
                .error(function (data, status) {
                    if (hasTimedOut) {
                        status = 408;
                        $log.error('Invoke API: time out after ' + timeoutSecConst + ' seconds. On call to: ' + completeUrl);
                    }
                    result.reject({statusCode: status, details: data});
                });

            return result.promise;
        };

        return new ApiService();
	}




	// FilteredContentService
	FilteredContentService.$inject = [];
	function FilteredContentService() {
		var filteredContent = [];

		return {
			update: function(o) {
				filteredContent = o;
				return filteredContent;
			},
			get: function() {
				return filteredContent;
			}
		}
	}




	// makeTitle
	makeTitle.$inject = ['$rootScope', '$location'];
	function makeTitle($rootScope, $location) {
		return {
			restrict: 'A',

			link: function () {

				$rootScope.$on('$stateChangeSuccess', function (event, toState) {
					var title = 'Just Got Made';
					var uriString = $location.$$url.split('/');

					switch (uriString[1]) {
						case 'Details':
						title += ' | ' + uriString[3].split('-').join(' ');
						break;

						case 'FilterBy':
						title += ' | filter ' + uriString[2].split('-').join(' ') + ' by ' + uriString[3].split('-').join(' ');
						break;
						default:
						title += toState.title ? ' | ' + toState.title : '';
					}

					window.document.title = title;
				});
			}
		};
	}

	// makeAccordion
	makeAccordion.$inject = ['$rootScope', '$location'];
	function makeAccordion($rootScope, $location) {
		return {
			restrict: 'A',

			link: function (scope, element, attrs) {
				element.find('.widget-title').on('click', function(e) {
					$(this).toggleClass('active');
					$(this).parent().toggleClass('active');
				});
			}
		};
	}

  	// appView
	function appView () {
	  	return {

	  		scope: {
	  			view: '=appView'
	  		},

	  		replace: true,

	  		template: 	'<div class="switch-view">' +
						'<img ng-repeat="v in views" ng-bind="v.name" ng-click="switchView(v, $event)" ng-src="{{v.icon}}" title="{{v.name}}"/>' +
						'</div>',

	  		link: function(scope, el, attr) {
	  			scope.views = [
	  			{
	  				name: 'List',
	  				template: ngDirLocation + 'templates/list.html',
	  				icon: ngDirLocation + 'assets/iconic/list.svg'
	  			},
	  			{
	  				name: 'Grid',
	  				template: ngDirLocation + 'templates/grid.html',
	  				icon: ngDirLocation + 'assets/iconic/grid.svg'
	  			}
	  			];
	  		},

	  		controller: ['$scope', function($scope) {
	        // init the product listing with the grid view
	        $scope.view = ngDirLocation + 'templates/grid.html';

	        $scope.switchView = function(view, event) {
	        	$(event.target).closest('.switch-view').find('img').removeClass('active');
	        	$(event.target).addClass('active');
	        	$scope.view = view.template;

	          // usafe, should be updated
	          $('.animate-repeat.entry-content').css('width', $scope.view.split('/')[9].split('.')[0] === 'grid' ? '33.33%' : '100%');
	        }
	      }]
	    }
	}

	// googleMap
	function googleMap() {
		return {
			template: '<iframe width="200" height="150" frameborder="0" style="border:0"></iframe>',
			restrict: 'E',
			scope: {
				pbcode: '='
			},
			link: function postLink(scope, element) {
				var mapFrame = element.find('iframe');
				mapFrame.attr('src', scope.pbcode ? "https://www.google.com/maps/embed?pb=" + scope.pbcode : '');
			}
		};
	}

	// analyticsLink
	function analyticsLink() {
		return {
			restrict: 'A',
			link: function (scope, element, attributes) {
				element.on('click', function() {
					if (attributes['analyticsLink'] != 'mail') {
						ga('set', 'dimension5', 'External Page');
				        ga('send', 'websiteview', {title: 'Suppliers external page'});
					} else {
						ga('set', 'dimension6', 'Suppliers email');
				        ga('send', 'email', {title: 'Suppliers email'});
					}
				});
			}
		};
	}




	// DirectoryController
	DirectoryController.$inject = ['$scope', 'ApiService', 'FilteredContentService', 'ga'];
	function DirectoryController ($scope, ApiService, FilteredContentService, ga) {
		var vm = this;

		vm.loading = true;

		ApiService.callApi('GET', 'api/makers/GetByGroupId/', 3, undefined, undefined)
		.then(function(response) {
			var regionCollection = [];
			var businessTypesCollection = [];
			var productsCollection = [];
			var customerCollection = [];
			var serviceTypesCollection = [];

			vm.suppliersNumber = response.length;

			// region
			_.each(response, function(item) {
				if (!_.isNull(item.region)) {
					regionCollection.push(item.region.name);
				}
			});

			vm.region = findOccurences(regionCollection);


			// businesssTypes
			_.each(response, function(item) {
				if (!_.isNull(item.businessTypes)) {
					_.each(item.businessTypes, function(i) {
						businessTypesCollection.push(i.name);
					});
				}
			});

			vm.businesssTypes = findOccurences(businessTypesCollection);


			// // product types
			_.each(response, function(item) {
				if (!_.isNull(item.products)) {
					_.each(item.products, function(i) {
						productsCollection.push(i.name);
					});
				}
			});

			vm.products = findOccurences(productsCollection);


			// customer
			_.each(response, function(item) {
				if (!_.isNull(item.projects)) {
					_.each(item.projects, function(i) {
						customerCollection.push(i.projectName);
					});
				}
			});

			vm.customer = findOccurences(customerCollection);


			// servicesTypes
			_.each(response, function(item) {
				if (!_.isNull(item.serviceTypes)) {
					_.each(item.serviceTypes, function(i) {
						serviceTypesCollection.push(i.name);
					});
				}
			});

			vm.serviceTypes = findOccurences(serviceTypesCollection);

			// find occurences algorithm
			function findOccurences(array) {
				var a = [], b = [], c = [], prev;

				array.sort();

				for ( var i = 0; i < array.length; i++ ) {
					if ( array[i] !== prev ) {
						a.push(array[i]);
						b.push(1);
					} else {
						b[b.length-1]++;
					}
					prev = array[i];
				}

				for (var i = 0; i < a.length; i++) {
					c.push({
						filter: a[i],
						urlFriendly: a[i].split(' ').join('-'),
						occurence: b[i]
					});
				}

				return c;
			}

			return response;
		})
		.then(function(response) {
			vm.filterContent = function (t1, t2) {
				var filteredData = {
					title: '',
					data: []
				};

				_.each(response, function(item) {
					var found = false;
					if (_.has(item, t1)) {
						if (_.isArray(item[t1])) {
							_.each(item[t1], function(i) {
								if (i.name) {
									if (i.name === t2) {
										updateCollectionWhenCondition(found, item, filteredData);
									}
								} else {
									if (_.contains(item[t1], t2)) {
										updateCollectionWhenCondition(found, item, filteredData);
									}
								}
							});
						} else {
							if (item[t1].name === t2) {
								updateCollectionWhenCondition(found, item, filteredData);
							}
						}
					}
				});

				function updateCollectionWhenCondition(a, b, c) {
					a = false;
					_.each(c, function(o) {
						if (o.name === b.name) {
							a = true;
						}
					});
					if (!a) {
						c.data.push(b);
					}
				}

				filteredData = {
					title: t2,
					data: _.uniq(filteredData.data)
				};

				_.each(filteredData.data, function (item) {
					item.route = item.name.split(' ').join('-');
				});

				FilteredContentService.update(filteredData);
			};

			vm.loading = false;
		});
	}

	// ListingController
	ListingController.$inject = ['$scope', 'ApiService'];
	function ListingController ($scope, ApiService) {
		var vm = this;

		vm.view =  ngDirLocation + '/templates/grid.html';

		ApiService.callApi('GET', 'api/makers/GetByGroupId/', 3, undefined, undefined).then(function(response) {
			vm.data = response;

			_.each(vm.data, function (item) {
				item.route = item.name.split(' ').join('-');
			});

			vm.featured = _.filter(vm.data, function(item){ return item.featured === true; });
		});

		ga('set', 'dimension1', 'Suppliers');
        ga('send', 'pageview', {title: 'Suppliers page'});
	}

	// FilterController
	FilterController.$inject = ['$scope', '$location', '$window', 'FilteredContentService'];
	function FilterController ($scope, $location, $window, FilteredContentService) {
		var vm = this;

		vm.view =  ngDirLocation + '/templates/grid.html';

		vm.filtered = FilteredContentService.get();
		// redirect to home page if they refresh the page on the filtering section
		if ( vm.filtered < 1 && $location.$$path.split('/')[1] === 'filter-by' ) {
			$window.location = '/directory/#/';
		}

		_.each(vm.filtered.data, function (item) {
			item.route = item.name.split(' ').join('-');
		});

		ga('set', 'dimension2', 'Filtering');
        ga('send', 'pageview', {title: 'Filtering page '});
	}

	// AZFilterController
	AZFilterController.$inject = ['$scope', 'ApiService'];
	function AZFilterController ($scope, ApiService) {
		var vm = this;
		var letter = '';
		var azObject = {};
		var azValNameNonAlpha = [];

		ApiService.callApi('GET', 'api/makers/GetByGroupId/', 3, undefined, undefined).then(function(response) {

			// sort the collection by initial char, case insensitive
			_.each(response, function(o) {
				letter = o.name.charAt(0).toUpperCase();

				if (azObject[letter] == undefined) {
					azObject[letter] = [];
				}

				azObject[letter].push(o);
			});

			// now look after sub collections that are non alpha
			// and put them all in a single sub collection
			_.each(azObject, function(val, prop) {
				if (prop.match(/^[A-Za-z]+$/) === null) {
					azValNameNonAlpha = _.union(azValNameNonAlpha, val);

					if (prop !== '0-9') {
						delete azObject[prop];
					}
				}
			});

			// add the collected values to a newly created property
			azObject['0-9'] = azValNameNonAlpha;

			// put the result in the scope
			vm.azData = azObject;

			// prepare the route property
			_.each(vm.azData, function (value, key) {
				_.each(value, function(item){
					item.route = item.name.split(' ').join('-');
				});
			});
		});


		ga('set', 'dimension3', 'AZ Filtering');
        ga('send', 'pageview', {title: 'AZ Filtering page '});
	}

	// DetailController
	DetailController.$inject = ['$scope', 'ApiService', '$location'];
	function DetailController ($scope, ApiService, $location) {
		var idFromUri = +$location.$$url.split('/')[3];
		var vm = this;
		vm.loading = true;

		ApiService.callApi('GET', 'api/makers/GetById/', idFromUri, undefined, undefined).then(function(response) {
			vm.detail = response;

			vm.detail.processedTags = [];

			if (vm.detail.businessTypes.length > 0) {
				_.each(vm.detail.businessTypes, function(bt) {
					bt.urlFriendly = bt.name.replace(/\s/g,'-');
				});
			}

			if (vm.detail.products.length > 0) {
				_.each(vm.detail.products, function(p) {
					p.urlFriendly = p.name.replace(/\s/g,'-');
				});
			}

			if (vm.detail.serviceTypes.length > 0) {
				_.each(vm.detail.serviceTypes, function(st) {
					st.urlFriendly = st.name.replace(/\s/g,'-');
				});
			}

			if (vm.detail.tags.length > 0) {
				_.each(vm.detail.tags, function(tag) {
					vm.detail.processedTags.push({name: tag, urlFriendly: tag.replace(/\s/g,'-') });
				});
			}
			delete vm.detail.tags;

			vm.detail.region.urlFriendly = vm.detail.region.name.replace(/\s/g,'-');

			vm.loading = false;

			ga('set', 'dimension4', 'Details');
	        ga('send', 'pageview', {title: 'Details page ' + vm.detail.name});
		});
	}

})();
