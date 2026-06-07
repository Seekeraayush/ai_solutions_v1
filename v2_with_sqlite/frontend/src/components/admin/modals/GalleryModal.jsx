import Modal from '../ui/Modal';
import { Field, inputCls, SubmitBtn, FilePicker } from '../ui/FormControls';

const GalleryModal = ({ open, onClose, editingId, galleryForm, setGalleryForm, galleryFile, setGalleryFile, onSubmit, saving }) => (
  <Modal open={open} onClose={onClose} title={`${editingId ? 'Edit' : 'Add'} Gallery Item`}>
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <Field label="Title">
        <input
          className={inputCls}
          placeholder="e.g. Team Offsite 2025"
          value={galleryForm.title}
          onChange={e => setGalleryForm({ ...galleryForm, title: e.target.value })}
          required
        />
      </Field>
      <Field label="Category">
        <select
          className={inputCls}
          value={galleryForm.category}
          onChange={e => setGalleryForm({ ...galleryForm, category: e.target.value })}
        >
          <option value="events">Events</option>
          <option value="office">Office</option>
          <option value="clients">Clients</option>
        </select>
      </Field>
      <Field label="Image">
        <FilePicker file={galleryFile} onChange={setGalleryFile} />
      </Field>
      <SubmitBtn loading={saving} label={`${editingId ? 'Update' : 'Create'} Gallery Item`} />
    </form>
  </Modal>
);

export default GalleryModal;
