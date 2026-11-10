const petals = Array.from({length:12}, (_, i) => ({
  left: `${4 + ((i * 29) % 92)}%`,
  size: `${i % 3 === 0 ? 21 : 12 + (i % 5) * 2}px`,
  duration: `${12 + i % 6}s`,
  delay: `${-1 - i * 1.7}s`,
  drift: `${i % 2 ? 55 : -42}px`,
  turn: `${i % 2 ? 430 : -320}deg`,
}));

const burst = Array.from({length:22}, (_, i) => ({
  left: `${6 + ((i * 19) % 88)}%`,
  size: `${12 + i % 6 * 2}px`,
  delay: `${(i % 5) * .035}s`,
  drift: `${(i % 2 ? 1 : -1) * (35 + i * 4)}px`,
  turn: `${i % 2 ? 550 : -420}deg`,
}));

function Flower({particle, index}) {
  return <img className="flower-particle" src={`${import.meta.env.BASE_URL}assets/drafts/${index % 4 === 0 ? 'jasmine-blossom' : 'rose-petal'}.webp`} alt="" width="40" height="40" style={{'--flower-left':particle.left,'--flower-size':particle.size,'--flower-duration':particle.duration,'--flower-delay':particle.delay,'--flower-drift':particle.drift,'--flower-turn':particle.turn}}/>;
}

export function FlowerSprinkles({opening}) {
  return <div className="flowers" aria-hidden="true">
    <div className="ambient-flowers">{petals.map((particle,index)=><Flower key={index} particle={particle} index={index}/>)}</div>
    {opening ? <div className="flower-burst">{burst.map((particle,index)=><Flower key={index} particle={particle} index={index}/>)}</div> : null}
  </div>;
}
