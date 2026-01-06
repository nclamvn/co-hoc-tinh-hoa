/**
 * ════════════════════════════════════════════════════════════════
 * KIẾN GIẢI 12 CUNG TỬ VI - PHIÊN BẢN ĐẦY ĐỦ
 * Cổ Học Tinh Hoa - Ancient Wisdom
 * Biên soạn theo: Tử Vi Đẩu Số Toàn Thư, Tử Vi Chính Nghĩa
 * ════════════════════════════════════════════════════════════════
 */

export const CUNG_MEANINGS = {
  // ═══════════════════════════════════════════════════════════════
  // CUNG MỆNH - Cung quan trọng nhất
  // ═══════════════════════════════════════════════════════════════
  'Mệnh': {
    name: 'Cung Mệnh',
    altNames: ['Bản Mệnh', 'Mệnh Cung', 'Chủ Mệnh'],
    position: 1,
    element: 'Trung Tâm',
    bodyPart: 'Đầu, Não bộ',

    overview: {
      short: 'Cung quan trọng nhất trong lá số, quyết định bản chất con người và vận mệnh tổng thể.',

      detailed: `Cung Mệnh là cung đầu tiên và quan trọng nhất trong 12 cung Tử Vi, được ví như "linh hồn" của toàn bộ lá số. Đây là nơi khởi nguồn của mọi phân tích, là gốc rễ để hiểu về một con người.

**VAI TRÒ CỦA CUNG MỆNH:**

1. **Bản chất con người**:
   • Tính cách bẩm sinh, khí chất tự nhiên
   • Phong thái, cách ứng xử với đời
   • Điểm mạnh và điểm yếu cốt lõi

2. **Diện mạo thể chất**:
   • Tướng mạo, vóc dáng tổng thể
   • Sức khỏe nền tảng, thể trạng
   • Ấn tượng đầu tiên với người khác

3. **Vận mệnh tổng thể**:
   • Xu hướng cuộc đời, định hướng lớn
   • Mức độ may mắn hay vất vả
   • Khả năng thành công trong các lĩnh vực

4. **Tiềm năng phát triển**:
   • Lĩnh vực phù hợp nhất
   • Cơ hội lớn trong đời
   • Giới hạn cần vượt qua

**NGUYÊN TẮC LUẬN ĐOÁN:**

Cung Mệnh không đứng một mình, cần xem xét cùng:
• **Cung Thân**: Hậu vận, nửa đời sau (từ 30-35 tuổi)
• **Tam Hợp Mệnh**: Cung Tài Bạch + Cung Quan Lộc
• **Đối Cung (Thiên Di)**: Môi trường bên ngoài, cách người khác nhìn bạn
• **Cung Phúc Đức**: Phúc phần, may mắn bẩm sinh

**QUY TẮC MIẾU VƯỢNG:**

• Sao Miếu/Vượng tại Mệnh: Phát huy tối đa năng lực
• Sao Đắc địa: Có tiềm năng nhưng cần nỗ lực
• Sao Hãm địa: Gặp trở ngại, cần cố gắng nhiều hơn
• Nhiều Cát tinh: Cuộc đời thuận lợi, được quý nhân phù trợ
• Nhiều Sát tinh: Vất vả, thử thách nhưng có thể rèn luyện`,
    },

    // Phân tích theo ngũ hành của cung
    elementAnalysis: {
      'Kim': {
        traits: 'Quyết đoán, cương nghị, có nguyên tắc, công bằng',
        strengths: 'Ý chí mạnh mẽ, kiên định mục tiêu, không dễ bị lung lay',
        weaknesses: 'Cứng nhắc, khó thỏa hiệp, đôi khi lạnh lùng',
        advice: 'Cần học cách mềm mỏng trong giao tiếp, lắng nghe quan điểm khác',
        career: 'Phù hợp: Luật sư, quản lý, tài chính, kỹ thuật',
      },
      'Mộc': {
        traits: 'Nhân từ, phát triển, sáng tạo, linh hoạt',
        strengths: 'Khả năng phát triển tốt, được người giúp đỡ, có lòng nhân ái',
        weaknesses: 'Thiếu quyết đoán, dễ bị lung lay, đôi khi quá lý tưởng',
        advice: 'Cần rèn luyện sự kiên định, đặt mục tiêu rõ ràng',
        career: 'Phù hợp: Giáo dục, y tế, nghệ thuật, môi trường',
      },
      'Thủy': {
        traits: 'Linh hoạt, thông minh, thích ứng nhanh, giao tiếp tốt',
        strengths: 'Trí tuệ cao, khéo léo, biết cách xoay xở mọi tình huống',
        weaknesses: 'Hay thay đổi, thiếu ổn định, đôi khi thiếu chính kiến',
        advice: 'Cần có định hướng rõ ràng, tránh phân tán năng lượng',
        career: 'Phù hợp: Kinh doanh, truyền thông, ngoại giao, du lịch',
      },
      'Hỏa': {
        traits: 'Nhiệt tình, năng động, sáng tạo, dám nghĩ dám làm',
        strengths: 'Đam mê mãnh liệt, quyết tâm cao, có sức hút',
        weaknesses: 'Nóng vội, thiếu kiên nhẫn, dễ bùng nổ cảm xúc',
        advice: 'Cần học cách kiềm chế, suy nghĩ trước khi hành động',
        career: 'Phù hợp: Nghệ thuật, thể thao, marketing, khởi nghiệp',
      },
      'Thổ': {
        traits: 'Ổn định, đáng tin cậy, thực tế, chắc chắn',
        strengths: 'Kiên nhẫn, bền bỉ, trung thành, có trách nhiệm',
        weaknesses: 'Bảo thủ, chậm thay đổi, đôi khi quá thận trọng',
        advice: 'Cần cởi mở với cái mới, dám chấp nhận rủi ro có tính toán',
        career: 'Phù hợp: Bất động sản, nông nghiệp, hành chính, ngân hàng',
      },
    },

    // Các giai đoạn cuộc đời theo đại vận
    lifePeriods: {
      youth: {
        age: '0-20 tuổi',
        focus: 'Nền tảng giáo dục, gia đình gốc, tính cách hình thành',
        keyFactors: ['Cung Phụ Mẫu', 'Cung Huynh Đệ', 'Cung Phúc Đức'],
        advice: 'Tập trung học hành, xây dựng nền tảng kiến thức và đạo đức',
      },
      earlyAdult: {
        age: '20-35 tuổi',
        focus: 'Khởi nghiệp, lập gia đình, định hướng sự nghiệp',
        keyFactors: ['Cung Quan Lộc', 'Cung Phu Thê', 'Cung Tài Bạch'],
        advice: 'Nỗ lực tạo dựng, chọn đúng hướng đi, xây dựng mối quan hệ',
      },
      middleAge: {
        age: '35-50 tuổi',
        focus: 'Đỉnh cao sự nghiệp, trách nhiệm gia đình',
        keyFactors: ['Cung Thân', 'Cung Tử Nữ', 'Cung Điền Trạch'],
        advice: 'Phát huy thành quả, cân bằng công việc và gia đình',
      },
      lateAdult: {
        age: '50+ tuổi',
        focus: 'Thu hoạch thành quả, kế thừa, hưởng phúc',
        keyFactors: ['Cung Phúc Đức', 'Cung Tử Nữ', 'Cung Tật Ách'],
        advice: 'Hưởng thụ thành quả, truyền lại kinh nghiệm, chăm sóc sức khỏe',
      },
    },

    // Mối quan hệ với các cung khác
    relationships: {
      'Thiên Di': {
        type: 'Đối Cung',
        meaning: 'Phản ánh môi trường bên ngoài, cách người đời nhìn nhận',
        goodCombo: 'Mệnh tốt + Thiên Di tốt = Nội ngoại hài hòa, thuận lợi cả trong lẫn ngoài',
        badCombo: 'Mệnh tốt + Thiên Di xấu = Có tài năng nhưng khó được công nhận',
      },
      'Tài Bạch': {
        type: 'Tam Hợp',
        meaning: 'Tài lộc, khả năng kiếm tiền và giữ tiền',
        interpretation: 'Mệnh-Tài tương sinh: Sự nghiệp đem lại tài lộc. Mệnh-Tài tương khắc: Tiền bạc vất vả',
      },
      'Quan Lộc': {
        type: 'Tam Hợp',
        meaning: 'Sự nghiệp, công danh, thành tựu xã hội',
        interpretation: 'Tam hợp Mệnh-Tài-Quan hài hòa: Đại cát. Tam hợp xung khắc: Cần điều chỉnh',
      },
      'Phúc Đức': {
        type: 'Hỗ trợ',
        meaning: 'Phúc đức tổ tiên, may mắn bẩm sinh',
        interpretation: 'Ảnh hưởng đến mức độ may mắn và phúc phần trong cuộc sống',
      },
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // CUNG PHỤ MẪU - Cha mẹ, cấp trên
  // ═══════════════════════════════════════════════════════════════
  'Phụ Mẫu': {
    name: 'Cung Phụ Mẫu',
    altNames: ['Cung Cha Mẹ', 'Tướng Mạo Cung', 'Cung Phụ Tướng'],
    position: 2,
    element: 'Dương',
    bodyPart: 'Đầu, Mặt, Da',

    overview: {
      short: 'Cung phản ánh mối quan hệ với cha mẹ, cấp trên, và diện mạo bên ngoài.',

      detailed: `Cung Phụ Mẫu trong Tử Vi có nhiều tầng ý nghĩa quan trọng, không chỉ giới hạn ở quan hệ cha mẹ.

**1. QUAN HỆ VỚI CHA MẸ:**

• **Tình cảm gia đình**: Mức độ gắn bó, yêu thương với cha mẹ
• **Sự giúp đỡ**: Cha mẹ có khả năng và ý muốn hỗ trợ hay không
• **Hoàn cảnh gia đình gốc**: Cha mẹ giàu hay nghèo, khỏe hay yếu
• **Thừa kế**: Có được hưởng gia tài hay không
• **Duyên phận**: Cha mẹ sống lâu hay mất sớm, có ly biệt không

**2. QUAN HỆ VỚI CẤP TRÊN (mở rộng):**

• **Sếp, chủ**: Mối quan hệ với người quản lý trực tiếp
• **Thầy cô**: Quan hệ với người hướng dẫn, mentor
• **Người lớn tuổi**: Được bề trên nâng đỡ hay gây khó dễ
• **Quý nhân**: Khả năng nhận được sự bảo trợ từ người có quyền lực

**3. DIỆN MẠO - TƯỚNG MẠO:**

• **Gương mặt**: Đặc điểm khuôn mặt, vẻ đẹp hay xấu
• **Ấn tượng đầu tiên**: Người khác nhìn bạn thế nào
• **Phong thái**: Khí chất toát ra từ bên ngoài
• **Sức hút**: Có duyên hay không có duyên với người khác

**4. GIẤY TỜ, VĂN BẰNG:**

• **Học vấn**: Bằng cấp, chứng chỉ
• **Giấy tờ pháp lý**: Hợp đồng, văn bản quan trọng
• **Nhà đất**: Vấn đề giấy tờ sở hữu
• **Thủ tục hành chính**: Thuận lợi hay trắc trở

**NGUYÊN TẮC LUẬN ĐOÁN:**

• Nhiều Cát tinh: Cha mẹ giàu có, được phụ ấm tốt
• Nhiều Sát tinh: Cha mẹ vất vả, có thể ly biệt sớm
• Có Hóa Kỵ: Xung đột với cha mẹ hoặc cấp trên
• Có Thiên Không: Cha mẹ có danh nhưng thiếu thực
• Có Đào Hoa: Diện mạo xinh đẹp, có sức hút`,
    },

    elementAnalysis: {
      'Kim': {
        traits: 'Cha mẹ nghiêm khắc, gia giáo chặt chẽ',
        strengths: 'Được giáo dục bài bản, có kỷ luật tốt',
        weaknesses: 'Áp lực từ gia đình, thiếu sự ấm áp',
        advice: 'Cần hiểu cha mẹ nghiêm vì thương, không phải ghét',
      },
      'Mộc': {
        traits: 'Cha mẹ nhân từ, gia đình hài hòa',
        strengths: 'Được yêu thương, môi trường phát triển tốt',
        weaknesses: 'Có thể được bao bọc quá, thiếu tự lập',
        advice: 'Cần tự rèn luyện bản thân, không ỷ lại',
      },
      'Thủy': {
        traits: 'Cha mẹ linh hoạt, gia đình có nhiều thay đổi',
        strengths: 'Thích ứng tốt, được dạy cách xoay xở',
        weaknesses: 'Thiếu ổn định, có thể thay đổi chỗ ở nhiều',
        advice: 'Xây dựng nền tảng vững chắc cho bản thân',
      },
      'Hỏa': {
        traits: 'Cha mẹ năng động, gia đình sôi nổi',
        strengths: 'Môi trường kích thích phát triển, được khuyến khích',
        weaknesses: 'Có thể có xung đột, cãi vã trong gia đình',
        advice: 'Học cách kiểm soát cảm xúc trong giao tiếp gia đình',
      },
      'Thổ': {
        traits: 'Cha mẹ ổn định, gia đình truyền thống',
        strengths: 'Nền tảng vững chắc, được bảo vệ',
        weaknesses: 'Có thể bảo thủ, khó chấp nhận cái mới',
        advice: 'Tôn trọng truyền thống nhưng vẫn đổi mới',
      },
    },

    relationships: {
      'Tật Ách': {
        type: 'Đối Cung',
        meaning: 'Bệnh tật có thể di truyền từ cha mẹ',
        interpretation: 'Phụ Mẫu có Sát tinh + Tật Ách xấu = Cần chú ý bệnh di truyền',
      },
      'Nô Bộc': {
        type: 'Tam Hợp',
        meaning: 'Người giúp việc, nhân viên dưới quyền',
        interpretation: 'Cách đối xử với cha mẹ ảnh hưởng đến cách người khác đối xử với bạn',
      },
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // CUNG PHÚC ĐỨC - Phúc phần, tâm linh
  // ═══════════════════════════════════════════════════════════════
  'Phúc Đức': {
    name: 'Cung Phúc Đức',
    altNames: ['Cung Âm Đức', 'Cung Tổ Nghiệp', 'Cung Hưởng Phúc'],
    position: 3,
    element: 'Âm',
    bodyPart: 'Tâm thức, Tinh thần',

    overview: {
      short: 'Cung phản ánh phúc đức tổ tiên, may mắn bẩm sinh và đời sống tinh thần.',

      detailed: `Cung Phúc Đức là cung thể hiện "vốn liếng" tâm linh mà bạn mang theo từ khi sinh ra, bao gồm phúc đức tích lũy từ tổ tiên và các kiếp trước.

**1. PHÚC ĐỨC TỔ TIÊN:**

• **Âm đức**: Công đức ông bà, cha mẹ để lại
• **Gia tộc**: Sự hưng thịnh hay suy vi của dòng họ
• **Di sản vô hình**: Phúc báo hay nghiệp chướng kế thừa
• **Thờ cúng**: Mối liên hệ với tổ tiên, tâm linh gia đình

**2. MAY MẮN BẨM SINH:**

• **Vận may**: Mức độ gặp may hay xui trong cuộc sống
• **Cơ hội**: Có sẵn hay phải tự tạo
• **Quý nhân**: Dễ hay khó gặp người giúp đỡ
• **Thuận lợi**: Mọi việc trôi chảy hay gặp trắc trở

**3. ĐỜI SỐNG TINH THẦN:**

• **Tâm trạng**: Xu hướng vui vẻ hay u sầu
• **An lạc nội tâm**: Có bình an hay luôn bất an
• **Sở thích tâm linh**: Tín ngưỡng, thiền định, yoga
• **Giấc mơ**: Chất lượng giấc ngủ, mộng mị

**4. TUỔI GIÀ VÀ NGHỈ HƯU:**

• **Hưởng phúc**: Tuổi già an nhàn hay vất vả
• **Con cháu phụng dưỡng**: Được chăm sóc hay cô đơn
• **Sức khỏe tuổi già**: Bệnh tật hay minh mẫn
• **Tài sản cuối đời**: Có hay không có để lại

**NGUYÊN TẮC LUẬN ĐOÁN:**

• Phúc Đức tốt + Mệnh xấu = Vẫn có cơ hội vượt qua khó khăn
• Phúc Đức xấu + Mệnh tốt = Tài năng nhưng hay gặp trắc trở
• Phúc Đức có Thiên Đức, Nguyệt Đức = Phúc dày, được che chở
• Phúc Đức có Sát tinh = Nghiệp nặng, cần tu tập

**TU TẬP ĐỂ TĂNG PHÚC:**

Dù cung Phúc Đức xấu, vẫn có thể cải thiện bằng:
• Làm việc thiện, giúp đỡ người khác
• Thờ cúng tổ tiên đúng cách
• Tu tâm dưỡng tính, không tạo nghiệp xấu
• Phóng sinh, bố thí, tích đức`,
    },

    elementAnalysis: {
      'Kim': {
        traits: 'Phúc đức từ sự chính trực, công bằng của tổ tiên',
        strengths: 'Được bảo vệ trong các vấn đề pháp lý, tranh chấp',
        weaknesses: 'Phúc có điều kiện, cần giữ đạo đức mới hưởng được',
        advice: 'Sống chính trực, không làm việc gian dối',
      },
      'Mộc': {
        traits: 'Phúc đức từ lòng nhân từ của tổ tiên',
        strengths: 'Được người khác yêu mến, giúp đỡ tự nhiên',
        weaknesses: 'Dễ bị lợi dụng lòng tốt',
        advice: 'Tiếp tục làm việc thiện, giữ lòng nhân ái',
      },
      'Thủy': {
        traits: 'Phúc đức từ trí tuệ của tổ tiên',
        strengths: 'Thông minh bẩm sinh, học hỏi nhanh',
        weaknesses: 'Phúc hay biến đổi, không ổn định',
        advice: 'Dùng trí tuệ để giúp người, không để hại người',
      },
      'Hỏa': {
        traits: 'Phúc đức từ sự dũng cảm của tổ tiên',
        strengths: 'Có quý nhân trong lúc nguy nan',
        weaknesses: 'Phúc thường đến sau thử thách',
        advice: 'Dũng cảm nhưng không liều lĩnh',
      },
      'Thổ': {
        traits: 'Phúc đức dày từ nhiều đời tích lũy',
        strengths: 'Phúc ổn định, bền vững theo thời gian',
        weaknesses: 'Dễ chủ quan vì nghĩ phúc còn nhiều',
        advice: 'Không tiêu phí phúc, tiếp tục tích đức',
      },
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // CUNG ĐIỀN TRẠCH - Nhà cửa, bất động sản
  // ═══════════════════════════════════════════════════════════════
  'Điền Trạch': {
    name: 'Cung Điền Trạch',
    altNames: ['Cung Điền Sản', 'Cung Nhà Đất', 'Cung Gia Cư'],
    position: 4,
    element: 'Thổ',
    bodyPart: 'Bụng, Dạ dày',

    overview: {
      short: 'Cung phản ánh về nhà cửa, bất động sản, và cuộc sống gia đình.',

      detailed: `Cung Điền Trạch trong Tử Vi thể hiện mọi vấn đề liên quan đến nhà đất, tài sản cố định và môi trường sống.

**1. NHÀ CỬA, BẤT ĐỘNG SẢN:**

• **Sở hữu nhà**: Có nhà riêng hay đi thuê
• **Số lượng**: Một hay nhiều bất động sản
• **Chất lượng**: Nhà đẹp hay xấu, rộng hay chật
• **Vị trí**: Ở đâu thuận lợi nhất
• **Mua bán**: Thời điểm tốt để giao dịch

**2. MÔI TRƯỜNG SỐNG:**

• **Láng giềng**: Quan hệ với hàng xóm
• **Khu vực**: Sống ở đâu an toàn, thuận lợi
• **Phong thủy**: Nhà có hợp phong thủy không
• **Năng lượng**: Nhà có tích cực hay tiêu cực

**3. GIA ĐÌNH VÀ GIA TỘC:**

• **Quan hệ gia đình**: Hòa thuận hay xung đột
• **Nội trợ**: Việc nhà cửa, quản lý gia đình
• **Gia sản**: Tài sản chung của gia đình
• **Thừa kế đất đai**: Có được hưởng không

**4. ĐẦU TƯ BẤT ĐỘNG SẢN:**

• **Khả năng**: Nên hay không nên đầu tư
• **Thời điểm**: Khi nào mua, khi nào bán
• **Loại hình**: Đất nền, căn hộ, nhà phố...
• **Rủi ro**: Những điều cần tránh

**NGUYÊN TẮC LUẬN ĐOÁN:**

• Điền Trạch có Tử Vi, Thiên Phủ = Nhà cửa khang trang
• Điền Trạch có Vũ Khúc = Tích lũy bất động sản tốt
• Điền Trạch có Thiên Đồng = Nhà cửa bình yên, thoải mái
• Điền Trạch có Phá Quân = Hay thay đổi chỗ ở
• Điền Trạch có Sát tinh = Cẩn thận tranh chấp đất đai`,
    },

    elementAnalysis: {
      'Kim': {
        traits: 'Nhà cửa kiên cố, bền vững',
        strengths: 'Giữ được tài sản, bảo toàn bất động sản',
        weaknesses: 'Khó thay đổi, không linh hoạt trong mua bán',
        advice: 'Đầu tư dài hạn, không nên mua bán ngắn hạn',
      },
      'Mộc': {
        traits: 'Nhà cửa phát triển, mở rộng',
        strengths: 'Có thể tích lũy thêm bất động sản',
        weaknesses: 'Có thể mở rộng quá nhanh, không kịp quản lý',
        advice: 'Mở rộng từ từ, chắc chắn từng bước',
      },
      'Thủy': {
        traits: 'Nhà cửa hay thay đổi, di chuyển',
        strengths: 'Linh hoạt, có thể sống nhiều nơi',
        weaknesses: 'Thiếu ổn định, khó có nhà riêng cố định',
        advice: 'Nên thuê trước khi mua, đừng vội quyết định',
      },
      'Hỏa': {
        traits: 'Nhà cửa nóng nảy, có thể có hỏa hoạn',
        strengths: 'Năng lượng cao, nhà có sức sống',
        weaknesses: 'Cẩn thận an toàn điện, cháy nổ',
        advice: 'Mua bảo hiểm nhà, kiểm tra hệ thống điện thường xuyên',
      },
      'Thổ': {
        traits: 'Nhà cửa ổn định, có đất đai',
        strengths: 'Bất động sản là lĩnh vực thuận lợi',
        weaknesses: 'Có thể quá bảo thủ trong đầu tư',
        advice: 'Đây là lĩnh vực nên tập trung, nhưng cần nghiên cứu kỹ',
      },
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // CUNG QUAN LỘC - Sự nghiệp, công danh
  // ═══════════════════════════════════════════════════════════════
  'Quan Lộc': {
    name: 'Cung Quan Lộc',
    altNames: ['Cung Sự Nghiệp', 'Cung Công Danh', 'Cung Nghề Nghiệp'],
    position: 5,
    element: 'Hỏa',
    bodyPart: 'Tim, Hệ tuần hoàn',

    overview: {
      short: 'Cung quan trọng nhì sau Mệnh, phản ánh sự nghiệp, công danh và thành tựu xã hội.',

      detailed: `Cung Quan Lộc là cung thể hiện đường công danh sự nghiệp, một trong những lĩnh vực quan trọng nhất của cuộc đời.

**1. SỰ NGHIỆP VÀ CÔNG VIỆC:**

• **Nghề nghiệp**: Làm nghề gì phù hợp nhất
• **Vị trí**: Làm chủ hay làm thuê, cấp bậc nào
• **Môi trường**: Công ty lớn hay nhỏ, trong nước hay nước ngoài
• **Phong cách làm việc**: Độc lập hay teamwork
• **Thành tựu**: Mức độ thành công trong nghề

**2. CÔNG DANH VÀ DANH TIẾNG:**

• **Địa vị xã hội**: Được kính trọng hay không
• **Danh tiếng**: Nổi tiếng trong lĩnh vực nào
• **Chức vụ**: Có làm quan, làm sếp không
• **Uy tín**: Mức độ tin cậy trong mắt người khác

**3. KHẢ NĂNG LÃNH ĐẠO:**

• **Quản lý**: Có năng lực điều hành không
• **Quyền lực**: Có quyền ra quyết định không
• **Ảnh hưởng**: Tầm ảnh hưởng trong tổ chức
• **Phong cách**: Lãnh đạo kiểu gì hiệu quả

**4. PHÁT TRIỂN NGHỀ NGHIỆP:**

• **Thăng tiến**: Nhanh hay chậm, bằng cách nào
• **Chuyển đổi**: Khi nào nên đổi việc
• **Khởi nghiệp**: Có nên làm chủ không
• **Hợp tác**: Nên làm với ai

**NGUYÊN TẮC LUẬN ĐOÁN:**

• Quan Lộc có Tử Vi = Làm quan to, có quyền lực
• Quan Lộc có Vũ Khúc = Sự nghiệp liên quan đến tiền bạc
• Quan Lộc có Thiên Cơ = Sự nghiệp cần trí óc, mưu lược
• Quan Lộc có Liêm Trinh = Công việc đòi hỏi sự liêm chính
• Quan Lộc có Sát tinh = Sự nghiệp có tranh đấu, cạnh tranh

**TAM HỢP MỆNH-TÀI-QUAN:**

Cung Quan Lộc nằm trong Tam Hợp với Mệnh và Tài Bạch. Khi cả ba cung này tốt đẹp, con người sẽ:
• Có bản lĩnh (Mệnh)
• Có tiền bạc (Tài)
• Có sự nghiệp (Quan)

Đây là tam giác vàng của thành công trong cuộc sống.`,
    },

    careerByStars: {
      'Tử Vi': ['CEO', 'Chính trị gia', 'Lãnh đạo cấp cao'],
      'Thiên Cơ': ['Tư vấn', 'Nghiên cứu', 'Công nghệ'],
      'Thái Dương': ['Ngoại giao', 'Truyền thông', 'Chính trị'],
      'Vũ Khúc': ['Tài chính', 'Ngân hàng', 'Kinh doanh'],
      'Thiên Đồng': ['Nghệ thuật', 'Giải trí', 'Dịch vụ'],
      'Liêm Trinh': ['Luật sư', 'Thanh tra', 'Quản lý'],
      'Thiên Phủ': ['Quản trị', 'Đầu tư', 'Bất động sản'],
      'Thái Âm': ['Giáo dục', 'Y tế', 'Công việc về đêm'],
      'Tham Lang': ['Kinh doanh', 'Giải trí', 'Marketing'],
      'Cự Môn': ['Luật sư', 'Giáo viên', 'MC'],
      'Thiên Tướng': ['Quân đội', 'Công an', 'Bảo vệ'],
      'Thiên Lương': ['Bác sĩ', 'Thầy giáo', 'Tư vấn'],
      'Thất Sát': ['Quân đội', 'Kinh doanh', 'Khởi nghiệp'],
      'Phá Quân': ['Cải cách', 'Khởi nghiệp', 'Sáng tạo'],
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // CUNG NÔ BỘC - Bạn bè, cấp dưới
  // ═══════════════════════════════════════════════════════════════
  'Nô Bộc': {
    name: 'Cung Nô Bộc',
    altNames: ['Cung Giao Hữu', 'Cung Bạn Bè', 'Cung Nô Tỳ'],
    position: 6,
    element: 'Thủy',
    bodyPart: 'Tay, Vai',

    overview: {
      short: 'Cung phản ánh mối quan hệ với bạn bè, cấp dưới và người giúp việc.',

      detailed: `Cung Nô Bộc (còn gọi là Cung Giao Hữu) thể hiện tất cả các mối quan hệ xã hội ngang hàng và dưới quyền.

**1. BẠN BÈ VÀ GIAO THIỆP:**

• **Số lượng bạn**: Nhiều hay ít bạn
• **Chất lượng bạn**: Bạn tốt hay bạn xấu
• **Loại bạn**: Bạn từ đâu đến (học, làm, hàng xóm...)
• **Tình bạn**: Sâu sắc hay hời hợt
• **Lợi ích từ bạn**: Được bạn giúp hay bị bạn hại

**2. CẤP DƯỚI VÀ NHÂN VIÊN:**

• **Nhân viên**: Có người giúp việc tốt không
• **Quản lý**: Cách điều hành nhân viên
• **Trung thành**: Cấp dưới có trung thành không
• **Năng lực**: Nhân viên có giỏi không
• **Quan hệ**: Hòa thuận hay xung đột

**3. NGƯỜI GIÚP VIỆC:**

• **Nội trợ**: Có người giúp việc nhà không
• **Tài xế, bảo mẫu**: Người phục vụ có tốt không
• **Đối xử**: Cách đối xử với người giúp việc
• **Vấn đề**: Có bị người giúp việc gây rắc rối không

**4. MẠNG LƯỚI XÃ HỘI:**

• **Networking**: Khả năng xây dựng mạng lưới
• **Ảnh hưởng**: Tầm ảnh hưởng trong nhóm
• **Hợp tác**: Có người hợp tác tốt không
• **Cộng đồng**: Vai trò trong các tổ chức, hội nhóm

**NGUYÊN TẮC LUẬN ĐOÁN:**

• Nô Bộc tốt = Có nhiều quý nhân, được bạn bè giúp đỡ
• Nô Bộc xấu = Cẩn thận bị bạn phản, nhân viên hại
• Có Tả Phù, Hữu Bật = Có người phò tá đắc lực
• Có Thiên Mã = Bạn từ phương xa, người nước ngoài
• Có Kình Đà = Bạn bè có tranh cãi, xung đột`,
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // CUNG THIÊN DI - Di chuyển, xuất ngoại
  // ═══════════════════════════════════════════════════════════════
  'Thiên Di': {
    name: 'Cung Thiên Di',
    altNames: ['Cung Di Chuyển', 'Cung Xuất Ngoại', 'Cung Ngoại'],
    position: 7,
    element: 'Kim',
    bodyPart: 'Phổi, Hệ hô hấp',

    overview: {
      short: 'Cung phản ánh vận may bên ngoài, di chuyển, xuất ngoại và cách người khác nhìn bạn.',

      detailed: `Cung Thiên Di là Đối Cung của Mệnh, thể hiện mọi thứ bên ngoài môi trường quen thuộc.

**1. VẬN MAY BÊN NGOÀI:**

• **Cơ hội từ bên ngoài**: May mắn khi rời khỏi nhà
• **Quý nhân**: Gặp được người tốt ở đâu
• **Danh tiếng**: Người ngoài nhìn bạn thế nào
• **Môi trường bên ngoài**: Thuận lợi hay khó khăn

**2. DI CHUYỂN VÀ DU LỊCH:**

• **Di chuyển**: Đi lại nhiều hay ít
• **Du lịch**: Có được đi nhiều không, đi đâu tốt
• **Phương tiện**: An toàn hay hay gặp sự cố
• **Đường xa**: Công tác xa, đi tỉnh, đi nước ngoài

**3. XUẤT NGOẠI VÀ ĐỊNH CƯ:**

• **Du học**: Có cơ hội và nên đi không
• **Xuất khẩu lao động**: Làm việc nước ngoài
• **Định cư**: Có nên định cư nước ngoài không
• **Kiều bào**: Liên quan người Việt ở nước ngoài

**4. QUAN HỆ VỚI NGƯỜI LẠ:**

• **Ấn tượng đầu tiên**: Người lạ thấy bạn thế nào
• **Hình ảnh công chúng**: Danh tiếng xã hội
• **Giao tiếp**: Khả năng giao tiếp với người mới
• **Tin tưởng**: Người ngoài có tin bạn không

**LÀ ĐỐI CUNG CỦA MỆNH:**

Thiên Di phản chiếu Mệnh như gương:
• Mệnh = Bạn là ai thực sự
• Thiên Di = Người khác thấy bạn thế nào

Nếu Mệnh và Thiên Di hài hòa: Con người nhất quán, trong ngoài như một
Nếu Mệnh và Thiên Di mâu thuẫn: Có khoảng cách giữa con người thật và hình ảnh bên ngoài`,
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // CUNG TẬT ÁCH - Sức khỏe, bệnh tật
  // ═══════════════════════════════════════════════════════════════
  'Tật Ách': {
    name: 'Cung Tật Ách',
    altNames: ['Cung Bệnh Tật', 'Cung Sức Khỏe', 'Cung Ách Vận'],
    position: 8,
    element: 'Mộc',
    bodyPart: 'Gan, Mật',

    overview: {
      short: 'Cung phản ánh về sức khỏe, bệnh tật và những tai nạn, rủi ro trong cuộc sống.',

      detailed: `Cung Tật Ách là cung quan trọng để xem xét vấn đề sức khỏe và các rủi ro trong cuộc đời.

**1. SỨC KHỎE TỔNG THỂ:**

• **Thể trạng**: Mạnh hay yếu từ bẩm sinh
• **Sức đề kháng**: Hay ốm vặt hay ít bệnh
• **Sinh lực**: Năng lượng cao hay thấp
• **Phục hồi**: Khỏi bệnh nhanh hay chậm

**2. CÁC LOẠI BỆNH:**

• **Bệnh bẩm sinh**: Bệnh di truyền, từ nhỏ
• **Bệnh mãn tính**: Bệnh kéo dài, khó chữa
• **Bệnh cấp tính**: Ốm đột ngột, nguy hiểm
• **Vùng yếu**: Bộ phận nào hay có vấn đề

**3. TAI NẠN VÀ RỦI RO:**

• **Tai nạn**: Hay gặp tai nạn không, loại nào
• **Thương tích**: Có để lại sẹo, tàn tật không
• **Nguy hiểm**: Mức độ nguy hiểm trong đời
• **Cách phòng tránh**: Nên cẩn thận điều gì

**4. TÂM LÝ VÀ TINH THẦN:**

• **Stress**: Mức độ căng thẳng
• **Tâm bệnh**: Có vấn đề tâm lý không
• **Lo âu, trầm cảm**: Xu hướng tinh thần
• **Nghiện ngập**: Dễ nghiện chất gì không

**NGUYÊN TẮC LUẬN ĐOÁN:**

• Tật Ách có Thiên Tướng = Sức khỏe được bảo vệ
• Tật Ách có Thiên Lương = Có thầy thuốc giỏi, mau khỏi bệnh
• Tật Ách có Sát tinh = Cẩn thận tai nạn, bệnh nặng
• Tật Ách có Đà La = Bệnh kéo dài, khó dứt
• Tật Ách có Hóa Kỵ = Hay lo lắng về sức khỏe

**PHÒNG BỆNH HƠN CHỮA BỆNH:**

Dù Tật Ách xấu, có thể giảm nhẹ bằng:
• Khám sức khỏe định kỳ
• Tập thể dục đều đặn
• Ăn uống lành mạnh
• Giữ tinh thần thoải mái
• Tránh xa các chất gây nghiện`,
    },

    healthByStars: {
      'Tử Vi': 'Sức khỏe tổng thể tốt, cẩn thận áp lực công việc',
      'Thất Sát': 'Cẩn thận tai nạn, phẫu thuật, vũ khí',
      'Phá Quân': 'Dễ bị thương, gãy xương, tai nạn xe cộ',
      'Liêm Trinh': 'Vấn đề tim mạch, máu huyết',
      'Tham Lang': 'Nghiện ngập, bệnh do ăn uống, tình dục',
      'Thiên Cơ': 'Đau đầu, thần kinh, suy nghĩ nhiều',
      'Thiên Đồng': 'Bệnh nhẹ, dễ khỏi, sức khỏe tốt',
      'Thái Dương': 'Mắt, tim, đau đầu do nóng',
      'Thái Âm': 'Thận, hệ tiết niệu, bệnh âm tính',
      'Cự Môn': 'Miệng, răng, họng, đường tiêu hóa',
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // CUNG TÀI BẠCH - Tiền bạc, tài sản
  // ═══════════════════════════════════════════════════════════════
  'Tài Bạch': {
    name: 'Cung Tài Bạch',
    altNames: ['Cung Tài Lộc', 'Cung Tiền Bạc', 'Cung Kiếm Tiền'],
    position: 9,
    element: 'Thổ',
    bodyPart: 'Lá lách, Tụy',

    overview: {
      short: 'Cung phản ánh về tiền bạc, khả năng kiếm tiền, giữ tiền và nguồn tài lộc.',

      detailed: `Cung Tài Bạch là cung thể hiện mọi vấn đề liên quan đến tiền bạc và tài sản lưu động.

**1. KHẢ NĂNG KIẾM TIỀN:**

• **Nguồn thu**: Tiền từ đâu đến (lương, kinh doanh, đầu tư...)
• **Tốc độ**: Kiếm tiền nhanh hay chậm
• **Số lượng**: Kiếm nhiều hay ít
• **Ổn định**: Thu nhập đều hay bấp bênh
• **Cách thức**: Kiếm tiền bằng gì hiệu quả

**2. KHẢ NĂNG GIỮ TIỀN:**

• **Tiết kiệm**: Có để dành được không
• **Chi tiêu**: Tiêu hoang hay tiết kiệm
• **Quản lý**: Biết quản lý tài chính không
• **Tích lũy**: Có tích lũy được tài sản không

**3. VẬN TIỀN BẠC:**

• **Lúc có lúc không**: Tiền vào ra thế nào
• **Đại cát tiểu hung**: Có tiền lớn nhưng hay mất tiền nhỏ
• **Thời điểm**: Khi nào tiền bạc thuận lợi
• **Rủi ro**: Khi nào cẩn thận về tài chính

**4. ĐẦU TƯ VÀ KINH DOANH:**

• **Có nên đầu tư**: Loại hình nào phù hợp
• **Hợp tác**: Có nên hùn hạp với ai
• **Rủi ro**: Những điều cần tránh
• **Cơ hội**: Khi nào nên mạo hiểm

**NGUYÊN TẮC LUẬN ĐOÁN:**

• Tài Bạch có Vũ Khúc = Tài tinh chính, giỏi kiếm tiền
• Tài Bạch có Thiên Phủ = Kho tiền, tích lũy tốt
• Tài Bạch có Tham Lang = Tiền từ nhiều nguồn, không ổn định
• Tài Bạch có Phá Quân = Tiền vào nhanh ra nhanh
• Tài Bạch có Hóa Lộc = Tài lộc dồi dào
• Tài Bạch có Hóa Kỵ = Cẩn thận về tiền bạc

**TAM HỢP MỆNH-TÀI-QUAN:**

Tài Bạch là một phần của tam hợp quan trọng nhất:
• Mệnh tốt + Tài tốt = Có khả năng và có tiền
• Tài tốt + Quan tốt = Sự nghiệp đem lại tài lộc
• Cả ba tốt = Thành công toàn diện`,
    },

    wealthByStars: {
      'Vũ Khúc': {
        level: 'Rất cao',
        source: 'Kinh doanh, tài chính, quản lý tiền',
        advice: 'Đây là Tài tinh, nên theo ngành tài chính',
      },
      'Thiên Phủ': {
        level: 'Cao và ổn định',
        source: 'Tích lũy, đầu tư dài hạn',
        advice: 'Giỏi giữ tiền, nên đầu tư bảo thủ',
      },
      'Tử Vi': {
        level: 'Cao nhưng chi nhiều',
        source: 'Vị trí quyền lực, lương cao',
        advice: 'Tiền đến từ địa vị, cần giữ vị trí',
      },
      'Tham Lang': {
        level: 'Cao nhưng không ổn định',
        source: 'Kinh doanh, giải trí, quan hệ',
        advice: 'Tiền từ nhiều nguồn, cần quản lý tốt',
      },
      'Phá Quân': {
        level: 'Lên xuống thất thường',
        source: 'Kinh doanh mạo hiểm, đầu cơ',
        advice: 'Cẩn thận, không nên liều lĩnh',
      },
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // CUNG TỬ NỮ - Con cái
  // ═══════════════════════════════════════════════════════════════
  'Tử Nữ': {
    name: 'Cung Tử Nữ',
    altNames: ['Cung Con Cái', 'Cung Tử Tức', 'Cung Hậu Duệ'],
    position: 10,
    element: 'Hỏa',
    bodyPart: 'Bụng dưới, Hệ sinh dục',

    overview: {
      short: 'Cung phản ánh về con cái, mối quan hệ với con và khả năng sinh sản.',

      detailed: `Cung Tử Nữ thể hiện mọi vấn đề liên quan đến con cái từ sinh đẻ đến nuôi dưỡng và quan hệ.

**1. KHẢ NĂNG SINH SẢN:**

• **Số lượng con**: Có bao nhiêu con
• **Giới tính**: Con trai hay con gái
• **Sinh nở**: Dễ hay khó sinh
• **Sức khỏe con**: Con khỏe mạnh hay yếu

**2. MỐI QUAN HỆ VỚI CON:**

• **Tình cảm**: Gắn bó hay xa cách
• **Hiểu biết**: Hiểu con hay không
• **Xung đột**: Có mâu thuẫn với con không
• **Phụ thuộc**: Con tự lập hay dựa dẫm

**3. TƯƠNG LAI CON CÁI:**

• **Học hành**: Con học giỏi hay không
• **Sự nghiệp**: Con thành đạt hay không
• **Hiếu thảo**: Con có phụng dưỡng không
• **Hỗ trợ**: Có được con giúp đỡ không

**4. VẤN ĐỀ KHÁC:**

• **Học trò, đệ tử**: Người bạn dạy dỗ
• **Sáng tạo**: Những "đứa con tinh thần"
• **Đầu tư**: Những dự án bạn tạo ra

**NGUYÊN TẮC LUẬN ĐOÁN:**

• Tử Nữ có Thiên Đồng = Con ngoan, quan hệ tốt
• Tử Nữ có Thiên Phủ = Con giàu có, thành đạt
• Tử Nữ có Phá Quân = Khó kiểm soát con, con cá tính
• Tử Nữ có Sát tinh = Cẩn thận sức khỏe con, tai nạn
• Tử Nữ có Thiên Không = Có thể ít con hoặc con ở xa`,
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // CUNG PHU THÊ - Hôn nhân, vợ chồng
  // ═══════════════════════════════════════════════════════════════
  'Phu Thê': {
    name: 'Cung Phu Thê',
    altNames: ['Cung Hôn Nhân', 'Cung Vợ Chồng', 'Cung Phối Ngẫu'],
    position: 11,
    element: 'Thủy',
    bodyPart: 'Thận, Hệ tiết niệu',

    overview: {
      short: 'Cung phản ánh về hôn nhân, người bạn đời và các mối quan hệ tình cảm sâu sắc.',

      detailed: `Cung Phu Thê là cung quan trọng để xem xét vấn đề hôn nhân và đời sống tình cảm.

**1. HÔN NHÂN VÀ VỢ CHỒNG:**

• **Tuổi kết hôn**: Cưới sớm hay muộn
• **Số lần cưới**: Một hay nhiều đời
• **Chất lượng hôn nhân**: Hạnh phúc hay khổ
• **Mẫu người phù hợp**: Nên lấy người như thế nào

**2. ĐẶC ĐIỂM NGƯỜI BẠN ĐỜI:**

• **Tính cách**: Người yêu/vợ chồng tính thế nào
• **Nghề nghiệp**: Làm nghề gì
• **Hoàn cảnh**: Giàu hay nghèo, xa hay gần
• **Ngoại hình**: Đẹp hay xấu, cao hay thấp

**3. ĐỜI SỐNG VỢ CHỒNG:**

• **Tình cảm**: Yêu thương hay lạnh nhạt
• **Xung đột**: Có hay cãi nhau không
• **Chung thủy**: Có ngoại tình không
• **Hỗ trợ**: Vợ chồng có giúp nhau không

**4. DUYÊN PHẬN TÌNH CẢM:**

• **Tuổi gặp duyên**: Khi nào gặp người tốt
• **Nơi gặp duyên**: Gặp ở đâu (công việc, bạn bè giới thiệu...)
• **Các mối quan hệ**: Trước kết hôn có nhiều mối tình không
• **Tái hôn**: Có khả năng ly hôn và tái hôn không

**NGUYÊN TẮC LUẬN ĐOÁN:**

• Phu Thê có Thiên Đồng, Thiên Phủ = Hôn nhân hạnh phúc
• Phu Thê có Đào Hoa = Vợ/chồng đẹp nhưng có thể có tình địch
• Phu Thê có Liêm Trinh = Vợ/chồng có cá tính mạnh
• Phu Thê có Phá Quân = Hôn nhân nhiều thay đổi, có thể ly hôn
• Phu Thê có Hóa Kỵ = Hay cãi nhau, xung đột

**LỜI KHUYÊN:**

Dù Phu Thê xấu, vẫn có thể có hôn nhân tốt nếu:
• Chọn đúng người phù hợp
• Học cách giao tiếp và thấu hiểu
• Nhường nhịn và bao dung
• Giải quyết mâu thuẫn khéo léo
• Giữ lửa tình cảm theo thời gian`,
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // CUNG HUYNH ĐỆ - Anh chị em, đồng nghiệp
  // ═══════════════════════════════════════════════════════════════
  'Huynh Đệ': {
    name: 'Cung Huynh Đệ',
    altNames: ['Cung Anh Em', 'Cung Đồng Liêu', 'Cung Huynh Muội'],
    position: 12,
    element: 'Mộc',
    bodyPart: 'Tứ chi, Tay chân',

    overview: {
      short: 'Cung phản ánh mối quan hệ với anh chị em ruột, họ hàng cùng vai và đồng nghiệp.',

      detailed: `Cung Huynh Đệ thể hiện tất cả các mối quan hệ ngang hàng trong gia đình và xã hội.

**1. ANH CHỊ EM RUỘT:**

• **Số lượng**: Có bao nhiêu anh chị em
• **Quan hệ**: Hòa thuận hay xung đột
• **Hỗ trợ**: Anh chị em có giúp đỡ nhau không
• **Khoảng cách**: Gần gũi hay xa cách
• **Tài sản**: Có tranh chấp thừa kế không

**2. HỌ HÀNG CÙNG VAI:**

• **Anh chị em họ**: Quan hệ với họ hàng
• **Bạn cùng trang lứa**: Quan hệ với người đồng trang lứa
• **Đối tác ngang hàng**: Quan hệ bình đẳng

**3. ĐỒNG NGHIỆP:**

• **Quan hệ công sở**: Hòa thuận hay cạnh tranh
• **Hợp tác**: Có người hợp tác tốt không
• **Cạnh tranh**: Có bị cạnh tranh không
• **Hỗ trợ trong công việc**: Đồng nghiệp có giúp không

**4. BẠN BÈ THÂN:**

• **Bạn thân**: Có bạn tri kỷ không
• **Hội nhóm**: Quan hệ trong các nhóm bạn
• **Tin tưởng**: Có người đáng tin cậy không

**NGUYÊN TẮC LUẬN ĐOÁN:**

• Huynh Đệ có Thiên Đồng = Anh em hòa thuận, yêu thương
• Huynh Đệ có Thiên Cơ = Anh em thông minh, hay bàn tính
• Huynh Đệ có Sát tinh = Xung đột, tranh cãi với anh em
• Huynh Đệ có Thiên Không = Ít anh em hoặc anh em ở xa
• Huynh Đệ có Hóa Lộc = Được anh em giúp đỡ về tài chính

**QUAN HỆ VỚI CÁC CUNG KHÁC:**

• Huynh Đệ + Nô Bộc = Mạng lưới quan hệ xã hội tổng thể
• Huynh Đệ + Phu Thê = Quan hệ anh em ảnh hưởng hôn nhân (em vợ, anh chồng...)
• Huynh Đệ + Tài Bạch = Hợp tác kinh doanh với anh em`,
    },
  },
};

// ═══════════════════════════════════════════════════════════════
// EXPORT INDEX FILE
// ═══════════════════════════════════════════════════════════════

export default CUNG_MEANINGS;

/**
 * Helper function để lấy meaning của một cung
 */
export const getCungMeaning = (cungName) => {
  return CUNG_MEANINGS[cungName] || null;
};

/**
 * Lấy danh sách tất cả các cung
 */
export const getAllCungNames = () => {
  return Object.keys(CUNG_MEANINGS);
};

/**
 * Lấy mô tả ngắn của cung
 */
export const getCungShortDesc = (cungName) => {
  const cung = CUNG_MEANINGS[cungName];
  return cung?.overview?.short || '';
};
