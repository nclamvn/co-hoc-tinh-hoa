/**
 * Giờ Hoàng Đạo Calculator
 * 12 Canh giờ và giờ Hoàng Đạo theo ngày
 */

// 12 Canh giờ
export const CANH_GIO = [
  { name: 'Tý', start: 23, end: 1, period: '23:00 - 01:00' },
  { name: 'Sửu', start: 1, end: 3, period: '01:00 - 03:00' },
  { name: 'Dần', start: 3, end: 5, period: '03:00 - 05:00' },
  { name: 'Mão', start: 5, end: 7, period: '05:00 - 07:00' },
  { name: 'Thìn', start: 7, end: 9, period: '07:00 - 09:00' },
  { name: 'Tỵ', start: 9, end: 11, period: '09:00 - 11:00' },
  { name: 'Ngọ', start: 11, end: 13, period: '11:00 - 13:00' },
  { name: 'Mùi', start: 13, end: 15, period: '13:00 - 15:00' },
  { name: 'Thân', start: 15, end: 17, period: '15:00 - 17:00' },
  { name: 'Dậu', start: 17, end: 19, period: '17:00 - 19:00' },
  { name: 'Tuất', start: 19, end: 21, period: '19:00 - 21:00' },
  { name: 'Hợi', start: 21, end: 23, period: '21:00 - 23:00' }
];

// Giờ Hoàng Đạo theo ngày (Địa Chi của ngày)
// Công thức: Thanh Long, Minh Đường, Kim Quỹ, Thiên Đức, Ngọc Đường, Tư Mệnh là giờ Hoàng Đạo
export const GIO_HOANG_DAO_THEO_NGAY = {
  'Tý': ['Tý', 'Sửu', 'Mão', 'Ngọ', 'Mùi', 'Dậu'],
  'Sửu': ['Dần', 'Mão', 'Tỵ', 'Thân', 'Dậu', 'Hợi'],
  'Dần': ['Tý', 'Sửu', 'Thìn', 'Tỵ', 'Mùi', 'Tuất'],
  'Mão': ['Tý', 'Dần', 'Mão', 'Ngọ', 'Mùi', 'Dậu'],
  'Thìn': ['Sửu', 'Thìn', 'Tỵ', 'Mùi', 'Tuất', 'Hợi'],
  'Tỵ': ['Tý', 'Dần', 'Thìn', 'Tỵ', 'Thân', 'Dậu'],
  'Ngọ': ['Tý', 'Sửu', 'Mão', 'Ngọ', 'Mùi', 'Dậu'],
  'Mùi': ['Dần', 'Mão', 'Tỵ', 'Thân', 'Dậu', 'Hợi'],
  'Thân': ['Tý', 'Sửu', 'Thìn', 'Tỵ', 'Mùi', 'Tuất'],
  'Dậu': ['Tý', 'Dần', 'Mão', 'Ngọ', 'Mùi', 'Dậu'],
  'Tuất': ['Sửu', 'Thìn', 'Tỵ', 'Mùi', 'Tuất', 'Hợi'],
  'Hợi': ['Tý', 'Dần', 'Thìn', 'Tỵ', 'Thân', 'Dậu']
};

// Ý nghĩa các thần giờ Hoàng Đạo
export const THAN_GIO_HOANG_DAO = {
  'Thanh Long': { meaning: 'Quý nhân phù trợ', score: 95 },
  'Minh Đường': { meaning: 'Sáng sủa, thuận lợi', score: 90 },
  'Kim Quỹ': { meaning: 'Tài lộc phát đạt', score: 90 },
  'Thiên Đức': { meaning: 'Phúc đức, may mắn', score: 95 },
  'Ngọc Đường': { meaning: 'Cao quý, tốt lành', score: 88 },
  'Tư Mệnh': { meaning: 'Thuận theo mệnh', score: 85 }
};

// Ý nghĩa các thần giờ Hắc Đạo
export const THAN_GIO_HAC_DAO = {
  'Thiên Hình': { meaning: 'Hình phạt, cản trở', score: 30 },
  'Chu Tước': { meaning: 'Thị phi, khẩu thiệt', score: 35 },
  'Bạch Hổ': { meaning: 'Hung hiểm, tai nạn', score: 25 },
  'Thiên Lao': { meaning: 'Giam cầm, trì trệ', score: 30 },
  'Huyền Vũ': { meaning: 'Mất mát, lừa dối', score: 35 },
  'Câu Trần': { meaning: 'Chậm trễ, rắc rối', score: 40 }
};

/**
 * Lấy giờ Hoàng Đạo của ngày
 */
export function getGioHoangDao(dayChi) {
  const hoangDaoHours = GIO_HOANG_DAO_THEO_NGAY[dayChi] || [];

  return CANH_GIO.map(gio => {
    const isHoangDao = hoangDaoHours.includes(gio.name);
    return {
      ...gio,
      isHoangDao,
      type: isHoangDao ? 'hoangDao' : 'hacDao',
      score: isHoangDao ? 85 : 40
    };
  });
}

/**
 * Kiểm tra một giờ cụ thể có phải Hoàng Đạo không
 */
export function isGioHoangDao(dayChi, gioChi) {
  const hoangDaoHours = GIO_HOANG_DAO_THEO_NGAY[dayChi] || [];
  return hoangDaoHours.includes(gioChi);
}

/**
 * Lấy giờ tốt nhất trong ngày
 */
export function getBestHours(dayChi, topN = 3) {
  const allHours = getGioHoangDao(dayChi);
  const hoangDaoHours = allHours.filter(h => h.isHoangDao);

  // Ưu tiên giờ ban ngày (7h-17h)
  const dayHours = hoangDaoHours.filter(h => h.start >= 7 && h.start < 17);
  const nightHours = hoangDaoHours.filter(h => h.start < 7 || h.start >= 17);

  const sorted = [...dayHours, ...nightHours];
  return sorted.slice(0, topN);
}

/**
 * Lấy giờ từ thời gian
 */
export function getGioFromTime(hour) {
  for (const gio of CANH_GIO) {
    if (gio.name === 'Tý') {
      if (hour >= 23 || hour < 1) return gio;
    } else {
      if (hour >= gio.start && hour < gio.end) return gio;
    }
  }
  return CANH_GIO[0]; // Default to Tý
}

/**
 * Đánh giá giờ cho sự kiện
 */
export function evaluateHourForEvent(dayChi, gioChi, eventType) {
  const isHoangDao = isGioHoangDao(dayChi, gioChi);
  const gioInfo = CANH_GIO.find(g => g.name === gioChi);

  // Các giờ tốt cho từng loại sự kiện
  const eventBestHours = {
    'kết hôn': ['Mão', 'Tỵ', 'Mùi', 'Dậu'],
    'khai trương': ['Thìn', 'Tỵ', 'Ngọ', 'Mùi'],
    'động thổ': ['Dần', 'Mão', 'Thìn', 'Tỵ'],
    'nhập trạch': ['Dần', 'Mão', 'Ngọ', 'Mùi'],
    'xuất hành': ['Mão', 'Tỵ', 'Ngọ', 'Thân']
  };

  const eventHours = eventBestHours[eventType.toLowerCase()] || [];
  const isEventBestHour = eventHours.includes(gioChi);

  let score = isHoangDao ? 80 : 40;
  if (isEventBestHour && isHoangDao) score += 15;

  return {
    gioChi,
    gioInfo,
    isHoangDao,
    isEventBestHour,
    score,
    suitable: isHoangDao,
    recommendation: isHoangDao && isEventBestHour
      ? 'Giờ đẹp nhất cho sự kiện'
      : isHoangDao
      ? 'Giờ Hoàng Đạo, phù hợp'
      : 'Giờ Hắc Đạo, nên tránh'
  };
}

export default {
  CANH_GIO,
  GIO_HOANG_DAO_THEO_NGAY,
  THAN_GIO_HOANG_DAO,
  THAN_GIO_HAC_DAO,
  getGioHoangDao,
  isGioHoangDao,
  getBestHours,
  getGioFromTime,
  evaluateHourForEvent
};
