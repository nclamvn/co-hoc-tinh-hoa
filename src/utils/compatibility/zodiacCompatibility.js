/**
 * Chinese Zodiac Compatibility Calculator
 * Tính tương hợp theo Con Giáp (12 Chi)
 */

// 12 Con Giáp với thông tin chi tiết
export const ZODIAC_ANIMALS = {
  'Tý': { animal: 'Chuột', emoji: '🐀', element: 'Thủy', yin: true, order: 1 },
  'Sửu': { animal: 'Trâu', emoji: '🐂', element: 'Thổ', yin: false, order: 2 },
  'Dần': { animal: 'Hổ', emoji: '🐅', element: 'Mộc', yin: true, order: 3 },
  'Mão': { animal: 'Mèo', emoji: '🐇', element: 'Mộc', yin: false, order: 4 },
  'Thìn': { animal: 'Rồng', emoji: '🐉', element: 'Thổ', yin: true, order: 5 },
  'Tỵ': { animal: 'Rắn', emoji: '🐍', element: 'Hỏa', yin: false, order: 6 },
  'Ngọ': { animal: 'Ngựa', emoji: '🐴', element: 'Hỏa', yin: true, order: 7 },
  'Mùi': { animal: 'Dê', emoji: '🐐', element: 'Thổ', yin: false, order: 8 },
  'Thân': { animal: 'Khỉ', emoji: '🐒', element: 'Kim', yin: true, order: 9 },
  'Dậu': { animal: 'Gà', emoji: '🐓', element: 'Kim', yin: false, order: 10 },
  'Tuất': { animal: 'Chó', emoji: '🐕', element: 'Thổ', yin: true, order: 11 },
  'Hợi': { animal: 'Lợn', emoji: '🐷', element: 'Thủy', yin: false, order: 12 }
};

// Tam Hợp (Trine - 3 con giáp cùng cục, rất hợp)
export const TAM_HOP = {
  'Thủy': ['Thân', 'Tý', 'Thìn'],   // Thủy cục - Năng động, thông minh
  'Kim': ['Tỵ', 'Dậu', 'Sửu'],      // Kim cục - Kiên định, quyết đoán
  'Hỏa': ['Dần', 'Ngọ', 'Tuất'],    // Hỏa cục - Nhiệt huyết, dũng cảm
  'Mộc': ['Hợi', 'Mão', 'Mùi']      // Mộc cục - Sáng tạo, nhân ái
};

// Lục Hợp (Six Harmony - 2 con giáp hợp nhau)
export const LUC_HOP = [
  { pair: ['Tý', 'Sửu'], element: 'Thổ', meaning: 'Hài hòa, bổ sung' },
  { pair: ['Dần', 'Hợi'], element: 'Mộc', meaning: 'Phát triển, sinh sôi' },
  { pair: ['Mão', 'Tuất'], element: 'Hỏa', meaning: 'Ấm áp, trung thành' },
  { pair: ['Thìn', 'Dậu'], element: 'Kim', meaning: 'Vững chắc, thành công' },
  { pair: ['Tỵ', 'Thân'], element: 'Thủy', meaning: 'Linh hoạt, hỗ trợ' },
  { pair: ['Ngọ', 'Mùi'], element: 'Nhật Nguyệt', meaning: 'Âm dương hài hòa' }
];

// Lục Xung (Six Clash - 2 con giáp xung khắc)
export const LUC_XUNG = [
  { pair: ['Tý', 'Ngọ'], meaning: 'Thủy - Hỏa xung', severity: 'high' },
  { pair: ['Sửu', 'Mùi'], meaning: 'Thổ - Thổ xung', severity: 'medium' },
  { pair: ['Dần', 'Thân'], meaning: 'Mộc - Kim xung', severity: 'high' },
  { pair: ['Mão', 'Dậu'], meaning: 'Mộc - Kim xung', severity: 'high' },
  { pair: ['Thìn', 'Tuất'], meaning: 'Thổ - Thổ xung', severity: 'medium' },
  { pair: ['Tỵ', 'Hợi'], meaning: 'Hỏa - Thủy xung', severity: 'high' }
];

// Lục Hại (Six Harm - 2 con giáp hại nhau)
export const LUC_HAI = [
  { pair: ['Tý', 'Mùi'], meaning: 'Ám hại tinh thần', severity: 'medium' },
  { pair: ['Sửu', 'Ngọ'], meaning: 'Tổn hại sức khỏe', severity: 'medium' },
  { pair: ['Dần', 'Tỵ'], meaning: 'Tranh chấp quyền lợi', severity: 'low' },
  { pair: ['Mão', 'Thìn'], meaning: 'Bất đồng quan điểm', severity: 'low' },
  { pair: ['Thân', 'Hợi'], meaning: 'Mâu thuẫn ngầm', severity: 'medium' },
  { pair: ['Dậu', 'Tuất'], meaning: 'Xung đột nhỏ', severity: 'low' }
];

// Lục Phá (Six Break)
export const LUC_PHA = [
  { pair: ['Tý', 'Dậu'], meaning: 'Phá tài', severity: 'medium' },
  { pair: ['Sửu', 'Thìn'], meaning: 'Phá sự nghiệp', severity: 'medium' },
  { pair: ['Dần', 'Hợi'], meaning: 'Phá kế hoạch', severity: 'low' },
  { pair: ['Mão', 'Ngọ'], meaning: 'Phá tình cảm', severity: 'medium' },
  { pair: ['Tỵ', 'Thân'], meaning: 'Phá hợp tác', severity: 'low' },
  { pair: ['Mùi', 'Tuất'], meaning: 'Phá ổn định', severity: 'low' }
];

// Tự Hình (Self Punishment)
export const TU_HINH = {
  'Dần-Tỵ-Thân': { meaning: 'Vô ơn hình', severity: 'high' },
  'Sửu-Tuất-Mùi': { meaning: 'Thị phi hình', severity: 'medium' },
  'Tý-Mão': { meaning: 'Vô lễ hình', severity: 'medium' },
  'Thìn-Thìn': { meaning: 'Tự hình', severity: 'low' },
  'Ngọ-Ngọ': { meaning: 'Tự hình', severity: 'low' },
  'Dậu-Dậu': { meaning: 'Tự hình', severity: 'low' },
  'Hợi-Hợi': { meaning: 'Tự hình', severity: 'low' }
};

/**
 * Lấy con giáp từ năm sinh
 */
export function getZodiacFromYear(year) {
  const zodiacs = ['Thân', 'Dậu', 'Tuất', 'Hợi', 'Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi'];
  return zodiacs[year % 12];
}

/**
 * Kiểm tra Tam Hợp
 */
export function checkTamHop(zodiac1, zodiac2) {
  for (const [cuc, members] of Object.entries(TAM_HOP)) {
    if (members.includes(zodiac1) && members.includes(zodiac2)) {
      return {
        isMatch: true,
        type: 'TAM_HOP',
        cuc,
        score: 95,
        meaning: `Tam Hợp ${cuc} cục - Rất hợp nhau, hỗ trợ lẫn nhau mạnh mẽ`
      };
    }
  }
  return { isMatch: false };
}

/**
 * Kiểm tra Lục Hợp
 */
export function checkLucHop(zodiac1, zodiac2) {
  for (const hop of LUC_HOP) {
    if (hop.pair.includes(zodiac1) && hop.pair.includes(zodiac2)) {
      return {
        isMatch: true,
        type: 'LUC_HOP',
        element: hop.element,
        score: 88,
        meaning: `Lục Hợp hóa ${hop.element} - ${hop.meaning}`
      };
    }
  }
  return { isMatch: false };
}

/**
 * Kiểm tra Lục Xung
 */
export function checkLucXung(zodiac1, zodiac2) {
  for (const xung of LUC_XUNG) {
    if (xung.pair.includes(zodiac1) && xung.pair.includes(zodiac2)) {
      const score = xung.severity === 'high' ? 25 : 40;
      return {
        isMatch: true,
        type: 'LUC_XUNG',
        severity: xung.severity,
        score,
        meaning: `Lục Xung - ${xung.meaning}. Cần cẩn thận trong mối quan hệ.`
      };
    }
  }
  return { isMatch: false };
}

/**
 * Kiểm tra Lục Hại
 */
export function checkLucHai(zodiac1, zodiac2) {
  for (const hai of LUC_HAI) {
    if (hai.pair.includes(zodiac1) && hai.pair.includes(zodiac2)) {
      const score = hai.severity === 'medium' ? 45 : 55;
      return {
        isMatch: true,
        type: 'LUC_HAI',
        severity: hai.severity,
        score,
        meaning: `Lục Hại - ${hai.meaning}. Có thể gây tổn thương ngầm.`
      };
    }
  }
  return { isMatch: false };
}

/**
 * Kiểm tra Lục Phá
 */
export function checkLucPha(zodiac1, zodiac2) {
  for (const pha of LUC_PHA) {
    if (pha.pair.includes(zodiac1) && pha.pair.includes(zodiac2)) {
      return {
        isMatch: true,
        type: 'LUC_PHA',
        severity: pha.severity,
        score: 50,
        meaning: `Lục Phá - ${pha.meaning}. Có thể gặp trở ngại.`
      };
    }
  }
  return { isMatch: false };
}

/**
 * Kiểm tra tự hình (cùng tuổi)
 */
export function checkTuHinh(zodiac1, zodiac2) {
  if (zodiac1 === zodiac2) {
    const tuHinhKey = `${zodiac1}-${zodiac2}`;
    const tuHinh = TU_HINH[tuHinhKey];
    if (tuHinh) {
      return {
        isMatch: true,
        type: 'TU_HINH',
        score: 60,
        meaning: `Tự Hình - ${tuHinh.meaning}. Cùng tuổi dễ va chạm.`
      };
    }
  }
  return { isMatch: false };
}

/**
 * Tính điểm tương hợp con giáp
 */
export function calculateZodiacCompatibility(zodiac1, zodiac2) {
  // Kiểm tra các mối quan hệ theo thứ tự ưu tiên
  const tamHop = checkTamHop(zodiac1, zodiac2);
  if (tamHop.isMatch) return tamHop;

  const lucHop = checkLucHop(zodiac1, zodiac2);
  if (lucHop.isMatch) return lucHop;

  const lucXung = checkLucXung(zodiac1, zodiac2);
  if (lucXung.isMatch) return lucXung;

  const lucHai = checkLucHai(zodiac1, zodiac2);
  if (lucHai.isMatch) return lucHai;

  const lucPha = checkLucPha(zodiac1, zodiac2);
  if (lucPha.isMatch) return lucPha;

  const tuHinh = checkTuHinh(zodiac1, zodiac2);
  if (tuHinh.isMatch) return tuHinh;

  // Không có quan hệ đặc biệt - bình thường
  return {
    isMatch: false,
    type: 'NEUTRAL',
    score: 65,
    meaning: 'Không xung không hợp - Mối quan hệ bình thường, có thể phát triển tốt nếu cả hai cố gắng.'
  };
}

/**
 * Lấy thông tin chi tiết con giáp
 */
export function getZodiacInfo(zodiac) {
  const info = ZODIAC_ANIMALS[zodiac];
  if (!info) return null;

  // Tìm các tuổi hợp
  const compatible = [];
  const incompatible = [];

  // Tam Hợp
  for (const [cuc, members] of Object.entries(TAM_HOP)) {
    if (members.includes(zodiac)) {
      members.forEach(z => {
        if (z !== zodiac) compatible.push({ zodiac: z, type: 'Tam Hợp', cuc });
      });
    }
  }

  // Lục Hợp
  for (const hop of LUC_HOP) {
    if (hop.pair.includes(zodiac)) {
      const other = hop.pair.find(z => z !== zodiac);
      if (other) compatible.push({ zodiac: other, type: 'Lục Hợp', element: hop.element });
    }
  }

  // Lục Xung
  for (const xung of LUC_XUNG) {
    if (xung.pair.includes(zodiac)) {
      const other = xung.pair.find(z => z !== zodiac);
      if (other) incompatible.push({ zodiac: other, type: 'Lục Xung', meaning: xung.meaning });
    }
  }

  return {
    ...info,
    chi: zodiac,
    compatible,
    incompatible
  };
}

/**
 * Lấy tất cả thông tin tương hợp giữa 2 con giáp
 */
export function getFullZodiacCompatibility(zodiac1, zodiac2) {
  const result = calculateZodiacCompatibility(zodiac1, zodiac2);
  const info1 = getZodiacInfo(zodiac1);
  const info2 = getZodiacInfo(zodiac2);

  return {
    person1: {
      zodiac: zodiac1,
      ...info1
    },
    person2: {
      zodiac: zodiac2,
      ...info2
    },
    compatibility: result,
    advice: generateZodiacAdvice(result.type, zodiac1, zodiac2)
  };
}

/**
 * Tạo lời khuyên dựa trên mối quan hệ
 */
function generateZodiacAdvice(type, zodiac1, zodiac2) {
  const advices = {
    'TAM_HOP': `${ZODIAC_ANIMALS[zodiac1].animal} và ${ZODIAC_ANIMALS[zodiac2].animal} thuộc cùng Tam Hợp cục, là mối quan hệ rất tốt đẹp. Hai người bổ sung và hỗ trợ nhau một cách tự nhiên.`,
    'LUC_HOP': `${ZODIAC_ANIMALS[zodiac1].animal} và ${ZODIAC_ANIMALS[zodiac2].animal} là Lục Hợp, có sự thu hút và hài hòa tự nhiên. Mối quan hệ có tiềm năng phát triển bền vững.`,
    'LUC_XUNG': `${ZODIAC_ANIMALS[zodiac1].animal} và ${ZODIAC_ANIMALS[zodiac2].animal} Lục Xung nhau, cần kiên nhẫn và thấu hiểu. Tập trung vào điểm chung và tránh tranh cãi về những khác biệt.`,
    'LUC_HAI': `Mối quan hệ giữa ${ZODIAC_ANIMALS[zodiac1].animal} và ${ZODIAC_ANIMALS[zodiac2].animal} có thể gặp những khó khăn ngầm. Cần giao tiếp cởi mở và thành thật.`,
    'LUC_PHA': `${ZODIAC_ANIMALS[zodiac1].animal} và ${ZODIAC_ANIMALS[zodiac2].animal} có thể gặp trở ngại trong một số lĩnh vực. Hãy cẩn thận trong các quyết định quan trọng.`,
    'TU_HINH': `Cùng tuổi ${ZODIAC_ANIMALS[zodiac1].animal} có thể dẫn đến va chạm do tính cách giống nhau. Học cách nhường nhịn và tôn trọng không gian riêng.`,
    'NEUTRAL': `${ZODIAC_ANIMALS[zodiac1].animal} và ${ZODIAC_ANIMALS[zodiac2].animal} có mối quan hệ trung tính. Thành công phụ thuộc vào sự nỗ lực của cả hai.`
  };

  return advices[type] || advices['NEUTRAL'];
}

export default {
  ZODIAC_ANIMALS,
  TAM_HOP,
  LUC_HOP,
  LUC_XUNG,
  LUC_HAI,
  getZodiacFromYear,
  calculateZodiacCompatibility,
  getZodiacInfo,
  getFullZodiacCompatibility
};
