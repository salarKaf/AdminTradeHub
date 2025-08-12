import React, { useState } from 'react';
import { ShoppingCart, Users, Crown, Loader2, TrendingUp, DollarSign, ArrowUp, User, Settings, Download, ChevronDown, Home, BarChart3, Store, UserCheck, Package, CreditCard, Eye, Edit, Trash2, Plus, AlertCircle } from 'lucide-react';
import { useEffect } from "react";
import { fetchDashboardStats, fetchUserSellerStats } from "../API/dashboard";
import { fetchTotalRevenue } from "../API/dashboard"; // حواست باشه ایمپورت کنی
import { fetchRevenueStats } from "../API/dashboard";
import { fetchPlanRevenue } from "../API/dashboard";
import { fetchMonthlyGrowth } from "../API/dashboard";
import { fetchRevenueTrend } from "../API/dashboard";

// کامپوننت هدر
const Header = () => (
  <div className="top-0 right-0 left-64 z-40  ">
    <div className="flex items-center justify-end ">
      <div className="flex items-center space-x-3">
        <img
          src="/Images/Frame 125.png"
          alt="Trade Hub Logo"
          className=" w-64 h-30"
        />

      </div>
    </div>
  </div>
);

// کامپوننت منوی کناری
const Sidebar = ({ activeMenu, setActiveMenu, menuItems }) => (
  <div className="w-64 h-screen fixed left-0 top-0 z-50">
    <div className="h-full backdrop-blur-2xl bg-white/10 border-r border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]">
      {/* Profile Header */}
      <div className="p-6 border-b border-white/10 pt-10">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center mb-3 shadow-lg">
            <User className="w-8 h-8 text-orange-400" />
          </div>
          <p className="text-gray-700 text-sm font-medium">AdminEmail@gmail.com</p>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="p-4 space-y-2 mt-10">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveMenu(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 text-right backdrop-blur-sm ${activeMenu === item.id
                ? 'bg-white/25 text-orange-600 shadow-[0_4px_16px_0_rgba(31,38,135,0.2)] border border-white/30'
                : 'text-gray-700 hover:bg-white/15 hover:shadow-[0_2px_8px_0_rgba(31,38,135,0.1)]'
                }`}
            >
              <IconComponent className="w-5 h-5 ml-2" />
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  </div>
);
// کامپوننت نمودار تعاملی
const InteractiveChart = ({ trend }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [tooltip, setTooltip] = useState({ show: false, x: 0, y: 0, data: null });

  if (!trend) {
    return (
      <div className="flex justify-center items-center h-80">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  // محاسبه ارتفاع ستون‌ها نسبت به ماکزیمم
  const max = Math.max(...trend.values);
  const chartData = trend.labels.map((label, i) => ({
    month: label,
    value: trend.values[i],
    height: (trend.values[i] / max) * 220, // تا 220 پیکسل
  }));

  const handleMouseEnter = (data, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const containerRect = event.currentTarget.closest('.relative').getBoundingClientRect();
    setTooltip({
      show: true,
      x: rect.left + rect.width / 2 - containerRect.left,
      y: rect.top - containerRect.top,
      data
    });
    setHoveredIndex(data.month);
  };

  const handleMouseLeave = () => {
    setTooltip({ show: false, x: 0, y: 0, data: null });
    setHoveredIndex(null);
  };

  return (
    <div className="relative">
      <div className="flex items-end justify-center gap-8 h-80 bg-gradient-to-t from-gray-50/80 to-white/50 rounded-xl p-6 backdrop-blur-sm border border-white/20">
        {chartData.map((data, index) => (
          <div key={index} className="flex flex-col items-center group">
            <div
              className={`bg-gradient-to-t from-blue-500 via-purple-500 to-pink-400 rounded-t-xl w-10 mb-3 cursor-pointer transition-all duration-300 ${hoveredIndex === data.month ? 'scale-110 shadow-xl' : 'hover:scale-105 hover:shadow'}`}
              style={{ height: `${data.height}px` }}
              onMouseEnter={(e) => handleMouseEnter(data, e)}
              onMouseLeave={handleMouseLeave}
            />
            <span className="text-xs text-gray-600">{data.month}</span>
          </div>
        ))}
      </div>

      {tooltip.show && tooltip.data && (
        <div
          className="absolute z-50 bg-gray-800/95 text-white px-3 py-2 rounded-md shadow-xl text-sm -translate-x-1/2 -translate-y-full"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          {tooltip.data.month} <br />
          <span className="text-green-400 font-bold">{tooltip.data.value.toLocaleString()} ریال</span>
        </div>
      )}
    </div>
  );
};




const DashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [userStats, setUserStats] = useState(null);
  const [revenueStats, setRevenueStats] = useState(null);
  const [totalRevenue, setTotalRevenue] = useState(null);
  const [planRevenue, setPlanRevenue] = useState(null);
  const [monthlyGrowth, setMonthlyGrowth] = useState(null);
  const [revenueTrend, setRevenueTrend] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const statsData = await fetchDashboardStats();
        const userSellerData = await fetchUserSellerStats();
        const revenueStatsData = await fetchRevenueStats();
        const planRevenueData = await fetchPlanRevenue();
        const growth = await fetchMonthlyGrowth(); // 💡 گرفتن درصد رشد
        const trendData = await fetchRevenueTrend();
        setRevenueTrend(trendData);

        setStats(statsData);
        setUserStats(userSellerData);
        setRevenueStats(revenueStatsData);
        setPlanRevenue(planRevenueData);
        setTotalRevenue(revenueStatsData.total_revenue);
        setMonthlyGrowth(growth); // 💡 تنظیم state رشد
      } catch (err) {
        console.error("خطا در دریافت اطلاعات داشبورد:", err);
      }
    };

    loadData();
  }, []);






  if (!stats || !userStats) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
      </div>
    );
  }


  const total = stats.total_active || 0;
  const basic = stats.basic_active || 0;
  const pro = stats.pro_active || 0;

  const basicPercent = total > 0 ? Math.round((basic / total) * 100) : 0;
  const proPercent = total > 0 ? Math.round((pro / total) * 100) : 0;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-6 ">

        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">درآمد این ماه</p>
              <p className="text-2xl font-bold text-blue-600">
                {revenueStats ? revenueStats.monthly_revenue.toLocaleString() : '...'}
              </p>
              <p className="text-xs text-gray-500">ریال</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">درآمد سال جاری</p>
              <p className="text-2xl font-bold text-purple-600">
                {revenueStats ? revenueStats.yearly_revenue.toLocaleString() : '...'}
              </p>
              <p className="text-xs text-gray-500">ریال</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>


      </div>

      {/* بخش کارت‌های تصویری بهبود یافته */}
      <div className="mt-8 space-y-6">
        {/* کارت 1 - آمار فروشگاه‌های فعال */}
        <div className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/40 overflow-hidden hover:shadow-2xl transition-all duration-500">
          <div className="flex flex-col lg:flex-row h-auto lg:h-80">
            {/* بخش تصویر - راست */}
            <div className="w-full lg:w-1/2 h-48 lg:h-full relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20 z-10"></div>
              <img
                src="/Images/how-to-start-an-online-store-min 1.png"
                alt="Active Stores"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
              />
            </div>

            {/* بخش آمار - چپ */}
            <div className="w-full lg:w-1/2 p-5 flex flex-col justify-center bg-gradient-to-br from-blue-50/50 to-purple-50/30">
              <div className="flex justify-end items-center mb-5">
                <h3 className="text-xl font-bold text-gray-800">فروشگاه‌های فعال</h3>
                <div className="rounded-xl p-2 mr-4 ml-2 border-2 border-blue-200 bg-gradient-to-br from-blue-100 to-purple-100 shadow-lg">
                  <Store className="w-5 h-5 text-blue-700" />
                </div>
              </div>

              {/* تعداد کل فروشگاه‌های فعال */}
              <div dir='rtl' className="mb-5 mr-6">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1">
                  {stats ? stats.total_active.toLocaleString() : '...'}
                </div>
                <div className="text-gray-600 font-medium text-sm">فروشگاه فعال</div>
              </div>

              {/* آمار پلن‌ها */}
              <div dir="rtl" className="grid grid-cols-2 gap-3">
                {/* پلن بیسیک */}
                <div className="bg-gradient-to-r h-28 from-green-50 to-green-100/50 rounded-xl p-3 shadow-md border border-green-200/50 hover:shadow-lg transition-all duration-300 flex items-center">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                      <div className="ml-4 bg-gradient-to-br from-green-400 to-green-600 rounded-lg p-2 shadow mr-3">
                        <Package className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 font-medium">پلن بیسیک</p>
                        <p className="font-bold text-gray-800">
                          {stats ? stats.basic_active.toLocaleString() + " فروشگاه" : '...'}
                        </p>
                      </div>
                    </div>
                    <span className="bg-gradient-to-r from-green-500 to-green-600 text-white px-2 py-1 rounded-full text-xs font-bold shadow">
                      {basicPercent}%
                    </span>
                  </div>
                </div>

                {/* پلن پرو */}
                <div className="bg-gradient-to-r h-28 from-purple-50 to-purple-100/50 rounded-xl p-3 shadow-md border border-purple-200/50 hover:shadow-lg transition-all duration-300 flex items-center">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                      <div className="ml-4 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg p-2 shadow mr-3">
                        <Crown className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 font-medium">پلن پرو</p>
                        <p className="font-bold text-gray-800">
                          {stats ? stats.pro_active.toLocaleString() + " فروشگاه" : '...'}
                        </p>
                      </div>
                    </div>
                    <span className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-2 py-1 rounded-full text-xs font-bold shadow">
                      {proPercent}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* کارت 2 - آمار کاربران و فروشگاه‌ها */}
        <div className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/40 overflow-hidden hover:shadow-2xl transition-all duration-500">
          <div className="flex flex-col lg:flex-row h-auto lg:h-80">
            {/* بخش تصویر - چپ */}
            <div className="w-full lg:w-1/2 h-48 lg:h-full relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-pink-600/20 z-10"></div>
              <img
                src="/images/online-shopping-platform-flat-style-illustration-vector-design_538610-1336_11zon 1.png"
                alt="Users and Stores"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
              />
            </div>

            {/* بخش محتوا - راست */}
            <div className="w-full lg:w-1/2 p-5 flex flex-col justify-center items-center bg-gradient-to-br from-orange-50/50 to-pink-50/30">
              <div dir="rtl" className="w-full space-y-4">
                {/* هدر */}
                <div className="flex justify-start items-center mb-5">
                  <div className="rounded-xl p-2 mr-4 ml-2 border-2 border-orange-200 bg-gradient-to-br from-orange-100 to-pink-100 shadow-lg">
                    <BarChart3 className="w-5 h-5 text-orange-700" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">پلتفرم تجارت آنلاین</h3>

                </div>

                {/* آمار کاربران */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200/50 shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg p-2 shadow ml-3">
                        <Users className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="text-gray-600 text-xs font-medium">تعداد کاربران</div>
                        <div className="font-bold text-gray-800 text-lg">
                          {userStats ? userStats.total_users.toLocaleString() : '...'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* آمار فروشگاه‌ها */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200/50 shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg p-2 shadow ml-3">
                        <Store className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="text-gray-600 text-xs font-medium">تعداد فروشگاه‌ها</div>
                        <div className="font-bold text-gray-800 text-lg">
                          {userStats ? userStats.total_sellers.toLocaleString() : '...'}
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
        {/* کارت 3 - درآمد پروژه */}
        <div className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/40 overflow-hidden hover:shadow-2xl transition-all duration-500">
          <div className="flex flex-col lg:flex-row h-auto lg:h-80">
            {/* بخش محتوا - چپ */}
            <div dir='rtl' className="w-full lg:w-1/2 p-5 flex flex-col justify-center bg-gradient-to-br from-green-50/50 to-emerald-50/30">
              {/* هدر */}
              <div className="flex justify-start items-center mb-4">
                <div className="rounded-xl p-2 mr-4 ml-2 border-2 border-green-200 bg-gradient-to-br from-green-100 to-emerald-100 shadow-lg">
                  <TrendingUp className="w-5 h-5 text-green-700" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">درآمد کل پروژه</h3>

              </div>

              {/* درآمد کل */}
              <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-4 rounded-xl shadow-md border border-green-200/50 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-700 mb-1">
                    {totalRevenue !== null ? totalRevenue.toLocaleString() : '...'}
                  </div>
                  <div className="text-green-600 font-medium text-sm">ریال درآمد کل</div>
                </div>
              </div>

              {/* تفکیک درآمد */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gradient-to-r h-20 from-green-50 to-green-100/50 p-3 rounded-lg shadow border border-green-200/50 flex items-center">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                      <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-lg p-1.5 shadow ml-2">
                        <Package className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <span className="text-gray-700 font-medium text-xs">پلن بیسیک</span>
                        <div className="font-bold text-green-700 text-sm">
                          {planRevenue ? planRevenue.Basic.toLocaleString() : '...'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r h-20 from-purple-50 to-purple-100/50 p-3 rounded-lg shadow border border-purple-200/50 flex items-center">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                      <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg p-1.5 shadow ml-2">
                        <Crown className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <span className="text-gray-700 font-medium text-xs">پلن پرو</span>
                        <div className="font-bold text-purple-700 text-sm">
                          {planRevenue ? planRevenue.Pro.toLocaleString() : '...'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* درصد رشد */}
              <div className="mt-4 flex justify-center">
                <div className="bg-gradient-to-r from-blue-100 to-blue-200 px-4 py-2 rounded-full shadow-md border border-blue-300/50">
                  <div className="flex items-center text-blue-700">
                    <TrendingUp className="w-4 h-4 ml-2" />
                    <span className="font-bold text-sm">
                      {monthlyGrowth !== null ? `رشد ${monthlyGrowth}% نسبت به ماه قبل` : "در حال دریافت..."}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* بخش تصویر - راست */}
            <div className="w-full lg:w-1/2 h-48 lg:h-full relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-600/20 z-10"></div>
              <img
                src="/Images/sales-ecommerce 1.png"
                alt="Revenue Analytics"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </div>

      {/* نمودار درآمد بهبود یافته */}
      <div className="mt-8 bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/40">
        <div className="flex items-center justify-end mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            نمودار درآمد 6 ماه اخیر
          </h2>
          <div className="rounded-xl p-3 mr-4 ml-2 border-2 border-blue-200 bg-gradient-to-br from-blue-100 to-purple-100 shadow-lg">
            <TrendingUp className="w-6 h-6 text-blue-700" />
          </div>
        </div>
        <InteractiveChart trend={revenueTrend} />
      </div>
    </>
  );
};



// کامپوننت اصلی
export default function Dashboard() {
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', label: 'داشبورد', icon: Home },
  ];

  const renderPageContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return <DashboardPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} menuItems={menuItems} />
      <div className="ml-64 pt-20 p-6">
        {renderPageContent()}
      </div>
    </div>
  );
}
