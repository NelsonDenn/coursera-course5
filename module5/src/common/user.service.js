(function () {
"use strict";

angular.module('common')
.service('UserService', UserService);


UserService.$inject = ['MenuService'];
function UserService(MenuService) {
  var service = this;
  service.user = null;

  service.getUser = function () {
    return service.user;
  }

  service.signUp = function (user) {
    user.favoriteDish = user.favoriteDish.toUpperCase();

    return MenuService.getMenuItem(user.favoriteDish).then(function (response) {
      // Menu item exists. Save user
      service.user = user;
      return true;
    }).catch(function () {
      // Menu item was not found
      return false;
    });
  }
}

})();
