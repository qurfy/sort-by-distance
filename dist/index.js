"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  default: () => src_default,
  sortByDistance: () => sortByDistance
});
module.exports = __toCommonJS(src_exports);
var import_get_value2 = __toESM(require("get-value"));

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
var import_get_value = __toESM(require("get-value"));
function getDistanceY(p1, p2, name) {
  return ((0, import_get_value.default)(p1, name.y) - (0, import_get_value.default)(p2, name.y)) * ((0, import_get_value.default)(p1, name.y) - (0, import_get_value.default)(p2, name.y));
}
function getDistanceX(p1, p2, name) {
  return ((0, import_get_value.default)(p1, name.x) - (0, import_get_value.default)(p2, name.x)) * ((0, import_get_value.default)(p1, name.x) - (0, import_get_value.default)(p2, name.x));
}
var linearDistance = (p1, p2, name) => Math.abs(Math.sqrt(getDistanceY(p1, p2, name) + getDistanceX(p1, p2, name)));

// src/index.ts
var distanceBetweenPoints = (p1, p2, name, type = "linear") => {
  if (type === "haversine") {
    return haversineDistance(
      (0, import_get_value2.default)(p1, name.x),
      (0, import_get_value2.default)(p1, name.y),
      (0, import_get_value2.default)(p2, name.x),
      (0, import_get_value2.default)(p2, name.y)
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  sortByDistance
});
