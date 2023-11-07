/**
 * Util to convert common items data to items data required by BE
 */
export const formatItems = data =>
  data.map(item => ({
    product: item.product.productId || item.product.id,
    comment: item.comment,
    supplements: item.supplements.map(supplementItem => ({
      // Thanks to backend for this type of datamodel.
      supplement: supplementItem.supplement || supplementItem.supplementId,
      count: supplementItem.count,
    })),
    chosenModifiers: item.options.map(option => option.optionId),
  }));
