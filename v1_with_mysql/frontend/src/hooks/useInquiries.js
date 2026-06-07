import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';

export const useInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  const fetchInquiries = useCallback(async () => {
    try {
      const { data } = await api.get('inquiries/');
      setInquiries(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchInquiries(); }, [fetchInquiries]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this inquiry?')) return;
    setLoading(true);
    try {
      await api.delete(`inquiries/${id}/`);
      await fetchInquiries();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredInquiries = inquiries.filter(i =>
    [i.full_name, i.company_name, i.email, i.country].some(f =>
      (f || '').toLowerCase().includes(search.toLowerCase())
    )
  );

  return {
    filteredInquiries,
    loading,
    search,
    setSearch,
    selectedInquiry,
    setSelectedInquiry,
    handleDelete,
  };
};
