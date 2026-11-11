const escapeText = (value) => value.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
// Fold at 75 UTF-8 octets, as required by RFC 5545.
function foldLine(line) {
  const parts = [];
  let part = '';
  let size = 0;
  for (const character of line) {
    const length = new TextEncoder().encode(character).length;
    if (size + length > 75) { parts.push(part); part = ' '; size = 1; }
    part += character;
    size += length;
  }
  parts.push(part);
  return parts.join('\r\n');
}
export function calendarFile(events) {
  const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Yogita and Garvit//Wedding Invitation//EN', 'CALSCALE:GREGORIAN'];
  for (const event of events) {
    const start = new Date(event.start).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
    const localDate = new Intl.DateTimeFormat('en-GB', {day:'numeric', month:'long', year:'numeric', timeZone:'Asia/Kolkata'}).format(new Date(event.start));
    const dateId = event.start.slice(0,10).replace(/-/g, '');
    lines.push('BEGIN:VEVENT', `UID:yogita-garvit-${dateId}-${event.id}@wedding-invitation`, 'DTSTAMP:20261031T000000Z', `DTSTART:${start}`, `SUMMARY:${escapeText(`Yogita & Garvit — ${event.name}`)}`, `DESCRIPTION:${escapeText(`Celebrate the wedding of Yogita Khandelwal and Garvit Khandelwal. ${event.name}: ${event.time} ${event.period} IST on ${localDate}.`)}`);
    if (event.location) lines.push(`LOCATION:${escapeText(event.location)}`);
    // End times were not provided, so omit DTEND.
    lines.push('END:VEVENT');
  }
  lines.push('END:VCALENDAR');
  return lines.map(foldLine).join('\r\n') + '\r\n';
}
