import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';

const INITIAL_FORM = { title: '', category: 'events' };

export const useGallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [modal, setModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(INITIAL_FORM);
  const [file, setFile] = useState(null);

  const fetchGallery = useCallback(async () => {
    try {
      const { data } = await api.get('gallery/');
      setGalleryItems(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchGallery(); }, [fetchGallery]);

  const openCreate = () => { setEditingId(null); setForm(INITIAL_FORM); setFile(null); setModal(true); };
  const openEdit = (item) => { setEditingId(item.id); setForm({ title: item.title, category: item.category }); setFile(null); setModal(true); };
  const closeModal = () => { setModal(false); setEditingId(null); setForm(INITIAL_FORM); setFile(null); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (file) fd.append('image', file);
    try {
      if (editingId) await api.put(`gallery/${editingId}/`, fd);
      else await api.post('gallery/', fd);
      closeModal();
      setLoading(true);
      await fetchGallery();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this item?')) return;
    setLoading(true);
    try {
      await api.delete(`gallery/${id}/`);
      await fetchGallery();
    } catch (err) {
      console.error(err);
    }
  };

  return {
    galleryItems, loading, saving,
    modal, editingId, form, setForm, file, setFile,
    openCreate, openEdit, closeModal, handleSubmit, handleDelete,
  };
};
