/**
 * Tử Vi Đẩu Số Calculator
 * Simplified version for calculating 12 palaces and main stars
 */

import { Solar, Lunar } from 'lunar-javascript';

// 12 Địa Chi (Earthly Branches)
export const DIA_CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

// 10 Thiên Can (Heavenly Stems)
export const THIEN_CAN = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];

// 12 Cung Tử Vi (12 Palaces)
export const CUNG_TU_VI = [
  { id: 'menh', name: 'Mệnh', meaning: 'Bản mệnh, tính cách', ageRange: 'Cả đời' },
  { id: 'phuMau', name: 'Phụ Mẫu', meaning: 'Cha mẹ, di truyền', ageRange: '0-15 tuổi' },
  { id: 'phucDuc', name: 'Phúc Đức', meaning: 'Phúc phần, âm đức', ageRange: 'Cả đời' },
  { id: 'dienTrach', name: 'Điền Trạch', meaning: 'Nhà cửa, bất động sản', ageRange: '30-45 tuổi' },
  { id: 'quanLoc', name: 'Quan Lộc', meaning: 'Sự nghiệp, công danh', ageRange: '25-50 tuổi' },
  { id: 'noBoc', name: 'Nô Bộc', meaning: 'Cấp dưới, nhân viên', ageRange: '35-50 tuổi' },
  { id: 'thienDi', name: 'Thiên Di', meaning: 'Di chuyển, xuất ngoại', ageRange: 'Cả đời' },
  { id: 'tatAch', name: 'Tật Ách', meaning: 'Sức khỏe, bệnh tật', ageRange: 'Cả đời' },
  { id: 'taiBach', name: 'Tài Bạch', meaning: 'Tiền bạc, tài chính', ageRange: '25-55 tuổi' },
  { id: 'tuTuc', name: 'Tử Tức', meaning: 'Con cái', ageRange: '25-50 tuổi' },
  { id: 'phuThe', name: 'Phu Thê', meaning: 'Hôn nhân, vợ/chồng', ageRange: '20-60 tuổi' },
  { id: 'huynhDe', name: 'Huynh Đệ', meaning: 'Anh chị em, bạn bè', ageRange: 'Cả đời' }
];

// 14 Chính Tinh (Main Stars)
export const CHINH_TINH = [
  { id: 'tuVi', name: 'Tử Vi', element: 'Thổ', nature: 'Tôn quý, lãnh đạo, đế vương', group: 'tuVi' },
  { id: 'thienCo', name: 'Thiên Cơ', element: 'Mộc', nature: 'Mưu trí, linh hoạt, thông minh', group: 'tuVi' },
  { id: 'thaiDuong', name: 'Thái Dương', element: 'Hỏa', nature: 'Quang minh, nam tính, nhiệt huyết', group: 'coNguyet' },
  { id: 'vuKhuc', name: 'Vũ Khúc', element: 'Kim', nature: 'Tài năng, cương quyết, kinh doanh', group: 'tuVi' },
  { id: 'thienDong', name: 'Thiên Đồng', element: 'Thủy', nature: 'Phúc đức, an nhàn, nghệ thuật', group: 'coNguyet' },
  { id: 'liemTrinh', name: 'Liêm Trinh', element: 'Hỏa', nature: 'Chính trực, thanh liêm, công bằng', group: 'tuVi' },
  { id: 'thienPhu', name: 'Thiên Phủ', element: 'Thổ', nature: 'Kho tàng, quý nhân, phú quý', group: 'thienPhu' },
  { id: 'thaiAm', name: 'Thái Âm', element: 'Thủy', nature: 'Tài lộc, nữ tính, điền sản', group: 'coNguyet' },
  { id: 'thamLang', name: 'Tham Lang', element: 'Thủy', nature: 'Đa tài, tham vọng, đào hoa', group: 'satPha' },
  { id: 'cuMon', name: 'Cự Môn', element: 'Thủy', nature: 'Tranh biện, thị phi, trí tuệ', group: 'coNguyet' },
  { id: 'thienTuong', name: 'Thiên Tướng', element: 'Thủy', nature: 'Quý nhân, phù trợ, đức độ', group: 'thienPhu' },
  { id: 'thienLuong', name: 'Thiên Lương', element: 'Mộc', nature: 'Bảo thọ, che chở, nhân từ', group: 'coNguyet' },
  { id: 'thatSat', name: 'Thất Sát', element: 'Kim', nature: 'Quyền lực, cương quyết, chiến đấu', group: 'satPha' },
  { id: 'phaQuan', name: 'Phá Quân', element: 'Thủy', nature: 'Phá cách, đổi mới, tiên phong', group: 'satPha' }
];

// Ngũ Hành Cục (Five Element Bureau)
export const NGU_HANH_CUC = [
  { id: 'thuy2', name: 'Thủy Nhị Cục', element: 'Thủy', value: 2 },
  { id: 'moc3', name: 'Mộc Tam Cục', element: 'Mộc', value: 3 },
  { id: 'kim4', name: 'Kim Tứ Cục', element: 'Kim', value: 4 },
  { id: 'tho5', name: 'Thổ Ngũ Cục', element: 'Thổ', value: 5 },
  { id: 'hoa6', name: 'Hỏa Lục Cục', element: 'Hỏa', value: 6 }
];

// Phụ Tinh (Secondary Stars)
export const PHU_TINH = [
  { id: 'vanXuong', name: 'Văn Xương', nature: 'Học vấn, văn chương' },
  { id: 'vanKhuc', name: 'Văn Khúc', nature: 'Tài nghệ, âm nhạc' },
  { id: 'taHuu', name: 'Tả Hữu', nature: 'Quý nhân phù trợ' },
  { id: 'locTon', name: 'Lộc Tồn', nature: 'Tài lộc, may mắn' },
  { id: 'thienKhoi', name: 'Thiên Khôi', nature: 'Quý nhân nam' },
  { id: 'thienViet', name: 'Thiên Việt', nature: 'Quý nhân nữ' },
  { id: 'hoaLoc', name: 'Hóa Lộc', nature: 'Tài lộc tăng tiến' },
  { id: 'hoaQuyen', name: 'Hóa Quyền', nature: 'Quyền lực tăng' },
  { id: 'hoaKhoa', name: 'Hóa Khoa', nature: 'Danh tiếng, học vấn' },
  { id: 'hoaKy', name: 'Hóa Kỵ', nature: 'Trắc trở, cẩn thận' }
];

// Sát Tinh (Malefic Stars)
export const SAT_TINH = [
  { id: 'kinhDuong', name: 'Kình Dương', nature: 'Cương quyết, tranh đấu' },
  { id: 'dala', name: 'Đà La', nature: 'Trì trệ, chậm trễ' },
  { id: 'hoaTinh', name: 'Hỏa Tinh', nature: 'Nóng vội, bùng nổ' },
  { id: 'linhTinh', name: 'Linh Tinh', nature: 'Bất ngờ, biến động' },
  { id: 'diKhong', name: 'Địa Không', nature: 'Hao tài, trống rỗng' },
  { id: 'diaKiep', name: 'Địa Kiếp', nature: 'Phá hoại, mất mát' }
];

/**
 * Convert solar date to lunar date
 */
export function solarToLunar(year, month, day) {
  try {
    const solar = Solar.fromYmd(year, month, day);
    const lunar = solar.getLunar();
    return {
      year: lunar.getYear(),
      month: lunar.getMonth(),
      day: lunar.getDay(),
      isLeap: lunar.getMonth() < 0,
      yearGanZhi: lunar.getYearInGanZhi(),
      monthGanZhi: lunar.getMonthInGanZhi(),
      dayGanZhi: lunar.getDayInGanZhi(),
      yearGan: THIEN_CAN[(lunar.getYear() - 4) % 10],
      yearChi: DIA_CHI[(lunar.getYear() - 4) % 12]
    };
  } catch (e) {
    console.error('Error converting date:', e);
    return null;
  }
}

/**
 * Get birth hour chi index (0-11)
 * @param {number} hour - Hour in 24h format
 */
export function getBirthHourChiIndex(hour) {
  // Tý: 23-1, Sửu: 1-3, Dần: 3-5, ...
  if (hour === 23 || hour === 0) return 0; // Tý
  return Math.floor((hour + 1) / 2);
}

/**
 * Calculate Menh Cung position
 * Formula: Mệnh cung = Dần + (tháng sinh - 1) - (giờ sinh index)
 */
export function calculateMenhCung(lunarMonth, birthHourIndex) {
  // Start from Dần (index 2)
  let position = 2 + (lunarMonth - 1) - birthHourIndex;
  // Normalize to 0-11
  position = ((position % 12) + 12) % 12;
  return position;
}

/**
 * Calculate Than Cung position
 * Formula: Thân cung = Dần + (tháng sinh - 1) + (giờ sinh index)
 */
export function calculateThanCung(lunarMonth, birthHourIndex) {
  let position = 2 + (lunarMonth - 1) + birthHourIndex;
  position = ((position % 12) + 12) % 12;
  return position;
}

/**
 * Calculate Ngũ Hành Cục based on year stem and Menh position
 */
export function calculateCuc(yearGanIndex, menhPosition) {
  // Simplified cuc calculation table
  const cucTable = [
    // Giáp, Kỷ năm
    [2, 6, 3, 3, 4, 4, 5, 5, 6, 6, 2, 2],
    // Ất, Canh năm
    [6, 2, 6, 6, 3, 3, 4, 4, 5, 5, 6, 6],
    // Bính, Tân năm
    [4, 4, 5, 5, 6, 6, 2, 2, 3, 3, 4, 4],
    // Đinh, Nhâm năm
    [3, 3, 4, 4, 5, 5, 6, 6, 2, 2, 3, 3],
    // Mậu, Quý năm
    [5, 5, 6, 6, 2, 2, 3, 3, 4, 4, 5, 5]
  ];

  const ganGroup = yearGanIndex % 5; // 0: Giáp/Kỷ, 1: Ất/Canh, ...
  const cucValue = cucTable[ganGroup][menhPosition];

  return NGU_HANH_CUC.find(c => c.value === cucValue) || NGU_HANH_CUC[3]; // Default Thổ Ngũ Cục
}

/**
 * Calculate Tử Vi star position
 * Based on day and cuc value
 */
export function calculateTuViPosition(lunarDay, cucValue) {
  // Simplified calculation
  let position = (lunarDay - 1 + Math.floor((lunarDay - 1) / cucValue)) % 12;
  return position;
}

/**
 * Place all 14 main stars based on Tu Vi position
 */
export function placeMainStars(tuViPosition) {
  const stars = {};

  // Tử Vi star chain (đi nghịch - counter-clockwise)
  const tuViChain = ['tuVi', 'thienCo', 'thaiDuong', 'vuKhuc', 'thienDong', 'liemTrinh'];
  tuViChain.forEach((star, index) => {
    stars[star] = ((tuViPosition - index) % 12 + 12) % 12;
  });

  // Thiên Phủ position (đối cung với Tử Vi)
  const thienPhuPosition = (tuViPosition + 4) % 12;

  // Thiên Phủ star chain (đi thuận - clockwise)
  const thienPhuChain = ['thienPhu', 'thaiAm', 'thamLang', 'cuMon', 'thienTuong', 'thienLuong', 'thatSat', 'phaQuan'];
  thienPhuChain.forEach((star, index) => {
    stars[star] = (thienPhuPosition + index) % 12;
  });

  return stars;
}

/**
 * Calculate Đại Vận (Major Life Periods)
 * Each period is 10 years
 */
export function calculateDaiVan(menhPosition, cucValue, gender, yearGanIndex) {
  const isYangYear = yearGanIndex % 2 === 0; // Giáp, Bính, Mậu, Canh, Nhâm
  const isMale = gender === 'male';

  // Determine direction: Male + Yang OR Female + Yin = clockwise
  const isClockwise = (isMale && isYangYear) || (!isMale && !isYangYear);

  const daiVan = [];
  const startAge = cucValue; // Starts at cuc value age

  for (let i = 0; i < 12; i++) {
    const position = isClockwise
      ? (menhPosition + i) % 12
      : ((menhPosition - i) % 12 + 12) % 12;

    daiVan.push({
      position,
      cung: DIA_CHI[position],
      startAge: startAge + (i * 10),
      endAge: startAge + ((i + 1) * 10) - 1,
      period: `${startAge + (i * 10)}-${startAge + ((i + 1) * 10) - 1} tuổi`
    });
  }

  return daiVan;
}

/**
 * Main function to calculate full Tu Vi chart
 */
export function calculateTuViChart(solarYear, solarMonth, solarDay, birthHour, gender) {
  // Convert to lunar
  const lunar = solarToLunar(solarYear, solarMonth, solarDay);
  if (!lunar) return null;

  // Get birth hour index
  const birthHourIndex = getBirthHourChiIndex(birthHour);

  // Calculate Menh and Than positions
  const menhPosition = calculateMenhCung(Math.abs(lunar.month), birthHourIndex);
  const thanPosition = calculateThanCung(Math.abs(lunar.month), birthHourIndex);

  // Get year Gan index
  const yearGanIndex = (lunar.year - 4) % 10;

  // Calculate Cục
  const cuc = calculateCuc(yearGanIndex, menhPosition);

  // Calculate Tu Vi star position
  const tuViPosition = calculateTuViPosition(lunar.day, cuc.value);

  // Place all main stars
  const mainStars = placeMainStars(tuViPosition);

  // Build 12 palaces with assigned stars
  const palaces = DIA_CHI.map((chi, index) => {
    const palace = CUNG_TU_VI[index];
    const starsInPalace = Object.entries(mainStars)
      .filter(([_, pos]) => pos === index)
      .map(([starId, _]) => CHINH_TINH.find(s => s.id === starId));

    // Determine which palace this is based on Menh position
    const palaceIndex = ((index - menhPosition) % 12 + 12) % 12;
    const palaceInfo = CUNG_TU_VI[palaceIndex];

    return {
      position: index,
      diaChi: chi,
      palace: palaceInfo,
      isMenh: index === menhPosition,
      isThan: index === thanPosition,
      mainStars: starsInPalace,
      starRating: starsInPalace.length // Simple rating based on star count
    };
  });

  // Calculate Đại Vận
  const daiVan = calculateDaiVan(menhPosition, cuc.value, gender, yearGanIndex);

  // Find current Đại Vận
  const currentAge = new Date().getFullYear() - solarYear;
  const currentDaiVan = daiVan.find(dv => currentAge >= dv.startAge && currentAge <= dv.endAge);

  // Get main stars in Menh
  const menhPalace = palaces[menhPosition];
  const menhMainStar = menhPalace.mainStars[0] || null;

  return {
    // Input info
    solarDate: { year: solarYear, month: solarMonth, day: solarDay },
    lunarDate: lunar,
    birthHour: {
      hour: birthHour,
      chi: DIA_CHI[birthHourIndex],
      index: birthHourIndex
    },
    gender,

    // Core calculations
    cuc,
    menhPosition,
    thanPosition,
    menhChi: DIA_CHI[menhPosition],
    thanChi: DIA_CHI[thanPosition],
    menhMainStar,

    // Full chart
    palaces,
    mainStars,

    // Life periods
    daiVan,
    currentDaiVan,
    currentAge,

    // Summary
    summary: generateSummary(menhMainStar, cuc, lunar, palaces)
  };
}

/**
 * Generate summary interpretation
 */
function generateSummary(menhMainStar, cuc, lunar, palaces) {
  const summaryParts = [];

  if (menhMainStar) {
    summaryParts.push(`Mệnh có ${menhMainStar.name} tọa thủ - ${menhMainStar.nature}`);
  }

  summaryParts.push(`${cuc.name} - ngũ hành ${cuc.element}`);
  summaryParts.push(`Năm sinh ${lunar.yearGanZhi}`);

  // Count good stars
  const goodStars = ['tuVi', 'thienPhu', 'thaiDuong', 'thaiAm', 'thienLuong'];
  let goodStarCount = 0;
  palaces.forEach(p => {
    p.mainStars.forEach(s => {
      if (goodStars.includes(s.id)) goodStarCount++;
    });
  });

  if (goodStarCount >= 4) {
    summaryParts.push('Lá số có nhiều sao tốt, vận mệnh hanh thông');
  } else if (goodStarCount >= 2) {
    summaryParts.push('Lá số cân bằng, có cả thuận lợi và thử thách');
  } else {
    summaryParts.push('Cần nỗ lực nhiều để vượt qua thử thách');
  }

  return summaryParts;
}

export default {
  calculateTuViChart,
  solarToLunar,
  DIA_CHI,
  THIEN_CAN,
  CUNG_TU_VI,
  CHINH_TINH,
  NGU_HANH_CUC
};
