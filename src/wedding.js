// All times are local to Alwar, India (UTC +05:30).
// Bride-side invitation. Welcome of Baarat takes place at the wedding venue.
export const wedding = {
  dayStart: '2026-12-04T00:00:00+05:30',
  venue: 'Infinity Resorts & Farms, Alwar, Rajasthan',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Infinity%20Resorts%20%26%20Farms%2C%20Alwar%2C%20Rajasthan',
};
export const events = [
  {id: 'haldi', name: 'Phulo ki Bahar (Haldi)', time: '11:00', period: 'AM', start: '2026-12-03T11:00:00+05:30', copy: 'Golden hues, flower showers, and a little Haldi happiness.', location: ''},
  {id: 'welcome-baarat', name: 'Welcome of Baarat', time: '12:30', period: 'PM', start: '2026-12-04T12:30:00+05:30', copy: 'With open hearts, flower petals, and a warm family welcome.', location: wedding.venue},
  {id: 'lunch', name: 'Lunch', time: '1:15', period: 'PM', start: '2026-12-04T13:15:00+05:30', copy: 'A little conversation. A feast to share.', location: wedding.venue},
  {id: 'phere', name: 'Phere', time: '3:15', period: 'PM', start: '2026-12-04T15:15:00+05:30', copy: 'Seven sacred steps into our forever.', location: wedding.venue},
  {id: 'reception', name: 'Reception', time: '7:15', period: 'PM', start: '2026-12-04T19:15:00+05:30', copy: 'An evening of love, togetherness, and celebration.', location: wedding.venue},
];

export const eventDays = [
  {date: '2026-12-03', label: 'Thursday, 03 December 2026', title: 'The celebrations begin', events: events.filter(event => event.start.startsWith('2026-12-03'))},
  {date: '2026-12-04', label: 'Friday, 04 December 2026', title: 'Our wedding day', events: events.filter(event => event.start.startsWith('2026-12-04'))},
];
