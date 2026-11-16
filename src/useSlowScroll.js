import { useEffect } from 'react';

export function useSlowScroll(active, stop) {
  useEffect(() => {
    if (!active) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motion.matches) { stop(); return; }
    let frame;
    let previous;
    let position;
    const readyAt = performance.now() + 1400;
    const tick = now => {
      if (now < readyAt) { frame = requestAnimationFrame(tick); return; }
      if (document.hidden) { previous = undefined; frame = requestAnimationFrame(tick); return; }
      position ??= window.scrollY;
      if (previous !== undefined) position += Math.min(now - previous, 50) * .024;
      previous = now;
      const end = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo({top: Math.min(position, end), behavior: 'instant'});
      if (position >= end - 1) { stop(); return; }
      frame = requestAnimationFrame(tick);
    };
    const onKey = e => { if (['ArrowDown','ArrowUp','PageDown','PageUp','Home','End',' '].includes(e.key)) stop(); };
    const onClick = e => { if (e.target.closest('a')) stop(); };
    const onMotion = () => { if (motion.matches) stop(); };
    window.addEventListener('wheel', stop, {passive:true});
    window.addEventListener('touchstart', stop, {passive:true});
    window.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
    motion.addEventListener('change', onMotion);
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('wheel', stop);
      window.removeEventListener('touchstart', stop);
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onClick);
      motion.removeEventListener('change', onMotion);
    };
  }, [active, stop]);
}
