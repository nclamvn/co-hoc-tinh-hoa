/**
 * Vietnamese Name Adapter for Numerology
 * Handles Vietnamese diacritics and converts to Pythagorean values
 */

// Vietnamese diacritics mapping to base letters
const VIETNAMESE_MAP = {
  // A variations
  'á': 'a', 'à': 'a', 'ả': 'a', 'ã': 'a', 'ạ': 'a',
  'ă': 'a', 'ắ': 'a', 'ằ': 'a', 'ẳ': 'a', 'ẵ': 'a', 'ặ': 'a',
  'â': 'a', 'ấ': 'a', 'ầ': 'a', 'ẩ': 'a', 'ẫ': 'a', 'ậ': 'a',
  'Á': 'A', 'À': 'A', 'Ả': 'A', 'Ã': 'A', 'Ạ': 'A',
  'Ă': 'A', 'Ắ': 'A', 'Ằ': 'A', 'Ẳ': 'A', 'Ẵ': 'A', 'Ặ': 'A',
  'Â': 'A', 'Ấ': 'A', 'Ầ': 'A', 'Ẩ': 'A', 'Ẫ': 'A', 'Ậ': 'A',

  // E variations
  'é': 'e', 'è': 'e', 'ẻ': 'e', 'ẽ': 'e', 'ẹ': 'e',
  'ê': 'e', 'ế': 'e', 'ề': 'e', 'ể': 'e', 'ễ': 'e', 'ệ': 'e',
  'É': 'E', 'È': 'E', 'Ẻ': 'E', 'Ẽ': 'E', 'Ẹ': 'E',
  'Ê': 'E', 'Ế': 'E', 'Ề': 'E', 'Ể': 'E', 'Ễ': 'E', 'Ệ': 'E',

  // I variations
  'í': 'i', 'ì': 'i', 'ỉ': 'i', 'ĩ': 'i', 'ị': 'i',
  'Í': 'I', 'Ì': 'I', 'Ỉ': 'I', 'Ĩ': 'I', 'Ị': 'I',

  // O variations
  'ó': 'o', 'ò': 'o', 'ỏ': 'o', 'õ': 'o', 'ọ': 'o',
  'ô': 'o', 'ố': 'o', 'ồ': 'o', 'ổ': 'o', 'ỗ': 'o', 'ộ': 'o',
  'ơ': 'o', 'ớ': 'o', 'ờ': 'o', 'ở': 'o', 'ỡ': 'o', 'ợ': 'o',
  'Ó': 'O', 'Ò': 'O', 'Ỏ': 'O', 'Õ': 'O', 'Ọ': 'O',
  'Ô': 'O', 'Ố': 'O', 'Ồ': 'O', 'Ổ': 'O', 'Ỗ': 'O', 'Ộ': 'O',
  'Ơ': 'O', 'Ớ': 'O', 'Ờ': 'O', 'Ở': 'O', 'Ỡ': 'O', 'Ợ': 'O',

  // U variations
  'ú': 'u', 'ù': 'u', 'ủ': 'u', 'ũ': 'u', 'ụ': 'u',
  'ư': 'u', 'ứ': 'u', 'ừ': 'u', 'ử': 'u', 'ữ': 'u', 'ự': 'u',
  'Ú': 'U', 'Ù': 'U', 'Ủ': 'U', 'Ũ': 'U', 'Ụ': 'U',
  'Ư': 'U', 'Ứ': 'U', 'Ừ': 'U', 'Ử': 'U', 'Ữ': 'U', 'Ự': 'U',

  // Y variations
  'ý': 'y', 'ỳ': 'y', 'ỷ': 'y', 'ỹ': 'y', 'ỵ': 'y',
  'Ý': 'Y', 'Ỳ': 'Y', 'Ỷ': 'Y', 'Ỹ': 'Y', 'Ỵ': 'Y',

  // D variations
  'đ': 'd', 'Đ': 'D'
};

// Pythagorean letter values
const PYTHAGOREAN_VALUES = {
  'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8, 'i': 9,
  'j': 1, 'k': 2, 'l': 3, 'm': 4, 'n': 5, 'o': 6, 'p': 7, 'q': 8, 'r': 9,
  's': 1, 't': 2, 'u': 3, 'v': 4, 'w': 5, 'x': 6, 'y': 7, 'z': 8
};

// Vowels for Soul Urge calculation
const VOWELS = ['a', 'e', 'i', 'o', 'u'];

// Special handling for Y - vowel in certain positions
function isYVowel(name, index) {
  const lowerName = name.toLowerCase();
  const char = lowerName[index];
  if (char !== 'y') return false;

  // Y at end of name is usually vowel
  if (index === name.length - 1) return true;

  // Y followed by consonant is vowel
  const nextChar = lowerName[index + 1];
  if (nextChar && !VOWELS.includes(nextChar) && nextChar !== 'y') return true;

  // Y at start followed by vowel is consonant
  if (index === 0 && VOWELS.includes(lowerName[index + 1])) return false;

  return false;
}

/**
 * Normalize Vietnamese text to ASCII
 */
export function normalizeVietnamese(text) {
  if (!text) return '';

  let result = '';
  for (const char of text) {
    result += VIETNAMESE_MAP[char] || char;
  }
  return result;
}

/**
 * Get letter value using Pythagorean system
 */
export function getLetterValue(letter) {
  const normalized = normalizeVietnamese(letter).toLowerCase();
  return PYTHAGOREAN_VALUES[normalized] || 0;
}

/**
 * Check if character is a vowel
 */
export function isVowel(char, fullName, index) {
  const normalized = normalizeVietnamese(char).toLowerCase();
  if (VOWELS.includes(normalized)) return true;
  if (normalized === 'y') return isYVowel(fullName, index);
  return false;
}

/**
 * Check if character is a consonant
 */
export function isConsonant(char, fullName, index) {
  const normalized = normalizeVietnamese(char).toLowerCase();
  if (!PYTHAGOREAN_VALUES[normalized]) return false;
  return !isVowel(char, fullName, index);
}

/**
 * Reduce number to single digit or master number
 */
export function reduceToSingleDigit(num, keepMaster = true) {
  const masterNumbers = [11, 22, 33];

  while (num > 9) {
    if (keepMaster && masterNumbers.includes(num)) {
      return num;
    }
    num = String(num).split('').reduce((sum, d) => sum + parseInt(d), 0);
  }
  return num;
}

/**
 * Calculate total from name
 */
export function calculateNameTotal(name, filterFn = null) {
  const normalized = normalizeVietnamese(name);
  let total = 0;
  let breakdown = [];

  for (let i = 0; i < normalized.length; i++) {
    const char = normalized[i];
    const originalChar = name[i];

    if (filterFn && !filterFn(originalChar, name, i)) continue;

    const value = getLetterValue(char);
    if (value > 0) {
      total += value;
      breakdown.push({
        original: originalChar,
        normalized: char.toUpperCase(),
        value
      });
    }
  }

  return { total, breakdown };
}

/**
 * Smart name parser for Vietnamese names
 * Vietnamese naming convention: HỌ + TÊN ĐỆM + TÊN
 * Example: Nguyễn Văn Anh
 */
export function parseVietnameseName(fullName) {
  const parts = fullName.trim().split(/\s+/);

  if (parts.length === 0) {
    return { ho: '', tenDem: '', ten: '', fullName: '' };
  }

  if (parts.length === 1) {
    return { ho: '', tenDem: '', ten: parts[0], fullName: parts[0] };
  }

  if (parts.length === 2) {
    return { ho: parts[0], tenDem: '', ten: parts[1], fullName };
  }

  // 3+ parts: first is ho, last is ten, middle is tenDem
  return {
    ho: parts[0],
    tenDem: parts.slice(1, -1).join(' '),
    ten: parts[parts.length - 1],
    fullName
  };
}

/**
 * Get detailed letter breakdown for display
 */
export function getLetterBreakdown(name) {
  const normalized = normalizeVietnamese(name);
  const letters = [];

  for (let i = 0; i < normalized.length; i++) {
    const char = normalized[i];
    const originalChar = name[i];
    const value = getLetterValue(char);

    if (value > 0) {
      letters.push({
        original: originalChar,
        normalized: char.toUpperCase(),
        value,
        isVowel: isVowel(originalChar, name, i),
        isConsonant: isConsonant(originalChar, name, i)
      });
    }
  }

  return letters;
}

/**
 * Format name for display with values
 */
export function formatNameWithValues(name) {
  const breakdown = getLetterBreakdown(name);
  return breakdown.map(l => `${l.original}(${l.value})`).join(' ');
}

// Common Vietnamese names for validation/suggestions
export const COMMON_VIETNAMESE_SURNAMES = [
  'Nguyễn', 'Trần', 'Lê', 'Phạm', 'Hoàng', 'Huỳnh', 'Phan', 'Vũ', 'Võ',
  'Đặng', 'Bùi', 'Đỗ', 'Hồ', 'Ngô', 'Dương', 'Lý', 'Đoàn', 'Đinh'
];

export const COMMON_VIETNAMESE_MIDDLE_NAMES = [
  'Văn', 'Thị', 'Hữu', 'Đức', 'Minh', 'Quốc', 'Thanh', 'Ngọc', 'Hoàng',
  'Kim', 'Xuân', 'Thu', 'Hải', 'Anh', 'Bảo', 'Gia', 'Phương', 'Tuấn'
];

export default {
  normalizeVietnamese,
  getLetterValue,
  isVowel,
  isConsonant,
  reduceToSingleDigit,
  calculateNameTotal,
  parseVietnameseName,
  getLetterBreakdown,
  formatNameWithValues,
  COMMON_VIETNAMESE_SURNAMES,
  COMMON_VIETNAMESE_MIDDLE_NAMES,
  PYTHAGOREAN_VALUES,
  VIETNAMESE_MAP
};
