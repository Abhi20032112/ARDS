import React,{useMemo,useState} from 'react';
import {motion,AnimatePresence} from 'framer-motion';
import * as I from 'lucide-react';
import './EnterpriseERP.css';

const modules={
 Admissions:{icon:I.UserPlus,color:'#2563eb',stats:[['New applications','1,248','+18%'],['Verified','984','79%'],['Awaiting review','264','Live']],flow:['Application','Documents','Review','Enrolled'],bars:[42,58,52,72,64,86,78]},
 Attendance:{icon:I.ScanFace,color:'#7c3aed',stats:[['Present today','1,842','94.8%'],['On leave','74','Approved'],['Late arrivals','21','-16%']],flow:['Face scan','Verify','Check-in','Report'],bars:[88,91,87,94,90,96,95]},
 Fees:{icon:I.IndianRupee,color:'#ec4899',stats:[['Collected','₹28.4L','+12%'],['Due','₹3.2L','Follow-up'],['Transactions','2,814','Today']],flow:['Invoice','Reminder','Payment','Receipt'],bars:[45,62,58,76,68,90,84]},
 Examination:{icon:I.ClipboardCheck,color:'#0891b2',stats:[['Exams scheduled','48','This term'],['Results ready','32','Published'],['Evaluations','86%','Complete']],flow:['Schedule','Assess','Evaluate','Publish'],bars:[34,48,61,70,78,88,96]},
 HR:{icon:I.Users,color:'#16a34a',stats:[['Employees','286','Active'],['Payroll ready','272','95%'],['Open requests','14','Action']],flow:['Employee','Attendance','Payroll','Insights'],bars:[56,64,60,72,79,85,92]},
 Payroll:{icon:I.WalletCards,color:'#ea580c',stats:[['Payroll total','₹42.8L','July'],['Processed','272','95%'],['Pending','14','Review']],flow:['Inputs','Calculate','Approve','Disburse'],bars:[46,55,69,65,82,88,94]},
 Inventory:{icon:I.Boxes,color:'#4f46e5',stats:[['Items tracked','8,420','Live'],['Low stock','38','Alert'],['Orders due','16','Today']],flow:['Purchase','Receive','Track','Reorder'],bars:[78,66,72,58,83,69,91]},
 Finance:{icon:I.BarChart3,color:'#0f766e',stats:[['Monthly revenue','₹56.2L','+14%'],['Expenses','₹31.8L','On plan'],['Net position','₹24.4L','Healthy']],flow:['Record','Reconcile','Approve','Report'],bars:[48,59,55,72,76,88,96]},
 Library:{icon:I.Library,color:'#9333ea',stats:[['Books','24,680','Catalogued'],['Issued','3,142','Active'],['Overdue','86','Reminder']],flow:['Search','Issue','Track','Return'],bars:[62,70,66,78,74,83,89]},
 Hostel:{icon:I.Building,color:'#8b5cf6',stats:[['Residents','1,126','Active'],['Rooms occupied','94%','Live'],['Requests open','18','Today']],flow:['Apply','Allocate','Check-in','Manage'],bars:[72,78,83,81,89,92,94]},
 Transport:{icon:I.Bus,color:'#0284c7',stats:[['Routes','42','Active'],['Vehicles','58','Online'],['On time','96%','Today']],flow:['Route','Assign','Track','Notify'],bars:[83,88,86,92,90,95,97]},
 Canteen:{icon:I.Utensils,color:'#f97316',stats:[['Meals served','2,486','Today'],['Wallet sales','₹1.84L','This week'],['Stock alerts','6','Action']],flow:['Menu','Order','Serve','Reconcile'],bars:[58,70,65,82,76,91,87]},
 'ID Cards':{icon:I.Badge,color:'#db2777',stats:[['Cards issued','2,842','Active'],['Ready to print','86','Queue'],['Replacements','12','Review']],flow:['Profile','Verify','Generate','Print'],bars:[36,48,61,74,82,90,96]},
 Analytics:{icon:I.LineChart,color:'#2563eb',stats:[['Data sources','24','Connected'],['Live dashboards','18','Updated'],['Insights','142','This week']],flow:['Connect','Model','Visualise','Decide'],bars:[42,55,51,69,77,85,98]},
 Reports:{icon:I.FileBarChart,color:'#be123c',stats:[['Reports','128','Available'],['Automated','84%','Scheduled'],['Shared','2,840','This month']],flow:['Collect','Analyse','Generate','Share'],bars:[38,50,61,70,80,89,97]},
 'Download Center':{icon:I.DownloadCloud,color:'#0f766e',stats:[['Documents','1,428','Available'],['Downloads','8,240','This month'],['New files','36','This week']],flow:['Upload','Categorise','Publish','Download'],bars:[52,61,59,74,80,88,93]},
 'Parent Portal':{icon:I.Users,color:'#7c3aed',stats:[['Parents active','2,486','Connected'],['Notices read','92%','Today'],['Open queries','28','Support']],flow:['Login','Track child','Pay fees','Connect'],bars:[68,74,79,82,88,91,95]},
 'Teacher Portal':{icon:I.Presentation,color:'#0891b2',stats:[['Teachers','184','Active'],['Classes today','96','Scheduled'],['Tasks pending','32','Action']],flow:['Plan','Teach','Assess','Report'],bars:[61,70,68,78,84,89,94]},
 'Student Portal':{icon:I.GraduationCap,color:'#4f46e5',stats:[['Students active','3,842','Online'],['Assignments','128','Current'],['Completion','88%','This term']],flow:['Learn','Submit','Track','Improve'],bars:[57,63,72,76,81,88,92]}
};

const extras={
 Admissions:{health:98,ops:['Online enquiry','Document verification','Merit list','Seat allocation'],activity:[['ADM-2026-1842','Riya Sharma','Documents verified'],['ADM-2026-1839','Aman Raj','Counselling scheduled']]},
 Attendance:{health:99,ops:['Face recognition','Shift rules','Leave sync','Daily register'],activity:[['EMP-0248','Priya Singh','Checked in · 09:04'],['EMP-0186','Rahul Kumar','Leave approved']]},
 Fees:{health:99,ops:['Fee structures','Online payment','Auto reminders','Receipts'],activity:[['RCPT-84291','Ananya Gupta','₹24,500 received'],['DUE-01842','BCA Semester II','Reminder delivered']]},
 Examination:{health:97,ops:['Date sheet','Admit cards','Evaluation','Results'],activity:[['EXAM-SEM4','B.Tech Semester IV','Schedule published'],['RESULT-118','Internal assessment','Moderation complete']]},
 HR:{health:98,ops:['Employee records','Leave desk','Appraisals','Exit workflow'],activity:[['HR-REQ-288','Neha Kumari','Leave approved'],['EMP-0286','Saurav Jha','Profile updated']]},
 Payroll:{health:99,ops:['Salary rules','Deductions','Payslips','Bank advice'],activity:[['PAY-JUL-26','July payroll','272 employees processed'],['PAY-014','Exception queue','14 records need review']]},
 Inventory:{health:96,ops:['Item master','Purchase orders','Issue & return','Stock audit'],activity:[['PO-2026-448','IT Equipment','Goods received'],['STK-ALRT-38','Consumables','Reorder level reached']]},
 Finance:{health:98,ops:['General ledger','Vouchers','Budget control','Reconciliation'],activity:[['JV-2026-1884','Fee settlement','Posted to ledger'],['BANK-REC-07','HDFC Current A/c','Reconciled']]},
 Library:{health:97,ops:['Cataloguing','Issue & return','Fine rules','Digital library'],activity:[['LIB-ISS-8421','Database Systems','Issued to STU-1842'],['LIB-DUE-086','Overdue batch','Reminder queued']]},
 Hostel:{health:96,ops:['Room allocation','Mess billing','Gate pass','Complaints'],activity:[['HST-A-214','Block A · Room 214','Allocated'],['HST-REQ-118','Electrical complaint','Assigned']]},
 Transport:{health:98,ops:['Route planning','GPS tracking','Driver roster','Pickup alerts'],activity:[['BUS-18','Patna East route','Running on time'],['BUS-07','Danapur route','Reached Stop 12']]},
 Canteen:{health:97,ops:['Menu planning','Smart wallet','Token display','Stock usage'],activity:[['ORD-28486','Lunch counter','Order completed'],['INV-MILK','Dairy stock','Low-stock alert']]},
 'ID Cards':{health:99,ops:['Card templates','QR identity','Batch printing','Replacement'],activity:[['CARD-2842','Student batch 2026','Sent to printer'],['CARD-R-012','Replacement request','Identity verified']]},
 Analytics:{health:99,ops:['KPI builder','Drill-down','Forecasts','Scheduled insights'],activity:[['DASH-OPS-01','Operations dashboard','Refreshed 2 min ago'],['INS-142','Fee collection trend','Insight generated']]},
 Reports:{health:98,ops:['Report builder','Role filters','Schedules','Secure sharing'],activity:[['RPT-FIN-07','Monthly finance','Generated'],['RPT-ATT-24','Attendance summary','Shared with HR']]},
 'Download Center':{health:99,ops:['File categories','Access control','Version history','Expiry rules'],activity:[['DOC-1428','Academic calendar','New version published'],['DOC-1394','Fee circular','Downloaded 486 times']]},
 'Parent Portal':{health:98,ops:['Child progress','Fee payment','Notices','Teacher connect'],activity:[['PAR-1842','Mrs. Sharma','Receipt downloaded'],['QUERY-028','Academic question','Teacher replied']]},
 'Teacher Portal':{health:97,ops:['Lesson planner','Attendance','Assignments','Marks entry'],activity:[['CLS-BCA-2A','Database Systems','Attendance submitted'],['ASSIGN-118','Web Technology','Evaluation completed']]},
 'Student Portal':{health:99,ops:['Class schedule','Assignments','Results','Service requests'],activity:[['STU-1842','Web Technology','Assignment submitted'],['REQ-882','Bonafide certificate','Approved']]}
};

export default function EnterpriseERP(){
 const names=Object.keys(modules),[active,setActive]=useState('Admissions'),[query,setQuery]=useState('');
 const visible=useMemo(()=>names.filter(name=>name.toLowerCase().includes(query.toLowerCase())),[query]);
 const d=modules[active],x=extras[active],Icon=d.icon||I.Blocks;
 const exportModule=()=>{const rows=[['Metric','Value','Status'],...d.stats,['Record','Owner','Activity'],...x.activity];const csv=rows.map(row=>row.map(value=>`"${String(value).replaceAll('"','""')}"`).join(',')).join('\n');const blob=new Blob([csv],{type:'text/csv'}),url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download=`ARDS-${active.replaceAll(' ','-')}-report.csv`;link.click();URL.revokeObjectURL(url)};
 return <section className="section enterprise-erp" id="enterprise-erp"><div className="site-shell">
  <motion.div className="erp-heading" initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}><span>ENTERPRISE ERP</span><h2>Every operation.<br/><em>One intelligent platform.</em></h2><p>Role-based modules give every stakeholder the right information at the right moment.</p></motion.div>
  <div className="erp-workspace">
   <aside className="erp-module-panel"><div className="erp-module-title"><span><I.Blocks/></span><div><b>ARDS ERP</b><small>Connected operations</small></div></div><label><I.Search/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Find a module"/></label><div className="erp-module-list">{visible.map(name=>{const M=modules[name].icon||I.Blocks;return <button key={name} className={active===name?'active':''} onClick={()=>setActive(name)}><M/><span>{name}</span><I.ChevronRight/></button>})}</div><small className="erp-all-note"><I.CheckCircle2/> All business workflows supported</small></aside>
   <div className="erp-live-panel"><header><div><i/><i/><i/></div><span><I.ShieldCheck/> SECURE ERP WORKSPACE</span><b>LIVE</b></header><AnimatePresence mode="wait"><motion.main key={active} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} transition={{duration:.28}} style={{'--module-color':d.color}}><div className="erp-live-head"><div className="erp-active-icon"><Icon/></div><div><small>ACTIVE MODULE</small><h3>{active}</h3><p>Live operations, approvals and insights in one clear view.</p></div><button onClick={exportModule}><I.Download/> Export CSV</button></div><div className="erp-operation-chips">{x.ops.map(op=><span key={op}><I.CheckCircle2/>{op}</span>)}</div><div className="erp-live-stats">{d.stats.map(([label,value,note])=><article key={label}><span>{label}</span><strong>{value}</strong><small>{note}</small></article>)}</div><div className="erp-insight-grid"><div className="erp-trend"><div><span>Operational activity · last 7 days</span><b><I.TrendingUp/> Updated now</b></div><div className="erp-bars">{d.bars.map((height,index)=><i key={index} style={{height:`${height}%`,animationDelay:`${index*.06}s`}}/>)}</div></div><div className="erp-health"><span>Module health</span><div><strong>{x.health}</strong><small>/100</small></div><b><I.CheckCircle2/> All systems operational</b></div></div><div className="erp-flow">{d.flow.map((step,index)=><React.Fragment key={step}><span><I.Check/>{step}</span>{index<d.flow.length-1&&<i/>}</React.Fragment>)}</div><div className="erp-recent"><div><span>Recent activity</span><small>LIVE RECORDS</small></div>{x.activity.map(([id,owner,status])=><article key={id}><b>{id}</b><span>{owner}</span><em>{status}</em><I.ArrowUpRight/></article>)}</div></motion.main></AnimatePresence></div>
  </div>
 </div></section>
}
