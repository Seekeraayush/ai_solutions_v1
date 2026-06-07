import { motion } from 'framer-motion';
import { Star, Building2, Loader2 } from 'lucide-react';
import { useTestimonials } from '../../../hooks/useTestimonials';
import Card from '../ui/Card';
import SectionHeader from '../ui/SectionHeader';
import ItemActions from '../ui/ItemActions';
import EmptyState from '../ui/EmptyState';
import TestimonialModal from '../modals/TestimonialModal';

const TestimonialsTab = () => {
  const {
    testimonials, loading, saving,
    modal, editingId, form, setForm, file, setFile,
    openCreate, openEdit, closeModal, handleSubmit, handleDelete,
  } = useTestimonials();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-3 text-slate-400">
        <Loader2 size={28} className="animate-spin text-blue-500" />
        <p className="text-xs font-semibold uppercase tracking-widest">Loading…</p>
      </div>
    );
  }

  return (
    <>
      <SectionHeader
        title="Testimonials Management"
        sub={`${testimonials.length} testimonials`}
        onAdd={openCreate}
        addLabel="Add Testimonial"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
        {testimonials.map(t => (
          <motion.div key={t.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card className="p-5">
              <div className="flex items-start gap-4">
                <img
                  src={t.image?.startsWith('http') ? t.image : `http://localhost:8000${t.image}`}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-slate-100 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-outfit font-bold text-slate-900 text-sm">{t.name}</p>
                      <p className="text-xs text-slate-400 flex items-center gap-1"><Building2 size={10} />{t.company}</p>
                    </div>
                    <ItemActions onEdit={() => openEdit(t)} onDelete={() => handleDelete(t.id)} />
                  </div>
                  <p className="text-slate-600 text-xs mt-2 line-clamp-3">{t.content}</p>
                  <div className="flex items-center gap-1 mt-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        className={i < t.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'}
                      />
                    ))}
                    <span className="text-[10px] text-slate-400 ml-1">({t.rating}/5)</span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
        {testimonials.length === 0 && <EmptyState label="No testimonials yet." />}
      </div>

      <TestimonialModal
        open={modal}
        onClose={closeModal}
        editingId={editingId}
        testimonialForm={form}
        setTestimonialForm={setForm}
        testimonialFile={file}
        setTestimonialFile={setFile}
        onSubmit={handleSubmit}
        saving={saving}
      />
    </>
  );
};

export default TestimonialsTab;
