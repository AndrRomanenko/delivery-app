/**
 * Function that receives native onScroll event and determines if end was reached.
 */
export const isScrolledToEnd = ({
  layoutMeasurement,
  contentOffset,
  contentSize,
}) => {
  return layoutMeasurement.height + contentOffset.y >= contentSize.height;
};
