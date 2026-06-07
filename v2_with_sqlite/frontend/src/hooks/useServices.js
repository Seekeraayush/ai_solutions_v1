import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';

const INITIAL_FORM = { title: '', description: '', icon: 'Zap' };

export const useServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [modal, setModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(INITIAL_FORM);
  const [file, setFile] = useState(null);

  const fetchServices = useCallback(async () => {
    try {
      const { data } = await api.get('services/');
      setServices(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchServices(); }, [fetchServices]);

  const openCreate = () => { setEditingId(null); setForm(INITIAL_FORM); setFile(null); setModal(true); };
  const openEdit = (item) => { setEditingId(item.id); setForm({ title: item.title, description: item.description, icon: item.icon }); setFile(null); setModal(true); };
  const closeModal = () => { setModal(false); setEditingId(null); setForm(INITIAL_FORM); setFile(null); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (file) fd.append('image', file);
    try {
      if (editingId) await api.put(`services/${editingId}/`, fd);
      else await api.post('services/', fd);
      closeModal();
      setLoading(true);
      await fetchServices();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this service?')) return;
    setLoading(true);
    try {
      await api.delete(`services/${id}/`);
      await fetchServices();
    } catch (err) {
      console.error(err);
    }
  };

  return {
    services, loading, saving,
    modal, editingId, form, setForm, file, setFile,
    openCreate, openEdit, closeModal, handleSubmit, handleDelete,
  };
};
