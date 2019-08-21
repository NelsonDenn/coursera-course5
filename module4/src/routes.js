(function() {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider.state('home', {
    url: '/',
    templateUrl: 'src/templates/home.template.html'
  })
  .state('categories', {
    url: '/categories',
    templateUrl: 'src/templates/categories.wrapper.template.html',
    controller: 'CategoriesController as categoriesController',
    resolve: {
      categories: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getAllCategories();
      }]
    }
  })
  .state('items', {
    url: '/categories/{categoryShortName}/items',
    templateUrl: 'src/templates/items.wrapper.template.html',
    controller: 'ItemsController as itemsController',
    resolve: {
      items: ['$stateParams', 'MenuDataService', function ($stateParam, MenuDataService) {
        return MenuDataService.getItemsForCategory($stateParam.categoryShortName);
      }]
    }
  });
}

})();