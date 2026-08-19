import React, { useState } from 'react';

// ==========================================
// TYPES & INTERFACES
// ==========================================
interface Service {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  features: string[];
}

interface CaseStudy {
  id: string;
  client: string;
  title: string;
  challenge: string;
  solution: string;
  outcome: string;
  tags: string[];
}

export default function SoftwireHomepage() {
  // ==========================================
  // STATE MANAGEMENT
  // ==========================================
  const [activeTab, setActiveTab] = useState<string>('villa');
  
  // Interactive Inquiry Builder State
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    industry: '',
    services: [] as string[],
    name: '',
    businessName: '',
    phone: '',
    email: '',
    notes: '',
  });
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // ==========================================
  // CONSTANTS & GROUNDED DATA
  // ==========================================
  const servicesList: Service[] = [
    {
      id: 'networking',
      title: 'Intelligent Network Infrastructure',
      icon: (
        <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z" />
        </svg>
      ),
      description: 'High-speed, optimized, and segmented enterprise-grade networks engineered for long-term stability and security under heavy loads.',
      features: [
        'MikroTik Load Balancing & Multi-ISP Failover',
        'Enterprise-grade Wi-Fi and structured electrical cabling',
        'Long-range P2P wireless networking & data bridging',
        'Gibabit structured switching with clean rack labeling'
      ]
    },
    {
      id: 'security',
      title: 'Surveillance & Security Systems',
      icon: (
        <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      description: 'Visual security and intrusion alert frameworks designed to sense, secure, and communicate reliably across multi-floor networks.',
      features: [
        'HD IP & analog CCTV monitoring with remote visualization',
        'Secure network storage (NAS) and backup management',
        'GSM-enabled PIR motion sensors with real-time push alerts',
        'Isolated CCTV local networks that work without internet connection'
      ]
    },
    {
      id: 'access',
      title: 'Access Control & Biometrics',
      icon: (
        <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 009 11.5a13.96 13.96 0 00-3.184-8.892m14.002 12.01a14.02 14.02 0 00-2.204-5.381M15.686 1.51c-.02.04-.042.08-.063.12m.063-.12A13.947 13.947 0 0118 11.5c0 3.618-.78 6.945-2.016 9.94" />
        </svg>
      ),
      description: 'Unified identity and entrance architectures designed to merge tracking of people, time, and physical assets seamlessly.',
      features: [
        'Biometric fingerprint, facial recognition & RFID access units',
        'Time & attendance tracking with professional software reporting',
        'Centralized hotel lock management and RFID smart card integration',
        'Multi-site automated barrier and vehicle gate solutions'
      ]
    },
    {
      id: 'automation',
      title: 'IoT & Smart Automation',
      icon: (
        <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      description: 'Bridging physical sensors, controllers, and localized logic to automate industrial water management and residential environments.',
      features: [
        'Automated water tank level flow & motor controllers',
        'Tuya, Sonoff, and customized IoT dashboard programming',
        'Network-segregated control modules for factory safety',
        'Environmental sensors matching responsive automations'
      ]
    },
    {
      id: 'telecom',
      title: 'Communication & Telephony',
      icon: (
        <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      description: 'Analog and digital voice communication backbones that connect apartments, offices, and heavy industrial facilities with high clarity.',
      features: [
        'IP & Analog PABX installations with precise extension routing',
        'A/V intercoms for apartment complexes and commercial structures',
        'Public Address (PA) announcement and clear paging audio layouts',
        'Integration of telecom endpoints with central IP networks'
      ]
    },
    {
      id: 'compliance',
      title: 'Fire Alarm & Safety Systems',
      icon: (
        <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      description: 'Compliance-ready environmental safety detection systems built to provide reliable, multi-zone early warnings.',
      features: [
        'Smoke, heat, and flame sensing arrays',
        'Configured zone controls for large commercial properties',
        'Battery-backed central alarm alert indicators',
        'Integration with low-voltage power failover setups'
      ]
    }
  ];

  const caseStudies: CaseStudy[] = [
    {
      id: 'villa',
      client: 'Abdullah Haroon Villa',
      title: 'Multi-Zone Concrete Wall Networking Solution',
      challenge: 'Deploying a high-speed unified Wi-Fi network inside a residential estate built with 2.5-feet thick solid concrete walls that entirely blocked standard wireless frequencies.',
      solution: 'Engineered a segmented network infrastructure using long-range Ubiquiti radio access points routed through discrete, structured pathways, and integrated a wireless control bell signaling system linked directly to the primary LED control room console.',
      outcome: 'Achieved 100% wireless data coverage across separate network segments with completely seamless roaming and zero packet loss.',
      tags: ['Ubiquiti Radios', 'Segmented Network', 'Signal Penetration', 'Structured Cabling']
    },
    {
      id: 'shan',
      client: 'Shan Foods',
      title: 'Smart Water Management & Network Segregation',
      challenge: 'Shan Foods required a stable, secure, and lag-free plant-level communication network to monitor operational water reservoirs and automate industrial water motor operations without exposing machinery to general networks.',
      solution: 'Designed and installed an isolated low-voltage operational network topology featuring custom IoT water controllers, precise device-level network segregation, and optimized data paths to avoid packet congestion.',
      outcome: 'Completely automated water motor control and tank telemetry with real-time feedback loops and guaranteed logical protection from IT network threats.',
      tags: ['Industrial IoT', 'Water Management', 'Network Segregation', 'Device Security']
    },
    {
      id: 'strongwill',
      client: 'Strongwill Wire Industries',
      title: 'Solar-Powered Long-Distance CCTV Bridging',
      challenge: 'Uninterrupted streaming of critical high-definition security camera footage from an isolated industrial manufacturing plant to a remote security headquarters located in Defence.',
      solution: 'Deployed a zero-lag point-to-point (P2P) wireless link operating over highly stable bands, backed by a custom-engineered solar-power battery backup matrix to ensure surveillance and bridging remained operational during municipal power failure.',
      outcome: 'Maintained absolute zero-outage video streaming to the Defence control room with real-time monitoring and 100% system independence from the public power grid.',
      tags: ['P2P Wireless Link', 'Solar Backup Systems', 'HD Video Streaming', 'Zero Outage']
    },
    {
      id: 'burhani',
      client: 'Burhani Blood Bank',
      title: 'Unified Offline-Capable IT & Surveillance Integration',
      challenge: 'Establishing a secure, redundant, and unified infrastructure that combines IP telephony, surveillance cameras, and local staff Wi-Fi while ensuring security operations do not collapse if external internet connectivity drops.',
      solution: 'Designed a structured Gigabit switching topology with a centralized MikroTik management console configured to handle security traffic locally. Combined separate network inputs into a single, smart communication flow.',
      outcome: 'A network that maintains complete IP surveillance recording, intercom stability, and local authentication operations even during external ISP failures.',
      tags: ['MikroTik Management', 'Structured Gigabit Switching', 'Local Redundancy', 'IP Telephony']
    }
  ];

  const industryVerticals = [
    'Corporate & Offices',
    'Manufacturing & Industrial Units',
    'Homes, Villas & Residences',
    'Retail & Commercial Shops',
    'Schools & Colleges',
    'Hospitals & Clinics',
    'Hotels & Hospitality',
    'Warehouses & Logistic Facilities',
    'Restaurants & Cafés',
    'Mosques & Community Centers'
  ];

  // ==========================================
  // HANDLERS
  // ==========================================
  const handleServiceToggle = (service: string) => {
    if (formData.services.includes(service)) {
      setFormData({ ...formData, services: formData.services.filter((s) => s !== service) });
    } else {
      setFormData({ ...formData, services: [...formData.services, service] });
    }
  };

  const nextStep = () => {
    if (currentStep === 1 && !formData.industry) {
      alert('Please select your industry type to continue.');
      return;
    }
    if (currentStep === 2 && formData.services.length === 0) {
      alert('Please select at least one service to continue.');
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) {
      alert('Please fill out all required contact fields.');
      return;
    }
    
    setIsSubmitted(true);
  };

  // Generate WhatsApp Direct Link
  const getWhatsAppLink = () => {
    const text = `Hi Softwire! I visited your website and would like to inquire about a project.\n\n` +
      `🏢 Industry: ${formData.industry || 'Not Specified'}\n` +
      `🛠️ Services needed: ${formData.services.join(', ') || 'General Inquiry'}\n` +
      `👤 Name: ${formData.name || 'Interested Client'}\n\n` +
      `Please contact me to arrange a technical site visit.`;
    return `https://wa.me/923120313575?text=${encodeURIComponent(text)}`;
  };

  // Generate Mailto fallback
  const getMailtoLink = () => {
    const subject = `Inquiry: Softwire System Design (${formData.businessName || formData.name})`;
    const body = `Hi Softwire Engineering,\n\nWe would like to request an estimate with the following details:\n\n` +
      `Industry Type: ${formData.industry}\n` +
      `Services Selected: ${formData.services.join(', ')}\n` +
      `Client Name: ${formData.name}\n` +
      `Business Name: ${formData.businessName || 'N/A'}\n` +
      `Phone Number: ${formData.phone}\n` +
      `Scope Details: ${formData.notes || 'No extra notes.'}\n\n` +
      `Regards,\n${formData.name}`;
    return `mailto:info@softwire.info?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-orange-500 selection:text-white">
      
      {/* Dynamic Local SEO JSON-LD Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Softwire",
            "image": "https://softwire.info/images/logo.png",
            "telephone": "+923120313575",
            "email": "info@softwire.info",
            "url": "https://softwire.info",
            "priceRange": "$$",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Gulshan-e-Iqbal, Karachi",
              "addressCountry": "PK"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "24.9180",
              "longitude": "67.0971"
            },
            "knowsAbout": [
              "MikroTik Load Balancing",
              "CCTV Surveillance Systems",
              "Biometric Access Control",
              "IoT Automation",
              "Network Infrastructure",
              "Burhani Blood Bank Case Study",
              "Shan Foods Industrial Water Management"
            ]
          })
        }}
      />

      {/* ==========================================
          HEADER & NAVIGATION
          ========================================== */}
      <header className="sticky top-0 z-50 bg-slate-950/85 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo area */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center font-bold text-white shadow-lg shadow-orange-500/20">
                SW
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-orange-400 bg-clip-text text-transparent">
                  SOFTWIRE
                </span>
                <span className="block text-xs font-semibold text-orange-500 uppercase tracking-widest leading-none">
                  Intelligent Systems
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-sm font-medium text-slate-300 hover:text-orange-400 transition-colors">Services</a>
              <a href="#why-choose-us" className="text-sm font-medium text-slate-300 hover:text-orange-400 transition-colors">Our Edge</a>
              <a href="#case-studies" className="text-sm font-medium text-slate-300 hover:text-orange-400 transition-colors">Case Studies</a>
              <a href="#quote-estimator" className="text-sm font-medium text-slate-300 hover:text-orange-400 transition-colors">Get an Estimate</a>
            </nav>

            {/* Header Call To Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <a
                href="https://wa.me/923120313575"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white flex items-center space-x-2 border border-slate-800 hover:border-slate-700 rounded-lg transition-all"
              >
                <span>WhatsApp Consult</span>
              </a>
              <a
                href="#quote-estimator"
                className="px-5 py-2.5 text-sm font-bold bg-orange-600 hover:bg-orange-500 text-white rounded-lg transition-all shadow-md hover:shadow-orange-500/20"
              >
                Request Site Visit
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-slate-300 hover:text-white p-2 rounded-lg"
                aria-label="Toggle navigation menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-6 space-y-3">
            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-300 hover:text-orange-400 font-medium">Services</a>
            <a href="#why-choose-us" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-300 hover:text-orange-400 font-medium">Our Edge</a>
            <a href="#case-studies" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-300 hover:text-orange-400 font-medium">Case Studies</a>
            <a href="#quote-estimator" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-300 hover:text-orange-400 font-medium">Get an Estimate</a>
            
            <div className="pt-4 flex flex-col space-y-2">
              <a
                href="https://wa.me/923120313575"
                className="w-full text-center py-2.5 rounded-lg border border-slate-700 text-slate-300 hover:text-white"
              >
                Contact via WhatsApp
              </a>
              <a
                href="#quote-estimator"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-lg bg-orange-600 text-white font-bold"
              >
                Get Custom Quote
              </a>
            </div>
          </div>
        )}
      </header>

      {/* ==========================================
          HERO SECTION
          ========================================== */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-24 md:pb-32">
        {/* Abstract cyber grid graphic */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40"></div>
        
        {/* Softwire custom blur background shapes */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl z-0"></div>
        <div className="absolute top-40 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl z-0"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            
            {/* Over-the-title Badge */}
            <div className="inline-flex items-center space-x-2 bg-slate-900 border border-slate-800 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-300">
                25 Years Technology Legacy in Pakistan
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-none mb-6">
              Empowering Spaces Through <br />
              <span className="bg-gradient-to-r from-orange-500 via-amber-400 to-orange-600 bg-clip-text text-transparent">
                Intelligent Technology
              </span>
            </h1>

            {/* Grounded Subtitle */}
            <p className="text-lg sm:text-xl text-slate-400 font-normal leading-relaxed mb-10 max-w-2xl mx-auto">
              From high-density networking to biometric security and smart industrial automation — we construct software-driven hardware environments that think, connect, and respond.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <a
                href="#quote-estimator"
                className="w-full sm:w-auto px-8 py-4 bg-orange-600 hover:bg-orange-500 text-white font-extrabold rounded-lg transition-all shadow-xl shadow-orange-500/20 text-center"
              >
                Inquire & Build Quote
              </a>
              <a
                href="#case-studies"
                className="w-full sm:w-auto px-8 py-4 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 hover:text-white font-bold rounded-lg transition-all text-center"
              >
                View Case Studies
              </a>
            </div>

          </div>

          {/* Stats Bar */}
          <div className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 border-t border-b border-slate-800/80 py-8 bg-slate-900/20 backdrop-blur-sm rounded-xl">
            <div className="text-center px-4">
              <div className="text-3xl md:text-4xl font-extrabold text-orange-500">25+</div>
              <div className="text-xs uppercase text-slate-400 font-semibold tracking-wider mt-1">Years Legacy</div>
            </div>
            <div className="text-center px-4 border-l border-slate-800">
              <div className="text-3xl md:text-4xl font-extrabold text-orange-500">14+</div>
              <div className="text-xs uppercase text-slate-400 font-semibold tracking-wider mt-1">Core Specialization</div>
            </div>
            <div className="text-center px-4 border-l border-slate-800">
              <div className="text-3xl md:text-4xl font-extrabold text-orange-500">100%</div>
              <div className="text-xs uppercase text-slate-400 font-semibold tracking-wider mt-1">Precision Engineering</div>
            </div>
            <div className="text-center px-4 border-l border-slate-800">
              <div className="text-3xl md:text-4xl font-extrabold text-orange-500">Karachi</div>
              <div className="text-xs uppercase text-slate-400 font-semibold tracking-wider mt-1">Operational Hub</div>
            </div>
          </div>

        </div>
      </section>

      {/* ==========================================
          SERVICES SECTION
          ========================================== */}
      <section id="services" className="py-20 bg-slate-900/40 relative border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs uppercase tracking-widest text-orange-500 font-bold mb-3">Our Capabilities</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold">Professional Low-Voltage Service Engineering</h3>
            <p className="text-slate-400 mt-4 leading-relaxed">
              We design, wire, configure, and maintain robust business systems that align with strict engineering logic and enterprise workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesList.map((service) => (
              <div
                key={service.id}
                className="bg-slate-900 border border-slate-800 hover:border-slate-700/80 p-8 rounded-xl transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 bg-slate-950 rounded-lg flex items-center justify-center border border-slate-800 mb-6 group-hover:border-orange-500/40 group-hover:bg-orange-500/5 transition-all">
                    {service.icon}
                  </div>
                  <h4 className="text-xl font-bold mb-3 text-slate-100 group-hover:text-orange-400 transition-colors">
                    {service.title}
                  </h4>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>
                
                <ul className="space-y-2.5 pt-4 border-t border-slate-800/80">
                  {service.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
                      <span className="text-orange-500 font-bold mr-1">✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ==========================================
          THE SOFTWIRE EDGE (Why Choose Us)
          ========================================== */}
      <section id="why-choose-us" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Text column */}
            <div>
              <h2 className="text-xs uppercase tracking-widest text-orange-500 font-bold mb-3">Engineering Excellence</h2>
              <h3 className="text-3xl md:text-4xl font-extrabold mb-6">Built for Performance, Labeled with Logic</h3>
              <p className="text-slate-400 leading-relaxed mb-8">
                Softwire stands apart because we look at systems as unified biological architectures. We reject un-documented cabling, un-labeled configurations, and un-optimized hardware setups. Our work is clean, reliable, and mapped for long-term scalability.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-950 text-orange-500 flex items-center justify-center font-bold text-sm">1</div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-100">End-to-End Technical Mastery</h4>
                    <p className="text-sm text-slate-400 mt-1 leading-relaxed">Handling every layer from physical structural cabling and low-voltage electrical flow to deep network topology and customized IoT automation.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-950 text-orange-500 flex items-center justify-center font-bold text-sm">2</div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-100">Hardware & Software Integration</h4>
                    <p className="text-sm text-slate-400 mt-1 leading-relaxed">We do not simply place devices on walls. We integrate routing protocols, construct custom sensor routines, and deploy management software systems.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-950 text-orange-500 flex items-center justify-center font-bold text-sm">3</div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-100">Clean & Documented Delivery</h4>
                    <p className="text-sm text-slate-400 mt-1 leading-relaxed">Neat structured lines, labeled cable endpoints, and clean server rack management make future expansion simple and straightforward.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual column with interactive element */}
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl relative">
              <div className="absolute top-0 right-0 transform translate-x-3 -translate-y-3 bg-orange-600 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                The Standard
              </div>
              
              <h4 className="text-xl font-bold mb-6 text-slate-100">A Glimpse Into Our Engineering Logic</h4>
              
              <div className="space-y-4 text-sm">
                <div className="bg-slate-950 p-4 rounded-lg border-l-2 border-orange-500">
                  <span className="text-xs text-orange-500 font-bold block mb-1">NETWORK TOPOLOGY LAYOUT</span>
                  <p className="text-slate-300">ISP Links → MikroTik Load Balancing Core → Gigabit Switch Backbone (Segmented VLANs for CCTV, IoT Control, and Office Data Traffic).</p>
                </div>

                <div className="bg-slate-950 p-4 rounded-lg border-l-2 border-orange-500">
                  <span className="text-xs text-orange-500 font-bold block mb-1">INDUSTRIAL AUTOMATION PATTERN</span>
                  <p className="text-slate-300">Level Sensors → Real-time Hardware Controller Layer → Isolated Water Management Gateways → Remote Solar-backed Overrides.</p>
                </div>

                <div className="bg-slate-950 p-4 rounded-lg border-l-2 border-orange-500">
                  <span className="text-xs text-orange-500 font-bold block mb-1">DOCUMENTATION PROTOCOL</span>
                  <p className="text-slate-300">All patch panels, network routes, IP allocations, and safety modules are explicitly labeled and logged for direct support pass-offs.</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ==========================================
          PORTFOLIO SECTION (Interactive Tabs)
          ========================================== */}
      <section id="case-studies" className="py-20 bg-slate-900/30 border-t border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs uppercase tracking-widest text-orange-500 font-bold mb-3">Grounded Engineering Portfolios</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold">Real-World Challenges Solved Professionally</h3>
            <p className="text-slate-400 mt-4 leading-relaxed">
              We solve complex, location-specific infrastructure issues with accurate engineering decisions instead of guesswork.
            </p>
          </div>

          {/* Tab buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {caseStudies.map((study) => (
              <button
                key={study.id}
                onClick={() => setActiveTab(study.id)}
                className={`px-5 py-3 rounded-lg text-sm font-bold transition-all ${
                  activeTab === study.id
                    ? 'bg-orange-600 text-white shadow-lg shadow-orange-500/20'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {study.client}
              </button>
            ))}
          </div>

          {/* Active study display card */}
          {caseStudies.map((study) => {
            if (study.id !== activeTab) return null;
            return (
              <div
                key={study.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-10 transition-all duration-300"
              >
                <div className="flex flex-wrap gap-2 mb-6">
                  {study.tags.map((tag, i) => (
                    <span key={i} className="text-xs bg-slate-950 text-slate-300 border border-slate-800 px-3 py-1.5 rounded-full font-medium">
                      {tag}
                    </span>
                  ))}
                </div>

                <h4 className="text-2xl md:text-3xl font-extrabold mb-8 text-slate-100">
                  {study.title}
                </h4>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="bg-slate-950 p-6 rounded-xl border border-slate-800">
                    <span className="text-xs font-bold text-orange-500 uppercase tracking-wider block mb-2">The Challenge</span>
                    <p className="text-sm text-slate-300 leading-relaxed">{study.challenge}</p>
                  </div>

                  <div className="bg-slate-950 p-6 rounded-xl border border-slate-800">
                    <span className="text-xs font-bold text-orange-500 uppercase tracking-wider block mb-2">Our Engineering Solution</span>
                    <p className="text-sm text-slate-300 leading-relaxed">{study.solution}</p>
                  </div>

                  <div className="bg-slate-950 p-6 rounded-xl border border-slate-800">
                    <span className="text-xs font-bold text-orange-500 uppercase tracking-wider block mb-2">The Real-World Outcome</span>
                    <p className="text-sm text-slate-300 leading-relaxed">{study.outcome}</p>
                  </div>
                </div>

                {/* Direct WhatsApp Project Inquiry button */}
                <div className="mt-10 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h5 className="font-bold text-slate-100">Interested in a similar high-performance configuration?</h5>
                    <p className="text-xs text-slate-400 mt-1">Our system architect will analyze your site details and construct a custom setup.</p>
                  </div>
                  <a
                    href={`https://wa.me/923120313575?text=${encodeURIComponent(
                      `Hi Softwire, I saw your case study on "${study.client}" and need an engineer to consult on a similar installation for our space.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-6 py-3 rounded-lg transition-all"
                  >
                    <span>Consult on this Setup</span>
                  </a>
                </div>
              </div>
            );
          })}

        </div>
      </section>

      {/* ==========================================
          INDUSTRIES SERVED GRID
          ========================================== */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs uppercase tracking-widest text-orange-500 font-bold mb-3">Enterprise Sectors</h2>
            <h3 className="text-2xl md:text-3xl font-extrabold">Serving Operations Across All Critical Domains</h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {industryVerticals.map((ind, i) => (
              <div
                key={i}
                className="bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 hover:border-slate-700 p-5 rounded-lg text-center transition-all"
              >
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mx-auto mb-3"></div>
                <span className="text-xs font-bold text-slate-200 tracking-wide block">{ind}</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ==========================================
          INTERACTIVE LEAD & ESTIMATE BUILDER (quote-estimator)
          ========================================== */}
      <section id="quote-estimator" className="py-20 bg-slate-900/50 relative border-t border-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center mb-12">
            <span className="text-xs font-bold tracking-widest text-orange-500 uppercase bg-orange-500/10 px-3 py-1.5 rounded-full">
              Zero-Obligation Estimate Builder
            </span>
            <h3 className="text-3xl font-extrabold text-slate-100 mt-4">
              Outline Your Engineering Requirements
            </h3>
            <p className="text-sm text-slate-400 mt-2">
              Select your requirements step-by-step to automatically format your project summary.
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 md:p-10">
            
            {/* Progress indicators */}
            {!isSubmitted && (
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-800/60 text-xs font-bold uppercase tracking-widest text-slate-400">
                <span className={currentStep === 1 ? 'text-orange-500' : ''}>1. Select Sector</span>
                <span className="text-slate-700">|</span>
                <span className={currentStep === 2 ? 'text-orange-500' : ''}>2. Select Services</span>
                <span className="text-slate-700">|</span>
                <span className={currentStep === 3 ? 'text-orange-500' : ''}>3. Core Details</span>
              </div>
            )}

            {/* Step Content */}
            {!isSubmitted ? (
              <form onSubmit={handleSubmitInquiry} className="space-y-6">
                
                {/* STEP 1: SELECT INDUSTRY */}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <label className="block text-base font-bold text-slate-200 mb-2">
                      What best describes your business or property sector?
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {industryVerticals.map((ind, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setFormData({ ...formData, industry: ind })}
                          className={`w-full text-left p-4 rounded-xl border text-sm font-semibold transition-all ${
                            formData.industry === ind
                              ? 'bg-orange-900/40 border-orange-500 text-slate-100'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          {ind}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 2: SELECT SERVICES */}
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <label className="block text-base font-bold text-slate-200 mb-2">
                      Which services do your operational blueprints require?
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {servicesList.map((service) => (
                        <button
                          key={service.id}
                          type="button"
                          onClick={() => handleServiceToggle(service.title)}
                          className={`w-full text-left p-4 rounded-xl border text-sm font-semibold transition-all flex items-center justify-between ${
                            formData.services.includes(service.title)
                              ? 'bg-orange-900/40 border-orange-500 text-slate-100'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          <span>{service.title}</span>
                          <span className={`w-5 h-5 rounded-md flex items-center justify-center border text-xs ${
                            formData.services.includes(service.title)
                              ? 'bg-orange-500 border-orange-400 text-white font-bold'
                              : 'border-slate-700'
                          }`}>
                            {formData.services.includes(service.title) ? '✓' : ''}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 3: CONTACT INFORMATION */}
                {currentStep === 3 && (
                  <div className="space-y-4">
                    <label className="block text-base font-bold text-slate-200 mb-2">
                      Please enter your contact information
                    </label>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase font-bold text-slate-400 tracking-wider mb-2">Your Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Abdullah Khan"
                          className="w-full bg-slate-950 border border-slate-800 focus:border-orange-500 focus:outline-none rounded-lg p-3 text-sm text-slate-200"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase font-bold text-slate-400 tracking-wider mb-2">Company / Villa Name</label>
                        <input
                          type="text"
                          value={formData.businessName}
                          onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                          placeholder="e.g. Shan Logistics"
                          className="w-full bg-slate-950 border border-slate-800 focus:border-orange-500 focus:outline-none rounded-lg p-3 text-sm text-slate-200"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase font-bold text-slate-400 tracking-wider mb-2">WhatsApp or Phone Number *</label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="e.g. 03120313575"
                          className="w-full bg-slate-950 border border-slate-800 focus:border-orange-500 focus:outline-none rounded-lg p-3 text-sm text-slate-200"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase font-bold text-slate-400 tracking-wider mb-2">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="e.g. operations@domain.com"
                          className="w-full bg-slate-950 border border-slate-800 focus:border-orange-500 focus:outline-none rounded-lg p-3 text-sm text-slate-200"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-bold text-slate-400 tracking-wider mb-2">Brief Scope Notes (Optional)</label>
                      <textarea
                        rows={3}
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="Describe special challenges (e.g. thick concrete walls, offline network limits, backup power requirements)."
                        className="w-full bg-slate-950 border border-slate-800 focus:border-orange-500 focus:outline-none rounded-lg p-3 text-sm text-slate-200"
                      />
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="pt-6 border-t border-slate-800/60 flex justify-between">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-6 py-2.5 rounded-lg text-sm bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 font-bold"
                    >
                      Back
                    </button>
                  ) : (
                    <div></div>
                  )}

                  {currentStep < 3 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="px-6 py-2.5 rounded-lg text-sm bg-orange-600 hover:bg-orange-500 text-white font-extrabold shadow-md shadow-orange-500/10"
                    >
                      Next Step
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="px-8 py-3 rounded-lg text-sm bg-orange-600 hover:bg-orange-500 text-white font-extrabold shadow-lg shadow-orange-500/20"
                    >
                      Generate Blueprints & Submit
                    </button>
                  )}
                </div>

              </form>
            ) : (
              /* SUCCESS SCREEN WITH DIRECT WA & EMAIL HOOKS */
              <div className="text-center py-6 space-y-6">
                <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto text-orange-500 text-2xl font-bold">
                  ✓
                </div>
                
                <div>
                  <h4 className="text-2xl font-extrabold text-slate-100"> ब्लू प्रिंट Generated Successfully!</h4>
                  <p className="text-sm text-slate-400 mt-2 max-w-md mx-auto">
                    We have processed your selections. To connect with our technical architect immediately, please select your preferred action below:
                  </p>
                </div>

                {/* Inquiry Summary Block */}
                <div className="bg-slate-950 p-6 rounded-xl border border-slate-800/80 text-left max-w-lg mx-auto space-y-3">
                  <h5 className="text-xs font-bold uppercase tracking-widest text-orange-500"> Blueprints Summary</h5>
                  <div className="text-sm space-y-2">
                    <p className="text-slate-300"><span className="font-bold text-slate-400">Industry Sector:</span> {formData.industry}</p>
                    <p className="text-slate-300"><span className="font-bold text-slate-400">Selected Services:</span> {formData.services.join(', ')}</p>
                    <p className="text-slate-300"><span className="font-bold text-slate-400">Contact:</span> {formData.name} ({formData.phone})</p>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-md mx-auto pt-4">
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-1/2 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-lg flex items-center justify-center space-x-2 transition-all shadow-lg"
                  >
                    <span>Instant WhatsApp Visit</span>
                  </a>
                  <a
                    href={getMailtoLink()}
                    className="w-full sm:w-1/2 py-4 bg-slate-950 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 text-slate-200 font-bold rounded-lg flex items-center justify-center transition-all"
                  >
                    Send Email Quote
                  </a>
                </div>

                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setCurrentStep(1);
                    setFormData({
                      industry: '',
                      services: [],
                      name: '',
                      businessName: '',
                      phone: '',
                      email: '',
                      notes: '',
                    });
                  }}
                  className="text-xs text-orange-500 hover:underline font-bold mt-4 block mx-auto"
                >
                  Create New Estimate Form
                </button>

              </div>
            )}

          </div>

        </div>
      </section>

      {/* ==========================================
          FOOTER WITH GEOGRAPHIC Grounded details
          ========================================== */}
      <footer className="bg-slate-950 border-t border-slate-900 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-900">
            
            {/* Branding Column */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center font-bold text-white text-xs">
                  SW
                </div>
                <span className="font-extrabold tracking-wider text-slate-100">SOFTWIRE</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Professional hardware and software integration engineered in Karachi, Pakistan. Transforming complex structures into seamless, secure, intelligent environments.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h5 className="text-xs uppercase font-extrabold text-slate-200 tracking-wider mb-4">Blueprints</h5>
              <ul className="space-y-2 text-xs">
                <li><a href="#services" className="text-slate-400 hover:text-orange-500 transition-colors">Surveillance CCTV</a></li>
                <li><a href="#services" className="text-slate-400 hover:text-orange-500 transition-colors">MikroTik Optimization</a></li>
                <li><a href="#services" className="text-slate-400 hover:text-orange-500 transition-colors">Access Controls</a></li>
                <li><a href="#services" className="text-slate-400 hover:text-orange-500 transition-colors">Smart Automation & IoT</a></li>
              </ul>
            </div>

            {/* Case Studies */}
            <div>
              <h5 className="text-xs uppercase font-extrabold text-slate-200 tracking-wider mb-4">Grounded Portfolios</h5>
              <ul className="space-y-2 text-xs">
                <li><a href="#case-studies" className="text-slate-400 hover:text-orange-500 transition-colors">Abdullah Haroon Villa</a></li>
                <li><a href="#case-studies" className="text-slate-400 hover:text-orange-500 transition-colors">Shan Foods Plant Setup</a></li>
                <li><a href="#case-studies" className="text-slate-400 hover:text-orange-500 transition-colors">Strongwill P2P solar link</a></li>
                <li><a href="#case-studies" className="text-slate-400 hover:text-orange-500 transition-colors">Burhani Blood Bank Security</a></li>
              </ul>
            </div>

            {/* Contact Geographic details */}
            <div className="space-y-2">
              <h5 className="text-xs uppercase font-extrabold text-slate-200 tracking-wider mb-4">Office & Contacts</h5>
              <ul className="space-y-3 text-xs text-slate-400">
                <li className="flex items-start space-x-2">
                  <span className="text-orange-500 font-bold">📍</span>
                  <span>Gulshan-e-Iqbal, Karachi, Pakistan</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-orange-500 font-bold">📞</span>
                  <a href="tel:03120313575" className="hover:text-orange-400 transition-colors">0312-0313575</a>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-orange-500 font-bold">✉️</span>
                  <a href="mailto:info@softwire.info" className="hover:text-orange-400 transition-colors">info@softwire.info</a>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-orange-500 font-bold">🌐</span>
                  <a href="https://softwire.info" target="_blank" rel="noreferrer" className="hover:text-orange-400 transition-colors">softwire.info</a>
                </li>
              </ul>
            </div>

          </div>

          {/* Copy block */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
            <p>© {new Date().getFullYear()} Softwire Intelligent Systems. All Rights Reserved.</p>
            <p>Designed and Built for Modern Search Optimization (SEO) & Fast High-Converting Funnels.</p>
          </div>

        </div>
      </footer>

    </div>
  );
}
