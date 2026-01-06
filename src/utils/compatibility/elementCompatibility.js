/**
 * Five Elements (Ngũ Hành) Compatibility Calculator
 * Tính tương hợp theo Ngũ Hành: Kim, Mộc, Thủy, Hỏa, Thổ
 */

// Thông tin chi tiết về Ngũ Hành
export const NGU_HANH = {
  'Kim': {
    name: 'Kim',
    meaning: 'Kim loại',
    emoji: '🪙',
    color: '#FFD700',
    traits: ['Cứng rắn', 'Quyết đoán', 'Công bằng', 'Kiên định'],
    direction: 'Tây',
    season: 'Thu',
    organ: 'Phổi',
    number: [4, 9]
  },
  'Mộc': {
    name: 'Mộc',
    meaning: 'Cây cối',
    emoji: '🌳',
    color: '#228B22',
    traits: ['Nhân ái', 'Sáng tạo', 'Phát triển', 'Linh hoạt'],
    direction: 'Đông',
    season: 'Xuân',
    organ: 'Gan',
    number: [3, 8]
  },
  'Thủy': {
    name: 'Thủy',
    meaning: 'Nước',
    emoji: '💧',
    color: '#1E90FF',
    traits: ['Thông minh', 'Linh hoạt', 'Sâu sắc', 'Thích nghi'],
    direction: 'Bắc',
    season: 'Đông',
    organ: 'Thận',
    number: [1, 6]
  },
  'Hỏa': {
    name: 'Hỏa',
    meaning: 'Lửa',
    emoji: '🔥',
    color: '#FF4500',
    traits: ['Nhiệt huyết', 'Năng động', 'Lạc quan', 'Dũng cảm'],
    direction: 'Nam',
    season: 'Hạ',
    organ: 'Tim',
    number: [2, 7]
  },
  'Thổ': {
    name: 'Thổ',
    meaning: 'Đất',
    emoji: '🏔️',
    color: '#8B4513',
    traits: ['Ổn định', 'Đáng tin', 'Kiên nhẫn', 'Thực tế'],
    direction: 'Trung tâm',
    season: 'Cuối các mùa',
    organ: 'Tỳ',
    number: [5, 10]
  }
};

// Ngũ Hành Tương Sinh (sinh nhau)
export const TUONG_SINH = {
  'Mộc': { sinh: 'Hỏa', meaning: 'Mộc sinh Hỏa - Gỗ làm lửa cháy' },
  'Hỏa': { sinh: 'Thổ', meaning: 'Hỏa sinh Thổ - Lửa tạo tro thành đất' },
  'Thổ': { sinh: 'Kim', meaning: 'Thổ sinh Kim - Đất chứa kim loại' },
  'Kim': { sinh: 'Thủy', meaning: 'Kim sinh Thủy - Kim loại ngưng tụ nước' },
  'Thủy': { sinh: 'Mộc', meaning: 'Thủy sinh Mộc - Nước nuôi cây' }
};

// Ngũ Hành Tương Khắc (khắc nhau)
export const TUONG_KHAC = {
  'Mộc': { khac: 'Thổ', meaning: 'Mộc khắc Thổ - Rễ cây phá đất' },
  'Thổ': { khac: 'Thủy', meaning: 'Thổ khắc Thủy - Đất ngăn nước' },
  'Thủy': { khac: 'Hỏa', meaning: 'Thủy khắc Hỏa - Nước dập lửa' },
  'Hỏa': { khac: 'Kim', meaning: 'Hỏa khắc Kim - Lửa nung kim loại' },
  'Kim': { khac: 'Mộc', meaning: 'Kim khắc Mộc - Kim loại chặt cây' }
};

// Nạp Âm theo năm sinh (60 Giáp Tý)
export const NAP_AM = {
  // Giáp Tý, Ất Sửu
  1984: 'Kim', 1985: 'Kim',     // Hải Trung Kim
  1924: 'Kim', 1925: 'Kim',
  // Bính Dần, Đinh Mão
  1986: 'Hỏa', 1987: 'Hỏa',    // Lư Trung Hỏa
  1926: 'Hỏa', 1927: 'Hỏa',
  // Mậu Thìn, Kỷ Tỵ
  1988: 'Mộc', 1989: 'Mộc',    // Đại Lâm Mộc
  1928: 'Mộc', 1929: 'Mộc',
  // Canh Ngọ, Tân Mùi
  1990: 'Thổ', 1991: 'Thổ',    // Lộ Bàng Thổ
  1930: 'Thổ', 1931: 'Thổ',
  // Nhâm Thân, Quý Dậu
  1992: 'Kim', 1993: 'Kim',    // Kiếm Phong Kim
  1932: 'Kim', 1933: 'Kim',
  // Giáp Tuất, Ất Hợi
  1994: 'Hỏa', 1995: 'Hỏa',    // Sơn Đầu Hỏa
  1934: 'Hỏa', 1935: 'Hỏa',
  // Bính Tý, Đinh Sửu
  1996: 'Thủy', 1997: 'Thủy',  // Giản Hạ Thủy
  1936: 'Thủy', 1937: 'Thủy',
  // Mậu Dần, Kỷ Mão
  1998: 'Thổ', 1999: 'Thổ',    // Thành Đầu Thổ
  1938: 'Thổ', 1939: 'Thổ',
  // Canh Thìn, Tân Tỵ
  2000: 'Kim', 2001: 'Kim',    // Bạch Lạp Kim
  1940: 'Kim', 1941: 'Kim',
  // Nhâm Ngọ, Quý Mùi
  2002: 'Mộc', 2003: 'Mộc',    // Dương Liễu Mộc
  1942: 'Mộc', 1943: 'Mộc',
  // Giáp Thân, Ất Dậu
  2004: 'Thủy', 2005: 'Thủy',  // Tuyền Trung Thủy
  1944: 'Thủy', 1945: 'Thủy',
  // Bính Tuất, Đinh Hợi
  2006: 'Thổ', 2007: 'Thổ',    // Ốc Thượng Thổ
  1946: 'Thổ', 1947: 'Thổ',
  // Mậu Tý, Kỷ Sửu
  2008: 'Hỏa', 2009: 'Hỏa',    // Tích Lịch Hỏa
  1948: 'Hỏa', 1949: 'Hỏa',
  // Canh Dần, Tân Mão
  2010: 'Mộc', 2011: 'Mộc',    // Tùng Bách Mộc
  1950: 'Mộc', 1951: 'Mộc',
  // Nhâm Thìn, Quý Tỵ
  2012: 'Thủy', 2013: 'Thủy',  // Trường Lưu Thủy
  1952: 'Thủy', 1953: 'Thủy',
  // Giáp Ngọ, Ất Mùi
  2014: 'Kim', 2015: 'Kim',    // Sa Trung Kim
  1954: 'Kim', 1955: 'Kim',
  // Bính Thân, Đinh Dậu
  2016: 'Hỏa', 2017: 'Hỏa',    // Sơn Hạ Hỏa
  1956: 'Hỏa', 1957: 'Hỏa',
  // Mậu Tuất, Kỷ Hợi
  2018: 'Mộc', 2019: 'Mộc',    // Bình Địa Mộc
  1958: 'Mộc', 1959: 'Mộc',
  // Canh Tý, Tân Sửu
  2020: 'Thổ', 2021: 'Thổ',    // Bích Thượng Thổ
  1960: 'Thổ', 1961: 'Thổ',
  // Nhâm Dần, Quý Mão
  2022: 'Kim', 2023: 'Kim',    // Kim Bạc Kim
  1962: 'Kim', 1963: 'Kim',
  // Giáp Thìn, Ất Tỵ
  2024: 'Hỏa', 2025: 'Hỏa',    // Phú Đăng Hỏa
  1964: 'Hỏa', 1965: 'Hỏa',
  // Bính Ngọ, Đinh Mùi
  2026: 'Thủy', 2027: 'Thủy',  // Thiên Hà Thủy
  1966: 'Thủy', 1967: 'Thủy',
  // Mậu Thân, Kỷ Dậu
  2028: 'Thổ', 2029: 'Thổ',    // Đại Dịch Thổ
  1968: 'Thổ', 1969: 'Thổ',
  // Canh Tuất, Tân Hợi
  2030: 'Kim', 2031: 'Kim',    // Thoa Xuyến Kim
  1970: 'Kim', 1971: 'Kim',
  // Nhâm Tý, Quý Sửu
  2032: 'Mộc', 2033: 'Mộc',    // Tang Đố Mộc
  1972: 'Mộc', 1973: 'Mộc',
  // Giáp Dần, Ất Mão
  2034: 'Thủy', 2035: 'Thủy',  // Đại Khê Thủy
  1974: 'Thủy', 1975: 'Thủy',
  // Bính Thìn, Đinh Tỵ
  2036: 'Thổ', 2037: 'Thổ',    // Sa Trung Thổ
  1976: 'Thổ', 1977: 'Thổ',
  // Mậu Ngọ, Kỷ Mùi
  2038: 'Hỏa', 2039: 'Hỏa',    // Thiên Thượng Hỏa
  1978: 'Hỏa', 1979: 'Hỏa',
  // Canh Thân, Tân Dậu
  2040: 'Mộc', 2041: 'Mộc',    // Thạch Lựu Mộc
  1980: 'Mộc', 1981: 'Mộc',
  // Nhâm Tuất, Quý Hợi
  2042: 'Thủy', 2043: 'Thủy',  // Đại Hải Thủy
  1982: 'Thủy', 1983: 'Thủy'
};

/**
 * Lấy mệnh Ngũ Hành từ năm sinh
 */
export function getElementFromYear(year) {
  // Sử dụng bảng Nạp Âm nếu có
  if (NAP_AM[year]) {
    return NAP_AM[year];
  }

  // Tính theo chu kỳ 60 năm
  const base = 1984;
  const cycle = ((year - base) % 60 + 60) % 60;
  const cycleYear = base + cycle;

  return NAP_AM[cycleYear] || 'Thổ';
}

/**
 * Kiểm tra mối quan hệ Tương Sinh
 */
export function checkTuongSinh(element1, element2) {
  const sinh1 = TUONG_SINH[element1];
  const sinh2 = TUONG_SINH[element2];

  // element1 sinh element2
  if (sinh1 && sinh1.sinh === element2) {
    return {
      type: 'SINH',
      direction: 'forward',
      score: 90,
      meaning: sinh1.meaning,
      detail: `${element1} sinh ${element2} - Người mệnh ${element1} hỗ trợ, nuôi dưỡng người mệnh ${element2}`
    };
  }

  // element2 sinh element1
  if (sinh2 && sinh2.sinh === element1) {
    return {
      type: 'DUOC_SINH',
      direction: 'reverse',
      score: 85,
      meaning: sinh2.meaning,
      detail: `${element2} sinh ${element1} - Người mệnh ${element1} được hỗ trợ từ người mệnh ${element2}`
    };
  }

  return null;
}

/**
 * Kiểm tra mối quan hệ Tương Khắc
 */
export function checkTuongKhac(element1, element2) {
  const khac1 = TUONG_KHAC[element1];
  const khac2 = TUONG_KHAC[element2];

  // element1 khắc element2
  if (khac1 && khac1.khac === element2) {
    return {
      type: 'KHAC',
      direction: 'forward',
      score: 35,
      meaning: khac1.meaning,
      detail: `${element1} khắc ${element2} - Người mệnh ${element1} có thể áp đảo người mệnh ${element2}`
    };
  }

  // element2 khắc element1
  if (khac2 && khac2.khac === element1) {
    return {
      type: 'BI_KHAC',
      direction: 'reverse',
      score: 30,
      meaning: khac2.meaning,
      detail: `${element2} khắc ${element1} - Người mệnh ${element1} có thể bị áp đảo bởi người mệnh ${element2}`
    };
  }

  return null;
}

/**
 * Tính điểm tương hợp Ngũ Hành
 */
export function calculateElementCompatibility(element1, element2) {
  // Cùng mệnh
  if (element1 === element2) {
    return {
      type: 'BINH_HOA',
      score: 70,
      relationship: 'Cùng mệnh',
      meaning: `Cùng mệnh ${element1} - Bình hòa, hiểu nhau nhưng có thể thiếu sự bổ sung`,
      detail: `Hai người cùng mệnh ${element1} có nhiều điểm chung trong tính cách và cách sống. Dễ hiểu nhau nhưng cần tạo sự cân bằng.`
    };
  }

  // Kiểm tra Tương Sinh
  const sinhResult = checkTuongSinh(element1, element2);
  if (sinhResult) {
    return {
      type: sinhResult.type,
      score: sinhResult.score,
      relationship: 'Tương Sinh',
      meaning: sinhResult.meaning,
      detail: sinhResult.detail
    };
  }

  // Kiểm tra Tương Khắc
  const khacResult = checkTuongKhac(element1, element2);
  if (khacResult) {
    return {
      type: khacResult.type,
      score: khacResult.score,
      relationship: 'Tương Khắc',
      meaning: khacResult.meaning,
      detail: khacResult.detail
    };
  }

  // Không sinh không khắc (trung tính)
  return {
    type: 'TRUNG_TINH',
    score: 60,
    relationship: 'Trung tính',
    meaning: `${element1} và ${element2} không sinh không khắc`,
    detail: 'Mối quan hệ trung tính, không có tương tác mạnh về mặt ngũ hành.'
  };
}

/**
 * Lấy thông tin chi tiết về một mệnh
 */
export function getElementInfo(element) {
  const info = NGU_HANH[element];
  if (!info) return null;

  // Tìm mệnh sinh và mệnh khắc
  const sinh = TUONG_SINH[element];
  const khac = TUONG_KHAC[element];

  // Tìm mệnh được sinh và bị khắc
  let duocSinh = null;
  let biKhac = null;

  for (const [elem, data] of Object.entries(TUONG_SINH)) {
    if (data.sinh === element) duocSinh = elem;
  }

  for (const [elem, data] of Object.entries(TUONG_KHAC)) {
    if (data.khac === element) biKhac = elem;
  }

  return {
    ...info,
    sinh: sinh?.sinh,
    sinhMeaning: sinh?.meaning,
    khac: khac?.khac,
    khacMeaning: khac?.meaning,
    duocSinh,
    biKhac
  };
}

/**
 * Lấy đầy đủ thông tin tương hợp Ngũ Hành
 */
export function getFullElementCompatibility(year1, year2) {
  const element1 = getElementFromYear(year1);
  const element2 = getElementFromYear(year2);

  const compatibility = calculateElementCompatibility(element1, element2);
  const info1 = getElementInfo(element1);
  const info2 = getElementInfo(element2);

  return {
    person1: {
      year: year1,
      element: element1,
      ...info1
    },
    person2: {
      year: year2,
      element: element2,
      ...info2
    },
    compatibility,
    advice: generateElementAdvice(compatibility.type, element1, element2)
  };
}

/**
 * Tạo lời khuyên dựa trên mối quan hệ Ngũ Hành
 */
function generateElementAdvice(type, element1, element2) {
  const advices = {
    'SINH': `Mệnh ${element1} sinh ${element2} là mối quan hệ rất tốt. Người mệnh ${element1} tự nhiên hỗ trợ và nâng đỡ người mệnh ${element2}. Hãy tận dụng sự hài hòa này.`,
    'DUOC_SINH': `Mệnh ${element2} sinh ${element1} mang lại sự hỗ trợ tự nhiên. Người mệnh ${element1} được nuôi dưỡng và phát triển nhờ người mệnh ${element2}.`,
    'KHAC': `Mệnh ${element1} khắc ${element2} có thể tạo ma sát. Người mệnh ${element1} nên nhẹ nhàng, tránh áp đặt. Cần học cách tôn trọng và lắng nghe.`,
    'BI_KHAC': `Mệnh ${element1} bị ${element2} khắc. Người mệnh ${element1} cần tự tin hơn và không để bị chi phối. Tìm điểm cân bằng trong mối quan hệ.`,
    'BINH_HOA': `Cùng mệnh ${element1} dễ hiểu nhau nhưng cần tạo sự khác biệt để bổ sung. Tránh đơn điệu trong mối quan hệ.`,
    'TRUNG_TINH': `Mệnh ${element1} và ${element2} không có tương tác đặc biệt. Mối quan hệ phụ thuộc vào sự nỗ lực của cả hai.`
  };

  return advices[type] || advices['TRUNG_TINH'];
}

export default {
  NGU_HANH,
  TUONG_SINH,
  TUONG_KHAC,
  NAP_AM,
  getElementFromYear,
  calculateElementCompatibility,
  getElementInfo,
  getFullElementCompatibility
};
