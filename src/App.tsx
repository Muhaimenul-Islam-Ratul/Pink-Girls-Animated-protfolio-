import React, { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Sparkles,
  ChevronRight,
  GraduationCap,
  Star,
  Award,
  Terminal as TerminalIcon,
  Cpu,
  BookOpen,
  Globe,
  Heart,
  Send,
  Github,
  Check,
  Languages,
  Compass,
  ArrowDown,
  Quote,
  ShieldCheck,
  Code,
  Gamepad2,
  Info
} from "lucide-react";

import FloatingPetals from "./components/FloatingPetals";
import LiveTerminal from "./components/LiveTerminal";
import GuavaClassifier from "./components/GuavaClassifier";
import ThreeMenMorris from "./components/ThreeMenMorris";
import profileImg from "../assets/profile.jpg";
import {
  profileBio,
  educations,
  competencies,
  skillCategories,
  projects,
  certifications,
  testimonials,
  hobbies
} from "./data";

export default function App() {
  // Animated title typewriter effect subtitle list index switcher
  const [subtitleIdx, setSubtitleIdx] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Active Interactive Widget selection
  const [activePlayTab, setActivePlayTab] = useState<"terminal" | "guava" | "game">("terminal");

  // Contact simulated form state
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMsg, setContactMsg] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  // Parallax scroll variable
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Soft Typewriter cycle loop for Coder tags
  useEffect(() => {
    const currentWord = profileBio.subtitles[subtitleIdx];
    let timer: number;

    if (isDeleting) {
      timer = window.setTimeout(() => {
        setTypedText((prev) => prev.substring(0, prev.length - 1));
      }, 50);
    } else {
      timer = window.setTimeout(() => {
        setTypedText((prev) => currentWord.substring(0, prev.length + 1));
      }, 100);
    }

    if (!isDeleting && typedText === currentWord) {
      timer = window.setTimeout(() => setIsDeleting(true), 1500); // Wait on word fully shown
    } else if (isDeleting && typedText === "") {
      setIsDeleting(false);
      setSubtitleIdx((prev) => (prev + 1) % profileBio.subtitles.length);
    }

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, subtitleIdx]);

  // Form submit simulator
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMsg) return;
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
      setContactName("");
      setContactEmail("");
      setContactMsg("");
      setTimeout(() => setIsSent(false), 5500);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-blush text-currant font-sans relative overflow-x-hidden selection:bg-peony selection:text-white">
      {/* Falling Flower Petals Canvas Animator Background */}
      <FloatingPetals />

      {/* Grid background effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,46,147,0.06),transparent_50%)] pointer-events-none" />

      {/* Floating Glass Navigation Header */}
      <header className="fixed top-4 inset-x-4 bg-blush-card border border-peony/12 rounded-2xl z-50 backdrop-blur-md shadow-sm max-w-7xl mx-auto py-2.5 px-4 md:px-6 flex items-center justify-between transition-all">
        <a href="#hero" className="flex items-center space-x-2 select-none group" id="nav-branding">
          <div className="w-8 h-8 rounded-full bg-currant flex items-center justify-center font-serif text-blush text-md font-bold group-hover:bg-peony transition-colors border border-peony/20">
            M
          </div>
          <span className="font-serif text-lg md:text-xl font-bold tracking-tight text-currant group-hover:text-peony transition-all">
            {profileBio.name}
          </span>
        </a>

        {/* Action Bookmarks */}
        <nav className="flex items-center space-x-1.5 md:space-x-4 text-xs font-mono font-bold tracking-wide">
          <a
            href="#interactive-sandbox"
            className="px-2 md:px-3 py-1.5 text-currant/75 hover:text-peony transition-colors"
          >
            PLAYGROUND
          </a>
          <a
            href="#research-education"
            className="px-2 md:px-3 py-1.5 text-currant/75 hover:text-peony transition-colors"
          >
            RESEARCH & BIO
          </a>
          <a
            href="#credentials"
            className="px-2 md:px-3 py-1.5 text-currant/75 hover:text-peony transition-colors hidden sm:inline-block"
          >
            CREDENTIALS
          </a>
          <a
            href="#contact"
            className="px-3 py-2 bg-currant hover:bg-peony text-blush rounded-xl transition-all border border-peony/10 flex items-center space-x-1 font-semibold"
            id="nav-hire-me-btn"
          >
            <Mail size={12} />
            <span className="hidden xs:inline">HIRE ME</span>
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-screen flex flex-col justify-center pt-28 pb-16 px-4 md:px-8 max-w-7xl mx-auto relative relative-z-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Typographical Frame */}
          <div
            className="lg:col-span-7 flex flex-col text-left space-y-6"
            style={{ transform: `translateY(${scrollY * 0.1}px)` }}
          >
            <div className="inline-flex items-center space-x-2 bg-peony/8 border border-peony/20 px-3 py-1.5 rounded-full text-xs font-mono font-bold text-peony uppercase tracking-wider w-fit">
              <Sparkles size={12} className="animate-pulse" />
              <span>DIU COMPUTER SCIENCE & ENGINEERING HONOR GRADUATE</span>
            </div>

            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7.5xl text-currant leading-[1.08] font-bold tracking-tight">
              Crafting Code with <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-currant-light via-peony to-peony-light drop-shadow-sm font-semibold italic">
                Peony Elegance
              </span>
            </h1>

            {/* Simulated Live IDE Terminal line */}
            <div className="bg-currant/95 text-blush font-mono rounded-xl p-3.5 border border-peony/25 shadow-xl max-w-lg glow-peony">
              <div className="flex items-center space-x-1.5 text-pink-400 mb-2.5 text-[10px] select-none uppercase tracking-widest font-bold">
                <Code size={12} className="animate-pulse" />
                <span>ACTIVE LOCAL SHELL_TERMINAL</span>
              </div>
              <p className="text-[14px] leading-relaxed">
                <span className="text-peony-light">&gt; monira_os</span> --status -v
                <br />
                <span className="text-emerald-400">✔ Loaded Monira Akter: </span>
                <span className="text-blush-dark font-extrabold bg-peony/20 px-1 rounded">
                  {typedText}
                </span>
                <span className="text-peony animate-ping">|</span>
              </p>
            </div>

            <p className="text-md sm:text-lg text-dusty font-normal max-w-xl leading-relaxed">
              Academic researcher specializing in computer vision, neural network classification (CGPA <strong className="text-currant font-extrabold">3.90/4.00</strong>), and responsive, polished fullstack web development. Combining tech precision with custom visual aesthetics.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-4 max-w-md">
              <a
                href="#interactive-sandbox"
                className="px-6 py-3.5 bg-peony hover:bg-peony-light text-blush rounded-xl font-mono text-xs font-bold text-center tracking-wider shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 transition-all border border-peony-light/20"
                id="hero-play-trigger"
              >
                LAUNCH CODE SANDBOX
              </a>
              <a
                href="#research-education"
                className="px-6 py-3.5 bg-currant hover:bg-currant-light text-blush rounded-xl font-mono text-xs font-bold text-center tracking-wider transition-all border border-peony/10 flex items-center justify-center space-x-2"
              >
                <span>EXPLORE RESEARCH</span>
                <ArrowDown size={12} className="animate-bounce" />
              </a>
            </div>

            {/* Profile Statistics Panel */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-peony/10 max-w-lg">
              <div>
                <span className="text-3xl md:text-4xl font-serif text-currant font-bold select-none">3.90</span>
                <span className="text-[10px] font-mono text-dusty block uppercase tracking-wider mt-1">
                  DIU B.Sc CGPA
                </span>
              </div>
              <div>
                <span className="text-3xl md:text-4xl font-serif text-currant font-bold select-none">YOLOv8</span>
                <span className="text-[10px] font-mono text-dusty block uppercase tracking-wider mt-1">
                  Research Thesis
                </span>
              </div>
              <div>
                <span className="text-3xl md:text-4xl font-serif text-currant font-bold select-none">98.7%</span>
                <span className="text-[10px] font-mono text-dusty block uppercase tracking-wider mt-1">
                  Class Honors
                </span>
              </div>
            </div>
          </div>

          {/* Graphical Frame (Premium Framed Avatar Art Illustration) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full max-w-[370px] aspect-square rounded-full border-4 border-peony/15 scale-100 p-3 bg-blush-dark transition-all duration-500 glow-peony">
              <div className="absolute -inset-1 border border-dashed border-peony/50 rounded-full animate-[spin_24s_linear_infinite]" />
              
              {/* Profile Image - using the provided photo with background styling */}
              <div className="w-full h-full rounded-full overflow-hidden border-2 border-peony/25 relative flex flex-col items-center justify-end text-center select-none bg-currant">
                {/* Background profile image */}
                <img 
                  src={profileImg} 
                  alt={profileBio.name}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
                
                {/* Gradient overlay to ensure text readability */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-currant-dark/90 via-currant-dark/60 to-transparent z-10" />

                {/* Sparkles and light overlays on top of the image */}
                <div className="absolute top-4 left-4 w-12 h-12 bg-peony/20 rounded-full blur-xl pointer-events-none" />
                <div className="absolute bottom-12 right-4 w-12 h-12 bg-peony-light/20 rounded-full blur-xl animate-pulse pointer-events-none" />

                <div className="z-20 pb-8 px-4 w-full">
                  <h3 className="font-serif text-2xl text-blush font-bold tracking-tight mb-1 drop-shadow-md">
                    {profileBio.name}
                  </h3>
                  <p className="font-mono text-xs text-peony-light font-bold mb-3 drop-shadow-sm">
                    &lt; Programmer & Coder /&gt;
                  </p>
                  
                  {/* Bangladesh tag */}
                  <span className="inline-flex items-center space-x-1 px-2.5 py-1 bg-peony text-blush rounded-full text-[10px] font-mono font-semibold shadow-md">
                    <MapPin size={9} />
                    <span>Dhaka, Bangladesh</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Competencies Quick Strip */}
      <section className="bg-currant border-y border-peony/20 py-8 relative z-20">
        <div className="max-w-7xl mx-auto px-4 overflow-x-auto whitespace-nowrap flex items-center justify-around space-x-8 scrollbar-none scroll-smooth">
          {competencies.map((comp, idx) => (
            <div key={idx} className="inline-flex items-center space-x-2.5 select-none shrink-0">
              <Star size={14} className="text-peony animate-spin" style={{ animationDuration: "6s" }} />
              <span className="font-serif text-blush text-md md:text-lg tracking-wide font-normal">
                {comp}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Sandbox Play Zone */}
      <section id="interactive-sandbox" className="py-24 px-4 md:px-8 max-w-7xl mx-auto relative z-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-1 px-3 py-1 bg-peony/5 border border-peony/15 text-peony text-xs font-mono font-bold rounded-full uppercase tracking-widest mb-3.5">
            <TerminalIcon size={12} />
            <span>Interactive Development Interface</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-currant font-bold tracking-tight mb-4">
            Monira's Live Code Sandbox
          </h2>
          <p className="text-dusty text-sm md:text-md leading-relaxed font-sans">
            Don't just read about accomplishments — verify them. Interact with Monira's live portfolio through these interactive widgets designed to demonstrate web system compilation, machine learning analytics, and logical algorithm capabilities.
          </p>

          {/* Interactive tabs selector */}
          <div className="flex bg-currant/5 p-1 rounded-2xl border border-peony/10 max-w-md mx-auto mt-8 relative">
            <button
              onClick={() => setActivePlayTab("terminal")}
              className={`flex-1 py-3 text-xs font-mono font-bold rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                activePlayTab === "terminal"
                  ? "bg-currant text-blush shadow"
                  : "text-currant/70 hover:text-peony"
              }`}
              id="sandbox-tab-terminal"
            >
              <TerminalIcon size={13} />
              <span>1. Code IDE</span>
            </button>
            <button
              onClick={() => setActivePlayTab("guava")}
              className={`flex-1 py-3 text-xs font-mono font-bold rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                activePlayTab === "guava"
                  ? "bg-currant text-blush shadow"
                  : "text-currant/70 hover:text-peony"
              }`}
              id="sandbox-tab-guava"
            >
              <Cpu size={13} />
              <span>2. Capstone ML</span>
            </button>
            <button
              onClick={() => setActivePlayTab("game")}
              className={`flex-1 py-3 text-xs font-mono font-bold rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                activePlayTab === "game"
                  ? "bg-currant text-blush shadow"
                  : "text-currant/70 hover:text-peony"
              }`}
              id="sandbox-tab-game"
            >
              <Gamepad2 size={13} />
              <span>3. Morris Game</span>
            </button>
          </div>
        </div>

        {/* Dynamic widget rendering */}
        <div className="transition-all duration-300">
          {activePlayTab === "terminal" && <LiveTerminal />}
          {activePlayTab === "guava" && <GuavaClassifier />}
          {activePlayTab === "game" && <ThreeMenMorris />}
        </div>
      </section>

      {/* Detailed Technical Stack (Vibe as Coder) */}
      <section className="bg-blush-dark/30 py-24 px-4 md:px-8 border-y border-peony/12 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-xs font-mono text-peony font-bold tracking-widest uppercase block mb-2">
              COMPUTATIONAL TECH SPECTRUM
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-currant font-bold tracking-tight">
              Tools, Platforms & AI Pipelines
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {skillCategories.map((cat, idx) => (
              <div
                key={idx}
                className="bg-blush-card rounded-2xl p-5 border border-peony/10 flex flex-col justify-between shadow-sm transition-all hover:border-peony/35 hover:-translate-y-1 block"
              >
                <div>
                  <div className="w-9 h-9 rounded-xl bg-peony/8 border border-peony/20 flex items-center justify-center text-peony font-bold mb-4">
                    {idx === 0 && <Code size={16} />}
                    {idx === 1 && <Globe size={16} />}
                    {idx === 2 && <TerminalIcon size={16} />}
                    {idx === 3 && <Cpu size={16} />}
                    {idx === 4 && <Award size={16} />}
                  </div>
                  <h4 className="font-serif text-lg text-currant font-bold mb-3 tracking-wide">
                    {cat.title}
                  </h4>
                  <ul className="space-y-2 font-mono text-xs text-dusty">
                    {cat.skills.map((skill, sIdx) => (
                      <li key={sIdx} className="flex items-center space-x-1.5 leading-relaxed">
                        <span className="w-1.5 h-1.5 bg-peony rounded-full shrink-0" />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research & Education Sections (Timeline view) */}
      <section id="research-education" className="py-24 px-4 md:px-8 max-w-7xl mx-auto relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* left side: Thesis highlight */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-mono text-peony font-bold tracking-widest uppercase block">
              RESEARCH JOURNAL SPOTLIGHT
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-currant font-bold leading-snug">
              Guava Disease Classification & Deep Segmentation Research
            </h2>
            <p className="text-sm font-sans text-dusty leading-relaxed">
              Monira's capstone dataset processing and neural pipeline research targets the digitalization of diagnostics for guava plantations across Bangladesh. Utilizing state-of-the-art computer vision segmentation layers to assist farmers lacking immediate access to on-site agronomists.
            </p>

            <div className="bg-currant text-blush rounded-2xl p-6 border-2 border-peony/15 relative overflow-hidden shadow-xl">
              <Quote className="absolute top-4 right-4 text-peony/15" size={48} />
              
              <span className="text-[10px] font-mono text-peony-light uppercase tracking-widest block mb-2 font-bold">
                SUPERVISOR CERTIFICATION TESTIMONIAL
              </span>
              <p className="text-sm italic text-blush/90 leading-relaxed mb-6 font-serif">
                "{testimonials[0].quote}"
              </p>
              <div>
                <span className="font-serif font-bold text-blush text-md block leading-none">
                  {testimonials[0].author}
                </span>
                <span className="text-xs text-peony-light font-mono mt-1 block">
                  {testimonials[0].role}
                </span>
                <span className="text-[10px] text-dusty font-mono mt-0.5 block">
                  {testimonials[0].affiliation}
                </span>
              </div>
            </div>
          </div>

          {/* right side: Timeline */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-mono text-peony font-bold tracking-widest uppercase block">
              ACADEMIC TRAJECTORY TIMELINE
            </span>
            <h2 className="font-serif text-2xl md:text-3xl text-currant font-bold">
              Education & Honors
            </h2>

            <div className="space-y-8 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-peony/20">
              {educations.map((edu, idx) => (
                <div key={idx} className="relative pl-10 group" id={`timeline-card-${idx}`}>
                  {/* Circle marker */}
                  <div className="absolute left-1.5 top-1.5 w-5 h-5 rounded-full bg-blush border-2 border-peony flex items-center justify-center p-0.5 z-10 transition-colors group-hover:bg-peony">
                    <GraduationCap size={10} className="text-peony group-hover:text-blush transition-colors" />
                  </div>

                  <div className="bg-blush-card rounded-2xl p-5 border border-peony/10 shadow-sm hover:shadow transition-all hover:border-peony/35">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 mb-3">
                      <div>
                        <h4 className="font-serif text-lg md:text-xl text-currant font-bold">
                          {edu.degree}
                        </h4>
                        <span className="text-xs text-dusty font-mono tracking-wider">
                          {edu.institution}
                        </span>
                      </div>
                      <div className="flex flex-row md:flex-col items-center md:items-end shrink-0 gap-2 font-mono">
                        <span className="px-2.5 py-0.5 bg-currant text-blush rounded text-[10px] font-bold">
                          {edu.duration}
                        </span>
                        <span className="text-xs text-peony font-extrabold pr-1">
                          {edu.grade}
                        </span>
                      </div>
                    </div>

                    <ul className="space-y-2 text-xs font-sans text-currant/85">
                      {edu.details.map((detail, dIdx) => (
                        <li key={dIdx} className="flex items-start space-x-2">
                          <Check size={12} className="text-peony shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Languages & Hobbies, Certifications Panel Segment (Bento Styling) */}
      <section id="credentials" className="bg-currant text-blush py-24 px-4 md:px-8 border-t border-peony/25 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Certifications (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between bg-currant-dark/40 rounded-2xl p-6 md:p-8 border border-peony/15 shadow-xl">
              <div>
                <div className="flex items-center space-x-2 text-peony text-xs font-mono font-bold uppercase tracking-wider mb-2">
                  <Award size={14} className="animate-bounce" />
                  <span>Verified Credentials</span>
                </div>
                <h3 className="font-serif text-2xl md:text-3xl text-blush font-bold mb-6">
                  Certifications & Achievements
                </h3>

                <div className="space-y-4">
                  {certifications.map((cert, idx) => (
                    <div
                      key={idx}
                      className="bg-currant flex items-center justify-between p-4 rounded-xl border border-peony/10 hover:border-peony/35 transition-all"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg bg-peony/10 border border-peony/20 flex items-center justify-center text-peony">
                          <ShieldCheck size={18} />
                        </div>
                        <div>
                          <h5 className="font-serif text-md text-blush-dark font-semibold">
                            {cert.name}
                          </h5>
                          <span className="text-xxs font-mono text-dusty">{cert.issuer}</span>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-peony-light font-bold bg-peony/15 px-2 py-0.5 rounded">
                        {cert.year}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-peony/10 flex items-center space-x-2 text-xs font-mono text-dusty select-none">
                <Info size={14} className="text-peony" />
                <span>DIU Academic Department certified registry available upon requisition.</span>
              </div>
            </div>

            {/* Languages & Hobbies (5 cols) */}
            <div className="lg:col-span-5 grid grid-rows-2 gap-8">
              {/* Languages card */}
              <div className="bg-currant-dark/40 rounded-2xl p-6 border border-peony/15 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-2 text-peony text-xs font-mono font-bold uppercase tracking-wider mb-2">
                    <Languages size={14} />
                    <span>Linguistic Range</span>
                  </div>
                  <h4 className="font-serif text-xl text-blush font-bold mb-4">
                    Languages
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { lang: "Bangla", level: "Native" },
                      { lang: "English", level: "Fluent" },
                      { lang: "German", level: "A1 Starter" },
                      { lang: "Hindi", level: "Conversation" },
                      { lang: "Urdu", level: "Conversation" }
                    ].map((item, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-currant hover:border-peony/40 rounded-lg border border-peony/10 text-xs font-mono flex items-center space-x-1.5 transition-all text-blush-dark"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-peony" />
                        <span>{item.lang}</span>
                        <span className="text-xxs text-dusty">({item.level})</span>
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-[10px] font-mono text-dusty mt-4">
                  Multi-lingual coverage supports international academic collaborations.
                </div>
              </div>

              {/* Hobbies Card */}
              <div className="bg-currant-dark/40 rounded-2xl p-6 border border-peony/15 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-2 text-peony text-xs font-mono font-bold uppercase tracking-wider mb-2">
                    <Compass size={14} />
                    <span>Inherent Interests</span>
                  </div>
                  <h4 className="font-serif text-xl text-blush font-bold mb-4">
                    Hobbies & Interests
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {hobbies.map((hobby, idx) => (
                      <div
                        key={idx}
                        className="px-3 py-1.5 bg-currant rounded-lg border border-peony/10 hover:border-peony/30 transition-all text-xs font-mono flex items-center space-x-1.5 text-blush-dark"
                      >
                        <Heart size={10} className="text-peony animate-pulse" />
                        <span>{hobby}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-[10px] font-mono text-dusty mt-4">
                  Maintaining balance between system algorithms and natural environment.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Testimonials (Editorial review Panel) */}
      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto relative z-20">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs font-mono text-peony font-bold tracking-widest uppercase block mb-2">
            COLLEAGUE RECOMMENDATIONS
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-currant font-bold tracking-tight">
            Endorsements & Testimonials
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {testimonials.map((test, idx) => (
            <div
              key={idx}
              className="bg-blush-card rounded-2xl p-6 md:p-8 border-2 border-peony/10 flex flex-col justify-between shadow-sm hover:border-peony/35 transition-all relative block"
            >
              <Quote className="absolute top-4 right-4 text-peony/5" size={80} />
              <p className="text-serif text-[15px] sm:text-md italic text-currant/80 leading-relaxed mb-8 relative z-10">
                "{test.quote}"
              </p>
              <div className="relative z-10 pt-4 border-t border-peony/8">
                <span className="font-serif font-bold text-currant text-lg block mb-0.5">
                  {test.author}
                </span>
                <span className="text-xs text-peony font-mono font-bold block uppercase tracking-wider mb-0.5">
                  {test.role}
                </span>
                <span className="text-xxs text-dusty font-mono block">
                  {test.affiliation}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Active Message Composition (CTA Contact Panel) */}
      <section id="contact" className="py-24 px-4 md:px-8 border-t border-peony/15 bg-blush-dark/15 relative z-20">
        <div className="max-w-4xl mx-auto glass-pane rounded-2xl p-6 md:p-10 border border-peony/10 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Left Col Info */}
            <div className="flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-peony font-bold tracking-widest uppercase block mb-2">
                  TRANSMIT COMMUNICATIONS
                </span>
                <h3 className="font-serif text-3xl md:text-4xl text-currant font-bold mb-4">
                  Send a Direct Message
                </h3>
                <p className="text-sm text-dusty leading-relaxed mb-6">
                  Planning a coding project, require artificial intelligence integrations, or wish to explore academic research collaborations? Let's connect immediately.
                </p>
              </div>

              {/* Direct links list */}
              <div className="space-y-4">
                <a
                  href={`mailto:${profileBio.email}`}
                  className="flex items-center space-x-3 text-xs font-mono text-currant hover:text-peony transition-colors py-2 px-3 hover:bg-currant/5 rounded-xl border border-transparent hover:border-peony/10"
                >
                  <Mail className="text-peony" size={16} />
                  <span>{profileBio.email}</span>
                </a>
                <a
                  href={`tel:${profileBio.phone}`}
                  className="flex items-center space-x-3 text-xs font-mono text-currant hover:text-peony transition-colors py-2 px-3 hover:bg-currant/5 rounded-xl border border-transparent hover:border-peony/10"
                >
                  <Phone className="text-peony" size={16} />
                  <span>{profileBio.phone}</span>
                </a>
                <div className="flex items-center space-x-3 text-xs font-mono text-currant py-2 px-3">
                  <MapPin className="text-peony" size={16} />
                  <span className="leading-snug">{profileBio.address}</span>
                </div>
              </div>

              {/* Social Footnote */}
              <div className="mt-8 pt-6 border-t border-peony/10">
                <a
                  href="https://github.com"
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-currant hover:text-peony transition-all"
                >
                  <Github size={14} />
                  <span>GITHUB PROFILE (monira2002)</span>
                </a>
              </div>
            </div>

            {/* Right Col Interactive Form */}
            <div className="bg-blush-card/40 p-5 rounded-2xl border border-peony/10 shadow-sm relative">
              {isSent ? (
                <div className="absolute inset-0 bg-blush flex flex-col justify-center items-center text-center p-6 rounded-2xl animate-fade-in z-15">
                  <div className="w-12 h-12 rounded-full bg-peony/10 border-2 border-peony flex items-center justify-center text-peony mb-4 animate-[bounce_1.5s_infinite]">
                    <Check size={24} />
                  </div>
                  <h4 className="font-serif text-xl font-bold text-currant mb-2">Message Transmitted!</h4>
                  <p className="text-xs font-mono text-dusty max-w-xs leading-relaxed">
                    Thank you. Your message has been sent to monira2002akter@gmail.com successfully. Response pending in under 12 hours.
                  </p>
                </div>
              ) : null}

              <form onSubmit={handleSendMessage} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-mono text-peony uppercase font-bold tracking-wider mb-1">
                    Your Identity / Name
                  </label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Enter full name"
                    className="w-full px-3.5 py-2 rounded-xl text-xs bg-blush-card border border-peony/10 outline-none text-currant focus:border-peony transition-all"
                    id="contact-form-name"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-peony uppercase font-bold tracking-wider mb-1">
                    Email Repository Address
                  </label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-3.5 py-2 rounded-xl text-xs bg-blush-card border border-peony/10 outline-none text-currant focus:border-peony transition-all"
                    id="contact-form-email"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-peony uppercase font-bold tracking-wider mb-1">
                    Communication Body Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={contactMsg}
                    onChange={(e) => setContactMsg(e.target.value)}
                    placeholder="Write details of query..."
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-blush-card border border-peony/10 outline-none text-currant focus:border-peony transition-all resize-none leading-relaxed"
                    id="contact-form-message"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full py-3 bg-currant hover:bg-peony text-blush rounded-xl text-xs font-mono font-bold border border-peony/20 flex items-center justify-center space-x-2 transition-all cursor-pointer disabled:opacity-50 shadow-md"
                  id="contact-form-submit-btn"
                >
                  <Send size={12} className={isSending ? "animate-ping" : ""} />
                  <span>{isSending ? "TRANSMITTING ENCRYPTED..." : "SEND SECURE MESSAGE"}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Styled Footer */}
      <footer className="bg-currant text-blush-dark py-12 px-4 border-t border-peony/15 relative z-20 select-none">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-6">
          <div className="space-y-1">
            <span className="font-serif text-lg font-bold text-blush tracking-wider block">
              Monira Akter
            </span>
            <span className="text-xxs font-mono text-dusty block">
              Computer Science & Engineering Graduate | Hon. CGPA 3.90
            </span>
          </div>

          <div className="text-[10px] font-mono text-dusty space-y-1 text-center md:text-right">
            <span>© 2026 Monira Akter. All rights reserved.</span>
            <br />
            <span>Built in Pale Blush & Deep Currant. Peony flower animations enabled.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
