// Copyright 2014 The Oppia Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Directive for the multiple-choice correct answer field in the
 *               simple editor view.
 */

oppia.directive('multipleChoiceCorrectAnswer', [function() {
  return {
    restrict: 'E',
    templateUrl: 'interaction/multipleChoiceCorrectAnswer',
    scope: {
      initCustomizationArgs: '&',
      initAnswerGroups: '&',
      identifier: '@',
      onEdit: '='
    },
    controller: [
      '$scope', 'focusService', 'explorationStatesService',
      function($scope, focusService, explorationStatesService) {
        $scope.focusLabel = focusService.generateFocusLabel();

        var init = function() {
          var customizationArgs = $scope.initCustomizationArgs();
          $scope.choices = customizationArgs.choices.value;
          $scope.answerGroups = $scope.initAnswerGroups();
        };

        $scope.selectCorrectAnswer = function(index) {
          if ($scope.answerGroups.length === 0) {
            // TODO(sll): Generate a new state name for this.
            explorationStatesService.addState('PLACEHOLDER', function() {
              $scope.answerGroups.push({
                outcome: {
                  // TODO(sll): Generate a new state name for this.
                  dest: 'PLACEHOLDER',
                  feedback: '',
                  param_changes: []
                },
                rule_specs: [{
                  inputs: {
                    x: index
                  },
                  rule_type: 'Equals'
                }]
              });
            });
          } else {
            $scope.answerGroups[0].rule_specs[0].inputs.x = index;
          }

          $scope.onEdit($scope.answerGroups);
          init();
        };

        init();
        $scope.$on('externalOpen', function() {
          // TODO(sll): Need to handle case when stuff changes above this
          // component.
          init();
        });
      }
    ]
  };
}]);
