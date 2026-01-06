# HANDOVER - Cổ Học Tinh Hoa

> File này dùng để tiếp tục dự án. Chỉ cần nói: "Đọc file HANDOVER.md và tiếp tục dự án"

## Tổng quan dự án

**Tên:** Cổ Học Tinh Hoa (Ancient Wisdom)
**Mô tả:** Ứng dụng web về văn hóa tâm linh và chiêm tinh học phương Đông
**GitHub:** https://github.com/nclamvn/co-hoc-tinh-hoa
**Deploy:** https://co-hoc-tinh-hoa.onrender.com/
**Tech:** React 18 + Vite + Tailwind CSS + Framer Motion

## Trạng thái hiện tại (2026-01-06)

### Đã hoàn thành
- [x] Trang chủ với Hero section
- [x] Navigation với mega menu dropdown
- [x] Trang Tử Vi (AstrologyPage) - nhập ngày sinh, tính Mệnh Cung (offline, không cần AI)
- [x] Trang Thần Số Học (NumerologyPage) - tính Life Path, Expression, Soul Urge, Personality, Birthday (offline)
- [x] Trang Lịch Vạn Niên (LunarCalendarPage) - đầy đủ tính năng
- [x] Database kiến giải Thần Số Học (src/data/numerologyMeanings/)
- [x] Database kiến giải Tử Vi (src/data/tuViMeanings/)
- [x] Dịch tiếng Trung → Việt cho festivals, activities, spirits trong lịch
- [x] Responsive layout
- [x] **Security fix: Xóa OpenAI khỏi frontend** (xem chi tiết bên dưới)

### Trang placeholder (Coming Soon)
- PalmistryPage.jsx - Xem Tướng Tay (placeholder)
- PhysiognomyPage.jsx - Xem Tướng Mặt (placeholder)

### Cấu trúc file quan trọng

```
src/
├── pages/
│   ├── HomePage.jsx
│   ├── AstrologyPage.jsx      # Tử Vi (offline)
│   ├── NumerologyPage.jsx     # Thần Số Học (offline)
│   ├── LunarCalendarPage.jsx  # Lịch Vạn Niên
│   ├── PalmistryPage.jsx      # Placeholder "Coming Soon"
│   └── PhysiognomyPage.jsx    # Placeholder "Coming Soon"
│
├── data/
│   ├── numerologyMeanings/
│   │   ├── index.js           # Export tất cả
│   │   ├── lifePathMeaning.js # Số Chủ Đạo (1-9, 11, 22)
│   │   ├── expressionMeaning.js
│   │   ├── soulUrgeMeaning.js
│   │   ├── personalityMeaning.js
│   │   ├── birthdayMeaning.js
│   │   └── cyclesMeaning.js   # Pinnacles & Challenges
│   │
│   └── tuViMeanings/
│       ├── index.js
│       ├── cungMeaning.js     # 12 Cung
│       └── chinhTinhMeaning.js # 14 Chính Tinh
│
├── utils/
│   └── lunarCalendar/
│       └── lunarEngine.js     # Engine tính âm lịch + dịch tiếng Việt
│
├── components/
│   ├── navigation/Navigation.jsx
│   └── lunarCalendar/
│       ├── DayCard.jsx
│       ├── TodayWidget.jsx
│       ├── MonthCalendar.jsx
│       └── DayDetailModal.jsx
│
└── App.jsx                    # Router chính
```

### Navigation IDs (dùng trong App.jsx)

```javascript
// Dịch vụ
'astrology'     → AstrologyPage
'numerology'    → NumerologyPage
'palmistry'     → PalmistryPage (placeholder)
'physiognomy'   → PhysiognomyPage (placeholder)

// Công cụ
'lunar-calendar'  → LunarCalendarPage
'auspicious-date' → (chưa làm)
'compatibility'   → (chưa làm)

// Premium
'premium'           → PremiumPage
'premium-numerology'→ (chưa làm)
'report'            → (chưa làm)
```

## Security Fix (2026-01-06)

### Vấn đề
API key OpenAI bị lộ trong JavaScript bundle trên trang deploy. Vite embed tất cả `VITE_*` env variables vào bundle khi build.

### Đã fix
1. Xóa `src/utils/openai.js`
2. Xóa AI code từ `NumerologyPage.jsx` và `AstrologyPage.jsx`
3. Thay `PalmistryPage.jsx` và `PhysiognomyPage.jsx` bằng placeholder "Coming Soon"
4. Xóa `VITE_OPENAI_API_KEY` từ `.env`
5. Build và push lên GitHub (Render sẽ auto-deploy)

### Các trang đã kiểm tra bảo mật
| Trang | Trạng thái |
|-------|-----------|
| co-hoc-tinh-hoa.onrender.com | ✅ ĐÃ FIX |
| smarttrade-web.onrender.com | ✅ AN TOÀN |
| vibecode-docs.onrender.com | ✅ AN TOÀN |
| nclam.site | ✅ AN TOÀN |
| rtr-mrp.onrender.com | ✅ AN TOÀN |

## Các vấn đề đã fix

1. **Import path numerologyMeanings** - phải dùng `/index` explicit
2. **Syntax error lifePathMeaning.js** - array ending với `}` thay vì `]`
3. **React object render error** - check `typeof meaning.overview`
4. **Dropdown bị cắt** - thêm `alignRight` prop cho Premium dropdown
5. **DayCard bị cắt viewport** - thêm responsive CSS, `max-width: 100%`
6. **Tiếng Trung trong lịch** - thêm FESTIVAL_TRANSLATIONS, ACTIVITY_TRANSLATIONS trong lunarEngine.js
7. **API key lộ trong bundle** - xóa toàn bộ OpenAI code khỏi frontend

## Commands

```bash
npm run dev      # Development
npm run build    # Production build
npm run preview  # Preview build
```

## TODO - Việc có thể làm tiếp

### Ưu tiên cao
- [ ] Trang Xem Ngày Tốt (auspicious-date)
- [ ] Trang Xem Hợp Tuổi (compatibility)
- [ ] Hoàn thiện Premium features

### Ưu tiên trung bình
- [ ] Trang Xem Tướng Tay chi tiết (thay placeholder, dùng database offline)
- [ ] Trang Xem Tướng Mặt chi tiết (thay placeholder, dùng database offline)
- [ ] Export PDF báo cáo

### Cải thiện
- [ ] Code splitting để giảm bundle size
- [ ] PWA support
- [ ] Dark/Light mode toggle
- [ ] Lưu lịch sử tra cứu (localStorage)

### Nếu muốn thêm AI sau này
- Phải dùng backend API (Node.js/Python) để gọi OpenAI
- KHÔNG BAO GIỜ đặt API key trong frontend code
- Xem xét dùng Vercel Edge Functions hoặc tự host backend

## Lưu ý quan trọng

1. **lunar-javascript** library trả về tiếng Trung, đã được dịch trong `lunarEngine.js`
2. **Vite** environment variables với prefix `VITE_` sẽ bị embed vào bundle - KHÔNG đặt secrets!
3. **SPA routing** trên Render cần file `public/_redirects`
4. **Không cần .env** cho version hiện tại (đã xóa OpenAI)

## Cách tiếp tục

1. Đọc file này
2. Chạy `npm run dev` để xem trạng thái hiện tại
3. Chọn task từ TODO list hoặc yêu cầu tính năng mới
4. Khi xong, chạy `npm run build` để test production
5. Push lên GitHub để auto-deploy lên Render

---
*Cập nhật lần cuối: 2026-01-06*
