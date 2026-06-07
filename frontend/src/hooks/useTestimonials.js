import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';

const INITIAL_FORM = { name: '', company: '', content: '', rating: 5 };

export const useTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [modal, setModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(INITIAL_FORM);
  const [file, setFile] = useState(null);

  const fetchTestimonials = useCallback(async () => {
    try {
      const { data } = await api.get('testimonials/');
      setTestimonials(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchTestimonials(); }, [fetchTestimonials]);

  const openCreate = () => { setEditingId(null); setForm(INITIAL_FORM); setFile(null); setModal(true); };
  const openEdit = (item) => { setEditingId(item.id); setForm({ name: item.name, company: item.company, content: item.content, rating: item.rating }); setFile(null); setModal(true); };
  const closeModal = () => { setModal(false); setEditingId(null); setForm(INITIAL_FORM); setFile(null); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (file) fd.append('image', file);
    try {
      if (editingId) await api.put(`testimonials/${editingId}/`, fd);
      else await api.post('testimonials/', fd);
      closeModal();
      setLoading(true);
      await fetchTestimonials();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this testimonial?')) return;
    setLoading(true);
    try {
      await api.delete(`testimonials/${id}/`);
      await fetchTestimonials();
    } catch (err) {
      console.error(err);
    }
  };

  return {
    testimonials, loading, saving,
    modal, editingId, form, setForm, file, setFile,
    openCreate, openEdit, closeModal, handleSubmit, handleDelete,
  };
};
