import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Instagram, DollarSign, BarChart2, Users } from 'lucide-react';

function LandingPage() {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'id' ? 'en' : 'id';
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-500 to-blue-500">
      <div className="relative overflow-hidden">
        {/* Language Toggle Button */}
        <button
          onClick={toggleLanguage}
          className="absolute top-4 right-4 px-4 py-2 bg-white text-purple-600 rounded-full shadow-lg hover:bg-purple-50 transition-all"
        >
          {i18n.language === 'id' ? 'EN' : 'ID'}
        </button>

        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
          <div className="animate-fade-in">
            <Instagram className="w-24 h-24 mx-auto text-white mb-8 animate-bounce" />
            <h1 className="text-6xl font-extrabold text-white mb-6 tracking-tight">
              {t('welcome')}
            </h1>
            <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
              {t('streamline_your_influencer_business')}
            </p>
            <div className="space-x-6">
              <Link
                to="/login"
                className="inline-flex items-center px-8 py-4 rounded-full text-lg font-semibold bg-white text-purple-600 hover:bg-purple-50 transition-all transform hover:scale-105 shadow-lg"
              >
                {t('login')}
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center px-8 py-4 rounded-full text-lg font-semibold border-2 border-white text-white hover:bg-white hover:text-purple-600 transition-all transform hover:scale-105"
              >
                {t('register')}
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-white transform transition-all hover:scale-105 hover:bg-white/20">
              <DollarSign className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-bold mb-4">{t('track_earnings')}</h3>
              <p className="text-white/80">
                {t('keep_track_of_all_your_endorsement_deals')}
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-white transform transition-all hover:scale-105 hover:bg-white/20">
              <BarChart2 className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-bold mb-4">{t('analytics')}</h3>
              <p className="text-white/80">
                {t('get_insights_into_your_performance')}
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-white transform transition-all hover:scale-105 hover:bg-white/20">
              <Users className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-bold mb-4">{t('brand_management')}</h3>
              <p className="text-white/80">
                {t('manage_your_brand_relationships')}
              </p>
            </div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;