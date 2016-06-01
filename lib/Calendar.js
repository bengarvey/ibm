function Calendar(options) {
    var width = options.width;
    var height = options.height;
    var startDate = options.startDate;
    var endDate = options.endDate;
    var dates = [];
    var svg;
    var index = 0;

  function cal() {
    svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("class", "date")
      .append("g")
        .attr("transform", "translate(32," + (height / 2) + ")");

      dates = generateDates(startDate, endDate);
  };

  cal.start = function() {
    update(dates);
    index = 0;
  }

  cal.tick = function() {
    if (dates.length > 0) {
      dates[index].visible = false;
      index += 1;
      if (index >= dates.length) {
        index = 0;
      }
      dates[index].visible = true;
      update(dates);
    }
    return dates[index].date;
  }

  function update(data) {
    // DATA JOIN
    var text = svg.selectAll("text")
        .data(data);

    // UPDATE
    text.attr("class", "update");

    // ENTER
    text.enter().append("text")
        .attr("class", "enter")
        //.attr("x", function(d) { return 100; })
        .attr("dy", ".35em")

    // ENTER + UPDATE
    text.text(function(d) { return d.date; })
        .attr("opacity", function(d) { return d.visible ? 1 : 0 })

    // EXIT
    text.exit()
      .remove();
  }

  function parseDateString(value) {
    year = value.slice(0,4);
    month = value.slice(5,7);
    day = value.slice(8,10);
    val = new Date(year, month, day);
    return val;
  }

  function generateDates(startDate, endDate) {
    dates = [];
    start = parseDateString(startDate);
    end = parseDateString(endDate);
    current = parseDateString(startDate)

    while(current < end) {
      day = prependZero(current.getDate());
      month = prependZero(current.getMonth() + 1);
      date = {
       "date": formatDate(current.getFullYear(), month, day),
        visible: false
      };
      dates.push(date);
      current.setDate(current.getDate() + 1);
    }
    return dates;
  }

  function formatDate(year, month, day) {
    return year + "-" + month + "-" + day;
  }

  function prependZero(value) {
    return value < 10 ? "0" + value : value;
  }

  return cal;
}
