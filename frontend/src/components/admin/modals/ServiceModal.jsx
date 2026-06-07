import Modal from '../ui/Modal';
import { Field, inputCls, SubmitBtn, FilePicker } from '../ui/FormControls';

const ServiceModal = ({ open, onClose, editingId, serviceForm, setServiceForm, serviceFile, setServiceFile, onSubmit, saving }) => (
  <Modal open={open} onClose={onClose} title={`${editingId ? 'Edit' : 'Add'} Service`}>
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <Field label="Title">
        <input
          className={inputCls}
          placeholder="Service title"
          value={serviceForm.title}
          onChange={e => setServiceForm({ ...serviceForm, title: e.target.value })}
          required
        />
      </Field>
      <Field label="Description">
        <textarea
          className={inputCls}
          rows={3}
          placeholder="Service description…"
          value={serviceForm.description}
          onChange={e => setServiceForm({ ...serviceForm, description: e.target.value })}
          required
        />
      </Field>
      <Field label="Icon Name">
        <input
          className={inputCls}
          placeholder="e.g. Zap, Cpu, Shield…"
          value={serviceForm.icon}
          onChange={e => setServiceForm({ ...serviceForm, icon: e.target.value })}
        />
      </Field>
      <Field label="Image">
        <FilePicker file={serviceFile} onChange={setServiceFile} />
      </Field>
      <SubmitBtn loading={saving} label={`${editingId ? 'Update' : 'Create'} Service`} />
    </form>
  </Modal>
);

export default ServiceModal;
