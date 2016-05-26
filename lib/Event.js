function Events(options) {
    var width = options.width;
    var height = options.height;
    var currentDate;
    var events = [];
    var svg;
    var index = 0;

  function ev() {
    svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height)
      .append("g")
        .attr("transform", "translate(32," + (height / 2) + ")");

    events = generate();
    console.log(events);
  };

  ev.start = function() {
    update(events);
  }

  ev.currentDate = function(date) {
    if (date != null) {
      currentDate = date;
      update(events);
    }
    return currentDate;
  }

  function update(data) {
    // DATA JOIN
    var text = svg.selectAll(".events")
        .data(data);

    // UPDATE
    text.attr("class", "events");

    // ENTER
    text.enter().append("text")
        .attr("class", "events")
        .attr("x", function(d) { return 200; })
        .attr("dy", ".35em")

    // ENTER + UPDATE
    text.text(function(d) { return d.name; })
        .transition()
        .duration(100)
        .attr("opacity", function(d) { return d.date == currentDate ? 1 : 0 })

    // EXIT
    text.exit()
      .remove();
  }

  function generate() {
    evs = [
      {"date": '2015-02-05', "name": "Series A"},
      {"date": '2015-02-15', "name": "Series B"},
      {"date": '2015-02-20', "name": "VP of Sales First Day"},
      {"date": '2015-03-13', "name": "Blog Post"},
      {"date": '2015-03-21', "name": "Product Launch"},
      {"date": '2015-05-05', "name": "Cinco De Mayo"}
    ];
    return evs;
  }

  return ev;
}
