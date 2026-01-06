/**
 * NGÀY LỄ VIỆT NAM
 * Database ngày lễ dương lịch và âm lịch
 */

// Ngày lễ Dương lịch Việt Nam
export const SOLAR_HOLIDAYS = {
  '01-01': { name: 'Tết Dương lịch', type: 'national', off: true, emoji: '🎉' },
  '02-03': { name: 'Ngày thành lập Đảng', type: 'national', emoji: '🚩' },
  '02-14': { name: 'Valentine', type: 'international', emoji: '💕' },
  '03-08': { name: 'Quốc tế Phụ nữ', type: 'international', emoji: '🌷' },
  '03-20': { name: 'Ngày Hạnh phúc', type: 'international', emoji: '😊' },
  '03-26': { name: 'Ngày thành lập Đoàn TNCS', type: 'national', emoji: '🔴' },
  '04-30': { name: 'Ngày Giải phóng miền Nam', type: 'national', off: true, emoji: '🏆' },
  '05-01': { name: 'Quốc tế Lao động', type: 'national', off: true, emoji: '👷' },
  '05-07': { name: 'Ngày chiến thắng Điện Biên Phủ', type: 'national', emoji: '⭐' },
  '05-13': { name: 'Ngày của Mẹ', type: 'international', emoji: '👩' },
  '05-19': { name: 'Sinh nhật Bác Hồ', type: 'national', emoji: '🌟' },
  '06-01': { name: 'Quốc tế Thiếu nhi', type: 'international', emoji: '👶' },
  '06-17': { name: 'Ngày của Cha', type: 'international', emoji: '👨' },
  '06-28': { name: 'Ngày Gia đình Việt Nam', type: 'national', emoji: '👪' },
  '07-27': { name: 'Ngày Thương binh Liệt sĩ', type: 'national', emoji: '🎖️' },
  '08-19': { name: 'Cách mạng Tháng Tám', type: 'national', emoji: '🔴' },
  '09-02': { name: 'Quốc khánh', type: 'national', off: true, emoji: '🇻🇳' },
  '09-10': { name: 'Trung thu (Dương lịch)', type: 'cultural', emoji: '🏮' },
  '10-01': { name: 'Quốc tế Người cao tuổi', type: 'international', emoji: '👴' },
  '10-10': { name: 'Ngày Giải phóng Thủ đô', type: 'national', emoji: '🏛️' },
  '10-13': { name: 'Ngày Doanh nhân Việt Nam', type: 'national', emoji: '💼' },
  '10-14': { name: 'Ngày thành lập Hội LHPN VN', type: 'national', emoji: '🌺' },
  '10-20': { name: 'Ngày Phụ nữ Việt Nam', type: 'national', emoji: '🌸' },
  '10-31': { name: 'Halloween', type: 'international', emoji: '🎃' },
  '11-09': { name: 'Ngày Pháp luật Việt Nam', type: 'national', emoji: '⚖️' },
  '11-20': { name: 'Ngày Nhà giáo Việt Nam', type: 'national', emoji: '🎓' },
  '12-01': { name: 'Ngày Thế giới phòng chống AIDS', type: 'international', emoji: '🎗️' },
  '12-19': { name: 'Ngày Toàn quốc kháng chiến', type: 'national', emoji: '⭐' },
  '12-22': { name: 'Ngày thành lập QĐND Việt Nam', type: 'national', emoji: '🎖️' },
  '12-24': { name: 'Đêm Giáng sinh', type: 'international', emoji: '🎄' },
  '12-25': { name: 'Giáng sinh', type: 'international', emoji: '🎅' },
  '12-31': { name: 'Đêm Giao thừa', type: 'international', emoji: '🎊' }
};

// Ngày lễ Âm lịch Việt Nam
export const LUNAR_HOLIDAYS = {
  '01-01': {
    name: 'Tết Nguyên Đán',
    type: 'traditional',
    off: true,
    duration: 7,
    emoji: '🧧',
    description: 'Tết cổ truyền dân tộc'
  },
  '01-15': {
    name: 'Tết Nguyên Tiêu',
    type: 'traditional',
    emoji: '🏮',
    description: 'Rằm tháng Giêng'
  },
  '02-02': {
    name: 'Tết Đầu năm Xá tội vong nhân',
    type: 'religious',
    emoji: '🙏',
    description: 'Lễ cúng chúng sinh'
  },
  '03-03': {
    name: 'Tết Hàn Thực',
    type: 'traditional',
    emoji: '🍡',
    description: 'Tết bánh trôi bánh chay'
  },
  '03-10': {
    name: 'Giỗ Tổ Hùng Vương',
    type: 'national',
    off: true,
    emoji: '🏛️',
    description: 'Ngày Quốc giỗ'
  },
  '04-08': {
    name: 'Lễ Phật Đản',
    type: 'religious',
    emoji: '🪷',
    description: 'Ngày Đức Phật ra đời'
  },
  '04-15': {
    name: 'Rằm tháng Tư',
    type: 'traditional',
    emoji: '🌕',
    description: 'Lễ Phật Đản theo Nam Tông'
  },
  '05-05': {
    name: 'Tết Đoan Ngọ',
    type: 'traditional',
    emoji: '🐉',
    description: 'Tết diệt sâu bọ'
  },
  '07-07': {
    name: 'Thất Tịch',
    type: 'traditional',
    emoji: '💫',
    description: 'Ngày Ngưu Lang Chức Nữ'
  },
  '07-15': {
    name: 'Lễ Vu Lan',
    type: 'traditional',
    emoji: '🌹',
    description: 'Ngày báo hiếu cha mẹ'
  },
  '08-15': {
    name: 'Tết Trung Thu',
    type: 'traditional',
    emoji: '🥮',
    description: 'Tết thiếu nhi, Tết đoàn viên'
  },
  '09-09': {
    name: 'Tết Trùng Cửu',
    type: 'traditional',
    emoji: '🍃',
    description: 'Tết leo núi, kính lão'
  },
  '10-10': {
    name: 'Tết Trùng Thập',
    type: 'traditional',
    emoji: '🌾',
    description: 'Tết cơm mới'
  },
  '12-08': {
    name: 'Lễ Phật Thành Đạo',
    type: 'religious',
    emoji: '☸️',
    description: 'Ngày Đức Phật thành đạo'
  },
  '12-23': {
    name: 'Ông Táo về trời',
    type: 'traditional',
    emoji: '🐟',
    description: 'Tiễn Táo quân về trời'
  },
  '12-30': {
    name: 'Tất Niên',
    type: 'traditional',
    emoji: '🎆',
    description: 'Đêm giao thừa Âm lịch'
  }
};

// 24 Tiết khí
export const TIET_KHI = [
  { id: 1, chinese: '立春', name: 'Lập Xuân', meaning: 'Bắt đầu mùa xuân', month: 2, emoji: '🌱' },
  { id: 2, chinese: '雨水', name: 'Vũ Thủy', meaning: 'Mưa xuân', month: 2, emoji: '🌧️' },
  { id: 3, chinese: '惊蛰', name: 'Kinh Trập', meaning: 'Sâu bọ thức giấc', month: 3, emoji: '🐛' },
  { id: 4, chinese: '春分', name: 'Xuân Phân', meaning: 'Giữa xuân, ngày đêm bằng nhau', month: 3, emoji: '⚖️' },
  { id: 5, chinese: '清明', name: 'Thanh Minh', meaning: 'Trời trong sáng', month: 4, emoji: '🌤️' },
  { id: 6, chinese: '谷雨', name: 'Cốc Vũ', meaning: 'Mưa nuôi ngũ cốc', month: 4, emoji: '🌾' },
  { id: 7, chinese: '立夏', name: 'Lập Hạ', meaning: 'Bắt đầu mùa hè', month: 5, emoji: '☀️' },
  { id: 8, chinese: '小满', name: 'Tiểu Mãn', meaning: 'Lúa bắt đầu chín', month: 5, emoji: '🌾' },
  { id: 9, chinese: '芒种', name: 'Mang Chủng', meaning: 'Gieo hạt mùa', month: 6, emoji: '🌱' },
  { id: 10, chinese: '夏至', name: 'Hạ Chí', meaning: 'Giữa hè, ngày dài nhất', month: 6, emoji: '🌞' },
  { id: 11, chinese: '小暑', name: 'Tiểu Thử', meaning: 'Nóng nhẹ', month: 7, emoji: '🌡️' },
  { id: 12, chinese: '大暑', name: 'Đại Thử', meaning: 'Nóng nhiều', month: 7, emoji: '🔥' },
  { id: 13, chinese: '立秋', name: 'Lập Thu', meaning: 'Bắt đầu mùa thu', month: 8, emoji: '🍂' },
  { id: 14, chinese: '处暑', name: 'Xử Thử', meaning: 'Hết nóng', month: 8, emoji: '🌬️' },
  { id: 15, chinese: '白露', name: 'Bạch Lộ', meaning: 'Sương trắng', month: 9, emoji: '💧' },
  { id: 16, chinese: '秋分', name: 'Thu Phân', meaning: 'Giữa thu, ngày đêm bằng nhau', month: 9, emoji: '⚖️' },
  { id: 17, chinese: '寒露', name: 'Hàn Lộ', meaning: 'Sương lạnh', month: 10, emoji: '❄️' },
  { id: 18, chinese: '霜降', name: 'Sương Giáng', meaning: 'Sương muối xuất hiện', month: 10, emoji: '🥶' },
  { id: 19, chinese: '立冬', name: 'Lập Đông', meaning: 'Bắt đầu mùa đông', month: 11, emoji: '❄️' },
  { id: 20, chinese: '小雪', name: 'Tiểu Tuyết', meaning: 'Tuyết nhỏ', month: 11, emoji: '🌨️' },
  { id: 21, chinese: '大雪', name: 'Đại Tuyết', meaning: 'Tuyết lớn', month: 12, emoji: '☃️' },
  { id: 22, chinese: '冬至', name: 'Đông Chí', meaning: 'Giữa đông, đêm dài nhất', month: 12, emoji: '🌙' },
  { id: 23, chinese: '小寒', name: 'Tiểu Hàn', meaning: 'Rét nhẹ', month: 1, emoji: '🥶' },
  { id: 24, chinese: '大寒', name: 'Đại Hàn', meaning: 'Rét đậm', month: 1, emoji: '🧊' }
];

// Ngày kỵ cưới (cố định)
export const KY_CUOI = {
  lunarMonths: [7], // Tháng 7 Âm (tháng cô hồn)
  lunarDays: [1, 15], // Mùng 1 và Rằm
  description: 'Theo phong tục, tránh cưới vào tháng 7 âm lịch và các ngày Mùng 1, Rằm'
};

// Ngày tốt cho các việc
export const NGAY_TOT_THEO_TRUC = {
  'Kiến': ['Khai trương', 'Động thổ', 'Nhập học', 'Khởi công', 'Xuất hành', 'Cầu tài'],
  'Trừ': ['Chữa bệnh', 'Trừ tà', 'Dọn dẹp', 'Cắt may', 'Sửa chữa'],
  'Mãn': ['Kết hôn', 'Khai trương', 'Thu hoạch', 'Nhập trạch', 'Cầu tài', 'Giao dịch'],
  'Bình': ['Sửa đường', 'Đào giếng', 'Làm cầu', 'Tu sửa nhà'],
  'Định': ['Kết hôn', 'Nhập trạch', 'An táng', 'Ký hợp đồng', 'Giao dịch'],
  'Chấp': ['Xây dựng', 'Trồng trọt', 'Mua sắm', 'Cất giữ'],
  'Phá': ['Phá dỡ', 'Chữa bệnh', 'Trừ tà'],
  'Nguy': ['Cầu an', 'Cúng tế', 'Nghỉ ngơi'],
  'Thành': ['Kết hôn', 'Khai trương', 'Nhập trạch', 'Hoàn thành dự án'],
  'Thu': ['Thu hoạch', 'Cất giữ', 'Thu nợ'],
  'Khai': ['Khai trương', 'Nhập học', 'Xuất hành', 'Mở cửa hàng', 'Bắt đầu công việc'],
  'Bế': ['Đắp đê', 'Lấp hố', 'An táng', 'Đóng cửa']
};

// Ngày xấu theo Trực
export const NGAY_XAU_THEO_TRUC = {
  'Kiến': ['Kiện tụng', 'Đòi nợ', 'An táng'],
  'Trừ': ['Kết hôn', 'Khai trương', 'Xuất hành xa'],
  'Mãn': ['Chôn cất', 'Xuất hành xa', 'Động thổ'],
  'Bình': ['Động thổ', 'Khai trương', 'Xuất hành'],
  'Định': ['Kiện tụng', 'Xuất hành', 'Mở cửa hàng'],
  'Chấp': ['Khai trương', 'Xuất hành', 'Di chuyển'],
  'Phá': ['Kết hôn', 'Khai trương', 'Ký hợp đồng', 'Xuất hành', 'Nhập trạch'],
  'Nguy': ['Mọi việc lớn', 'Xuất hành', 'Động thổ', 'Kết hôn'],
  'Thành': ['Kiện tụng', 'Khởi công mới'],
  'Thu': ['Khởi công', 'Xuất hành', 'Khai trương', 'Kết hôn'],
  'Khai': ['An táng', 'Đào mộ'],
  'Bế': ['Khai trương', 'Xuất hành', 'Kết hôn', 'Nhập trạch', 'Động thổ']
};

/**
 * Kiểm tra ngày có phải ngày lễ dương lịch không
 */
export function isSolarHoliday(month, day) {
  const key = `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  return SOLAR_HOLIDAYS[key] || null;
}

/**
 * Kiểm tra ngày có phải ngày lễ âm lịch không
 */
export function isLunarHoliday(lunarMonth, lunarDay) {
  const key = `${Math.abs(lunarMonth).toString().padStart(2, '0')}-${lunarDay.toString().padStart(2, '0')}`;
  return LUNAR_HOLIDAYS[key] || null;
}

/**
 * Lấy tất cả ngày lễ trong một tháng dương lịch
 */
export function getHolidaysInSolarMonth(month) {
  const holidays = [];
  for (const [key, value] of Object.entries(SOLAR_HOLIDAYS)) {
    const [m] = key.split('-').map(Number);
    if (m === month) {
      const [, d] = key.split('-').map(Number);
      holidays.push({ day: d, ...value });
    }
  }
  return holidays.sort((a, b) => a.day - b.day);
}

/**
 * Lấy tất cả ngày lễ trong một tháng âm lịch
 */
export function getHolidaysInLunarMonth(lunarMonth) {
  const holidays = [];
  for (const [key, value] of Object.entries(LUNAR_HOLIDAYS)) {
    const [m] = key.split('-').map(Number);
    if (m === Math.abs(lunarMonth)) {
      const [, d] = key.split('-').map(Number);
      holidays.push({ day: d, ...value });
    }
  }
  return holidays.sort((a, b) => a.day - b.day);
}

/**
 * Lấy thông tin tiết khí theo tên
 */
export function getTietKhiInfo(name) {
  return TIET_KHI.find(tk => tk.name === name || tk.chinese === name) || null;
}

export default {
  SOLAR_HOLIDAYS,
  LUNAR_HOLIDAYS,
  TIET_KHI,
  KY_CUOI,
  NGAY_TOT_THEO_TRUC,
  NGAY_XAU_THEO_TRUC,
  isSolarHoliday,
  isLunarHoliday,
  getHolidaysInSolarMonth,
  getHolidaysInLunarMonth,
  getTietKhiInfo
};
