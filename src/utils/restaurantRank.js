export const formatRank = rank => {
  return Number(rank) !== 'NaN' ? Number(rank).toFixed(1) : '-';
};
