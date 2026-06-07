import Modal from '../ui/Modal';
import { Field, inputCls, SubmitBtn, FilePicker } from '../ui/FormControls';

const TestimonialModal = ({ open, onClose, editingId, testimonialForm, setTestimonialForm, testimonialFile, setTestimonialFile, onSubmit, saving }) => (
  <Modal open={open} onClose={onClose} title={`${editingId ? 'Edit' : 'Add'} Testimonial`}>
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3">
        <Field label="Name">
          <input
            className={inputCls}
            placeholder="Full name"
            value={testimonialForm.name}
            onChange={e => setTestimonialForm({ ...testimonialForm, name: e.target.value })}
            required
          />
        </Field>
        <Field label="Company">
          <input
            className={inputCls}
            placeholder="Company"
            value={testimonialForm.company}
            onChange={e => setTestimonialForm({ ...testimonialForm, company: e.target.value })}
            required
          />
        </Field>
      </div>
      <Field label="Testimonial">
        <textarea
          className={inputCls}
          rows={4}
          placeholder="What they said…"
          value={testimonialForm.content}
          onChange={e => setTestimonialForm({ ...testimonialForm, content: e.target.value })}
          required
        />
      </Field>
      <Field label="Rating">
        <select
          className={inputCls}
          value={testimonialForm.rating}
          onChange={e => setTestimonialForm({ ...testimonialForm, rating: parseInt(e.target.value) })}
        >
          {[5, 4, 3, 2, 1].map(i => (
            <option key={i} value={i}>{i} Star{i !== 1 ? 's' : ''} {'★'.repeat(i)}</option>
          ))}
        </select>
      </Field>
      <Field label="Photo">
        <FilePicker file={testimonialFile} onChange={setTestimonialFile} />
      </Field>
      <SubmitBtn loading={saving} label={`${editingId ? 'Update' : 'Create'} Testimonial`} />
    </form>
  </Modal>
);

export default TestimonialModal;
