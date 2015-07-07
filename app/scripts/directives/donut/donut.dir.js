'use strict';

angular.module('policyEngine')
  .directive('donut', function (PolicyStore) {
    return {
      templateUrl: 'scripts/directives/donut/donut.html',
      controller: function ($scope) {
      },
      scope: {
        data: '=',
        radius: '@',
        group: '@'
      },
      restrict: 'EA',
      link: function postLink(scope, element, attrs) {
        var svg;

        var radius = parseInt(scope.radius);
        var margin = {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
          };

        var width = radius * 2 + margin.left + margin.right;
        var height = radius * 2 + margin.top + margin.bottom;

        var labelBuffer = 30;
        var circleWidth = 15;
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


          svg = d3.select(element.find('.donut')[0]).append("svg")
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

          g.append("text")
            .attr("transform", function (d) {
              var c = arc.centroid(d),
                x = c[0],
                y = c[1],
              // pythagorean theorem for hypotenuse
                h = Math.sqrt(x * x + y * y);
              var labelRadius = radius + labelBuffer;
              return "translate(" + (x / h * labelRadius) + ',' +
                (y / h * labelRadius) + ")";
            })
            .attr("dy", ".35em")
            .style("text-anchor", "middle")
            .text('')
            .each(function (d, i) {
              var t = d3.select(this)
              t.append('tspan').text(d.data.name)
              if (scope.group) {
                var group = PolicyStore.Groups.find({ id: d.data.providerGroupId });
                t.append('tspan').text('(' + group.name + ')')
                  .attr('x', 0).attr('dy', '15');
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

