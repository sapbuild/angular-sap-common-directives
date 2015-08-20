'use strict';

/**
 * @ngdoc directive
 * @name moreLess
 *
 * @description
 * Display/Hide child element of a container depending of the size (width) of the container.
 * Update the list of children displayed when a resize window event is trigger
 *
 * @restrict A
 * @element ANY
 * @param {numOfHidden} number of child element which are hidden
 * @example

 <doc:example>
 <doc:source>
    <div more-less num-of-hidden=="2"></div>
 </doc:source>
 </doc:example>
 *
 */

// @ngInject
module.exports = function () {
    return {
        restrict: 'A',
        scope: {
            numOfHidden: '='
        },
        link: function (scope, element) {
            var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
            var calculateNumberOfDivHidden = function (node) {
                var aNodeChildren = node.children;
                var iNodeChildrenCount = aNodeChildren.length;
                var iNumOfHidden = 0;
                // If only one child or no children, we do nothing
                if (iNodeChildrenCount <= 1) {
                    scope.numOfHidden = iNumOfHidden;
                    return;
                }
                // The first children offset will be the reference
                var offsetTop = aNodeChildren[0].offsetTop;
                for (var i = 1; i < iNodeChildrenCount; i++) {
                    if (aNodeChildren[i].offsetTop !== offsetTop) {
                        iNumOfHidden++;
                    }
                }
                scope.numOfHidden = iNumOfHidden;
            };
            var observer = new MutationObserver(function () {
                scope.$apply(function () {
                    calculateNumberOfDivHidden(element[0], false);
                });
            });
            var fnResizeListener = function () {
                scope.$apply(function () {
                    calculateNumberOfDivHidden(element[0], true);
                });
            };
            observer.observe(element[0], {
                childList: true,
                subtree: true,
                attributes: true
            });
            window.addEventListener('resize', fnResizeListener);
            element.on('$destroy', function () {
                window.removeEventListener('resize', fnResizeListener);
                observer.disconnect();
            });
        }
    };
};
