/**
 * Master Numerology Calculator
 * Calculates 20+ numerology numbers with full analysis
 */

import {
  normalizeVietnamese,
  getLetterValue,
  isVowel,
  isConsonant,
  reduceToSingleDigit,
  calculateNameTotal,
  parseVietnameseName,
  getLetterBreakdown
} from './vietnameseNameAdapter';

/**
 * Main Numerology Calculator Class
 */
export class NumerologyCalculator {
  constructor(fullName, birthDate) {
    this.fullName = fullName.trim();
    this.birthDate = birthDate; // Format: YYYY-MM-DD or Date object
    this.parsedName = parseVietnameseName(this.fullName);
    this.parsedDate = this.parseDate(birthDate);

    // Cache for calculated values
    this._cache = {};
  }

  parseDate(date) {
    if (date instanceof Date) {
      return {
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear()
      };
    }
    const [year, month, day] = date.split('-').map(Number);
    return { day, month, year };
  }

  // ============ 6 CORE NUMBERS ============

  /**
   * Life Path Number - Số Đường Đời
   * From birthdate - most important number
   */
  get lifePath() {
    if (this._cache.lifePath) return this._cache.lifePath;

    const { day, month, year } = this.parsedDate;

    // Reduce each component first
    const dayReduced = reduceToSingleDigit(day, true);
    const monthReduced = reduceToSingleDigit(month, true);
    const yearReduced = reduceToSingleDigit(
      String(year).split('').reduce((sum, d) => sum + parseInt(d), 0),
      true
    );

    // Sum and reduce
    const total = dayReduced + monthReduced + yearReduced;
    const result = reduceToSingleDigit(total, true);

    this._cache.lifePath = {
      value: result,
      breakdown: { day: dayReduced, month: monthReduced, year: yearReduced, total },
      calculation: `${day}/${month}/${year} → ${dayReduced} + ${monthReduced} + ${yearReduced} = ${total} → ${result}`
    };

    return this._cache.lifePath;
  }

  /**
   * Expression Number - Số Biểu Đạt
   * From full name - natural talents and abilities
   */
  get expression() {
    if (this._cache.expression) return this._cache.expression;

    const { total, breakdown } = calculateNameTotal(this.fullName);
    const result = reduceToSingleDigit(total, true);

    this._cache.expression = {
      value: result,
      total,
      breakdown,
      calculation: `Tổng tên: ${total} → ${result}`
    };

    return this._cache.expression;
  }

  /**
   * Soul Urge Number - Số Linh Hồn
   * From vowels - inner desires and motivations
   */
  get soulUrge() {
    if (this._cache.soulUrge) return this._cache.soulUrge;

    const { total, breakdown } = calculateNameTotal(
      this.fullName,
      (char, name, index) => isVowel(char, name, index)
    );
    const result = reduceToSingleDigit(total, true);

    this._cache.soulUrge = {
      value: result,
      total,
      breakdown,
      calculation: `Nguyên âm: ${total} → ${result}`
    };

    return this._cache.soulUrge;
  }

  /**
   * Personality Number - Số Nhân Cách
   * From consonants - outer personality
   */
  get personality() {
    if (this._cache.personality) return this._cache.personality;

    const { total, breakdown } = calculateNameTotal(
      this.fullName,
      (char, name, index) => isConsonant(char, name, index)
    );
    const result = reduceToSingleDigit(total, true);

    this._cache.personality = {
      value: result,
      total,
      breakdown,
      calculation: `Phụ âm: ${total} → ${result}`
    };

    return this._cache.personality;
  }

  /**
   * Birthday Number - Số Ngày Sinh
   * Just the day - special talents
   */
  get birthday() {
    if (this._cache.birthday) return this._cache.birthday;

    const { day } = this.parsedDate;
    const result = reduceToSingleDigit(day, true);

    this._cache.birthday = {
      value: result,
      original: day,
      calculation: `Ngày sinh: ${day} → ${result}`
    };

    return this._cache.birthday;
  }

  /**
   * Maturity Number - Số Trưởng Thành
   * Life Path + Expression - goals after 35-40
   */
  get maturity() {
    if (this._cache.maturity) return this._cache.maturity;

    const lp = this.lifePath.value;
    const ex = this.expression.value;
    const total = lp + ex;
    const result = reduceToSingleDigit(total, true);

    this._cache.maturity = {
      value: result,
      lifePath: lp,
      expression: ex,
      total,
      calculation: `Đường đời (${lp}) + Biểu đạt (${ex}) = ${total} → ${result}`
    };

    return this._cache.maturity;
  }

  // ============ 6 HIDDEN NUMBERS ============

  /**
   * Karmic Debt Numbers
   * Special numbers: 13, 14, 16, 19
   */
  get karmicDebt() {
    if (this._cache.karmicDebt) return this._cache.karmicDebt;

    const karmicNumbers = [13, 14, 16, 19];
    const found = [];

    // Check Life Path calculation
    const { day, month, year } = this.parsedDate;
    const dateSum = day + month + String(year).split('').reduce((sum, d) => sum + parseInt(d), 0);
    if (karmicNumbers.includes(dateSum)) {
      found.push({ number: dateSum, source: 'Đường Đời' });
    }

    // Check Expression calculation
    const nameSum = this.expression.total;
    if (karmicNumbers.includes(nameSum)) {
      found.push({ number: nameSum, source: 'Biểu Đạt' });
    }

    // Check day
    if (karmicNumbers.includes(day)) {
      found.push({ number: day, source: 'Ngày Sinh' });
    }

    this._cache.karmicDebt = {
      hasDebt: found.length > 0,
      debts: found,
      meanings: {
        13: 'Nợ nghiệp lười biếng - cần chăm chỉ',
        14: 'Nợ nghiệp lạm dụng tự do - cần kỷ luật',
        16: 'Nợ nghiệp ego - cần khiêm tốn',
        19: 'Nợ nghiệp quyền lực - cần phục vụ'
      }
    };

    return this._cache.karmicDebt;
  }

  /**
   * Karmic Lesson Numbers
   * Missing numbers in name (1-9)
   */
  get karmicLessons() {
    if (this._cache.karmicLessons) return this._cache.karmicLessons;

    const breakdown = getLetterBreakdown(this.fullName);
    const presentNumbers = new Set(breakdown.map(l => l.value));
    const missing = [];

    for (let i = 1; i <= 9; i++) {
      if (!presentNumbers.has(i)) {
        missing.push(i);
      }
    }

    this._cache.karmicLessons = {
      missingNumbers: missing,
      hasMissing: missing.length > 0,
      count: missing.length
    };

    return this._cache.karmicLessons;
  }

  /**
   * Hidden Passion Number
   * Most repeated number in name
   */
  get hiddenPassion() {
    if (this._cache.hiddenPassion) return this._cache.hiddenPassion;

    const breakdown = getLetterBreakdown(this.fullName);
    const counts = {};

    breakdown.forEach(l => {
      counts[l.value] = (counts[l.value] || 0) + 1;
    });

    let maxCount = 0;
    let passionNumbers = [];

    Object.entries(counts).forEach(([num, count]) => {
      if (count > maxCount) {
        maxCount = count;
        passionNumbers = [parseInt(num)];
      } else if (count === maxCount) {
        passionNumbers.push(parseInt(num));
      }
    });

    this._cache.hiddenPassion = {
      values: passionNumbers,
      count: maxCount,
      distribution: counts
    };

    return this._cache.hiddenPassion;
  }

  /**
   * Subconscious Self Number
   * 9 minus karmic lessons count
   */
  get subconsciousSelf() {
    if (this._cache.subconsciousSelf) return this._cache.subconsciousSelf;

    const karmicCount = this.karmicLessons.count;
    const value = 9 - karmicCount;

    this._cache.subconsciousSelf = {
      value,
      karmicLessonsCount: karmicCount,
      calculation: `9 - ${karmicCount} bài học = ${value}`
    };

    return this._cache.subconsciousSelf;
  }

  /**
   * Balance Number
   * First letters of each name part
   */
  get balance() {
    if (this._cache.balance) return this._cache.balance;

    const parts = this.fullName.split(/\s+/);
    const firstLetters = parts.map(p => p[0]);
    const values = firstLetters.map(l => getLetterValue(l));
    const total = values.reduce((sum, v) => sum + v, 0);
    const result = reduceToSingleDigit(total, false);

    this._cache.balance = {
      value: result,
      firstLetters,
      values,
      total,
      calculation: firstLetters.map((l, i) => `${l}(${values[i]})`).join(' + ') + ` = ${total} → ${result}`
    };

    return this._cache.balance;
  }

  /**
   * Rational Thought Number
   * First name + birthday
   */
  get rationalThought() {
    if (this._cache.rationalThought) return this._cache.rationalThought;

    const firstName = this.parsedName.ten || this.fullName.split(/\s+/)[0];
    const { total: nameTotal } = calculateNameTotal(firstName);
    const dayTotal = this.parsedDate.day;

    const total = nameTotal + dayTotal;
    const result = reduceToSingleDigit(total, false);

    this._cache.rationalThought = {
      value: result,
      firstName,
      nameTotal,
      dayTotal,
      total,
      calculation: `Tên (${nameTotal}) + Ngày (${dayTotal}) = ${total} → ${result}`
    };

    return this._cache.rationalThought;
  }

  // ============ CYCLE NUMBERS ============

  /**
   * Life Cycles (3 major periods)
   */
  get lifeCycles() {
    if (this._cache.lifeCycles) return this._cache.lifeCycles;

    const { day, month, year } = this.parsedDate;
    const lp = this.lifePath.value;

    // First cycle ends at 36 - Life Path
    // Second cycle ends at 36 + 9 = 45 to 54
    // Third cycle until end

    const firstCycleEnd = 36 - lp;
    const secondCycleEnd = firstCycleEnd + 27;

    const cycles = [
      {
        name: 'Chu kỳ 1 - Hình thành',
        value: reduceToSingleDigit(month, true),
        source: 'Tháng sinh',
        ageRange: `0 - ${firstCycleEnd}`
      },
      {
        name: 'Chu kỳ 2 - Năng suất',
        value: reduceToSingleDigit(day, true),
        source: 'Ngày sinh',
        ageRange: `${firstCycleEnd + 1} - ${secondCycleEnd}`
      },
      {
        name: 'Chu kỳ 3 - Thu hoạch',
        value: reduceToSingleDigit(
          String(year).split('').reduce((sum, d) => sum + parseInt(d), 0),
          true
        ),
        source: 'Năm sinh',
        ageRange: `${secondCycleEnd + 1}+`
      }
    ];

    this._cache.lifeCycles = { cycles, firstCycleEnd, secondCycleEnd };
    return this._cache.lifeCycles;
  }

  /**
   * Pinnacles (4 major life peaks)
   */
  get pinnacles() {
    if (this._cache.pinnacles) return this._cache.pinnacles;

    const { day, month, year } = this.parsedDate;
    const lp = this.lifePath.value;

    const dayVal = reduceToSingleDigit(day, true);
    const monthVal = reduceToSingleDigit(month, true);
    const yearVal = reduceToSingleDigit(
      String(year).split('').reduce((sum, d) => sum + parseInt(d), 0),
      true
    );

    const firstEnd = 36 - lp;

    const pinnacles = [
      {
        name: 'Đỉnh cao 1',
        value: reduceToSingleDigit(monthVal + dayVal, true),
        calculation: `${monthVal} + ${dayVal}`,
        ageRange: `0 - ${firstEnd}`
      },
      {
        name: 'Đỉnh cao 2',
        value: reduceToSingleDigit(dayVal + yearVal, true),
        calculation: `${dayVal} + ${yearVal}`,
        ageRange: `${firstEnd + 1} - ${firstEnd + 9}`
      },
      {
        name: 'Đỉnh cao 3',
        value: reduceToSingleDigit(
          reduceToSingleDigit(monthVal + dayVal, true) + reduceToSingleDigit(dayVal + yearVal, true),
          true
        ),
        calculation: 'Đỉnh 1 + Đỉnh 2',
        ageRange: `${firstEnd + 10} - ${firstEnd + 18}`
      },
      {
        name: 'Đỉnh cao 4',
        value: reduceToSingleDigit(monthVal + yearVal, true),
        calculation: `${monthVal} + ${yearVal}`,
        ageRange: `${firstEnd + 19}+`
      }
    ];

    this._cache.pinnacles = { pinnacles, firstEnd };
    return this._cache.pinnacles;
  }

  /**
   * Challenges (4 life challenges)
   */
  get challenges() {
    if (this._cache.challenges) return this._cache.challenges;

    const { day, month, year } = this.parsedDate;

    const dayVal = reduceToSingleDigit(day, false);
    const monthVal = reduceToSingleDigit(month, false);
    const yearVal = reduceToSingleDigit(
      String(year).split('').reduce((sum, d) => sum + parseInt(d), 0),
      false
    );

    const first = Math.abs(monthVal - dayVal);
    const second = Math.abs(dayVal - yearVal);
    const third = Math.abs(first - second);
    const fourth = Math.abs(monthVal - yearVal);

    this._cache.challenges = {
      challenges: [
        { name: 'Thử thách 1', value: first, calculation: `|${monthVal} - ${dayVal}|` },
        { name: 'Thử thách 2', value: second, calculation: `|${dayVal} - ${yearVal}|` },
        { name: 'Thử thách 3', value: third, calculation: `|${first} - ${second}|` },
        { name: 'Thử thách 4', value: fourth, calculation: `|${monthVal} - ${yearVal}|` }
      ]
    };

    return this._cache.challenges;
  }

  /**
   * Personal Year Number
   */
  getPersonalYear(targetYear = new Date().getFullYear()) {
    const { day, month } = this.parsedDate;
    const yearSum = String(targetYear).split('').reduce((sum, d) => sum + parseInt(d), 0);
    const total = day + month + yearSum;
    return {
      year: targetYear,
      value: reduceToSingleDigit(total, false),
      calculation: `${day} + ${month} + ${yearSum} = ${total}`
    };
  }

  /**
   * Personal Month Number
   */
  getPersonalMonth(targetYear = new Date().getFullYear(), targetMonth = new Date().getMonth() + 1) {
    const py = this.getPersonalYear(targetYear);
    const total = py.value + targetMonth;
    return {
      year: targetYear,
      month: targetMonth,
      value: reduceToSingleDigit(total, false),
      personalYear: py.value,
      calculation: `Năm cá nhân (${py.value}) + Tháng (${targetMonth}) = ${total}`
    };
  }

  /**
   * Personal Day Number
   */
  getPersonalDay(date = new Date()) {
    const d = date instanceof Date ? date : new Date(date);
    const pm = this.getPersonalMonth(d.getFullYear(), d.getMonth() + 1);
    const day = d.getDate();
    const total = pm.value + day;
    return {
      date: d,
      value: reduceToSingleDigit(total, false),
      personalMonth: pm.value,
      calculation: `Tháng cá nhân (${pm.value}) + Ngày (${day}) = ${total}`
    };
  }

  // ============ CHART DATA ============

  /**
   * Inclusion Chart (Lo Shu Grid / 3x3)
   */
  get inclusionChart() {
    if (this._cache.inclusionChart) return this._cache.inclusionChart;

    const breakdown = getLetterBreakdown(this.fullName);
    const grid = {
      1: 0, 2: 0, 3: 0,
      4: 0, 5: 0, 6: 0,
      7: 0, 8: 0, 9: 0
    };

    breakdown.forEach(l => {
      if (grid.hasOwnProperty(l.value)) {
        grid[l.value]++;
      }
    });

    // Add birthday numbers
    const { day, month, year } = this.parsedDate;
    const dateDigits = `${day}${month}${year}`.split('').map(Number);
    dateDigits.forEach(d => {
      if (d > 0 && d <= 9) {
        grid[d]++;
      }
    });

    // Detect arrows
    const arrows = this.detectArrows(grid);

    this._cache.inclusionChart = {
      grid,
      arrows,
      totalNumbers: breakdown.length + dateDigits.filter(d => d > 0).length
    };

    return this._cache.inclusionChart;
  }

  /**
   * Detect arrows in inclusion chart
   */
  detectArrows(grid) {
    const arrows = {
      strength: [],
      weakness: []
    };

    // Row arrows
    const rows = [
      { positions: [3, 6, 9], name: 'Trí tuệ' },      // Mental
      { positions: [2, 5, 8], name: 'Cảm xúc' },      // Emotional
      { positions: [1, 4, 7], name: 'Thực tế' }       // Physical
    ];

    // Column arrows
    const cols = [
      { positions: [1, 2, 3], name: 'Tư duy' },       // Thought
      { positions: [4, 5, 6], name: 'Ý chí' },        // Will
      { positions: [7, 8, 9], name: 'Hành động' }     // Action
    ];

    // Diagonal arrows
    const diags = [
      { positions: [3, 5, 7], name: 'Nhạy bén' },     // 3-5-7
      { positions: [1, 5, 9], name: 'Quyết tâm' }     // 1-5-9
    ];

    const allLines = [...rows, ...cols, ...diags];

    allLines.forEach(line => {
      const hasAll = line.positions.every(p => grid[p] > 0);
      const hasNone = line.positions.every(p => grid[p] === 0);

      if (hasAll) {
        arrows.strength.push({ ...line, type: 'strength' });
      }
      if (hasNone) {
        arrows.weakness.push({ ...line, type: 'weakness' });
      }
    });

    return arrows;
  }

  // ============ FULL REPORT ============

  /**
   * Get complete numerology profile
   */
  getFullProfile() {
    return {
      // Input data
      input: {
        fullName: this.fullName,
        parsedName: this.parsedName,
        birthDate: this.birthDate,
        parsedDate: this.parsedDate
      },

      // 6 Core Numbers
      coreNumbers: {
        lifePath: this.lifePath,
        expression: this.expression,
        soulUrge: this.soulUrge,
        personality: this.personality,
        birthday: this.birthday,
        maturity: this.maturity
      },

      // Hidden Numbers
      hiddenNumbers: {
        karmicDebt: this.karmicDebt,
        karmicLessons: this.karmicLessons,
        hiddenPassion: this.hiddenPassion,
        subconsciousSelf: this.subconsciousSelf,
        balance: this.balance,
        rationalThought: this.rationalThought
      },

      // Cycles
      cycles: {
        lifeCycles: this.lifeCycles,
        pinnacles: this.pinnacles,
        challenges: this.challenges,
        personalYear: this.getPersonalYear(),
        personalMonth: this.getPersonalMonth()
      },

      // Charts
      charts: {
        inclusion: this.inclusionChart
      },

      // Letter breakdown
      letterBreakdown: getLetterBreakdown(this.fullName)
    };
  }
}

/**
 * Quick calculation functions
 */
export function calculateLifePath(birthDate) {
  const calc = new NumerologyCalculator('A', birthDate);
  return calc.lifePath;
}

export function calculateExpression(fullName) {
  const calc = new NumerologyCalculator(fullName, '2000-01-01');
  return calc.expression;
}

export function calculateAllFromInput(fullName, birthDate) {
  const calc = new NumerologyCalculator(fullName, birthDate);
  return calc.getFullProfile();
}

export default NumerologyCalculator;
