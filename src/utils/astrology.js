/**
 * ========================================
 * TỬ VI - CHINESE ASTROLOGY UTILITIES
 * Cổ Học Tinh Hoa
 * ========================================
 * 
 * Hệ thống Can Chi (Thiên Can + Địa Chi)
 * 12 Con Giáp theo Âm Lịch
 */

import { Solar, Lunar } from 'lunar-javascript';

// 10 Thiên Can (Heavenly Stems)
export const THIEN_CAN = [
  { name: 'Giáp', element: 'wood', yin_yang: 'dương', pinyin: 'Jiǎ' },
  { name: 'Ất', element: 'wood', yin_yang: 'âm', pinyin: 'Yǐ' },
  { name: 'Bính', element: 'fire', yin_yang: 'dương', pinyin: 'Bǐng' },
  { name: 'Đinh', element: 'fire', yin_yang: 'âm', pinyin: 'Dīng' },
  { name: 'Mậu', element: 'earth', yin_yang: 'dương', pinyin: 'Wù' },
  { name: 'Kỷ', element: 'earth', yin_yang: 'âm', pinyin: 'Jǐ' },
  { name: 'Canh', element: 'metal', yin_yang: 'dương', pinyin: 'Gēng' },
  { name: 'Tân', element: 'metal', yin_yang: 'âm', pinyin: 'Xīn' },
  { name: 'Nhâm', element: 'water', yin_yang: 'dương', pinyin: 'Rén' },
  { name: 'Quý', element: 'water', yin_yang: 'âm', pinyin: 'Guǐ' }
];

// 12 Địa Chi (Earthly Branches) - 12 Con Giáp
export const DIA_CHI = [
  { name: 'Tý', animal: 'Chuột', element: 'water', yin_yang: 'dương', pinyin: 'Zǐ', emoji: '🐀' },
  { name: 'Sửu', animal: 'Trâu', element: 'earth', yin_yang: 'âm', pinyin: 'Chǒu', emoji: '🐂' },
  { name: 'Dần', animal: 'Hổ', element: 'wood', yin_yang: 'dương', pinyin: 'Yín', emoji: '🐅' },
  { name: 'Mão', animal: 'Mèo', element: 'wood', yin_yang: 'âm', pinyin: 'Mǎo', emoji: '🐇' },
  { name: 'Thìn', animal: 'Rồng', element: 'earth', yin_yang: 'dương', pinyin: 'Chén', emoji: '🐉' },
  { name: 'Tỵ', animal: 'Rắn', element: 'fire', yin_yang: 'âm', pinyin: 'Sì', emoji: '🐍' },
  { name: 'Ngọ', animal: 'Ngựa', element: 'fire', yin_yang: 'dương', pinyin: 'Wǔ', emoji: '🐴' },
  { name: 'Mùi', animal: 'Dê', element: 'earth', yin_yang: 'âm', pinyin: 'Wèi', emoji: '🐐' },
  { name: 'Thân', animal: 'Khỉ', element: 'metal', yin_yang: 'dương', pinyin: 'Shēn', emoji: '🐒' },
  { name: 'Dậu', animal: 'Gà', element: 'metal', yin_yang: 'âm', pinyin: 'Yǒu', emoji: '🐓' },
  { name: 'Tuất', animal: 'Chó', element: 'earth', yin_yang: 'dương', pinyin: 'Xū', emoji: '🐕' },
  { name: 'Hợi', animal: 'Lợn', element: 'water', yin_yang: 'âm', pinyin: 'Hài', emoji: '🐖' }
];

// Ngũ Hành (Five Elements)
export const NGU_HANH = {
  wood: { 
    name: 'Mộc', 
    color: '#4A7C59', 
    meaning: 'Sáng tạo, phát triển, nhân từ',
    season: 'Xuân',
    direction: 'Đông'
  },
  fire: { 
    name: 'Hỏa', 
    color: '#C44536', 
    meaning: 'Nhiệt huyết, năng động, lãnh đạo',
    season: 'Hạ',
    direction: 'Nam'
  },
  earth: { 
    name: 'Thổ', 
    color: '#8B6914', 
    meaning: 'Ổn định, chăm chỉ, đáng tin cậy',
    season: 'Giữa các mùa',
    direction: 'Trung tâm'
  },
  metal: { 
    name: 'Kim', 
    color: '#7C7C7C', 
    meaning: 'Quyết đoán, kỷ luật, công bằng',
    season: 'Thu',
    direction: 'Tây'
  },
  water: { 
    name: 'Thủy', 
    color: '#3D5A80', 
    meaning: 'Linh hoạt, thông minh, sâu sắc',
    season: 'Đông',
    direction: 'Bắc'
  }
};

// Nạp Âm - 60 Hoa Giáp (60-year cycle elements)
const NAP_AM = [
  'Hải Trung Kim', 'Hải Trung Kim', // Giáp Tý, Ất Sửu
  'Lư Trung Hỏa', 'Lư Trung Hỏa', // Bính Dần, Đinh Mão
  'Đại Lâm Mộc', 'Đại Lâm Mộc', // Mậu Thìn, Kỷ Tỵ
  'Lộ Bàng Thổ', 'Lộ Bàng Thổ', // Canh Ngọ, Tân Mùi
  'Kiếm Phong Kim', 'Kiếm Phong Kim', // Nhâm Thân, Quý Dậu
  'Sơn Đầu Hỏa', 'Sơn Đầu Hỏa', // Giáp Tuất, Ất Hợi
  'Giản Hạ Thủy', 'Giản Hạ Thủy', // Bính Tý, Đinh Sửu
  'Thành Đầu Thổ', 'Thành Đầu Thổ', // Mậu Dần, Kỷ Mão
  'Bạch Lạp Kim', 'Bạch Lạp Kim', // Canh Thìn, Tân Tỵ
  'Dương Liễu Mộc', 'Dương Liễu Mộc', // Nhâm Ngọ, Quý Mùi
  'Tuyền Trung Thủy', 'Tuyền Trung Thủy', // Giáp Thân, Ất Dậu
  'Ốc Thượng Thổ', 'Ốc Thượng Thổ', // Bính Tuất, Đinh Hợi
  'Tích Lịch Hỏa', 'Tích Lịch Hỏa', // Mậu Tý, Kỷ Sửu
  'Tùng Bách Mộc', 'Tùng Bách Mộc', // Canh Dần, Tân Mão
  'Trường Lưu Thủy', 'Trường Lưu Thủy', // Nhâm Thìn, Quý Tỵ
  'Sa Trung Kim', 'Sa Trung Kim', // Giáp Ngọ, Ất Mùi
  'Sơn Hạ Hỏa', 'Sơn Hạ Hỏa', // Bính Thân, Đinh Dậu
  'Bình Địa Mộc', 'Bình Địa Mộc', // Mậu Tuất, Kỷ Hợi
  'Bích Thượng Thổ', 'Bích Thượng Thổ', // Canh Tý, Tân Sửu
  'Kim Bạc Kim', 'Kim Bạc Kim', // Nhâm Dần, Quý Mão
  'Phú Đăng Hỏa', 'Phú Đăng Hỏa', // Giáp Thìn, Ất Tỵ
  'Thiên Hà Thủy', 'Thiên Hà Thủy', // Bính Ngọ, Đinh Mùi
  'Đại Trạch Thổ', 'Đại Trạch Thổ', // Mậu Thân, Kỷ Dậu
  'Thoa Xuyến Kim', 'Thoa Xuyến Kim', // Canh Tuất, Tân Hợi
  'Tang Đố Mộc', 'Tang Đố Mộc', // Nhâm Tý, Quý Sửu
  'Đại Khê Thủy', 'Đại Khê Thủy', // Giáp Dần, Ất Mão
  'Sa Trung Thổ', 'Sa Trung Thổ', // Bính Thìn, Đinh Tỵ
  'Thiên Thượng Hỏa', 'Thiên Thượng Hỏa', // Mậu Ngọ, Kỷ Mùi
  'Thạch Lựu Mộc', 'Thạch Lựu Mộc', // Canh Thân, Tân Dậu
  'Đại Hải Thủy', 'Đại Hải Thủy' // Nhâm Tuất, Quý Hợi
];

/**
 * Chuyển đổi ngày dương sang âm lịch
 */
export function solarToLunar(year, month, day) {
  const solar = Solar.fromYmd(year, month, day);
  const lunar = solar.getLunar();
  
  return {
    year: lunar.getYear(),
    month: lunar.getMonth(),
    day: lunar.getDay(),
    isLeapMonth: lunar.getMonth() < 0,
    yearInGanZhi: lunar.getYearInGanZhi(),
    monthInGanZhi: lunar.getMonthInGanZhi(),
    dayInGanZhi: lunar.getDayInGanZhi()
  };
}

/**
 * Tính Can Chi năm sinh (theo Âm lịch)
 */
export function calculateCanChi(lunarYear) {
  // Can (Thiên Can): Năm % 10
  // Chi (Địa Chi): Năm % 12
  // Điều chỉnh: Năm 4 CE = Giáp Tý
  const canIndex = (lunarYear - 4) % 10;
  const chiIndex = (lunarYear - 4) % 12;
  
  return {
    can: THIEN_CAN[canIndex >= 0 ? canIndex : canIndex + 10],
    chi: DIA_CHI[chiIndex >= 0 ? chiIndex : chiIndex + 12],
    napAm: NAP_AM[((canIndex >= 0 ? canIndex : canIndex + 10) * 12 + (chiIndex >= 0 ? chiIndex : chiIndex + 12)) % 60]
  };
}

/**
 * Lấy thông tin con giáp từ năm âm lịch
 */
export function getZodiac(lunarYear) {
  const index = (lunarYear - 4) % 12;
  return DIA_CHI[index >= 0 ? index : index + 12];
}

/**
 * Phân tích tử vi đầy đủ
 */
export function fullAstrologyAnalysis(year, month, day) {
  const lunar = solarToLunar(year, month, day);
  const canChi = calculateCanChi(lunar.year);
  const zodiac = getZodiac(lunar.year);
  
  // Tính tuổi theo âm lịch (tính cả tuổi mụ)
  const currentLunar = solarToLunar(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate());
  const age = currentLunar.year - lunar.year + 1;
  
  return {
    solar: { year, month, day },
    lunar: {
      year: lunar.year,
      month: Math.abs(lunar.month),
      day: lunar.day,
      isLeapMonth: lunar.isLeapMonth,
      yearCanChi: lunar.yearInGanZhi,
      monthCanChi: lunar.monthInGanZhi,
      dayCanChi: lunar.dayInGanZhi
    },
    canChi: {
      can: canChi.can,
      chi: canChi.chi,
      fullName: `${canChi.can.name} ${canChi.chi.name}`,
      napAm: canChi.napAm
    },
    zodiac: {
      ...zodiac,
      element: NGU_HANH[zodiac.element]
    },
    element: NGU_HANH[canChi.can.element],
    yinYang: canChi.can.yin_yang,
    age: {
      real: age - 1,
      vietnamese: age // Tuổi mụ
    }
  };
}

/**
 * Thông tin chi tiết về 12 con giáp
 */
export const ZODIAC_INFO = {
  'Tý': {
    personality: "Thông minh, linh hoạt và nhanh nhẹn. Người tuổi Tý có khả năng thích nghi cao và thường thành công nhờ trí tuệ sắc bén.",
    strengths: ["Thông minh", "Nhạy bén", "Tiết kiệm", "Linh hoạt"],
    weaknesses: ["Đa nghi", "Tham lam", "Hay lo lắng"],
    compatibility: ["Thìn", "Thân", "Sửu"],
    incompatibility: ["Ngọ", "Mão", "Dậu"],
    luckyNumbers: [2, 3],
    luckyColors: ["Xanh dương", "Vàng", "Xanh lá"]
  },
  'Sửu': {
    personality: "Chăm chỉ, kiên nhẫn và đáng tin cậy. Người tuổi Sửu là biểu tượng của sự bền bỉ và thành công qua nỗ lực.",
    strengths: ["Kiên nhẫn", "Đáng tin cậy", "Chăm chỉ", "Thực tế"],
    weaknesses: ["Cứng đầu", "Bảo thủ", "Chậm thích nghi"],
    compatibility: ["Tỵ", "Dậu", "Tý"],
    incompatibility: ["Mùi", "Ngọ", "Tuất"],
    luckyNumbers: [1, 4],
    luckyColors: ["Trắng", "Vàng", "Xanh lá"]
  },
  'Dần': {
    personality: "Dũng cảm, tự tin và có tố chất lãnh đạo. Người tuổi Dần toát ra sức mạnh và thường là trung tâm của sự chú ý.",
    strengths: ["Dũng cảm", "Tự tin", "Nhiệt tình", "Lãnh đạo"],
    weaknesses: ["Nóng nảy", "Liều lĩnh", "Độc đoán"],
    compatibility: ["Ngọ", "Tuất", "Hợi"],
    incompatibility: ["Thân", "Tỵ"],
    luckyNumbers: [1, 3, 4],
    luckyColors: ["Xanh dương", "Xám", "Cam"]
  },
  'Mão': {
    personality: "Nhẹ nhàng, thanh lịch và có óc thẩm mỹ. Người tuổi Mão yêu hòa bình và có khả năng ngoại giao xuất sắc.",
    strengths: ["Thanh lịch", "Nhạy cảm", "Thận trọng", "Nhân từ"],
    weaknesses: ["Hay lo âu", "Thiếu quyết đoán", "Dễ bị tổn thương"],
    compatibility: ["Mùi", "Hợi", "Tuất"],
    incompatibility: ["Dậu", "Thìn"],
    luckyNumbers: [3, 4, 6],
    luckyColors: ["Đỏ", "Hồng", "Tím"]
  },
  'Thìn': {
    personality: "Mạnh mẽ, tham vọng và đầy năng lượng. Người tuổi Thìn được xem là may mắn nhất trong 12 con giáp.",
    strengths: ["Tham vọng", "Năng động", "Tự tin", "Thông minh"],
    weaknesses: ["Kiêu ngạo", "Nóng nảy", "Khó tính"],
    compatibility: ["Tý", "Thân", "Dậu"],
    incompatibility: ["Tuất", "Mão"],
    luckyNumbers: [1, 6, 7],
    luckyColors: ["Vàng", "Bạc", "Xám"]
  },
  'Tỵ': {
    personality: "Thông thái, quyến rũ và bí ẩn. Người tuổi Tỵ có trực giác tốt và thường thành công nhờ sự khôn ngoan.",
    strengths: ["Thông thái", "Quyến rũ", "Kiên định", "Trực giác"],
    weaknesses: ["Đa nghi", "Ghen tuông", "Hay giữ kín"],
    compatibility: ["Sửu", "Dậu"],
    incompatibility: ["Dần", "Hợi"],
    luckyNumbers: [2, 8, 9],
    luckyColors: ["Đỏ", "Vàng nhạt", "Đen"]
  },
  'Ngọ': {
    personality: "Năng động, vui vẻ và yêu tự do. Người tuổi Ngọ có tinh thần lạc quan và khả năng giao tiếp tuyệt vời.",
    strengths: ["Năng động", "Lạc quan", "Xã giao tốt", "Nhiệt tình"],
    weaknesses: ["Thiếu kiên nhẫn", "Hay thay đổi", "Bốc đồng"],
    compatibility: ["Dần", "Tuất", "Mùi"],
    incompatibility: ["Tý", "Sửu"],
    luckyNumbers: [2, 3, 7],
    luckyColors: ["Vàng", "Xanh lá", "Đỏ"]
  },
  'Mùi': {
    personality: "Nhẹ nhàng, nghệ sĩ và có trái tim nhân hậu. Người tuổi Mùi yêu nghệ thuật và có tâm hồn lãng mạn.",
    strengths: ["Nhẹ nhàng", "Sáng tạo", "Kiên nhẫn", "Nhân hậu"],
    weaknesses: ["Nhút nhát", "Bi quan", "Hay lo nghĩ"],
    compatibility: ["Mão", "Hợi", "Ngọ"],
    incompatibility: ["Sửu", "Tuất"],
    luckyNumbers: [3, 4, 9],
    luckyColors: ["Xanh lá", "Đỏ", "Tím"]
  },
  'Thân': {
    personality: "Thông minh, hóm hỉnh và linh hoạt. Người tuổi Thân có khả năng giải quyết vấn đề xuất sắc và tính cách vui vẻ.",
    strengths: ["Thông minh", "Linh hoạt", "Hóm hỉnh", "Sáng tạo"],
    weaknesses: ["Hay xao nhãng", "Thiếu kiên nhẫn", "Thích đùa quá mức"],
    compatibility: ["Tý", "Thìn"],
    incompatibility: ["Dần", "Hợi"],
    luckyNumbers: [1, 7, 8],
    luckyColors: ["Trắng", "Xanh dương", "Vàng"]
  },
  'Dậu': {
    personality: "Siêng năng, quan sát và có kỷ luật cao. Người tuổi Dậu làm việc chăm chỉ và có tiêu chuẩn cao.",
    strengths: ["Siêng năng", "Quan sát", "Thực tế", "Thẳng thắn"],
    weaknesses: ["Hay phê bình", "Cầu toàn", "Khó gần"],
    compatibility: ["Sửu", "Tỵ", "Thìn"],
    incompatibility: ["Mão", "Tý"],
    luckyNumbers: [5, 7, 8],
    luckyColors: ["Vàng", "Nâu", "Cam"]
  },
  'Tuất': {
    personality: "Trung thành, thẳng thắn và có tinh thần trách nhiệm cao. Người tuổi Tuất là người bạn đáng tin cậy nhất.",
    strengths: ["Trung thành", "Thẳng thắn", "Dũng cảm", "Trách nhiệm"],
    weaknesses: ["Cứng nhắc", "Hay lo âu", "Bi quan"],
    compatibility: ["Dần", "Mão", "Ngọ"],
    incompatibility: ["Thìn", "Mùi", "Sửu"],
    luckyNumbers: [3, 4, 9],
    luckyColors: ["Xanh lá", "Đỏ", "Tím"]
  },
  'Hợi': {
    personality: "Hào phóng, chân thành và yêu cuộc sống. Người tuổi Hợi có trái tim ấm áp và thường mang lại niềm vui cho mọi người.",
    strengths: ["Hào phóng", "Chân thành", "Nhẫn nại", "Tốt bụng"],
    weaknesses: ["Cả tin", "Thiếu ý chí", "Vật chất"],
    compatibility: ["Mão", "Mùi", "Dần"],
    incompatibility: ["Tỵ", "Thân"],
    luckyNumbers: [2, 5, 8],
    luckyColors: ["Vàng", "Xám", "Nâu"]
  }
};

export default {
  solarToLunar,
  calculateCanChi,
  getZodiac,
  fullAstrologyAnalysis,
  THIEN_CAN,
  DIA_CHI,
  NGU_HANH,
  ZODIAC_INFO
};
