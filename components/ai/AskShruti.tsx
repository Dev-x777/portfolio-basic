'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { profile } from '@/data/profile';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  projectLink?: string;
}

let nextMessageId = 1;

export function AskShruti() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: "Hi! I am Shruti's AI assistant. Ask me anything about her design engineering projects, big data architecture, or background.",
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleToggle = () => setIsOpen((prev) => !prev);
    window.addEventListener('toggle-ask-shruti', handleToggle);
    return () => window.removeEventListener('toggle-ask-shruti', handleToggle);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (queryText?: string) => {
    const textToSend = (queryText || input).trim();
    if (!textToSend) return;

    const currentId = `msg-${nextMessageId++}`;
    const userMsg: Message = {
      id: currentId,
      sender: 'user',
      text: textToSend,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInput('');

    // Formulate strictly grounded response from data/*.ts
    setTimeout(() => {
      const q = textToSend.toLowerCase();
      let reply = '';
      let link: string | undefined = undefined;

      if (q.includes('facetrace') || q.includes('surveillance') || q.includes('cctv')) {
        reply =
          'FaceTrace is a smart surveillance system built with OpenCV and DeepFace. It achieved 95% facial recognition accuracy across 100+ CCTV frames with real-time alerts delivered under 2 seconds latency.';
        link = '/work/facetrace';
      } else if (q.includes('bhagalpur') || q.includes('silk') || q.includes('ecommerce')) {
        reply =
          'At Bhagalpur Silk (May-Jul 2024), Shruti served as UI/UX Design Lead. She spearheaded UX research and redesign in Figma, reducing bounce rate by 25% and boosting mobile conversion by 18% in a cross-functional team of 3.';
        link = '/work/bhagalpur-silk';
      } else if (q.includes('aaruush') || q.includes('fest') || q.includes('college')) {
        reply =
          'For Team Aaruush (SRMIST tech fest, Oct 2023 - Mar 2025), Shruti designed and built the official website spanning 50+ dynamic pages, elevating student engagement by 30% after leading 10+ usability tests.';
        link = '/work/team-aaruush';
      } else if (q.includes('cyber') || q.includes('threat') || q.includes('dashboard')) {
        reply =
          'The Cyber Threat Intelligence Dashboard processes 10K+ cyber log entries with Apache Spark anomaly detection, featuring an Elasticsearch & Streamlit real-time dashboard with 100% uptime.';
        link = '/work/cyber-threat-dashboard';
      } else if (q.includes('warehouse') || q.includes('delta') || q.includes('healthcare')) {
        reply =
          'Her Custom Data Warehouse utilizes a medallion architecture on Apache Spark and Delta Lake, cutting query time by 40% on a 10M+ healthcare record dataset with automated data quality validation.';
        link = '/work/custom-data-warehouse';
      } else if (q.includes('sentiguard') || q.includes('toxic') || q.includes('comment')) {
        reply =
          'SentiGuard is an NLP toxic comment filter achieving 88% accuracy across 20K+ comments using logistic regression, with real-time inference under 300 ms.';
        link = '/work/sentiguard';
      } else if (q.includes('taskflow') || q.includes('kanban')) {
        reply =
          'TaskFlow is a multi-user Kanban productivity application built with React, Node.js, and JWT auth, featuring analytics that track 5+ metrics across 50+ daily tasks.';
        link = '/work/taskflow';
      } else if (q.includes('skill') || q.includes('stack') || q.includes('tech')) {
        reply =
          `Shruti's primary toolkit includes:\n• Languages: Python, C++, Java, SQL, JavaScript\n• Technologies: PySpark, Apache Spark, Delta Lake, ReactJS, Node.js, OpenCV, NLP\n• Tools: Figma, Git, Streamlit, Elasticsearch, Tableau, Power BI`;
      } else if (q.includes('education') || q.includes('cgpa') || q.includes('srm') || q.includes('degree')) {
        reply =
          'Shruti is pursuing B.Tech in Computer Science with Big Data Analytics at SRM Institute of Science and Technology, Chennai (2023–2027) with a CGPA of 8.5/10.';
      } else if (q.includes('contact') || q.includes('email') || q.includes('hire') || q.includes('phone')) {
        reply = `You can reach Shruti directly at ${profile.email} or call ${profile.phone}. Her GitHub is ${profile.links.github}.`;
      } else if (q.includes('achievement') || q.includes('hackathon') || q.includes('cert')) {
        reply =
          'Key honors include placing in the Top 10% of the Smart India Hackathon, and certifications from Google Data Analytics, Oracle Cloud, Cisco Data Science, and NPTEL DBMS.';
      } else {
        reply =
          `I can only provide verified facts from Shruti's portfolio. For specifics about availability, compensation, or custom proposals, please email her directly at ${profile.email}.`;
      }

      const botId = `msg-${nextMessageId++}`;
      setMessages((prev) => [
        ...prev,
        {
          id: botId,
          sender: 'assistant',
          text: reply,
          projectLink: link,
        },
      ]);
    }, 350);
  };

  return (
    <>
      {/* Floating Chat Modal (Triggered via Ask AI button in Navbar) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-20 right-4 sm:right-8 z-50 w-[92vw] sm:w-[420px] max-h-[580px] rounded-3xl glass-card border border-[var(--color)]/10 shadow-2xl shadow-black/80 overflow-hidden flex flex-col bg-[var(--background-light)]/95 backdrop-blur-xl"
          >
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-[var(--color)]/6 flex justify-between items-center bg-[var(--background)]/70">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-display font-bold text-sm text-[var(--color-light)]">
                  Ask Shruti (AI)
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-[var(--color)]/10 text-xs text-[var(--muted)] hover:text-[var(--color)] transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Messages Feed */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[360px] text-xs font-body leading-relaxed">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col ${
                    m.sender === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl whitespace-pre-wrap ${
                      m.sender === 'user'
                        ? 'bg-[var(--silk)]/15 border border-[var(--silk)]/25 text-[var(--color-light)] font-medium rounded-br-none'
                        : 'bg-[var(--background-card)] border border-[var(--color)]/6 text-[var(--color)] rounded-bl-none'
                    }`}
                  >
                    {m.text}
                    {m.projectLink && (
                      <div className="mt-2.5 pt-2 border-t border-[var(--color)]/10">
                        <a
                          href={m.projectLink}
                          className="font-mono text-xs text-[var(--silk)] underline underline-offset-2 hover:opacity-80 block"
                        >
                          View Project Case Study ↗
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts */}
            <div className="px-4 py-2 border-t border-[var(--color)]/6 flex gap-1.5 overflow-x-auto no-scrollbar">
              {[
                'Bhagalpur Silk',
                'FaceTrace AI',
                'Tech Stack',
                'Education',
              ].map((chip) => (
                <button
                  key={chip}
                  onClick={() => handleSend(chip)}
                  className="px-2.5 py-1 rounded-full chip text-[10px] hover:text-[var(--color-light)] hover:border-[var(--silk)]/30 whitespace-nowrap transition-colors"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-3 border-t border-[var(--color)]/6 bg-[var(--background)]/80 flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about Shruti's projects, stack..."
                className="flex-1 bg-transparent border-0 outline-none px-3 py-2 text-xs text-[var(--color)] placeholder-[var(--muted)] font-mono"
              />
              <button
                onClick={() => handleSend()}
                className="px-3.5 py-1.5 rounded-xl btn-primary text-xs font-semibold"
              >
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
