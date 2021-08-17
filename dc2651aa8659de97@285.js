// https://observablehq.com/@d3/world-choropleth@285
import define1 from "./a33468b95d0b15b0@703.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["countries-50m.json",new URL("./files/105124169f32536c2c86c7d6a237673814f21444a667f2cb8c4e2b3f7b3cfae56fac5346a6ac7fd5cc02b63fcda1b08ac4e86a7c86896e5eeb37b51ccceb8f69",import.meta.url)],["hale.csv",new URL("./files/b51e0b67725c9f4f6fad0318d640337b3451be7f9c7b8cee66e2cce64369444637402f13e2ce8a83ab013df9ece12f285d1cfd81c28faaaf7dad30f5eadda875",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# World Choropleth

Health-adjusted life expectancy, 2016. Data: [WHO](https://www.who.int/gho/publications/world_health_statistics/2018/en/)`
)});
  main.variable(observer()).define(["legend","color","data"], function(legend,color,data){return(
legend({color, title: data.title})
)});
  main.variable(observer("chart")).define("chart", ["d3","width","height","path","outline","location","countries","color","data","topojson","world"], function(d3,width,height,path,outline,location,countries,color,data,topojson,world)
{
  const svg = d3.create("svg")
      .style("display", "block")
      .attr("viewBox", [0, 0, width, height]);

  const defs = svg.append("defs");

  defs.append("path")
      .attr("id", "outline")
      .attr("d", path(outline));

  defs.append("clipPath")
      .attr("id", "clip")
    .append("use")
      .attr("xlink:href", new URL("#outline", location));

  const g = svg.append("g")
      .attr("clip-path", `url(${new URL("#clip", location)})`);

  g.append("use")
      .attr("xlink:href", new URL("#outline", location))
      .attr("fill", "white");

  g.append("g")
    .selectAll("path")
    .data(countries.features)
    .join("path")
      .attr("fill", d => color(data.get(d.properties.name)))
      .attr("d", path)
    .append("title")
      .text(d => `${d.properties.name}
${data.has(d.properties.name) ? data.get(d.properties.name) : "N/A"}`);

  g.append("path")
      .datum(topojson.mesh(world, world.objects.countries, (a, b) => a !== b))
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-linejoin", "round")
      .attr("d", path);

  svg.append("use")
      .attr("xlink:href", new URL("#outline", location))
      .attr("fill", "none")
      .attr("stroke", "black");

  return svg.node();
}
);
  main.variable(observer("data")).define("data", ["d3","FileAttachment","rename"], async function(d3,FileAttachment,rename){return(
Object.assign(new Map(d3.csvParse(await FileAttachment("hale.csv").text(), ({country, hale}) => [rename.get(country) || country, +hale])), {title: "Healthy life expectancy (years)"})
)});
  main.variable(observer("rename")).define("rename", function(){return(
new Map([
  ["Antigua and Barbuda", "Antigua and Barb."],
  ["Bolivia (Plurinational State of)", "Bolivia"],
  ["Bosnia and Herzegovina", "Bosnia and Herz."],
  ["Brunei Darussalam", "Brunei"],
  ["Central African Republic", "Central African Rep."],
  ["Cook Islands", "Cook Is."],
  ["Democratic People's Republic of Korea", "North Korea"],
  ["Democratic Republic of the Congo", "Dem. Rep. Congo"],
  ["Dominican Republic", "Dominican Rep."],
  ["Equatorial Guinea", "Eq. Guinea"],
  ["Iran (Islamic Republic of)", "Iran"],
  ["Lao People's Democratic Republic", "Laos"],
  ["Marshall Islands", "Marshall Is."],
  ["Micronesia (Federated States of)", "Micronesia"],
  ["Republic of Korea", "South Korea"],
  ["Republic of Moldova", "Moldova"],
  ["Russian Federation", "Russia"],
  ["Saint Kitts and Nevis", "St. Kitts and Nevis"],
  ["Saint Vincent and the Grenadines", "St. Vin. and Gren."],
  ["Sao Tome and Principe", "São Tomé and Principe"],
  ["Solomon Islands", "Solomon Is."],
  ["South Sudan", "S. Sudan"],
  ["Swaziland", "eSwatini"],
  ["Syrian Arab Republic", "Syria"],
  ["The former Yugoslav Republic of Macedonia", "Macedonia"],
  // ["Tuvalu", ?],
  ["United Republic of Tanzania", "Tanzania"],
  ["Venezuela (Bolivarian Republic of)", "Venezuela"],
  ["Viet Nam", "Vietnam"]
])
)});
  main.variable(observer("color")).define("color", ["d3","data"], function(d3,data){return(
d3.scaleSequential()
    .domain(d3.extent(Array.from(data.values())))
    .interpolator(d3.interpolateYlGnBu)
    .unknown("#ccc")
)});
  main.variable(observer("projection")).define("projection", ["d3"], function(d3){return(
d3.geoEqualEarth()
)});
  main.variable(observer("path")).define("path", ["d3","projection"], function(d3,projection){return(
d3.geoPath(projection)
)});
  main.variable(observer("width")).define("width", function(){return(
975
)});
  main.variable(observer("height")).define("height", ["d3","projection","width","outline"], function(d3,projection,width,outline)
{
  const [[x0, y0], [x1, y1]] = d3.geoPath(projection.fitWidth(width, outline)).bounds(outline);
  const dy = Math.ceil(y1 - y0), l = Math.min(Math.ceil(x1 - x0), dy);
  projection.scale(projection.scale() * (l - 1) / l).precision(0.2);
  return dy;
}
);
  main.variable(observer("outline")).define("outline", function(){return(
{type: "Sphere"}
)});
  main.variable(observer("countries")).define("countries", ["topojson","world"], function(topojson,world){return(
topojson.feature(world, world.objects.countries)
)});
  main.variable(observer("world")).define("world", ["FileAttachment"], function(FileAttachment){return(
FileAttachment("countries-50m.json").json()
)});
  main.variable(observer("topojson")).define("topojson", ["require"], function(require){return(
require("topojson-client@3")
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@6")
)});
  const child1 = runtime.module(define1);
  main.import("legend", child1);
  return main;
}
