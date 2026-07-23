#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd(),dist=path.join(root,'dist'),templatePath=path.join(dist,'index.html');
const pages=[
 {path:'services',title:'AI, ERP, Cloud & Software Solutions | ARDS',description:'Explore AI automation, ERP platforms, custom software, web and mobile apps, cloud infrastructure and cyber security solutions from ARDS in Patna.'},
 {path:'ai-solutions',title:'AI Automation Solutions in Patna, India | ARDS',description:'AI chatbots, face recognition, OCR, predictive analytics, AI dashboards and smart reporting solutions for organizations across India.'},
 {path:'business-automation',title:'Business Automation & Workflow Software | ARDS',description:'Automate attendance, visitors, assets, helpdesk, CRM, sales, purchases, billing and approvals with custom business automation software.'},
 {path:'industries',title:'ERP & Software Solutions for Industries | ARDS',description:'Digital solutions for education, healthcare, manufacturing, government, retail, NGOs, hospitality, transport, real estate and finance.'},
 {path:'work',title:'AI, ERP & Software Development Case Studies | ARDS',description:'Selected AI, ERP, healthcare, manufacturing, automation, website and mobile application projects with measurable outcomes.'},
 {path:'about',title:'About Alpenrose Digital Solutions | Patna, Bihar',description:'Meet Alpenrose Digital Solutions, a Patna-based team building practical AI, ERP, cloud, web, mobile and custom software systems.'},
 {path:'blog',title:'AI, ERP, Automation & Technology Insights | ARDS',description:'Practical articles about artificial intelligence, ERP, business automation, cyber security, SEO, software and digital growth.'},
 {path:'contact',title:'Contact ARDS | Software Company in Patna, Bihar',description:'Contact Alpenrose Digital Solutions in Patna for AI automation, ERP, custom software, website, mobile app and cloud solution enquiries.'},
 {path:'clients',title:'Client Experiences | Alpenrose Digital Solutions',description:'Read client experiences and learn how ARDS supports organizations with dependable digital products, automation and software services.'}
];
if(!fs.existsSync(templatePath))process.exit(0);
const base=fs.readFileSync(templatePath,'utf8');
const esc=s=>s.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
for(const page of pages){
 const url=`https://ards.in/${page.path}`;
 let html=base
  .replace(/<title>[^<]*<\/title>/,`<title>${esc(page.title)}</title>`)
  .replace(/<meta name="description" content="[^"]*"\s*\/?\s*>/,`<meta name="description" content="${esc(page.description)}">`)
  .replace(/<link rel="canonical" href="[^"]*"\s*\/?\s*>/,`<link rel="canonical" href="${url}">`)
  .replace(/<meta property="og:title" content="[^"]*"\s*\/?\s*>/,`<meta property="og:title" content="${esc(page.title)}">`)
  .replace(/<meta property="og:description" content="[^"]*"\s*\/?\s*>/,`<meta property="og:description" content="${esc(page.description)}">`)
  .replace(/<meta property="og:url" content="[^"]*"\s*\/?\s*>/,`<meta property="og:url" content="${url}">`)
  .replace(/<meta name="twitter:title" content="[^"]*"\s*\/?\s*>/,`<meta name="twitter:title" content="${esc(page.title)}">`)
  .replace(/<meta name="twitter:description" content="[^"]*"\s*\/?\s*>/,`<meta name="twitter:description" content="${esc(page.description)}">`);
 const dir=path.join(dist,page.path);fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,'index.html'),html);
}
console.log(`Generated static SEO entry points for ${pages.length} routes.`);
