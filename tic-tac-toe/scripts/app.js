var app;

(function () {
    'use strict';
    app = angular.module("ticModule", [
        'ui.bootstrap']);


})();

(function () {

    app.controller('ticController', function ($scope, $http, $compile, $uibModal, $timeout) {

        $scope.ticArray = [null, null, null, null, null, null, null, null, null];

        $scope.letter = 'X';

        $scope.row1 = false;
        $scope.row2 = false;
        $scope.row3 = false;
        $scope.column1 = false;
        $scope.column2 = false;
        $scope.column3 = false;
        $scope.diagonal1 = false;
        $scope.diagonal2 = false;

        $scope.checkForWin = function () {

            if ($scope.ticArray[0] != null && $scope.ticArray[1] != null && $scope.ticArray[2] != null) {
                if ($scope.ticArray[0] == $scope.ticArray[1]
                    && $scope.ticArray[1] == $scope.ticArray[2]) {
                    $scope.row1 = true;
                    $scope.launchModal($scope.ticArray[0]);
                }

            }

            if ($scope.ticArray[3] != null && $scope.ticArray[4] != null && $scope.ticArray[5] != null) {
                if ($scope.ticArray[3] == $scope.ticArray[4]
                    && $scope.ticArray[3] == $scope.ticArray[5]) {
                    $scope.row2 = true;
                    $scope.launchModal($scope.ticArray[3]);
                }
            }

            if ($scope.ticArray[6] != null && $scope.ticArray[7] != null && $scope.ticArray[8] != null) {
                if ($scope.ticArray[6] == $scope.ticArray[7]
                    && $scope.ticArray[6] == $scope.ticArray[8]) {
                    $scope.row3 = true;
                    $scope.launchModal($scope.ticArray[6]);
                }
            }

            if ($scope.ticArray[0] != null && $scope.ticArray[3] != null && $scope.ticArray[6] != null) {
                if ($scope.ticArray[0] == $scope.ticArray[3]
                    && $scope.ticArray[0] == $scope.ticArray[6]) {
                    $scope.column1 = true;
                    $scope.launchModal($scope.ticArray[0]);
                }
            }

            if ($scope.ticArray[1] != null && $scope.ticArray[4] != null && $scope.ticArray[7] != null) {
                if ($scope.ticArray[1] == $scope.ticArray[4]
                    && $scope.ticArray[1] == $scope.ticArray[7]) {
                    $scope.column2 = true;
                    $scope.launchModal($scope.ticArray[1]);
                }
            }

            if ($scope.ticArray[2] != null && $scope.ticArray[5] != null && $scope.ticArray[8] != null) {
                if ($scope.ticArray[2] == $scope.ticArray[5]
                    && $scope.ticArray[2] == $scope.ticArray[8]) {
                    $scope.column3 = true;
                    $scope.launchModal($scope.ticArray[2]);
                }
            }

            if ($scope.ticArray[0] != null && $scope.ticArray[4] != null && $scope.ticArray[8] != null) {
                if ($scope.ticArray[0] == $scope.ticArray[4]
                    && $scope.ticArray[0] == $scope.ticArray[8]) {
                    $scope.diagonal1 = true;
                    $scope.launchModal($scope.ticArray[0]);
                }
            }

            if ($scope.ticArray[2] != null && $scope.ticArray[4] != null && $scope.ticArray[6] != null) {
                if ($scope.ticArray[2] == $scope.ticArray[4]
                    && $scope.ticArray[2] == $scope.ticArray[6]) {
                    $scope.diagonal2 = true;
                    $scope.launchModal($scope.ticArray[2]);
                }
            }

            if ($scope.ticArray[0] != null && $scope.ticArray[1] != null && $scope.ticArray[2] != null
                && $scope.ticArray[3] != null && $scope.ticArray[4] != null && $scope.ticArray[5] != null
                && $scope.ticArray[6] != null && $scope.ticArray[7] != null && $scope.ticArray[8] != null
                && $scope.row1 == false && $scope.row2 == false && $scope.row3 == false
                  && $scope.column1 == false && $scope.column2 == false && $scope.column3 == false
               && $scope.diagonal1 == false && $scope.diagonal2 == false) {
                $scope.launchModal(null);

            }

        }

        $scope.launchModal = function (letter) {
            $scope.disable = true;

            $timeout(function () {

                var winner = {};
                winner.letter = letter;

                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'winnerModal.html',
                    controller: 'winnerModalCtrl',
                    controllerAs: '$ctrl',
                    size: 'lg',

                    resolve: {
                        winner: winner
                    }
                });

                modalInstance.result.then(function () {

                    $scope.ticArray = [null, null, null, null, null, null, null, null, null];

                    $scope.letter = 'X';

                    $scope.row1 = false;
                    $scope.row2 = false;
                    $scope.row3 = false;
                    $scope.column1 = false;
                    $scope.column2 = false;
                    $scope.column3 = false;
                    $scope.diagonal1 = false;
                    $scope.diagonal2 = false;

                    $scope.disable = false;

                });

            }, 1200);

        }

        Array.prototype.isNull = function () {
            return this.join().replace(/,/g, '').length === 0;
        };

        $scope.$watch(function () {
            return $scope.ticArray;
        }, function (newValue, oldValue) {

            if (!$scope.ticArray.isNull()) {
                if ($scope.letter == 'X') {
                    $scope.letter = 'O'
                }
                else
                    $scope.letter = 'X'

                $scope.checkForWin();
            }

        }, true);

    });


})();

app.controller('winnerModalCtrl', ['$scope', '$uibModalInstance', 'winner',
    function ($scope, $uibModalInstance, winner) {

        $scope.letter = winner.letter

        $scope.restart = function () {

            $uibModalInstance.close('ok');

        };

        $scope.cancel = function () {

            $uibModalInstance.dismiss('cancel');

        };

    }]);