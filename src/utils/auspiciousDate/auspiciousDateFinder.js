/**
 * Auspicious Date Finder
 * Tìm ngày tốt cho các sự kiện
 */

import { calculateTruc, evaluateDayForEvent, THAP_NHI_TRUC } from './hoangDao';
import { getSaoNgay, getSaoScore, evaluateSaoForEvent } from './saoNgay';
import { getGioHoangDao, getBestHours } from './gioHoangDao';
import { getZodiacFromYear } from '../compatibility/zodiacCompatibility';
import { LUC_XUNG, LUC_HAI } from '../compatibility/zodiacCompatibility';

// Các loại sự kiện
export const EVENT_TYPES = {
  'ket-hon': {
    id: 'ket-hon',
    name: 'Kết Hôn / Đính Hôn',
    icon: '💒',
    description: 'Ngày tốt cho hôn lễ, đính hôn',
    requiresTwoPeople: true
  },
  'khai-truong': {
    id: 'khai-truong',
    name: 'Khai Trương',
    icon: '🏪',
    description: 'Ngày tốt cho mở cửa hàng, kinh doanh',
    requiresTwoPeople: false
  },
  'dong-tho': {
    id: 'dong-tho',
    name: 'Động Thổ / Xây Nhà',
    icon: '🏗️',
    description: 'Ngày tốt cho khởi công, xây dựng',
    requiresTwoPeople: false
  },
  'nhap-trach': {
    id: 'nhap-trach',
    name: 'Nhập Trạch / Dọn Nhà',
    icon: '🏠',
    description: 'Ngày tốt cho dọn vào nhà mới',
    requiresTwoPeople: false
  },
  'xuat-hanh': {
    id: 'xuat-hanh',
    name: 'Xuất Hành',
    icon: '✈️',
    description: 'Ngày tốt cho du lịch, công tác',
    requiresTwoPeople: false
  },
  'ky-hop-dong': {
    id: 'ky-hop-dong',
    name: 'Ký Hợp Đồng',
    icon: '📝',
    description: 'Ngày tốt cho ký kết, giao dịch',
    requiresTwoPeople: false
  },
  'khai-nghiep': {
    id: 'khai-nghiep',
    name: 'Khởi Sự / Khai Nghiệp',
    icon: '🚀',
    description: 'Ngày tốt cho bắt đầu công việc mới',
    requiresTwoPeople: false
  }
};

// Địa Chi mapping
const DIA_CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

/**
 * Tính Can Chi của ngày từ Julian Day Number
 */
function getDayCanChi(date) {
  // Công thức đơn giản hóa
  const jd = getJulianDayNumber(date);
  const chiIndex = (jd + 1) % 12;
  return DIA_CHI[chiIndex];
}

/**
 * Tính Can Chi của tháng
 */
function getMonthChi(month) {
  // Tháng 1 = Dần, Tháng 2 = Mão, ...
  const chiIndex = (month + 1) % 12;
  return DIA_CHI[chiIndex];
}

/**
 * Tính Julian Day Number
 */
function getJulianDayNumber(date) {
  const d = date instanceof Date ? date : new Date(date);
  const y = d.getFullYear();
  const m = d.getMonth() + 1;
  const day = d.getDate();

  const a = Math.floor((14 - m) / 12);
  const y1 = y + 4800 - a;
  const m1 = m + 12 * a - 3;

  return day + Math.floor((153 * m1 + 2) / 5) + 365 * y1 + Math.floor(y1 / 4) - Math.floor(y1 / 100) + Math.floor(y1 / 400) - 32045;
}

/**
 * Kiểm tra xung tuổi
 */
function checkZodiacClash(dayChi, personZodiac) {
  for (const xung of LUC_XUNG) {
    if (xung.pair.includes(dayChi) && xung.pair.includes(personZodiac)) {
      return { clash: true, type: 'LUC_XUNG', meaning: xung.meaning };
    }
  }
  for (const hai of LUC_HAI) {
    if (hai.pair.includes(dayChi) && hai.pair.includes(personZodiac)) {
      return { clash: true, type: 'LUC_HAI', meaning: hai.meaning };
    }
  }
  return { clash: false };
}

/**
 * Main Auspicious Date Finder Class
 */
export class AuspiciousDateFinder {
  constructor(eventType, person1, person2 = null) {
    this.eventType = eventType;
    this.eventInfo = EVENT_TYPES[eventType] || EVENT_TYPES['khai-truong'];
    this.person1 = person1;
    this.person2 = person2;

    // Lấy con giáp từ năm sinh
    if (person1?.birthDate) {
      const year1 = new Date(person1.birthDate).getFullYear();
      this.person1.zodiac = getZodiacFromYear(year1);
    }

    if (person2?.birthDate) {
      const year2 = new Date(person2.birthDate).getFullYear();
      this.person2.zodiac = getZodiacFromYear(year2);
    }
  }

  /**
   * Tìm ngày tốt trong khoảng thời gian
   */
  findAuspiciousDates(startDate, endDate, limit = 10) {
    const candidates = [];
    let currentDate = new Date(startDate);
    const end = new Date(endDate);

    while (currentDate <= end) {
      const evaluation = this.evaluateDate(currentDate);

      if (evaluation.total >= 65) { // Chỉ lấy ngày từ 65 điểm trở lên
        candidates.push({
          date: new Date(currentDate),
          dateStr: this.formatDate(currentDate),
          weekday: this.getWeekday(currentDate),
          evaluation
        });
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Sắp xếp theo điểm số
    candidates.sort((a, b) => b.evaluation.total - a.evaluation.total);

    return candidates.slice(0, limit);
  }

  /**
   * Đánh giá một ngày cụ thể
   */
  evaluateDate(date) {
    const d = date instanceof Date ? date : new Date(date);

    const dayChi = getDayCanChi(d);
    const monthChi = getMonthChi(d.getMonth() + 1);

    // Tính Trực của ngày
    const truc = calculateTruc(monthChi, dayChi);
    const trucEval = evaluateDayForEvent(truc.name, this.getEventName());

    // Tính sao ngày
    const jd = getJulianDayNumber(d);
    const sao = getSaoNgay(jd);
    const saoScore = getSaoScore(sao);

    // Kiểm tra xung tuổi
    let zodiacScore1 = 100;
    let zodiacScore2 = 100;
    let zodiacWarnings = [];

    if (this.person1?.zodiac) {
      const clash1 = checkZodiacClash(dayChi, this.person1.zodiac);
      if (clash1.clash) {
        zodiacScore1 = clash1.type === 'LUC_XUNG' ? 30 : 50;
        zodiacWarnings.push(`Ngày xung với tuổi ${this.person1.zodiac} (${clash1.meaning})`);
      }
    }

    if (this.person2?.zodiac) {
      const clash2 = checkZodiacClash(dayChi, this.person2.zodiac);
      if (clash2.clash) {
        zodiacScore2 = clash2.type === 'LUC_XUNG' ? 30 : 50;
        zodiacWarnings.push(`Ngày xung với tuổi ${this.person2.zodiac} (${clash2.meaning})`);
      }
    }

    // Tính điểm tổng
    const weights = {
      truc: 0.35,
      sao: 0.20,
      zodiac1: 0.25,
      zodiac2: this.person2 ? 0.20 : 0
    };

    // Điều chỉnh weights nếu không có person2
    if (!this.person2) {
      weights.truc = 0.40;
      weights.sao = 0.25;
      weights.zodiac1 = 0.35;
    }

    const total = Math.round(
      trucEval.score * weights.truc +
      saoScore * weights.sao +
      zodiacScore1 * weights.zodiac1 +
      zodiacScore2 * weights.zodiac2
    );

    // Lấy giờ tốt
    const bestHours = getBestHours(dayChi, 3);

    return {
      total,
      dayChi,
      truc: {
        name: truc.name,
        type: truc.type,
        score: trucEval.score,
        suitable: trucEval.suitable,
        reason: trucEval.reason
      },
      sao: {
        name: sao?.name || 'N/A',
        score: saoScore,
        type: sao?.type
      },
      zodiac: {
        score1: zodiacScore1,
        score2: zodiacScore2,
        warnings: zodiacWarnings
      },
      bestHours,
      category: this.getCategory(total)
    };
  }

  /**
   * Lấy tên sự kiện để đánh giá
   */
  getEventName() {
    const eventNames = {
      'ket-hon': 'Kết hôn',
      'khai-truong': 'Khai trương',
      'dong-tho': 'Động thổ',
      'nhap-trach': 'Nhập trạch',
      'xuat-hanh': 'Xuất hành',
      'ky-hop-dong': 'Ký hợp đồng',
      'khai-nghiep': 'Khai trương'
    };
    return eventNames[this.eventType] || 'Khai trương';
  }

  /**
   * Lấy category dựa trên điểm
   */
  getCategory(score) {
    if (score >= 90) return { level: 'excellent', label: 'Đại Cát', color: '#FFD700', emoji: '⭐' };
    if (score >= 75) return { level: 'good', label: 'Ngày Tốt', color: '#90EE90', emoji: '●' };
    if (score >= 65) return { level: 'fair', label: 'Khá Tốt', color: '#87CEEB', emoji: '○' };
    return { level: 'neutral', label: 'Bình Thường', color: '#DDA0DD', emoji: '○' };
  }

  /**
   * Format ngày
   */
  formatDate(date) {
    const d = date instanceof Date ? date : new Date(date);
    return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
  }

  /**
   * Lấy thứ trong tuần
   */
  getWeekday(date) {
    const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    const d = date instanceof Date ? date : new Date(date);
    return days[d.getDay()];
  }

  /**
   * Lấy chi tiết đầy đủ của một ngày
   */
  getDateDetails(date) {
    const evaluation = this.evaluateDate(date);
    const d = date instanceof Date ? date : new Date(date);

    // Lấy tất cả giờ trong ngày
    const allHours = getGioHoangDao(evaluation.dayChi);

    // Lấy thông tin sao tốt/xấu cho sự kiện
    const saoInfo = evaluateSaoForEvent(this.eventType);

    return {
      date: d,
      dateStr: this.formatDate(d),
      weekday: this.getWeekday(d),
      evaluation,
      allHours,
      saoInfo,
      eventInfo: this.eventInfo,
      person1: this.person1,
      person2: this.person2
    };
  }
}

/**
 * Quick date check
 */
export function quickDateCheck(date, eventType) {
  const finder = new AuspiciousDateFinder(eventType, null, null);
  return finder.evaluateDate(date);
}

export default {
  AuspiciousDateFinder,
  EVENT_TYPES,
  quickDateCheck
};
