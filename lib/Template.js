function ClassName(options) {
  var width = options.width;
  var height = options.height;
  var data = [];

  function my() {
    svg = d3.select("svg")
      .append("g")
        .attr("transform", "translate(32," + (height / 2) + ")");

    allData = generate();
  };

  my.start = function() {
  }

  my.currentDate = function(date) {
    if (date != null) {
      currentDate = date;
      allEvents.forEach(function(e) {
        if (data.indexOf(e) < 0 && e.date == currentDate) {
          data.unshift(e);
          if (data.length > 4) {
            data.pop();
          }
          update(data);
        }

      });
      console.log(data);
    }
    return currentDate;
  }

  function update(myData) {

    // DATA JOIN
    text = svg.selectAll(".data")
      .data(myData);

    // UPDATE
    text.attr("class", "data");

    // ENTER
    text.enter().append("text")
        .attr("class", "data")
        .attr("dy", ".35em")
        .attr("fill", "#222")
        .style("font-size", "15px")
        .attr("x", 100)

    // EXIT
    text.exit()
      .transition()
      .duration(100)
      .attr("opacity", 1)
      .attr("y", function(d, i) { return 30 + (20*i); })
      .remove();

    // ENTER + UPDATE
    text.text(function(d, i) { return d.date + " " + d.name; })
        .attr("opacity", function(d,i) { return i == 0 ? 0 : 0.5; })
        .attr("y", function(d,i) { return 30 + (20*(i-1)); })
        .transition()
        .duration(500)
        .attr("opacity", 0.5)
        .attr("y", function(d, i) { return 30 + (20*i); })

  }

  function generate() {
    points = [
      {"date": '2015-02-05', "name": "Series A"},
      {"date": '2015-02-15', "name": "Series B"},
      {"date": '2015-02-20', "name": "VP of Product First Day"},
      {"date": '2015-03-13', "name": "Blog Post"},
      {"date": '2015-03-21', "name": "Product Launch"},
      {"date": '2015-05-05', "name": "Cinco De Mayo"}
    ];
    return points;
  }

  return my;
}
