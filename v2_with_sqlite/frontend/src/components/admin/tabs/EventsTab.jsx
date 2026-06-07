import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, Loader2 } from 'lucide-react';
import { useEvents } from '../../../hooks/useEvents';
import Card from '../ui/Card';
import SectionHeader from '../ui/SectionHeader';
import ItemActions from '../ui/ItemActions';
import EmptyState from '../ui/EmptyState';
import EventModal from '../modals/EventModal';

const EventsTab = () => {
  const {
    events, loading, saving,
    modal, editingId, form, setForm, file, setFile,
    openCreate, openEdit, closeModal, handleSubmit, handleDelete,
  } = useEvents();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-3 text-[#94A3B8]">
        <Loader2 size={28} className="animate-spin text-violet-400" />
        <p className="text-xs font-grotesk font-semibold uppercase tracking-widest">Loading…</p>
      </div>
    );
  }

  return (
    <>
      <SectionHeader
        title="Events Management"
        sub={`${events.length} events`}
        onAdd={openCreate}
        addLabel="Add Event"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
        {events.map(ev => (
          <motion.div key={ev.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card className="p-5 flex gap-4">
              {ev.image && (
                <img
                  src={ev.image?.startsWith('http') ? ev.image : `http://localhost:8000${ev.image}`}
                  alt={ev.title}
                  className="w-20 h-20 rounded-2xl object-cover shrink-0 opacity-90"
                />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-grotesk font-bold text-[#F0F0FF] text-sm truncate">{ev.title}</h3>
                  <ItemActions onEdit={() => openEdit(ev)} onDelete={() => handleDelete(ev.id)} />
                </div>
                <p className="text-[#94A3B8] text-xs mt-1 line-clamp-2">{ev.description}</p>
                <div className="mt-3 flex flex-wrap gap-3 text-xs text-[#94A3B8]">
                  <span className="flex items-center gap-1"><Calendar size={11} />{ev.date}</span>
                  <span className="flex items-center gap-1"><Clock size={11} />{ev.time}</span>
                  <span className="flex items-center gap-1"><MapPin size={11} />{ev.location}</span>
                  <span className="flex items-center gap-1"><Users size={11} />{ev.attendees} attendees</span>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
        {events.length === 0 && <EmptyState label="No events yet." />}
      </div>

      <EventModal
        open={modal}
        onClose={closeModal}
        editingId={editingId}
        eventForm={form}
        setEventForm={setForm}
        eventFile={file}
        setEventFile={setFile}
        onSubmit={handleSubmit}
        saving={saving}
      />
    </>
  );
};

export default EventsTab;
