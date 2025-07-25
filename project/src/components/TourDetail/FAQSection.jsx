import React from 'react';

const FAQSection = () => {
  const faqs = [
    { q: "Thời gian tốt nhất để tham gia tour này là khi nào?", a: "Thời gian lý tưởng nhất là vào mùa xuân (tháng 4-5) và mùa thu (tháng 9-10) vì thời tiết dễ chịu và ít đông đúc hơn." },
    { q: "Chính sách hủy tour như thế nào?", a: "Bạn có thể hủy để được hoàn tiền đầy đủ trước 30 ngày so với ngày khởi hành. Phí hủy 50% được áp dụng nếu hủy trong vòng 30 ngày. Không hoàn tiền nếu hủy trong vòng 7 ngày trước ngày khởi hành." },
    { q: "Giá tour đã bao gồm bảo hiểm du lịch chưa?", a: "Bảo hiểm du lịch không được bao gồm trong giá tour. Chúng tôi đặc biệt khuyên bạn nên mua bảo hiểm du lịch toàn diện trước chuyến đi." },
    { q: "Vé máy bay đến điểm khởi hành có được bao gồm không?", a: "Các chuyến bay quốc tế và nội địa đến điểm bắt đầu của tour không được bao gồm trừ khi có quy định rõ ràng trong mục 'Giá bao gồm'." }
  ];

  return (
    <section id="tour-faq" className="scroll-mt-24">
      <h3 className="text-2xl font-bold text-gray-900 pb-4 mb-4 border-b">Các câu hỏi thường gặp (FAQ)</h3>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <details key={index} className="group p-4 bg-white rounded-lg border shadow-sm transition-all duration-300 hover:bg-gray-50">
            <summary className="font-semibold text-lg cursor-pointer flex justify-between items-center text-gray-800">
              {faq.q}
              <span className="transform transition-transform duration-300 group-open:rotate-180">▼</span>
            </summary>
            <p className="mt-4 text-gray-600 leading-relaxed pt-4 border-t border-gray-200">
              {faq.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;