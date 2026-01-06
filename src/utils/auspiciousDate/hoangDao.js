/**
 * Hoàng Đạo / Hắc Đạo Calculator
 * 12 Trực (Kiến, Trừ, Mãn, Bình, Định, Chấp, Phá, Nguy, Thành, Thu, Khai, Bế)
 */

// 12 Trực với thông tin chi tiết
export const THAP_NHI_TRUC = {
  'Kiến': {
    type: 'hoangDao',
    meaning: 'Khởi đầu, xây dựng',
    description: 'Ngày tốt cho việc khởi công, xây dựng, bắt đầu công việc mới',
    good: ['Khai trương', 'Động thổ', 'Nhập học', 'Khởi công', 'Xuất hành', 'Cầu tài'],
    bad: ['Kiện tụng', 'Đòi nợ', 'An táng'],
    score: 85
  },
  'Trừ': {
    type: 'hoangDao',
    meaning: 'Loại bỏ, thanh tẩy',
    description: 'Ngày tốt cho việc dọn dẹp, loại bỏ điều xấu, chữa bệnh',
    good: ['Chữa bệnh', 'Trừ tà', 'Dọn dẹp', 'Cắt may', 'Sửa chữa'],
    bad: ['Kết hôn', 'Khai trương', 'Xuất hành xa'],
    score: 75
  },
  'Mãn': {
    type: 'hoangDao',
    meaning: 'Đầy đủ, viên mãn',
    description: 'Ngày đại cát cho hỷ sự, khai trương, cưới hỏi',
    good: ['Kết hôn', 'Khai trương', 'Thu hoạch', 'Nhập trạch', 'Cầu tài', 'Giao dịch'],
    bad: ['Chôn cất', 'Xuất hành xa', 'Động thổ'],
    score: 95
  },
  'Bình': {
    type: 'hoangDao',
    meaning: 'Bình an, ổn định',
    description: 'Ngày bình thường, tốt cho việc tu sửa, bảo trì',
    good: ['Sửa đường', 'Đào giếng', 'Làm cầu', 'Tu sửa nhà'],
    bad: ['Động thổ', 'Khai trương', 'Xuất hành'],
    score: 70
  },
  'Định': {
    type: 'hoangDao',
    meaning: 'Ổn định, yên vị',
    description: 'Ngày tốt cho việc ổn định, yên vị, an táng',
    good: ['Kết hôn', 'Nhập trạch', 'An táng', 'Ký hợp đồng', 'Giao dịch'],
    bad: ['Kiện tụng', 'Xuất hành', 'Mở cửa hàng'],
    score: 80
  },
  'Chấp': {
    type: 'hoangDao',
    meaning: 'Nắm giữ, bảo vệ',
    description: 'Ngày tốt cho việc xây dựng, mua sắm, giữ gìn',
    good: ['Xây dựng', 'Trồng trọt', 'Mua sắm', 'Cất giữ'],
    bad: ['Khai trương', 'Xuất hành', 'Di chuyển'],
    score: 75
  },
  'Phá': {
    type: 'hacDao',
    meaning: 'Phá bỏ, thay đổi',
    description: 'Ngày xấu cho đa số việc, chỉ tốt cho phá dỡ',
    good: ['Phá dỡ', 'Chữa bệnh', 'Trừ tà', 'Săn bắt'],
    bad: ['Kết hôn', 'Khai trương', 'Ký hợp đồng', 'Xuất hành', 'Nhập trạch'],
    score: 30
  },
  'Nguy': {
    type: 'hacDao',
    meaning: 'Nguy hiểm, cẩn thận',
    description: 'Ngày xấu, nên tránh mọi việc lớn',
    good: ['Cầu an', 'Cúng tế', 'Nghỉ ngơi'],
    bad: ['Mọi việc lớn', 'Xuất hành', 'Động thổ', 'Kết hôn'],
    score: 25
  },
  'Thành': {
    type: 'trungBinh',
    meaning: 'Thành tựu, hoàn thành',
    description: 'Ngày tốt cho việc hoàn thành, kết thúc công việc',
    good: ['Kết hôn', 'Khai trương', 'Nhập trạch', 'Hoàn thành dự án'],
    bad: ['Kiện tụng', 'Khởi công mới'],
    score: 80
  },
  'Thu': {
    type: 'hacDao',
    meaning: 'Thu gom, kết thúc',
    description: 'Ngày tốt cho thu hoạch, không tốt cho khởi đầu',
    good: ['Thu hoạch', 'Cất giữ', 'Thu nợ'],
    bad: ['Khởi công', 'Xuất hành', 'Khai trương', 'Kết hôn'],
    score: 40
  },
  'Khai': {
    type: 'trungBinh',
    meaning: 'Mở ra, khởi đầu',
    description: 'Ngày tốt cho khai trương, xuất hành, học hành',
    good: ['Khai trương', 'Nhập học', 'Xuất hành', 'Mở cửa hàng', 'Bắt đầu công việc'],
    bad: ['An táng', 'Đào mộ'],
    score: 78
  },
  'Bế': {
    type: 'hacDao',
    meaning: 'Đóng lại, kết thúc',
    description: 'Ngày xấu cho đa số việc, chỉ tốt cho an táng',
    good: ['Đắp đê', 'Lấp hố', 'An táng', 'Đóng cửa'],
    bad: ['Khai trương', 'Xuất hành', 'Kết hôn', 'Nhập trạch', 'Động thổ'],
    score: 35
  }
};

// Thứ tự 12 Trực
const TRUC_ORDER = ['Kiến', 'Trừ', 'Mãn', 'Bình', 'Định', 'Chấp', 'Phá', 'Nguy', 'Thành', 'Thu', 'Khai', 'Bế'];

// 12 Địa Chi
const DIA_CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

/**
 * Tính Trực của ngày dựa trên Địa Chi của tháng và ngày
 * Quy tắc: Ngày Kiến trùng với Chi của tháng
 */
export function calculateTruc(monthChi, dayChi) {
  const monthIndex = DIA_CHI.indexOf(monthChi);
  const dayIndex = DIA_CHI.indexOf(dayChi);

  if (monthIndex === -1 || dayIndex === -1) {
    return THAP_NHI_TRUC['Kiến']; // Default
  }

  // Ngày Kiến là ngày có Địa Chi trùng với tháng
  // Các ngày khác tính theo thứ tự
  const trucIndex = (dayIndex - monthIndex + 12) % 12;

  return {
    name: TRUC_ORDER[trucIndex],
    ...THAP_NHI_TRUC[TRUC_ORDER[trucIndex]]
  };
}

/**
 * Kiểm tra ngày Hoàng Đạo
 */
export function isHoangDao(truc) {
  return truc.type === 'hoangDao';
}

/**
 * Kiểm tra ngày Hắc Đạo
 */
export function isHacDao(truc) {
  return truc.type === 'hacDao';
}

/**
 * Đánh giá ngày cho một sự kiện cụ thể
 */
export function evaluateDayForEvent(truc, eventType) {
  const trucInfo = typeof truc === 'string' ? THAP_NHI_TRUC[truc] : truc;

  if (!trucInfo) return { score: 50, suitable: false, reason: 'Không xác định được Trực' };

  // Kiểm tra sự kiện có trong danh sách tốt
  const isGood = trucInfo.good.some(e =>
    eventType.toLowerCase().includes(e.toLowerCase()) ||
    e.toLowerCase().includes(eventType.toLowerCase())
  );

  // Kiểm tra sự kiện có trong danh sách xấu
  const isBad = trucInfo.bad.some(e =>
    eventType.toLowerCase().includes(e.toLowerCase()) ||
    e.toLowerCase().includes(eventType.toLowerCase())
  );

  if (isGood && !isBad) {
    return {
      score: trucInfo.score + 10,
      suitable: true,
      reason: `Ngày ${trucInfo.name || truc} rất tốt cho ${eventType}`
    };
  }

  if (isBad) {
    return {
      score: Math.max(trucInfo.score - 30, 10),
      suitable: false,
      reason: `Ngày ${trucInfo.name || truc} không phù hợp cho ${eventType}`
    };
  }

  return {
    score: trucInfo.score,
    suitable: trucInfo.type !== 'hacDao',
    reason: `Ngày ${trucInfo.name || truc}: ${trucInfo.meaning}`
  };
}

/**
 * Lấy danh sách ngày Hoàng Đạo
 */
export function getHoangDaoTruc() {
  return Object.entries(THAP_NHI_TRUC)
    .filter(([_, info]) => info.type === 'hoangDao')
    .map(([name, info]) => ({ name, ...info }));
}

/**
 * Lấy thông tin chi tiết về một Trực
 */
export function getTrucInfo(trucName) {
  return THAP_NHI_TRUC[trucName] ? { name: trucName, ...THAP_NHI_TRUC[trucName] } : null;
}

export default {
  THAP_NHI_TRUC,
  TRUC_ORDER,
  calculateTruc,
  isHoangDao,
  isHacDao,
  evaluateDayForEvent,
  getHoangDaoTruc,
  getTrucInfo
};
