import { useMemo } from 'react';
import ChatBot from 'react-chatbotify';
import { useNavigate } from 'react-router-dom';

const ChatWidget = () => {
  const navigate = useNavigate();

  const settings = {
    general: {
      primaryColor: '#2563EB',
      secondaryColor: '#1E293B',
      fontFamily: 'Outfit, Inter, sans-serif',
      showFooter: false,
    },
    header: {
      title: 'AI-Solutions Consultant',
      showAvatar: true,
      avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=80&auto=format&fit=crop&q=80',
    },
    botBubble: {
      avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=80&auto=format&fit=crop&q=80',
      showAvatar: true,
    },
    chatWindow: {
      showCloseButton: true,
    },
  };

  const flow = useMemo(() => ({
    start: {
      message: "Hello! Welcome to AI-Solutions. I'm your digital strategy assistant. How can I help you today?",
      options: ["Our Services", "Pricing & Delivery", "Our Portfolio", "Contact Info"],
      path: "process_option",
    },
    process_option: {
      message: async (params) => {
        const option = params.userInput;
        if (option === "Our Services") {
          return "We specialize in three core areas:\n\n1. Autonomous AI Agents (chatbots, operations workflows)\n2. Predictive Analytics (data modeling, anomaly detection)\n3. Computer Vision (inspection, design classification)\n\nWould you like to book a consultation?";
        } else if (option === "Pricing & Delivery") {
          return "Our typical project delivery cycle ranges from 3 to 28 days. Pricing is customized based on scope, starting with corporate packages. All integrations feature full testing and premium support.";
        } else if (option === "Our Portfolio") {
          return "We have successfully delivered over 25 projects for high-end corporate clients. You can view our tech stacks and client results directly on our Portfolio page.\n\nWould you like to visit the Portfolio page?";
        } else if (option === "Contact Info") {
          return "You can reach our sales and advisory team at:\n📧 partner@ai-solutions.io\n📞 +1 (800) 555-0199\n\nOr click 'Book Consultation' in the navbar to send us an inquiry directly!";
        }
        
        // Custom text matching for FAQ queries
        const input = option.toLowerCase();
        if (input.includes("price") || input.includes("cost") || input.includes("quote")) {
          return "Pricing is tailor-made depending on system complexity. We advise scheduling a free consultation to receive a custom proposal.";
        }
        if (input.includes("service") || input.includes("offer") || input.includes("do")) {
          return "We offer high-end AI services including Agent Integration, Telemetry Anomaly Detection, and Custom Lightbox Media Dashboards. Visit our Services tab for details.";
        }
        if (input.includes("portfolio") || input.includes("work") || input.includes("projects")) {
          return "We've completed 25+ successful deployments with 99% client satisfaction. Navigate to the Portfolio page to explore our latest case studies.";
        }
        if (input.includes("contact") || input.includes("email") || input.includes("address")) {
          return "You can contact us via partner@ai-solutions.io or by filling out the form at /contact.";
        }

        return "I understand! To get detailed answers for your corporate needs, I highly recommend scheduling a consultation. Would you like to proceed?";
      },
      options: ["Back to Main Menu", "Book Consultation", "Go to Portfolio"],
      path: "handle_followup",
    },
    handle_followup: {
      message: (params) => {
        const choice = params.userInput;
        if (choice === "Back to Main Menu") {
          return "How else can I assist you?";
        } else if (choice === "Book Consultation") {
          navigate('/contact');
          return "Great choice! I have navigated you to our Contact page. Please fill out the form, and our executives will get back to you shortly.";
        } else if (choice === "Go to Portfolio") {
          navigate('/portfolio');
          return "Navigating to our Portfolio. Let me know if you have questions about specific projects!";
        }
        return "Returning to menu. What would you like to explore?";
      },
      options: ["Our Services", "Pricing & Delivery", "Our Portfolio", "Contact Info"],
      path: "process_option",
    }
  }), [navigate]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <ChatBot
        settings={settings}
        flow={flow}
        styles={{
          chatWindowStyle: {
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
            borderRadius: '24px',
            border: '1px solid rgba(226, 232, 240, 0.8)',
          }
        }}
      />
    </div>
  );
};

export default ChatWidget;
