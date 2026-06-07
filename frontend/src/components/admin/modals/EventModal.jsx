import Modal from '../ui/Modal';
import { Field, inputCls, SubmitBtn, FilePicker } from '../ui/FormControls';

const EventModal = ({ open, onClose, editingId, eventForm, setEventForm, eventFile, setEventFile, onSubmit, saving }) => (
  <Modal open={open} onClose={onClose} title={`${editingId ? 'Edit' : 'Add'} Event`}>
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <Field label="Title">
        <input
          className={inputCls}
          placeholder="Event title"
          value={eventForm.title}
          onChange={e => setEventForm({ ...eventForm, title: e.target.value })}
          required
        />
      </Field>
      <Field label="Description">
        <textarea
          className={inputCls}
          rows={3}
          placeholder="Event description…"
          value={eventForm.description}
          onChange={e => setEventForm({ ...eventForm, description: e.target.value })}
          required
        />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Date">
          <input
            className={inputCls}
            type="date"
            value={eventForm.date}
            onChange={e => setEventForm({ ...eventForm, date: e.target.value })}
            required
          />
        </Field>
        <Field label="Time">
          <input
            className={inputCls}
            type="time"
            value={eventForm.time}
            onChange={e => setEventForm({ ...eventForm, time: e.target.value })}
            required
          />
        </Field>
      </div>
      <Field label="Location">
        <input
          className={inputCls}
          placeholder="Venue / address"
          value={eventForm.location}
          onChange={e => setEventForm({ ...eventForm, location: e.target.value })}
          required
        />
      </Field>
      <Field label="Attendees">
        <input
          className={inputCls}
          type="number"
          min={0}
          value={eventForm.attendees}
          onChange={e => setEventForm({ ...eventForm, attendees: parseInt(e.target.value) || 0 })}
        />
      </Field>
      <Field label="Cover Image">
        <FilePicker file={eventFile} onChange={setEventFile} />
      </Field>
      <SubmitBtn loading={saving} label={`${editingId ? 'Update' : 'Create'} Event`} />
    </form>
  </Modal>
);

export default EventModal;
