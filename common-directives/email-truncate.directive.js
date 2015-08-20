'use strict';
/**
 * @ngdoc directive
 * @name EmailTruncate
 *
 * @description
 * Truncate long email address.
 *
 * @restrict A
 * @element ANY
 * @param {emailTruncate} email address character that need to be skip (6 if not specified)
 * @param {skip} initial character that need to be skip (20 if not specified)
 * @param {max} max length for email address which skip the masked (60 if not specified).
 * @example

 <doc:example>
 <doc:source>
    <span email-truncate="variable" skip="6"  max="60"></span>
 </doc:source>
 </doc:example>
 *
 */
// @ngInject
module.exports = function EmailTruncateDirective() {
   return {
        restrict: 'A',
        replace: true,
        transclude:true,
        scope: {
            skip: '@skip',
            max: '@max',
            emailTruncate: '=emailTruncate'
        },
        link: function ($scope, $element) {
            var _max = 60, index = 20, _maskChar = '...';
            if ($scope.max) _max = $scope.max;
            if ($scope.skip) index = $scope.skip;
            if ($scope.emailTruncate && $scope.emailTruncate.length > _max) {
                $element.attr('title', $scope.emailTruncate);
                var emailName = $scope.emailTruncate.substr(0, index);
                var emailDomain = $scope.emailTruncate.substr($scope.emailTruncate.indexOf('@'));

               if (emailName.indexOf('@') >= 0) {
                    $element.text($scope.emailTruncate);
                } else {
                    $element.text(emailName + _maskChar + emailDomain);
                }

            }
              else {
                $element.text($scope.emailTruncate);
            }
        }
    };
};
