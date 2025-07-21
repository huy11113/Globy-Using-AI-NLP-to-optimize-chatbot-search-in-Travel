import React from 'react';
import { Compass, ShieldCheck } from 'lucide-react';

const IntroSection = () => {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-screen-xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-x-24 gap-y-16 lg:grid-cols-2">
          
          {/* CỘT BÊN TRÁI: NỘI DUNG VĂN BẢN */}
          <div>
            
            <h2 className="mt-4 font-serif text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Crafting Journeys, Creating Memories
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              At Globy, we believe travel is a personal story waiting to be told. Our mission is to provide you with an authentic, seamless, and unforgettable narrative.
            </p>

            <dl className="mt-10 space-y-8 border-t border-gray-200 pt-10 text-base leading-7 text-gray-600">
              <div className="flex items-start gap-4">
                <Compass className="h-8 w-8 flex-none text-blue-600" />
                <div>
                  {/* ✨ YÊU CẦU 1: Kiểu chữ nổi bật cho đề mục */}
                  <dt className="block text-lg font-bold text-gray-900">
                    Authentic Experiences
                  </dt>
                  <dd className="mt-1">
                    Our itineraries are designed to immerse you in the local culture, creating genuine connections.
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <ShieldCheck className="h-8 w-8 flex-none text-blue-600" />
                <div>
                  <dt className="block text-lg font-bold text-gray-900">
                    Safety & Reliability
                  </dt>
                  <dd className="mt-1">
                    Travel with confidence knowing our experts are with you every step of the way, ensuring a worry-free journey.
                  </dd>
                </div>
              </div>
            </dl>
          </div>

          {/* CỘT BÊN PHẢI: HÌNH ẢNH */}
          {/* ✨ YÊU CẦU 2: Thêm khung cho ảnh */}
          <div className="rounded-3xl bg-gray-50 p-3 shadow-2xl ring-1 ring-gray-900/10">
            <img 
              src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=1974&auto-format&fit=crop"
              alt="Travelers looking at a map in a beautiful landscape"
              className="aspect-[4/5] w-full rounded-2xl object-cover"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default IntroSection;