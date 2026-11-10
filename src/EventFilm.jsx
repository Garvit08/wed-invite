import { useEffect, useRef } from 'react';
import { eventFilms } from './event-films.js';

function FilmPlayer({media, title}) {
  const video = useRef(null);
  useEffect(() => {
    const player = video.current;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting && !document.hidden) player.play().catch(() => {});
        else player.pause();
      }
    }, {threshold:.4});
    observer.observe(player);
    const pauseWhenHidden = () => { if (document.hidden) player.pause(); };
    document.addEventListener('visibilitychange', pauseWhenHidden);
    return () => { observer.disconnect(); player.pause(); document.removeEventListener('visibilitychange', pauseWhenHidden); };
  }, []);
  const localAsset = path => path ? `${import.meta.env.BASE_URL}${path}` : undefined;
  return <figure className="event-film"><video ref={video} src={localAsset(media.src)} poster={localAsset(media.poster)} muted loop playsInline controls preload="none" aria-label={`${title}: ${media.caption}`}/><figcaption>{media.caption}</figcaption></figure>;
}

export function EventFilm({event}) {
  const media = eventFilms[event.id];
  return media?.src ? <FilmPlayer media={media} title={event.name}/> : null;
}
