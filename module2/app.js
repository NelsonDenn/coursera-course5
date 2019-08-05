(function() {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckoffService', ShoppingListCheckoffService);

ToBuyController.$inject = ['ShoppingListCheckoffService'];
function ToBuyController (ShoppingListCheckoffService) {
  var toBuyController = this;

  toBuyController.items = ShoppingListCheckoffService.getItemsToBuy();

  toBuyController.buyItem = function (itemIndex) {
    ShoppingListCheckoffService.buyItem(itemIndex);
  };
};

AlreadyBoughtController.$inject = ['ShoppingListCheckoffService'];
function AlreadyBoughtController (ShoppingListCheckoffService) {
  var alreadyBoughtController = this;

  alreadyBoughtController.items = ShoppingListCheckoffService.getItemsBought();
};

function ShoppingListCheckoffService() {
  var service = this;

  var itemsToBuy = [
    {
      name: "cookies",
      quantity: 10
    },
    {
      name: "gallons of milk",
      quantity: 2
    },
    {
      name: "doughnuts",
      quantity: 12
    },
    {
      name: "muffins",
      quantity: 3
    },
    {
      name: "cartons of eggs",
      quantity: 5
    },
  ];
  var itemsBought = [];

  service.getItemsToBuy = function () {
    return itemsToBuy;
  };

  service.getItemsBought = function () {
    return itemsBought;
  };

  service.buyItem = function (itemIndex) {
    itemsBought.push(itemsToBuy[itemIndex]);
    itemsToBuy.splice(itemIndex, 1);
  };
}

})();