import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApisService } from '../services/apis.service';
import { GetAllDataService } from '../services/get-all-data.service';
import { TranslationService, LangCode } from '../services/translation.service';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, BorderStyle } from 'docx';

// Extend jsPDF type to include autoTable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => any;
    lastAutoTable: {
      finalY: number;
    };
  }
}

interface Location {
  type: string;
  address: string;
  size: string;
  monthly_cost: number;
}

interface Insurance {
  type: string;
  provider: string;
  coverage: string;
  annual_cost: number;
}

interface StartupCost {
  item: string;
  category: string;
  amount: number;
  timing: string;
}

interface FundingSource {
  source: string;
  type: string;
  amount: number;
  status: string;
}

interface CashFlowProjection {
  month: string;
  cashInflow: number;
  cashOutflow: number;
  balance: number;
  notes: string;
}

interface BreakevenAnalysis {
  Point: string;
  Timeline: string;
}

interface TestSetup {
  locations: Location[];
  insurances: Insurance[];
  business_type: string;
  timeline: string;
  setup_costs: number;
}

interface FinancialPlanning {
  startup_costs: StartupCost[];
  funding_sources: FundingSource[];
  cash_flow_projections: CashFlowProjection[];
  breakeven_analysis: BreakevenAnalysis;
}

interface ApiData {
  website: any;
  testing_your_idea: any;
  latest_sales_strategy: any;
  latest_marketing: any;
  start_simple:any;
  latest_mvp_development: any;
  latest_market_research: any;
  test_setup: any;
  latest_financial_planning: any;
  latest_launch_preparation:any;
  latest_business_idea: {
    passions_interests: string[];
    business_ideas: string[];
    skills_experience:string[];
    values_goals:string[];
    personal_notes:string[]
  };
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  dropdownOpen = false;
  isLoading = false;
  businessIdeas: any = [];
  currentLang: LangCode;


  constructor(
    private apisService: ApisService,
    private router: Router,
    private getAllData: GetAllDataService,
    private translation: TranslationService
  ) {
    this.currentLang = this.translation.getCurrentLang();
  }

  ngOnInit(): void {
    // Initial data load not needed since we load on demand
     // this.getAllData.getAllDataForPDF().subscribe((res)=>{
     // console.log(res)
     // })
    this.translation.langChange$.subscribe(lang => {
      this.currentLang = lang;
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const dropdown = document.querySelector('.dropdown');
    if (dropdown && !dropdown.contains(event.target as Node)) {
      this.dropdownOpen = false;
    }
  }

  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.dropdownOpen = !this.dropdownOpen;
  }

  exportBusinessPlan(format: string, event: Event) {
    event.preventDefault();
    this.dropdownOpen = false;

    switch (format) {
      case 'pdf':
        this.generatePDF();
        break;
      case 'docx':
        this.generateWord();
        break;
      case 'md':
      case 'html':
        // TODO: Implement other format exports
        console.log(`Export to ${format} not implemented yet`);
        break;
    }
  }

  changeLang(lang: string) {
    this.translation.loadLanguage(lang as LangCode);
  }


// generatePDF() {
//   if (this.isLoading) return;

//   this.isLoading = true;
//   this.getAllData.getAllDataForPDF().subscribe({
//       next: (response: any) => {
//           try {
//               const apiData = response as ApiData;
//               const doc = new jsPDF();
//               let finalY = 10;

//               const addPageIfNeeded = () => {
//                   if (finalY > 270) {
//                       doc.addPage();
//                       finalY = 10;
//                   }
//               };

//               // العنوان الرئيسي
//               doc.setFontSize(20);
//               doc.text('Business Report', 75, finalY);
//               finalY += 10;

//               // 📌 القسم الأول: Latest Business Idea  
//               doc.setFontSize(16);
//               doc.text('** Latest Business Idea', 10, finalY);
//               finalY += 10;
//               doc.setFontSize(12);
//               doc.text('* Business Idea', 10, finalY);
//               finalY += 10;

//               const businessIdeas = apiData?.latest_business_idea?.business_ideas || ['N/A'];
//               businessIdeas.forEach((idea, index) => {
//                   addPageIfNeeded();
//                   doc.text(`- ${idea}`, 20, finalY);
//                   finalY += 10;
//               });

//               addPageIfNeeded();
//               doc.text('* Passions & Interests', 10, finalY);
//               finalY += 10;
//               const passions_interests = apiData?.latest_business_idea?.passions_interests || ['N/A'];
//               passions_interests.forEach((idea, index) => {
//                   addPageIfNeeded();
//                   doc.text(`- ${idea}`, 20, finalY);
//                   finalY += 10;
//               });

//               addPageIfNeeded();
//               doc.text('* Skills & Experience', 10, finalY);
//               finalY += 10;
//               const skills_experience = apiData?.latest_business_idea?.skills_experience || ['N/A'];
//               skills_experience.forEach((idea, index) => {
//                   addPageIfNeeded();
//                   doc.text(`- ${idea}`, 20, finalY);
//                   finalY += 10;
//               });

//               addPageIfNeeded();
//               doc.text('* Values & Goals', 10, finalY);
//               finalY += 10;
//               const values_goals = apiData?.latest_business_idea?.values_goals || ['N/A'];
//               values_goals.forEach((idea, index) => {
//                   addPageIfNeeded();
//                   doc.text(`- ${idea}`, 20, finalY);
//                   finalY += 10;
//               });

//               addPageIfNeeded();
//               // 📌 القسم الثاني: Latest Market Research  
//               const marketResearch = apiData?.latest_market_research;
//               if (marketResearch) {
//                   doc.setFontSize(16);
//                   doc.text('** Latest Market Research', 10, finalY);
//                   finalY += 10;

//                   doc.autoTable({
//                       startY: finalY,
//                       head: [['Field', 'Value']],
//                       body: [
//                           ['Customer Name', marketResearch.target_customer_name || 'N/A'],
//                           ['Age', marketResearch.age || 'N/A'],
//                           ['Income', marketResearch.income || 'N/A'],
//                           ['Education', marketResearch.education || 'N/A']
//                       ]
//                   });

//                   finalY = (doc as any).lastAutoTable.finalY + 10;
//               }

//               addPageIfNeeded();
//               // 📌 القسم الثالث: Latest MVP Development
//               const mvp_development = apiData?.latest_mvp_development;
//               if (mvp_development) {
//                   doc.setFontSize(16);
//                   doc.text('** Latest MVP Development', 10, finalY);
//                   finalY += 10;

//                   const features = mvp_development.features || {};

//                   if (features.must_have_features?.length > 0) {
//                       doc.text('* Must Have Features', 10, finalY);
//                       finalY += 10;
//                       features.must_have_features.forEach((feature: string) => {
//                           addPageIfNeeded();
//                           doc.text(`- ${feature}`, 20, finalY);
//                           finalY += 10;
//                       });
//                   }

//                   if (features.should_have_features?.length > 0) {
//                       doc.text('* Should Have Features', 10, finalY);
//                       finalY += 10;
//                       features.should_have_features.forEach((feature: string) => {
//                           addPageIfNeeded();
//                           doc.text(`- ${feature}`, 20, finalY);
//                           finalY += 10;
//                       });
//                   }

//                   if (mvp_development.assumptions?.length > 0) {
//                       doc.text('* Assumptions', 10, finalY);
//                       finalY += 10;
//                       mvp_development.assumptions.forEach((assumption: any) => {
//                           addPageIfNeeded();
//                           doc.text(`- ${assumption.description}`, 20, finalY);
//                           finalY += 10;
//                           doc.text(`- ${assumption.test_method}`, 20, finalY);
//                           finalY += 10;
//                           doc.text(`- ${assumption.success_criteria}`, 20, finalY);
//                           finalY += 10;
                        
//                       });
//                   }
//                   if (mvp_development.timelines?.length > 0) {
//                     doc.text('* Timelines', 10, finalY);
//                     finalY += 10;
//                     mvp_development.timelines.forEach((timeline: any) => {
//                         addPageIfNeeded();
//                         doc.text(`- name : ${timeline.name}`, 20, finalY);
//                         finalY += 10;
//                         doc.text(`- duration : ${timeline.duration}`, 20, finalY);
//                         finalY += 10;
//                          doc.text('milestones', 20, finalY);
//                          finalY += 10;
//                         (timeline.milestones || []).forEach((ele: any) => {
//                             addPageIfNeeded();
//                             doc.text(`- ${ele}`, 20, finalY);
//                             finalY += 10;
//                         });
//                     });
//                 }
                

//                   if (mvp_development.metrics?.length > 0) {
//                       doc.text('* Metrics', 10, finalY);
//                       finalY += 10;
//                       doc.autoTable({
//                           startY: finalY,
//                           head: [['Metric Name', 'Target Value', 'Actual Value']],
//                           body: mvp_development.metrics.map((metric: any) => [
//                               metric.name,
//                               metric.target_value,
//                               metric.actual_value
//                           ])
//                       });
//                       finalY = (doc as any).lastAutoTable.finalY + 10;
//                   }
//               }
//               const marketing = apiData?.latest_marketing;
//               if (marketing) {
//                 doc.setFontSize(16);
//                 doc.text('** Latest Marketing', 10, finalY);
//                 finalY += 10;
//                 doc.setFontSize(12);

//                 doc.text('* Audience Description', 10, finalY);
//                 finalY += 10;
//                 doc.text(`- ${marketing.audience_description || 'N/A'}`, 20, finalY);
//                 finalY += 10;

//                 doc.text('* Problem Statement', 10, finalY);
//                 finalY += 10;
//                 doc.text(`- ${marketing.problem_statement || 'N/A'}`, 20, finalY);
//                 finalY += 10;

//                 doc.text('* Solution Overview', 10, finalY);
//                 finalY += 10;
//                 doc.text(`- ${marketing.solution_overview || 'N/A'}`, 20, finalY);
//                 finalY += 10;

//                 if (marketing.content_strategies?.length > 0) {
//                     doc.text('* Content Strategies', 10, finalY);
//                     finalY += 10;
//                     marketing.content_strategies.forEach((strategy: any) => {
//                         addPageIfNeeded();
//                         doc.text(`- Type: ${strategy.type}`, 20, finalY);
//                         finalY += 10;
//                         doc.text(`  Description: ${strategy.description}`, 20, finalY);
//                         finalY += 10;
//                         doc.text(`  Frequency: ${strategy.frequency || 'N/A'}`, 20, finalY);
//                         finalY += 10;
//                         doc.text(`  Responsible: ${strategy.responsible_person || 'N/A'}`, 20, finalY);
//                         finalY += 10;
//                     });
//                 }

//                 if (marketing.brand_identity) {
//                     doc.text('* Brand Identity', 10, finalY);
//                     finalY += 10;
//                     doc.text(`- Mission: ${marketing.brand_identity.mission || 'N/A'}`, 20, finalY);
//                     finalY += 10;
//                     doc.text(`- Vision: ${marketing.brand_identity.vision || 'N/A'}`, 20, finalY);
//                     finalY += 10;
//                     doc.text(`- Tone: ${marketing.brand_identity.tone || 'N/A'}`, 20, finalY);
//                     finalY += 10;
//                     doc.text(`- Visual Style: ${marketing.brand_identity.visual_style || 'N/A'}`, 20, finalY);
//                     finalY += 10;
//                 }
//             }

//               doc.save('Business_Report.pdf');
//           } catch (error) {
//               console.error('Error generating PDF:', error);
//               this.isLoading = false;
//           } finally {
//               this.isLoading = false;
//           }
//       },
//       error: (error) => {
//           console.error('Error fetching data for PDF:', error);
//           this.isLoading = false;
//       }
//   });
// }
generatePDF() {
  if (this.isLoading) return;

  this.isLoading = true;
  this.getAllData.getAllDataForPDF().subscribe({
    next: (response: any) => {
      try {
        const apiData = response as ApiData;
        const doc = new jsPDF();
        let finalY = 10;

        const addPageIfNeeded = () => {
          if (finalY > 270) {
            doc.addPage();
            finalY = 10;
          }
        };

        const addSectionTitle = (title: string) => {
  doc.setTextColor(255, 0, 0); // تعيين اللون الأحمر
  doc.setFontSize(16);
  doc.text(`** ${title}`, 10, finalY);
  doc.setTextColor(0, 0, 0); // إعادة اللون إلى الأسود
  finalY += 10;
  addPageIfNeeded();
};

 
        const addSubTitle = (subtitle: string) => {
  doc.setTextColor(0, 0, 139); // تعيين اللون الأحمر
  doc.setFontSize(12);
  doc.text(`* ${subtitle}`, 10, finalY);
  doc.setTextColor(0, 0, 0); // إعادة اللون إلى الأسود
  finalY += 10;
  addPageIfNeeded();
};

        const addListItems = (items: string[], indent = 20) => {
          items.forEach((item) => {
            addPageIfNeeded();
            const wrappedText = doc.splitTextToSize(`- ${item}`, 180);
            doc.text(wrappedText, indent, finalY);
            finalY += wrappedText.length * 7;
          });
        };

        doc.setFontSize(20);
        doc.text('Business Report', 75, finalY);
        finalY += 10;

        // 📌 القسم الأول: Latest Business Idea  
        addSectionTitle('Latest Business Idea');

        addSubTitle('Business Idea');
        addListItems(apiData?.latest_business_idea?.business_ideas || ['N/A']);

        addSubTitle('Passions & Interests');
        addListItems(apiData?.latest_business_idea?.passions_interests || ['N/A']);

        addSubTitle('Skills & Experience');
        addListItems(apiData?.latest_business_idea?.skills_experience || ['N/A']);

        addSubTitle('Values & Goals');
        addListItems(apiData?.latest_business_idea?.values_goals || ['N/A']);
        addSubTitle('Personal Notes');
        addListItems(apiData?.latest_business_idea?.personal_notes || ['N/A']);


        // 📌 القسم الثاني: Testing Your Idea
addSectionTitle('Testing Your Idea');

(apiData?.testing_your_idea || []).forEach((testIdea: { problem_statement: any; current_solutions_details: any; switch_reason: any; desirability_notes: any; required_skills: any; qualifications_permits: any; feasibility_notes: any; payment_possible: any; profitability: any; finances_details: any; viability_notes: any; }, index: number) => {
  addSubTitle(`Idea Test #${index + 1}`);

  addSubTitle('Problem Statement');
  addListItems(testIdea.problem_statement || ['N/A']);

  addSubTitle('Current Solutions Details');
  addListItems(testIdea.current_solutions_details || ['N/A']);

  addSubTitle('Switch Reason');
  addListItems(testIdea.switch_reason || ['N/A']);

  addSubTitle('Desirability Notes');
  addListItems(testIdea.desirability_notes || ['N/A']);

  addSubTitle('Required Skills');
  addListItems(testIdea.required_skills || ['N/A']);

  addSubTitle('Qualifications / Permits');
  addListItems(testIdea.qualifications_permits || ['N/A']);

  addSubTitle('Feasibility Notes');
  addListItems(testIdea.feasibility_notes || ['N/A']);

  addSubTitle('Payment Possible');
  addListItems(testIdea.payment_possible || ['N/A']);

  addSubTitle('Profitability');
  addListItems(testIdea.profitability || ['N/A']);

  addSubTitle('Finances Details');
  addListItems(testIdea.finances_details || ['N/A']);

  addSubTitle('Viability Notes');
  addListItems(testIdea.viability_notes || ['N/A']);
});


      // 📌 القسم الثاني: Latest Market Research  
// if (apiData?.latest_market_research) {
//   addSectionTitle('Latest Market Research');

//   const research = apiData.latest_market_research;

//   // تحضير بيانات الجدول الأساسية
//   const researchData = [
//     ['Customer Name', research.target_customer_name || 'N/A'],
//     ['Age', research.age || 'N/A'],
//     ['Income', research.income || 'N/A'],
//     ['Education', research.education || 'N/A'],
   
//   ];

//   // إنشاء جدول للبيانات الأساسية
//   doc.autoTable({
//     startY: finalY,
//     head: [['Field', 'Value']],
//     body: researchData
//   });

//   finalY = (doc as any).lastAutoTable.finalY + 10;

//   // إضافة الحلول كعناوين فرعية وقوائم
//   if (research.must_have_solutions?.length > 0) {
//     addSubTitle('Must-Have Solutions');
//     addListItems(research.must_have_solutions);
//   }

//   if (research.should_have_solutions?.length > 0) {
//     addSubTitle('Should-Have Solutions');
//     addListItems(research.should_have_solutions);
//   }

//   if (research.nice_to_have_solutions?.length > 0) {
//     addSubTitle('Nice-To-Have Solutions');
//     addListItems(research.nice_to_have_solutions);
//   }

//   finalY += 10; // إضافة مسافة بعد القسم
// }
if (apiData?.latest_market_research) {
  addSectionTitle('Latest Market Research');

  const research = apiData.latest_market_research;

  // تحضير بيانات الجدول الأساسية مع الحقول الجديدة
  const researchData = [
    ['Customer Name', research.target_customer_name || 'N/A'],
    ['Age', research.age || 'N/A'],
    ['Income', research.income || 'N/A'],
    ['Employment', research.employment || 'N/A'],
    ['Gender', research.gender || 'N/A'],
    ['Education', research.education || 'N/A'],
    ['Other', research.other || 'N/A'],
  ];

  // إنشاء جدول للبيانات الأساسية
  doc.autoTable({
    startY: finalY,
    head: [['Field', 'Value']],
    body: researchData
  });

  finalY = (doc as any).lastAutoTable.finalY + 10;

  // إضافة باقي الأقسام كمحتوى فرعي مع قوائم
  if (research.must_have_solutions?.length > 0) {
    addSubTitle('Must-Have Solutions');
    addListItems(research.must_have_solutions);
  }

  if (research.should_have_solutions?.length > 0) {
    addSubTitle('Should-Have Solutions');
    addListItems(research.should_have_solutions);
  }

  if (research.nice_to_have_solutions?.length > 0) {
    addSubTitle('Nice-To-Have Solutions');
    addListItems(research.nice_to_have_solutions);
  }

  if (research.help_persona?.length > 0) {
    addSubTitle('Help Persona');
    addListItems(research.help_persona);
  }

  if (research.problem?.length > 0) {
    addSubTitle('Problem');
    addListItems(research.problem);
  }

  if (research.solution?.length > 0) {
    addSubTitle('Solution');
    addListItems(research.solution);
  }

  if (research.nots?.length > 0) {
    addSubTitle('Notes');
    addListItems(research.nots);
  }

  finalY += 10; // إضافة مسافة بعد نهاية القسم
}



        // 📌 القسم الثالث: Latest MVP Development
      //   if (apiData?.latest_mvp_development) {
      //     addSectionTitle('Latest MVP Development');
      //     const mvp = apiData.latest_mvp_development;
      
      //     // Features Section
      //     if (mvp.features) {
      //         addSubTitle('Features');
      
      //         if (mvp.features.must_have_features?.length > 0) {
      //             addSubTitle('Must Have Features');
      //             addListItems(mvp.features.must_have_features);
      //         }
      
      //         if (mvp.features.should_have_features?.length > 0) {
      //             addSubTitle('Should Have Features');
      //             addListItems(mvp.features.should_have_features);
      //         }
      
      //         if (mvp.features.nice_to_have_features?.length > 0) {
      //             addSubTitle('Nice To Have Features');
      //             addListItems(mvp.features.nice_to_have_features);
      //         }
      
      //         // Metrics for Features
      //         if (mvp.features.metrics?.length > 0) {
      //             addSubTitle('Feature Metrics');
      //             doc.autoTable({
      //                 startY: finalY,
      //                 head: [['Metric Name', 'Target Value', 'Actual Value']],
      //                 body: mvp.features.metrics.map((metric: { name: any; target_value: any; actual_value: any; }) => [
      //                     metric.name,
      //                     metric.target_value,
      //                     metric.actual_value
      //                 ])
      //             });
      //             finalY = (doc as any).lastAutoTable.finalY + 10;
      //         }
      //     }
      
      //     // Assumptions Section
      //     if (mvp.assumptions?.length > 0) {
      //         addSubTitle('Assumptions');
      //         mvp.assumptions.forEach((assumption: { description: any; test_method: any; success_criteria: any; metrics: { name: any; target_value: any; actual_value: any; }[]; }) => {
      //             addPageIfNeeded();
      //             doc.text(`- ${assumption.description}`, 20, finalY);
      //             finalY += 7;
      //             doc.text(`  Test Method: ${assumption.test_method}`, 20, finalY);
      //             finalY += 7;
      //             doc.text(`  Success Criteria: ${assumption.success_criteria}`, 20, finalY);
      //             finalY += 10;
      
      //             // Metrics for Assumption
      //             if (assumption.metrics?.length > 0) {
      //                 addSubTitle('Assumption Metrics');
      //                 doc.autoTable({
      //                     startY: finalY,
      //                     head: [['Metric Name', 'Target Value', 'Actual Value']],
      //                     body: assumption.metrics.map((metric: { name: any; target_value: any; actual_value: any; }) => [
      //                         metric.name,
      //                         metric.target_value,
      //                         metric.actual_value
      //                     ])
      //                 });
      //                 finalY = (doc as any).lastAutoTable.finalY + 10;
      //             }
      //         });
      //     }
      
      //     // Timelines Section
      //     if (mvp.timelines?.length > 0) {
      //         addSubTitle('Timelines');
      //         mvp.timelines.forEach((timeline: { name: any; duration: any; milestones: any; metrics: any[]; }) => {
      //             addPageIfNeeded();
      //             doc.text(`- Name: ${timeline.name}`, 20, finalY);
      //             finalY += 7;
      //             doc.text(`  Duration: ${timeline.duration}`, 20, finalY);
      //             finalY += 7;
      //             doc.text('  Milestones:', 20, finalY);
      //             finalY += 7;
      //             addListItems(timeline.milestones || [], 30);
      
      //             // Metrics for Timelines
      //             if (timeline.metrics?.length > 0) {
      //                 addSubTitle('Timeline Metrics');
      //                 doc.autoTable({
      //                     startY: finalY,
      //                     head: [['Metric Name', 'Target Value', 'Actual Value']],
      //                     body: timeline.metrics.map((metric) => [
      //                         metric.name,
      //                         metric.target_value,
      //                         metric.actual_value
      //                     ])
      //                 });
      //                 finalY = (doc as any).lastAutoTable.finalY + 10;
      //             }
      //         });
      //     }
      // }
      if (apiData?.start_simple) {
        addSectionTitle('Start Simple');
      
        const startSimple = apiData.start_simple;
      
        if (startSimple.big_solution?.length > 0) {
          addSubTitle('Big Solution');
          addListItems(startSimple.big_solution);
        }
      
        if (startSimple.entry_strategy?.length > 0) {
          addSubTitle('Entry Strategy');
          addListItems(startSimple.entry_strategy);
        }
      
        if (startSimple.things?.length > 0) {
          addSubTitle('Things');
          addListItems(startSimple.things);
        }
      
        if (startSimple.validation_questions?.length > 0) {
          addSubTitle('Validation Questions');
          addListItems(startSimple.validation_questions);
        }
      
        if (startSimple.future_plan?.length > 0) {
          addSubTitle('Future Plan');
          addListItems(startSimple.future_plan);
        }
      
        if (startSimple.notes?.length > 0) {
          addSubTitle('Notes');
          addListItems(startSimple.notes);
        }
      
        finalY += 10; // إضافة مسافة بعد نهاية القسم
      }
      
      

        // 📌 القسم الرابع: Latest Marketing  
        if (apiData?.latest_marketing) {
          addSectionTitle('Latest Marketing');
          const marketing = apiData.latest_marketing;
        
          // Options
          if (marketing.options?.length > 0) {
            addSubTitle('Options');
            addListItems(marketing.options);
          }
        
          // Notes
          addSubTitle('General Notes');
          addListItems([marketing.notes || 'N/A']);
        
          // Marketing Campaigns
          if (marketing.marketing_campaigns?.length > 0) {
            marketing.marketing_campaigns.forEach((campaign: any, index: number) => {
              addSubTitle(`Marketing Campaign #${index + 1}`);
              doc.text(`- Goal: ${campaign.goal || 'N/A'}`, 20, finalY);
              finalY += 7;
              doc.text(`- Audience: ${campaign.audience || 'N/A'}`, 20, finalY);
              finalY += 7;
              doc.text(`- Format: ${campaign.format || 'N/A'}`, 20, finalY);
              finalY += 7;
              doc.text(`- Channels: ${campaign.channels || 'N/A'}`, 20, finalY);
              finalY += 7;
              doc.text(`- Notes: ${campaign.notes || 'N/A'}`, 20, finalY);
              finalY += 10;
            });
          }
        }
        
        // if (apiData?.latest_marketing) {
        //   addSectionTitle('Latest Marketing');
        //   const marketing = apiData.latest_marketing;

        //   addSubTitle('Audience Description');
        //   addListItems([marketing.audience_description || 'N/A']);

        //   addSubTitle('Problem Statement');
        //   addListItems([marketing.problem_statement || 'N/A']);

        //   addSubTitle('Solution Overview');
        //   addListItems([marketing.solution_overview || 'N/A']);

        //   if (marketing.content_strategies?.length > 0) {
        //     addSubTitle('Content Strategies');
        //     marketing.content_strategies.forEach((strategy: any) => {
        //       addPageIfNeeded();
        //       doc.text(`- Type: ${strategy.type}`, 20, finalY);
        //       finalY += 7;
        //       doc.text(`  Description: ${strategy.description}`, 20, finalY);
        //       finalY += 7;
        //       doc.text(`  Frequency: ${strategy.frequency || 'N/A'}`, 20, finalY);
        //       finalY += 7;
        //       doc.text(`  Responsible: ${strategy.responsible_person || 'N/A'}`, 20, finalY);
        //       finalY += 10;
        //     });
        //   }

        //   if (marketing.brand_identity) {
        //     addSubTitle('Brand Identity');
        //     doc.text(`- Mission: ${marketing.brand_identity.mission || 'N/A'}`, 20, finalY);
        //     finalY += 7;
        //     doc.text(`- Vision: ${marketing.brand_identity.vision || 'N/A'}`, 20, finalY);
        //     finalY += 7;
        //     doc.text(`- Tone: ${marketing.brand_identity.tone || 'N/A'}`, 20, finalY);
        //     finalY += 7;
        //     doc.text(`- Visual Style: ${marketing.brand_identity.visual_style || 'N/A'}`, 20, finalY);
        //     finalY += 10;
        //   }
        // }
        // if (apiData?.latest_sales_strategy) {
        //   addSectionTitle('Latest Sales Strategy');

        //   // ✅ قنوات البيع
        //   if (apiData.latest_sales_strategy.sales_channels?.length > 0) {
        //     addSubTitle('Sales Channels');
        //     apiData.latest_sales_strategy.sales_channels.forEach((channel: any) => {
        //       addPageIfNeeded();
        //       doc.text(`- Name: ${channel.name}`, 20, finalY);
        //       finalY += 7;
        //       doc.text(`  Description: ${channel.description}`, 20, finalY);
        //       finalY += 7;
        //       doc.text(`  Target Revenue: ${channel.target_revenue}`, 20, finalY);
        //       finalY += 7;
        //       doc.text(`  Commission Structure: ${channel.commission_structure}`, 20, finalY);
        //       finalY += 10;
        //     });
        //   }

        //   // ✅ خطط التسعير
        //   if (apiData.latest_sales_strategy.pricing_tiers?.length > 0) {
        //     addSubTitle('Pricing Tiers');
        //     apiData.latest_sales_strategy.pricing_tiers.forEach((tier: any) => {
        //       addPageIfNeeded();
        //       doc.text(`- Name: ${tier.name}`, 20, finalY);
        //       finalY += 7;
        //       doc.text(`  Price: ${tier.price}`, 20, finalY);
        //       finalY += 7;
        //       doc.text(`  Target Customer: ${tier.target_customer}`, 20, finalY);
        //       finalY += 7;
        //       doc.text('  Features:', 20, finalY);
        //       finalY += 7;
        //       addListItems(tier.features || [], 30);
        //       finalY += 10;
        //     });
        //   }

        //   // ✅ عمليات البيع
        //   if (apiData.latest_sales_strategy.sales_processes?.length > 0) {
        //     addSubTitle('Sales Processes');
        //     apiData.latest_sales_strategy.sales_processes.forEach((process: any) => {
        //       addPageIfNeeded();
        //       doc.text(`- Stage: ${process.stage}`, 20, finalY);
        //       finalY += 7;
        //       doc.text(`  Activities: ${process.activities}`, 20, finalY);
        //       finalY += 7;
        //       doc.text(`  Duration: ${process.duration}`, 20, finalY);
        //       finalY += 7;
        //       doc.text(`  Responsible Person: ${process.responsible_person}`, 20, finalY);
        //       finalY += 10;
        //     });
        //   }

        //   // ✅ فرق المبيعات
        //   if (apiData.latest_sales_strategy.sales_teams?.length > 0) {
        //     addSubTitle('Sales Teams');
        //     apiData.latest_sales_strategy.sales_teams.forEach((team: any) => {
        //       addPageIfNeeded();
        //       doc.text(`- Role: ${team.role}`, 20, finalY);
        //       finalY += 7;
        //       doc.text(`  Responsibilities: ${team.responsibilities}`, 20, finalY);
        //       finalY += 7;
        //       doc.text(`  Required Skills: ${team.required_skills}`, 20, finalY);
        //       finalY += 7;
        //       doc.text(`  Target Metrics: ${team.target_metrics}`, 20, finalY);
        //       finalY += 10;
        //     });
        //   }
        // }
        // if (apiData?.test_setup) {
        //   addSectionTitle('Business Setup Details');

        //   doc.text(`Business Type: ${apiData.test_setup.business_type}`, 20, finalY);
        //   finalY += 7;
        //   doc.text(`Setup Costs: ${apiData.test_setup.setup_costs}`, 20, finalY);
        //   finalY += 7;
        //   doc.text(`Timeline: ${apiData.test_setup.timeline}`, 20, finalY);
        //   finalY += 10;

        //   // ✅ المتطلبات
        //   if (apiData.test_setup.requirements?.length > 0) {
        //     addSubTitle('Requirements');
        //     addListItems(apiData.test_setup.requirements, 20);
        //   }

        //   // ✅ التراخيص
        //   if (apiData.test_setup.licenses?.length > 0) {
        //     addSubTitle('Licenses');
        //     apiData.test_setup.licenses.forEach((license: any) => {
        //       addPageIfNeeded();
        //       doc.text(`- Name: ${license.name}`, 20, finalY);
        //       finalY += 7;
        //       doc.text(`  Status: ${license.status}`, 20, finalY);
        //       finalY += 7;
        //       doc.text('  Requirements:', 20, finalY);
        //       finalY += 7;
        //       addListItems(license.requirements || [], 30);
        //       finalY += 10;
        //     });
        //   }

        //   // ✅ المواقع
        //   if (apiData.test_setup.locations?.length > 0) {
        //     addSubTitle('Locations');
        //     apiData.test_setup.locations.forEach((location: any) => {
        //       addPageIfNeeded();
        //       doc.text(`- Type: ${location.type}`, 20, finalY);
        //       finalY += 7;
        //       doc.text(`  Address: ${location.address}`, 20, finalY);
        //       finalY += 7;
        //       doc.text(`  Size: ${location.size} sqm`, 20, finalY);
        //       finalY += 7;
        //       doc.text(`  Monthly Cost: ${location.monthly_cost}`, 20, finalY);
        //       finalY += 10;
        //     });
        //   }

        //   // ✅ التأمينات
        //   if (apiData.test_setup.insurances?.length > 0) {
        //     addSubTitle('Insurances');
        //     apiData.test_setup.insurances.forEach((insurance: any) => {
        //       addPageIfNeeded();
        //       doc.text(`- Type: ${insurance.type}`, 20, finalY);
        //       finalY += 7;
        //       doc.text(`  Provider: ${insurance.provider}`, 20, finalY);
        //       finalY += 7;
        //       doc.text(`  Coverage: ${insurance.coverage}`, 20, finalY);
        //       finalY += 7;
        //       doc.text(`  Annual Cost: ${insurance.annual_cost}`, 20, finalY);
        //       finalY += 10;
        //     });
        //   }
        // }
        if (apiData?.test_setup) {
          addSectionTitle('Business Setup Details');
        
          doc.text(`Business Type: ${apiData.test_setup.type || 'N/A'}`, 20, finalY);
          finalY += 7;
        
          if (apiData.test_setup.notes?.detail) {
            doc.text(`Notes: ${apiData.test_setup.notes.detail}`, 20, finalY);
            finalY += 10;
          } else {
            doc.text(`Notes: None`, 20, finalY);
            finalY += 10;
          }
        
          // ✅ المهام (Tasks)
          if (apiData.test_setup.tasks?.length > 0) {
            addSubTitle('Tasks');
            apiData.test_setup.tasks.forEach((task: any, index: number) => {
              addPageIfNeeded();
              doc.text(`Task ${index + 1}:`, 20, finalY);
              finalY += 7;
              doc.text(`- Title: ${task.title || 'N/A'}`, 25, finalY);
              finalY += 7;
              doc.text(`- Status: ${task.status || 'N/A'}`, 25, finalY);
              finalY += 7;
              doc.text(`- Deadline: ${task.deadline || 'N/A'}`, 25, finalY);
              finalY += 10;
            });
          } else {
            doc.text(`No tasks available.`, 20, finalY);
            finalY += 10;
          }
        }
        
        if (apiData?.latest_sales_strategy?.length > 0) {
          addSectionTitle('Latest Sales Strategy');
        
          apiData.latest_sales_strategy.forEach((strategy: any) => {
            addPageIfNeeded();
            
            const salesData = [
              ['Target Revenue', strategy.target_revenue ?? 'N/A'],
              ['Unit Price', strategy.unit_price ?? 'N/A'],
              ['Interactions Needed', strategy.interactions_needed ?? 'N/A'],
            //  ['Engagement Needed', strategy.engagement_needed ?? 'N/A'],
              ['Reach Needed', strategy.reach_needed ?? 'N/A'],
              ['Sales Needed', strategy.sales_needed ?? 'N/A'],
              ['Total Interactions', strategy.total_interactions ?? 'N/A'],
              ['Total Reach', strategy.total_reach ?? 'N/A'],
            ];
        
            // إنشاء جدول للمعلومات
            doc.autoTable({
              startY: finalY,
              head: [['Field', 'Value']],
              body: salesData
            });
        
            finalY = (doc as any).lastAutoTable.finalY + 10;
          });
        }
        
        // if (apiData?.latest_financial_planning) {
        //   addSectionTitle('Financial Planning');

        //   // ✅ تكاليف بدء التشغيل
        //   if (apiData.latest_financial_planning.startup_costs?.length > 0) {
        //     addSubTitle('Startup Costs');
        //     apiData.latest_financial_planning.startup_costs.forEach((cost: any) => {
        //       addPageIfNeeded();
        //       doc.text(`- Item: ${cost.item}`, 20, finalY);
        //       finalY += 7;
        //       doc.text(`  Category: ${cost.category}`, 20, finalY);
        //       finalY += 7;
        //       doc.text(`  Amount: ${cost.amount}`, 20, finalY);
        //       finalY += 7;
        //       doc.text(`  Timing: ${cost.timing}`, 20, finalY);
        //       finalY += 7;
        //       doc.text(`  Notes: ${cost.notes}`, 20, finalY);
        //       finalY += 10;
        //     });
        //   }

        //   // ✅ مصادر التمويل
        //   if (apiData.latest_financial_planning.funding_sources?.length > 0) {
        //     addSubTitle('Funding Sources');
        //     apiData.latest_financial_planning.funding_sources.forEach((source: any) => {
        //       addPageIfNeeded();
        //       doc.text(`- Source: ${source.source}`, 20, finalY);
        //       finalY += 7;
        //       doc.text(`  Type: ${source.type}`, 20, finalY);
        //       finalY += 7;
        //       doc.text(`  Amount: ${source.amount}`, 20, finalY);
        //       finalY += 7;
        //       doc.text(`  Status: ${source.status}`, 20, finalY);
        //       finalY += 7;
        //       doc.text(`  Terms: ${source.terms}`, 20, finalY);
        //       finalY += 10;
        //     });
        //   }

        //   // ✅ توقعات الإيرادات
        //   if (apiData.latest_financial_planning.revenue_projections?.length > 0) {
        //     addSubTitle('Revenue Projections');
        //     apiData.latest_financial_planning.revenue_projections.forEach((revenue: any) => {
        //       addPageIfNeeded();
        //       doc.text(`- Month: ${revenue.month}`, 20, finalY);
        //       finalY += 7;
        //       doc.text(`  Amount: ${revenue.amount}`, 20, finalY);
        //       finalY += 7;
        //       doc.text('  Assumptions:', 20, finalY);
        //       finalY += 7;
        //       addListItems(revenue.assumptions || [], 30);
        //       finalY += 10;
        //     });
        //   }

        //   // ✅ توقعات المصاريف
        //   if (apiData.latest_financial_planning.expense_projections?.length > 0) {
        //     addSubTitle('Expense Projections');
        //     apiData.latest_financial_planning.expense_projections.forEach((expense: any) => {
        //       addPageIfNeeded();
        //       doc.text(`- Month: ${expense.month}`, 20, finalY);
        //       finalY += 7;
        //       doc.text(`  Fixed Expenses: ${expense.fixed_expenses}`, 20, finalY);
        //       finalY += 7;
        //       doc.text(`  Variable Expenses: ${expense.variable_expenses}`, 20, finalY);
        //       finalY += 7;
        //       doc.text('  Assumptions:', 20, finalY);
        //       finalY += 7;
        //       addListItems(expense.assumptions || [], 30);
        //       finalY += 10;
        //     });
        //   }

        //   // ✅ تحليل نقطة التعادل
        //   if (apiData.latest_financial_planning.breakeven_analysis) {
        //     addSubTitle('Breakeven Analysis');
        //     doc.text(`Break-even Point: ${apiData.latest_financial_planning.breakeven_analysis.Point}`, 20, finalY);
        //     finalY += 7;
        //     doc.text(`Timeline: ${apiData.latest_financial_planning.breakeven_analysis.Timeline}`, 20, finalY);
        //     finalY += 7;
        //     doc.text('Assumptions:', 20, finalY);
        //     finalY += 7;
        //     addListItems(apiData.latest_financial_planning.breakeven_analysis.Assumptions || [], 30);
        //     finalY += 10;
        //   }

        //   // ✅ التدفقات النقدية المتوقعة
        //   if (apiData.latest_financial_planning.cash_flow_projections?.length > 0) {
        //     addSubTitle('Cash Flow Projections');
        //     apiData.latest_financial_planning.cash_flow_projections.forEach((flow: any) => {
        //       addPageIfNeeded();
        //       doc.text(`- Month: ${flow.month}`, 20, finalY);
        //       finalY += 7;
        //       doc.text(`  Cash Inflow: ${flow.cashInflow}`, 20, finalY);
        //       finalY += 7;
        //       doc.text(`  Cash Outflow: ${flow.cashOutflow}`, 20, finalY);
        //       finalY += 7;
        //       doc.text(`  Balance: ${flow.balance}`, 20, finalY);
        //       finalY += 7;
        //       doc.text(`  Notes: ${flow.notes}`, 20, finalY);
        //       finalY += 10;
        //     });
        //   }
        // }

        // 📌 إعدادات الإطلاق الأخيرة (Latest Launch Preparation)
        // if (apiData?.latest_launch_preparation) {
        //   addSectionTitle('Latest Launch Preparation');

        //   // ✅ قائمة مراجعة الإطلاق (Launch Checklists)
        //   if (apiData.latest_launch_preparation.launch_checklists?.length > 0) {
        //     addSubTitle('Launch Checklists');
        //     apiData.latest_launch_preparation.launch_checklists.forEach((task: any) => {
        //       addPageIfNeeded();
        //       doc.text(`- Task: ${task.task}`, 20, finalY);
        //       finalY += 7;
        //       doc.text(`  Category: ${task.category}`, 20, finalY);
        //       finalY += 7;
        //       doc.text(`  Status: ${task.status}`, 20, finalY);
        //       finalY += 7;
        //       doc.text(`  Assignee: ${task.assignee}`, 20, finalY);
        //       finalY += 7;
        //       doc.text(`  Notes: ${task.notes ?? 'No Notes'}`, 20, finalY);
        //       finalY += 10;
        //     });
        //   }

        //   // ✅ الأنشطة التسويقية (Marketing Activities)
        //   if (apiData.latest_launch_preparation.marketing_activities?.length > 0) {
        //     addSubTitle('Marketing Activities');
        //     apiData.latest_launch_preparation.marketing_activities.forEach((activity: any) => {
        //       addPageIfNeeded();
        //       doc.text(`- Activity: ${activity.activity}`, 20, finalY);
        //       finalY += 7;
        //       doc.text(`  Timeline: ${activity.timeline}`, 20, finalY);
        //       finalY += 7;
        //       doc.text(`  Budget: ${activity.budget}`, 20, finalY);
        //       finalY += 7;
        //       doc.text(`  Status: ${activity.status}`, 20, finalY);
        //       finalY += 7;
        //       doc.text(`  Metrics: ${activity.metrics.join(', ')}`, 20, finalY);
        //       finalY += 10;
        //     });
        //   }

        //   // ✅ تقييم المخاطر (Risk Assessments)
        //   if (apiData.latest_launch_preparation.risk_assessments?.length > 0) {
        //     addSubTitle('Risk Assessments');
        //     apiData.latest_launch_preparation.risk_assessments.forEach((risk: any) => {
        //       addPageIfNeeded();
        //       doc.text(`- Description: ${risk.description}`, 20, finalY);
        //       finalY += 7;
        //       doc.text(`  Impact: ${risk.impact}`, 20, finalY);
        //       finalY += 7;
        //       doc.text(`  Probability: ${risk.probability}`, 20, finalY);
        //       finalY += 7;
        //       doc.text(`  Mitigation Strategies: ${risk.mitigation_strategies.join(', ')}`, 20, finalY);
        //       finalY += 7;
        //       doc.text(`  Contingency Plan: ${risk.contingency_plan}`, 20, finalY);
        //       finalY += 10;
        //     });
        //   }

        //   // ✅ المعالم الرئيسية للإطلاق (Launch Milestones)
        //   if (apiData.latest_launch_preparation.launch_milestones?.length > 0) {
        //     addSubTitle('Launch Milestones');
        //     apiData.latest_launch_preparation.launch_milestones.forEach((milestone: any) => {
        //       addPageIfNeeded();
        //       doc.text(`- Description: ${milestone.description}`, 20, finalY);
        //       finalY += 7;
        //       doc.text(`  Due Date: ${milestone.due_date ?? 'Not Set'}`, 20, finalY);
        //       finalY += 7;
        //       doc.text(`  Status: ${milestone.status}`, 20, finalY);
        //       finalY += 7;
        //       doc.text(`  Dependencies: ${milestone.dependencies.join(', ')}`, 20, finalY);
        //       finalY += 10;
        //     });
        //   }
        // }
        if (apiData?.website) {
          const website = apiData.website;
        
          addSectionTitle('Website Information');
        
          // معلومات العمل الأساسية
          if (website.business_name) {
            addSubTitle('Business Name');
            addListItems([website.business_name]);
          }
        
          if (website.business_description) {
            addSubTitle('Business Description');
            addListItems([website.business_description]);
          }
        
          if (website.colour_choice !== null && website.colour_choice !== undefined) {
            addSubTitle('Colour Choice');
            addListItems([website.colour_choice.toString()]);
          }
        
          if (website.logo_style_choice !== null && website.logo_style_choice !== undefined) {
            addSubTitle('Logo Style Choice');
            addListItems([website.logo_style_choice.toString()]);
          }
        
          if (website.about_us) {
            addSubTitle('About Us');
            addListItems([website.about_us]);
          }
        
          if (website.social_proof) {
            addSubTitle('Social Proof');
            addListItems([website.social_proof]);
          }
        
          if (website.contact_info?.length > 0) {
            addSubTitle('Contact Info');
            addListItems(website.contact_info);
          }
        
          // الخدمات
          if (website.services?.length > 0) {
            addSubTitle('Services');
            const serviceList = website.services.map(
              (s: any) => `${s.name}: ${s.description}`
            );
            addListItems(serviceList);
          }
        
          finalY += 10; // إضافة مسافة بعد نهاية القسم
        }
        

        doc.save('Business_Report.pdf');
      } catch (error) {
        console.error('Error generating PDF:', error);
        this.isLoading = false;
      } finally {
        this.isLoading = false;
      }
    },
    error: (error) => {
      console.error('Error fetching data for PDF:', error);
      this.isLoading = false;
    }
  });
}




 

  generateWord() {
    if (this.isLoading) return;
    
    this.isLoading = true;
    this.getAllData.getAllDataForPDF().subscribe({
      next: (response: any) => {
        try {
          if (!response) {
            throw new Error('No data received');
          }

          const apiData = response as ApiData;
          
          // إنشاء المستند
          const doc = new Document({
            sections: [{
              properties: {},
              children: [
                new Paragraph({
                  text: "Business Report",
                  heading: HeadingLevel.TITLE
                }),
                
                // أفكار الأعمال
                new Paragraph({
                  text: "Latest Business Ideas",
                  heading: HeadingLevel.HEADING_1,
                  spacing: { before: 400, after: 200 }
                }),
                ...(apiData?.latest_business_idea?.business_ideas?.length ? 
                  apiData.latest_business_idea.business_ideas.map(idea => 
                    new Paragraph({
                      children: [new TextRun({ text: "• " + (idea || "N/A") })]
                    })
                  ) : [new Paragraph({ text: "No business ideas available" })]),

                // إعداد الاختبار
                new Paragraph({
                  text: "Test Setup",
                  heading: HeadingLevel.HEADING_1,
                  spacing: { before: 400, after: 200 }
                }),
                new Paragraph({
                  children: [
                    new TextRun({ text: "Business Type: " + (apiData?.test_setup?.business_type || "N/A"), bold: true }),
                    new TextRun({ text: "\nTimeline: " + (apiData?.test_setup?.timeline || "N/A") }),

                    // **تصحيح عرض التكاليف**
                    new TextRun({ 
                      text: `\nSetup Costs: $${!isNaN(Number(apiData?.test_setup?.setup_costs)) 
                        ? Number(apiData.test_setup.setup_costs).toLocaleString() 
                        : "0"}`
                    })
                  ]
                }),

                // المواقع
                new Paragraph({
                  text: "Locations",
                  heading: HeadingLevel.HEADING_2,
                  spacing: { before: 300, after: 200 }
                }),
                this.createTable(
                  ["Type", "Address", "Size", "Monthly Cost"],
                  apiData?.test_setup?.locations?.length ?
                    apiData.test_setup.locations.map((loc: { type: any; address: any; size: any; monthly_cost: { toLocaleString: () => any; }; }) => 
                      [loc.type || "N/A", loc.address || "N/A", loc.size || "N/A", "$" + (loc.monthly_cost?.toLocaleString() || "0")]
                    ) : []
                ),

                // التمويل
                new Paragraph({
                  text: "Financial Planning",
                  heading: HeadingLevel.HEADING_1,
                  spacing: { before: 400, after: 200 }
                }),
                this.createTable(
                  ["Item", "Category", "Amount"],
                  apiData?.latest_financial_planning?.startup_costs?.length ?
                    apiData.latest_financial_planning.startup_costs.map((cost: { item: any; category: any; amount: any; }) => 
                      [
                        cost.item || "N/A", 
                        cost.category || "N/A", 
                        `$${!isNaN(Number(cost.amount)) 
                          ? Number(cost.amount).toLocaleString() 
                          : "0"}`
                      ]
                    ) : []
                ),
              ]
            }]
          });

          // توليد وتنزيل المستند
          Packer.toBlob(doc).then(blob => {
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'business-plan.docx';
            link.click();
            window.URL.revokeObjectURL(url);
            this.isLoading = false;
          });
        } catch (error) {
        //  console.error('Error generating Word document:', error);
          this.isLoading = false;
        }
      },
      error: (error) => {
      //  console.error('Error fetching data:', error);
        this.isLoading = false;
      }
    });
}


  private createTable(headers: string[], rows: string[][]): Table {
    return new Table({
      width: { size: 100, type: "pct" },
      rows: [
        new TableRow({
          children: headers.map(header => 
            new TableCell({
              children: [new Paragraph({ text: header || "N/A", heading: HeadingLevel.HEADING_4 })],
              borders: {
                top: { style: BorderStyle.SINGLE, size: 1 },
                bottom: { style: BorderStyle.SINGLE, size: 1 },
                left: { style: BorderStyle.SINGLE, size: 1 },
                right: { style: BorderStyle.SINGLE, size: 1 },
              }
            })
          )
        }),
        ...rows.length ? rows.map(row => 
          new TableRow({
            children: row.map(cell => 
              new TableCell({
                children: [new Paragraph(cell || "N/A")],
                borders: {
                  top: { style: BorderStyle.SINGLE, size: 1 },
                  bottom: { style: BorderStyle.SINGLE, size: 1 },
                  left: { style: BorderStyle.SINGLE, size: 1 },
                  right: { style: BorderStyle.SINGLE, size: 1 },
                }
              })
            )
          })
        ) : [new TableRow({ children: [new TableCell({ children: [new Paragraph("No data available")], borders: {} })] })]
      ]
    });
  }




  logout() {
    this.isLoading = true;
    // localStorage.removeItem('token');
    // this.router.navigate(['/login']);
    this.apisService.logout().subscribe({
      next: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('isLoggedIn');
        this.router.navigate(['/auth']);
      },
      error: (error) => {
        console.error('Error during logout:', error);
        // Continue with logout even if there's an error
       // this.router.navigate(['/auth']);
       localStorage.removeItem('token');
        this.router.navigate(['/auth']);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}