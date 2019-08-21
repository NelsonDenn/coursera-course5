(function() {
'use strict';

angular.module('MenuApp')
.controller('ItemsController', ItemsController);

ItemsController.$inject = ['items'];
function ItemsController(items) {
  var itemsController = this;
  itemsController.categoryName = items.category.name;
  itemsController.items = items.menu_items;
}

})();