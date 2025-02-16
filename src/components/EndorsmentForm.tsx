import { useEndorsementStore } from '../stores/endorsementStore';
import { useAuthStore } from '../stores/authStore';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function EndorsementForm({ mode = 'add' }: { mode?: 'add' | 'edit' }) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const endorsements = useEndorsementStore((state) => state.endorsements);
    const addEndorsement = useEndorsementStore((state) => state.addEndorsement);
    const updateEndorsement = useEndorsementStore((state) => state.updateEndorsement);
    const user = useAuthStore((state) => state.user);
  
    const [formData, setFormData] = useState({
      brand: '',
      amount: '',
      status: 'pending',
      date: new Date().toISOString().split('T')[0]
    });
  
    useEffect(() => {
      if (mode === 'edit' && id) {
        const endorsement = endorsements.find((e) => e.id === id);
        if (endorsement) {
          setFormData({
            brand: endorsement.brand,
            amount: endorsement.amount.toString(),
            status: endorsement.status,
            date: endorsement.date
          });
        }
      }
    }, [mode, id, endorsements]);
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        if (mode === 'add') {
          await addEndorsement({
            brand: formData.brand,
            amount: Number(formData.amount),
            status: formData.status,
            date: formData.date,
            user_id: user?.id,
            language: ''
          });
        } else {
          await updateEndorsement(id!, {
            brand: formData.brand,
            amount: Number(formData.amount),
            status: formData.status,
            date: formData.date
          });
        }
        navigate('/dashboard');
      } catch (error) {
        console.error('Error saving endorsement:', error);
      }
    };
  
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 border border-gray-100">
        <h2 className="text-2xl font-bold mb-8 text-gray-900">
          {mode === 'add' ? t('addEndorsement') : t('editEndorsement')}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('brand')}
            </label>
            <input
              type="text"
              value={formData.brand}
              onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
              className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:border-purple-500 focus:ring-purple-500 transition-colors duration-150"
              required
            />
          </div>
  
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('amount')}
            </label>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:border-purple-500 focus:ring-purple-500 transition-colors duration-150"
              required
            />
          </div>
  
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('status')}
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:border-purple-500 focus:ring-purple-500 transition-colors duration-150"
            >
              <option value="pending">{t('pending')}</option>
              <option value="completed">{t('completed')}</option>
              <option value="cancelled">{t('cancelled')}</option>
            </select>
          </div>
  
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('date')}
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:border-purple-500 focus:ring-purple-500 transition-colors duration-150"
              required
            />
          </div>
  
          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-150"
            >
              {t('cancel')}
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-150"
            >
              {mode === 'add' ? t('create') : t('update')}
            </button>
          </div>
        </form>
      </div>
    );
  }