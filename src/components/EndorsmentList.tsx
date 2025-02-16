import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  DollarSign,
  Calendar,
  Briefcase,
  CheckCircle,
  XCircle,
  Edit2,
  Trash2,
} from 'lucide-react';
import { useEndorsementStore } from '../stores/endorsementStore';

export function EndorsementList() {
  const { t } = useTranslation();
  const endorsements = useEndorsementStore((state) => state.endorsements);
  const fetchEndorsements = useEndorsementStore((state) => state.fetchEndorsements);
  const deleteEndorsement = useEndorsementStore((state) => state.deleteEndorsement);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const endorsementsPerPage = 5;

  useEffect(() => {
    setLoading(true);
    fetchEndorsements().finally(() => setLoading(false));
  }, [fetchEndorsements]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (endorsements.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-gray-500 text-lg">{t('no_data_found')}</p>
      </div>
    );
  }

  const indexOfLastEndorsement = currentPage * endorsementsPerPage;
  const indexOfFirstEndorsement = indexOfLastEndorsement - endorsementsPerPage;
  const currentEndorsements = endorsements.slice(indexOfFirstEndorsement, indexOfLastEndorsement);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-100">
          <thead className="bg-gray-50/50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                {t('brand')}
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                {t('amount')}
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                {t('status')}
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                {t('date')}
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                {t('actions')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-50">
            {currentEndorsements.map((endorsement) => (
              <tr key={endorsement.id} className="hover:bg-gray-50/50 transition-colors duration-150">
                <td className="px-6 py-5 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="bg-purple-50 p-2 rounded-lg mr-3">
                      <Briefcase className="w-5 h-5 text-purple-500" />
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {endorsement.brand}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-5 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="bg-green-50 p-2 rounded-lg mr-3">
                      <DollarSign className="w-5 h-5 text-green-500" />
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: 'IDR'
                      }).format(endorsement.amount)}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-5 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      endorsement.status === 'completed'
                        ? 'bg-green-50 text-green-700'
                        : endorsement.status === 'pending'
                        ? 'bg-yellow-50 text-yellow-700'
                        : 'bg-red-50 text-red-700'
                    }`}
                  >
                    {endorsement.status === 'completed' ? (
                      <CheckCircle className="w-4 h-4 mr-2" />
                    ) : endorsement.status === 'pending' ? (
                      <Calendar className="w-4 h-4 mr-2" />
                    ) : (
                      <XCircle className="w-4 h-4 mr-2" />
                    )}
                    {t(endorsement.status)}
                  </span>
                </td>
                <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-600">
                  {new Date(endorsement.date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </td>
                <td className="px-6 py-5 whitespace-nowrap text-right text-sm font-medium">
                  <Link
                    to={`/dashboard/edit/${endorsement.id}`}
                    className="text-purple-600 hover:text-purple-900 mr-4 p-2 hover:bg-purple-50 rounded-lg transition-colors duration-150"
                  >
                    <Edit2 className="w-5 h-5 inline" />
                  </Link>
                  <button
                    onClick={() => deleteEndorsement(endorsement.id)}
                    className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-lg transition-colors duration-150"
                  >
                    <Trash2 className="w-5 h-5 inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center py-4">
        <nav>
          <ul className="inline-flex items-center -space-x-px">
            <li>
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 leading-tight bg-white text-gray-500 border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                &laquo;
              </button>
            </li>
            {Array.from({ length: Math.ceil(endorsements.length / endorsementsPerPage) }, (_, i) => (
              <li key={i}>
                <button
                  onClick={() => paginate(i + 1)}
                  className={`px-3 py-2 leading-tight ${currentPage === i + 1 ? 'bg-purple-600 text-white' : 'bg-white text-gray-500'} border border-gray-300 hover:bg-gray-100 hover:text-gray-700`}
                >
                  {i + 1}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === Math.ceil(endorsements.length / endorsementsPerPage)}
                className="px-3 py-2 leading-tight bg-white text-gray-500 border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                &raquo;
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
