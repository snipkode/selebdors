import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Instagram,
  LogOut,
  Plus,
  DollarSign,
  User,
  Layout,
  TrendingUp,
  TrendingDown,
  BarChart2
} from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { useEndorsementStore } from '../stores/endorsementStore';
import { EndorsementList } from '../components/EndorsmentList';
import EndorsementForm from '../components/EndorsmentForm';

function Dashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const signOut = useAuthStore((state) => state.signOut);
  const user = useAuthStore((state) => state.user);
  const endorsements = useEndorsementStore((state) => state.endorsements);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const totalEarnings = endorsements.reduce((total, endorsement) => total + endorsement.amount, 0);

  /**
   * Calculates total earnings from endorsements within a specified number of months from now
   * 
   * @param months - Number of months to look back
   * @param endorsements - Array of endorsement objects with date and amount
   * @returns Total earnings in the specified period
   * @throws Error if months is negative or if endorsements array is invalid
   */
  const getEarningsInLastMonths = (months: number): number => {
    // Input validation
    if (months < 0) {
      throw new Error('Months parameter must be non-negative');
    }
    if (!Array.isArray(endorsements)) {
      throw new Error('Endorsements must be an array');
    }
  
    const now = new Date();
    const pastDate = new Date(now);
    pastDate.setMonth(now.getMonth() - months);
  
    return endorsements
      .filter(({ date }) => {
        // Handle both string and Date objects
        const endorsementDate = (date as any) instanceof Date ? date : new Date(date);
        
        // Validate date
        if (!(endorsementDate instanceof Date && !isNaN(endorsementDate.getTime()))) {
          throw new Error('Invalid date format in endorsement');
        }
  
        return endorsementDate >= pastDate;
      })
      .reduce((total, { amount }) => {
        // Validate amount
        if (typeof amount !== 'number' || isNaN(amount)) {
          throw new Error('Invalid amount in endorsement');
        }
        return total + amount;
      }, 0);
  };

  const earningsLast3Months = getEarningsInLastMonths(3);
  const earningsLast6Months = getEarningsInLastMonths(6);
  const earningsLast12Months = getEarningsInLastMonths(12);

  console.log(earningsLast3Months, earningsLast6Months, earningsLast12Months);  

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <nav className="bg-white shadow-lg w-72 border-r border-gray-100">
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between h-20 px-6 border-b border-gray-100">
            <div className="flex items-center">
              <div className="bg-purple-50 p-2 rounded-lg">
                <Instagram className="w-8 h-8 text-purple-600" />
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900">
                {t('dashboard')}
              </span>
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-between p-6">
            <div>
              <div className="flex items-center space-x-3 mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="bg-white p-2 rounded-lg">
                  <User className="w-5 h-5 text-gray-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">{user?.email}</span>
              </div>
              <Link
                to="/dashboard"
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-150 ${
                  location.pathname === '/dashboard' ? 'bg-purple-50 text-purple-700' : ''
                }`}
              >
                <Layout className="w-5 h-5" />
                <span>{t('endorsements')}</span>
              </Link>
              <Link
                to="/dashboard/add"
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-150 ${
                  location.pathname === '/dashboard/add' ? 'bg-purple-50 text-purple-700' : ''
                }`}
              >
                <Plus className="w-5 h-5" />
                <span>{t('addEndorsement')}</span>
              </Link>
            </div>
            <div>
              <button
                onClick={handleSignOut}
                className="w-full inline-flex items-center justify-center px-4 py-3 rounded-lg text-white bg-purple-600 hover:bg-purple-700 transition-colors duration-150"
              >
                <LogOut className="w-4 h-4 mr-2" />
                {t('logout')}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t('dashboard')}</h1>
        </header>
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
            <DollarSign className="w-8 h-8 text-green-500 mr-4" />
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">{t('totalEarnings')}</h2>
              <p className="text-2xl font-semibold text-gray-700">
                {new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR'
                }).format(totalEarnings)}
              </p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
            <TrendingUp className="w-8 h-8 text-blue-500 mr-4" />
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">{t('earningsLast3Months')}</h2>
              <p className="text-2xl font-semibold text-gray-700">
                {new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR'
                }).format(earningsLast3Months)}
              </p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
            <TrendingDown className="w-8 h-8 text-yellow-500 mr-4" />
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">{t('earningsLast6Months')}</h2>
              <p className="text-2xl font-semibold text-gray-700">
                {new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR'
                }).format(earningsLast6Months)}
              </p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
            <BarChart2 className="w-8 h-8 text-purple-500 mr-4" />
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">{t('earningsLast12Months')}</h2>
              <p className="text-2xl font-semibold text-gray-700">
                {new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR'
                }).format(earningsLast12Months)}
              </p>
            </div>
          </div>
        </div>
        <Routes>
          <Route path="/" element={<EndorsementList />} />
          <Route path="/add" element={<EndorsementForm mode="add" />} />
          <Route path="/edit/:id" element={<EndorsementForm mode="edit" />} />
        </Routes>
      </main>
    </div>
  );
}

export default Dashboard;