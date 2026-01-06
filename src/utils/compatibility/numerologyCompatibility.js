/**
 * Numerology Compatibility Calculator
 * Tính tương hợp theo Thần Số Học
 */

import { NumerologyCalculator } from '../numerologyMaster';

// Life Path Compatibility Matrix
export const LIFE_PATH_COMPATIBILITY = {
  1: {
    excellent: [3, 5],
    good: [1, 6, 9],
    neutral: [2, 7],
    challenging: [4, 8],
    descriptions: {
      1: 'Hai người số 1 đều muốn dẫn đầu, cần học cách chia sẻ quyền lực.',
      2: 'Số 1 mạnh mẽ có thể áp đảo số 2 nhạy cảm. Cần nhẹ nhàng.',
      3: 'Kết hợp tuyệt vời! Sáng tạo 3 + Lãnh đạo 1 = Thành công.',
      4: 'Số 1 thích tự do, số 4 thích ổn định. Cần điều hòa.',
      5: 'Cả hai đều năng động, phiêu lưu. Mối quan hệ sôi động!',
      6: 'Số 6 chăm sóc hỗ trợ tham vọng của số 1 rất tốt.',
      7: 'Số 1 hướng ngoại, số 7 hướng nội. Cần thời gian hiểu nhau.',
      8: 'Cả hai đều tham vọng, có thể cạnh tranh. Cần hợp tác.',
      9: 'Số 9 nhân ái bổ sung cho số 1 lãnh đạo. Tốt đẹp.'
    }
  },
  2: {
    excellent: [4, 8],
    good: [2, 6, 9],
    neutral: [1, 3, 5],
    challenging: [7],
    descriptions: {
      1: 'Số 2 hỗ trợ âm thầm cho số 1 tỏa sáng.',
      2: 'Rất hài hòa, hiểu nhau. Cần tránh quá nhạy cảm.',
      3: 'Số 3 vui vẻ làm số 2 thoải mái hơn.',
      4: 'Kết hợp tuyệt vời! Ổn định + Hài hòa = An toàn.',
      5: 'Số 5 thích thay đổi có thể làm số 2 bất an.',
      6: 'Rất hợp! Cả hai đều coi trọng gia đình, tình cảm.',
      7: 'Số 7 xa cách có thể làm số 2 cô đơn. Thách thức.',
      8: 'Kết hợp tốt! Số 2 ngoại giao + Số 8 quyền lực.',
      9: 'Số 9 nhân ái gặp số 2 nhạy cảm = Tình yêu sâu sắc.'
    }
  },
  3: {
    excellent: [1, 5, 9],
    good: [3, 6],
    neutral: [2, 7, 8],
    challenging: [4],
    descriptions: {
      1: 'Số 1 lãnh đạo + Số 3 sáng tạo = Đội ngũ mạnh mẽ.',
      2: 'Số 2 kiên nhẫn giúp số 3 tập trung hơn.',
      3: 'Rất vui vẻ nhưng có thể thiếu nghiêm túc.',
      4: 'Số 4 thực tế có thể kìm hãm số 3 sáng tạo.',
      5: 'Cực kỳ sáng tạo và phiêu lưu! Mối quan hệ thú vị.',
      6: 'Số 6 ổn định giúp số 3 có nền tảng.',
      7: 'Số 7 sâu sắc + Số 3 biểu đạt có thể bổ sung.',
      8: 'Số 8 thực dụng cần hiểu số 3 cần sáng tạo.',
      9: 'Kết hợp tuyệt vời của nghệ thuật và nhân đạo!'
    }
  },
  4: {
    excellent: [2, 8],
    good: [4, 6, 7],
    neutral: [1, 5, 9],
    challenging: [3],
    descriptions: {
      1: 'Cần cân bằng giữa tự do (1) và ổn định (4).',
      2: 'Kết hợp hoàn hảo! Ổn định + Hài hòa.',
      3: 'Số 3 sáng tạo có thể thấy số 4 nhàm chán.',
      4: 'Rất ổn định nhưng có thể thiếu đam mê.',
      5: 'Khó khăn! Số 5 thích thay đổi, số 4 thích ổn định.',
      6: 'Rất hợp! Cả hai đều coi trọng gia đình, trách nhiệm.',
      7: 'Số 7 trí tuệ + Số 4 thực tế = Cân bằng tốt.',
      8: 'Kết hợp mạnh mẽ! Xây dựng + Thành công.',
      9: 'Số 9 tầm nhìn xa, số 4 xây dựng nền tảng.'
    }
  },
  5: {
    excellent: [1, 3, 7],
    good: [5, 9],
    neutral: [6, 8],
    challenging: [2, 4],
    descriptions: {
      1: 'Cả hai đều năng động, độc lập. Rất thú vị!',
      2: 'Số 2 cần ổn định, số 5 thích thay đổi. Thách thức.',
      3: 'Kết hợp tuyệt vời của sáng tạo và tự do!',
      4: 'Xung đột giữa thay đổi (5) và ổn định (4).',
      5: 'Rất phiêu lưu nhưng ai sẽ là người ổn định?',
      6: 'Số 6 muốn ổn định, số 5 muốn tự do. Cần điều hòa.',
      7: 'Kết hợp thú vị! Tự do + Trí tuệ.',
      8: 'Cần cân bằng giữa tự do và trách nhiệm.',
      9: 'Cả hai đều thích trải nghiệm, khám phá. Tốt!'
    }
  },
  6: {
    excellent: [2, 9],
    good: [3, 4, 6],
    neutral: [1, 5, 8],
    challenging: [7],
    descriptions: {
      1: 'Số 6 hỗ trợ tham vọng của số 1.',
      2: 'Kết hợp rất hài hòa! Tình cảm và yêu thương.',
      3: 'Số 6 ổn định cho số 3 sáng tạo.',
      4: 'Rất hợp! Gia đình và trách nhiệm.',
      5: 'Cần cân bằng giữa tự do và trách nhiệm.',
      6: 'Rất yêu thương nhưng có thể quá bảo vệ.',
      7: 'Số 7 cần không gian riêng, số 6 muốn gần gũi.',
      8: 'Số 8 làm việc nhiều, số 6 cần sự chú ý.',
      9: 'Kết hợp tuyệt vời! Yêu thương vô điều kiện.'
    }
  },
  7: {
    excellent: [5],
    good: [3, 4, 7],
    neutral: [1, 9],
    challenging: [2, 6, 8],
    descriptions: {
      1: 'Cả hai đều độc lập, cần thời gian cho nhau.',
      2: 'Số 2 cần kết nối, số 7 cần cô đơn. Khó.',
      3: 'Số 3 biểu đạt + Số 7 sâu sắc có thể bổ sung.',
      4: 'Cả hai đều cần không gian riêng. Hiểu nhau.',
      5: 'Kết hợp thú vị! Trí tuệ + Phiêu lưu.',
      6: 'Số 6 muốn gần gũi, số 7 cần riêng tư. Thách thức.',
      7: 'Rất hiểu nhau nhưng có thể quá xa cách.',
      8: 'Xung đột giữa vật chất (8) và tâm linh (7).',
      9: 'Cả hai đều có chiều sâu tinh thần.'
    }
  },
  8: {
    excellent: [2, 4],
    good: [6, 8],
    neutral: [1, 3, 5],
    challenging: [7, 9],
    descriptions: {
      1: 'Cả hai đều tham vọng, cần hợp tác không cạnh tranh.',
      2: 'Kết hợp tốt! Ngoại giao + Quyền lực.',
      3: 'Số 8 cần hiểu số 3 cần sáng tạo tự do.',
      4: 'Kết hợp mạnh mẽ cho kinh doanh!',
      5: 'Cần cân bằng giữa tự do và trách nhiệm.',
      6: 'Số 6 cần sự chú ý từ số 8 bận rộn.',
      7: 'Xung đột giữa vật chất và tinh thần.',
      8: 'Rất mạnh mẽ nhưng ai quyết định?',
      9: 'Số 9 nhân đạo có thể thấy số 8 quá vật chất.'
    }
  },
  9: {
    excellent: [3, 6],
    good: [1, 2, 5, 9],
    neutral: [4, 7],
    challenging: [8],
    descriptions: {
      1: 'Số 9 nhân ái + Số 1 lãnh đạo = Tốt đẹp.',
      2: 'Tình yêu sâu sắc và đồng cảm.',
      3: 'Kết hợp nghệ thuật và nhân đạo!',
      4: 'Số 4 xây dựng nền tảng cho tầm nhìn số 9.',
      5: 'Cả hai đều thích trải nghiệm cuộc sống.',
      6: 'Kết hợp tuyệt vời! Yêu thương và phụng sự.',
      7: 'Cả hai đều có chiều sâu tinh thần.',
      8: 'Xung đột giữa cho đi (9) và tích lũy (8).',
      9: 'Rất nhân ái nhưng ai chăm sóc nhau?'
    }
  },
  // Master Numbers
  11: {
    excellent: [2, 4, 6],
    good: [9, 11, 22],
    neutral: [1, 3, 5, 7],
    challenging: [8],
    descriptions: {
      default: 'Số 11 là Master Number với trực giác cao. Cần đối tác hiểu và hỗ trợ.'
    }
  },
  22: {
    excellent: [4, 6, 8],
    good: [2, 11, 22],
    neutral: [1, 3, 9],
    challenging: [5, 7],
    descriptions: {
      default: 'Số 22 là Master Builder. Cần đối tác hỗ trợ tầm nhìn lớn.'
    }
  },
  33: {
    excellent: [6, 9],
    good: [3, 11, 22, 33],
    neutral: [1, 2, 4, 5],
    challenging: [7, 8],
    descriptions: {
      default: 'Số 33 là Master Teacher. Cần đối tác chia sẻ lý tưởng.'
    }
  }
};

// Expression Number Compatibility
export const EXPRESSION_HARMONY = {
  // Các số hài hòa với nhau
  creative: [1, 3, 5], // Sáng tạo, năng động
  nurturing: [2, 6, 9], // Quan tâm, yêu thương
  practical: [4, 8], // Thực tế, xây dựng
  spiritual: [7, 11, 22, 33] // Tâm linh, trực giác
};

// Soul Urge Compatibility
export const SOUL_URGE_HARMONY = {
  independent: [1, 5, 7], // Độc lập
  relationship: [2, 6], // Quan hệ
  achievement: [3, 8, 9], // Thành tựu
  wisdom: [4, 7, 11, 22] // Trí tuệ
};

/**
 * Tính điểm tương hợp Life Path
 */
export function calculateLifePathCompatibility(lp1, lp2) {
  const matrix = LIFE_PATH_COMPATIBILITY[lp1] || LIFE_PATH_COMPATIBILITY[9];

  let score, level;
  if (matrix.excellent.includes(lp2)) {
    score = 95;
    level = 'excellent';
  } else if (matrix.good.includes(lp2)) {
    score = 80;
    level = 'good';
  } else if (matrix.neutral.includes(lp2)) {
    score = 65;
    level = 'neutral';
  } else if (matrix.challenging.includes(lp2)) {
    score = 45;
    level = 'challenging';
  } else {
    score = 60;
    level = 'neutral';
  }

  const description = matrix.descriptions?.[lp2] || matrix.descriptions?.default ||
    `Số ${lp1} và số ${lp2} có mối quan hệ ${level === 'excellent' ? 'tuyệt vời' : level === 'good' ? 'tốt' : level === 'neutral' ? 'trung tính' : 'thách thức'}.`;

  return {
    score,
    level,
    description,
    person1: lp1,
    person2: lp2
  };
}

/**
 * Tính điểm tương hợp Expression
 */
export function calculateExpressionCompatibility(exp1, exp2) {
  // Tìm nhóm của mỗi số
  let group1 = null, group2 = null;

  for (const [groupName, numbers] of Object.entries(EXPRESSION_HARMONY)) {
    if (numbers.includes(exp1)) group1 = groupName;
    if (numbers.includes(exp2)) group2 = groupName;
  }

  let score, description;

  if (group1 === group2 && group1) {
    score = 90;
    description = `Cả hai đều thuộc nhóm ${group1}, rất hài hòa trong cách biểu đạt.`;
  } else if ((group1 === 'creative' && group2 === 'nurturing') ||
             (group1 === 'nurturing' && group2 === 'creative')) {
    score = 85;
    description = 'Sáng tạo và quan tâm bổ sung cho nhau.';
  } else if ((group1 === 'practical' && group2 === 'spiritual') ||
             (group1 === 'spiritual' && group2 === 'practical')) {
    score = 55;
    description = 'Thực tế và tâm linh có thể xung đột, cần cân bằng.';
  } else {
    score = 70;
    description = 'Biểu đạt khác nhau, cần học cách hiểu nhau.';
  }

  return {
    score,
    description,
    group1,
    group2,
    person1: exp1,
    person2: exp2
  };
}

/**
 * Tính điểm tương hợp Soul Urge
 */
export function calculateSoulUrgeCompatibility(su1, su2) {
  let group1 = null, group2 = null;

  for (const [groupName, numbers] of Object.entries(SOUL_URGE_HARMONY)) {
    if (numbers.includes(su1)) group1 = groupName;
    if (numbers.includes(su2)) group2 = groupName;
  }

  let score, description;

  if (group1 === group2 && group1) {
    score = 95;
    description = `Cùng khao khát ${group1 === 'independent' ? 'độc lập' : group1 === 'relationship' ? 'quan hệ' : group1 === 'achievement' ? 'thành tựu' : 'trí tuệ'}, rất đồng điệu.`;
  } else if (su1 === su2) {
    score = 92;
    description = 'Cùng số Linh Hồn, thấu hiểu sâu sắc mong muốn của nhau.';
  } else if ((group1 === 'independent' && group2 === 'relationship') ||
             (group1 === 'relationship' && group2 === 'independent')) {
    score = 50;
    description = 'Một người cần độc lập, một người cần gắn bó. Cần điều hòa.';
  } else {
    score = 70;
    description = 'Khao khát khác nhau, cần tôn trọng nhu cầu của đối phương.';
  }

  return {
    score,
    description,
    group1,
    group2,
    person1: su1,
    person2: su2
  };
}

/**
 * Tính toàn bộ tương hợp Thần Số Học
 */
export function calculateFullNumerologyCompatibility(person1Data, person2Data) {
  // Tạo calculator cho mỗi người
  const calc1 = new NumerologyCalculator(person1Data.name, person1Data.birthDate);
  const calc2 = new NumerologyCalculator(person2Data.name, person2Data.birthDate);

  const profile1 = calc1.getFullProfile();
  const profile2 = calc2.getFullProfile();

  // Tính các loại tương hợp
  const lifePath = calculateLifePathCompatibility(
    profile1.coreNumbers.lifePath.value,
    profile2.coreNumbers.lifePath.value
  );

  const expression = calculateExpressionCompatibility(
    profile1.coreNumbers.expression.value,
    profile2.coreNumbers.expression.value
  );

  const soulUrge = calculateSoulUrgeCompatibility(
    profile1.coreNumbers.soulUrge.value,
    profile2.coreNumbers.soulUrge.value
  );

  // Personality compatibility
  const personality1 = profile1.coreNumbers.personality.value;
  const personality2 = profile2.coreNumbers.personality.value;
  const personalityScore = personality1 === personality2 ? 85 :
    Math.abs(personality1 - personality2) <= 2 ? 75 : 65;

  // Tính điểm tổng
  const weights = {
    lifePath: 0.40,
    expression: 0.25,
    soulUrge: 0.25,
    personality: 0.10
  };

  const totalScore = Math.round(
    lifePath.score * weights.lifePath +
    expression.score * weights.expression +
    soulUrge.score * weights.soulUrge +
    personalityScore * weights.personality
  );

  return {
    totalScore,
    breakdown: {
      lifePath,
      expression,
      soulUrge,
      personality: {
        score: personalityScore,
        person1: personality1,
        person2: personality2,
        description: personality1 === personality2 ?
          'Cùng số Nhân Cách, ấn tượng ban đầu rất hợp.' :
          'Ấn tượng ban đầu khác nhau, cần thời gian làm quen.'
      }
    },
    profiles: {
      person1: profile1,
      person2: profile2
    },
    advice: generateNumerologyAdvice(totalScore, lifePath.level)
  };
}

/**
 * Tạo lời khuyên dựa trên kết quả
 */
function generateNumerologyAdvice(score, lifePathLevel) {
  if (score >= 85) {
    return 'Mối quan hệ có nền tảng số học rất vững chắc. Hai bạn có sự đồng điệu tự nhiên trong cách sống và mục tiêu cuộc đời.';
  } else if (score >= 70) {
    return 'Mối quan hệ tốt với một số khác biệt có thể bổ sung cho nhau. Tập trung vào điểm mạnh chung.';
  } else if (score >= 55) {
    return 'Có một số thách thức trong mối quan hệ. Cần kiên nhẫn và thấu hiểu lẫn nhau.';
  } else {
    return 'Mối quan hệ đòi hỏi nhiều nỗ lực. Hãy tập trung vào giao tiếp và tôn trọng sự khác biệt.';
  }
}

export default {
  LIFE_PATH_COMPATIBILITY,
  EXPRESSION_HARMONY,
  SOUL_URGE_HARMONY,
  calculateLifePathCompatibility,
  calculateExpressionCompatibility,
  calculateSoulUrgeCompatibility,
  calculateFullNumerologyCompatibility
};
