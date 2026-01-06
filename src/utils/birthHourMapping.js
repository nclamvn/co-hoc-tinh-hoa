/**
 * 12 Canh Giờ (Chinese Hours) Mapping
 * Each hour period is 2 hours, starting from 23:00 (Tý)
 */

export const BIRTH_HOURS = [
  {
    id: 'ty',
    name: 'Tý',
    diaChi: '子',
    timeRange: '23:00 - 01:00',
    startHour: 23,
    endHour: 1,
    emoji: '🐀',
    element: 'Thủy',
    characteristics: 'Bí ẩn, sáng tạo, nhạy bén trong đêm khuya',
    energy: 'Âm cực sinh Dương, thời khắc chuyển giao'
  },
  {
    id: 'suu',
    name: 'Sửu',
    diaChi: '丑',
    timeRange: '01:00 - 03:00',
    startHour: 1,
    endHour: 3,
    emoji: '🐂',
    element: 'Thổ',
    characteristics: 'Kiên nhẫn, chăm chỉ, bền bỉ',
    energy: 'Tích lũy năng lượng, chuẩn bị cho ngày mới'
  },
  {
    id: 'dan',
    name: 'Dần',
    diaChi: '寅',
    timeRange: '03:00 - 05:00',
    startHour: 3,
    endHour: 5,
    emoji: '🐅',
    element: 'Mộc',
    characteristics: 'Dũng mãnh, tiên phong, quyết đoán',
    energy: 'Dương khí bắt đầu thăng, thời khắc hổ thức giấc'
  },
  {
    id: 'mao',
    name: 'Mão',
    diaChi: '卯',
    timeRange: '05:00 - 07:00',
    startHour: 5,
    endHour: 7,
    emoji: '🐇',
    element: 'Mộc',
    characteristics: 'Thanh lịch, nghệ sĩ, tinh tế',
    energy: 'Bình minh, vạn vật thức tỉnh'
  },
  {
    id: 'thin',
    name: 'Thìn',
    diaChi: '辰',
    timeRange: '07:00 - 09:00',
    startHour: 7,
    endHour: 9,
    emoji: '🐉',
    element: 'Thổ',
    characteristics: 'Quyền lực, may mắn, tôn quý',
    energy: 'Rồng xuất hiện, thời khắc cát tường'
  },
  {
    id: 'ty_ran',
    name: 'Tỵ',
    diaChi: '巳',
    timeRange: '09:00 - 11:00',
    startHour: 9,
    endHour: 11,
    emoji: '🐍',
    element: 'Hỏa',
    characteristics: 'Thông thái, bí ẩn, sâu sắc',
    energy: 'Dương khí đang thịnh, trí tuệ minh mẫn'
  },
  {
    id: 'ngo',
    name: 'Ngọ',
    diaChi: '午',
    timeRange: '11:00 - 13:00',
    startHour: 11,
    endHour: 13,
    emoji: '🐴',
    element: 'Hỏa',
    characteristics: 'Năng động, tự do, nhiệt huyết',
    energy: 'Dương cực, mặt trời đỉnh đầu'
  },
  {
    id: 'mui',
    name: 'Mùi',
    diaChi: '未',
    timeRange: '13:00 - 15:00',
    startHour: 13,
    endHour: 15,
    emoji: '🐐',
    element: 'Thổ',
    characteristics: 'Nghệ thuật, lãng mạn, dịu dàng',
    energy: 'Dương bắt đầu suy, Âm khởi sinh'
  },
  {
    id: 'than',
    name: 'Thân',
    diaChi: '申',
    timeRange: '15:00 - 17:00',
    startHour: 15,
    endHour: 17,
    emoji: '🐒',
    element: 'Kim',
    characteristics: 'Thông minh, linh hoạt, sáng tạo',
    energy: 'Khí kim thu liễm, tư duy sắc bén'
  },
  {
    id: 'dau',
    name: 'Dậu',
    diaChi: '酉',
    timeRange: '17:00 - 19:00',
    startHour: 17,
    endHour: 19,
    emoji: '🐓',
    element: 'Kim',
    characteristics: 'Kỷ luật, chính xác, siêng năng',
    energy: 'Hoàng hôn, gà về chuồng, kết thúc ngày'
  },
  {
    id: 'tuat',
    name: 'Tuất',
    diaChi: '戌',
    timeRange: '19:00 - 21:00',
    startHour: 19,
    endHour: 21,
    emoji: '🐕',
    element: 'Thổ',
    characteristics: 'Trung thành, bảo vệ, chính trực',
    energy: 'Đêm xuống, chó canh giữ'
  },
  {
    id: 'hoi',
    name: 'Hợi',
    diaChi: '亥',
    timeRange: '21:00 - 23:00',
    startHour: 21,
    endHour: 23,
    emoji: '🐖',
    element: 'Thủy',
    characteristics: 'Hào phóng, thư giãn, hưởng thụ',
    energy: 'Âm khí thịnh, vạn vật nghỉ ngơi'
  }
];

/**
 * Get birth hour from exact time
 * @param {number} hour - Hour in 24h format (0-23)
 * @param {number} minute - Minute (0-59)
 * @returns {object} Birth hour info
 */
export function getBirthHourFromTime(hour, minute = 0) {
  // Handle edge case: 23:00 - 23:59 is Tý
  if (hour === 23) return BIRTH_HOURS[0];

  // Handle edge case: 00:00 - 00:59 is also Tý
  if (hour === 0) return BIRTH_HOURS[0];

  // For other hours, find the matching period
  for (const birthHour of BIRTH_HOURS) {
    if (birthHour.startHour <= hour && hour < birthHour.endHour) {
      return birthHour;
    }
    // Special handling for ranges that don't cross midnight
    if (birthHour.startHour < birthHour.endHour) {
      if (hour >= birthHour.startHour && hour < birthHour.endHour) {
        return birthHour;
      }
    }
  }

  // Fallback mapping
  const hourIndex = Math.floor(((hour + 1) % 24) / 2);
  return BIRTH_HOURS[hourIndex];
}

/**
 * Time period options for users who don't know exact birth time
 */
export const TIME_PERIODS = [
  { id: 'early_morning', label: 'Sáng sớm (3:00 - 7:00)', defaultHour: 5, hours: ['dan', 'mao'] },
  { id: 'morning', label: 'Buổi sáng (7:00 - 11:00)', defaultHour: 9, hours: ['thin', 'ty_ran'] },
  { id: 'noon', label: 'Buổi trưa (11:00 - 13:00)', defaultHour: 12, hours: ['ngo'] },
  { id: 'afternoon', label: 'Buổi chiều (13:00 - 17:00)', defaultHour: 15, hours: ['mui', 'than'] },
  { id: 'evening', label: 'Buổi tối (17:00 - 21:00)', defaultHour: 19, hours: ['dau', 'tuat'] },
  { id: 'night', label: 'Đêm khuya (21:00 - 3:00)', defaultHour: 23, hours: ['hoi', 'ty', 'suu'] }
];

/**
 * Vietnamese provinces for birth place selection
 */
export const VIETNAM_PROVINCES = [
  // Miền Bắc
  { id: 'hanoi', name: 'Hà Nội', region: 'north', timezone: '+7' },
  { id: 'haiphong', name: 'Hải Phòng', region: 'north', timezone: '+7' },
  { id: 'quangninh', name: 'Quảng Ninh', region: 'north', timezone: '+7' },
  { id: 'bacninh', name: 'Bắc Ninh', region: 'north', timezone: '+7' },
  { id: 'bacgiang', name: 'Bắc Giang', region: 'north', timezone: '+7' },
  { id: 'hanam', name: 'Hà Nam', region: 'north', timezone: '+7' },
  { id: 'hungyen', name: 'Hưng Yên', region: 'north', timezone: '+7' },
  { id: 'haiduong', name: 'Hải Dương', region: 'north', timezone: '+7' },
  { id: 'thaibinh', name: 'Thái Bình', region: 'north', timezone: '+7' },
  { id: 'namdinh', name: 'Nam Định', region: 'north', timezone: '+7' },
  { id: 'ninhbinh', name: 'Ninh Bình', region: 'north', timezone: '+7' },
  { id: 'vinhphuc', name: 'Vĩnh Phúc', region: 'north', timezone: '+7' },
  { id: 'phutho', name: 'Phú Thọ', region: 'north', timezone: '+7' },
  { id: 'thainguyen', name: 'Thái Nguyên', region: 'north', timezone: '+7' },
  { id: 'langson', name: 'Lạng Sơn', region: 'north', timezone: '+7' },
  { id: 'caobang', name: 'Cao Bằng', region: 'north', timezone: '+7' },
  { id: 'backan', name: 'Bắc Kạn', region: 'north', timezone: '+7' },
  { id: 'tuyenquang', name: 'Tuyên Quang', region: 'north', timezone: '+7' },
  { id: 'hagiang', name: 'Hà Giang', region: 'north', timezone: '+7' },
  { id: 'laocai', name: 'Lào Cai', region: 'north', timezone: '+7' },
  { id: 'yenbai', name: 'Yên Bái', region: 'north', timezone: '+7' },
  { id: 'sonla', name: 'Sơn La', region: 'north', timezone: '+7' },
  { id: 'dienbien', name: 'Điện Biên', region: 'north', timezone: '+7' },
  { id: 'laichau', name: 'Lai Châu', region: 'north', timezone: '+7' },
  { id: 'hoabinh', name: 'Hòa Bình', region: 'north', timezone: '+7' },

  // Miền Trung
  { id: 'thanhhoa', name: 'Thanh Hóa', region: 'central', timezone: '+7' },
  { id: 'nghean', name: 'Nghệ An', region: 'central', timezone: '+7' },
  { id: 'hatinh', name: 'Hà Tĩnh', region: 'central', timezone: '+7' },
  { id: 'quangbinh', name: 'Quảng Bình', region: 'central', timezone: '+7' },
  { id: 'quangtri', name: 'Quảng Trị', region: 'central', timezone: '+7' },
  { id: 'thuathienhue', name: 'Thừa Thiên Huế', region: 'central', timezone: '+7' },
  { id: 'danang', name: 'Đà Nẵng', region: 'central', timezone: '+7' },
  { id: 'quangnam', name: 'Quảng Nam', region: 'central', timezone: '+7' },
  { id: 'quangngai', name: 'Quảng Ngãi', region: 'central', timezone: '+7' },
  { id: 'binhdinh', name: 'Bình Định', region: 'central', timezone: '+7' },
  { id: 'phuyen', name: 'Phú Yên', region: 'central', timezone: '+7' },
  { id: 'khanhhoa', name: 'Khánh Hòa', region: 'central', timezone: '+7' },
  { id: 'ninhthuan', name: 'Ninh Thuận', region: 'central', timezone: '+7' },
  { id: 'binhthuan', name: 'Bình Thuận', region: 'central', timezone: '+7' },
  { id: 'kontum', name: 'Kon Tum', region: 'central', timezone: '+7' },
  { id: 'gialai', name: 'Gia Lai', region: 'central', timezone: '+7' },
  { id: 'daklak', name: 'Đắk Lắk', region: 'central', timezone: '+7' },
  { id: 'daknong', name: 'Đắk Nông', region: 'central', timezone: '+7' },
  { id: 'lamdong', name: 'Lâm Đồng', region: 'central', timezone: '+7' },

  // Miền Nam
  { id: 'hcm', name: 'TP. Hồ Chí Minh', region: 'south', timezone: '+7' },
  { id: 'bariavungtau', name: 'Bà Rịa - Vũng Tàu', region: 'south', timezone: '+7' },
  { id: 'dongnai', name: 'Đồng Nai', region: 'south', timezone: '+7' },
  { id: 'binhduong', name: 'Bình Dương', region: 'south', timezone: '+7' },
  { id: 'binhphuoc', name: 'Bình Phước', region: 'south', timezone: '+7' },
  { id: 'tayninh', name: 'Tây Ninh', region: 'south', timezone: '+7' },
  { id: 'longAn', name: 'Long An', region: 'south', timezone: '+7' },
  { id: 'tiengiang', name: 'Tiền Giang', region: 'south', timezone: '+7' },
  { id: 'bentre', name: 'Bến Tre', region: 'south', timezone: '+7' },
  { id: 'travinh', name: 'Trà Vinh', region: 'south', timezone: '+7' },
  { id: 'vinhlong', name: 'Vĩnh Long', region: 'south', timezone: '+7' },
  { id: 'dongthap', name: 'Đồng Tháp', region: 'south', timezone: '+7' },
  { id: 'angiang', name: 'An Giang', region: 'south', timezone: '+7' },
  { id: 'kiengiang', name: 'Kiên Giang', region: 'south', timezone: '+7' },
  { id: 'cantho', name: 'Cần Thơ', region: 'south', timezone: '+7' },
  { id: 'haugiang', name: 'Hậu Giang', region: 'south', timezone: '+7' },
  { id: 'soctrang', name: 'Sóc Trăng', region: 'south', timezone: '+7' },
  { id: 'baclieu', name: 'Bạc Liêu', region: 'south', timezone: '+7' },
  { id: 'camau', name: 'Cà Mau', region: 'south', timezone: '+7' }
];

export default { BIRTH_HOURS, getBirthHourFromTime, TIME_PERIODS, VIETNAM_PROVINCES };
