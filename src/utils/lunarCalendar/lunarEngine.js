/**
 * LUNAR CALENDAR ENGINE
 * Tính toán đầy đủ thông tin Âm lịch Việt Nam
 * Sử dụng thư viện lunar-javascript
 */

import { Solar, Lunar, LunarYear } from 'lunar-javascript';

// 12 Địa Chi với emoji
const CHI_EMOJIS = {
  '子': '🐀', '丑': '🐂', '寅': '🐅', '卯': '🐇',
  '辰': '🐉', '巳': '🐍', '午': '🐴', '未': '🐐',
  '申': '🐒', '酉': '🐓', '戌': '🐕', '亥': '🐖'
};

// Tên Địa Chi tiếng Việt
const CHI_VIETNAMESE = {
  '子': 'Tý', '丑': 'Sửu', '寅': 'Dần', '卯': 'Mão',
  '辰': 'Thìn', '巳': 'Tỵ', '午': 'Ngọ', '未': 'Mùi',
  '申': 'Thân', '酉': 'Dậu', '戌': 'Tuất', '亥': 'Hợi'
};

// Tên Thiên Can tiếng Việt
const CAN_VIETNAMESE = {
  '甲': 'Giáp', '乙': 'Ất', '丙': 'Bính', '丁': 'Đinh', '戊': 'Mậu',
  '己': 'Kỷ', '庚': 'Canh', '辛': 'Tân', '壬': 'Nhâm', '癸': 'Quý'
};

// Thứ tự Địa Chi
const CHI_ORDER = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

// 12 Trực
const TRUC_LIST = [
  { name: 'Kiến', type: 'hoangDao', meaning: 'Tốt cho khởi công, xây dựng', score: 85 },
  { name: 'Trừ', type: 'hoangDao', meaning: 'Tốt cho trừ tà, chữa bệnh', score: 75 },
  { name: 'Mãn', type: 'hoangDao', meaning: 'Tốt cho kết hôn, khai trương', score: 95 },
  { name: 'Bình', type: 'hoangDao', meaning: 'Tốt cho sửa đường, đào giếng', score: 70 },
  { name: 'Định', type: 'hoangDao', meaning: 'Tốt cho nhập trạch, an táng', score: 80 },
  { name: 'Chấp', type: 'hoangDao', meaning: 'Tốt cho xây dựng, trồng trọt', score: 75 },
  { name: 'Phá', type: 'hacDao', meaning: 'Xấu, chỉ tốt cho phá dỡ', score: 30 },
  { name: 'Nguy', type: 'hacDao', meaning: 'Xấu, cẩn thận mọi việc', score: 25 },
  { name: 'Thành', type: 'trungBinh', meaning: 'Tốt cho khai trương, giao dịch', score: 80 },
  { name: 'Thu', type: 'hacDao', meaning: 'Tốt cho thu hoạch, cất giữ', score: 40 },
  { name: 'Khai', type: 'trungBinh', meaning: 'Tốt cho khai trương, nhập học', score: 78 },
  { name: 'Bế', type: 'hacDao', meaning: 'Xấu, chỉ tốt cho đắp đê, lấp hố', score: 35 }
];

// 28 Sao (Nhị Thập Bát Tú)
const SAO_LIST = [
  { name: 'Giác', element: 'Mộc', animal: 'Giao', type: 'tot', meaning: 'Tốt cho xây dựng, cưới hỏi' },
  { name: 'Cang', element: 'Kim', animal: 'Long', type: 'xau', meaning: 'Kỵ mai táng, xây cất' },
  { name: 'Đê', element: 'Thổ', animal: 'Lạc', type: 'xau', meaning: 'Kỵ cưới hỏi, khai trương' },
  { name: 'Phòng', element: 'Nhật', animal: 'Thố', type: 'tot', meaning: 'Tốt cho mọi việc' },
  { name: 'Tâm', element: 'Nguyệt', animal: 'Hồ', type: 'xau', meaning: 'Kỵ mọi việc lớn' },
  { name: 'Vĩ', element: 'Hỏa', animal: 'Hổ', type: 'tot', meaning: 'Tốt cho cưới hỏi, khai trương' },
  { name: 'Cơ', element: 'Thủy', animal: 'Báo', type: 'tot', meaning: 'Tốt cho xây dựng, mai táng' },
  { name: 'Đẩu', element: 'Mộc', animal: 'Giải', type: 'tot', meaning: 'Đại cát, tốt mọi việc' },
  { name: 'Ngưu', element: 'Kim', animal: 'Ngưu', type: 'tot', meaning: 'Tốt cho cưới hỏi, giao dịch' },
  { name: 'Nữ', element: 'Thổ', animal: 'Bức', type: 'xau', meaning: 'Kỵ cưới hỏi, khai trương' },
  { name: 'Hư', element: 'Nhật', animal: 'Thử', type: 'xau', meaning: 'Kỵ mọi việc, chỉ tốt cho cúng tế' },
  { name: 'Nguy', element: 'Nguyệt', animal: 'Yến', type: 'xau', meaning: 'Kỵ mọi việc lớn' },
  { name: 'Thất', element: 'Hỏa', animal: 'Trư', type: 'tot', meaning: 'Tốt cho xây dựng, lập nghiệp' },
  { name: 'Bích', element: 'Thủy', animal: 'Du', type: 'tot', meaning: 'Tốt cho cưới hỏi, xây nhà' },
  { name: 'Khuê', element: 'Mộc', animal: 'Lang', type: 'xau', meaning: 'Kỵ cưới hỏi, xây cất' },
  { name: 'Lâu', element: 'Kim', animal: 'Cẩu', type: 'tot', meaning: 'Tốt cho cưới hỏi, khai trương' },
  { name: 'Vị', element: 'Thổ', animal: 'Trĩ', type: 'tot', meaning: 'Tốt cho xây dựng, giao dịch' },
  { name: 'Mão', element: 'Nhật', animal: 'Kê', type: 'xau', meaning: 'Kỵ cưới hỏi, khởi công' },
  { name: 'Tất', element: 'Nguyệt', animal: 'Ô', type: 'tot', meaning: 'Đại cát, tốt mọi việc' },
  { name: 'Chủy', element: 'Hỏa', animal: 'Hầu', type: 'xau', meaning: 'Kỵ mọi việc lớn' },
  { name: 'Sâm', element: 'Thủy', animal: 'Viên', type: 'tot', meaning: 'Tốt cho cưới hỏi, xây nhà' },
  { name: 'Tỉnh', element: 'Mộc', animal: 'Ngạn', type: 'tot', meaning: 'Tốt cho xây dựng' },
  { name: 'Quỷ', element: 'Kim', animal: 'Dương', type: 'xau', meaning: 'Đại hung, kỵ mọi việc' },
  { name: 'Liễu', element: 'Thổ', animal: 'Chương', type: 'xau', meaning: 'Kỵ cưới hỏi, mai táng' },
  { name: 'Tinh', element: 'Nhật', animal: 'Mã', type: 'xau', meaning: 'Kỵ xây dựng, động thổ' },
  { name: 'Trương', element: 'Nguyệt', animal: 'Lộc', type: 'tot', meaning: 'Tốt cho cưới hỏi, khai trương' },
  { name: 'Dực', element: 'Hỏa', animal: 'Xà', type: 'tot', meaning: 'Tốt cho xây dựng, nhập trạch' },
  { name: 'Chẩn', element: 'Thủy', animal: 'Dẫn', type: 'tot', meaning: 'Tốt cho cưới hỏi, an táng' }
];

// Giờ Hoàng Đạo theo Chi ngày
const HOANG_DAO_MAP = {
  '子': ['子', '丑', '卯', '午', '未', '酉'],
  '丑': ['寅', '卯', '巳', '申', '酉', '亥'],
  '寅': ['子', '丑', '辰', '巳', '未', '戌'],
  '卯': ['子', '寅', '卯', '午', '未', '酉'],
  '辰': ['丑', '辰', '巳', '未', '戌', '亥'],
  '巳': ['子', '寅', '辰', '巳', '申', '酉'],
  '午': ['子', '丑', '卯', '午', '未', '酉'],
  '未': ['寅', '卯', '巳', '申', '酉', '亥'],
  '申': ['子', '丑', '辰', '巳', '未', '戌'],
  '酉': ['子', '寅', '卯', '午', '未', '酉'],
  '戌': ['丑', '辰', '巳', '未', '戌', '亥'],
  '亥': ['子', '寅', '辰', '巳', '申', '酉']
};

// Thông tin 12 canh giờ
const GIO_INFO = [
  { chi: '子', name: 'Tý', start: 23, end: 1, period: '23:00 - 01:00' },
  { chi: '丑', name: 'Sửu', start: 1, end: 3, period: '01:00 - 03:00' },
  { chi: '寅', name: 'Dần', start: 3, end: 5, period: '03:00 - 05:00' },
  { chi: '卯', name: 'Mão', start: 5, end: 7, period: '05:00 - 07:00' },
  { chi: '辰', name: 'Thìn', start: 7, end: 9, period: '07:00 - 09:00' },
  { chi: '巳', name: 'Tỵ', start: 9, end: 11, period: '09:00 - 11:00' },
  { chi: '午', name: 'Ngọ', start: 11, end: 13, period: '11:00 - 13:00' },
  { chi: '未', name: 'Mùi', start: 13, end: 15, period: '13:00 - 15:00' },
  { chi: '申', name: 'Thân', start: 15, end: 17, period: '15:00 - 17:00' },
  { chi: '酉', name: 'Dậu', start: 17, end: 19, period: '17:00 - 19:00' },
  { chi: '戌', name: 'Tuất', start: 19, end: 21, period: '19:00 - 21:00' },
  { chi: '亥', name: 'Hợi', start: 21, end: 23, period: '21:00 - 23:00' }
];

class LunarCalendarEngine {
  /**
   * Lấy thông tin đầy đủ cho một ngày
   */
  getFullDayInfo(year, month, day) {
    const solar = Solar.fromYmd(year, month, day);
    const lunar = solar.getLunar();

    const dayChi = lunar.getDayZhi();
    const monthChi = lunar.getMonthZhi();

    return {
      // Dương lịch
      solar: {
        year: solar.getYear(),
        month: solar.getMonth(),
        day: solar.getDay(),
        weekDay: solar.getWeek(),
        weekDayName: this.getWeekDayName(solar.getWeek()),
        isWeekend: solar.getWeek() === 0 || solar.getWeek() === 6,
        isSunday: solar.getWeek() === 0,
        dateStr: this.formatSolarDate(solar.getYear(), solar.getMonth(), solar.getDay())
      },

      // Âm lịch
      lunar: {
        year: lunar.getYear(),
        month: lunar.getMonth(),
        day: lunar.getDay(),
        monthName: this.getLunarMonthName(lunar.getMonth()),
        dayName: this.getLunarDayName(lunar.getDay()),
        isLeapMonth: lunar.getMonth() < 0,
        yearNameChinese: lunar.getYearInChinese(),
        monthNameChinese: lunar.getMonthInChinese(),
        dayNameChinese: lunar.getDayInChinese(),
        isMungMot: lunar.getDay() === 1,
        isRam: lunar.getDay() === 15
      },

      // Can Chi
      canChi: {
        year: this.convertCanChi(lunar.getYearInGanZhi()),
        month: this.convertCanChi(lunar.getMonthInGanZhi()),
        day: this.convertCanChi(lunar.getDayInGanZhi()),
        yearChinese: lunar.getYearInGanZhi(),
        monthChinese: lunar.getMonthInGanZhi(),
        dayChinese: lunar.getDayInGanZhi(),
        yearCan: CAN_VIETNAMESE[lunar.getYearGan()] || lunar.getYearGan(),
        yearChi: CHI_VIETNAMESE[lunar.getYearZhi()] || lunar.getYearZhi(),
        dayCan: CAN_VIETNAMESE[lunar.getDayGan()] || lunar.getDayGan(),
        dayChi: CHI_VIETNAMESE[dayChi] || dayChi
      },

      // Con giáp
      zodiac: {
        year: this.getVietnameseZodiac(lunar.getYearZhi()),
        yearChinese: lunar.getYearShengXiao(),
        yearEmoji: CHI_EMOJIS[lunar.getYearZhi()] || '🔮'
      },

      // Ngũ hành Nạp Âm
      napAm: {
        year: lunar.getYearNaYin(),
        month: lunar.getMonthNaYin(),
        day: lunar.getDayNaYin()
      },

      // Tiết khí
      jieQi: {
        current: lunar.getJieQi(),
        currentInfo: this.getJieQiInfo(lunar.getJieQi()),
        next: lunar.getNextJieQi()?.getName() || null,
        prev: lunar.getPrevJieQi()?.getName() || null
      },

      // Ngày đặc biệt
      festivals: {
        solar: solar.getFestivals() || [],
        lunar: lunar.getFestivals() || [],
        other: lunar.getOtherFestivals() || []
      },

      // Trực (12 Trực)
      truc: this.getTruc(monthChi, dayChi),

      // Sao (28 Sao)
      sao: this.getSao(lunar),

      // Giờ Hoàng Đạo
      hoangDao: this.getHoangDaoHours(dayChi),

      // Ngày tốt xấu
      dayQuality: this.getDayQuality(lunar, monthChi, dayChi),

      // Việc nên làm / không nên làm
      activities: {
        good: lunar.getDayYi() || [],
        bad: lunar.getDayJi() || []
      },

      // Thần sát
      spirits: {
        good: lunar.getDayJiShen() || [],
        bad: lunar.getDayXiongSha() || []
      },

      // Xung khắc
      clash: {
        zodiac: this.getClashZodiac(dayChi),
        zodiacChinese: lunar.getDayChong(),
        evil: lunar.getDaySha(),
        evilDirection: this.getEvilDirection(lunar.getDaySha())
      },

      // Pha trăng
      moonPhase: this.getMoonPhase(lunar.getDay())
    };
  }

  /**
   * Chuyển Can Chi từ chữ Hán sang tiếng Việt
   */
  convertCanChi(ganZhi) {
    if (!ganZhi || ganZhi.length < 2) return ganZhi;
    const can = CAN_VIETNAMESE[ganZhi[0]] || ganZhi[0];
    const chi = CHI_VIETNAMESE[ganZhi[1]] || ganZhi[1];
    return `${can} ${chi}`;
  }

  /**
   * Tên thứ tiếng Việt
   */
  getWeekDayName(weekDay) {
    const names = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    return names[weekDay];
  }

  /**
   * Tên tháng Âm lịch tiếng Việt
   */
  getLunarMonthName(month) {
    const absMonth = Math.abs(month);
    const names = ['', 'Giêng', 'Hai', 'Ba', 'Tư', 'Năm', 'Sáu',
      'Bảy', 'Tám', 'Chín', 'Mười', 'Một', 'Chạp'];
    const prefix = month < 0 ? 'Nhuận ' : '';
    return prefix + 'Tháng ' + names[absMonth];
  }

  /**
   * Tên ngày Âm lịch tiếng Việt
   */
  getLunarDayName(day) {
    if (day === 1) return 'Mùng Một';
    if (day <= 10) return 'Mùng ' + this.numberToVietnamese(day);
    if (day <= 20) return this.numberToVietnamese(day);
    if (day === 21) return 'Hăm Mốt';
    if (day <= 29) return 'Hăm ' + this.numberToVietnamese(day - 20);
    return 'Ba Mươi';
  }

  /**
   * Chuyển số sang tiếng Việt
   */
  numberToVietnamese(num) {
    const ones = ['', 'Một', 'Hai', 'Ba', 'Bốn', 'Năm', 'Sáu', 'Bảy', 'Tám', 'Chín', 'Mười'];
    if (num <= 10) return ones[num];
    if (num < 20) return 'Mười ' + (num === 15 ? 'Lăm' : ones[num - 10]);
    const tens = Math.floor(num / 10);
    const unit = num % 10;
    let result = ones[tens] + ' Mươi';
    if (unit === 1) result += ' Mốt';
    else if (unit === 5) result += ' Lăm';
    else if (unit > 0) result += ' ' + ones[unit];
    return result;
  }

  /**
   * Lấy con giáp tiếng Việt
   */
  getVietnameseZodiac(chi) {
    const zodiacNames = {
      '子': 'Tý (Chuột)', '丑': 'Sửu (Trâu)', '寅': 'Dần (Hổ)', '卯': 'Mão (Mèo)',
      '辰': 'Thìn (Rồng)', '巳': 'Tỵ (Rắn)', '午': 'Ngọ (Ngựa)', '未': 'Mùi (Dê)',
      '申': 'Thân (Khỉ)', '酉': 'Dậu (Gà)', '戌': 'Tuất (Chó)', '亥': 'Hợi (Lợn)'
    };
    return zodiacNames[chi] || chi;
  }

  /**
   * Lấy 12 Trực trong ngày
   */
  getTruc(monthChi, dayChi) {
    const monthIdx = CHI_ORDER.indexOf(monthChi);
    const dayIdx = CHI_ORDER.indexOf(dayChi);

    if (monthIdx === -1 || dayIdx === -1) {
      return TRUC_LIST[0];
    }

    const trucIdx = (dayIdx - monthIdx + 12) % 12;
    return { ...TRUC_LIST[trucIdx], index: trucIdx };
  }

  /**
   * Lấy 28 Sao trong ngày
   */
  getSao(lunar) {
    // Tính index dựa trên ngày Julian
    const jd = this.getJulianDay(
      lunar.getSolar().getYear(),
      lunar.getSolar().getMonth(),
      lunar.getSolar().getDay()
    );
    const index = Math.floor(jd) % 28;
    return { ...SAO_LIST[index], index };
  }

  /**
   * Tính Julian Day Number
   */
  getJulianDay(year, month, day) {
    const a = Math.floor((14 - month) / 12);
    const y = year + 4800 - a;
    const m = month + 12 * a - 3;
    return day + Math.floor((153 * m + 2) / 5) + 365 * y +
      Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
  }

  /**
   * Lấy giờ Hoàng Đạo trong ngày
   */
  getHoangDaoHours(dayChi) {
    const hoangDaoChis = HOANG_DAO_MAP[dayChi] || [];

    return GIO_INFO.map(gio => ({
      ...gio,
      isHoangDao: hoangDaoChis.includes(gio.chi),
      type: hoangDaoChis.includes(gio.chi) ? 'hoangDao' : 'hacDao'
    }));
  }

  /**
   * Đánh giá chất lượng ngày
   */
  getDayQuality(lunar, monthChi, dayChi) {
    const truc = this.getTruc(monthChi, dayChi);
    const sao = this.getSao(lunar);
    const goodActivities = lunar.getDayYi() || [];
    const badActivities = lunar.getDayJi() || [];

    let score = 50;

    // Cộng điểm theo Trực
    if (truc.type === 'hoangDao') score += 25;
    else if (truc.type === 'hacDao') score -= 15;
    else score += 10;

    // Cộng điểm theo Sao
    if (sao.type === 'tot') score += 15;
    else score -= 10;

    // Cộng điểm theo số việc tốt
    score += Math.min(goodActivities.length * 2, 15);

    // Trừ điểm theo số việc xấu
    score -= Math.min(badActivities.length, 10);

    score = Math.max(0, Math.min(100, score));

    let label, color, emoji;
    if (score >= 85) {
      label = 'Đại Cát';
      color = 'gold';
      emoji = '⭐';
    } else if (score >= 70) {
      label = 'Tốt';
      color = 'green';
      emoji = '●';
    } else if (score >= 50) {
      label = 'Bình';
      color = 'blue';
      emoji = '○';
    } else {
      label = 'Xấu';
      color = 'red';
      emoji = '✗';
    }

    return { score, label, color, emoji };
  }

  /**
   * Lấy con giáp xung
   */
  getClashZodiac(dayChi) {
    const clashMap = {
      '子': 'Ngọ (Ngựa)', '丑': 'Mùi (Dê)', '寅': 'Thân (Khỉ)', '卯': 'Dậu (Gà)',
      '辰': 'Tuất (Chó)', '巳': 'Hợi (Lợn)', '午': 'Tý (Chuột)', '未': 'Sửu (Trâu)',
      '申': 'Dần (Hổ)', '酉': 'Mão (Mèo)', '戌': 'Thìn (Rồng)', '亥': 'Tỵ (Rắn)'
    };
    return clashMap[dayChi] || '';
  }

  /**
   * Lấy hướng Sát
   */
  getEvilDirection(sha) {
    const directionMap = {
      '东': 'Phương Đông', '南': 'Phương Nam',
      '西': 'Phương Tây', '北': 'Phương Bắc'
    };
    if (!sha) return '';
    for (const [key, value] of Object.entries(directionMap)) {
      if (sha.includes(key)) return value;
    }
    return sha;
  }

  /**
   * Lấy pha trăng
   */
  getMoonPhase(lunarDay) {
    if (lunarDay === 1) return { phase: 'newMoon', emoji: '🌑', name: 'Trăng non' };
    if (lunarDay <= 7) return { phase: 'waxingCrescent', emoji: '🌒', name: 'Trăng lưỡi liềm đầu tháng' };
    if (lunarDay === 8) return { phase: 'firstQuarter', emoji: '🌓', name: 'Bán nguyệt đầu tháng' };
    if (lunarDay <= 14) return { phase: 'waxingGibbous', emoji: '🌔', name: 'Trăng khuyết đầu' };
    if (lunarDay === 15) return { phase: 'fullMoon', emoji: '🌕', name: 'Trăng tròn (Rằm)' };
    if (lunarDay <= 22) return { phase: 'waningGibbous', emoji: '🌖', name: 'Trăng khuyết sau' };
    if (lunarDay === 23) return { phase: 'lastQuarter', emoji: '🌗', name: 'Bán nguyệt cuối tháng' };
    return { phase: 'waningCrescent', emoji: '🌘', name: 'Trăng lưỡi liềm cuối tháng' };
  }

  /**
   * Thông tin tiết khí
   */
  getJieQiInfo(jieQi) {
    if (!jieQi) return null;

    const jieQiData = {
      '立春': { name: 'Lập Xuân', meaning: 'Bắt đầu mùa xuân' },
      '雨水': { name: 'Vũ Thủy', meaning: 'Mưa xuân' },
      '惊蛰': { name: 'Kinh Trập', meaning: 'Sâu bọ thức giấc' },
      '春分': { name: 'Xuân Phân', meaning: 'Giữa xuân' },
      '清明': { name: 'Thanh Minh', meaning: 'Trời trong sáng' },
      '谷雨': { name: 'Cốc Vũ', meaning: 'Mưa cho lúa' },
      '立夏': { name: 'Lập Hạ', meaning: 'Bắt đầu mùa hè' },
      '小满': { name: 'Tiểu Mãn', meaning: 'Lúa bắt đầu chín' },
      '芒种': { name: 'Mang Chủng', meaning: 'Gieo hạt' },
      '夏至': { name: 'Hạ Chí', meaning: 'Giữa hè' },
      '小暑': { name: 'Tiểu Thử', meaning: 'Nóng nhẹ' },
      '大暑': { name: 'Đại Thử', meaning: 'Nóng nhiều' },
      '立秋': { name: 'Lập Thu', meaning: 'Bắt đầu mùa thu' },
      '处暑': { name: 'Xử Thử', meaning: 'Hết nóng' },
      '白露': { name: 'Bạch Lộ', meaning: 'Sương trắng' },
      '秋分': { name: 'Thu Phân', meaning: 'Giữa thu' },
      '寒露': { name: 'Hàn Lộ', meaning: 'Sương lạnh' },
      '霜降': { name: 'Sương Giáng', meaning: 'Sương muối' },
      '立冬': { name: 'Lập Đông', meaning: 'Bắt đầu mùa đông' },
      '小雪': { name: 'Tiểu Tuyết', meaning: 'Tuyết nhỏ' },
      '大雪': { name: 'Đại Tuyết', meaning: 'Tuyết lớn' },
      '冬至': { name: 'Đông Chí', meaning: 'Giữa đông' },
      '小寒': { name: 'Tiểu Hàn', meaning: 'Rét nhẹ' },
      '大寒': { name: 'Đại Hàn', meaning: 'Rét đậm' }
    };

    return jieQiData[jieQi] || { name: jieQi, meaning: '' };
  }

  /**
   * Format ngày dương lịch
   */
  formatSolarDate(year, month, day) {
    return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
  }

  /**
   * Lấy thông tin tháng
   */
  getMonthInfo(year, month) {
    const daysInMonth = new Date(year, month, 0).getDate();
    const firstDayWeekDay = new Date(year, month - 1, 1).getDay();

    // Lấy thông tin âm lịch cho ngày đầu và cuối tháng
    const firstDaySolar = Solar.fromYmd(year, month, 1);
    const lastDaySolar = Solar.fromYmd(year, month, daysInMonth);
    const firstDayLunar = firstDaySolar.getLunar();
    const lastDayLunar = lastDaySolar.getLunar();

    return {
      solarYear: year,
      solarMonth: month,
      daysInMonth,
      firstDayWeekDay,
      lunarInfo: {
        startMonth: Math.abs(firstDayLunar.getMonth()),
        startDay: firstDayLunar.getDay(),
        endMonth: Math.abs(lastDayLunar.getMonth()),
        endDay: lastDayLunar.getDay(),
        yearGanZhi: this.convertCanChi(firstDayLunar.getYearInGanZhi()),
        yearGanZhiChinese: firstDayLunar.getYearInGanZhi(),
        zodiac: this.getVietnameseZodiac(firstDayLunar.getYearZhi()),
        zodiacEmoji: CHI_EMOJIS[firstDayLunar.getYearZhi()] || '🔮'
      }
    };
  }

  /**
   * Lấy các ngày lễ trong tháng
   */
  getHolidaysInMonth(year, month) {
    const holidays = [];
    const daysInMonth = new Date(year, month, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      const solar = Solar.fromYmd(year, month, day);
      const lunar = solar.getLunar();

      const solarFestivals = solar.getFestivals() || [];
      const lunarFestivals = lunar.getFestivals() || [];
      const otherFestivals = lunar.getOtherFestivals() || [];

      const allFestivals = [...solarFestivals, ...lunarFestivals, ...otherFestivals];

      if (allFestivals.length > 0) {
        holidays.push({
          solarDay: day,
          lunarMonth: Math.abs(lunar.getMonth()),
          lunarDay: lunar.getDay(),
          festivals: allFestivals,
          solarFestivals,
          lunarFestivals,
          otherFestivals
        });
      }
    }

    return holidays;
  }

  /**
   * Lấy thông tin năm
   */
  getYearInfo(year) {
    const lunarYear = LunarYear.fromYear(year);
    const firstSolar = Solar.fromYmd(year, 1, 1);
    const firstLunar = firstSolar.getLunar();

    return {
      solarYear: year,
      ganZhi: this.convertCanChi(firstLunar.getYearInGanZhi()),
      ganZhiChinese: firstLunar.getYearInGanZhi(),
      zodiac: this.getVietnameseZodiac(firstLunar.getYearZhi()),
      zodiacEmoji: CHI_EMOJIS[firstLunar.getYearZhi()] || '🔮',
      napAm: firstLunar.getYearNaYin(),
      leapMonth: lunarYear.getLeapMonth(),
      months: lunarYear.getMonths().map(m => ({
        month: m.getMonth(),
        isLeap: m.isLeap(),
        days: m.getDayCount()
      }))
    };
  }

  /**
   * Chuyển đổi ngày dương sang âm
   */
  solarToLunar(year, month, day) {
    const solar = Solar.fromYmd(year, month, day);
    const lunar = solar.getLunar();
    return {
      year: lunar.getYear(),
      month: lunar.getMonth(),
      day: lunar.getDay(),
      isLeapMonth: lunar.getMonth() < 0
    };
  }

  /**
   * Chuyển đổi ngày âm sang dương
   */
  lunarToSolar(year, month, day, isLeapMonth = false) {
    const lunarMonth = isLeapMonth ? -Math.abs(month) : Math.abs(month);
    const lunar = Lunar.fromYmd(year, lunarMonth, day);
    const solar = lunar.getSolar();
    return {
      year: solar.getYear(),
      month: solar.getMonth(),
      day: solar.getDay()
    };
  }

  /**
   * Lấy thông tin hôm nay
   */
  getToday() {
    const now = new Date();
    return this.getFullDayInfo(now.getFullYear(), now.getMonth() + 1, now.getDate());
  }
}

// Export singleton instance
export const lunarEngine = new LunarCalendarEngine();
export default lunarEngine;
