// Key header for deliverit QRs
const TOKEN_HEADER = 'code_id=';

/**
 * Check if scanned token is deliverit token
 */
export const isShopTableToken = token => token.includes(TOKEN_HEADER);

/**
 * Get clean table hash without key header
 */
export const getHash = value => value.replace(TOKEN_HEADER, '');
