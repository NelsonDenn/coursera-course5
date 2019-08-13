(function() {
'use strict';

angular.module('NarrowItDown', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('ApiBasePath', 'https://davids-restaurant.herokuapp.com');

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController (MenuSearchService) {
  var ctrl = this;
  ctrl.searchTerm = "";

  ctrl.search = function () {
    var promise = MenuSearchService.getMatchedMenuItems(ctrl.searchTerm);

    if (ctrl.searchTerm === "") {
      ctrl.found = [];
    } else {
      promise.then(function (response) {
        ctrl.found = response;
      })
      .catch(function (error) {
        console.log("There was an error getting menu items with descriptions containing '" + searchTerm + "': ", error);
      });
    }
  };

  ctrl.removeItem = function (index) {
    ctrl.found.splice(index, 1);
  };
};

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    })
    .then(function (response) {
      var menuItems = response.data.menu_items;

      // Process result and only keep items that match
      var foundItems = [];

      for (var i = 0; i < menuItems.length; i++) {
        var menuItem = menuItems[i];

        if (menuItem.description.indexOf(searchTerm.toLowerCase()) !== -1) {
          foundItems.push(menuItem);
        }
      }

      // Return processed items
      return foundItems;
    })

    return response;
  };
}

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      foundItems: '<',
      onRemove: '&'
    },
    restrict: 'E',
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true,
  };

  return ddo;
}

function FoundItemsDirectiveController() {
}

})();