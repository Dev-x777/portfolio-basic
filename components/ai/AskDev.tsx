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

export function AskDev() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: "Hi! I am Dev's AI assistant. Ask me anything about his product engineering, distributed backend systems, repositories, or tech stack.",
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleToggle = () => setIsOpen((prev) => !prev);
    window.addEventListener('toggle-ask-dev', handleToggle);
    return () => window.removeEventListener('toggle-ask-dev', handleToggle);
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

      if (q.includes('rateguard') || q.includes('rate limit') || q.includes('redis')) {
        reply =
          'RateGuard is a distributed rate limiting architecture built with Spring Boot, Redis Lua scripts, and PostgreSQL. It enforces Token Bucket and Sliding Window limits across 3 instances with sub-5ms latency and zero race conditions across 10K+ load-tested requests.';
        link = '/work/rateguard';
      } else if (q.includes('scheduler') || q.includes('job') || q.includes('queue') || q.includes('worker')) {
        reply =
          'The Distributed Job Scheduler is a high-throughput task queue and worker coordination engine written in TypeScript/Node.js with Redis. It features fault-tolerant worker orchestration, heartbeat health checks, and exponential backoff retries.';
        link = '/work/distributed-scheduler';
      } else if (q.includes('cache') || q.includes('message')) {
        reply =
          'The High-Throughput Message Caching System is an in-memory caching and queuing service built for sub-millisecond read/write latency with LRU memory eviction and atomic operations under concurrent loads.';
        link = '/work/message-cache';
      } else if (q.includes('tripsync') || q.includes('travel')) {
        reply =
          'TripSync is a collaborative travel planning platform built with React, Node.js, and PostgreSQL that synchronizes group itineraries, manages shared budgets, and renders interactive map timelines in real time.';
        link = '/work/tripsync';
      } else if (q.includes('autisense') || q.includes('autism') || q.includes('cnn')) {
        reply =
          'AutiSense is a pre-autism screening platform for kids aged 2–6 featuring a CNN trained on 5,000+ labeled behavioral samples (86%+ accuracy), serving predictions via a Flask REST API with sub-200ms latency to clinician dashboards.';
        link = '/work/autisense';
      } else if (q.includes('replymate') || q.includes('extension')) {
        reply =
          'ReplyMate is an AI response assistant with 16 GitHub stars. It generates context-aware, tailored message drafts in one click across browser communications.';
        link = '/work/replymate';
      } else if (q.includes('lakeflow') || q.includes('databricks') || q.includes('spark')) {
        reply =
          'The Lakeflow pipeline is an automated cloud data engineering pipeline on Databricks utilizing Delta Lake and Apache Spark for automated ETL ingestion, ACID guarantees, and medallion architecture storage.';
        link = '/work/lakeflow-pipeline';
      } else if (q.includes('rehearse') || q.includes('music') || q.includes('sheet')) {
        reply =
          'ReHearse is an App Store application converting scanned sheet music into real-time playable audio with 90%+ OMR accuracy via a Python + Audiveris Docker pipeline on Azure.';
        link = '/work/rehearse';
      } else if (q.includes('skill') || q.includes('stack') || q.includes('tech') || q.includes('languages')) {
        reply =
          `Dev's toolkit includes:\n• Languages: Java, Python, TypeScript, C++, Go, SQL, JavaScript, C, Dart, Swift\n• Frameworks & Backend: Spring Boot, Node.js, Express, React JS, Django, Apache Spark, Flutter\n• Systems & Tools: Docker, Redis, PostgreSQL, Databricks, Git, Postman, MySQL, MongoDB, Cassandra\n• Machine Learning: TensorFlow, PyTorch, OpenCV, Keras, Scikit-Learn`;
      } else if (q.includes('education') || q.includes('cgpa') || q.includes('srm') || q.includes('college')) {
        reply =
          'Dev is pursuing B.Tech in Computer Science (Big Data Specialization) at SRM Institute of Science and Technology, Chennai (Aug 2023–Present) with a CGPA of 9.01/10.';
      } else if (q.includes('contact') || q.includes('email') || q.includes('hire') || q.includes('phone') || q.includes('linkedin')) {
        reply = `You can reach Dev directly at ${profile.email} or call ${profile.phone}. GitHub: ${profile.links.github} | LinkedIn: ${profile.links.linkedin} | LeetCode: ${profile.links.leetcode}.`;
      } else if (q.includes('github') || q.includes('repo')) {
        reply = `Dev's active GitHub profile is ${profile.links.github} featuring 20+ open-source repositories spanning distributed systems, rate limiters, job schedulers, and product apps.`;
      } else {
        reply =
          `I can only provide verified facts from Dev's portfolio and GitHub repositories. For specific inquiries regarding hiring, availability, or custom proposals, please email him directly at ${profile.email}.`;
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
      {/* Floating Chat Modal (Triggered via Ask Dev button in Navbar) */}
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
                  Ask Dev (AI)
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-[var(--color)]/10 text-xs text-[var(--muted)] hover:text-[var(--color)] transition-colors cursor-pointer"
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
                'RateGuard Backend',
                'Distributed Scheduler',
                'TripSync App',
                'Tech Stack',
              ].map((chip) => (
                <button
                  key={chip}
                  onClick={() => handleSend(chip)}
                  className="px-2.5 py-1 rounded-full chip text-[10px] hover:text-[var(--color-light)] hover:border-[var(--silk)]/30 whitespace-nowrap transition-colors cursor-pointer"
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
                placeholder="Ask about Dev's backend, product, tech stack..."
                className="flex-1 bg-transparent border-0 outline-none px-3 py-2 text-xs text-[var(--color)] placeholder-[var(--muted)] font-mono"
              />
              <button
                onClick={() => handleSend()}
                className="px-3.5 py-1.5 rounded-xl btn-primary text-xs font-semibold cursor-pointer"
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
