/**
 * AI Prompts for Deep Numerology Analysis
 * Templates for GPT-4o analysis of numerology profiles
 */

/**
 * Generate comprehensive numerology analysis prompt
 */
export function generateNumerologyAnalysisPrompt(profile, language = 'vi') {
  const {
    input,
    coreNumbers,
    hiddenNumbers,
    cycles,
    charts
  } = profile;

  const prompt = `
Bạn là một chuyên gia Thần Số Học (Numerology) với hơn 30 năm kinh nghiệm, kết hợp kiến thức phương Tây và phương Đông. Hãy phân tích chi tiết hồ sơ số học sau đây.

## THÔNG TIN CÁ NHÂN
- Họ tên: ${input.fullName}
- Ngày sinh: ${input.parsedDate.day}/${input.parsedDate.month}/${input.parsedDate.year}

## 6 SỐ CỐT LÕI

### 1. Số Đường Đời (Life Path): ${coreNumbers.lifePath.value}
Công thức: ${coreNumbers.lifePath.calculation}

### 2. Số Biểu Đạt (Expression): ${coreNumbers.expression.value}
Tổng từ tên: ${coreNumbers.expression.total}

### 3. Số Linh Hồn (Soul Urge): ${coreNumbers.soulUrge.value}
Từ nguyên âm: ${coreNumbers.soulUrge.total}

### 4. Số Nhân Cách (Personality): ${coreNumbers.personality.value}
Từ phụ âm: ${coreNumbers.personality.total}

### 5. Số Ngày Sinh (Birthday): ${coreNumbers.birthday.value}
Ngày gốc: ${coreNumbers.birthday.original}

### 6. Số Trưởng Thành (Maturity): ${coreNumbers.maturity.value}
Công thức: ${coreNumbers.maturity.calculation}

## SỐ ẨN

### Nợ Nghiệp (Karmic Debt)
${hiddenNumbers.karmicDebt.hasDebt
  ? `Có nợ nghiệp: ${hiddenNumbers.karmicDebt.debts.map(d => `${d.number} (${d.source})`).join(', ')}`
  : 'Không có nợ nghiệp'}

### Bài Học Nghiệp (Karmic Lessons)
${hiddenNumbers.karmicLessons.hasMissing
  ? `Số thiếu trong tên: ${hiddenNumbers.karmicLessons.missingNumbers.join(', ')}`
  : 'Không thiếu số nào'}

### Đam Mê Ẩn (Hidden Passion): ${hiddenNumbers.hiddenPassion.values.join(', ')}
Xuất hiện ${hiddenNumbers.hiddenPassion.count} lần

### Tiềm Thức (Subconscious Self): ${hiddenNumbers.subconsciousSelf.value}

### Số Cân Bằng (Balance): ${hiddenNumbers.balance.value}

### Tư Duy Logic (Rational Thought): ${hiddenNumbers.rationalThought.value}

## CHU KỲ & ĐỈNH CAO

### Chu Kỳ Đời
${cycles.lifeCycles.cycles.map(c => `- ${c.name}: Số ${c.value} (Tuổi ${c.ageRange})`).join('\n')}

### 4 Đỉnh Cao (Pinnacles)
${cycles.pinnacles.pinnacles.map(p => `- ${p.name}: Số ${p.value} (Tuổi ${p.ageRange})`).join('\n')}

### 4 Thử Thách (Challenges)
${cycles.challenges.challenges.map(c => `- ${c.name}: Số ${c.value}`).join('\n')}

### Năm Cá Nhân Hiện Tại: ${cycles.personalYear.value}

## BIỂU ĐỒ BAO GỒM (Inclusion Chart)
Phân bố số: ${Object.entries(charts.inclusion.grid).map(([num, count]) => `${num}:${count}`).join(', ')}

${charts.inclusion.arrows.strength.length > 0
  ? `Mũi tên mạnh: ${charts.inclusion.arrows.strength.map(a => a.name).join(', ')}`
  : 'Không có mũi tên mạnh'}

${charts.inclusion.arrows.weakness.length > 0
  ? `Mũi tên yếu: ${charts.inclusion.arrows.weakness.map(a => a.name).join(', ')}`
  : 'Không có mũi tên yếu'}

---

## YÊU CẦU PHÂN TÍCH

Hãy viết bài phân tích sâu (khoảng 1500-2000 từ) với cấu trúc sau:

### 1. TỔNG QUAN VỀ BẠN (200 từ)
- Bức tranh tổng thể về con người này
- Sứ mệnh cuộc đời theo số Đường Đời
- Điểm đặc biệt nhất trong hồ sơ

### 2. ĐIỂM MẠNH & TÀI NĂNG (300 từ)
- Phân tích các số mạnh
- Tài năng bẩm sinh từ số Biểu Đạt
- Động lực sâu xa từ số Linh Hồn
- Ấn tượng ban đầu từ số Nhân Cách

### 3. THÁCH THỨC & BÀI HỌC (300 từ)
- Nợ nghiệp cần trả (nếu có)
- Bài học nghiệp từ số thiếu
- Các thử thách trong đời
- Cách vượt qua

### 4. SỰ NGHIỆP & TÀI CHÍNH (250 từ)
- Ngành nghề phù hợp
- Phong cách làm việc
- Tiềm năng tài chính
- Lời khuyên phát triển

### 5. TÌNH CẢM & GIA ĐÌNH (250 từ)
- Đặc điểm trong tình yêu
- Đối tác phù hợp
- Vai trò trong gia đình
- Thử thách cần vượt qua

### 6. SỨC KHỎE & TINH THẦN (150 từ)
- Điểm cần chú ý về sức khỏe
- Phương pháp cân bằng
- Hoạt động phù hợp

### 7. DỰ BÁO GIAI ĐOẠN HIỆN TẠI (200 từ)
- Phân tích Đỉnh cao hiện tại
- Năm cá nhân ${cycles.personalYear.value} mang năng lượng gì
- Cơ hội và thách thức trong năm

### 8. LỜI KHUYÊN VÀNG (150 từ)
- 3-5 lời khuyên quan trọng nhất
- Hướng phát triển tối ưu
- Câu mantra phù hợp với người này

---

Hãy viết với giọng văn:
- Chuyên nghiệp nhưng ấm áp
- Khích lệ và tích cực
- Cụ thể, không chung chung
- Có ví dụ và minh họa thực tế
- Sử dụng ngôn ngữ tiếng Việt tự nhiên, không dịch máy

Bắt đầu phân tích:
`;

  return prompt;
}

/**
 * Generate career-focused analysis prompt
 */
export function generateCareerAnalysisPrompt(profile) {
  const { coreNumbers, hiddenNumbers } = profile;

  return `
Bạn là chuyên gia tư vấn nghề nghiệp kết hợp Thần Số Học. Phân tích chi tiết về sự nghiệp:

Số Đường Đời: ${coreNumbers.lifePath.value}
Số Biểu Đạt: ${coreNumbers.expression.value}
Số Ngày Sinh: ${coreNumbers.birthday.value}
Đam Mê Ẩn: ${hiddenNumbers.hiddenPassion.values.join(', ')}

Hãy phân tích (800 từ):

1. **NĂNG LỰC CỐT LÕI**
- Tài năng bẩm sinh
- Kỹ năng nổi bật
- Điểm khác biệt

2. **NGÀNH NGHỀ PHÙ HỢP**
- Top 5 ngành nghề lý tưởng
- Lý do phù hợp
- Công việc nên tránh

3. **PHONG CÁCH LÀM VIỆC**
- Môi trường lý tưởng
- Vai trò phù hợp (lãnh đạo/chuyên gia/hỗ trợ)
- Cách làm việc hiệu quả

4. **LỘ TRÌNH PHÁT TRIỂN**
- Giai đoạn 20-30 tuổi
- Giai đoạn 30-40 tuổi
- Giai đoạn 40+ tuổi

5. **LỜI KHUYÊN SỰ NGHIỆP**
- 5 điều nên làm
- 3 điều nên tránh
- Kỹ năng cần phát triển
`;
}

/**
 * Generate relationship compatibility prompt
 */
export function generateCompatibilityPrompt(profile1, profile2) {
  return `
Bạn là chuyên gia phân tích tương hợp Thần Số Học. So sánh hai hồ sơ:

**NGƯỜI 1:**
- Số Đường Đời: ${profile1.coreNumbers.lifePath.value}
- Số Linh Hồn: ${profile1.coreNumbers.soulUrge.value}
- Số Nhân Cách: ${profile1.coreNumbers.personality.value}

**NGƯỜI 2:**
- Số Đường Đời: ${profile2.coreNumbers.lifePath.value}
- Số Linh Hồn: ${profile2.coreNumbers.soulUrge.value}
- Số Nhân Cách: ${profile2.coreNumbers.personality.value}

Phân tích (600 từ):

1. **CHỈ SỐ TƯƠNG HỢP TỔNG THỂ** (0-100%)
- Điểm số và giải thích

2. **ĐIỂM HÒA HỢP**
- Những điểm chung
- Bổ sung cho nhau như thế nào

3. **THÁCH THỨC**
- Xung đột tiềm ẩn
- Cách giải quyết

4. **LỜI KHUYÊN CHO MỐI QUAN HỆ**
- 5 điều nên làm
- 3 điều nên tránh
`;
}

/**
 * Generate yearly forecast prompt
 */
export function generateYearForecastPrompt(profile, year) {
  const personalYear = profile.cycles.personalYear;

  return `
Bạn là chuyên gia dự báo Thần Số Học. Phân tích chi tiết năm ${year}:

**HỒ SƠ CƠ BẢN:**
- Số Đường Đời: ${profile.coreNumbers.lifePath.value}
- Năm Cá Nhân ${year}: ${personalYear.value}

**YÊU CẦU:** Viết dự báo chi tiết (1000 từ) cho năm ${year}:

1. **TỔNG QUAN NĂM**
- Chủ đề chính của năm
- Năng lượng chủ đạo
- Bài học quan trọng

2. **DỰ BÁO THEO QUÝ**
- Q1 (Tháng 1-3): ...
- Q2 (Tháng 4-6): ...
- Q3 (Tháng 7-9): ...
- Q4 (Tháng 10-12): ...

3. **SỰ NGHIỆP & TÀI CHÍNH**
- Cơ hội và thách thức
- Thời điểm thuận lợi
- Lời khuyên

4. **TÌNH CẢM & GIA ĐÌNH**
- Xu hướng
- Thời điểm quan trọng
- Lời khuyên

5. **SỨC KHỎE**
- Cần chú ý gì
- Thời điểm cần cẩn thận

6. **THÁNG QUAN TRỌNG NHẤT**
- Tháng tốt nhất cho các quyết định lớn
- Tháng cần thận trọng

7. **3 LỜI KHUYÊN VÀNG CHO NĂM ${year}**
`;
}

/**
 * Generate quick insight prompt
 */
export function generateQuickInsightPrompt(number, type) {
  const typeNames = {
    lifePath: 'Đường Đời',
    expression: 'Biểu Đạt',
    soulUrge: 'Linh Hồn',
    personality: 'Nhân Cách',
    birthday: 'Ngày Sinh',
    maturity: 'Trưởng Thành'
  };

  return `
Viết đoạn insight ngắn (100 từ) về số ${typeNames[type] || type} ${number}. Bao gồm:
- Ý nghĩa cốt lõi (1-2 câu)
- Điểm mạnh nổi bật
- Thách thức cần vượt qua
- Một lời khuyên thực tế

Giọng văn: Ấm áp, khích lệ, cụ thể.
`;
}

/**
 * System prompt for numerology AI assistant
 */
export const NUMEROLOGY_SYSTEM_PROMPT = `
Bạn là "Thầy Số" - một chuyên gia Thần Số Học Việt Nam với hơn 30 năm kinh nghiệm. Bạn kết hợp:
- Pythagorean Numerology (phương Tây)
- Chaldean Numerology
- Kiến thức phương Đông (Ngũ Hành, Âm Dương)

NGUYÊN TẮC:
1. Luôn giải thích dựa trên số liệu cụ thể
2. Tích cực nhưng trung thực về thách thức
3. Đưa lời khuyên thực tế, áp dụng được
4. Tôn trọng văn hóa Việt Nam
5. Không mê tín, dựa trên logic số học

PHONG CÁCH:
- Ấm áp như người thầy
- Chuyên nghiệp nhưng dễ hiểu
- Khích lệ và tạo động lực
- Cụ thể, không chung chung
`;

export default {
  generateNumerologyAnalysisPrompt,
  generateCareerAnalysisPrompt,
  generateCompatibilityPrompt,
  generateYearForecastPrompt,
  generateQuickInsightPrompt,
  NUMEROLOGY_SYSTEM_PROMPT
};
