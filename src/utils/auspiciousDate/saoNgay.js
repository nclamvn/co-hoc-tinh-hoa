/**
 * Sao Ngày (28 Sao - Nhị Thập Bát Tú)
 * Sao tốt và sao xấu cho các sự kiện
 */

// 28 Sao (Nhị Thập Bát Tú)
export const NHAT_THAP_BAT_TU = [
  { name: 'Giác', element: 'Mộc', type: 'tot', meaning: 'Tốt cho xây dựng, cưới hỏi' },
  { name: 'Cang', element: 'Kim', type: 'xau', meaning: 'Kỵ mai táng, xây cất' },
  { name: 'Đê', element: 'Thổ', type: 'xau', meaning: 'Kỵ cưới hỏi, khai trương' },
  { name: 'Phòng', element: 'Nhật', type: 'tot', meaning: 'Tốt cho mọi việc' },
  { name: 'Tâm', element: 'Nguyệt', type: 'xau', meaning: 'Kỵ mọi việc lớn' },
  { name: 'Vĩ', element: 'Hỏa', type: 'tot', meaning: 'Tốt cho cưới hỏi, khai trương' },
  { name: 'Cơ', element: 'Thủy', type: 'tot', meaning: 'Tốt cho xây dựng, mai táng' },
  { name: 'Đẩu', element: 'Mộc', type: 'tot', meaning: 'Đại cát, tốt mọi việc' },
  { name: 'Ngưu', element: 'Kim', type: 'tot', meaning: 'Tốt cho cưới hỏi, giao dịch' },
  { name: 'Nữ', element: 'Thổ', type: 'xau', meaning: 'Kỵ cưới hỏi, khai trương' },
  { name: 'Hư', element: 'Nhật', type: 'xau', meaning: 'Kỵ mọi việc, chỉ tốt cho cúng tế' },
  { name: 'Nguy', element: 'Nguyệt', type: 'xau', meaning: 'Kỵ mọi việc lớn' },
  { name: 'Thất', element: 'Hỏa', type: 'tot', meaning: 'Tốt cho xây dựng, lập nghiệp' },
  { name: 'Bích', element: 'Thủy', type: 'tot', meaning: 'Tốt cho cưới hỏi, xây nhà' },
  { name: 'Khuê', element: 'Mộc', type: 'xau', meaning: 'Kỵ cưới hỏi, xây cất' },
  { name: 'Lâu', element: 'Kim', type: 'tot', meaning: 'Tốt cho cưới hỏi, khai trương' },
  { name: 'Vị', element: 'Thổ', type: 'tot', meaning: 'Tốt cho xây dựng, giao dịch' },
  { name: 'Mão', element: 'Nhật', type: 'xau', meaning: 'Kỵ cưới hỏi, khởi công' },
  { name: 'Tất', element: 'Nguyệt', type: 'tot', meaning: 'Đại cát, tốt mọi việc' },
  { name: 'Chủy', element: 'Hỏa', type: 'xau', meaning: 'Kỵ mọi việc lớn' },
  { name: 'Sâm', element: 'Thủy', type: 'tot', meaning: 'Tốt cho cưới hỏi, xây nhà' },
  { name: 'Tỉnh', element: 'Mộc', type: 'tot', meaning: 'Tốt cho xây dựng' },
  { name: 'Quỷ', element: 'Kim', type: 'xau', meaning: 'Đại hung, kỵ mọi việc' },
  { name: 'Liễu', element: 'Thổ', type: 'xau', meaning: 'Kỵ cưới hỏi, mai táng' },
  { name: 'Tinh', element: 'Nhật', type: 'xau', meaning: 'Kỵ xây dựng, động thổ' },
  { name: 'Trương', element: 'Nguyệt', type: 'tot', meaning: 'Tốt cho cưới hỏi, khai trương' },
  { name: 'Dực', element: 'Hỏa', type: 'tot', meaning: 'Tốt cho xây dựng, nhập trạch' },
  { name: 'Chẩn', element: 'Thủy', type: 'tot', meaning: 'Tốt cho cưới hỏi, an táng' }
];

// Sao tốt cho các sự kiện cụ thể
export const SAO_TOT_THEO_SU_KIEN = {
  'ket-hon': {
    stars: ['Thiên Đức', 'Nguyệt Đức', 'Thiên Hỷ', 'Hồng Loan', 'Thiên Quý', 'Tam Hợp', 'Lục Hợp'],
    description: 'Các sao cát tinh cho hôn nhân'
  },
  'khai-truong': {
    stars: ['Thiên Tài', 'Lộc Mã', 'Phúc Tinh', 'Khai Nhật', 'Thiên Ân'],
    description: 'Các sao cát tinh cho kinh doanh'
  },
  'dong-tho': {
    stars: ['Thiên Đức', 'Nguyệt Đức', 'Thiên Ân', 'Tam Hợp', 'Phúc Tinh'],
    description: 'Các sao cát tinh cho xây dựng'
  },
  'nhap-trach': {
    stars: ['Thiên Đức', 'Nguyệt Đức', 'Thiên Hỷ', 'Thiên Ân', 'Lộc Mã'],
    description: 'Các sao cát tinh cho nhập trạch'
  },
  'xuat-hanh': {
    stars: ['Thiên Mã', 'Dịch Mã', 'Thiên Đức', 'Nguyệt Đức'],
    description: 'Các sao cát tinh cho xuất hành'
  }
};

// Sao xấu cần tránh
export const SAO_XAU = {
  'ket-hon': {
    stars: ['Cô Thần', 'Quả Tú', 'Thiên Cẩu', 'Thọ Tử', 'Trùng Tang', 'Trùng Phục'],
    description: 'Các sao hung tinh cho hôn nhân'
  },
  'khai-truong': {
    stars: ['Thiên Hỏa', 'Hoang Vu', 'Đại Hao', 'Tiểu Hao', 'Địa Hỏa'],
    description: 'Các sao hung tinh cho kinh doanh'
  },
  'dong-tho': {
    stars: ['Tam Sát', 'Ngũ Hoàng', 'Thái Tuế', 'Đại Hao', 'Địa Phá'],
    description: 'Các sao hung tinh cho xây dựng'
  },
  'nhap-trach': {
    stars: ['Thiên Hỏa', 'Địa Hỏa', 'Thọ Tử', 'Đại Hao'],
    description: 'Các sao hung tinh cho nhập trạch'
  },
  'xuat-hanh': {
    stars: ['Nguyệt Phá', 'Đại Hao', 'Thiên Cẩu', 'Huyết Kỵ'],
    description: 'Các sao hung tinh cho xuất hành'
  }
};

/**
 * Lấy sao của ngày (28 sao)
 * Dựa trên công thức tính theo ngày Julian
 */
export function getSaoNgay(julianDay) {
  // Công thức đơn giản hóa
  const index = Math.floor(julianDay) % 28;
  return NHAT_THAP_BAT_TU[index];
}

/**
 * Đánh giá sao cho một sự kiện
 */
export function evaluateSaoForEvent(eventType) {
  const eventKey = normalizeEventType(eventType);
  const goodStars = SAO_TOT_THEO_SU_KIEN[eventKey]?.stars || [];
  const badStars = SAO_XAU[eventKey]?.stars || [];

  return {
    goodStars,
    badStars,
    description: {
      good: SAO_TOT_THEO_SU_KIEN[eventKey]?.description || 'Các sao cát tinh',
      bad: SAO_XAU[eventKey]?.description || 'Các sao hung tinh'
    }
  };
}

/**
 * Chuẩn hóa loại sự kiện
 */
function normalizeEventType(eventType) {
  const mapping = {
    'kết hôn': 'ket-hon',
    'cưới': 'ket-hon',
    'đính hôn': 'ket-hon',
    'khai trương': 'khai-truong',
    'mở cửa hàng': 'khai-truong',
    'động thổ': 'dong-tho',
    'xây nhà': 'dong-tho',
    'khởi công': 'dong-tho',
    'nhập trạch': 'nhap-trach',
    'dọn nhà': 'nhap-trach',
    'xuất hành': 'xuat-hanh',
    'du lịch': 'xuat-hanh'
  };

  const normalized = eventType.toLowerCase();
  for (const [key, value] of Object.entries(mapping)) {
    if (normalized.includes(key)) return value;
  }

  return 'khai-truong'; // Default
}

/**
 * Kiểm tra sao ngày có tốt cho sự kiện không
 */
export function isSaoGoodForEvent(sao, eventType) {
  if (!sao) return { good: false, reason: 'Không xác định được sao ngày' };

  if (sao.type === 'tot') {
    return { good: true, reason: `Sao ${sao.name} (${sao.meaning})` };
  }

  return { good: false, reason: `Sao ${sao.name} không tốt (${sao.meaning})` };
}

/**
 * Lấy điểm số cho sao ngày
 */
export function getSaoScore(sao) {
  if (!sao) return 50;
  return sao.type === 'tot' ? 80 : 40;
}

export default {
  NHAT_THAP_BAT_TU,
  SAO_TOT_THEO_SU_KIEN,
  SAO_XAU,
  getSaoNgay,
  evaluateSaoForEvent,
  isSaoGoodForEvent,
  getSaoScore
};
