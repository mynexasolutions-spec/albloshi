import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TOPICS = [
  { label: '🏢 About Albloshi', value: 'about_albloshi' },
  { label: '🧪 Tellabs Chemicals', value: 'tellabs_chemicals' },
  { label: '🚚 Logistics & Warehousing', value: 'logistics' },
  { label: '💼 Industrial & Manpower', value: 'manpower' },
  { label: '📞 Chat on WhatsApp', value: 'speak_human' },
];

function getBotResponse(value) {
  switch (value) {
    case 'about_albloshi':
      return { text: '<strong>Mohammad Abdulla Albloshi Trading Co.</strong> is a leading multi-industry corporate enterprise based in Dammam, Saudi Arabia. We serve primary strategic sectors across the Kingdom, offering high-volume food distribution, ASTM/ASME industrial materials, certified manpower supply, and specialty chemicals.', chips: ['🧪 Tellabs Chemicals', '🚚 Warehousing & Areas', '📞 Speak on WhatsApp'] };
    case 'tellabs_chemicals':
      return { text: 'Albloshi is the designated, official GCC regional distributor for <strong>TELLABS Specialty Chemicals</strong>. We offer local inventory stocking, mill documentation, and direct technical execution for water treatment, activated carbon, polymers, and food/hygiene specialty chemicals.', chips: ['📄 Documentation & MSDS', '💳 Request Credit', '⬅️ Main Menu'] };
    case 'logistics':
      return { text: 'Our central logistics headquarters and state-of-the-art warehouses are located in <strong>Dammam</strong>. We offer immediate, direct supply execution to Al Khobar, Jubail, Qatif, Al Hassa, and Eastern Province sectors, along with enterprise freight dispatch to Riyadh, Jeddah, and broader GCC regions.', chips: ['🏢 About Albloshi', '⬅️ Main Menu'] };
    case 'manpower':
      return { text: 'We supply critical materials and highly qualified, certified manpower solutions (welders, fabricators, pipefitters, and mechanical/civil support personnel) complying with strict industrial safety standards to sustain major plant and site operations.', chips: ['🧪 Tellabs Chemicals', '📞 Speak on WhatsApp', '⬅️ Main Menu'] };
    case 'msds_doc':
      return { text: 'Absolutely. Every industrial shipment is accompanied by official <strong>Mill Test Certificates (MTC)</strong> conforming to ASTM/ASME metrics. Similarly, all distributed TELLABS chemical supplies arrive with comprehensive <strong>Material Safety Data Sheets (MSDS)</strong> and specification sheets.', chips: ['🧪 Tellabs Chemicals', '⬅️ Main Menu'] };
    case 'credit_acc':
      return { text: 'To open a corporate credit account or obtain custom contract terms, please submit an official request through our <strong>Enterprise Sales Inquiry Form</strong>. Our credit control team will verify details and reach back within 24 hours.', chips: ['📝 Go to Contact Form', '⬅️ Main Menu'] };
    default:
      return { text: 'How else can Albloshi assist your operations today?', chips: ['🏢 About Albloshi', '🧪 Tellabs Chemicals', '📞 Speak on WhatsApp'] };
  }
}

function chipToValue(label) {
  if (label.includes('About Albloshi')) return 'about_albloshi';
  if (label.includes('Tellabs Chemicals')) return 'tellabs_chemicals';
  if (label.includes('Warehousing') || label.includes('Logistics')) return 'logistics';
  if (label.includes('Manpower')) return 'manpower';
  if (label.includes('WhatsApp')) return 'speak_human';
  if (label.includes('Documentation') || label.includes('MSDS')) return 'msds_doc';
  if (label.includes('Credit')) return 'credit_acc';
  return 'default';
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [firstOpen, setFirstOpen] = useState(true);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const addMessage = (msg) => setMessages(prev => [...prev, { ...msg, id: Date.now() + Math.random() }]);

  const showTopicChips = () => addMessage({ type: 'chips', chips: TOPICS.map(t => t.label), isTopics: true });

  const initConversation = () => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addMessage({ type: 'bot', text: 'Welcome to Albloshi! 🤖 How can I assist your business operations today? Please select a topic below or type your inquiry.' });
      showTopicChips();
    }, 1000);
  };

  const handleOpen = () => {
    setIsOpen(true);
    if (firstOpen) {
      setFirstOpen(false);
      initConversation();
    }
  };

  const handleChip = (label) => {
    addMessage({ type: 'user', text: label });

    if (label.includes('Contact Form')) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        addMessage({ type: 'bot', text: 'Scrolling you to our Sales Inquiry form...' });
        setTimeout(() => {
          setIsOpen(false);
          navigate('/contact');
        }, 600);
      }, 800);
      return;
    }

    if (label.includes('Main Menu')) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        addMessage({ type: 'bot', text: 'Main Menu: Select one of our divisions or operations below:' });
        showTopicChips();
      }, 800);
      return;
    }

    const value = chipToValue(label);

    if (value === 'speak_human') {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        addMessage({ type: 'bot', text: 'Connect directly with our Business Development Manager, <strong>Mohammad Riaz</strong>, for corporate procurement or technical pricing consultations!', isHtml: true });
        addMessage({ type: 'whatsapp' });
        setTimeout(() => {
          addMessage({ type: 'chips', chips: ['📝 Go to Contact Form', '⬅️ Main Menu'] });
        }, 500);
      }, 1000);
      return;
    }

    const { text, chips } = getBotResponse(value);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addMessage({ type: 'bot', text, isHtml: true });
      addMessage({ type: 'chips', chips });
    }, 1000);
  };

  const processText = (text) => {
    const lower = text.toLowerCase();
    setIsTyping(true);
    let value = 'default';
    if (lower.match(/hello|hi|hey|greetings|menu/)) { value = 'menu_reset'; }
    else if (lower.match(/chemical|tellabs|chlorine|water/)) { value = 'tellabs_chemicals'; }
    else if (lower.match(/about|company|who are you|albloshi/)) { value = 'about_albloshi'; }
    else if (lower.match(/food|grain|rice|sugar|oil/)) { value = 'food'; }
    else if (lower.match(/manpower|labor|welder|staff|hiring/)) { value = 'manpower'; }
    else if (lower.match(/logistics|delivery|where|dammam|riyadh/)) { value = 'logistics'; }
    else if (lower.match(/doc|msds|mtc|certif|test/)) { value = 'msds_doc'; }
    else if (lower.match(/credit|finance|pay|price/)) { value = 'credit_acc'; }
    else if (lower.match(/whatsapp|phone|mobile|contact|riaz/)) { value = 'speak_human'; }

    setTimeout(() => {
      setIsTyping(false);
      if (value === 'menu_reset') {
        addMessage({ type: 'bot', text: 'Hello! How can I help you today? Select a main category below:' });
        showTopicChips();
      } else if (value === 'food') {
        addMessage({ type: 'bot', text: 'Our <strong>Food Division</strong> distributes bulk products (sugar, rice, flour, grains, and oils) with a robust GCC freight network to ensure high volume supply freshness and safety.', isHtml: true });
        addMessage({ type: 'chips', chips: ['🚚 Warehousing & Areas', '📞 Speak on WhatsApp', '⬅️ Main Menu'] });
      } else if (value === 'speak_human') {
        handleChip('📞 Chat on WhatsApp');
        return;
      } else if (value === 'default') {
        addMessage({ type: 'bot', text: `I couldn't find an exact match for "${text}". Our direct sales team is standing by to help!`, isHtml: false });
        addMessage({ type: 'whatsapp' });
        addMessage({ type: 'chips', chips: ['📝 Go to Contact Form', '⬅️ Main Menu'] });
      } else {
        const { text: resp, chips } = getBotResponse(value);
        addMessage({ type: 'bot', text: resp, isHtml: true });
        addMessage({ type: 'chips', chips });
      }
    }, 1000);
  };

  const handleSend = () => {
    const val = input.trim();
    if (!val) return;
    addMessage({ type: 'user', text: val });
    setInput('');
    processText(val);
  };

  return (
    <>
      <div
        className="chatbot-float"
        id="chatbotBtn"
        aria-label="Open Help Chat"
        onClick={handleOpen}
        style={{ cursor: 'pointer' }}
      >
        {firstOpen && <span className="chatbot-badge">1</span>}
        <span className="material-icons">chat</span>
      </div>

      {isOpen && (
        <div className="chatbot-window active" id="chatbotWindow">
          <div className="chatbot-header">
            <div className="chatbot-info-wrapper">
              <div className="chatbot-avatar">🤖</div>
              <div className="chatbot-title-group">
                <h4>Albloshi Assistant</h4>
                <span className="chatbot-status">
                  <span className="chatbot-status-dot"></span> Online
                </span>
              </div>
            </div>
            <button
              className="chatbot-close"
              aria-label="Close Chat"
              onClick={() => setIsOpen(false)}
            >
              <span className="material-icons">close</span>
            </button>
          </div>

          <div className="chatbot-messages" id="chatbotMessages">
            {messages.map(msg => {
              if (msg.type === 'user') {
                return <div key={msg.id} className="chatbot-bubble user">{msg.text}</div>;
              }
              if (msg.type === 'bot') {
                return msg.isHtml
                  ? <div key={msg.id} className="chatbot-bubble bot" dangerouslySetInnerHTML={{ __html: msg.text }} />
                  : <div key={msg.id} className="chatbot-bubble bot">{msg.text}</div>;
              }
              if (msg.type === 'whatsapp') {
                return (
                  <div key={msg.id} className="chatbot-whatsapp-card">
                    <p>Receive immediate feedback directly on WhatsApp:</p>
                    <a href="https://wa.me/966549581547" target="_blank" rel="noopener noreferrer" className="chatbot-whatsapp-btn">
                      <span className="material-icons">chat</span> Chat on WhatsApp
                    </a>
                  </div>
                );
              }
              if (msg.type === 'chips') {
                return (
                  <div key={msg.id} className="chatbot-chips-wrapper">
                    <div className="chatbot-chips">
                      {msg.chips.map((chip, i) => (
                        <button key={i} className="chatbot-chip" onClick={() => handleChip(chip)}>{chip}</button>
                      ))}
                    </div>
                  </div>
                );
              }
              return null;
            })}
            {isTyping && (
              <div className="chatbot-typing">
                <span className="chatbot-dot"></span>
                <span className="chatbot-dot"></span>
                <span className="chatbot-dot"></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input-area">
            <input
              type="text"
              className="chatbot-input"
              placeholder="Type a message or click below..."
              autoComplete="off"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
            />
            <button className="chatbot-send" aria-label="Send Message" onClick={handleSend}>
              <span className="material-icons">send</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
