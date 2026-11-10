import test from 'node:test';
import assert from 'node:assert/strict';
import { calendarFile } from '../src/calendar.js';
import { events, eventDays } from '../src/wedding.js';
import { eventFilms } from '../src/event-films.js';

test('calendar preserves all six IST start times across both celebration days', () => {
  const calendar = calendarFile(events);
  assert.deepEqual([...calendar.matchAll(/DTSTART:(\S+)/g)].map(match => match[1]), ['20261203T053000Z', '20261203T094500Z', '20261204T054500Z', '20261204T074500Z', '20261204T094500Z', '20261204T134500Z']);
  assert.equal((calendar.match(/BEGIN:VEVENT/g) || []).length, 6);
  assert.equal(new Set([...calendar.matchAll(/UID:(\S+)/g)].map(match => match[1])).size, 6);
  assert.ok(!calendar.includes('DTEND'));
});
test('departure has no invented location; venue is escaped for other events', () => {
  const calendar = calendarFile(events);
  const departure = calendarFile(events.filter(event => event.id === 'baarat'));
  assert.ok(!departure.includes('LOCATION:'));
  assert.equal((calendar.match(/LOCATION:Infinity Resorts & Farms\\, Alwar\\, Rajasthan/g) || []).length, 3);
});

test('descriptions preserve each event date and do not invent pre-wedding locations', () => {
  for (const event of events.slice(0,2)) {
    const calendar = calendarFile([event]).replace(/\r\n /g, '');
    assert.ok(calendar.includes('IST on 3 December 2026.'));
    assert.ok(!calendar.includes('LOCATION:'));
    assert.ok(calendar.includes(`UID:garvit-yogita-20261203-${event.id}@wedding-invitation`));
  }
  assert.ok(calendarFile([events.find(event => event.id === 'phere')]).replace(/\r\n /g, '').includes('IST on 4 December 2026.'));
});
test('calendar downloads use CRLF and valid UTF-8 line folding', () => {
  const calendar = calendarFile(events);
  for (const line of calendar.split('\r\n')) assert.ok(Buffer.byteLength(line, 'utf8') <= 75);
  assert.ok(!calendar.replace(/\r\n/g, '').includes('\n'));
  const unfolded = calendar.replace(/\r\n /g, '');
  assert.ok(unfolded.includes('SUMMARY:Garvit & Yogita — Departure of Baarat'));
});

test('schedule groups both days and preserves groom-only Baarat casting', () => {
  assert.deepEqual(eventDays.map(day => [day.date, day.events.length]), [['2026-12-03',2], ['2026-12-04',4]]);
  assert.equal(eventFilms.baarat.cast, 'groom-only');
  assert.equal(eventFilms.haldi.cast, 'couple-and-family');
  assert.equal(eventFilms['chaak-bhaat'].cast, 'groom-and-family');
});
