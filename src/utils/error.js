export const getFormattedErrorMessage = err => {
  if (!err) {
    return '';
  }
  return `Error status ${err.status} ${
    err.data?.message || err.data?.title
  }`.trim();
};
