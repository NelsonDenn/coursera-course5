(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['menuItems', 'MenuService', 'UserService'];
function SignUpController(menuItems, MenuService, UserService) {
  var $ctrl = this;

  // Loop over menu items and check whether the entered favorite dish (short name) is found
  $ctrl.menuItemExists = function () {
    for (var i = 0; i < menuItems.menu_items.length; i++) {
      if (menuItems.menu_items[i].short_name === $ctrl.user.favoriteDish.toUpperCase()) {
        return true;
      }
    }

    return false;
  }

  $ctrl.submit = function () {
    UserService.signUp($ctrl.user).then(function (response) {
      $ctrl.success = response;
    });
  };
}

})();
