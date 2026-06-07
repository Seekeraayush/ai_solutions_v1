import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';

const INITIAL_FORM = { title: '', description: '', date: '', time: '', location: '', attendees: 0 };

export const useEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [modal, setModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(INITIAL_FORM);
  const [file, setFile] = useState(null);

  const fetchEvents = useCallback(async () => {
    try {
      const { data } = await api.get('events/');
      setEvents(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchEvents(); }, [fetchEvents]);

  const openCreate = () => { setEditingId(null); setForm(INITIAL_FORM); setFile(null); setModal(true); };
  const openEdit = (item) => {
    setEditingId(item.id);
    setForm({ title: item.title, description: item.description, date: item.date, time: item.time, location: item.location, attendees: item.attendees });
    setFile(null);
    setModal(true);
  };
  const closeModal = () => { setModal(false); setEditingId(null); setForm(INITIAL_FORM); setFile(null); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (file) fd.append('image', file);
    try {
      if (editingId) await api.put(`events/${editingId}/`, fd);
      else await api.post('events/', fd);
      closeModal();
      setLoading(true);
      await fetchEvents();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this event?')) return;
    setLoading(true);
    try {
      await api.delete(`events/${id}/`);
      await fetchEvents();
    } catch (err) {
      console.error(err);
    }
  };

  return {
    events, loading, saving,
    modal, editingId, form, setForm, file, setFile,
    openCreate, openEdit, closeModal, handleSubmit, handleDelete,
  };
};
