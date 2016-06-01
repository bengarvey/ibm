function Map(options) {
  var width = options.width;
  var height = options.height;
  var data = [];
  var prefix = prefixMatch(["webkit", "ms", "Moz", "O"]);
  var map;
  var layer;
  var info;
  var tile, projection, zoom;

  function my() {

    tile = d3.geo.tile()
      .size([width, height]);

    projection = d3.geo.mercator();

    zoom = d3.behavior.zoom()
      .scale(12 << 12)
      .scaleExtent([1 << 9, 1 << 23])
      .translate([10800, 6300])
      .on("zoom", zoomed);

    map = d3.select("body").append("div")
      .attr("class", "map")
      .style("width", width + "px")
      .style("height", height + "px")
      .call(zoom)
      .on("mousemove", mousemoved);

    layer = map.append("div")
        .attr("class", "layer");

    info = map.append("div")
        .attr("class", "info");


    zoomed();
    //svg = d3.select("svg")
    //  .append("g")
    //    .attr("transform", "translate(32," + (height / 2) + ")");
    //allData = generate();
  };


  function zoomed() {
    var tiles = tile
        .scale(zoom.scale())
        .translate(zoom.translate())
        ();

    projection
        .scale(zoom.scale() / 2 / Math.PI)
        .translate(zoom.translate());

    var image = layer
        .style(prefix + "transform", matrix3d(tiles.scale, tiles.translate))
      .selectAll(".tile")
        .data(tiles, function(d) { return d; });

    image.exit()
        .remove();

    image.enter().append("img")
        .attr("class", "tile")
        .attr("src", function(d) { return "http://" + ["a", "b", "c"][Math.random() * 3 | 0] + ".tile.openstreetmap.org/" + d[2] + "/" + d[0] + "/" + d[1] + ".png"; })
        .style("left", function(d) { return (d[0] << 8) + "px"; })
        .style("top", function(d) { return (d[1] << 8) + "px"; });
  }

  function mousemoved() {
    info.text(formatLocation(projection.invert(d3.mouse(this)), zoom.scale()));
  }

  function matrix3d(scale, translate) {
    var k = scale / 256, r = scale % 1 ? Number : Math.round;
    return "matrix3d(" + [k, 0, 0, 0, 0, k, 0, 0, 0, 0, k, 0, r(translate[0] * scale), r(translate[1] * scale), 0, 1 ] + ")";
  }

  function prefixMatch(p) {
    var i = -1, n = p.length, s = document.body.style;
    while (++i < n) if (p[i] + "Transform" in s) return "-" + p[i].toLowerCase() + "-";
    return "";
  }

  function formatLocation(p, k) {
    var format = d3.format("." + Math.floor(Math.log(k) / 2 - 2) + "f");
    return (p[1] < 0 ? format(-p[1]) + "°S" : format(p[1]) + "°N") + " "
        + (p[0] < 0 ? format(-p[0]) + "°W" : format(p[0]) + "°E");
  }

  /*
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
    text = svg.selectAll(".map")
      .data(myData);

    // UPDATE
    text.attr("class", "map");

    // ENTER
    text.enter().append("text")
        .attr("class", "map")
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
  */
  return my;
}
