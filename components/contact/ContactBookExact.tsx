'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { submitWeb3Form } from '@/lib/web3forms';

const EVENT_TYPES = {
  intro: {
    t: 'Intro call',
    m: 15,
    dsc: 'A short conversation about your project and whether we are a fit.',
  },
  proj: {
    t: 'Project call',
    m: 30,
    dsc: 'A closer look at the brand and website you need, the scope and the timeline.',
  },
};

type EventKey = keyof typeof EVENT_TYPES;

export default function ContactBookExact() {
  const containerRef = useRef<HTMLElement>(null);
  const [eventType, setEventType] = useState<EventKey>('intro');
  const [hour12, setHour12] = useState(true);
  const [selectedDate, setSelectedDate] = useState<{ y: number; m: number; d: number } | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [viewStep, setViewStep] = useState<'pick' | 'form' | 'done'>('pick');
  const [copied, setCopied] = useState(false);
  const [submitState, setSubmitState] = useState<'idle' | 'sending' | 'error'>('idle');

  // Form fields
  const [formData, setFormData] = useState({ name: '', email: '', note: '' });

  // Timezone resolution
  const [timeZone, setTimeZone] = useState('UTC');
  const [tzName, setTzName] = useState('UTC');

  // Calendar month navigation
  const today = useMemo(() => new Date(), []);
  const [viewYear, setViewYear] = useState(() => today.getFullYear());
  const [viewMonth, setViewMonth] = useState(() => today.getMonth());

  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
      setTimeZone(tz);
      setTzName(tz.replace(/_/g, ' '));
    } catch {
      // Fallback
    }
  }, []);

  const dur = EVENT_TYPES[eventType].m;

  // Calculate available slots
  const slotsForDate = (y: number, m: number, d: number) => {
    const now = Date.now();
    const minT = now + 864e5; // Minimum 24 hours in future
    const maxT = now + 90 * 864e5; // Maximum 90 days ahead
    const out: number[] = [];

    for (let pd = -1; pd <= 1; pd++) {
      const base = Date.UTC(y, m, d + pd) - 5 * 36e5;
      // Monday to Friday slots from 10:00 (600 min) to 17:00 (1020 min) PKT (UTC+5)
      for (let mi = 600; mi <= 1020 - dur; mi += 30) {
        const t = base + mi * 6e4;
        const wd = new Date(t + 5 * 36e5).getUTCDay();
        if (wd < 1 || wd > 5) continue;
        const ld = new Date(t);
        if (ld.getFullYear() === y && ld.getMonth() === m && ld.getDate() === d && t >= minT && t <= maxT) {
          out.push(t);
        }
      }
    }
    out.sort((a, b) => a - b);
    return out;
  };

  const formatTime = (t: number) => {
    return new Intl.DateTimeFormat(undefined, {
      hour: 'numeric',
      minute: '2-digit',
      hour12: hour12,
    }).format(new Date(t));
  };

  const formatDate = (t: number) => {
    return new Intl.DateTimeFormat(undefined, {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    }).format(new Date(t));
  };

  const formatPakTime = (t: number) => {
    return new Intl.DateTimeFormat('en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'Asia/Karachi',
    }).format(new Date(t));
  };

  // Calendar rendering data
  const firstDay = new Date(viewYear, viewMonth, 1);
  const dayOffset = (firstDay.getDay() + 6) % 7; // Monday = 0
  const totalDays = new Date(viewYear, viewMonth + 1, 0).getDate();
  const monthTitle = new Intl.DateTimeFormat(undefined, { month: 'long', year: 'numeric' }).format(firstDay);

  const isPrevDisabled = viewYear === today.getFullYear() && viewMonth === today.getMonth();
  const isNextDisabled = (viewYear - today.getFullYear()) * 12 + viewMonth - today.getMonth() >= 3;

  const prevMonth = () => {
    if (isPrevDisabled) return;
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (isNextDisabled) return;
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const availableSlots = selectedDate ? slotsForDate(selectedDate.y, selectedDate.m, selectedDate.d) : [];

  // Prepared request body
  const bookingDetails = useMemo(() => {
    if (!selectedSlot) return '';
    const subj = `${EVENT_TYPES[eventType].t} request: ${formatDate(selectedSlot)}, ${formatTime(selectedSlot)}`;
    const body = `Name: ${formData.name.trim()}
Email: ${formData.email.trim()}
Call: ${EVENT_TYPES[eventType].t} (${dur} minutes)
Requested time: ${formatDate(selectedSlot)} at ${formatTime(selectedSlot)} (${tzName})
In Pakistan time: ${formatPakTime(selectedSlot)}

About the project:
${formData.note.trim() || '(not provided)'}`;

    return {
      subject: subj,
      body,
    };
  }, [selectedSlot, eventType, dur, formData, tzName, hour12]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !selectedSlot) return;
    setSubmitState('sending');
    const response = await submitWeb3Form({
      name: formData.name.trim(),
      email: formData.email.trim(),
      message: bookingDetails ? bookingDetails.body : '',
      subject: bookingDetails ? bookingDetails.subject : 'Booking request',
      fromName: 'Contact Booking Form',
    });
    if (!response.success) {
      setSubmitState('error');
      return;
    }
    setSubmitState('idle');
    setViewStep('done');
  };

  const handleCopy = () => {
    if (!bookingDetails) return;
    navigator.clipboard
      .writeText(bookingDetails.body)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      })
      .catch(() => {});
  };

  // Scroll reveal setup
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const rvs = Array.from(el.querySelectorAll<HTMLElement>('.sh, .cb'));
    rvs.forEach((item, i) => {
      item.classList.add('rv');
      item.style.setProperty('--d', `${(i % 3) * 0.08}s`);
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('vis');
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -6% 0px' }
    );

    rvs.forEach((item) => io.observe(item));
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={containerRef}
      className="pad"
      id="book"
      style={{ paddingTop: 'clamp(64px, 9vw, 130px)' }}
    >
      <div className="sh">
        <span className="lab">Book a call</span>
        <span className="lab">Choose a day and a time</span>
      </div>

      <div className="cb" id="cb">
        {/* Left column: Event details & selector */}
        <aside className="cb-h">
          <svg className="mk" viewBox="0 328 4319 3662" aria-hidden="true" style={{ color: 'var(--ink)' }}>
            <rect x="0" y="328" width="938" height="2724" fill="currentColor" />
            <path d="M3380 328H4318V784.5A3206 3206 0 0 1 3380 3052Z" fill="currentColor" />
            <path d="M939 3052H3380A3206 3206 0 0 1 1112 3990H939Z" fill="currentColor" />
            <rect x="3380" y="3052" width="938" height="938" fill="var(--ind)" />
          </svg>
          <span className="who">Usama Zahid</span>
          <h3>{EVENT_TYPES[eventType].t}</h3>
          <p>{EVENT_TYPES[eventType].dsc}</p>
          <ul>
            <li>{dur} minutes</li>
            <li>Video call, link sent after confirmation</li>
            <li>Times shown in {tzName}</li>
          </ul>
          <div className="evs" role="group" aria-label="Call type">
            <button
              className="chip"
              type="button"
              aria-pressed={eventType === 'intro'}
              onClick={() => {
                setEventType('intro');
                setSelectedDate(null);
                setSelectedSlot(null);
                setViewStep('pick');
              }}
            >
              15 min intro
            </button>
            <button
              className="chip"
              type="button"
              aria-pressed={eventType === 'proj'}
              onClick={() => {
                setEventType('proj');
                setSelectedDate(null);
                setSelectedSlot(null);
                setViewStep('pick');
              }}
            >
              30 min project call
            </button>
          </div>
        </aside>

        {/* View Step 1: Calendar Grid & Slot Selection */}
        {viewStep === 'pick' && (
          <>
            {/* Middle column: Interactive Calendar */}
            <div className="cb-m">
              <div className="cm-top">
                <b>{monthTitle}</b>
                <div className="cm-nav">
                  <button type="button" aria-label="Previous month" onClick={prevMonth} disabled={isPrevDisabled}>
                    &larr;
                  </button>
                  <button type="button" aria-label="Next month" onClick={nextMonth} disabled={isNextDisabled}>
                    &rarr;
                  </button>
                </div>
              </div>
              <div className="cw" aria-hidden="true">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
              <div className="cg" role="group" aria-label="Choose a date">
                {Array.from({ length: dayOffset }).map((_, i) => (
                  <i key={`empty-${i}`} />
                ))}
                {Array.from({ length: totalDays }).map((_, i) => {
                  const dayNum = i + 1;
                  const slots = slotsForDate(viewYear, viewMonth, dayNum);
                  const isAvailable = slots.length > 0;
                  const isSelected =
                    selectedDate?.y === viewYear && selectedDate?.m === viewMonth && selectedDate?.d === dayNum;
                  const isToday =
                    viewYear === today.getFullYear() && viewMonth === today.getMonth() && dayNum === today.getDate();

                  return (
                    <button
                      key={`day-${dayNum}`}
                      type="button"
                      disabled={!isAvailable}
                      aria-pressed={isSelected}
                      className={isToday ? 'td' : undefined}
                      aria-label={`${dayNum} ${firstDay.toLocaleString(undefined, { month: 'long' })}${
                        isAvailable ? '' : ', unavailable'
                      }`}
                      onClick={() => setSelectedDate({ y: viewYear, m: viewMonth, d: dayNum })}
                    >
                      {dayNum}
                    </button>
                  );
                })}
              </div>
              <p className="cm-tz">Time zone: {tzName}</p>
            </div>

            {/* Right column: Slots selection list */}
            <div className="cb-s">
              <div className="sl-top">
                <b>
                  {selectedDate
                    ? new Intl.DateTimeFormat(undefined, {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                      }).format(new Date(selectedDate.y, selectedDate.m, selectedDate.d))
                    : 'Select a date'}
                </b>
                <div className="fmt" role="group" aria-label="Time format">
                  <button type="button" aria-pressed={hour12} onClick={() => setHour12(true)}>
                    12h
                  </button>
                  <button type="button" aria-pressed={!hour12} onClick={() => setHour12(false)}>
                    24h
                  </button>
                </div>
              </div>
              <div className="sl" aria-live="polite">
                {!selectedDate ? (
                  <p className="sl-e">Pick a day on the calendar to see available times.</p>
                ) : availableSlots.length > 0 ? (
                  availableSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => {
                        setSelectedSlot(slot);
                        setViewStep('form');
                      }}
                    >
                      {formatTime(slot)}
                    </button>
                  ))
                ) : (
                  <p className="sl-e">No times left on this day.</p>
                )}
              </div>
            </div>
          </>
        )}

        {/* View Step 2: Information Form */}
        {viewStep === 'form' && (
          <form className="cb-f" onSubmit={handleSubmit}>
            <button className="bk" type="button" onClick={() => setViewStep('pick')}>
              &larr; Back to times
            </button>
            <p className="sm">
              {EVENT_TYPES[eventType].t}, {dur} minutes, on {selectedSlot ? formatDate(selectedSlot) : ''} at{' '}
              {selectedSlot ? formatTime(selectedSlot) : ''} ({tzName}).
            </p>
            <label className="fld">
              Your name
              <input
                type="text"
                required
                autoComplete="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Jane Doe"
              />
            </label>
            <label className="fld">
              Your email
              <input
                type="email"
                required
                autoComplete="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="jane@example.com"
              />
            </label>
            <label className="fld">
              What are you building?
              <textarea
                value={formData.note}
                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                placeholder="A line or two about your product and what you need"
              />
            </label>
            <button className="pbtn" type="submit">
              {submitState === 'sending' ? 'Sending request...' : 'Send this request'}
            </button>
            <p className="cnote">
              {submitState === 'error'
                ? 'Submission failed. Please try again.'
                : 'Request is submitted through form and I confirm the time by reply.'}
            </p>
          </form>
        )}

        {/* View Step 3: Confirmation & Email Draft View */}
        {viewStep === 'done' && (
          <div className="cb-d">
            <span className="tick" aria-hidden="true">
              &#10003;
            </span>
            <h3>Request ready.</h3>
            <p className="sm">
              {EVENT_TYPES[eventType].t} on {selectedSlot ? formatDate(selectedSlot) : ''} at{' '}
              {selectedSlot ? formatTime(selectedSlot) : ''} ({tzName}). I will confirm by reply.
            </p>
            <div className="row2">
              <button className="sbtn" type="button" onClick={handleCopy}>
                {copied ? 'Copied' : 'Copy booking details'}
              </button>
              <button
                className="sbtn"
                type="button"
                onClick={() => {
                  setSelectedSlot(null);
                  setViewStep('pick');
                }}
              >
                Choose another time
              </button>
            </div>
            <p className="cnote">
              Booking request has been submitted successfully.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
