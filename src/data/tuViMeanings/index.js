/**
 * TỬ VI MEANINGS INDEX
 * Export tất cả các module kiến giải Tử Vi
 * Cổ Học Tinh Hoa
 */

// Cung meanings
export {
  default as cungMeanings,
  getCungMeaning,
  getAllCungNames,
  getCungShortDesc
} from './cungMeaning';

// Chính Tinh meanings
export {
  default as chinhTinhMeanings,
  getChinhTinhMeaning,
  getAllChinhTinhNames,
  getChinhTinhShortDesc,
  getChinhTinhByElement,
  getChinhTinhByCategory
} from './chinhTinhMeaning';
