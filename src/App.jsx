import { useEffect, useRef, useState } from 'react';
import { ArrowDownIcon } from '@phosphor-icons/react/dist/csr/ArrowDown';
import { ArrowUpRightIcon } from '@phosphor-icons/react/dist/csr/ArrowUpRight';
import { CalendarBlankIcon } from '@phosphor-icons/react/dist/csr/CalendarBlank';
import { MapPinIcon } from '@phosphor-icons/react/dist/csr/MapPin';
import { HeartIcon } from '@phosphor-icons/react/dist/csr/Heart';
import { CopyIcon } from '@phosphor-icons/react/dist/csr/Copy';
import { CheckIcon } from '@phosphor-icons/react/dist/csr/Check';
import { wedding, events, eventDays } from './wedding.js';
import { DraftCover, DraftSwitcher, initialDraft } from './DraftCover.jsx';
import { FlowerSprinkles } from './FlowerSprinkles.jsx';
import { EventFilm } from './EventFilm.jsx';
import { InvitationMusic } from './InvitationMusic.jsx';

const asset = (name) => `${import.meta.env.BASE_URL}assets/${name}`;

function Countdown() {
  const [now, setNow] = useState(Date.now);
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);
  const difference = Math.max(0, Date.parse(wedding.dayStart) - now);
  const numbers = [Math.floor(difference / 86400000), Math.floor(difference / 3600000) % 24, Math.floor(difference / 60000) % 60, Math.floor(difference / 1000) % 60];
  return <div className="countdown-wrap">
    <p className="eyebrow">{difference > 0 ? 'Until our wedding day' : 'Our forever has begun'}</p>
    <div className="countdown" aria-label={`${numbers[0]} days, ${numbers[1]} hours, ${numbers[2]} minutes until our wedding day`}>
      {numbers.map((value, i) => <div key={i}><span className="countdown-number" aria-hidden="true">{String(value).padStart(2, '0')}</span><span className="countdown-label">{['Days', 'Hours', 'Minutes', 'Seconds'][i]}</span></div>)}
    </div>
  </div>;
}

function CalendarLink({event, children, className = 'text-link'}) {
  const filename = event ? `garvit-yogita-${event.id}.ics` : 'garvit-yogita-wedding.ics';
  return <a className={className} href={`${import.meta.env.BASE_URL}calendar/${filename}`} download={filename}><CalendarBlankIcon size={18} weight="light" aria-hidden="true" />{children}</a>;
}

export function App() {
  const [draft, setDraft] = useState(initialDraft);
  const [coverVersion, setCoverVersion] = useState(0);
  const [flowersPaused, setFlowersPaused] = useState(false);
  const selectedDraftRef = useRef(draft);
  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);
  const [copied, setCopied] = useState(false);
  const celebration = useRef(null);
  const shareDialog = useRef(null);
  const shareInput = useRef(null);
  const openTimer = useRef(null);
  const music = useRef(null);
  const copyTimer = useRef(null);
  useEffect(() => () => { clearTimeout(openTimer.current); clearTimeout(copyTimer.current); }, []);

  function resetInvitation(nextDraft = draft, updateUrl = true) {
    clearTimeout(openTimer.current);
    setOpening(false);
    setOpened(false);
    setCopied(false);
    setDraft(nextDraft);
    selectedDraftRef.current = nextDraft;
    setCoverVersion(version => version + 1);
    if (updateUrl) {
      const url = new URL(window.location.href);
      url.searchParams.delete('draft');
      url.hash = '';
      window.history.pushState({}, '', url);
    }
    window.scrollTo({top:0, behavior:'instant'});
  }

  useEffect(() => {
    const onBack = () => {
      const nextDraft = initialDraft();
      if (nextDraft !== selectedDraftRef.current) resetInvitation(nextDraft, false);
    };
    window.addEventListener('popstate', onBack);
    return () => window.removeEventListener('popstate', onBack);
  }, []);

  useEffect(() => {
    if (!opened) return;
    const targets = celebration.current.querySelectorAll('[data-reveal]');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      targets.forEach(target => target.classList.add('in-view'));
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('in-view'); observer.unobserve(entry.target); } });
    }, {threshold:.12});
    targets.forEach(target => observer.observe(target));
    return () => observer.disconnect();
  }, [opened, draft]);

  function openInvitation() {
    if (opening) return;
    music.current?.start();
    setOpening(true);
    openTimer.current = setTimeout(() => { setOpened(true); setOpening(false); }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 1650);
  }
  useEffect(() => {
    if (!opened) return;
    celebration.current?.focus({preventScroll: true});
    celebration.current?.scrollIntoView({behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start'});
  }, [opened]);

  async function copyInvitation() {
    const url = `${window.location.origin}${window.location.pathname}`;
    let clipboardTimeout;
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await Promise.race([
        navigator.clipboard.writeText(url),
        new Promise((_, reject) => { clipboardTimeout = setTimeout(() => reject(new Error('Clipboard timeout')), 1500); }),
      ]);
      setCopied(true);
      clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2500);
    } catch {
      shareDialog.current.showModal();
      shareInput.current?.select();
    } finally {
      clearTimeout(clipboardTimeout);
    }
  }

  return <div className={`draft-app theme-${draft} ${flowersPaused ? 'flowers-paused' : ''}`}>
    <DraftSwitcher selected={draft} onSelect={resetInvitation} onReplay={() => resetInvitation(draft)} opening={opening} flowersPaused={flowersPaused} onToggleFlowers={() => setFlowersPaused(paused => !paused)} musicControl={<InvitationMusic ref={music}/>}/>
    <FlowerSprinkles key={`flowers-${coverVersion}`} opening={opening}/>
    <a href="#invitation" className="skip-link">Skip to invitation</a>
    <main id="invitation">
      <DraftCover key={`${draft}-${coverVersion}`} draft={draft} opening={opening} opened={opened} onOpen={openInvitation} onView={() => celebration.current?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'})}/>
      <div id="celebration" className="celebration" ref={celebration} tabIndex={-1} hidden={!opened}>{opened ? <>
        <nav className="invitation-nav" aria-label="Invitation sections"><a className="nav-monogram" href="#invitation" aria-label="Back to invitation">G &amp; Y</a><div><a href="#our-day">Our day</a><a href="#venue">The venue</a><CalendarLink className="nav-calendar">Save the date</CalendarLink></div></nav>
        <section className="welcome section-spacing" aria-labelledby="welcome-heading" data-reveal>
          <p className="eyebrow">With full hearts &amp; open arms</p>
          <h2 id="welcome-heading">Some days are special.<br/><em>This one is ours.</em></h2>
          <p className="welcome-copy">Together with our families, we invite you to share in the joy of our wedding. Your love, laughter, and blessings will make our beginning even more beautiful.</p>
          <p className="signature">Garvit <span>&amp;</span> Yogita</p>
          <Countdown />
          <CalendarLink className="button button-green">Save our celebrations</CalendarLink>
        </section>
        <div className="ceremony-panorama" data-reveal><img src={asset('drafts/ceremony-panorama.webp')} alt="Illustration of a flower-filled wedding mandap and glowing ceremonial lamps" width="1536" height="512" loading="lazy"/></div>
        <section id="our-day" className="schedule section-spacing" aria-labelledby="schedule-heading">
          <div className="section-heading"><p className="eyebrow">03 &amp; 04 December 2026</p><h2 id="schedule-heading">A celebration to <em>remember.</em></h2><p>Six moments. One beautiful beginning.</p></div>
          {eventDays.map(day => <section className="event-day" key={day.date} aria-labelledby={`day-${day.date}`}>
            <div className="event-day-heading"><p>{day.title}</p><h3 id={`day-${day.date}`}><time dateTime={day.date}>{day.label}</time></h3></div>
            <ol className="event-list scene-list">{day.events.map(event => <li className={`event event-scene scene-${event.id}`} key={event.id}>
              <EventFilm event={event}/>
              <div className="event-content scene-details" data-reveal><p className="scene-chapter">Celebration 0{events.findIndex(item => item.id === event.id) + 1}</p><h4 className="event-title">{event.name}</h4><time className="event-time" dateTime={event.start}>{event.time}<span>{event.period}</span></time><p className="scene-copy">{event.copy}</p><CalendarLink event={event}>Save this moment<span className="sr-only">: {event.name}</span></CalendarLink></div>
            </li>)}</ol>
          </section>)}
          <p className="timezone-note">All timings are in India Standard Time (IST).</p>
        </section>
        <section id="venue" className="venue section-spacing" aria-labelledby="venue-heading" data-reveal>
          <div className="venue-art" style={{backgroundImage:`url(${asset(`drafts/${draft === 'crimson' ? 'royal' : draft}-background.webp`)})`}} role="img" aria-label="Illustrated Rajasthan palace and gardens" />
          <div className="venue-content"><p className="eyebrow">Wedding venue · 04 December</p><h2 id="venue-heading">See you in <em>Alwar.</em></h2><MapPinIcon size={30} weight="thin" aria-hidden="true" /><h3>Infinity Resorts &amp; Farms</h3><p>Alwar, Rajasthan</p><a className="button button-green" href={wedding.mapsUrl} target="_blank" rel="noopener noreferrer">Find the venue<ArrowUpRightIcon size={18} aria-hidden="true" /></a></div>
        </section>
        <footer className="invitation-footer section-spacing"><HeartIcon size={26} weight="thin" aria-hidden="true"/><p className="eyebrow">The beginning of our forever</p><p className="footer-names">Garvit <em>&amp;</em> Yogita</p><p>We can’t wait to celebrate with you.</p><button className="text-link share-button" onClick={copyInvitation}>{copied ? <CheckIcon size={17}/> : <CopyIcon size={17}/>}<span aria-live="polite">{copied ? 'Invitation link copied' : 'Copy invitation link'}</span></button><p className="footer-date">04.12.2026</p><a className="back-to-top" href="#invitation">Back to invitation<ArrowDownIcon size={14}/></a></footer>
      </> : null}</div>
    </main>
    <dialog ref={shareDialog} className="share-dialog"><h2>Share a little joy.</h2><p>Copy this link to share our invitation.</p><input ref={shareInput} aria-label="Invitation link" value={`${window.location.origin}${window.location.pathname}`} readOnly/><button className="button button-green" onClick={() => shareDialog.current.close()}>Done</button></dialog>
  </div>;
}
