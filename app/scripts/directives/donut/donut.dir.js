'use strict';

angular.module('policyEngine')
  .directive('donut', function () {
    return {
      templateUrl: 'scripts/directives/donut/donut.html',
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

        var radius = 108,
          margin = {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
          };

        var width = radius * 2 + margin.left + margin.right;
        var height = radius * 2 + margin.top + margin.bottom;

        var labelBuffer = 60;
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
            .style("fill", function (d, i) {
              var serviceCentric = "#62A6D1";
              var groupCentric = "#5DCAA2";
              if (scope.type === 'serviceCentric') {
                return serviceCentric;
              } else if (scope.type === 'groupCentric') {
                return groupCentric;
              }
            });

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
              //if (scope.type === 'groupCentric') {
                //t.append('tspan').text('(' + d.data.group.name + ')')
                  //.attr('x', 0).attr('dy', '15');
              //}
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

