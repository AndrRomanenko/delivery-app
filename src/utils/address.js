export const getAddressLabel = ({
  country,
  city,
  addressLineFirst,
  addressLineSecond,
  zipCode,
}) =>
  `${zipCode}, ${addressLineFirst}, ${addressLineSecond}, ${city}`.replace(
    /null,/g,
    '',
  );
