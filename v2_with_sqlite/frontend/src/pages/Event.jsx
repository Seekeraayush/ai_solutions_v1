import { useState, useEffect, useMemo } from 'react';
import { Calendar, MapPin, Users, ChevronRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import ContentModal from '../components/ContentModal';
import api from '../services/api';

const imgSrc = (url) =>
  url ? (url.startsWith('http') ? url : `http://localhost:8000${url}`) : null;

const formatDate = (dateString) => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

const isUpcoming = (dateString) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(dateString) >= today;
};

const Event = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    api.get('events/')
      .then(({ data }) => setEvents(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const filteredEvents = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcoming = events
      .filter(e => new Date(e.date) >= today)
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    const past = events
      .filter(e => new Date(e.date) < today)
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    return { upcoming, past };
  }, [events]);

  const displayedEvents = filteredEvents[activeTab];

  const handleEventClick = (event) => { setSelectedEvent(event); setIsModalOpen(true); };
  const handleCloseModal = () => { setIsModalOpen(false); setSelectedEvent(null); };
  const handleNextEvent = () => {
    const idx = displayedEvents.findIndex(e => e.id === selectedEvent?.id);
    if (idx < displayedEvents.length - 1) setSelectedEvent(displayedEvents[idx + 1]);
  };
  const handlePrevEvent = () => {
    const idx = displayedEvents.findIndex(e => e.id === selectedEvent?.id);
    if (idx > 0) setSelectedEvent(displayedEvents[idx - 1]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-navy-50 to-white pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="font-outfit font-bold text-4xl md:text-5xl text-navy-900 mb-4">
            Our <span className="text-primary">Events</span>
          </h1>
          <p className="text-navy-600 text-lg max-w-2xl mx-auto">
            Join us for networking, learning, and innovation. Explore our upcoming events and past experiences.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3 text-navy-400">
            <Loader2 size={32} className="animate-spin text-primary" />
            <p className="text-sm font-semibold uppercase tracking-widest">Loading events…</p>
          </div>
        ) : (
          <>
            {/* Tabs */}
            <div className="flex gap-4 mb-12 justify-center">
              {['upcoming', 'past'].map(tab => (
                <motion.button
                  key={tab}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 capitalize ${
                    activeTab === tab
                      ? 'bg-primary text-white shadow-lg shadow-blue-500/30'
                      : 'bg-white border-2 border-navy-200 text-navy-700 hover:border-primary'
                  }`}
                >
                  {tab === 'upcoming' ? 'Upcoming' : 'Past'} Events ({filteredEvents[tab].length})
                </motion.button>
              ))}
            </div>

            {/* Events Grid */}
            {displayedEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {displayedEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group bg-white rounded-2xl overflow-hidden border border-navy-100 hover:border-primary hover:shadow-xl transition-all duration-300"
                  >
                    {/* Event Image */}
                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-navy-900 to-primary">
                      {imgSrc(event.image) && (
                        <img
                          src={imgSrc(event.image)}
                          alt={event.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      )}
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300" />
                      {isUpcoming(event.date) && (
                        <div className="absolute top-4 right-4 bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                          Upcoming
                        </div>
                      )}
                    </div>

                    {/* Event Content */}
                    <div className="p-6">
                      <h3
                        className="text-xl font-bold text-navy-900 mb-3 group-hover:text-primary transition-colors cursor-pointer"
                        onClick={() => handleEventClick(event)}
                      >
                        {event.title}
                      </h3>
                      <p className="text-navy-600 text-sm mb-4 line-clamp-2">{event.description}</p>

                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-3 text-navy-700">
                          <Calendar size={18} className="text-primary shrink-0" />
                          <span className="text-sm">{formatDate(event.date)} at {event.time}</span>
                        </div>
                        <div className="flex items-center gap-3 text-navy-700">
                          <MapPin size={18} className="text-primary shrink-0" />
                          <span className="text-sm">{event.location}</span>
                        </div>
                        <div className="flex items-center gap-3 text-navy-700">
                          <Users size={18} className="text-primary shrink-0" />
                          <span className="text-sm">{event.attendees} attendees</span>
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ x: 5 }}
                        onClick={() => handleEventClick(event)}
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-blue-600 hover:shadow-lg text-white font-semibold py-2.5 rounded-lg transition-all duration-300"
                      >
                        {isUpcoming(event.date) ? 'Register Now' : 'View Highlights'}
                        <ChevronRight size={18} />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <Calendar size={48} className="mx-auto text-navy-300 mb-4" />
                <p className="text-navy-600 text-lg">
                  {activeTab === 'upcoming' ? 'No upcoming events at the moment.' : 'No past events to display.'}
                </p>
              </motion.div>
            )}
          </>
        )}
      </div>

      <ContentModal
        isOpen={isModalOpen}
        item={selectedEvent}
        onClose={handleCloseModal}
        onNext={handleNextEvent}
        onPrev={handlePrevEvent}
        type="event"
        totalItems={displayedEvents?.length ?? 0}
        currentIndex={selectedEvent ? displayedEvents.findIndex(e => e.id === selectedEvent.id) : 0}
      />
    </div>
  );
};

export default Event;
