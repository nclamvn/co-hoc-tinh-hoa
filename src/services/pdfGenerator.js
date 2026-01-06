import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

/**
 * Generate PDF from HTML element
 * @param {HTMLElement} element - The element to convert to PDF
 * @param {string} filename - The filename for the PDF
 * @param {object} options - Additional options
 */
export async function generatePDF(element, filename = 'bao-cao-huyen-hoc.pdf', options = {}) {
  const {
    scale = 2,
    margin = 20,
    backgroundColor = '#0D0D0D'
  } = options;

  try {
    // Create canvas from element
    const canvas = await html2canvas(element, {
      scale,
      useCORS: true,
      allowTaint: true,
      backgroundColor,
      logging: false,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight
    });

    const imgData = canvas.toDataURL('image/png');
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;

    // Calculate PDF dimensions (A4)
    const pdfWidth = 210; // A4 width in mm
    const pdfHeight = 297; // A4 height in mm
    const contentWidth = pdfWidth - (margin * 2);

    // Calculate scaled height
    const ratio = contentWidth / (imgWidth / scale);
    const scaledHeight = (imgHeight / scale) * ratio;

    // Create PDF with multiple pages if needed
    const pdf = new jsPDF({
      orientation: scaledHeight > pdfHeight ? 'portrait' : 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Calculate number of pages needed
    const pageContentHeight = pdfHeight - (margin * 2);
    const totalPages = Math.ceil(scaledHeight / pageContentHeight);

    for (let page = 0; page < totalPages; page++) {
      if (page > 0) {
        pdf.addPage();
      }

      // Calculate source position for this page
      const sourceY = (page * pageContentHeight / ratio) * scale;
      const sourceHeight = Math.min(
        (pageContentHeight / ratio) * scale,
        imgHeight - sourceY
      );

      // Create a temporary canvas for this page section
      const pageCanvas = document.createElement('canvas');
      pageCanvas.width = imgWidth;
      pageCanvas.height = sourceHeight;
      const ctx = pageCanvas.getContext('2d');

      // Draw the section of the original canvas
      ctx.drawImage(
        canvas,
        0, sourceY, imgWidth, sourceHeight,
        0, 0, imgWidth, sourceHeight
      );

      const pageImgData = pageCanvas.toDataURL('image/png');
      const pageScaledHeight = (sourceHeight / scale) * ratio;

      pdf.addImage(
        pageImgData,
        'PNG',
        margin,
        margin,
        contentWidth,
        pageScaledHeight
      );
    }

    // Save PDF
    pdf.save(filename);
    return true;
  } catch (error) {
    console.error('PDF generation error:', error);
    throw error;
  }
}

/**
 * Generate PDF with header and footer
 */
export async function generateReportPDF(contentElement, userData, options = {}) {
  const filename = `bao-cao-${userData.fullName.replace(/\s+/g, '-').toLowerCase()}-${new Date().toISOString().split('T')[0]}.pdf`;

  return generatePDF(contentElement, filename, {
    ...options,
    backgroundColor: '#0D0D0D'
  });
}

export default { generatePDF, generateReportPDF };
