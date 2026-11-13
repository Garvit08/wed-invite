import { ArrowRightIcon } from '@phosphor-icons/react/dist/csr/ArrowRight';
import { ArrowClockwiseIcon } from '@phosphor-icons/react/dist/csr/ArrowClockwise';
import { PauseIcon } from '@phosphor-icons/react/dist/csr/Pause';
import { PlayIcon } from '@phosphor-icons/react/dist/csr/Play';

export const drafts = [
  {id: 'crimson', number: 1, name: 'Crimson Heirloom', shortName: 'Crimson', action: 'Touch the seal to begin', opening: 'Breaking the seal…'},
  {id: 'royal', number: 2, name: 'Royal Vows', shortName: 'Royal', action: 'Enter our celebration', opening: 'Our story unfolds…'},
  {id: 'ivory', number: 3, name: 'Ivory Blossom', shortName: 'Ivory', action: 'Open our story', opening: 'Opening the doors…'},
];

export function initialDraft() {
  return 'crimson';
}

const asset = name => `${import.meta.env.BASE_URL}assets/drafts/${name}.webp`;

export function DraftSwitcher({selected, onSelect, onReplay, opening, flowersPaused, onToggleFlowers, musicControl}) {
  return <header className="draft-switcher">
    <a className="draft-switcher-label wedding-brand" href="#invitation" aria-label="Garvit and Yogita, back to invitation"><span>G &amp; Y</span><p>Garvit &amp; Yogita<br/>03–04 December 2026</p></a>
    <div className="draft-motion-controls">{musicControl}<button className="flower-pause-button" onClick={onToggleFlowers} aria-label={flowersPaused ? 'Resume flowers' : 'Pause flowers'} title={flowersPaused ? 'Resume flowers' : 'Pause flowers'}>{flowersPaused ? <PlayIcon size={15} aria-hidden="true"/> : <PauseIcon size={15} aria-hidden="true"/>}</button><button className="draft-replay" disabled={opening} onClick={onReplay}><ArrowClockwiseIcon size={16} aria-hidden="true"/><span>Replay</span></button></div>
  </header>;
}

export function DraftCover({draft, opening, opened, onOpen, onView}) {
  const design = drafts.find(item => item.id === draft);
  const background = asset(`${draft}-background`);
  const isRoyal = draft === 'royal';
  return <section className={`draft-cover cover-${draft} ${opening ? 'gate-opening' : ''} ${opened ? 'gate-opened' : ''}`} aria-label={`${design.name}: Garvit and Yogita wedding invitation`}>
    <div className="draft-inner-scene" style={{backgroundImage:`url(${asset('royal-background')})`}} aria-hidden="true" />
    <div className="draft-artwork" aria-hidden="true">
      {isRoyal ? <img className="royal-scene" src={background} alt="" width="887" height="1774" fetchPriority="high"/> : <>
        <div className="gate-leaf gate-leaf-left" style={{backgroundImage:`url(${background})`}} />
        <div className="gate-leaf gate-leaf-right" style={{backgroundImage:`url(${background})`}} />
      </>}
    </div>
    <div className="draft-front-copy">
      {draft === 'ivory' ? <img className="draft-ganesha" src={asset('ivory-ganesha')} alt="" width="160" height="160"/> : null}
      {isRoyal || draft === 'ivory' ? <p className="draft-family-intro">Together with our families</p> : null}
      <h1 className="draft-names"><span>Garvit</span><span className="draft-amp">&amp;</span><span>Yogita</span><span className="sr-only"> Khandelwal</span></h1>
      <p className="draft-family-name">Khandelwal</p>
      <time className="draft-date" dateTime="2026-12-04">04 December 2026</time>
      <img className="draft-divider" src={`${import.meta.env.BASE_URL}assets/divider.webp`} alt=""/>
      <div className="draft-venue"><p>Infinity Hotels &amp; Resorts</p><span>Alwar, Rajasthan</span></div>
    </div>
    {!opened ? <button className={`draft-open-button ${isRoyal ? 'draft-royal-button' : 'draft-seal-button'}`} onClick={onOpen} disabled={opening} aria-expanded={false} aria-controls="celebration" aria-label={design.action}>
      {!isRoyal ? <img className="draft-seal" src={asset(`${draft}-seal`)} alt="" width="320" height={draft === 'ivory' ? 416 : 320}/> : null}
      <span>{opening ? design.opening : opened ? 'View our celebration' : design.action}{isRoyal ? <ArrowRightIcon size={17} weight="light" aria-hidden="true"/> : null}</span>
    </button> : null}
    {isRoyal ? <p className="draft-royal-caption">A lifetime begins here</p> : null}
    {opened ? <div className="draft-revealed"><p>A new chapter begins</p><span>Garvit &amp; Yogita</span><button className="draft-view-button" onClick={onView} aria-expanded={true} aria-controls="celebration">View our celebration<ArrowRightIcon size={16} weight="light" aria-hidden="true"/></button></div> : null}
  </section>;
}
