import { useEffect, useImperativeHandle, useRef, useState } from 'react';
import { SpeakerHighIcon } from '@phosphor-icons/react/dist/csr/SpeakerHigh';
import { SpeakerSlashIcon } from '@phosphor-icons/react/dist/csr/SpeakerSlash';

// Audio excerpt from the user-selected Instagram reel DdMF_C_Jozg.
export const invitationMusic = { src: 'audio/parvati-reel.m4a', title: 'Parvati — Sadhu Tiwari' };

export function InvitationMusic({ ref }) {
  const audio = useRef(null);
  const wantsMusic = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  function play() {
    if (!audio.current) return;
    wantsMusic.current = true;
    setFailed(false);
    audio.current.volume = 0.45;
    // Keep play in the seal/button gesture for mobile browser compatibility.
    audio.current.play().catch(() => {
      wantsMusic.current = false;
      setPlaying(false);
    });
  }
  useImperativeHandle(ref, () => ({ start: play }));
  useEffect(() => {
    function onVisibility() {
      if (document.hidden) audio.current?.pause();
      else if (wantsMusic.current) play();
    }
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  if (!invitationMusic.src) return null;
  return <>
    <audio ref={audio} src={`${import.meta.env.BASE_URL}${invitationMusic.src}`} loop preload="none"
      onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}
      onError={() => { wantsMusic.current = false; setPlaying(false); setFailed(true); }}/>
    <button className="music-toggle" aria-label={playing ? 'Pause music' : 'Play music'}
      aria-pressed={playing} title={playing ? 'Pause music' : 'Play music'}
      onClick={() => {
        if (playing) { wantsMusic.current = false; audio.current.pause(); }
        else play();
      }}>
      {playing ? <SpeakerHighIcon size={18} aria-hidden="true"/> : <SpeakerSlashIcon size={18} aria-hidden="true"/>}
    </button>
    <span className="sr-only" role="status">{failed ? 'Music could not load. Tap Play music to retry.' : ''}</span>
  </>;
}
