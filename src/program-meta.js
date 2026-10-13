import { programs } from './content.js';

export const audienceOptions = [['all', 'Everyone'], ['organizations', 'Organizations & teams'], ['early-career', 'Students & new joiners'], ['educators', 'Educators']];
export const typeOptions = [['all', 'Programs & services'], ['program', 'Training programs'], ['service', 'HR services']];
export function audienceFor(program) {
  if (['/campus-to-corporate/', '/onboard-trainings/'].includes(program.path)) return 'early-career';
  if (program.path === '/developing-next-generation-teachers/') return 'educators';
  return 'organizations';
}
export const typeFor = program => ['/hrd-audit/', '/hr-policies-for-startups/'].includes(program.path) ? 'service' : 'program';
export const benefitFor = program => program.summary.split(/(?<=[.!?])\s/)[0] || 'Explore the original program outline and learning topics.';
export const reviewNotes = {
  '/time-management/': 'The original takeaways refer to team building. Ask HYtalent for the latest Time Management outline.',
  '/stress-management/': 'Some original takeaways appear to refer to business writing. Ask HYtalent to confirm the latest outline.',
  '/campus-to-corporate/': 'Some original takeaways appear to refer to work-life balance. Ask HYtalent to confirm the latest outline.',
};
const topicLinks = {
  '/time-management/': ['/personal-effectiveness-2/', '/work-life-balance/', '/stress-management/'],
  '/stress-management/': ['/work-life-balance/', '/emotional-intelligence/', '/positive-attitude-at-workplace/'],
  '/campus-to-corporate/': ['/onboard-trainings/', '/mastering-communication-skills/', '/business-writing-etiquette/'],
  '/poshified/': ['/training-on-prevention-of-sexual-harassment-at-workplace/', '/capacity-building-for-internal-complaints-committee/', '/diversity-equity-and-inclusion-training/'],
  '/capacity-building-for-internal-complaints-committee/': ['/poshified/', '/training-on-prevention-of-sexual-harassment-at-workplace/'],
  '/training-on-prevention-of-sexual-harassment-at-workplace/': ['/poshified/', '/capacity-building-for-internal-complaints-committee/'],
  '/hrd-audit/': ['/hr-policies-for-startups/', '/onboard-trainings/'],
};
export function relatedPrograms(page) {
  if (topicLinks[page.path]) return programs.filter(p => topicLinks[page.path].includes(p.path));
  const stop = new Set(['the','and','for','with','this','that','from','have','their','training','skills','program','work','workplace','participants','will','are','can','they','helps','module','organization','organisation','effective']);
  const words = text => new Set((text.toLowerCase().match(/[a-z]{4,}/g) || []).filter(w => !stop.has(w)));
  const current = words(page.title + ' ' + page.summary);
  return programs.filter(p => p.path !== page.path).map(p => ({ p, score: [...words(p.title + ' ' + p.summary)].filter(w => current.has(w)).length })).sort((a,b) => b.score-a.score).slice(0,3).map(item => item.p);
}
