/**
 * Master Compatibility Calculator
 * Tổng hợp tất cả các phương pháp tính tương hợp
 */

import {
  getZodiacFromYear,
  calculateZodiacCompatibility,
  getFullZodiacCompatibility,
  ZODIAC_ANIMALS
} from './zodiacCompatibility';

import {
  getElementFromYear,
  calculateElementCompatibility,
  getFullElementCompatibility,
  NGU_HANH
} from './elementCompatibility';

import {
  calculateFullNumerologyCompatibility,
  calculateLifePathCompatibility
} from './numerologyCompatibility';

import { NumerologyCalculator } from '../numerologyMaster';

// Relationship types
export const RELATIONSHIP_TYPES = {
  love: {
    id: 'love',
    name: 'Tình Yêu',
    icon: '💑',
    weights: {
      zodiac: 0.25,
      element: 0.20,
      lifePath: 0.25,
      expression: 0.15,
      soulUrge: 0.15
    }
  },
  friendship: {
    id: 'friendship',
    name: 'Bạn Bè',
    icon: '👫',
    weights: {
      zodiac: 0.20,
      element: 0.15,
      lifePath: 0.30,
      expression: 0.20,
      soulUrge: 0.15
    }
  },
  business: {
    id: 'business',
    name: 'Công Việc',
    icon: '💼',
    weights: {
      zodiac: 0.15,
      element: 0.20,
      lifePath: 0.25,
      expression: 0.30,
      soulUrge: 0.10
    }
  },
  family: {
    id: 'family',
    name: 'Gia Đình',
    icon: '👨‍👩‍👧',
    weights: {
      zodiac: 0.30,
      element: 0.25,
      lifePath: 0.20,
      expression: 0.10,
      soulUrge: 0.15
    }
  }
};

// Compatibility categories
export const COMPATIBILITY_CATEGORIES = {
  excellent: { min: 85, label: 'Thiên Sinh Một Cặp', emoji: '💕', color: '#FFD700' },
  great: { min: 75, label: 'Rất Hợp Nhau', emoji: '❤️', color: '#FF69B4' },
  good: { min: 65, label: 'Khá Hợp', emoji: '💛', color: '#90EE90' },
  neutral: { min: 55, label: 'Bình Thường', emoji: '💚', color: '#87CEEB' },
  challenging: { min: 40, label: 'Cần Cố Gắng', emoji: '💙', color: '#DDA0DD' },
  difficult: { min: 0, label: 'Nhiều Thử Thách', emoji: '💔', color: '#DC143C' }
};

/**
 * Main Compatibility Calculator Class
 */
export class CompatibilityCalculator {
  constructor(person1, person2, relationshipType = 'love') {
    this.person1 = this.validatePerson(person1);
    this.person2 = this.validatePerson(person2);
    this.relationshipType = relationshipType;
    this.weights = RELATIONSHIP_TYPES[relationshipType]?.weights || RELATIONSHIP_TYPES.love.weights;

    // Pre-calculate all data
    this.initializeData();
  }

  validatePerson(person) {
    if (!person.name || !person.birthDate) {
      throw new Error('Person must have name and birthDate');
    }

    const birthDate = person.birthDate instanceof Date ?
      person.birthDate :
      new Date(person.birthDate);

    return {
      name: person.name,
      birthDate,
      year: birthDate.getFullYear(),
      gender: person.gender || 'unknown'
    };
  }

  initializeData() {
    // Zodiac
    this.person1.zodiac = getZodiacFromYear(this.person1.year);
    this.person2.zodiac = getZodiacFromYear(this.person2.year);
    this.person1.zodiacInfo = ZODIAC_ANIMALS[this.person1.zodiac];
    this.person2.zodiacInfo = ZODIAC_ANIMALS[this.person2.zodiac];

    // Element
    this.person1.element = getElementFromYear(this.person1.year);
    this.person2.element = getElementFromYear(this.person2.year);
    this.person1.elementInfo = NGU_HANH[this.person1.element];
    this.person2.elementInfo = NGU_HANH[this.person2.element];

    // Numerology
    const dateStr1 = this.formatDateString(this.person1.birthDate);
    const dateStr2 = this.formatDateString(this.person2.birthDate);

    this.person1.numerology = new NumerologyCalculator(this.person1.name, dateStr1);
    this.person2.numerology = new NumerologyCalculator(this.person2.name, dateStr2);

    this.person1.profile = this.person1.numerology.getFullProfile();
    this.person2.profile = this.person2.numerology.getFullProfile();
  }

  formatDateString(date) {
    const d = date instanceof Date ? date : new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  /**
   * Calculate overall compatibility score
   */
  calculateOverallScore() {
    const scores = {
      zodiac: this.calculateZodiacScore(),
      element: this.calculateElementScore(),
      lifePath: this.calculateLifePathScore(),
      expression: this.calculateExpressionScore(),
      soulUrge: this.calculateSoulUrgeScore()
    };

    // Calculate weighted total
    let totalScore = 0;
    Object.keys(scores).forEach(key => {
      totalScore += scores[key].score * this.weights[key];
    });

    const overall = Math.round(totalScore);
    const category = this.getCategory(overall);

    return {
      overall,
      category,
      breakdown: scores,
      insights: this.generateInsights(scores),
      advice: this.generateAdvice(scores, category),
      strengths: this.findStrengths(scores),
      challenges: this.findChallenges(scores)
    };
  }

  /**
   * Calculate Zodiac compatibility score
   */
  calculateZodiacScore() {
    const result = calculateZodiacCompatibility(
      this.person1.zodiac,
      this.person2.zodiac
    );

    return {
      score: result.score,
      type: result.type,
      meaning: result.meaning,
      person1: {
        zodiac: this.person1.zodiac,
        animal: this.person1.zodiacInfo?.animal,
        emoji: this.person1.zodiacInfo?.emoji
      },
      person2: {
        zodiac: this.person2.zodiac,
        animal: this.person2.zodiacInfo?.animal,
        emoji: this.person2.zodiacInfo?.emoji
      }
    };
  }

  /**
   * Calculate Element compatibility score
   */
  calculateElementScore() {
    const result = calculateElementCompatibility(
      this.person1.element,
      this.person2.element
    );

    return {
      score: result.score,
      type: result.type,
      relationship: result.relationship,
      meaning: result.meaning,
      detail: result.detail,
      person1: {
        element: this.person1.element,
        emoji: this.person1.elementInfo?.emoji
      },
      person2: {
        element: this.person2.element,
        emoji: this.person2.elementInfo?.emoji
      }
    };
  }

  /**
   * Calculate Life Path compatibility score
   */
  calculateLifePathScore() {
    const lp1 = this.person1.profile.coreNumbers.lifePath.value;
    const lp2 = this.person2.profile.coreNumbers.lifePath.value;
    const result = calculateLifePathCompatibility(lp1, lp2);

    return {
      score: result.score,
      level: result.level,
      description: result.description,
      person1: lp1,
      person2: lp2
    };
  }

  /**
   * Calculate Expression compatibility score
   */
  calculateExpressionScore() {
    const exp1 = this.person1.profile.coreNumbers.expression.value;
    const exp2 = this.person2.profile.coreNumbers.expression.value;

    // Same expression number
    if (exp1 === exp2) {
      return {
        score: 90,
        description: `Cùng số Biểu Đạt ${exp1}, rất hài hòa trong cách thể hiện.`,
        person1: exp1,
        person2: exp2
      };
    }

    // Calculate based on difference
    const diff = Math.abs(exp1 - exp2);
    let score, description;

    if (diff <= 2) {
      score = 80;
      description = 'Số Biểu Đạt gần nhau, dễ hòa hợp trong cách biểu đạt.';
    } else if (diff <= 4) {
      score = 65;
      description = 'Số Biểu Đạt khác biệt, cần học cách hiểu phong cách của nhau.';
    } else {
      score = 55;
      description = 'Cách biểu đạt rất khác nhau, cần kiên nhẫn.';
    }

    return { score, description, person1: exp1, person2: exp2 };
  }

  /**
   * Calculate Soul Urge compatibility score
   */
  calculateSoulUrgeScore() {
    const su1 = this.person1.profile.coreNumbers.soulUrge.value;
    const su2 = this.person2.profile.coreNumbers.soulUrge.value;

    if (su1 === su2) {
      return {
        score: 95,
        description: `Cùng số Linh Hồn ${su1}, thấu hiểu sâu sắc mong muốn của nhau.`,
        person1: su1,
        person2: su2
      };
    }

    const diff = Math.abs(su1 - su2);
    let score, description;

    if (diff <= 2) {
      score = 80;
      description: 'Khao khát bên trong tương đồng, dễ đồng cảm.';
    } else if (diff <= 4) {
      score = 65;
      description = 'Mong muốn khác biệt, cần tôn trọng nhu cầu của nhau.';
    } else {
      score = 50;
      description = 'Khao khát rất khác nhau, cần giao tiếp cởi mở.';
    }

    return { score, description, person1: su1, person2: su2 };
  }

  /**
   * Get compatibility category
   */
  getCategory(score) {
    for (const [key, cat] of Object.entries(COMPATIBILITY_CATEGORIES)) {
      if (score >= cat.min) {
        return { level: key, ...cat };
      }
    }
    return { level: 'difficult', ...COMPATIBILITY_CATEGORIES.difficult };
  }

  /**
   * Generate insights based on scores
   */
  generateInsights(scores) {
    const insights = [];

    // Zodiac insight
    if (scores.zodiac.score >= 85) {
      insights.push({
        type: 'positive',
        category: 'zodiac',
        text: `${scores.zodiac.person1.emoji} và ${scores.zodiac.person2.emoji} ${scores.zodiac.meaning}`
      });
    } else if (scores.zodiac.score <= 40) {
      insights.push({
        type: 'warning',
        category: 'zodiac',
        text: `Con giáp ${scores.zodiac.type}: ${scores.zodiac.meaning}`
      });
    }

    // Element insight
    if (scores.element.type === 'SINH' || scores.element.type === 'DUOC_SINH') {
      insights.push({
        type: 'positive',
        category: 'element',
        text: scores.element.meaning
      });
    } else if (scores.element.type === 'KHAC' || scores.element.type === 'BI_KHAC') {
      insights.push({
        type: 'warning',
        category: 'element',
        text: scores.element.meaning
      });
    }

    // Life Path insight
    if (scores.lifePath.level === 'excellent') {
      insights.push({
        type: 'positive',
        category: 'lifePath',
        text: `Số Chủ Đạo ${scores.lifePath.person1} và ${scores.lifePath.person2}: ${scores.lifePath.description}`
      });
    } else if (scores.lifePath.level === 'challenging') {
      insights.push({
        type: 'warning',
        category: 'lifePath',
        text: `Số Chủ Đạo có thách thức: ${scores.lifePath.description}`
      });
    }

    // Soul Urge insight
    if (scores.soulUrge.person1 === scores.soulUrge.person2) {
      insights.push({
        type: 'positive',
        category: 'soulUrge',
        text: scores.soulUrge.description
      });
    }

    return insights;
  }

  /**
   * Find strengths in the relationship
   */
  findStrengths(scores) {
    return Object.entries(scores)
      .filter(([_, data]) => data.score >= 75)
      .map(([key, data]) => ({
        category: key,
        score: data.score,
        description: this.getCategoryDescription(key, data, 'strength')
      }))
      .sort((a, b) => b.score - a.score);
  }

  /**
   * Find challenges in the relationship
   */
  findChallenges(scores) {
    return Object.entries(scores)
      .filter(([_, data]) => data.score < 55)
      .map(([key, data]) => ({
        category: key,
        score: data.score,
        description: this.getCategoryDescription(key, data, 'challenge')
      }))
      .sort((a, b) => a.score - b.score);
  }

  getCategoryDescription(category, data, type) {
    const descriptions = {
      zodiac: {
        strength: `Con giáp ${data.person1?.emoji || ''} ${data.person1?.zodiac} và ${data.person2?.emoji || ''} ${data.person2?.zodiac} rất hợp nhau`,
        challenge: `Con giáp có xung khắc, cần cẩn thận trong giao tiếp`
      },
      element: {
        strength: `Ngũ Hành ${data.person1?.element} và ${data.person2?.element} tương sinh`,
        challenge: `Ngũ Hành tương khắc, cần điều hòa`
      },
      lifePath: {
        strength: `Số Chủ Đạo ${data.person1} và ${data.person2} bổ sung hoàn hảo`,
        challenge: `Số Chủ Đạo có thách thức, cần thấu hiểu`
      },
      expression: {
        strength: `Cách biểu đạt hài hòa`,
        challenge: `Cách biểu đạt khác biệt`
      },
      soulUrge: {
        strength: `Khao khát bên trong đồng điệu`,
        challenge: `Mong muốn bên trong khác nhau`
      }
    };

    return descriptions[category]?.[type] || '';
  }

  /**
   * Generate comprehensive advice
   */
  generateAdvice(scores, category) {
    const advices = [];

    // Overall advice based on category
    const overallAdvice = {
      excellent: 'Hai bạn có sự kết nối đặc biệt từ số phận. Hãy trân trọng và vun đắp mối quan hệ này.',
      great: 'Mối quan hệ có nền tảng vững chắc. Tập trung vào điểm mạnh chung để phát triển.',
      good: 'Có tiềm năng tốt đẹp. Cần đầu tư thời gian để hiểu nhau hơn.',
      neutral: 'Mối quan hệ cần nỗ lực từ cả hai bên. Giao tiếp cởi mở là chìa khóa.',
      challenging: 'Có nhiều điểm cần điều hòa. Kiên nhẫn và thấu hiểu sẽ giúp vượt qua.',
      difficult: 'Mối quan hệ đòi hỏi nỗ lực lớn. Hãy xem xét kỹ trước khi cam kết.'
    };

    advices.push({
      type: 'overall',
      text: overallAdvice[category.level]
    });

    // Specific advice based on scores
    if (scores.zodiac.score < 50) {
      advices.push({
        type: 'zodiac',
        text: 'Về con giáp: Tránh tranh cãi vào những ngày xung tuổi. Học cách nhường nhịn.'
      });
    }

    if (scores.element.type === 'KHAC' || scores.element.type === 'BI_KHAC') {
      advices.push({
        type: 'element',
        text: 'Về ngũ hành: Người bị khắc nên linh hoạt hơn. Tìm điểm cân bằng trong mối quan hệ.'
      });
    }

    if (scores.lifePath.level === 'challenging') {
      advices.push({
        type: 'numerology',
        text: `Về số học: ${scores.lifePath.description} Hãy tôn trọng sự khác biệt.`
      });
    }

    return advices;
  }

  /**
   * Get full compatibility report
   */
  getFullReport() {
    const overallResult = this.calculateOverallScore();

    return {
      // Basic info
      person1: {
        name: this.person1.name,
        birthDate: this.person1.birthDate,
        year: this.person1.year,
        zodiac: this.person1.zodiac,
        zodiacInfo: this.person1.zodiacInfo,
        element: this.person1.element,
        elementInfo: this.person1.elementInfo,
        lifePath: this.person1.profile.coreNumbers.lifePath.value,
        expression: this.person1.profile.coreNumbers.expression.value,
        soulUrge: this.person1.profile.coreNumbers.soulUrge.value
      },
      person2: {
        name: this.person2.name,
        birthDate: this.person2.birthDate,
        year: this.person2.year,
        zodiac: this.person2.zodiac,
        zodiacInfo: this.person2.zodiacInfo,
        element: this.person2.element,
        elementInfo: this.person2.elementInfo,
        lifePath: this.person2.profile.coreNumbers.lifePath.value,
        expression: this.person2.profile.coreNumbers.expression.value,
        soulUrge: this.person2.profile.coreNumbers.soulUrge.value
      },

      // Compatibility results
      relationshipType: RELATIONSHIP_TYPES[this.relationshipType],
      result: overallResult,

      // Timestamp
      generatedAt: new Date().toISOString()
    };
  }
}

/**
 * Quick compatibility check
 */
export function quickCompatibilityCheck(birthYear1, birthYear2) {
  const zodiac1 = getZodiacFromYear(birthYear1);
  const zodiac2 = getZodiacFromYear(birthYear2);
  const element1 = getElementFromYear(birthYear1);
  const element2 = getElementFromYear(birthYear2);

  const zodiacResult = calculateZodiacCompatibility(zodiac1, zodiac2);
  const elementResult = calculateElementCompatibility(element1, element2);

  const avgScore = Math.round((zodiacResult.score + elementResult.score) / 2);

  return {
    score: avgScore,
    zodiac: { person1: zodiac1, person2: zodiac2, result: zodiacResult },
    element: { person1: element1, person2: element2, result: elementResult }
  };
}

export default {
  CompatibilityCalculator,
  RELATIONSHIP_TYPES,
  COMPATIBILITY_CATEGORIES,
  quickCompatibilityCheck
};
