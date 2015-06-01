'use strict';

angular.module('policyEngine')
  .directive('simpleDonut', function () {
    return {
      templateUrl: 'scripts/directives/simple-donut/simple-donut.html',
      controller: function ($scope) {
      },
      scope: {
        data: '=',
        name: '=',
        type: '@',
        drop: '='
      },
      restrict: 'EA',
      link: function postLink(scope, element, attrs) {
        var svg;

        var radius = 60,
          margin = {
            top: 0,
            bottom: 0,
            left: 88,
            right: 88
          };

        var width = radius * 2 + margin.left + margin.right;
        var height = radius * 2 + margin.top + margin.bottom;

        var labelBuffer = 60;
        var circleWidth = 10;
        var arc = d3.svg.arc()
          .outerRadius(radius)
          .innerRadius(radius - circleWidth);

        var pie = d3.layout.pie()
          .sort(null)
          .value(function () {
            return 1;
          });

        var init = function () {

          d3.select(element[0]).selectAll('svg').remove();


          svg = d3.select(element.find('.simple-donut')[0]).append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        };

        var drawArcs = function () {

          var g = svg.selectAll(".arc")
            .data(pie(scope.data))
            .enter().append("g")
            .attr("class", "arc");

          g.append("path")
            .attr("d", arc)
            .style("fill", function (d, i) {
              var provide = "#62A6D1";
              var consume = "#5DCAA2";
              if (scope.type === 'provide') {
                return provide;
              } else if (scope.type === 'consume') {
                return consume;
              }
            });

        };

        init();

        scope.$watch('data', function () {
          if (scope.data && scope.data.length) {
            init();
            drawArcs();
          }
        }, true);
      }
    }
      ;
  })
;

