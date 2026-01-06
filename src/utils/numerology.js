/**
 * ========================================
 * THẦN SỐ HỌC - NUMEROLOGY UTILITIES
 * Cổ Học Tinh Hoa
 * ========================================
 * 
 * Hỗ trợ hai hệ thống:
 * 1. Pythagorean (Phương Tây - phổ biến)
 * 2. Chaldean (Cổ đại Babylon - chính xác hơn theo nhiều chuyên gia)
 */

// Bảng chuyển đổi Pythagorean (A=1, B=2, ... Z=26)
const PYTHAGOREAN_MAP = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
  J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
  S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8
};

// Bảng chuyển đổi Chaldean (Cổ đại, không dùng số 9)
const CHALDEAN_MAP = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 8, G: 3, H: 5, I: 1,
  J: 1, K: 2, L: 3, M: 4, N: 5, O: 7, P: 8, Q: 1, R: 2,
  S: 3, T: 4, U: 6, V: 6, W: 6, X: 5, Y: 1, Z: 7
};

// Nguyên âm cho Soul Urge Number
const VOWELS = ['A', 'E', 'I', 'O', 'U'];

/**
 * Rút gọn số về một chữ số (trừ Master Numbers: 11, 22, 33)
 */
export function reduceToSingleDigit(num, keepMasterNumbers = true) {
  if (keepMasterNumbers && [11, 22, 33].includes(num)) {
    return num;
  }
  
  while (num > 9 && !(keepMasterNumbers && [11, 22, 33].includes(num))) {
    num = String(num).split('').reduce((sum, digit) => sum + parseInt(digit), 0);
  }
  
  return num;
}

/**
 * Tính Life Path Number từ ngày sinh
 * Công thức: Cộng tất cả các chữ số của ngày/tháng/năm, rút gọn
 */
export function calculateLifePath(day, month, year) {
  // Rút gọn từng phần riêng trước
  const dayReduced = reduceToSingleDigit(day, false);
  const monthReduced = reduceToSingleDigit(month, false);
  const yearReduced = reduceToSingleDigit(
    String(year).split('').reduce((sum, d) => sum + parseInt(d), 0),
    false
  );
  
  const total = dayReduced + monthReduced + yearReduced;
  return reduceToSingleDigit(total, true);
}

/**
 * Tính Expression/Destiny Number từ họ tên đầy đủ
 * Sử dụng tất cả các chữ cái trong tên
 */
export function calculateExpression(fullName, system = 'pythagorean') {
  const map = system === 'chaldean' ? CHALDEAN_MAP : PYTHAGOREAN_MAP;
  const letters = fullName.toUpperCase().replace(/[^A-Z]/g, '');
  
  const total = letters.split('').reduce((sum, letter) => {
    return sum + (map[letter] || 0);
  }, 0);
  
  return reduceToSingleDigit(total, true);
}

/**
 * Tính Soul Urge Number (Heart's Desire) từ nguyên âm
 */
export function calculateSoulUrge(fullName, system = 'pythagorean') {
  const map = system === 'chaldean' ? CHALDEAN_MAP : PYTHAGOREAN_MAP;
  const letters = fullName.toUpperCase().replace(/[^A-Z]/g, '');
  
  const total = letters.split('').reduce((sum, letter) => {
    if (VOWELS.includes(letter)) {
      return sum + (map[letter] || 0);
    }
    return sum;
  }, 0);
  
  return reduceToSingleDigit(total, true);
}

/**
 * Tính Personality Number từ phụ âm
 */
export function calculatePersonality(fullName, system = 'pythagorean') {
  const map = system === 'chaldean' ? CHALDEAN_MAP : PYTHAGOREAN_MAP;
  const letters = fullName.toUpperCase().replace(/[^A-Z]/g, '');
  
  const total = letters.split('').reduce((sum, letter) => {
    if (!VOWELS.includes(letter)) {
      return sum + (map[letter] || 0);
    }
    return sum;
  }, 0);
  
  return reduceToSingleDigit(total, true);
}

/**
 * Tính Birthday Number (chỉ từ ngày sinh)
 */
export function calculateBirthdayNumber(day) {
  return reduceToSingleDigit(day, true);
}

/**
 * Tính Maturity Number (Life Path + Expression)
 */
export function calculateMaturity(lifePath, expression) {
  return reduceToSingleDigit(lifePath + expression, true);
}

/**
 * Tính Personal Year Number
 */
export function calculatePersonalYear(birthDay, birthMonth, currentYear) {
  const total = reduceToSingleDigit(birthDay, false) + 
                reduceToSingleDigit(birthMonth, false) + 
                reduceToSingleDigit(
                  String(currentYear).split('').reduce((sum, d) => sum + parseInt(d), 0),
                  false
                );
  return reduceToSingleDigit(total, true);
}

/**
 * Phân tích đầy đủ thần số học
 */
export function fullNumerologyAnalysis(fullName, day, month, year, system = 'pythagorean') {
  const lifePath = calculateLifePath(day, month, year);
  const expression = calculateExpression(fullName, system);
  const soulUrge = calculateSoulUrge(fullName, system);
  const personality = calculatePersonality(fullName, system);
  const birthdayNumber = calculateBirthdayNumber(day);
  const maturity = calculateMaturity(lifePath, expression);
  const currentYear = new Date().getFullYear();
  const personalYear = calculatePersonalYear(day, month, currentYear);
  
  return {
    lifePath,
    expression,
    soulUrge,
    personality,
    birthdayNumber,
    maturity,
    personalYear,
    system,
    inputData: { fullName, day, month, year }
  };
}

/**
 * Ý nghĩa các con số (Tiếng Việt)
 */
export const NUMBER_MEANINGS = {
  1: {
    title: "Người Tiên Phong",
    element: "fire",
    keywords: ["Lãnh đạo", "Độc lập", "Sáng tạo", "Quyết đoán"],
    strengths: "Bạn là người tiên phong, có khả năng lãnh đạo bẩm sinh và tinh thần độc lập mạnh mẽ. Bạn không ngại đi đầu và mở đường cho người khác.",
    challenges: "Đôi khi có thể quá cố chấp hoặc khó hợp tác với người khác. Cần học cách lắng nghe và chấp nhận ý kiến khác biệt.",
    advice: "Hãy sử dụng năng lượng tiên phong của bạn để truyền cảm hứng cho người khác, đồng thời giữ sự khiêm tốn trong thành công."
  },
  2: {
    title: "Người Hòa Giải",
    element: "water",
    keywords: ["Hợp tác", "Nhạy cảm", "Ngoại giao", "Cân bằng"],
    strengths: "Bạn có khả năng hòa giải xuất sắc, nhạy cảm với cảm xúc người khác và luôn tìm kiếm sự hài hòa trong mọi mối quan hệ.",
    challenges: "Có thể quá nhạy cảm hoặc phụ thuộc vào người khác. Đôi khi thiếu quyết đoán khi cần đưa ra quyết định.",
    advice: "Tin tưởng vào trực giác của bạn và học cách đặt ranh giới lành mạnh trong các mối quan hệ."
  },
  3: {
    title: "Người Sáng Tạo",
    element: "wood",
    keywords: ["Sáng tạo", "Biểu đạt", "Lạc quan", "Giao tiếp"],
    strengths: "Bạn được ban tặng khả năng sáng tạo và biểu đạt phi thường. Tinh thần lạc quan và khả năng giao tiếp giúp bạn kết nối dễ dàng với mọi người.",
    challenges: "Có thể phân tán năng lượng vào quá nhiều dự án hoặc thiếu kiên nhẫn để hoàn thành công việc.",
    advice: "Tập trung năng lượng sáng tạo vào những dự án có ý nghĩa và học cách kỷ luật bản thân."
  },
  4: {
    title: "Người Xây Dựng",
    element: "earth",
    keywords: ["Ổn định", "Kỷ luật", "Thực tế", "Đáng tin cậy"],
    strengths: "Bạn là nền tảng vững chắc cho mọi công trình. Sự kỷ luật, đáng tin cậy và tư duy thực tế giúp bạn xây dựng thành công bền vững.",
    challenges: "Có thể quá cứng nhắc hoặc kháng cự với thay đổi. Đôi khi bỏ lỡ cơ hội vì quá thận trọng.",
    advice: "Giữ vững nền tảng nhưng hãy mở lòng với những thay đổi tích cực và sáng tạo."
  },
  5: {
    title: "Người Tự Do",
    element: "metal",
    keywords: ["Tự do", "Phiêu lưu", "Linh hoạt", "Đa tài"],
    strengths: "Bạn yêu tự do và phiêu lưu. Khả năng thích nghi và đa tài giúp bạn thành công trong nhiều lĩnh vực khác nhau.",
    challenges: "Có thể thiếu cam kết dài hạn hoặc chạy theo những điều mới mẻ mà bỏ qua trách nhiệm.",
    advice: "Tận hưởng tự do nhưng hãy tìm những neo đậu quan trọng trong cuộc sống để duy trì sự cân bằng."
  },
  6: {
    title: "Người Chăm Sóc",
    element: "earth",
    keywords: ["Trách nhiệm", "Yêu thương", "Chăm sóc", "Hài hòa"],
    strengths: "Bạn có trái tim rộng lớn và tinh thần trách nhiệm cao. Khả năng chăm sóc và tạo sự hài hòa khiến bạn là trụ cột của gia đình và cộng đồng.",
    challenges: "Có thể hy sinh bản thân quá mức hoặc kiểm soát người khác vì muốn bảo vệ họ.",
    advice: "Chăm sóc người khác nhưng đừng quên chăm sóc bản thân. Học cách cho đi mà không mong nhận lại."
  },
  7: {
    title: "Người Tìm Kiếm",
    element: "water",
    keywords: ["Trí tuệ", "Tâm linh", "Phân tích", "Nội tâm"],
    strengths: "Bạn có chiều sâu trí tuệ và tâm linh phi thường. Khả năng phân tích và tìm kiếm chân lý giúp bạn hiểu những điều mà người khác bỏ qua.",
    challenges: "Có thể quá xa cách hoặc khó kết nối cảm xúc với người khác. Đôi khi quá hoài nghi.",
    advice: "Chia sẻ trí tuệ của bạn với thế giới và học cách tin tưởng vào trái tim cũng như lý trí."
  },
  8: {
    title: "Người Thành Đạt",
    element: "metal",
    keywords: ["Quyền lực", "Thành công", "Vật chất", "Tham vọng"],
    strengths: "Bạn có năng lực kinh doanh và lãnh đạo xuất sắc. Khả năng quản lý và tầm nhìn chiến lược dẫn bạn đến thành công vật chất.",
    challenges: "Có thể quá tập trung vào vật chất mà bỏ quên các giá trị tinh thần. Đôi khi độc đoán.",
    advice: "Sử dụng quyền lực và tài sản để tạo ra giá trị tích cực cho xã hội. Cân bằng giữa thành đạt và ý nghĩa."
  },
  9: {
    title: "Người Nhân Văn",
    element: "fire",
    keywords: ["Nhân đạo", "Trí tuệ", "Bao dung", "Hoàn thiện"],
    strengths: "Bạn mang trong mình tình yêu thương rộng lớn với nhân loại. Sự bao dung và trí tuệ giúp bạn truyền cảm hứng và chữa lành cho người khác.",
    challenges: "Có thể quá lý tưởng hóa hoặc khó chấp nhận những khiếm khuyết của thực tế.",
    advice: "Phục vụ nhân loại bằng trí tuệ và tình yêu thương, nhưng hãy chấp nhận rằng hoàn hảo là một hành trình, không phải đích đến."
  },
  11: {
    title: "Người Khai Sáng (Master)",
    element: "fire",
    keywords: ["Trực giác", "Khai sáng", "Tầm nhìn", "Cảm hứng"],
    strengths: "Bạn là kênh dẫn năng lượng tâm linh cao. Trực giác mạnh mẽ và khả năng truyền cảm hứng giúp bạn khai sáng cho người khác.",
    challenges: "Năng lượng cao có thể gây ra lo âu hoặc bất ổn nếu không được điều hướng đúng cách.",
    advice: "Tin tưởng vào sứ mệnh tâm linh của bạn và tìm cách thực hành để giữ cân bằng năng lượng."
  },
  22: {
    title: "Nhà Kiến Tạo Vĩ Đại (Master)",
    element: "earth",
    keywords: ["Kiến tạo", "Tầm nhìn", "Thực hiện", "Di sản"],
    strengths: "Bạn có khả năng biến những tầm nhìn lớn thành hiện thực. Là nhà kiến tạo vĩ đại, bạn có thể để lại di sản lâu dài cho nhân loại.",
    challenges: "Áp lực từ tiềm năng lớn có thể gây ra căng thẳng hoặc sợ thất bại.",
    advice: "Đừng sợ sức mạnh của chính mình. Hãy xây dựng từng bước và tin rằng bạn có thể tạo ra sự thay đổi lớn."
  },
  33: {
    title: "Người Thầy Tâm Linh (Master)",
    element: "wood",
    keywords: ["Thầy dẫn", "Chữa lành", "Tình yêu vô điều kiện", "Phục vụ"],
    strengths: "Bạn mang năng lượng của tình yêu vô điều kiện và sự chữa lành. Là người thầy tâm linh, bạn dẫn dắt bằng tấm gương và tình yêu thương.",
    challenges: "Có thể hy sinh bản thân quá mức hoặc mang gánh nặng cảm xúc của người khác.",
    advice: "Phục vụ từ nơi đầy đặn, không phải từ sự cạn kiệt. Tình yêu thương bắt đầu từ việc yêu thương chính mình."
  }
};

export default {
  calculateLifePath,
  calculateExpression,
  calculateSoulUrge,
  calculatePersonality,
  calculateBirthdayNumber,
  calculateMaturity,
  calculatePersonalYear,
  fullNumerologyAnalysis,
  reduceToSingleDigit,
  NUMBER_MEANINGS
};
