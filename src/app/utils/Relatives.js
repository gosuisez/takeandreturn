/* Imports */
import { Dimensions } from "react-native";
/* /Imports/ */

/* Exports */
export const {width, height} = Dimensions.get('window');
export const realWidth = height > width ? width : height;
export const relativeWidth = num => Math.ceil((width * num) / 100);
export const relativeHeight = num => Math.ceil((height * num) / 100);
/* /Exports/ */
