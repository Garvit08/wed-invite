import { mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { events } from '../src/wedding.js';
import { calendarFile } from '../src/calendar.js';

const directory = new URL('../public/calendar/', import.meta.url);
mkdirSync(directory, {recursive:true});
writeFileSync(new URL('garvit-yogita-wedding.ics', directory), calendarFile(events));
for (const event of events) writeFileSync(new URL(`garvit-yogita-${event.id}.ics`, directory), calendarFile([event]));
console.log(`Generated ${events.length + 1} wedding calendars in ${fileURLToPath(directory)}`);
