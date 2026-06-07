import { motion } from 'framer-motion';
import { Zap, Loader2 } from 'lucide-react';
import { useServices } from '../../../hooks/useServices';
import Card from '../ui/Card';
import SectionHeader from '../ui/SectionHeader';
import ItemActions from '../ui/ItemActions';
import EmptyState from '../ui/EmptyState';
import ServiceModal from '../modals/ServiceModal';

const ServicesTab = () => {
  const {
    services, loading, saving,
    modal, editingId, form, setForm, file, setFile,
    openCreate, openEdit, closeModal, handleSubmit, handleDelete,
  } = useServices();

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
        title="Services Management"
        sub={`${services.length} services`}
        onAdd={openCreate}
        addLabel="Add Service"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
        {services.map(sv => (
          <motion.div key={sv.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Zap size={18} />
                </div>
                <ItemActions onEdit={() => openEdit(sv)} onDelete={() => handleDelete(sv.id)} />
              </div>
              <h3 className="font-outfit font-bold text-slate-900 text-sm mb-1">{sv.title}</h3>
              <p className="text-slate-500 text-xs line-clamp-3">{sv.description}</p>
              <p className="text-[10px] text-slate-400 mt-2">Icon: <span className="text-slate-600 font-semibold">{sv.icon}</span></p>
            </Card>
          </motion.div>
        ))}
        {services.length === 0 && <EmptyState label="No services yet." />}
      </div>

      <ServiceModal
        open={modal}
        onClose={closeModal}
        editingId={editingId}
        serviceForm={form}
        setServiceForm={setForm}
        serviceFile={file}
        setServiceFile={setFile}
        onSubmit={handleSubmit}
        saving={saving}
      />
    </>
  );
};

export default ServicesTab;
