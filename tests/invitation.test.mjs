import test from 'node:test';
import assert from 'node:assert/strict';
import { calendarFile } from '../src/calendar.js';
import { events, eventDays } from '../src/wedding.js';
import { eventFilms } from '../src/event-films.js';

test('bride calendar preserves all five IST start times across both celebration days', () => {
  const calendar = calendarFile(events);
  assert.deepEqual([...calendar.matchAll(/DTSTART:(\S+)/g)].map(match => match[1]), ['20261203T053000Z', '20261204T070000Z', '20261204T074500Z', '20261204T094500Z', '20261204T134500Z']);
  assert.equal((calendar.match(/BEGIN:VEVENT/g) || []).length, 5);
  assert.equal(new Set([...calendar.matchAll(/UID:(\S+)/g)].map(match => match[1])).size, 5);
  assert.ok(!calendar.includes('DTEND'));
});
test('welcome is at the wedding venue; Haldi has no invented location', () => {
  const calendar = calendarFile(events);
  const haldi = calendarFile(events.filter(event => event.id === 'haldi'));
  assert.ok(!haldi.includes('LOCATION:'));
  assert.equal((calendar.match(/LOCATION:Infinity Resorts & Farms\\, Alwar\\, Rajasthan/g) || []).length, 4);
});

test('descriptions preserve each event date and do not invent pre-wedding locations', () => {
  for (const event of events.slice(0,1)) {
    const calendar = calendarFile([event]).replace(/\r\n /g, '');
    assert.ok(calendar.includes('IST on 3 December 2026.'));
    assert.ok(!calendar.includes('LOCATION:'));
    assert.ok(calendar.includes(`UID:yogita-garvit-20261203-${event.id}@wedding-invitation`));
  }
  assert.ok(calendarFile([events.find(event => event.id === 'phere')]).replace(/\r\n /g, '').includes('IST on 4 December 2026.'));
});
test('calendar downloads use CRLF and valid UTF-8 line folding', () => {
  const calendar = calendarFile(events);
  for (const line of calendar.split('\r\n')) assert.ok(Buffer.byteLength(line, 'utf8') <= 75);
  assert.ok(!calendar.replace(/\r\n/g, '').includes('\n'));
  const unfolded = calendar.replace(/\r\n /g, '');
  assert.ok(unfolded.includes('SUMMARY:Yogita & Garvit — Welcome of Baarat'));
});

test('bride schedule excludes Chaak-Bhaat and welcomes the arriving Baarat', () => {
  assert.deepEqual(eventDays.map(day => [day.date, day.events.length]), [['2026-12-03',1], ['2026-12-04',4]]);
  assert.ok(!events.some(event => event.id === 'chaak-bhaat' || event.id === 'baarat'));
  assert.equal(eventFilms['welcome-baarat'].cast, 'bride-family-and-groom');
  assert.equal(eventFilms.haldi.cast, 'couple-and-family');
  assert.equal(events.find(event => event.id === 'welcome-baarat').start, '2026-12-04T12:30:00+05:30');
});
