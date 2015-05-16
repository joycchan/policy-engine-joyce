'use strict';

angular.module('policyEngine')
  .directive('donut', function () {
    return {
      templateUrl: 'scripts/directives/donut/donut.html',
      controller: function ($scope) {
      },
      scope: {
        data: '=',
        type: '@'
      },
      restrict: 'EA',
      link: function postLink(scope, element, attrs) {
        var init = function () {
          console.log('data', scope.data);
          var width = 500,
            height = 300,
            radius = Math.min(width, height) / 2;

          var labelBuffer = 60;
          var circleWidth = 18;
          var arc = d3.svg.arc()
            .outerRadius(radius)
            .innerRadius(radius - circleWidth);

          var pie = d3.layout.pie()
            .sort(null)
            .value(function() { return 1; });


          var svg = d3.select(element.find('.donut')[0]).append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


          var g = svg.selectAll(".arc")
            .data(pie(scope.data))
            .enter().append("g")
            .attr("class", "arc");

          g.append("path")
            .attr("d", arc)
            .style("fill", function (d, i) {
              var provide = "#D3E48D";
              var consume = "#5DCAA2";
              if (scope.type === 'provide') {
                return provide;
              } else if (scope.type === 'consume') {
                return consume;
              }
            });

          g.append("text")
            .attr("transform", function (d) {
              var c = arc.centroid(d),
                x = c[0],
                y = c[1],
              // pythagorean theorem for hypotenuse
                h = Math.sqrt(x*x + y*y);
              var labelRadius = radius + labelBuffer;
              return "translate(" + (x/h * labelRadius) +  ',' +
                (y/h * labelRadius) +  ")";
            })
            .attr("dy", ".35em")
            .style("text-anchor", "middle")
            .text(function (d) {
              return d.data;
            });
        };


        scope.$watch('data', function () {
          if (scope.data && scope.data.length) {
            init();
          }
        }, true);
      }
    };
  });
