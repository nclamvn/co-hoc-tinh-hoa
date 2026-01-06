# 📋 HANDOVER - Dự Án "Á Đông Huyền Bí"

> **Cập nhật lần cuối:** 2026-01-05
> **Trạng thái:** Phase 3 hoàn thành, sẵn sàng Phase 4

---

## 🎯 Tổng Quan Dự Án

**Tên:** Á Đông Huyền Bí (Eastern Mystique)
**Mô tả:** Web app tử vi, tướng số, thần số học theo văn hóa Á Đông, tích hợp AI (OpenAI GPT-4)
**Tech Stack:** React 19 + Vite 7 + Tailwind CSS 4 + Framer Motion + OpenAI API

---

## ✅ ĐÃ HOÀN THÀNH

### Phase 1: Core Features
| Module | File | Trạng thái |
|--------|------|------------|
| Landing Page | `src/pages/HomePage.jsx` | ✅ |
| Header Navigation | `src/components/Header.jsx` | ✅ |
| Thần Số Học | `src/pages/NumerologyPage.jsx` | ✅ + AI |
| Tử Vi | `src/pages/AstrologyPage.jsx` | ✅ + AI |
| Tướng Tay | `src/pages/PalmistryPage.jsx` | ✅ + AI + Vision |
| Tướng Mặt | `src/pages/PhysiognomyPage.jsx` | ✅ + AI + Vision |
| Báo Cáo Tổng Hợp | `src/pages/ReportPage.jsx` | ✅ + AI |

### Phase 2: AI Integration
| Tính năng | Trạng thái |
|-----------|------------|
| OpenAI API setup | ✅ `.env` đã config |
| Streaming responses | ✅ `src/utils/openai.js` |
| GPT-4 Vision (ảnh tay/mặt) | ✅ |
| Phân tích Thần Số Học | ✅ |
| Luận giải Tử Vi | ✅ |
| Báo cáo tổng hợp | ✅ |

### Phase 3: Export PDF
| Tính năng | Trạng thái |
|-----------|------------|
| html2canvas + jspdf | ✅ Đã cài |
| PDF Generator Service | ✅ `src/services/pdfGenerator.js` |
| PDF Layout đẹp | ✅ Header, Footer, Cards |
| Nút Tải PDF | ✅ Trong ReportPage |

---

## 📁 CẤU TRÚC DỰ ÁN

```
/Users/mac/tuviAI/
├── .env                          # OpenAI API Key (KHÔNG COMMIT)
├── .gitignore                    # Bảo mật
├── package.json                  # Dependencies
├── vite.config.js               # Vite config
├── index.html                   # Entry HTML
├── HANDOVER.md                  # File này
│
├── public/
│   └── vite.svg
│
└── src/
    ├── main.jsx                 # React entry
    ├── App.jsx                  # Router/Layout
    ├── index.css                # Global styles + Tailwind
    │
    ├── components/
    │   └── Header.jsx           # Navigation header
    │
    ├── pages/
    │   ├── HomePage.jsx         # Landing page
    │   ├── NumerologyPage.jsx   # Thần số học + AI
    │   ├── AstrologyPage.jsx    # Tử vi + AI
    │   ├── PalmistryPage.jsx    # Tướng tay + Vision
    │   ├── PhysiognomyPage.jsx  # Tướng mặt + Vision
    │   └── ReportPage.jsx       # Báo cáo + PDF export
    │
    ├── utils/
    │   ├── numerology.js        # Tính toán thần số học
    │   ├── astrology.js         # Tính toán tử vi, can chi
    │   └── openai.js            # OpenAI service
    │
    ├── services/
    │   └── pdfGenerator.js      # Export PDF
    │
    └── assets/
        └── react.svg
```

---

## 🔑 THÔNG TIN QUAN TRỌNG

### OpenAI API Key
```
File: /Users/mac/tuviAI/.env
Key: VITE_OPENAI_API_KEY=sk-proj-44yug...
```

### Chạy Dự Án
```bash
cd /Users/mac/tuviAI
npm install
npm run dev
# → http://localhost:5173/
```

### Dependencies Chính
- `react` ^19.2.0
- `framer-motion` ^12.23.27
- `lucide-react` ^0.562.0
- `lunar-javascript` ^1.7.7 (chuyển đổi âm dương lịch)
- `openai` ^6.15.0
- `html2canvas` + `jspdf` (PDF export)
- `tailwindcss` ^4.1.18

---

## 🚀 CÔNG VIỆC TIẾP THEO (Phase 4+)

### Phase 4: Deploy Production
- [ ] Setup Vercel/Netlify
- [ ] Environment variables trên hosting
- [ ] Custom domain (nếu có)
- [ ] SEO meta tags

### Phase 5: Enhancements (Tùy chọn)
- [ ] Lưu lịch sử phân tích (LocalStorage hoặc Database)
- [ ] Đăng ký/Đăng nhập user
- [ ] So sánh tương hợp 2 người
- [ ] Xem ngày tốt/xấu
- [ ] Dark/Light mode toggle
- [ ] Chia sẻ kết quả qua link
- [ ] PWA (Progressive Web App)

### Bugs/Improvements cần xem
- [ ] CSS warning về @import (không ảnh hưởng chức năng)
- [ ] Tối ưu PDF export cho nội dung dài
- [ ] Loading skeleton cho AI responses

---

## 🎨 DESIGN SYSTEM

### Màu Sắc
```css
--color-obsidian: #0D0D0D;   /* Background chính */
--color-charcoal: #1A1A1A;   /* Card background */
--color-gold: #C9A227;        /* Accent chính */
--color-jade: #0A6B5E;        /* Accent phụ */
--color-fire: #C44536;        /* Tử vi */
--color-water: #3D5A80;       /* Tướng mặt */
--color-ivory: #F5F0E8;       /* Text chính */
--color-mist: #B8B0A5;        /* Text phụ */
```

### Fonts
- **Display:** Cormorant Garamond (tiêu đề)
- **Body:** Noto Sans (nội dung)

### Components
- `.card-mystical` - Card với border gold
- `.btn-mystical` - Button gradient gold
- `.input-mystical` - Input field styled
- `.bg-mystical` - Background gradient

---

## 📝 GHI CHÚ CHO DEVELOPER

1. **AI Prompts** được thiết kế để:
   - Ngôn ngữ đẳng cấp, không mê tín
   - Output Markdown format
   - Tập trung phát triển bản thân

2. **Image Upload** (Tướng tay/mặt):
   - Convert to Base64
   - Gửi qua GPT-4 Vision
   - Có option nhập thủ công nếu không muốn upload ảnh

3. **PDF Export**:
   - Dùng html2canvas để capture DOM
   - jsPDF để tạo file
   - Hỗ trợ multi-page tự động

---

## 🆘 TROUBLESHOOTING

### Lỗi OpenAI API
```
Error: 401 Unauthorized
→ Kiểm tra API key trong .env
→ Đảm bảo key còn credit
```

### Lỗi PDF Export
```
Error: Canvas tainted
→ Ảnh từ URL khác domain
→ Thêm useCORS: true trong html2canvas
```

### Dev server không chạy
```bash
rm -rf node_modules
npm install
npm run dev
```

---

## 📞 LIÊN HỆ

Khi quay lại, chỉ cần nói:
> "Đọc file HANDOVER.md và tiếp tục công việc"

---

*Tạo bởi Claude Code - 2026-01-05*
