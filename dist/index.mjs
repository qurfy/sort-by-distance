// src/index.ts
import get2 from "get-value";

// src/haversine-distance.ts
var deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};
var square = (x) => {
  return Math.pow(x, 2);
};
var haversineDistance = (lat1, lng1, lat2, lng2) => {
  const r = 6371;
  lat1 = deg2rad(lat1);
  lat2 = deg2rad(lat2);
  const lat_dif = lat2 - lat1;
  const lng_dif = deg2rad(lng2 - lng1);
  const a = square(Math.sin(lat_dif / 2)) + Math.cos(lat1) * Math.cos(lat2) * square(Math.sin(lng_dif / 2));
  const d = 2 * r * Math.asin(Math.sqrt(a));
  return Math.round((d + Number.EPSILON) * 100) / 100;
};

// src/linear-distance.ts
import get from "get-value";
function getDistanceY(p1, p2, name) {
  return (get(p1, name.y) - get(p2, name.y)) * (get(p1, name.y) - get(p2, name.y));
}
function getDistanceX(p1, p2, name) {
  return (get(p1, name.x) - get(p2, name.x)) * (get(p1, name.x) - get(p2, name.x));
}
var linearDistance = (p1, p2, name) => Math.abs(Math.sqrt(getDistanceY(p1, p2, name) + getDistanceX(p1, p2, name)));

// src/index.ts
var distanceBetweenPoints = (p1, p2, name, type = "linear") => {
  if (type === "haversine") {
    return haversineDistance(
      get2(p1, name.x),
      get2(p1, name.y),
      get2(p2, name.x),
      get2(p2, name.y)
    );
  }
  return linearDistance(p1, p2, name);
};
var sortByDistance = (origin, points, { yName = "y", xName = "x", type = "linear" } = {}) => {
  const names = {
    y: yName,
    x: xName
  };
  const newPoints = points.slice();
  if (newPoints.length > 1) {
    newPoints.sort(function(a, b) {
      a.distance = distanceBetweenPoints(origin, a, names, type);
      b.distance = distanceBetweenPoints(origin, b, names, type);
      return a.distance - b.distance;
    });
  } else {
    newPoints[0].distance = distanceBetweenPoints(origin, newPoints[0], names, type);
  }
  return newPoints;
};
var src_default = sortByDistance;
export {
  src_default as default,
  sortByDistance
};
