(function() {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];

function LunchCheckController ($scope) {
  $scope.lunchList = "";
  $scope.message = "";
  $scope.lunchListClass = "";

  $scope.checkLunchList = function () {
    
    // Validate that data was entered
    if ($scope.lunchList == "") {
      $scope.message = "Please enter data first";
      $scope.lunchListClass = "red";
    } else {
      $scope.lunchListClass = "green";
      var lunchItems = $scope.lunchList.split(",");
      var lunchItemCount = 0;
      
      // Count lunch items, excluding empty
      for (var i = 0; i < lunchItems.length; i++) {
        var lunchItem = lunchItems[i];

        if (lunchItem.trim() != "") {
          lunchItemCount++;
        }
      }

      // Display response mesage
      if (lunchItemCount > 3) {
        $scope.message = "Too much!";
      } else {
        $scope.message = "Enjoy!";
      }
    }
  };

};

})();