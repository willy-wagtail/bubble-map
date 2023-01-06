# Notes

https://github.com/topojson/world-atlas

https://unpkg.com/world-atlas@2.0.2/countries-50m.json

https://www.naturalearthdata.com/

https://en.wikipedia.org/wiki/GeoJSON

https://en.wikipedia.org/wiki/GeoJSON#TopoJSON

https://mapshaper.org/

Line Simplification

- Douglas-Peucker
  - removes points outwith a band
- Visvalingam
  - progressively removes points with least perceptible change.
  - may introduce intersections which needs removed

https://github.com/topojson/topojson#api-reference

- [feature](https://github.com/topojson/topojson-client/blob/master/README.md#feature) function converts a topojson to geojson feature or feature collection.
- [mesh](https://github.com/topojson/topojson-client/blob/master/README.md#mesh) function is useful for rendering strokes in complicated objects efficiently, as shared edges are only stroked once.
  - A filter can be passed to prune arcs from the mesh
  - (e.g. remove strokes from the globe that borders the sea but keep those that border another country).
