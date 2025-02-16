import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      welcome: 'Welcome to Influencer Management System',
      login: 'Login',
      register: 'Register',
      email: 'Email',
      password: 'Password',
      dashboard: 'Dashboard',
      endorsements: 'Endorsements',
      profile: 'Profile',
      logout: 'Logout',
      addEndorsement: 'Add Endorsement',
      editEndorsement: 'Edit Endorsement',
      deleteEndorsement: 'Delete Endorsement',
      brand: 'Brand',
      amount: 'Amount',
      status: 'Status',
      date: 'Date',
      streamline_your_influencer_business: 'Streamline your influencer business with our powerful endorsement management platform',
      track_earnings: 'Track Earnings',
      keep_track_of_all_your_endorsement_deals: 'Keep track of all your endorsement deals and earnings in one place',
      analytics: 'Analytics',
      get_insights_into_your_performance: 'Get insights into your performance and growth over time',
      brand_management: 'Brand Management',
      manage_your_brand_relationships: 'Manage your brand relationships and collaborations efficiently',
      no_data_found: 'No data found',
      totalEarnings: 'Total Earnings',
      earningsLast3Months: 'Earnings Last 3 Months',
      earningsLast6Months: 'Earnings Last 6 Months',
      earningsLast12Months: 'Earnings Last 12 Months'
    }
  },
  id: {
    translation: {
      welcome: 'Selamat Datang di Sistem Manajemen Influencer',
      login: 'Masuk',
      register: 'Daftar',
      email: 'Email',
      password: 'Kata Sandi',
      dashboard: 'Dashboard',
      endorsements: 'Endorsement',
      profile: 'Profil',
      logout: 'Keluar',
      addEndorsement: 'Tambah Endorsement',
      editEndorsement: 'Edit Endorsement',
      deleteEndorsement: 'Hapus Endorsement',
      brand: 'Merek',
      amount: 'Jumlah',
      status: 'Status',
      date: 'Tanggal',
      streamline_your_influencer_business: 'Permudah bisnis influencer Anda dengan platform manajemen endorsement kami yang kuat',
      track_earnings: 'Lacak Penghasilan',
      keep_track_of_all_your_endorsement_deals: 'Lacak semua kesepakatan dan penghasilan endorsement Anda di satu tempat',
      analytics: 'Analitik',
      get_insights_into_your_performance: 'Dapatkan wawasan tentang kinerja dan pertumbuhan Anda dari waktu ke waktu',
      brand_management: 'Manajemen Merek',
      manage_your_brand_relationships: 'Kelola hubungan dan kolaborasi merek Anda dengan efisien',
      no_data_found: 'Data tidak ditemukan',
      totalEarnings: 'Total Penghasilan',
      earningsLast3Months: 'Penghasilan 3 Bulan Terakhir',
      earningsLast6Months: 'Penghasilan 6 Bulan Terakhir',
      earningsLast12Months: 'Penghasilan 12 Bulan Terakhir'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'id',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;