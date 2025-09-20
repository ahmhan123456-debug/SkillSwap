import React, { useState } from 'react';
import { Users, BookOpen, Star, Search, User, Menu, X, Globe, Plus, MessageCircle, Briefcase, UserPlus, Building } from 'lucide-react';

interface Skill {
  id: number;
  name: { en: string; ar: string };
  category: { en: string; ar: string };
  level: { en: string; ar: string };
  rating: number;
  instructor: { en: string; ar: string };
  description: { en: string; ar: string };
}

interface HelpRequest {
  id: number;
  title: { en: string; ar: string };
  type: 'project' | 'learning';
  skill: { en: string; ar: string };
  description: { en: string; ar: string };
  requester: { en: string; ar: string };
  urgency: { en: string; ar: string };
  duration: string;
}

interface JobPosting {
  id: number;
  title: { en: string; ar: string };
  company: { en: string; ar: string };
  location: { en: string; ar: string };
  type: { en: string; ar: string };
  skills: { en: string[]; ar: string[] };
  description: { en: string; ar: string };
  salary: string;
}

const mockSkills: Skill[] = [
  {
    id: 1,
    name: { en: "Web Development", ar: "تطوير المواقع" },
    category: { en: "Technology", ar: "تكنولوجيا" },
    level: { en: "Advanced", ar: "متقدم" },
    rating: 4.8,
    instructor: { en: "Ahmed Mohamed", ar: "أحمد محمد" },
    description: { en: "Learn web development using React and Node.js", ar: "تعلم تطوير المواقع باستخدام React و Node.js" }
  },
  {
    id: 2,
    name: { en: "Graphic Design", ar: "التصميم الجرافيكي" },
    category: { en: "Design", ar: "تصميم" },
    level: { en: "Intermediate", ar: "متوسط" },
    rating: 4.6,
    instructor: { en: "Fatima Ali", ar: "فاطمة علي" },
    description: { en: "Graphic design fundamentals and visual creativity", ar: "أساسيات التصميم الجرافيكي والإبداع البصري" }
  },
  {
    id: 3,
    name: { en: "Digital Marketing", ar: "التسويق الرقمي" },
    category: { en: "Marketing", ar: "تسويق" },
    level: { en: "Beginner", ar: "مبتدئ" },
    rating: 4.7,
    instructor: { en: "Mohamed Hassan", ar: "محمد حسن" },
    description: { en: "Digital marketing strategies and social media", ar: "استراتيجيات التسويق الرقمي ووسائل التواصل الاجتماعي" }
  },
  {
    id: 4,
    name: { en: "English Language", ar: "اللغة الإنجليزية" },
    category: { en: "Languages", ar: "لغات" },
    level: { en: "Intermediate", ar: "متوسط" },
    rating: 4.9,
    instructor: { en: "Sarah Ahmed", ar: "سارة أحمد" },
    description: { en: "Improve English conversation and writing skills", ar: "تحسين مهارات اللغة الإنجليزية للمحادثة والكتابة" }
  }
];

const mockHelpRequests: HelpRequest[] = [
  {
    id: 1,
    title: { en: "Need help with React project", ar: "أحتاج مساعدة في مشروع React" },
    type: 'project',
    skill: { en: "Frontend Development", ar: "تطوير الواجهات الأمامية" },
    description: { en: "Looking for someone to help me debug my React application", ar: "أبحث عن شخص لمساعدتي في إصلاح تطبيق React" },
    requester: { en: "John Smith", ar: "جون سميث" },
    urgency: { en: "High", ar: "عالية" },
    duration: "30 min"
  },
  {
    id: 2,
    title: { en: "Learn Photoshop basics", ar: "تعلم أساسيات الفوتوشوب" },
    type: 'learning',
    skill: { en: "Graphic Design", ar: "التصميم الجرافيكي" },
    description: { en: "Complete beginner looking to learn Photoshop fundamentals", ar: "مبتدئ تماماً أريد تعلم أساسيات الفوتوشوب" },
    requester: { en: "Lisa Johnson", ar: "ليزا جونسون" },
    urgency: { en: "Medium", ar: "متوسطة" },
    duration: "45 min"
  }
];

const mockJobs: JobPosting[] = [
  {
    id: 1,
    title: { en: "Frontend Developer", ar: "مطور واجهات أمامية" },
    company: { en: "TechCorp", ar: "تك كورب" },
    location: { en: "Remote", ar: "عن بُعد" },
    type: { en: "Full-time", ar: "دوام كامل" },
    skills: { 
      en: ["React", "JavaScript", "CSS"], 
      ar: ["ريأكت", "جافا سكريبت", "سي إس إس"] 
    },
    description: { en: "Join our team as a Frontend Developer", ar: "انضم إلى فريقنا كمطور واجهات أمامية" },
    salary: "$60,000 - $80,000"
  },
  {
    id: 2,
    title: { en: "UX Designer", ar: "مصمم تجربة مستخدم" },
    company: { en: "DesignStudio", ar: "استوديو التصميم" },
    location: { en: "New York", ar: "نيويورك" },
    type: { en: "Contract", ar: "عقد مؤقت" },
    skills: { 
      en: ["Figma", "User Research", "Prototyping"], 
      ar: ["فيجما", "بحث المستخدمين", "النماذج الأولية"] 
    },
    description: { en: "Create amazing user experiences", ar: "اصنع تجارب مستخدم رائعة" },
    salary: "$50/hour"
  }
];

type Language = 'en' | 'ar';
type ActiveSection = 'skills' | 'help' | 'groups' | 'jobs';

function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<ActiveSection>('skills');

  const isRTL = language === 'ar';

  const translations = {
    en: {
      title: "SkillSwap Platform",
      nav: {
        home: "Home",
        skills: "Skills",
        help: "Help Requests",
        groups: "Groups",
        jobs: "Job Opportunities",
        about: "About"
      },
      auth: {
        login: "Login",
        signup: "Sign Up",
        registerAs: "Register as",
        individual: "Individual User",
        company: "Company"
      },
      hero: {
        title: "Learn New Skills and Share Your Expertise",
        subtitle: "The first skill-sharing platform connecting learners and experts",
        startLearning: "Start Learning",
        shareSkills: "Share Your Skills"
      },
      search: {
        placeholder: "Search for skills or instructors...",
        categories: {
          all: "All",
          technology: "Technology",
          design: "Design",
          marketing: "Marketing",
          languages: "Languages"
        }
      },
      skills: {
        viewDetails: "View Details",
        instructor: "Instructor",
        rating: "Rating"
      },
      help: {
        title: "Help Requests",
        createRequest: "Create Request",
        projectHelp: "Project Help",
        learningHelp: "Learning Help",
        offerHelp: "Offer Help",
        requester: "Requester",
        urgency: "Urgency",
        duration: "Duration"
      },
      jobs: {
        title: "Job Opportunities",
        postJob: "Post Job",
        company: "Company",
        location: "Location",
        type: "Type",
        skills: "Required Skills",
        salary: "Salary",
        applyNow: "Apply Now"
      },
      groups: {
        title: "Groups",
        createGroup: "Create Group",
        joinGroup: "Join Group",
        members: "members"
      },
      stats: {
        activeUsers: "Active Users",
        availableSkills: "Available Skills",
        platformRating: "Platform Rating"
      },
      footer: {
        description: "The first skill-sharing platform in the Arab world",
        quickLinks: "Quick Links",
        support: "Support",
        helpCenter: "Help Center",
        contactUs: "Contact Us",
        faq: "FAQ",
        privacy: "Privacy Policy",
        followUs: "Follow Us",
        stayUpdated: "Stay updated with the latest skills and courses",
        rights: "All rights reserved."
      }
    },
    ar: {
      title: "منصة تبادل المهارات",
      nav: {
        home: "الرئيسية",
        skills: "المهارات",
        help: "طلبات المساعدة",
        groups: "المجموعات",
        jobs: "الوظائف",
        about: "حول المنصة"
      },
      auth: {
        login: "تسجيل الدخول",
        signup: "إنشاء حساب",
        registerAs: "التسجيل كـ",
        individual: "مستخدم فردي",
        company: "شركة"
      },
      hero: {
        title: "تعلم مهارات جديدة وشارك خبراتك",
        subtitle: "منصة تبادل المهارات الأولى التي تربط المتعلمين بالخبراء",
        startLearning: "ابدأ التعلم الآن",
        shareSkills: "شارك مهاراتك"
      },
      search: {
        placeholder: "ابحث عن مهارة أو مدرب...",
        categories: {
          all: "الكل",
          technology: "تكنولوجيا",
          design: "تصميم",
          marketing: "تسويق",
          languages: "لغات"
        }
      },
      skills: {
        viewDetails: "عرض التفاصيل",
        instructor: "المدرب",
        rating: "التقييم"
      },
      help: {
        title: "طلبات المساعدة",
        createRequest: "إنشاء طلب",
        projectHelp: "مساعدة في المشاريع",
        learningHelp: "مساعدة في التعلم",
        offerHelp: "تقديم المساعدة",
        requester: "الطالب",
        urgency: "الأولوية",
        duration: "المدة"
      },
      jobs: {
        title: "الوظائف",
        postJob: "نشر وظيفة",
        company: "الشركة",
        location: "الموقع",
        type: "النوع",
        skills: "المهارات المطلوبة",
        salary: "الراتب",
        applyNow: "تقدم الآن"
      },
      groups: {
        title: "المجموعات",
        createGroup: "إنشاء مجموعة",
        joinGroup: "انضم للمجموعة",
        members: "عضو"
      },
      stats: {
        activeUsers: "مستخدم نشط",
        availableSkills: "مهارة متاحة",
        platformRating: "تقييم المنصة"
      },
      footer: {
        description: "منصة تبادل المهارات الأولى في العالم العربي",
        quickLinks: "روابط سريعة",
        support: "الدعم",
        helpCenter: "مركز المساعدة",
        contactUs: "اتصل بنا",
        faq: "الأسئلة الشائعة",
        privacy: "سياسة الخصوصية",
        followUs: "تابعنا",
        stayUpdated: "ابق على اطلاع بآخر المهارات والدورات",
        rights: "جميع الحقوق محفوظة."
      }
    }
  };

  const t = translations[language];
  const categories = [
    t.search.categories.all,
    t.search.categories.technology,
    t.search.categories.design,
    t.search.categories.marketing,
    t.search.categories.languages
  ];

  const filteredSkills = mockSkills.filter(skill => {
    const matchesSearch = skill.name[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
                         skill.instructor[language].toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === t.search.categories.all || skill.category[language] === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  const renderSkillsSection = () => (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5`} />
            <input
              type="text"
              placeholder={t.search.placeholder}
              className={`w-full ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSkills.map((skill) => (
            <div key={skill.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {skill.category[language]}
                  </span>
                  <span className="text-sm text-gray-500">{skill.level[language]}</span>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{skill.name[language]}</h3>
                <p className="text-gray-600 text-sm mb-4">{skill.description[language]}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <User className={`h-4 w-4 text-gray-400 ${isRTL ? 'ml-1' : 'mr-1'}`} />
                    <span className="text-sm text-gray-600">{skill.instructor[language]}</span>
                  </div>
                  <div className="flex items-center">
                    <Star className={`h-4 w-4 text-yellow-400 ${isRTL ? 'ml-1' : 'mr-1'}`} />
                    <span className="text-sm font-medium">{skill.rating}</span>
                  </div>
                </div>
                
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                  {t.skills.viewDetails}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const renderHelpSection = () => (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">{t.help.title}</h2>
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
            <Plus className="h-5 w-5" />
            {t.help.createRequest}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-orange-600">{t.help.projectHelp}</h3>
            <div className="space-y-4">
              {mockHelpRequests.filter(req => req.type === 'project').map((request) => (
                <div key={request.id} className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">{request.title[language]}</h4>
                  <p className="text-gray-600 text-sm mb-3">{request.description[language]}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                    <span>{t.help.requester}: {request.requester[language]}</span>
                    <span>{t.help.urgency}: {request.urgency[language]}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">
                      {request.skill[language]}
                    </span>
                    <button className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition-colors">
                      {t.help.offerHelp}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 text-purple-600">{t.help.learningHelp}</h3>
            <div className="space-y-4">
              {mockHelpRequests.filter(req => req.type === 'learning').map((request) => (
                <div key={request.id} className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">{request.title[language]}</h4>
                  <p className="text-gray-600 text-sm mb-3">{request.description[language]}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                    <span>{t.help.requester}: {request.requester[language]}</span>
                    <span>{t.help.duration}: {request.duration}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">
                      {request.skill[language]}
                    </span>
                    <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors">
                      {t.help.offerHelp}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const renderJobsSection = () => (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">{t.jobs.title}</h2>
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            {t.jobs.postJob}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mockJobs.map((job) => (
            <div key={job.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{job.title[language]}</h3>
                  <p className="text-gray-600">{job.company[language]}</p>
                </div>
                <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                  {job.type[language]}
                </span>
              </div>

              <p className="text-gray-600 mb-4">{job.description[language]}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-500">
                  <span className="font-medium">{t.jobs.location}:</span>
                  <span className={isRTL ? 'mr-2' : 'ml-2'}>{job.location[language]}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="font-medium">{t.jobs.salary}:</span>
                  <span className={isRTL ? 'mr-2' : 'ml-2'}>{job.salary}</span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">{t.jobs.skills}:</p>
                <div className="flex flex-wrap gap-2">
                  {job.skills[language].map((skill, index) => (
                    <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
                  {t.jobs.applyNow}
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <MessageCircle className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const renderGroupsSection = () => (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">{t.groups.title}</h2>
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
            <Users className="h-5 w-5" />
            {t.groups.createGroup}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((groupId) => (
            <div key={groupId} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {language === 'en' ? `Tech Group ${groupId}` : `مجموعة التقنية ${groupId}`}
                </h3>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                  {Math.floor(Math.random() * 100) + 50} {t.groups.members}
                </span>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">
                {language === 'en' 
                  ? "A community for tech enthusiasts to share knowledge and collaborate on projects."
                  : "مجتمع لعشاق التقنية لتبادل المعرفة والتعاون في المشاريع."
                }
              </p>
              
              <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                {t.groups.joinGroup}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  return (
    <div className={`min-h-screen bg-gray-50 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className={`flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
              <BookOpen className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">{t.title}</h1>
            </div>
            
            <nav className={`hidden md:flex items-center space-x-8 ${isRTL ? 'space-x-reverse' : ''}`}>
              <button 
                onClick={() => setActiveSection('skills')}
                className={`transition-colors ${activeSection === 'skills' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
              >
                {t.nav.skills}
              </button>
              <button 
                onClick={() => setActiveSection('help')}
                className={`transition-colors ${activeSection === 'help' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
              >
                {t.nav.help}
              </button>
              <button 
                onClick={() => setActiveSection('groups')}
                className={`transition-colors ${activeSection === 'groups' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
              >
                {t.nav.groups}
              </button>
              <button 
                onClick={() => setActiveSection('jobs')}
                className={`transition-colors ${activeSection === 'jobs' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
              >
                {t.nav.jobs}
              </button>
            </nav>

            <div className={`hidden md:flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <Globe className="h-4 w-4" />
                {language === 'en' ? 'العربية' : 'English'}
              </button>
              
              <div className="flex gap-2">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  {t.auth.individual}
                </button>
                <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  {t.auth.company}
                </button>
              </div>
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
              <button 
                onClick={() => { setActiveSection('skills'); setIsMenuOpen(false); }}
                className="block w-full text-left py-2 text-gray-700"
              >
                {t.nav.skills}
              </button>
              <button 
                onClick={() => { setActiveSection('help'); setIsMenuOpen(false); }}
                className="block w-full text-left py-2 text-gray-700"
              >
                {t.nav.help}
              </button>
              <button 
                onClick={() => { setActiveSection('groups'); setIsMenuOpen(false); }}
                className="block w-full text-left py-2 text-gray-700"
              >
                {t.nav.groups}
              </button>
              <button 
                onClick={() => { setActiveSection('jobs'); setIsMenuOpen(false); }}
                className="block w-full text-left py-2 text-gray-700"
              >
                {t.nav.jobs}
              </button>
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 py-2 text-gray-700"
              >
                <Globe className="h-4 w-4" />
                {language === 'en' ? 'العربية' : 'English'}
              </button>
              <div className="pt-2 space-y-2">
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  {t.auth.individual}
                </button>
                <button className="w-full border border-blue-600 text-blue-600 py-2 rounded-lg flex items-center justify-center gap-2">
                  <Building className="h-4 w-4" />
                  {t.auth.company}
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            {t.hero.title}
          </h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            {t.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <button className="w-full sm:w-auto bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              {t.hero.startLearning}
            </button>
            <button className="w-full sm:w-auto border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              {t.hero.shareSkills}
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      {activeSection === 'skills' && renderSkillsSection()}
      {activeSection === 'help' && renderHelpSection()}
      {activeSection === 'groups' && renderGroupsSection()}
      {activeSection === 'jobs' && renderJobsSection()}

      {/* Stats Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-gray-900 mb-2">10,000+</h3>
              <p className="text-gray-600">{t.stats.activeUsers}</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <BookOpen className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-gray-900 mb-2">500+</h3>
              <p className="text-gray-600">{t.stats.availableSkills}</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <Star className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-gray-900 mb-2">4.8</h3>
              <p className="text-gray-600">{t.stats.platformRating}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''} mb-4`}>
                <BookOpen className="h-8 w-8 text-blue-400" />
                <h3 className="text-xl font-bold">{t.title}</h3>
              </div>
              <p className="text-gray-400">
                {t.footer.description}
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">{t.footer.quickLinks}</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => setActiveSection('skills')} className="hover:text-white transition-colors">{t.nav.skills}</button></li>
                <li><button onClick={() => setActiveSection('help')} className="hover:text-white transition-colors">{t.nav.help}</button></li>
                <li><button onClick={() => setActiveSection('groups')} className="hover:text-white transition-colors">{t.nav.groups}</button></li>
                <li><button onClick={() => setActiveSection('jobs')} className="hover:text-white transition-colors">{t.nav.jobs}</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">{t.footer.support}</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">{t.footer.helpCenter}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t.footer.contactUs}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t.footer.faq}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t.footer.privacy}</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">{t.footer.followUs}</h4>
              <p className="text-gray-400 mb-4">
                {t.footer.stayUpdated}
              </p>
              <div className={`flex space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Facebook</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">LinkedIn</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 {t.title}. {t.footer.rights}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;