(function () {
"use strict";

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['user', 'MenuService'];
function MyInfoController(user, MenuService) {
  var $ctrl = this;
  $ctrl.user = user;
  
  if (user) {
    MenuService.getMenuItem(user.favoriteDish).then(function (response) {
      $ctrl.favoriteDish = response;
    });
  }
}

})();
