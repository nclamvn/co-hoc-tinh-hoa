/**
 * Advanced Numerology Calculations
 * Birthday Chart (3x3 Grid) + Pinnacle Pyramid + Life Cycles
 */

/**
 * Reduce number to single digit (except master numbers 11, 22, 33)
 */
export function reduceToSingleDigit(num, keepMaster = true) {
  if (keepMaster && [11, 22, 33].includes(num)) return num;
  while (num > 9 && !(keepMaster && [11, 22, 33].includes(num))) {
    num = String(num).split('').reduce((sum, d) => sum + parseInt(d), 0);
  }
  return num;
}

/**
 * Calculate Birthday Chart (3x3 Grid)
 * Shows which numbers appear in the birth date
 *
 * Grid layout:
 * 3 | 6 | 9  ← Mental plane (Trí não)
 * 2 | 5 | 8  ← Emotional plane (Tình cảm)
 * 1 | 4 | 7  ← Physical plane (Thể chất)
 * ↑   ↑   ↑
 * Thought Action Creative
 */
export function calculateBirthdayChart(day, month, year) {
  const dateString = `${day}${month}${year}`;
  const digits = dateString.split('').map(d => parseInt(d)).filter(d => d >= 0);

  // Count occurrences of each digit (1-9)
  const counts = {};
  for (let i = 1; i <= 9; i++) {
    counts[i] = digits.filter(d => d === i).length;
  }

  // Grid positions (row, col) starting from bottom-left
  const grid = [
    [3, 6, 9], // Top row - Mental
    [2, 5, 8], // Middle row - Emotional
    [1, 4, 7], // Bottom row - Physical
  ];

  // Analyze planes
  const planes = {
    mental: { numbers: [3, 6, 9], total: counts[3] + counts[6] + counts[9], meaning: 'Trí tuệ, phân tích, trực giác' },
    emotional: { numbers: [2, 5, 8], total: counts[2] + counts[5] + counts[8], meaning: 'Cảm xúc, tình cảm, trực giác' },
    physical: { numbers: [1, 4, 7], total: counts[1] + counts[4] + counts[7], meaning: 'Hành động, thực tế, vật chất' },
    thought: { numbers: [1, 2, 3], total: counts[1] + counts[2] + counts[3], meaning: 'Suy nghĩ, ý tưởng' },
    will: { numbers: [4, 5, 6], total: counts[4] + counts[5] + counts[6], meaning: 'Ý chí, quyết tâm' },
    action: { numbers: [7, 8, 9], total: counts[7] + counts[8] + counts[9], meaning: 'Hành động, sáng tạo' }
  };

  // Find arrows (special combinations)
  const arrows = [];

  // Determination Arrow (1-5-9)
  if (counts[1] && counts[5] && counts[9]) {
    arrows.push({ name: 'Mũi Tên Quyết Tâm', numbers: [1, 5, 9], meaning: 'Kiên định, không bỏ cuộc' });
  }

  // Spiritual Arrow (3-5-7)
  if (counts[3] && counts[5] && counts[7]) {
    arrows.push({ name: 'Mũi Tên Tâm Linh', numbers: [3, 5, 7], meaning: 'Trực giác mạnh, tâm linh' });
  }

  // Intellect Arrow (3-6-9)
  if (counts[3] && counts[6] && counts[9]) {
    arrows.push({ name: 'Mũi Tên Trí Tuệ', numbers: [3, 6, 9], meaning: 'Thông minh, học vấn cao' });
  }

  // Emotional Arrow (2-5-8)
  if (counts[2] && counts[5] && counts[8]) {
    arrows.push({ name: 'Mũi Tên Cảm Xúc', numbers: [2, 5, 8], meaning: 'Cân bằng cảm xúc, nhạy cảm' });
  }

  // Practical Arrow (1-4-7)
  if (counts[1] && counts[4] && counts[7]) {
    arrows.push({ name: 'Mũi Tên Thực Tế', numbers: [1, 4, 7], meaning: 'Chăm chỉ, thực dụng' });
  }

  // Planner Arrow (1-2-3)
  if (counts[1] && counts[2] && counts[3]) {
    arrows.push({ name: 'Mũi Tên Kế Hoạch', numbers: [1, 2, 3], meaning: 'Lập kế hoạch tốt' });
  }

  // Will Arrow (4-5-6)
  if (counts[4] && counts[5] && counts[6]) {
    arrows.push({ name: 'Mũi Tên Ý Chí', numbers: [4, 5, 6], meaning: 'Quyết tâm cao, kiên trì' });
  }

  // Activity Arrow (7-8-9)
  if (counts[7] && counts[8] && counts[9]) {
    arrows.push({ name: 'Mũi Tên Hoạt Động', numbers: [7, 8, 9], meaning: 'Năng động, hành động' });
  }

  // Find missing numbers
  const missingNumbers = Object.entries(counts)
    .filter(([_, count]) => count === 0)
    .map(([num, _]) => parseInt(num));

  // Find dominant numbers (appear more than once)
  const dominantNumbers = Object.entries(counts)
    .filter(([_, count]) => count > 1)
    .map(([num, count]) => ({ number: parseInt(num), count }));

  return {
    grid,
    counts,
    planes,
    arrows,
    missingNumbers,
    dominantNumbers,
    dateString
  };
}

/**
 * Calculate Pinnacle Pyramid
 * Four life pinnacles derived from birth date
 */
export function calculatePinnaclePyramid(day, month, year) {
  // Reduce day, month, year to single digits
  const dayNum = reduceToSingleDigit(day, false);
  const monthNum = reduceToSingleDigit(month, false);
  const yearNum = reduceToSingleDigit(year, false);

  // Calculate Life Path to determine pinnacle durations
  const lifePath = reduceToSingleDigit(dayNum + monthNum + yearNum);

  // First pinnacle ends at age: 36 - Life Path
  const firstEnd = 36 - lifePath;

  // Calculate pinnacle numbers
  const pinnacle1 = reduceToSingleDigit(dayNum + monthNum);
  const pinnacle2 = reduceToSingleDigit(dayNum + yearNum);
  const pinnacle3 = reduceToSingleDigit(pinnacle1 + pinnacle2);
  const pinnacle4 = reduceToSingleDigit(monthNum + yearNum);

  // Calculate challenge numbers (differences)
  const challenge1 = Math.abs(dayNum - monthNum);
  const challenge2 = Math.abs(dayNum - yearNum);
  const challenge3 = Math.abs(challenge1 - challenge2);
  const challenge4 = Math.abs(monthNum - yearNum);

  return {
    lifePath,
    foundation: { day: dayNum, month: monthNum, year: yearNum },
    pinnacles: [
      {
        number: pinnacle1,
        startAge: 0,
        endAge: firstEnd,
        period: `0 - ${firstEnd} tuổi`,
        meaning: getPinnacleMeaning(pinnacle1)
      },
      {
        number: pinnacle2,
        startAge: firstEnd + 1,
        endAge: firstEnd + 9,
        period: `${firstEnd + 1} - ${firstEnd + 9} tuổi`,
        meaning: getPinnacleMeaning(pinnacle2)
      },
      {
        number: pinnacle3,
        startAge: firstEnd + 10,
        endAge: firstEnd + 18,
        period: `${firstEnd + 10} - ${firstEnd + 18} tuổi`,
        meaning: getPinnacleMeaning(pinnacle3)
      },
      {
        number: pinnacle4,
        startAge: firstEnd + 19,
        endAge: null,
        period: `${firstEnd + 19}+ tuổi`,
        meaning: getPinnacleMeaning(pinnacle4)
      }
    ],
    challenges: [
      { number: challenge1, period: `0 - ${firstEnd} tuổi`, meaning: getChallengeMeaning(challenge1) },
      { number: challenge2, period: `${firstEnd + 1} - ${firstEnd + 9} tuổi`, meaning: getChallengeMeaning(challenge2) },
      { number: challenge3, period: `${firstEnd + 10} - ${firstEnd + 18} tuổi`, meaning: getChallengeMeaning(challenge3) },
      { number: challenge4, period: `${firstEnd + 19}+ tuổi`, meaning: getChallengeMeaning(challenge4) }
    ]
  };
}

/**
 * Calculate Life Cycles (3 periods)
 */
export function calculateLifeCycles(day, month, year) {
  const dayNum = reduceToSingleDigit(day);
  const monthNum = reduceToSingleDigit(month);
  const yearNum = reduceToSingleDigit(year);
  const lifePath = reduceToSingleDigit(dayNum + monthNum + yearNum);

  const firstEnd = 28 + (9 - lifePath);

  return {
    cycles: [
      {
        name: 'Chu Kỳ Hình Thành',
        number: monthNum,
        startAge: 0,
        endAge: firstEnd,
        period: `0 - ${firstEnd} tuổi`,
        meaning: getCycleMeaning(monthNum, 'formation')
      },
      {
        name: 'Chu Kỳ Phát Triển',
        number: dayNum,
        startAge: firstEnd + 1,
        endAge: firstEnd + 27,
        period: `${firstEnd + 1} - ${firstEnd + 27} tuổi`,
        meaning: getCycleMeaning(dayNum, 'productive')
      },
      {
        name: 'Chu Kỳ Thu Hoạch',
        number: yearNum,
        startAge: firstEnd + 28,
        endAge: null,
        period: `${firstEnd + 28}+ tuổi`,
        meaning: getCycleMeaning(yearNum, 'harvest')
      }
    ]
  };
}

/**
 * Get pinnacle meaning
 */
function getPinnacleMeaning(num) {
  const meanings = {
    1: 'Độc lập, khởi đầu mới, lãnh đạo',
    2: 'Hợp tác, kiên nhẫn, ngoại giao',
    3: 'Sáng tạo, biểu đạt, giao tiếp',
    4: 'Xây dựng nền tảng, kỷ luật',
    5: 'Thay đổi, tự do, mạo hiểm',
    6: 'Trách nhiệm gia đình, tình yêu',
    7: 'Học hỏi, tâm linh, nội tâm',
    8: 'Thành công vật chất, quyền lực',
    9: 'Hoàn thiện, nhân đạo, cho đi',
    11: 'Giác ngộ tâm linh, trực giác cao',
    22: 'Xây dựng vĩ đại, tầm nhìn lớn',
    33: 'Thầy giáo tâm linh, phục vụ'
  };
  return meanings[num] || meanings[reduceToSingleDigit(num, false)];
}

/**
 * Get challenge meaning
 */
function getChallengeMeaning(num) {
  const meanings = {
    0: 'Thử thách tổng hợp - cần cân bằng tất cả',
    1: 'Học cách độc lập, tin vào bản thân',
    2: 'Học cách hợp tác, kiên nhẫn',
    3: 'Học cách biểu đạt, tự tin',
    4: 'Học cách kỷ luật, tổ chức',
    5: 'Học cách thích nghi, linh hoạt',
    6: 'Học cách chịu trách nhiệm',
    7: 'Học cách tin tưởng, buông bỏ',
    8: 'Học cách cân bằng vật chất - tinh thần'
  };
  return meanings[num] || 'Thử thách cần vượt qua';
}

/**
 * Get cycle meaning
 */
function getCycleMeaning(num, cycleType) {
  const base = {
    1: 'phát triển cá nhân và độc lập',
    2: 'học hỏi về hợp tác và kiên nhẫn',
    3: 'sáng tạo và biểu đạt bản thân',
    4: 'xây dựng nền tảng vững chắc',
    5: 'trải nghiệm và thay đổi',
    6: 'trách nhiệm và tình yêu thương',
    7: 'phát triển trí tuệ và tâm linh',
    8: 'thành tựu và quyền lực',
    9: 'hoàn thiện và cho đi',
    11: 'giác ngộ và trực giác',
    22: 'xây dựng di sản vĩ đại'
  };

  const prefix = {
    formation: 'Giai đoạn học hỏi về',
    productive: 'Giai đoạn ứng dụng',
    harvest: 'Giai đoạn thu hoạch từ'
  };

  const baseNum = reduceToSingleDigit(num, false);
  return `${prefix[cycleType]} ${base[baseNum] || base[num]}`;
}

/**
 * Number meanings for interpretations
 */
export const NUMBER_MEANINGS = {
  1: {
    positive: ['Lãnh đạo', 'Độc lập', 'Sáng tạo', 'Tiên phong'],
    negative: ['Bướng bỉnh', 'Cô đơn', 'Ích kỷ'],
    element: 'Hỏa',
    color: '#C44536'
  },
  2: {
    positive: ['Hợp tác', 'Nhạy cảm', 'Ngoại giao', 'Kiên nhẫn'],
    negative: ['Do dự', 'Phụ thuộc', 'Quá nhạy cảm'],
    element: 'Thủy',
    color: '#3D5A80'
  },
  3: {
    positive: ['Sáng tạo', 'Biểu đạt', 'Vui vẻ', 'Lạc quan'],
    negative: ['Phân tán', 'Hời hợt', 'Ba hoa'],
    element: 'Mộc',
    color: '#4A7C59'
  },
  4: {
    positive: ['Kỷ luật', 'Thực tế', 'Đáng tin', 'Ổn định'],
    negative: ['Cứng nhắc', 'Bảo thủ', 'Thiếu linh hoạt'],
    element: 'Thổ',
    color: '#8B6914'
  },
  5: {
    positive: ['Tự do', 'Phiêu lưu', 'Linh hoạt', 'Năng động'],
    negative: ['Bồn chồn', 'Thiếu cam kết', 'Liều lĩnh'],
    element: 'Kim',
    color: '#7C7C7C'
  },
  6: {
    positive: ['Yêu thương', 'Trách nhiệm', 'Nuôi dưỡng', 'Hài hòa'],
    negative: ['Can thiệp', 'Lo âu', 'Hy sinh quá mức'],
    element: 'Thủy',
    color: '#0A6B5E'
  },
  7: {
    positive: ['Phân tích', 'Trí tuệ', 'Tâm linh', 'Hoàn hảo'],
    negative: ['Xa cách', 'Hoài nghi', 'Cô lập'],
    element: 'Thổ',
    color: '#6B4E71'
  },
  8: {
    positive: ['Thành công', 'Quyền lực', 'Doanh nhân', 'Tham vọng'],
    negative: ['Vật chất', 'Kiểm soát', 'Workaholic'],
    element: 'Kim',
    color: '#C9A227'
  },
  9: {
    positive: ['Nhân đạo', 'Rộng lượng', 'Sáng suốt', 'Hoàn thiện'],
    negative: ['Lý tưởng hóa', 'Mơ mộng', 'Không thực tế'],
    element: 'Hỏa',
    color: '#C44536'
  },
  11: {
    positive: ['Trực giác', 'Giác ngộ', 'Cảm hứng', 'Tầm nhìn'],
    negative: ['Căng thẳng', 'Quá nhạy cảm', 'Không thực tế'],
    element: 'Hỏa',
    color: '#E8C547'
  },
  22: {
    positive: ['Kiến trúc sư', 'Tầm nhìn', 'Xây dựng', 'Thực hiện'],
    negative: ['Áp lực', 'Kiểm soát', 'Quá tham vọng'],
    element: 'Thổ',
    color: '#C9A227'
  }
};

export default {
  calculateBirthdayChart,
  calculatePinnaclePyramid,
  calculateLifeCycles,
  reduceToSingleDigit,
  NUMBER_MEANINGS
};
