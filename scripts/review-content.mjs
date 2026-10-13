import {readFile,writeFile} from 'node:fs/promises';
const captures=JSON.parse(await readFile('src/content-pages.json','utf8'));
const groups=new Map();
for(const raw of captures){
 const source=raw.match(/^source:\s*(\S+)/m)?.[1];
 const takeaways=raw.match(/### Key Takeaways\s+([\s\S]*?)(?=\n#{1,3} |$)/)?.[1]?.trim();
 if(!takeaways)continue;
 const key=takeaways.toLowerCase().replace(/\s+/g,' ');
 if(!groups.has(key))groups.set(key,{copy:takeaways,sources:[]});
 groups.get(key).sources.push(source);
}
const duplicateGroups=[...groups.values()].filter(g=>g.sources.length>1);
const text=['# Source content review and correction log','','Reviewed 13 October 2026. The original captures are retained unchanged. This review detects repeated takeaway blocks; repetition is evidence to review, not proof that every repeated block is wrong.','','## Clear topic mismatches requiring the content owner','','| Source page | Observation | Current handling |','| --- | --- | --- |','| Time Management | Takeaways discuss team building rather than time management. | Original copy retained; on-page confirmation note. |','| Stress Management | Takeaways discuss business writing. | Original copy retained; on-page confirmation note. |','| Campus to Corporate | Takeaways discuss work-life balance (WLB). | Original copy retained; on-page confirmation note. |','','The implementation does not invent replacement outcomes or change POSH/ICC legal wording. To approve corrections, provide the revised takeaway list for the relevant page, then update its capture and regenerate runtime content.','','## Repeated blocks found across the source pages','',...duplicateGroups.flatMap((group,i)=>['### Repeated block '+(i+1),'',...group.sources.map(url=>'- [Source page]('+url+')'),'',group.copy,'']),'## Correction history','','- 13 October 2026: Added review notes and retained all original substantive copy. No factual corrections approved.',''];
await writeFile('site-archive/CONTENT-REVIEW.md',text.join('\n'));
console.log('Recorded '+duplicateGroups.length+' repeated takeaway groups.');

