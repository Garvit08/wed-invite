import { useEffect, useRef, useState } from 'react';
import { PauseIcon } from '@phosphor-icons/react/dist/csr/Pause';
import { PlayIcon } from '@phosphor-icons/react/dist/csr/Play';
import { eventFilms } from './event-films.js';

export function EventFilm({event}) {
  const media = eventFilms[event.id];
  const video = useRef(null);
  const [paused, setPaused] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const player = video.current;
    if (!player) return;
    let visible = false;
    const updatePlayback = () => {
      if (visible && !paused && !document.hidden) player.play().catch(() => {});
      else player.pause();
    };
    const observer = new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      updatePlayback();
    }, {threshold:.15});
    observer.observe(player);
    document.addEventListener('visibilitychange', updatePlayback);
    return () => { observer.disconnect(); player.pause(); document.removeEventListener('visibilitychange', updatePlayback); };
  }, [paused]);
  const localAsset = path => path ? `${import.meta.env.BASE_URL}${path}` : undefined;
  if (!media?.poster) return null;
  return <>
    <div className="event-scene-art">
      {media.src ? <video ref={video} src={localAsset(media.src)} poster={localAsset(media.poster)} width="810" height="540" muted loop playsInline preload="none" aria-label={`${event.name}: ${media.caption}`}/> : <img src={localAsset(media.poster)} alt={media.caption} width="1200" height="800" loading="lazy"/>}
    </div>
    {media.src && <button className="scene-motion-toggle" onClick={() => setPaused(value => !value)} aria-label={`${paused ? 'Play' : 'Pause'} ${event.name} animation`} aria-pressed={paused}>{paused ? <PlayIcon size={15} weight="fill" aria-hidden="true"/> : <PauseIcon size={15} weight="fill" aria-hidden="true"/>}<span>{paused ? 'Play scene' : 'Pause scene'}</span></button>}
  </>;
}
