/**
 * Cross-Reference Analysis Engine
 * Correlates data between Tu Vi, Numerology, Palmistry, and Physiognomy
 */

// Element compatibility chart
const ELEMENT_RELATIONS = {
  // Tương sinh (generating)
  generating: {
    'Mộc': 'Hỏa',
    'Hỏa': 'Thổ',
    'Thổ': 'Kim',
    'Kim': 'Thủy',
    'Thủy': 'Mộc'
  },
  // Tương khắc (overcoming)
  overcoming: {
    'Mộc': 'Thổ',
    'Thổ': 'Thủy',
    'Thủy': 'Hỏa',
    'Hỏa': 'Kim',
    'Kim': 'Mộc'
  }
};

// Life path to element mapping
const LIFE_PATH_ELEMENTS = {
  1: 'Hỏa', // Fire - leadership, pioneering
  2: 'Thủy', // Water - cooperation, sensitivity
  3: 'Mộc', // Wood - creativity, growth
  4: 'Thổ', // Earth - stability, practicality
  5: 'Kim', // Metal - freedom, change
  6: 'Thủy', // Water - nurturing, harmony
  7: 'Thổ', // Earth - analysis, wisdom
  8: 'Kim', // Metal - power, success
  9: 'Hỏa', // Fire - humanitarian, completion
  11: 'Hỏa', // Fire - spiritual enlightenment
  22: 'Thổ'  // Earth - master builder
};

/**
 * Main cross-reference analysis function
 */
export function crossReferenceAnalysis(tuViData, numerologyData, palmistryData = null, physiognomyData = null) {
  const correlations = [];
  const insights = [];
  let harmonyScore = 70; // Base score

  // Get Tu Vi element
  const tuViElement = tuViData?.cuc?.element || null;

  // Get Numerology element based on life path
  const numerologyElement = LIFE_PATH_ELEMENTS[numerologyData?.lifePath] || null;

  // === Element Harmony Analysis ===
  if (tuViElement && numerologyElement) {
    const elementRelation = analyzeElementRelation(tuViElement, numerologyElement);
    correlations.push(elementRelation);

    if (elementRelation.type === 'harmony') {
      harmonyScore += 10;
    } else if (elementRelation.type === 'conflict') {
      harmonyScore -= 5;
    }
  }

  // === Life Path + Menh Star Correlation ===
  if (numerologyData?.lifePath && tuViData?.menhMainStar) {
    const starCorrelation = analyzeStarLifePath(tuViData.menhMainStar, numerologyData.lifePath);
    if (starCorrelation) {
      correlations.push(starCorrelation);
      if (starCorrelation.strength === 'strong') harmonyScore += 8;
    }
  }

  // === Birth Hour + Personality Number ===
  if (tuViData?.birthHour && numerologyData?.personality) {
    const hourPersonality = analyzeHourPersonality(tuViData.birthHour.chi, numerologyData.personality);
    if (hourPersonality) {
      correlations.push(hourPersonality);
      if (hourPersonality.strength === 'strong') harmonyScore += 5;
    }
  }

  // === Palmistry correlations (if available) ===
  if (palmistryData) {
    const palmCorrelations = analyzePalmistry(palmistryData, tuViData, numerologyData);
    correlations.push(...palmCorrelations);
    harmonyScore += palmCorrelations.filter(c => c.strength === 'strong').length * 3;
  }

  // === Physiognomy correlations (if available) ===
  if (physiognomyData) {
    const faceCorrelations = analyzePhysiognomy(physiognomyData, tuViData, numerologyData);
    correlations.push(...faceCorrelations);
    harmonyScore += faceCorrelations.filter(c => c.strength === 'strong').length * 3;
  }

  // === Generate Key Insights ===
  insights.push(...generateKeyInsights(correlations, tuViData, numerologyData));

  // === Cap harmony score ===
  harmonyScore = Math.min(100, Math.max(0, harmonyScore));

  return {
    correlations,
    overallScore: harmonyScore,
    scoreLevel: getScoreLevel(harmonyScore),
    keyInsights: insights,
    recommendations: generateRecommendations(correlations, tuViData, numerologyData),
    summary: generateSummary(harmonyScore, correlations)
  };
}

/**
 * Analyze element relationship
 */
function analyzeElementRelation(element1, element2) {
  if (element1 === element2) {
    return {
      type: 'same',
      strength: 'moderate',
      elements: [element1, element2],
      insight: `Cùng hành ${element1} - Năng lượng tập trung, đặc điểm được khuếch đại`
    };
  }

  if (ELEMENT_RELATIONS.generating[element1] === element2) {
    return {
      type: 'harmony',
      strength: 'strong',
      elements: [element1, element2],
      insight: `${element1} sinh ${element2} - Tương sinh tốt lành, năng lượng hỗ trợ`
    };
  }

  if (ELEMENT_RELATIONS.generating[element2] === element1) {
    return {
      type: 'harmony',
      strength: 'strong',
      elements: [element1, element2],
      insight: `${element2} sinh ${element1} - Được hỗ trợ bởi nguồn năng lượng tự nhiên`
    };
  }

  if (ELEMENT_RELATIONS.overcoming[element1] === element2) {
    return {
      type: 'conflict',
      strength: 'moderate',
      elements: [element1, element2],
      insight: `${element1} khắc ${element2} - Cần cân bằng để chuyển hóa năng lượng xung đột`
    };
  }

  return {
    type: 'neutral',
    strength: 'weak',
    elements: [element1, element2],
    insight: `${element1} và ${element2} - Quan hệ trung hòa, cần chủ động tạo sự hài hòa`
  };
}

/**
 * Analyze correlation between main star and life path
 */
function analyzeStarLifePath(mainStar, lifePath) {
  const starTraits = {
    'tuVi': { numbers: [1, 8], trait: 'lãnh đạo' },
    'thienPhu': { numbers: [6, 8], trait: 'quý nhân' },
    'thaiDuong': { numbers: [1, 3], trait: 'quang minh' },
    'thaiAm': { numbers: [2, 6], trait: 'tài lộc' },
    'thamLang': { numbers: [3, 5], trait: 'đa tài' },
    'thienCo': { numbers: [7, 5], trait: 'mưu trí' },
    'thatSat': { numbers: [1, 8], trait: 'quyền lực' },
    'phaQuan': { numbers: [5, 9], trait: 'tiên phong' }
  };

  if (!mainStar?.id) return null;

  const traits = starTraits[mainStar.id];
  if (!traits) return null;

  if (traits.numbers.includes(lifePath)) {
    return {
      type: 'confirmation',
      strength: 'strong',
      insight: `${mainStar.name} tọa Mệnh + Số Chủ Đạo ${lifePath}: Đặc điểm ${traits.trait} được nhân đôi, tiềm năng rất lớn`
    };
  }

  return {
    type: 'complementary',
    strength: 'moderate',
    insight: `${mainStar.name} kết hợp Số ${lifePath}: Tạo nên sự đa dạng trong tính cách và năng lực`
  };
}

/**
 * Analyze birth hour and personality number correlation
 */
function analyzeHourPersonality(birthHourChi, personalityNum) {
  const hourTraits = {
    'Tý': { numbers: [7], trait: 'bí ẩn, sáng tạo đêm khuya' },
    'Dần': { numbers: [1, 8], trait: 'dũng mãnh, tiên phong' },
    'Thìn': { numbers: [8], trait: 'quyền lực, may mắn' },
    'Ngọ': { numbers: [1, 5], trait: 'năng động, tự do' },
    'Thân': { numbers: [3, 5], trait: 'thông minh, linh hoạt' },
    'Dậu': { numbers: [4], trait: 'kỷ luật, chính xác' }
  };

  const traits = hourTraits[birthHourChi];
  if (!traits) return null;

  if (traits.numbers.includes(personalityNum)) {
    return {
      type: 'alignment',
      strength: 'strong',
      insight: `Giờ sinh ${birthHourChi} + Số Nhân Cách ${personalityNum}: Tính cách ${traits.trait} thể hiện rõ trong cách người khác nhìn nhận bạn`
    };
  }

  return null;
}

/**
 * Analyze palmistry correlations
 */
function analyzePalmistry(palmData, tuViData, numData) {
  const correlations = [];

  // Life line + Life path correlation
  if (palmData.lifeLine === 'Dài và rõ' && numData?.lifePath) {
    if ([1, 8, 22].includes(numData.lifePath)) {
      correlations.push({
        type: 'confirmation',
        strength: 'strong',
        source: 'palmistry',
        insight: 'Đường Sinh Mệnh dài rõ + Số Chủ Đạo mạnh: Sức sống dồi dào, thành công lâu dài'
      });
    }
  }

  // Heart line + relationship stars
  if (palmData.heartLine === 'Cong lên') {
    correlations.push({
      type: 'trait',
      strength: 'moderate',
      source: 'palmistry',
      insight: 'Đường Tình Cảm cong lên: Biểu hiện tình cảm mạnh mẽ, chủ động trong tình yêu'
    });
  }

  // Fate line + career palace
  if (palmData.fateLine === 'Rõ ràng' && tuViData?.palaces) {
    correlations.push({
      type: 'confirmation',
      strength: 'strong',
      source: 'palmistry',
      insight: 'Đường Sự Nghiệp rõ ràng: Định hướng nghề nghiệp rõ ràng, thăng tiến ổn định'
    });
  }

  return correlations;
}

/**
 * Analyze physiognomy correlations
 */
function analyzePhysiognomy(faceData, tuViData, numData) {
  const correlations = [];

  // Forehead + Tu Vi star
  if (faceData.forehead === 'Cao rộng' && tuViData?.menhMainStar?.id === 'tuVi') {
    correlations.push({
      type: 'confirmation',
      strength: 'very_strong',
      source: 'physiognomy',
      insight: 'Thiên Đình cao rộng + Tử Vi tọa Mệnh: Quý cách hiếm có, sinh ra để lãnh đạo'
    });
  }

  // Eyes + life path
  if (faceData.eyes === 'To tròn' && [3, 9].includes(numData?.lifePath)) {
    correlations.push({
      type: 'alignment',
      strength: 'moderate',
      source: 'physiognomy',
      insight: 'Mắt to tròn + Số sáng tạo: Biểu đạt phong phú, thu hút người khác'
    });
  }

  // Nose + wealth
  if (['Cao thẳng', 'To bè'].includes(faceData.nose) && [8, 22].includes(numData?.lifePath)) {
    correlations.push({
      type: 'confirmation',
      strength: 'strong',
      source: 'physiognomy',
      insight: 'Mũi cao/to + Số tài lộc: Tiềm năng tài chính rất tốt'
    });
  }

  return correlations;
}

/**
 * Generate key insights
 */
function generateKeyInsights(correlations, tuViData, numData) {
  const insights = [];

  const strongCorrelations = correlations.filter(c => c.strength === 'strong' || c.strength === 'very_strong');

  if (strongCorrelations.length >= 3) {
    insights.push({
      type: 'highlight',
      text: 'Các phương pháp đều chỉ ra tiềm năng lớn - Lá số hài hòa, thuận lợi phát triển'
    });
  }

  // Add specific insights from correlations
  strongCorrelations.slice(0, 3).forEach(c => {
    insights.push({
      type: 'correlation',
      text: c.insight
    });
  });

  return insights;
}

/**
 * Generate recommendations
 */
function generateRecommendations(correlations, tuViData, numData) {
  const recommendations = [];

  // Based on element
  if (tuViData?.cuc?.element) {
    const elementRecs = {
      'Kim': 'Phát triển sự quyết đoán, ngành tài chính, công nghệ',
      'Mộc': 'Nuôi dưỡng sự sáng tạo, giáo dục, nghệ thuật',
      'Thủy': 'Phát triển trí tuệ, nghiên cứu, truyền thông',
      'Hỏa': 'Theo đuổi lãnh đạo, marketing, giải trí',
      'Thổ': 'Xây dựng nền tảng vững, bất động sản, nông nghiệp'
    };
    recommendations.push({
      category: 'career',
      text: elementRecs[tuViData.cuc.element] || 'Phát triển theo sở trường tự nhiên'
    });
  }

  // Based on life path
  if (numData?.lifePath) {
    const lpRecs = {
      1: 'Làm việc độc lập, khởi nghiệp, lãnh đạo',
      2: 'Hợp tác, tư vấn, ngoại giao',
      3: 'Sáng tạo, nghệ thuật, truyền thông',
      4: 'Xây dựng, tổ chức, quản lý',
      5: 'Du lịch, bán hàng, tự do',
      6: 'Phục vụ, chăm sóc, giáo dục',
      7: 'Nghiên cứu, phân tích, tâm linh',
      8: 'Kinh doanh, tài chính, quyền lực',
      9: 'Nhân đạo, nghệ thuật, chữa lành'
    };
    recommendations.push({
      category: 'life_direction',
      text: lpRecs[numData.lifePath] || 'Theo đuổi con đường của riêng mình'
    });
  }

  return recommendations;
}

/**
 * Get score level description
 */
function getScoreLevel(score) {
  if (score >= 90) return { level: 'excellent', label: 'Xuất sắc', color: 'var(--color-gold)' };
  if (score >= 80) return { level: 'very_good', label: 'Rất tốt', color: 'var(--color-jade)' };
  if (score >= 70) return { level: 'good', label: 'Tốt', color: 'var(--color-jade)' };
  if (score >= 60) return { level: 'average', label: 'Trung bình', color: 'var(--color-mist)' };
  return { level: 'needs_work', label: 'Cần cân bằng', color: 'var(--color-fire)' };
}

/**
 * Generate overall summary
 */
function generateSummary(score, correlations) {
  const strongCount = correlations.filter(c => c.strength === 'strong' || c.strength === 'very_strong').length;

  if (score >= 85 && strongCount >= 3) {
    return 'Lá số của bạn có sự hài hòa cao giữa các phương pháp. Các đặc điểm được nhân đôi và củng cố lẫn nhau, tạo nên tiềm năng phát triển mạnh mẽ.';
  }

  if (score >= 70) {
    return 'Các phương pháp cho thấy sự cân bằng tốt với một số điểm nổi bật. Tập trung vào các thế mạnh để phát huy tối đa tiềm năng.';
  }

  return 'Có một số khác biệt giữa các phương pháp, tạo nên sự đa dạng trong tính cách. Đây là cơ hội để phát triển toàn diện và cân bằng các khía cạnh khác nhau.';
}

export default {
  crossReferenceAnalysis
};
