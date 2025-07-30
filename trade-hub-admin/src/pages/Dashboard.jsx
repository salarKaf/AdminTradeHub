import React from 'react';
import { ShoppingCart, Users, TrendingUp, DollarSign, ArrowUp, User, Settings, Download, ChevronDown } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="bg-orange-400 rounded-t-3xl p-6 mb-6">
        <h1 className="text-white text-2xl font-bold text-center">Trade Hub 🏪</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile */}
        <div className="space-y-6">
          {/* Profile Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mb-4">
                <User className="w-10 h-10 text-orange-400" />
              </div>
              <p className="text-gray-600 text-sm mb-4">AdminEmail@gmail.com</p>
              
              <div className="w-full space-y-3">
                <button className="w-full bg-orange-400 text-white py-3 rounded-full font-medium hover:bg-orange-500 transition-colors">
                  دانلود کل
                </button>
                <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors">
                  مدیریت فروشگاه ها
                </button>
                <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors">
                  درآمد
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Column - Stats */}
        <div className="space-y-6">
          {/* Store Stats Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 mb-4">
                <div className="relative">
                  <ShoppingCart className="w-16 h-16 text-orange-400" />
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                    !
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="bg-gray-100 rounded-full px-4 py-2 mb-2">
                  <span className="text-gray-700 font-medium">350</span>
                </div>
                <p className="text-gray-600 text-sm">تعداد فروشگاه های فعال</p>
              </div>
              
              <div className="bg-gray-800 text-white rounded-full px-4 py-2 text-sm">
                100 فروشگاه از حد پیش استفاده میکند
              </div>
            </div>
          </div>

          {/* Users Stats Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 mb-4">
                <Users className="w-16 h-16 text-purple-500" />
              </div>
              
              <div className="mb-4">
                <div className="bg-gray-100 rounded-full px-4 py-2 mb-2">
                  <span className="text-gray-700 font-medium">300,000</span>
                </div>
                <p className="text-gray-600 text-sm">تعداد کاربران</p>
              </div>
              
              <div className="mb-4">
                <div className="bg-gray-100 rounded-full px-4 py-2 mb-2">
                  <span className="text-gray-700 font-medium">500</span>
                </div>
                <p className="text-orange-400 text-sm">تعداد فروشندگان</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Revenue */}
        <div className="space-y-6">
          {/* Revenue Card */}
          <div className="bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-yellow-400 rounded-full p-2">
                <DollarSign className="w-6 h-6 text-yellow-800" />
              </div>
              <TrendingUp className="w-6 h-6" />
            </div>
            
            <div className="mb-4">
              <p className="text-purple-100 text-sm mb-2">میزان درآمد کسب شده تا پروژه تا به حال:</p>
              <div className="text-2xl font-bold mb-2">25,000,000</div>
            </div>
            
            <div className="text-sm text-purple-100">
              رشد درآمدی در 6 ماه اخیر: 15% افزایشی
            </div>
            
            {/* Chart representation */}
            <div className="mt-4 flex items-end space-x-1 h-12">
              <div className="bg-yellow-400 w-2 h-6 rounded-sm"></div>
              <div className="bg-yellow-400 w-2 h-8 rounded-sm"></div>
              <div className="bg-yellow-400 w-2 h-4 rounded-sm"></div>
              <div className="bg-yellow-400 w-2 h-10 rounded-sm"></div>
              <div className="bg-yellow-400 w-2 h-7 rounded-sm"></div>
              <div className="bg-yellow-400 w-2 h-12 rounded-sm"></div>
              <div className="bg-yellow-400 w-2 h-9 rounded-sm"></div>
            </div>
            
            {/* Calculator icon */}
            <div className="absolute bottom-4 right-4">
              <div className="bg-white bg-opacity-20 rounded p-2">
                <div className="w-4 h-4 border border-white rounded grid grid-cols-3 gap-px">
                  <div className="bg-white bg-opacity-30 rounded-sm"></div>
                  <div className="bg-white bg-opacity-30 rounded-sm"></div>
                  <div className="bg-white bg-opacity-30 rounded-sm"></div>
                  <div className="bg-white bg-opacity-30 rounded-sm"></div>
                  <div className="bg-white bg-opacity-30 rounded-sm"></div>
                  <div className="bg-white bg-opacity-30 rounded-sm"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        <div className="bg-white rounded-xl p-4 shadow-sm text-center">
          <div className="text-2xl font-bold text-gray-800">350</div>
          <div className="text-gray-600 text-sm">فروشگاه های فعال</div>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm text-center">
          <div className="text-2xl font-bold text-purple-600">300K</div>
          <div className="text-gray-600 text-sm">کاربران</div>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm text-center">
          <div className="text-2xl font-bold text-orange-500">500</div>
          <div className="text-gray-600 text-sm">فروشندگان</div>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm text-center">
          <div className="text-2xl font-bold text-green-600">25M</div>
          <div className="text-gray-600 text-sm">درآمد کل</div>
        </div>
      </div>
    </div>
  );
}