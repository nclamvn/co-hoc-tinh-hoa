/**
 * Complete Numerology Meanings Database
 * Vietnamese interpretations for all numerology numbers
 */

// ============ LIFE PATH MEANINGS ============
export const LIFE_PATH_MEANINGS = {
  1: {
    title: 'Người Tiên Phong',
    keywords: ['Lãnh đạo', 'Độc lập', 'Sáng tạo', 'Tham vọng'],
    element: 'Hỏa',
    strengths: [
      'Khả năng lãnh đạo bẩm sinh',
      'Độc lập và tự chủ cao',
      'Sáng tạo và đổi mới',
      'Quyết đoán, dám nghĩ dám làm'
    ],
    weaknesses: [
      'Có thể bướng bỉnh, cố chấp',
      'Đôi khi quá tự tin',
      'Khó hợp tác với người khác',
      'Thiếu kiên nhẫn'
    ],
    career: ['CEO', 'Doanh nhân', 'Nhà phát minh', 'Quản lý'],
    love: 'Cần đối tác tôn trọng sự độc lập của bạn nhưng cũng đủ mạnh mẽ để thách thức bạn.',
    lifePurpose: 'Phát triển sự độc lập và khả năng lãnh đạo để truyền cảm hứng cho người khác.',
    challenges: 'Học cách hợp tác và lắng nghe ý kiến người khác.',
    celebrities: ['Steve Jobs', 'Napoleon', 'Martin Luther King Jr.']
  },
  2: {
    title: 'Nhà Ngoại Giao',
    keywords: ['Hài hòa', 'Hợp tác', 'Nhạy cảm', 'Kiên nhẫn'],
    element: 'Thủy',
    strengths: [
      'Khả năng ngoại giao xuất sắc',
      'Nhạy cảm với cảm xúc người khác',
      'Kiên nhẫn và hòa bình',
      'Hợp tác tốt trong nhóm'
    ],
    weaknesses: [
      'Có thể quá nhạy cảm',
      'Khó đưa ra quyết định',
      'Dễ bị ảnh hưởng bởi người khác',
      'Thiếu quyết đoán'
    ],
    career: ['Nhà ngoại giao', 'Tư vấn', 'Nhà hòa giải', 'Nghệ sĩ'],
    love: 'Bạn là người tình lý tưởng, luôn đặt hạnh phúc của đối tác lên hàng đầu.',
    lifePurpose: 'Mang lại sự hài hòa và kết nối mọi người lại với nhau.',
    challenges: 'Học cách tự tin vào quyết định của bản thân.',
    celebrities: ['Barack Obama', 'Madonna', 'Bill Clinton']
  },
  3: {
    title: 'Nghệ Sĩ Sáng Tạo',
    keywords: ['Sáng tạo', 'Biểu đạt', 'Lạc quan', 'Xã hội'],
    element: 'Mộc',
    strengths: [
      'Khả năng sáng tạo phi thường',
      'Giao tiếp và diễn đạt tốt',
      'Lạc quan và vui vẻ',
      'Thu hút người khác'
    ],
    weaknesses: [
      'Thiếu tập trung, dễ phân tâm',
      'Có thể nông cạn',
      'Tránh né trách nhiệm',
      'Dễ nản lòng'
    ],
    career: ['Nghệ sĩ', 'Nhà văn', 'Diễn viên', 'Nhà thiết kế'],
    love: 'Bạn cần đối tác có thể theo kịp năng lượng và sự sáng tạo của bạn.',
    lifePurpose: 'Sử dụng khả năng sáng tạo để truyền cảm hứng và mang lại niềm vui.',
    challenges: 'Học cách tập trung và hoàn thành những gì đã bắt đầu.',
    celebrities: ['John Lennon', 'Celine Dion', 'J.K. Rowling']
  },
  4: {
    title: 'Người Xây Dựng',
    keywords: ['Ổn định', 'Chăm chỉ', 'Thực tế', 'Đáng tin cậy'],
    element: 'Thổ',
    strengths: [
      'Làm việc chăm chỉ và kiên trì',
      'Đáng tin cậy và trung thành',
      'Thực tế và có tổ chức',
      'Xây dựng nền tảng vững chắc'
    ],
    weaknesses: [
      'Có thể cứng nhắc',
      'Ngại thay đổi',
      'Quá tập trung vào công việc',
      'Thiếu linh hoạt'
    ],
    career: ['Kỹ sư', 'Kế toán', 'Kiến trúc sư', 'Nhà quản lý'],
    love: 'Bạn là người tình trung thành, coi trọng sự ổn định và cam kết.',
    lifePurpose: 'Xây dựng những điều có giá trị lâu dài cho bản thân và cộng đồng.',
    challenges: 'Học cách linh hoạt và chấp nhận thay đổi.',
    celebrities: ['Bill Gates', 'Oprah Winfrey', 'Elton John']
  },
  5: {
    title: 'Nhà Thám Hiểm',
    keywords: ['Tự do', 'Phiêu lưu', 'Linh hoạt', 'Đa năng'],
    element: 'Kim',
    strengths: [
      'Yêu thích tự do và phiêu lưu',
      'Linh hoạt và thích nghi nhanh',
      'Đa năng và ham học hỏi',
      'Khả năng giao tiếp tốt'
    ],
    weaknesses: [
      'Thiếu kiên định',
      'Dễ chán nản',
      'Có thể thiếu trách nhiệm',
      'Khó cam kết lâu dài'
    ],
    career: ['Nhà báo', 'Du lịch', 'Sales', 'Doanh nhân'],
    love: 'Bạn cần đối tác tôn trọng nhu cầu tự do và phiêu lưu của bạn.',
    lifePurpose: 'Trải nghiệm cuộc sống đa dạng và truyền cảm hứng cho người khác.',
    challenges: 'Học cách cam kết và tìm thấy sự ổn định trong sự thay đổi.',
    celebrities: ['Angelina Jolie', 'Mick Jagger', 'Abraham Lincoln']
  },
  6: {
    title: 'Người Chăm Sóc',
    keywords: ['Trách nhiệm', 'Gia đình', 'Hài hòa', 'Yêu thương'],
    element: 'Thổ',
    strengths: [
      'Có trách nhiệm cao với gia đình',
      'Yêu thương và quan tâm người khác',
      'Khả năng chữa lành tốt',
      'Tạo môi trường hài hòa'
    ],
    weaknesses: [
      'Có thể quá lo lắng',
      'Hy sinh quá mức',
      'Kiểm soát người thân',
      'Dễ bị lợi dụng'
    ],
    career: ['Bác sĩ', 'Giáo viên', 'Nhà tâm lý', 'Nhân viên xã hội'],
    love: 'Bạn là người tình tận tụy, luôn ưu tiên hạnh phúc gia đình.',
    lifePurpose: 'Mang lại tình yêu thương và sự chữa lành cho những người xung quanh.',
    challenges: 'Học cách chăm sóc bản thân và đặt ranh giới.',
    celebrities: ['John Lennon', 'Eleanor Roosevelt', 'Albert Einstein']
  },
  7: {
    title: 'Nhà Tư Tưởng',
    keywords: ['Trí tuệ', 'Tâm linh', 'Phân tích', 'Nội tâm'],
    element: 'Thủy',
    strengths: [
      'Trí tuệ sâu sắc',
      'Khả năng phân tích xuất sắc',
      'Tâm linh và trực giác tốt',
      'Tìm kiếm chân lý'
    ],
    weaknesses: [
      'Có thể cô đơn, tách biệt',
      'Quá hoài nghi',
      'Khó giao tiếp cảm xúc',
      'Hay phê phán'
    ],
    career: ['Nhà khoa học', 'Nhà nghiên cứu', 'Triết gia', 'Nhà tâm linh'],
    love: 'Bạn cần đối tác tôn trọng không gian riêng tư và kết nối trí tuệ.',
    lifePurpose: 'Khám phá chân lý và chia sẻ hiểu biết sâu sắc với thế giới.',
    challenges: 'Học cách mở lòng và kết nối cảm xúc với người khác.',
    celebrities: ['Stephen Hawking', 'Leonardo DiCaprio', 'Julia Roberts']
  },
  8: {
    title: 'Người Quyền Lực',
    keywords: ['Thành công', 'Quyền lực', 'Vật chất', 'Thành tựu'],
    element: 'Kim',
    strengths: [
      'Khả năng kinh doanh xuất sắc',
      'Tham vọng và quyết tâm cao',
      'Quản lý tài chính tốt',
      'Lãnh đạo và tổ chức giỏi'
    ],
    weaknesses: [
      'Có thể quá tập trung vào tiền bạc',
      'Độc đoán và kiểm soát',
      'Bỏ qua gia đình và sức khỏe',
      'Cứng nhắc với người khác'
    ],
    career: ['CEO', 'Ngân hàng', 'Luật sư', 'Bất động sản'],
    love: 'Bạn cần đối tác hỗ trợ tham vọng và chia sẻ giá trị về thành công.',
    lifePurpose: 'Đạt được thành công vật chất để tạo ảnh hưởng tích cực.',
    challenges: 'Học cách cân bằng giữa công việc và cuộc sống cá nhân.',
    celebrities: ['Nelson Mandela', 'Pablo Picasso', 'Barbra Streisand']
  },
  9: {
    title: 'Người Nhân Đạo',
    keywords: ['Nhân đạo', 'Từ bi', 'Trí tuệ', 'Hoàn thiện'],
    element: 'Hỏa',
    strengths: [
      'Lòng từ bi và nhân ái',
      'Tầm nhìn toàn cầu',
      'Trí tuệ và sáng suốt',
      'Khả năng ảnh hưởng rộng lớn'
    ],
    weaknesses: [
      'Có thể mơ mộng, không thực tế',
      'Khó buông bỏ quá khứ',
      'Đôi khi kiêu ngạo',
      'Dễ thất vọng với người khác'
    ],
    career: ['Nhà từ thiện', 'Nghệ sĩ', 'Nhà hoạt động', 'Bác sĩ'],
    love: 'Bạn yêu cả thế giới, cần đối tác hiểu và chia sẻ lý tưởng của bạn.',
    lifePurpose: 'Phụng sự nhân loại và mang lại sự thay đổi tích cực cho thế giới.',
    challenges: 'Học cách buông bỏ và sống trong hiện tại.',
    celebrities: ['Mahatma Gandhi', 'Mother Teresa', 'Elvis Presley']
  },
  11: {
    title: 'Nhà Tiên Tri (Master)',
    keywords: ['Trực giác', 'Giác ngộ', 'Cảm hứng', 'Tâm linh'],
    element: 'Hỏa + Thủy',
    isMaster: true,
    strengths: [
      'Trực giác và linh cảm mạnh mẽ',
      'Khả năng truyền cảm hứng',
      'Nhạy cảm tâm linh',
      'Tầm nhìn xa và sâu sắc'
    ],
    weaknesses: [
      'Căng thẳng và lo âu cao',
      'Quá nhạy cảm với môi trường',
      'Khó sống với năng lượng cao',
      'Tự nghi ngờ bản thân'
    ],
    career: ['Nhà tâm linh', 'Nhà trị liệu', 'Nghệ sĩ', 'Nhà cải cách'],
    love: 'Bạn cần đối tác hiểu sâu về tâm linh và hỗ trợ sứ mệnh cao cả của bạn.',
    lifePurpose: 'Giác ngộ và dẫn dắt người khác đến ánh sáng.',
    challenges: 'Học cách cân bằng năng lượng và sống thực tế.',
    celebrities: ['Barack Obama', 'Bill Clinton', 'Tony Blair']
  },
  22: {
    title: 'Người Xây Dựng Bậc Thầy (Master)',
    keywords: ['Tầm nhìn', 'Xây dựng', 'Quyền lực', 'Di sản'],
    element: 'Thổ + Kim',
    isMaster: true,
    strengths: [
      'Tầm nhìn vĩ đại',
      'Khả năng hiện thực hóa ước mơ',
      'Xây dựng điều vĩ đại',
      'Ảnh hưởng toàn cầu'
    ],
    weaknesses: [
      'Áp lực thành công cực cao',
      'Có thể trở nên độc tài',
      'Khó chấp nhận thất bại',
      'Workaholic'
    ],
    career: ['Kiến trúc sư tầm cỡ', 'CEO tập đoàn', 'Chính trị gia', 'Nhà từ thiện lớn'],
    love: 'Bạn cần đối tác mạnh mẽ, hỗ trợ tầm nhìn vĩ đại của bạn.',
    lifePurpose: 'Xây dựng những công trình để lại cho muôn đời.',
    challenges: 'Học cách nghỉ ngơi và tận hưởng cuộc sống.',
    celebrities: ['Paul McCartney', 'Bill Gates', 'Oprah Winfrey']
  },
  33: {
    title: 'Bậc Thầy Chữa Lành (Master)',
    keywords: ['Chữa lành', 'Tình yêu vô điều kiện', 'Phụng sự', 'Ánh sáng'],
    element: 'Mộc + Hỏa',
    isMaster: true,
    strengths: [
      'Tình yêu thương vô điều kiện',
      'Khả năng chữa lành phi thường',
      'Truyền cảm hứng cho hàng triệu người',
      'Hy sinh vì lợi ích chung'
    ],
    weaknesses: [
      'Gánh nặng trách nhiệm quá lớn',
      'Có thể tử vì đạo',
      'Khó sống cuộc sống bình thường',
      'Dễ bị lợi dụng'
    ],
    career: ['Nhà tâm linh vĩ đại', 'Nhà cải cách xã hội', 'Nhà giáo dục', 'Nghệ sĩ có tầm ảnh hưởng'],
    love: 'Tình yêu của bạn bao trùm cả nhân loại, cần đối tác thấu hiểu.',
    lifePurpose: 'Mang ánh sáng và tình yêu vô điều kiện đến cho nhân loại.',
    challenges: 'Học cách chăm sóc bản thân trong khi phụng sự.',
    celebrities: ['Dalai Lama', 'Meryl Streep', 'Albert Einstein']
  }
};

// ============ EXPRESSION MEANINGS ============
export const EXPRESSION_MEANINGS = {
  1: {
    title: 'Nhà Lãnh Đạo Bẩm Sinh',
    description: 'Bạn có khả năng lãnh đạo tự nhiên và khát khao thành công.',
    talents: ['Lãnh đạo', 'Khởi nghiệp', 'Sáng tạo', 'Độc lập']
  },
  2: {
    title: 'Người Hòa Giải',
    description: 'Bạn có khả năng ngoại giao và mang mọi người lại gần nhau.',
    talents: ['Ngoại giao', 'Hợp tác', 'Lắng nghe', 'Kiên nhẫn']
  },
  3: {
    title: 'Người Biểu Đạt',
    description: 'Bạn có khả năng giao tiếp và sáng tạo xuất sắc.',
    talents: ['Giao tiếp', 'Sáng tạo', 'Nghệ thuật', 'Viết']
  },
  4: {
    title: 'Người Tổ Chức',
    description: 'Bạn có khả năng xây dựng hệ thống và tổ chức hiệu quả.',
    talents: ['Tổ chức', 'Kế hoạch', 'Kỹ thuật', 'Chi tiết']
  },
  5: {
    title: 'Người Đa Năng',
    description: 'Bạn thích nghi nhanh và có nhiều tài năng đa dạng.',
    talents: ['Linh hoạt', 'Giao tiếp', 'Bán hàng', 'Quảng bá']
  },
  6: {
    title: 'Người Nuôi Dưỡng',
    description: 'Bạn có khả năng chăm sóc và mang lại hài hòa.',
    talents: ['Chăm sóc', 'Dạy dỗ', 'Thiết kế', 'Nghệ thuật']
  },
  7: {
    title: 'Người Phân Tích',
    description: 'Bạn có trí tuệ sâu sắc và khả năng nghiên cứu.',
    talents: ['Nghiên cứu', 'Phân tích', 'Kỹ thuật', 'Tâm linh']
  },
  8: {
    title: 'Người Thành Đạt',
    description: 'Bạn có khả năng kinh doanh và đạt thành công vật chất.',
    talents: ['Kinh doanh', 'Quản lý', 'Tài chính', 'Lãnh đạo']
  },
  9: {
    title: 'Người Vị Tha',
    description: 'Bạn có tầm nhìn rộng lớn và khát khao giúp đỡ nhân loại.',
    talents: ['Nghệ thuật', 'Nhân đạo', 'Giảng dạy', 'Chữa lành']
  },
  11: {
    title: 'Người Truyền Cảm Hứng (Master)',
    description: 'Bạn có khả năng truyền cảm hứng và dẫn dắt tâm linh.',
    talents: ['Trực giác', 'Giảng dạy', 'Sáng tạo', 'Tâm linh']
  },
  22: {
    title: 'Kiến Trúc Sư Vĩ Đại (Master)',
    description: 'Bạn có khả năng xây dựng những điều vĩ đại và lâu dài.',
    talents: ['Xây dựng', 'Tổ chức', 'Lãnh đạo', 'Tầm nhìn']
  },
  33: {
    title: 'Bậc Thầy Chữa Lành (Master)',
    description: 'Bạn có khả năng chữa lành và yêu thương vô điều kiện.',
    talents: ['Chữa lành', 'Giảng dạy', 'Nghệ thuật', 'Tâm linh']
  }
};

// ============ SOUL URGE MEANINGS ============
export const SOUL_URGE_MEANINGS = {
  1: {
    title: 'Khao Khát Độc Lập',
    desire: 'Bạn khao khát được làm chủ cuộc đời và dẫn đầu.',
    innerMotivation: 'Thành công và sự công nhận'
  },
  2: {
    title: 'Khao Khát Hài Hòa',
    desire: 'Bạn khao khát tình yêu, sự hòa hợp và kết nối.',
    innerMotivation: 'Quan hệ tốt đẹp và bình yên'
  },
  3: {
    title: 'Khao Khát Biểu Đạt',
    desire: 'Bạn khao khát được tự do sáng tạo và thể hiện.',
    innerMotivation: 'Niềm vui và sự sáng tạo'
  },
  4: {
    title: 'Khao Khát Ổn Định',
    desire: 'Bạn khao khát sự an toàn, ổn định và trật tự.',
    innerMotivation: 'Nền tảng vững chắc'
  },
  5: {
    title: 'Khao Khát Tự Do',
    desire: 'Bạn khao khát tự do, phiêu lưu và trải nghiệm.',
    innerMotivation: 'Khám phá và thay đổi'
  },
  6: {
    title: 'Khao Khát Yêu Thương',
    desire: 'Bạn khao khát gia đình hạnh phúc và được yêu thương.',
    innerMotivation: 'Chăm sóc và bảo vệ'
  },
  7: {
    title: 'Khao Khát Hiểu Biết',
    desire: 'Bạn khao khát hiểu biết sâu sắc và chân lý.',
    innerMotivation: 'Tri thức và tâm linh'
  },
  8: {
    title: 'Khao Khát Thành Công',
    desire: 'Bạn khao khát quyền lực, thành tựu và sự giàu có.',
    innerMotivation: 'Thành đạt và ảnh hưởng'
  },
  9: {
    title: 'Khao Khát Phụng Sự',
    desire: 'Bạn khao khát cống hiến cho nhân loại.',
    innerMotivation: 'Giúp đỡ và hy sinh'
  },
  11: {
    title: 'Khao Khát Giác Ngộ',
    desire: 'Bạn khao khát giác ngộ tâm linh và truyền cảm hứng.',
    innerMotivation: 'Ánh sáng và dẫn đường'
  },
  22: {
    title: 'Khao Khát Xây Dựng',
    desire: 'Bạn khao khát xây dựng điều vĩ đại và lâu dài.',
    innerMotivation: 'Di sản và công trình'
  },
  33: {
    title: 'Khao Khát Chữa Lành',
    desire: 'Bạn khao khát mang tình yêu vô điều kiện đến mọi người.',
    innerMotivation: 'Yêu thương và chữa lành'
  }
};

// ============ PERSONALITY MEANINGS ============
export const PERSONALITY_MEANINGS = {
  1: {
    title: 'Tự Tin & Độc Lập',
    appearance: 'Người khác thấy bạn mạnh mẽ, độc lập và quyết đoán.',
    firstImpression: 'Lãnh đạo, tự tin, có phần kiêu ngạo'
  },
  2: {
    title: 'Nhẹ Nhàng & Thân Thiện',
    appearance: 'Người khác thấy bạn dịu dàng, thân thiện và dễ gần.',
    firstImpression: 'Hòa nhã, đáng tin cậy, nhạy cảm'
  },
  3: {
    title: 'Vui Vẻ & Thu Hút',
    appearance: 'Người khác thấy bạn vui vẻ, hấp dẫn và đầy năng lượng.',
    firstImpression: 'Hài hước, sáng tạo, quyến rũ'
  },
  4: {
    title: 'Đáng Tin Cậy & Vững Vàng',
    appearance: 'Người khác thấy bạn đáng tin cậy, chắc chắn và thực tế.',
    firstImpression: 'Kiên định, có kỷ luật, nghiêm túc'
  },
  5: {
    title: 'Năng Động & Hấp Dẫn',
    appearance: 'Người khác thấy bạn năng động, thú vị và đầy sức sống.',
    firstImpression: 'Quyến rũ, linh hoạt, phóng khoáng'
  },
  6: {
    title: 'Ấm Áp & Quan Tâm',
    appearance: 'Người khác thấy bạn ấm áp, quan tâm và có trách nhiệm.',
    firstImpression: 'Đáng yêu, đáng tin, bảo vệ'
  },
  7: {
    title: 'Bí Ẩn & Trí Tuệ',
    appearance: 'Người khác thấy bạn bí ẩn, thông minh và khó tiếp cận.',
    firstImpression: 'Trầm lặng, sâu sắc, xa cách'
  },
  8: {
    title: 'Quyền Lực & Thành Công',
    appearance: 'Người khác thấy bạn quyền lực, thành công và ấn tượng.',
    firstImpression: 'Có quyền uy, giàu có, tham vọng'
  },
  9: {
    title: 'Nhân Ái & Lý Tưởng',
    appearance: 'Người khác thấy bạn nhân ái, lý tưởng và cao thượng.',
    firstImpression: 'Tử tế, có tầm nhìn, không vụ lợi'
  },
  11: {
    title: 'Linh Cảm & Cuốn Hút',
    appearance: 'Người khác cảm nhận năng lượng đặc biệt từ bạn.',
    firstImpression: 'Có sức hút, tâm linh, khác biệt'
  },
  22: {
    title: 'Quyền Uy & Tầm Nhìn',
    appearance: 'Người khác thấy bạn là người có tầm nhìn và quyền uy.',
    firstImpression: 'Vĩ đại, có ảnh hưởng, đáng ngưỡng mộ'
  },
  33: {
    title: 'Ánh Sáng & Tình Thương',
    appearance: 'Người khác cảm nhận tình yêu thương vô điều kiện từ bạn.',
    firstImpression: 'Chữa lành, thánh thiện, yêu thương'
  }
};

// ============ KARMIC DEBT MEANINGS ============
export const KARMIC_DEBT_MEANINGS = {
  13: {
    title: 'Nợ Nghiệp Lười Biếng',
    description: 'Kiếp trước bạn có thể đã lười biếng hoặc lợi dụng công sức người khác.',
    lesson: 'Học cách chăm chỉ làm việc và hoàn thành trách nhiệm.',
    challenges: [
      'Khó khăn trong công việc',
      'Phải làm việc gấp đôi người khác',
      'Dễ gặp thất bại nếu tìm đường tắt'
    ],
    advice: 'Tập trung, kiên trì và không bỏ cuộc. Mỗi nỗ lực đều được tưởng thưởng.'
  },
  14: {
    title: 'Nợ Nghiệp Lạm Dụng Tự Do',
    description: 'Kiếp trước bạn có thể đã lạm dụng tự do hoặc nghiện ngập.',
    lesson: 'Học cách kỷ luật bản thân và sử dụng tự do có trách nhiệm.',
    challenges: [
      'Dễ nghiện ngập (rượu, ma túy, sex)',
      'Khó kiểm soát ham muốn',
      'Thay đổi liên tục trong cuộc sống'
    ],
    advice: 'Phát triển kỷ luật và cân bằng. Tự do thực sự đến từ sự tự chủ.'
  },
  16: {
    title: 'Nợ Nghiệp Ego',
    description: 'Kiếp trước bạn có thể đã quá kiêu ngạo hoặc làm tổn thương người khác.',
    lesson: 'Học cách khiêm tốn và nhận ra sự kết nối với mọi người.',
    challenges: [
      'Ego bị "phá hủy" để tái sinh',
      'Mất mát lớn trong tình cảm',
      'Phải đối mặt với sự thật về bản thân'
    ],
    advice: 'Chấp nhận sự thay đổi và tái sinh. Mỗi mất mát là cơ hội trưởng thành.'
  },
  19: {
    title: 'Nợ Nghiệp Lạm Dụng Quyền Lực',
    description: 'Kiếp trước bạn có thể đã lạm dụng quyền lực hoặc ích kỷ.',
    lesson: 'Học cách độc lập nhưng vẫn quan tâm đến người khác.',
    challenges: [
      'Phải tự lực cánh sinh',
      'Ít nhận được sự giúp đỡ',
      'Bài học về sự phụ thuộc và độc lập'
    ],
    advice: 'Phát triển sự độc lập đồng thời học cách nhận sự giúp đỡ khi cần.'
  }
};

// ============ ARROW MEANINGS ============
export const ARROW_MEANINGS = {
  strength: {
    '1-2-3': {
      name: 'Mũi Tên Tư Duy',
      description: 'Khả năng lên kế hoạch và tư duy logic xuất sắc.',
      traits: ['Tư duy chiến lược', 'Lên kế hoạch tốt', 'Logic mạnh']
    },
    '4-5-6': {
      name: 'Mũi Tên Ý Chí',
      description: 'Ý chí mạnh mẽ và khả năng quyết tâm cao.',
      traits: ['Kiên định', 'Quyết tâm', 'Bền bỉ']
    },
    '7-8-9': {
      name: 'Mũi Tên Hành Động',
      description: 'Khả năng hành động và thực hiện xuất sắc.',
      traits: ['Năng động', 'Thực tế', 'Hoàn thành công việc']
    },
    '3-6-9': {
      name: 'Mũi Tên Trí Tuệ',
      description: 'Trí tuệ cao và khả năng học hỏi nhanh.',
      traits: ['Thông minh', 'Sáng tạo', 'Hiểu biết']
    },
    '2-5-8': {
      name: 'Mũi Tên Cảm Xúc',
      description: 'Cân bằng cảm xúc và sự nhạy cảm.',
      traits: ['Cảm xúc ổn định', 'Nhạy cảm', 'Thấu cảm']
    },
    '1-4-7': {
      name: 'Mũi Tên Thực Tế',
      description: 'Khả năng thực tế và làm việc chăm chỉ.',
      traits: ['Chăm chỉ', 'Thực tế', 'Kiên trì']
    },
    '3-5-7': {
      name: 'Mũi Tên Nhạy Bén',
      description: 'Trực giác mạnh và khả năng nhận thức sâu.',
      traits: ['Trực giác', 'Nhạy bén', 'Tâm linh']
    },
    '1-5-9': {
      name: 'Mũi Tên Quyết Tâm',
      description: 'Sự quyết tâm và khả năng vượt qua khó khăn.',
      traits: ['Kiên cường', 'Quyết tâm', 'Không bỏ cuộc']
    }
  },
  weakness: {
    '1-2-3': {
      name: 'Thiếu Kế Hoạch',
      description: 'Có thể gặp khó khăn trong việc lên kế hoạch.',
      advice: 'Học cách lập kế hoạch và suy nghĩ trước khi hành động.'
    },
    '4-5-6': {
      name: 'Thiếu Ý Chí',
      description: 'Có thể dễ bỏ cuộc khi gặp khó khăn.',
      advice: 'Rèn luyện sự kiên trì và không từ bỏ mục tiêu.'
    },
    '7-8-9': {
      name: 'Thiếu Hành Động',
      description: 'Có thể gặp khó khăn trong việc hoàn thành.',
      advice: 'Học cách hành động và hoàn thành những gì đã bắt đầu.'
    },
    '3-6-9': {
      name: 'Thiếu Tự Tin',
      description: 'Có thể thiếu tự tin về trí tuệ của bản thân.',
      advice: 'Tin tưởng vào khả năng của mình và học hỏi liên tục.'
    },
    '2-5-8': {
      name: 'Thiếu Cảm Xúc',
      description: 'Có thể gặp khó khăn trong việc kết nối cảm xúc.',
      advice: 'Học cách mở lòng và thể hiện cảm xúc.'
    },
    '1-4-7': {
      name: 'Thiếu Thực Tế',
      description: 'Có thể mơ mộng và thiếu thực tế.',
      advice: 'Học cách làm việc có kỷ luật và thực tế.'
    },
    '3-5-7': {
      name: 'Thiếu Trực Giác',
      description: 'Có thể bỏ qua trực giác và linh cảm.',
      advice: 'Học cách lắng nghe tiếng nói bên trong.'
    },
    '1-5-9': {
      name: 'Thiếu Động Lực',
      description: 'Có thể thiếu động lực và hướng đi rõ ràng.',
      advice: 'Tìm mục đích và đam mê trong cuộc sống.'
    }
  }
};

// ============ PINNACLE MEANINGS ============
export const PINNACLE_MEANINGS = {
  1: {
    title: 'Đỉnh Cao Độc Lập',
    description: 'Thời kỳ phát triển sự độc lập và lãnh đạo.',
    focus: 'Tự lập, khởi nghiệp, lãnh đạo'
  },
  2: {
    title: 'Đỉnh Cao Hợp Tác',
    description: 'Thời kỳ học cách hợp tác và xây dựng quan hệ.',
    focus: 'Quan hệ, hợp tác, kiên nhẫn'
  },
  3: {
    title: 'Đỉnh Cao Sáng Tạo',
    description: 'Thời kỳ phát triển sự sáng tạo và biểu đạt.',
    focus: 'Sáng tạo, giao tiếp, vui vẻ'
  },
  4: {
    title: 'Đỉnh Cao Xây Dựng',
    description: 'Thời kỳ xây dựng nền tảng vững chắc.',
    focus: 'Công việc, kỷ luật, ổn định'
  },
  5: {
    title: 'Đỉnh Cao Tự Do',
    description: 'Thời kỳ trải nghiệm và thay đổi.',
    focus: 'Tự do, phiêu lưu, thay đổi'
  },
  6: {
    title: 'Đỉnh Cao Gia Đình',
    description: 'Thời kỳ tập trung vào gia đình và trách nhiệm.',
    focus: 'Gia đình, trách nhiệm, yêu thương'
  },
  7: {
    title: 'Đỉnh Cao Tâm Linh',
    description: 'Thời kỳ phát triển tâm linh và trí tuệ.',
    focus: 'Nghiên cứu, tâm linh, nội tâm'
  },
  8: {
    title: 'Đỉnh Cao Thành Công',
    description: 'Thời kỳ đạt được thành công vật chất.',
    focus: 'Kinh doanh, quyền lực, tài chính'
  },
  9: {
    title: 'Đỉnh Cao Hoàn Thiện',
    description: 'Thời kỳ phụng sự và hoàn thiện bản thân.',
    focus: 'Nhân đạo, buông bỏ, phụng sự'
  },
  11: {
    title: 'Đỉnh Cao Giác Ngộ',
    description: 'Thời kỳ phát triển tâm linh sâu sắc.',
    focus: 'Trực giác, giác ngộ, truyền cảm hứng'
  },
  22: {
    title: 'Đỉnh Cao Xây Dựng Vĩ Đại',
    description: 'Thời kỳ xây dựng những điều vĩ đại.',
    focus: 'Tầm nhìn lớn, xây dựng, di sản'
  }
};

// ============ CHALLENGE MEANINGS ============
export const CHALLENGE_MEANINGS = {
  0: {
    title: 'Thử Thách Tổng Hợp',
    description: 'Có thể gặp tất cả các thử thách, cần linh hoạt.',
    lesson: 'Học cách đối mặt với mọi tình huống'
  },
  1: {
    title: 'Thử Thách Độc Lập',
    description: 'Học cách tự tin và đứng vững một mình.',
    lesson: 'Phát triển sự độc lập và tự tin'
  },
  2: {
    title: 'Thử Thách Nhạy Cảm',
    description: 'Học cách cân bằng cảm xúc và quan hệ.',
    lesson: 'Kiểm soát sự nhạy cảm và hợp tác'
  },
  3: {
    title: 'Thử Thách Biểu Đạt',
    description: 'Học cách thể hiện bản thân một cách hiệu quả.',
    lesson: 'Phát triển khả năng giao tiếp và sáng tạo'
  },
  4: {
    title: 'Thử Thách Kỷ Luật',
    description: 'Học cách làm việc có kỷ luật và kiên trì.',
    lesson: 'Xây dựng nền tảng vững chắc'
  },
  5: {
    title: 'Thử Thách Tự Do',
    description: 'Học cách sử dụng tự do có trách nhiệm.',
    lesson: 'Cân bằng giữa tự do và cam kết'
  },
  6: {
    title: 'Thử Thách Trách Nhiệm',
    description: 'Học cách cân bằng trách nhiệm với bản thân.',
    lesson: 'Không hy sinh quá mức cho người khác'
  },
  7: {
    title: 'Thử Thách Đức Tin',
    description: 'Học cách tin tưởng và mở lòng.',
    lesson: 'Vượt qua sự hoài nghi và cô đơn'
  },
  8: {
    title: 'Thử Thách Quyền Lực',
    description: 'Học cách sử dụng quyền lực một cách đạo đức.',
    lesson: 'Cân bằng vật chất và tinh thần'
  }
};

// ============ PERSONAL YEAR MEANINGS ============
export const PERSONAL_YEAR_MEANINGS = {
  1: {
    title: 'Năm Khởi Đầu Mới',
    theme: 'Bắt đầu mới, độc lập, hành động',
    opportunities: ['Khởi nghiệp', 'Thay đổi nghề', 'Tự lập'],
    advice: 'Dám bắt đầu và theo đuổi mục tiêu mới.'
  },
  2: {
    title: 'Năm Quan Hệ',
    theme: 'Hợp tác, kiên nhẫn, quan hệ',
    opportunities: ['Kết hôn', 'Hợp tác kinh doanh', 'Xây dựng quan hệ'],
    advice: 'Kiên nhẫn và tập trung vào quan hệ.'
  },
  3: {
    title: 'Năm Sáng Tạo',
    theme: 'Sáng tạo, vui vẻ, giao tiếp',
    opportunities: ['Dự án sáng tạo', 'Mở rộng giao tiếp', 'Du lịch'],
    advice: 'Thể hiện bản thân và tận hưởng cuộc sống.'
  },
  4: {
    title: 'Năm Xây Dựng',
    theme: 'Làm việc chăm chỉ, nền tảng, kỷ luật',
    opportunities: ['Xây nhà', 'Học tập', 'Sức khỏe'],
    advice: 'Tập trung làm việc và xây dựng nền móng.'
  },
  5: {
    title: 'Năm Thay Đổi',
    theme: 'Thay đổi, tự do, phiêu lưu',
    opportunities: ['Di chuyển', 'Thay đổi công việc', 'Trải nghiệm mới'],
    advice: 'Đón nhận thay đổi và khám phá.'
  },
  6: {
    title: 'Năm Gia Đình',
    theme: 'Gia đình, trách nhiệm, yêu thương',
    opportunities: ['Kết hôn', 'Sinh con', 'Mua nhà'],
    advice: 'Tập trung vào gia đình và người thân.'
  },
  7: {
    title: 'Năm Nội Tâm',
    theme: 'Suy ngẫm, tâm linh, nghỉ ngơi',
    opportunities: ['Học hỏi', 'Nghiên cứu', 'Thiền định'],
    advice: 'Nghỉ ngơi và kết nối với nội tâm.'
  },
  8: {
    title: 'Năm Thu Hoạch',
    theme: 'Thành công, tài chính, quyền lực',
    opportunities: ['Thăng chức', 'Đầu tư', 'Kinh doanh'],
    advice: 'Tập trung vào mục tiêu và gặt hái thành quả.'
  },
  9: {
    title: 'Năm Kết Thúc',
    theme: 'Kết thúc, buông bỏ, chuẩn bị',
    opportunities: ['Hoàn thành dự án', 'Buông bỏ quá khứ', 'Du lịch xa'],
    advice: 'Kết thúc những gì không còn phù hợp.'
  }
};

export default {
  LIFE_PATH_MEANINGS,
  EXPRESSION_MEANINGS,
  SOUL_URGE_MEANINGS,
  PERSONALITY_MEANINGS,
  KARMIC_DEBT_MEANINGS,
  ARROW_MEANINGS,
  PINNACLE_MEANINGS,
  CHALLENGE_MEANINGS,
  PERSONAL_YEAR_MEANINGS
};
