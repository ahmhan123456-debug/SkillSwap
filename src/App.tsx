import React, { useState } from 'react';
import { Users, BookOpen, Star, Search, User, Menu, X } from 'lucide-react';

interface Skill {
  id: number;
  name: string;
  category: string;
  level: string;
  rating: number;
  instructor: string;
  description: string;
}

const mockSkills: Skill[] = [
  {
    id: 1,
    name: "تطوير المواقع",
    category: "تكنولوجيا",
    level: "متقدم",
    rating: 4.8,
    instructor: "أحمد محمد",
    description: "تعلم تطوير المواقع باستخدام React و Node.js"
  },
  {
    id: 2,
    name: "التصميم الجرافيكي",
    category: "تصميم",
    level: "متوسط",
    rating: 4.6,
    instructor: "فاطمة علي",
    description: "أساسيات التصميم الجرافيكي والإبداع البصري"
  },
  {
    id: 3,
    name: "التسويق الرقمي",
    category: "تسويق",
    level: "مبتدئ",
    rating: 4.7,
    instructor: "محمد حسن",
    description: "استراتيجيات التسويق الرقمي ووسائل التواصل الاجتماعي"
  },
  {
    id: 4,
    name: "اللغة الإنجليزية",
    category: "لغات",
    level: "متوسط",
    rating: 4.9,
    instructor: "سارة أحمد",
    description: "تحسين مهارات اللغة الإنجليزية للمحادثة والكتابة"
  }
];

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const categories = ['الكل', 'تكنولوجيا', 'تصميم', 'تسويق', 'لغات'];

  const filteredSkills = mockSkills.filter(skill => {
    const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         skill.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'الكل' || skill.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4 space-x-reverse">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">منصة تبادل المهارات</h1>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8 space-x-reverse">
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">الرئيسية</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">المهارات</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">المدربين</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">حول المنصة</a>
            </nav>

            <div className="hidden md:flex items-center space-x-4 space-x-reverse">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                تسجيل الدخول
              </button>
              <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
                إنشاء حساب
              </button>
            </div>

            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-2 space-y-2">
              <a href="#" className="block py-2 text-gray-700">الرئيسية</a>
              <a href="#" className="block py-2 text-gray-700">المهارات</a>
              <a href="#" className="block py-2 text-gray-700">المدربين</a>
              <a href="#" className="block py-2 text-gray-700">حول المنصة</a>
              <div className="pt-2 space-y-2">
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg">تسجيل الدخول</button>
                <button className="w-full border border-blue-600 text-blue-600 py-2 rounded-lg">إنشاء حساب</button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            تعلم مهارات جديدة وشارك خبراتك
          </h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            منصة تبادل المهارات الأولى في العالم العربي
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <button className="w-full sm:w-auto bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              ابدأ التعلم الآن
            </button>
            <button className="w-full sm:w-auto border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              شارك مهاراتك
            </button>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="ابحث عن مهارة أو مدرب..."
                className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSkills.map((skill) => (
              <div key={skill.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {skill.category}
                    </span>
                    <span className="text-sm text-gray-500">{skill.level}</span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{skill.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{skill.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <User className="h-4 w-4 text-gray-400 ml-1" />
                      <span className="text-sm text-gray-600">{skill.instructor}</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 ml-1" />
                      <span className="text-sm font-medium">{skill.rating}</span>
                    </div>
                  </div>
                  
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                    عرض التفاصيل
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-gray-900 mb-2">10,000+</h3>
              <p className="text-gray-600">مستخدم نشط</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <BookOpen className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-gray-900 mb-2">500+</h3>
              <p className="text-gray-600">مهارة متاحة</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <Star className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-gray-900 mb-2">4.8</h3>
              <p className="text-gray-600">تقييم المنصة</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 space-x-reverse mb-4">
                <BookOpen className="h-8 w-8 text-blue-400" />
                <h3 className="text-xl font-bold">منصة تبادل المهارات</h3>
              </div>
              <p className="text-gray-400">
                المنصة الأولى في العالم العربي لتبادل المهارات والخبرات
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">روابط سريعة</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">الرئيسية</a></li>
                <li><a href="#" className="hover:text-white transition-colors">المهارات</a></li>
                <li><a href="#" className="hover:text-white transition-colors">المدربين</a></li>
                <li><a href="#" className="hover:text-white transition-colors">حول المنصة</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">الدعم</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">مركز المساعدة</a></li>
                <li><a href="#" className="hover:text-white transition-colors">اتصل بنا</a></li>
                <li><a href="#" className="hover:text-white transition-colors">الأسئلة الشائعة</a></li>
                <li><a href="#" className="hover:text-white transition-colors">سياسة الخصوصية</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">تابعنا</h4>
              <p className="text-gray-400 mb-4">
                ابق على اطلاع بآخر المهارات والدورات
              </p>
              <div className="flex space-x-4 space-x-reverse">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">فيسبوك</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">تويتر</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">لينكد إن</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 منصة تبادل المهارات. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;