import { Props } from "@/pages";
import assert from "assert";
import { LatLngLiteral } from "leaflet";
import { cloneDeep } from "lodash";
import { Coordinate } from "./Coordinates";

/**
 * Get distance between two points
 * From here: https://stackoverflow.com/a/46737094
 * @param coord1 First coordinate
 * @param coord1 Second coordinate
 * @param unit
 * @returns distance between the two coordinates
 */
export function distance(
  coord1: LatLngLiteral,
  coord2: LatLngLiteral,
  unit = undefined
) {
  const lat1 = coord1["lat"];
  const lon1 = coord1["lng"];
  const lat2 = coord2["lat"];
  const lon2 = coord2["lng"];

  var radlat1 = (Math.PI * lat1) / 180;
  var radlat2 = (Math.PI * lat2) / 180;
  var theta = lon1 - lon2;
  var radtheta = (Math.PI * theta) / 180;
  var dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  if (unit == "K") {
    dist = dist * 1.609344;
  }
  if (unit == "M") {
    dist = dist * 0.8684;
  }
  return dist;
}

/**
 * Compute the shortest path between points
 * @param coords coordinates to compute the path
 * @returns the shortest path coordinates in order of path
 */
export function computePath(
  currentPosition: Props["myPosition"],
  coords: Coordinate[]
) {
  let pathCoords = cloneDeep(coords); // copy coords
  let selectedPoint = currentPosition; // first selected point is current location
  let pathOrder: LatLngLiteral[] = [];
  let minDistance: number;
  let closestPoint: LatLngLiteral | undefined;

  // Loop through all the coords and find the closest point to selectedPoint
  while (pathCoords.length > 0) {
    // Compare distance against the other points in pathCoords
    minDistance = Number.MAX_VALUE;
    for (let i = 0; i < pathCoords.length; i++) {
      const latlng = pathCoords[i]["latlng"];
      const d = distance(selectedPoint, latlng);
      if (d < minDistance) {
        minDistance = d;
        closestPoint = latlng;
      }
    }

    assert(!!closestPoint, "Closest point should be defined");
    // Set closest point as new selected point
    selectedPoint = closestPoint;
    // Add to path order
    pathOrder.push(closestPoint);

    // Remove newly selected point from pathCoords
    pathCoords = pathCoords.filter((coord) => coord["latlng"] !== closestPoint);
  }

  return pathOrder;
}
