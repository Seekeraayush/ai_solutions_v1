import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useGallery } from '../../../hooks/useGallery';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import SectionHeader from '../ui/SectionHeader';
import ItemActions from '../ui/ItemActions';
import EmptyState from '../ui/EmptyState';
import GalleryModal from '../modals/GalleryModal';

const GalleryTab = () => {
  const {
    galleryItems, loading, saving,
    modal, editingId, form, setForm, file, setFile,
    openCreate, openEdit, closeModal, handleSubmit, handleDelete,
  } = useGallery();

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
        title="Gallery Management"
        sub={`${galleryItems.length} assets`}
        onAdd={openCreate}
        addLabel="Add Asset"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-6">
        {galleryItems.map(item => (
          <motion.div key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card className="overflow-hidden group">
              <div className="relative aspect-video bg-[#07070F] overflow-hidden">
                <img
                  src={item.image?.startsWith('http') ? item.image : `http://localhost:8000${item.image}`}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80"
                />
                <div className="absolute inset-0 bg-[#07070F]/0 group-hover:bg-[#07070F]/30 transition-colors" />
              </div>
              <div className="p-4 flex items-center justify-between gap-2">
                <div className="overflow-hidden">
                  <p className="font-grotesk font-bold text-[#F0F0FF] text-xs truncate">{item.title}</p>
                  <Badge color="blue">{item.category_display || item.category}</Badge>
                </div>
                <ItemActions onEdit={() => openEdit(item)} onDelete={() => handleDelete(item.id)} />
              </div>
            </Card>
          </motion.div>
        ))}
        {galleryItems.length === 0 && <EmptyState label="No gallery items yet." />}
      </div>

      <GalleryModal
        open={modal}
        onClose={closeModal}
        editingId={editingId}
        galleryForm={form}
        setGalleryForm={setForm}
        galleryFile={file}
        setGalleryFile={setFile}
        onSubmit={handleSubmit}
        saving={saving}
      />
    </>
  );
};

export default GalleryTab;
