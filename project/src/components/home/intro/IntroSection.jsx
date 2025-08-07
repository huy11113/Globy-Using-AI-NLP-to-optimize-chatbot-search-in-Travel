// Nhập các thư viện cần thiết
import React from 'react';
import { Compass, ShieldCheck } from 'lucide-react'; // Icons

// Component Section Giới thiệu
const IntroSection = () => {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-screen-xl px-6 lg:px-8">
        {/* Lưới chia bố cục thành 2 cột */}
        <div className="grid grid-cols-1 items-center gap-x-24 gap-y-16 lg:grid-cols-2">
          
          {/* CỘT BÊN TRÁI: NỘI DUNG VĂN BẢN */}
          <div>
            <h2 className="mt-4 font-serif text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Kiến Tạo Hành Trình, Dựng Xây Kỷ Niệm
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Tại Globy, chúng tôi tin rằng du lịch là câu chuyện của riêng bạn. Sứ mệnh của chúng tôi là mang đến cho bạn một trải nghiệm chân thực, liền mạch và khó quên.
            </p>

            {/* Danh sách các điểm nổi bật */}
            <dl className="mt-10 space-y-8 border-t border-gray-200 pt-10 text-base leading-7 text-gray-600">
              {/* Mục 1: Trải nghiệm */}
              <div className="flex items-start gap-4">
                <Compass className="h-8 w-8 flex-none text-blue-600" />
                <div>
                  <dt className="block text-lg font-bold text-gray-900">
                    Trải Nghiệm Chân Thực
                  </dt>
                  <dd className="mt-1">
                    Lịch trình của chúng tôi được thiết kế để bạn hòa mình vào văn hóa địa phương, tạo ra những kết nối đích thực.
                  </dd>
                </div>
              </div>
              {/* Mục 2: An toàn */}
              <div className="flex items-start gap-4">
                <ShieldCheck className="h-8 w-8 flex-none text-blue-600" />
                <div>
                  <dt className="block text-lg font-bold text-gray-900">
                    An Toàn & Tin Cậy
                  </dt>
                  <dd className="mt-1">
                    Tự tin du lịch khi biết các chuyên gia của chúng tôi luôn đồng hành cùng bạn, đảm bảo một hành trình không lo âu.
                  </dd>
                </div>
              </div>
            </dl>
          </div>

          {/* CỘT BÊN PHẢI: HÌNH ẢNH */}
          <div className="rounded-3xl bg-gray-50 p-3 shadow-2xl ring-1 ring-gray-900/10">
            <img 
              src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=1974&auto-format&fit=crop"
              alt="Du khách đang xem bản đồ giữa khung cảnh đẹp"
              className="aspect-[4/5] w-full rounded-2xl object-cover"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

// Xuất component
export default IntroSection;
