import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

const SYSTEM_PROMPT = `Bạn là một chuyên gia huyền học Á Đông uyên bác, am hiểu sâu sắc về tử vi, tướng số và thần số học theo truyền thống Trung Hoa và Việt Nam.

Phong cách trả lời:
- Ngôn ngữ đẳng cấp, trưởng thành, không sến súa
- Dùng từ ngữ tinh tế như "hài hòa", "bền vững", "nội tại", "cân bằng"
- Tránh mê tín, tập trung vào khía cạnh văn hóa và phát triển bản thân
- Đưa lời khuyên thực tế, ứng dụng được trong cuộc sống
- Trả lời bằng tiếng Việt, có thể dùng thuật ngữ Hán Việt khi cần thiết

Format:
- Sử dụng markdown để format đẹp
- Chia thành các phần rõ ràng với tiêu đề
- Độ dài vừa phải, súc tích nhưng đầy đủ`;

export async function analyzeNumerology(name, birthDate, lifePath, destinyNumber, soulNumber, personalityNumber) {
  const prompt = `Phân tích thần số học chi tiết cho:
- Họ tên: ${name}
- Ngày sinh: ${birthDate}
- Số Đường Đời (Life Path): ${lifePath}
- Số Định Mệnh (Destiny): ${destinyNumber}
- Số Linh Hồn (Soul Urge): ${soulNumber}
- Số Nhân Cách (Personality): ${personalityNumber}

Hãy phân tích:
1. Ý nghĩa tổng quan của bộ số này
2. Điểm mạnh và tiềm năng
3. Thách thức cần vượt qua
4. Sự nghiệp phù hợp
5. Lời khuyên phát triển bản thân`;

  return streamCompletion(prompt);
}

export async function analyzeAstrology(zodiac, element, yinYang, canChi, lunarDate) {
  const prompt = `Phân tích tử vi Á Đông chi tiết cho:
- Con giáp: ${zodiac}
- Ngũ hành: ${element}
- Âm/Dương: ${yinYang}
- Can Chi năm sinh: ${canChi}
- Ngày Âm lịch: ${lunarDate}

Hãy phân tích:
1. Tính cách đặc trưng của người tuổi ${zodiac}
2. Ảnh hưởng của ngũ hành ${element}
3. Tương sinh tương khắc với các tuổi khác
4. Vận hạn năm 2025 (Ất Tỵ)
5. Lời khuyên hài hòa ngũ hành`;

  return streamCompletion(prompt);
}

export async function analyzePalmistry(handFeatures) {
  const prompt = `Phân tích tướng tay theo Chinese Palmistry dựa trên các đặc điểm sau:
${handFeatures}

Hãy phân tích theo truyền thống Á Đông:
1. Hình dạng bàn tay và ngũ hành tương ứng
2. Ý nghĩa các đường chính (Sinh đạo, Trí đạo, Tâm đạo)
3. Các gò trên bàn tay và ý nghĩa
4. Dự báo về sức khỏe, sự nghiệp, tình duyên
5. Lời khuyên phát triển`;

  return streamCompletion(prompt);
}

export async function analyzePhysiognomy(faceFeatures) {
  const prompt = `Phân tích nhân tướng học (Mian Xiang) dựa trên các đặc điểm sau:
${faceFeatures}

Hãy phân tích theo thuật tướng mặt Trung Hoa:
1. Ngũ quan và ý nghĩa (mắt, mũi, miệng, tai, lông mày)
2. Tam đình (trán, mũi, cằm) và vận số các giai đoạn đời
3. Thập nhị cung trên khuôn mặt
4. Tính cách và tiềm năng
5. Lời khuyên cân bằng và phát triển`;

  return streamCompletion(prompt);
}

export async function generateComprehensiveReport(userData) {
  const prompt = `Tổng hợp báo cáo huyền học toàn diện cho:
${JSON.stringify(userData, null, 2)}

Hãy tạo một báo cáo tổng hợp:
1. Tổng quan về bản mệnh
2. Điểm mạnh nổi bật từ tất cả các phương pháp
3. Thách thức cần lưu ý
4. Hướng phát triển sự nghiệp
5. Lời khuyên tổng quát cho cuộc sống`;

  return streamCompletion(prompt);
}

async function streamCompletion(userPrompt) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 2000
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error('Không thể kết nối với AI. Vui lòng thử lại sau.');
  }
}

export async function streamAnalysis(userPrompt, onChunk) {
  try {
    const stream = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 2000,
      stream: true
    });

    let fullContent = '';
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      fullContent += content;
      onChunk(fullContent);
    }
    return fullContent;
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error('Không thể kết nối với AI. Vui lòng thử lại sau.');
  }
}

export default openai;
