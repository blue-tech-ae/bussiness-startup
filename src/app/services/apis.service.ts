import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApisService {
  private baseUrl = 'https://businesstools-admin.valuenationapp.com/api';
  private businessIdSource = new BehaviorSubject<string>(''); // <-- هنا نخزن الـ id
  businessId$ = this.businessIdSource.asObservable(); // Observable لو احتجت تسمعه

  setBusinessId(id: string) {
    this.businessIdSource.next(id); // طريقة تحديث الـ id
    
  }
  private getHttpOptions(): { headers: HttpHeaders } {
    const token = localStorage.getItem('token');
   // console.log('Current token:', token);
     
     return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
  }
  private getHttpOptions1(): { headers: HttpHeaders } {
   
    return {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
        'Accept': 'application/json'
      
      })
    };
  }
  private getHttpOptions2(): { headers: HttpHeaders } {
    const token = localStorage.getItem('token');
  
   //const businessId = this.businessIdSource.getValue();

   const businessId=localStorage.getItem("business-id") || ""
     
     return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'business_id': businessId
      })
    };
  }
 
  getBusinessId(): string {
    return this.businessIdSource.value;
  }

  constructor(private http: HttpClient) { }

  GetVedio(title:any): Observable<any>{
    return this.http.get(
      `${this.baseUrl}/videos/search?title=${title}`, 
       
      this.getHttpOptions()
    );
  }

  saveBusinessIdea(formData: any): Observable<any> {
    // تنسيق البيانات بالشكل المطلوب
    const requestBody = {
      skills_experience: formData.skills_experience,
      passions_interests: formData.passions_interests,
      values_goals: formData.values_goals,
      business_ideas: formData.business_ideas,
      personal_notes: formData.personal_notes
    };

    return this.http.post(
      `${this.baseUrl}/business-ideas`, 
      requestBody, 
      this.getHttpOptions2()
    );
  }
  updateBusinessIdea(formData: any): Observable<any> {
   
    // تنسيق البيانات بالشكل المطلوب
    const requestBody = {
      skills_experience: formData.skills_experience,
      passions_interests: formData.passions_interests,
      values_goals: formData.values_goals,
      business_ideas: formData.business_ideas,
      personal_notes: formData.personal_notes
    };
    const id=localStorage.getItem("id_bussinesIdea")

    return this.http.put(
      `${this.baseUrl}/business-ideas/${id}`, 
      requestBody, 
      this.getHttpOptions2()
    );
  }
  getBussinessIdea(): Observable<any>{
    return this.http.get(
      `${this.baseUrl}/business-ideas`, 
       
      this.getHttpOptions2()
    );
  }
 

  saveFinancialPlanning(formData: any): Observable<any> {
   
    const requestBody = {
      startup_costs: formData?.startup_costs || [],
      funding_sources: formData?.funding_sources || [],
      revenue_projections: formData?.revenue_projections || [],
      expense_projections: formData?.expense_projections || [],
      breakeven_analysis: formData?.breakeven_analysis || { Point: 0, Timeline: "Unknown", Assumptions: [] },
      cash_flow_projections: formData?.cash_flow_projections || []
  };

    return this.http.post(
      `${this.baseUrl}/financial-planning`, 
      requestBody, 
      this.getHttpOptions()
    ); 
  }
  updateFinancialPlanning(formData: any): Observable<any> {
    // تنسيق البيانات بالشكل المطلوب
   
    const requestBody = {
      startup_costs: formData?.startup_costs || [],
      funding_sources: formData?.funding_sources || [],
      revenue_projections: formData?.revenue_projections || [],
      expense_projections: formData?.expense_projections || [],
      breakeven_analysis: formData?.breakeven_analysis || { Point: 0, Timeline: "Unknown", Assumptions: [] },
      cash_flow_projections: formData?.cash_flow_projections || []
  };
const idfan=localStorage.getItem("idfan")
    return this.http.put(
      `${this.baseUrl}/financial-planning/${idfan}`, 
      requestBody, 
      this.getHttpOptions()
    );
  }
  getFinancialPlanning(): Observable<any>{
    return this.http.get(
      `${this.baseUrl}/financial-planning`, 
       
      this.getHttpOptions()
    );
  }

 

//   saveMarketResearch(formData: any): Observable<any> {
//     // تنسيق البيانات بالشكل المطلوب للـ API  Number(formData.age)
//    const requestBody = {
//       target_customer_name: formData.name,
//       age:  formData.age,
//       gender: formData.gender,
//       income: formData.income,
//       education: formData.education,
//       employment: formData.employment,
//       other: formData.other,
//       must_have_solutions: formData.must_have_solutions,
//       should_have_solutions: formData.should_have_solutions,
//       nice_to_have_solutions: formData.nice_to_have_solutions,
//       nots: formData.nots,
//       solution: formData.solution,
//       problem: formData.problem,
//       help_persona: formData.help_persona
//     };
   
    
// console.log(requestBody + "from service")
//     return this.http.post(
//       `${this.baseUrl}/market-researches`, 
//       requestBody, 
//       this.getHttpOptions2()
//     );
//   }
saveMarketResearch(formData: any): Observable<any> {
  const requestBody: any = {
    target_customer_name: formData.target_customer_name, // 👈 بدل formData.name (اسم الحقل الصحيح)
    age: formData.age ,  // 👈 تمام
    gender: formData.gender ,
    other: formData.other ,
    employment: formData.employment,
    income: formData.income,
    education: "",
    must_have_solutions: formData.must_have_solutions,
    should_have_solutions: formData.should_have_solutions,
    nice_to_have_solutions: formData.nice_to_have_solutions,
    nots: formData.nots,
    solution: formData.solution,
    problem: formData.problem,
    help_persona: formData.help_persona,
  };

  //console.log("Request Body to be sent: ", requestBody); // ✅ طباعة قبل الإرسال

  // إرسال الطلب إلى السيرفر
  return this.http.post(
    `${this.baseUrl}/market-researches`, 
    requestBody, 
    this.getHttpOptions2()
  );
}


  
  updateMarketResearch(formData: any): Observable<any> {
    // تنسيق البيانات بالشكل المطلوب للـ API
    const requestBody: any = {
      target_customer_name: formData.target_customer_name, // 👈 بدل formData.name (اسم الحقل الصحيح)
      age: formData.age ,  // 👈 تمام
      gender: formData.gender ,
      other: formData.other ,
      employment: formData.employment,
      income: formData.income,
      education: "",
      must_have_solutions: formData.must_have_solutions,
      should_have_solutions: formData.should_have_solutions,
      nice_to_have_solutions: formData.nice_to_have_solutions,
      nots: formData.nots,
      solution: formData.solution,
      problem: formData.problem,
      help_persona: formData.help_persona,
    };
const id=localStorage.getItem("idmreaserch")
    return this.http.put(
      `${this.baseUrl}/market-researches/${id}`, 
      requestBody, 
      this.getHttpOptions2()
    );
  }
  getMarketResearch(): Observable<any>{
    return this.http.get(
      `${this.baseUrl}/market-researches`, 
       
      this.getHttpOptions2()
    );
  }

  // saveMarketing(formData: any): Observable<any> {
  
  //   const requestBody = {
  //     audience_description: formData.TargetMarket.audienceDescription ,
  //     problem_statement: formData.TargetMarket.problemStatement ,
  //     solution_overview: formData.TargetMarket.solutionOverview ,
  //     marketing_channels: (formData.MarketingChannels || []).map((channel: any) => ({
  //       name: channel?.name || '',
  //       strategy: channel?.strategy || '',
  //       budget: Number(channel?.budget) || 0,
  //       expected_roi: channel?.expectedROI || ''
  //     })),
  //     content_strategies: (formData.ContentStrategy || []).map((content: any) => ({
  //       type: content?.type || '',
  //       description: content?.description || '',
  //       frequency: content?.frequency || '',
  //       responsible_person: content?.responsiblePerson || ''
  //     })),
  //     brand_identity: {
  //       values: formData.BrandIdentity.Values || [],
  //       mission: formData.BrandIdentity.Mission || '',
  //       vision: formData.BrandIdentity.Vision || '',
  //       tone: formData.BrandIdentity.Tone || '',
  //       visual_style: formData.BrandIdentity.VisualStyle || ''
  //     }
  //   };

  //   return this.http.post(
  //     `${this.baseUrl}/marketing`,
  //     requestBody,
  //     this.getHttpOptions()
  //   );
  // }
  saveMarketing(formData: any): Observable<any> {
    const requestBody: any = {
      audience_description: formData.TargetMarket?.audienceDescription?.trim() || '',
      problem_statement: formData.TargetMarket?.problemStatement?.trim() || '',
      solution_overview: formData.TargetMarket?.solutionOverview?.trim() || '',
  
      marketing_channels: (formData.MarketingChannels || [])
        .map((channel: { name: string; strategy: string; budget: any; expectedROI: string; }) => ({
          name: channel.name?.trim() || '',  // إرسال نص فارغ بدلًا من null
          strategy: channel.strategy?.trim() || '',
          budget: isNaN(Number(channel.budget)) ? 0 : Number(channel.budget), // التأكد من أن الميزانية رقم صحيح
          expected_roi: channel.expectedROI?.trim() || ''
        }))
        .filter((channel: { name: any; strategy: any; budget: number; expected_roi: any; }) => channel.name || channel.strategy || channel.budget > 0 || channel.expected_roi),
  
      content_strategies: (formData.ContentStrategy || [])
        .map((content: { type: string; description: string; frequency: string; responsiblePerson: string; }) => ({
          type: content.type?.trim() || '',
          description: content.description?.trim() || '',
          frequency: content.frequency?.trim() || '',
          responsible_person: content.responsiblePerson?.trim() || ''
        }))
        .filter((content: { type: any; description: any; frequency: any; responsible_person: any; }) => content.type || content.description || content.frequency || content.responsible_person),
  
      brand_identity: {
        values: Array.isArray(formData.BrandIdentity?.Values)
          ? formData.BrandIdentity.Values.filter((value: string) => value.trim()) // تصفية القيم الفارغة
          : [],
        mission: formData.BrandIdentity?.Mission?.trim() || '',
        vision: formData.BrandIdentity?.Vision?.trim() || '',
        tone: formData.BrandIdentity?.Tone?.trim() || '',
        visual_style: formData.BrandIdentity?.VisualStyle?.trim() || ''
      }
    };
  
    //console.log("📤 Data being sent:", JSON.stringify(requestBody, null, 2));
  
    return this.http.post(
      `${this.baseUrl}/marketing`,
      requestBody,
      this.getHttpOptions()
    );
  }
  
  
  
  updateMarketing(formData: any): Observable<any> {
    // تنسيق البيانات بالشكل المطلوب للـ API
   
    const requestBody = {
      audience_description: formData.TargetMarket.audienceDescription ,
      problem_statement: formData.TargetMarket.problemStatement ,
      solution_overview: formData.TargetMarket.solutionOverview ,
      marketing_channels: (formData.MarketingChannels || []).map((channel: any) => ({
        name: channel?.name || '',
        strategy: channel?.strategy || '',
        budget: Number(channel?.budget) || 0,
        expected_roi: channel?.expectedROI || ''
      })),
      content_strategies: (formData.ContentStrategy || []).map((content: any) => ({
        type: content?.type || '',
        description: content?.description || '',
        frequency: content?.frequency || '',
        responsible_person: content?.responsiblePerson || ''
      })),
      brand_identity: {
        values: formData.BrandIdentity.Values || [],
        mission: formData.BrandIdentity.Mission || '',
        vision: formData.BrandIdentity.Vision || '',
        tone: formData.BrandIdentity.Tone || '',
        visual_style: formData.BrandIdentity.VisualStyle || ''
      }
    };
const id = localStorage.getItem("idmarket")
    return this.http.put(
      `${this.baseUrl}/marketing/${id}`,
      requestBody,
      this.getHttpOptions()
    );
  }
  getMarketing(): Observable<any>{
    return this.http.get(
      `${this.baseUrl}/marketing`, 
       
      this.getHttpOptions()
    );
  }


  saveMvpDevelopment(formData: any): Observable<any> {
    // تنسيق البيانات بالشكل المطلوب للـ API
    // const requestBody = {
    //   features: {
    //     must_have_features: formData.Features.MustHaveFeatures.filter((f: string) => f.trim()),
    //     should_have_features: formData.Features.ShouldHaveFeatures.filter((f: string) => f.trim()),
    //     nice_to_have_features: formData.Features.NiceToHaveFeatures.filter((f: string) => f.trim())
    //   },
    //   assumptions: formData.Assumptions.filter((a: any) => 
    //     a.description.trim() || a.testMethod.trim() || a.successCriteria.trim()
    //   ).map((a: any) => ({
    //     description: a.description,
    //     test_method: a.testMethod,
    //     success_criteria: a.successCriteria
    //   })),
    //   timelines: formData.Timeline.filter((t: any) => 
    //     t.name.trim() || t.duration.trim() || t.milestones.some((m: string) => m.trim())
    //   ).map((t: any) => ({
    //     name: t.name,
    //     duration: t.duration,
    //     milestones: t.milestones.filter((m: string) => m.trim())
    //   })),
    //   metrics: formData.Metrics.filter((m: any) => 
    //     m.name.trim() || m.targetValue > 0 || m.actualValue > 0
    //   ).map((m: any) => ({
    //     name: m.name,
    //     target_value: Number(m.targetValue),
    //     actual_value: Number(m.actualValue)
    //   }))
    // };
    const requestBody = {
      features: {
        must_have_features: (formData.Features?.MustHaveFeatures || []).filter((f: string) => f?.trim()) || [],
        should_have_features: (formData.Features?.ShouldHaveFeatures || []).filter((f: string) => f?.trim()) || [],
        nice_to_have_features: (formData.Features?.NiceToHaveFeatures || []).filter((f: string) => f?.trim()) || [],
        metrics: (formData.Features?.Metrics || [])
          .filter((m: any) => m?.name?.trim() || m?.targetValue > 0 || m?.actualValue > 0)
          .map((m: any) => ({
            name: m?.name?.trim() || '',
            target_value: Number(m?.targetValue) || 0,
            actual_value: Number(m?.actualValue) || 0
          }))
      },
      assumptions: (formData.Assumptions || [])
        .filter((a: any) => a?.description?.trim() || a?.testMethod?.trim() || a?.successCriteria?.trim())
        .map((a: any) => ({
          description: a?.description?.trim() || '',
          test_method: a?.testMethod?.trim() || '',
          success_criteria: a?.successCriteria?.trim() || '',
          metrics: (a?.Metrics || [])
            .filter((m: any) => m?.name?.trim() || m?.targetValue > 0 || m?.actualValue > 0)
            .map((m: any) => ({
              name: m?.name?.trim() || '',
              target_value: Number(m?.targetValue) || 0,
              actual_value: Number(m?.actualValue) || 0
            }))
        })),
      timelines: (formData.Timeline || [])
        .filter((t: any) => t?.name?.trim() || t?.duration?.trim() || (t?.milestones || []).some((m: string) => m?.trim()))
        .map((t: any) => ({
          name: t?.name?.trim() || '',
          duration: t?.duration?.trim() || '',
          milestones: (t?.milestones || []).filter((m: string) => m?.trim()) || [],
          metrics: (t?.Metrics || [])
            .filter((m: any) => m?.name?.trim() || m?.targetValue > 0 || m?.actualValue > 0)
            .map((m: any) => ({
              name: m?.name?.trim() || '',
              target_value: Number(m?.targetValue) || 0,
              actual_value: Number(m?.actualValue) || 0
            }))
        }))
    };

    return this.http.post(
      `${this.baseUrl}/mvp-development`,
      requestBody,
      this.getHttpOptions()
    );
  }
  updateMvpDevelopment(formData: any): Observable<any> {
    // تنسيق البيانات بالشكل المطلوب للـ API
    // const requestBody = {
    //   features: {
    //     must_have_features: formData.Features.MustHaveFeatures.filter((f: string) => f.trim()),
    //     should_have_features: formData.Features.ShouldHaveFeatures.filter((f: string) => f.trim()),
    //     nice_to_have_features: formData.Features.NiceToHaveFeatures.filter((f: string) => f.trim())
    //   },
    //   assumptions: formData.Assumptions.filter((a: any) => 
    //     a.description.trim() || a.testMethod.trim() || a.successCriteria.trim()
    //   ).map((a: any) => ({
    //     description: a.description,
    //     test_method: a.testMethod,
    //     success_criteria: a.successCriteria
    //   })),
    //   timelines: formData.Timeline.filter((t: any) => 
    //     t.name.trim() || t.duration.trim() || t.milestones.some((m: string) => m.trim())
    //   ).map((t: any) => ({
    //     name: t.name,
    //     duration: t.duration,
    //     milestones: t.milestones.filter((m: string) => m.trim())
    //   })),
    //   metrics: formData.Metrics.filter((m: any) => 
    //     m.name.trim() || m.targetValue > 0 || m.actualValue > 0
    //   ).map((m: any) => ({
    //     name: m.name,
    //     target_value: Number(m.targetValue),
    //     actual_value: Number(m.actualValue)
    //   }))
    // };
    const requestBody = {
      features: {
        must_have_features: (formData.Features?.MustHaveFeatures || []).filter((f: string) => f?.trim()) || [],
        should_have_features: (formData.Features?.ShouldHaveFeatures || []).filter((f: string) => f?.trim()) || [],
        nice_to_have_features: (formData.Features?.NiceToHaveFeatures || []).filter((f: string) => f?.trim()) || [],
        metrics: (formData.Features?.Metrics || [])
          .filter((m: any) => m?.name?.trim() || m?.targetValue > 0 || m?.actualValue > 0)
          .map((m: any) => ({
            name: m?.name?.trim() || '',
            target_value: Number(m?.targetValue) || 0,
            actual_value: Number(m?.actualValue) || 0
          }))
      },
      assumptions: (formData.Assumptions || [])
        .filter((a: any) => a?.description?.trim() || a?.testMethod?.trim() || a?.successCriteria?.trim())
        .map((a: any) => ({
          description: a?.description?.trim() || '',
          test_method: a?.testMethod?.trim() || '',
          success_criteria: a?.successCriteria?.trim() || '',
          metrics: (a?.Metrics || [])
            .filter((m: any) => m?.name?.trim() || m?.targetValue > 0 || m?.actualValue > 0)
            .map((m: any) => ({
              name: m?.name?.trim() || '',
              target_value: Number(m?.targetValue) || 0,
              actual_value: Number(m?.actualValue) || 0
            }))
        })),
      timelines: (formData.Timeline || [])
        .filter((t: any) => t?.name?.trim() || t?.duration?.trim() || (t?.milestones || []).some((m: string) => m?.trim()))
        .map((t: any) => ({
          name: t?.name?.trim() || '',
          duration: t?.duration?.trim() || '',
          milestones: (t?.milestones || []).filter((m: string) => m?.trim()) || [],
          metrics: (t?.Metrics || [])
            .filter((m: any) => m?.name?.trim() || m?.targetValue > 0 || m?.actualValue > 0)
            .map((m: any) => ({
              name: m?.name?.trim() || '',
              target_value: Number(m?.targetValue) || 0,
              actual_value: Number(m?.actualValue) || 0
            }))
        }))
    };

const id= localStorage.getItem("idmvp")
    return this.http.put(
      `${this.baseUrl}/mvp-development/${id}`,
      requestBody,
      this.getHttpOptions()
    );
  }
  getMvpDevelpoment(): Observable<any>{
    return this.http.get(
      `${this.baseUrl}/mvp-development`, 
       
      this.getHttpOptions()
    );
  }

  saveSalesStrategy(formData: any): Observable<any> {
    // تنسيق البيانات بالشكل المطلوب للـ API
    const requestBody = {
      sales_channels: formData.SalesChannels
        ?.filter((channel: any) => 
          channel.name?.trim() || 
          channel.description?.trim() || 
          Number(channel.targetRevenue) > 0 || 
          channel.commissionStructure?.trim()
        )
        .map((channel: any) => ({
          name: channel.name,
          description: channel.description,
          target_revenue: Number(channel.targetRevenue), // متغير الأسماء
          commission_structure: channel.commissionStructure
        })) || [],
  
      pricing_tiers: formData.PricingTiers
        ?.filter((tier: any) => 
          tier.name?.trim() || 
          Number(tier.price) > 0 || 
          tier.features?.some((f: string) => f?.trim()) || 
          tier.targetCustomer?.trim()
        )
        .map((tier: any) => ({
          name: tier.name,
          price: Number(tier.price),
          features: tier.features?.filter((f: string) => f?.trim()) || [],
          target_customer: tier.targetCustomer
        })) || [],
  
      sales_processes: formData.SalesProcess
        ?.filter((process: any) => 
          process.stage?.trim() || 
          process.activities?.trim() || 
          process.duration?.trim() || 
          process.responsiblePerson?.trim()
        )
        .map((process: any) => ({
          stage: process.stage,
          activities: process.activities,
          duration: process.duration,
          responsible_person: process.responsiblePerson
        })) || [],
  
      sales_teams: formData.SalesTeam
        ?.filter((member: any) => 
          member.role?.trim() || 
          member.responsibilities?.trim() || 
          member.requiredSkills?.trim() || 
          member.targetMetrics?.trim()
        )
        .map((member: any) => ({ 
          role: member.role,
          responsibilities: member.responsibilities,
          required_skills: member.requiredSkills,
          target_metrics: member.targetMetrics
        })) || []
    };
console.log("from apis" + requestBody)
    return this.http.post(
      `${this.baseUrl}/sales-strategies`,
      requestBody,
      this.getHttpOptions()
    );
  }
  
  updateSalesStrategy(formData: any): Observable<any> {
    const requestBody = {
      sales_channels: formData.SalesChannels
        ?.filter((channel: any) => 
          channel.name?.trim() || 
          channel.description?.trim() || 
          Number(channel.targetRevenue) > 0 || 
          channel.commissionStructure?.trim()
        )
        .map((channel: any) => ({
          name: channel.name,
          description: channel.description,
          target_revenue: Number(channel.targetRevenue), // متغير الأسماء
          commission_structure: channel.commissionStructure
        })) || [],
  
      pricing_tiers: formData.PricingTiers
        ?.filter((tier: any) => 
          tier.name?.trim() || 
          Number(tier.price) > 0 || 
          tier.features?.some((f: string) => f?.trim()) || 
          tier.targetCustomer?.trim()
        )
        .map((tier: any) => ({
          name: tier.name,
          price: Number(tier.price),
          features: tier.features?.filter((f: string) => f?.trim()) || [],
          target_customer: tier.targetCustomer
        })) || [],
  
      sales_processes: formData.SalesProcess
        ?.filter((process: any) => 
          process.stage?.trim() || 
          process.activities?.trim() || 
          process.duration?.trim() || 
          process.responsiblePerson?.trim()
        )
        .map((process: any) => ({
          stage: process.stage,
          activities: process.activities,
          duration: process.duration,
          responsible_person: process.responsiblePerson
        })) || [],
  
      sales_teams: formData.SalesTeam
        ?.filter((member: any) => 
          member.role?.trim() || 
          member.responsibilities?.trim() || 
          member.requiredSkills?.trim() || 
          member.targetMetrics?.trim()
        )
        .map((member: any) => ({ 
          role: member.role,
          responsibilities: member.responsibilities,
          required_skills: member.requiredSkills,
          target_metrics: member.targetMetrics
        })) || []
    };
  const id= localStorage.getItem("id_strategy")
   // const id = localStorage.getItem("idstrategy");
    //console.log(requestBody)
    return this.http.put(
      `${this.baseUrl}/sales-strategies/${id}`,
      requestBody,
      this.getHttpOptions()
    );
  }
  

  getSalesStrategy(): Observable<any>{
    
    return this.http.get(
      `${this.baseUrl}/sales-strategies`, 
       
      this.getHttpOptions()
    );
  }
  saveBusinessSetup(formData: any): Observable<any> {
    const requestBody = {
      legal_structure: {
          business_type: formData?.LegalStructure?.BusinessType || "",
          requirements: formData?.LegalStructure?.Requirements || [],
          timeline: formData?.LegalStructure?.Timeline || "",
          setup_costs: Number(formData?.LegalStructure?.SetupCosts) || 0
      },
      licenses_and_permits: (formData?.LicensesAndPermits || []).map((license: any) => ({
          name: license?.name || "N/A",
          requirements: license?.requirements || [],
          status: license?.status || "Pending",
          deadline: license?.deadline || ""
      })),
      locations: (formData?.Locations || []).map((location: any) => ({
          type: location?.type || "Unknown",
          address: location?.address || "No Address",
          size: Number(location?.size) || 0,
          monthly_cost: Number(location?.monthlyCost) || 0
      })),
      insurance: (formData?.Insurance || []).map((insurance: any) => ({
          type: insurance?.type || "Unknown",
          provider: insurance?.provider || "No Provider",
          coverage: insurance?.coverage || "No Coverage",
          annual_cost: Number(insurance?.annualCost) || 0
      }))
  };

    return this.http.post(
        `${this.baseUrl}/business-setups`,
        requestBody,
        this.getHttpOptions()
    );
}

  // updateBusinessSetup(formData: any): Observable<any> {
  //   // استرجاع id من localStorage
  //   const id = localStorage.getItem("idsetup");
  
   
  
  //   // تجهيز البيانات قبل الإرسال
  //   const requestBody = {
  //     legal_structure: {
  //         business_type: formData.LegalStructure.BusinessType,
  //         requirements: formData.LegalStructure.Requirements,
  //         timeline: formData.LegalStructure.Timeline,
  //         setup_costs: Number(formData.LegalStructure.SetupCosts)
  //     },
  //     licenses_and_permits: formData.LicensesAndPermits.map((license: any) => ({
  //         name: license.name,
  //         requirements: license.requirements,
  //         status: license.status,
  //         deadline: license.deadline
  //     })),
  //     locations: formData.Locations.map((location: any) => ({
  //         type: location.type,
  //         address: location.address,
  //         size: Number(location.size),
  //         monthly_cost: Number(location.monthlyCost)
  //     })),
  //     insurance: formData.Insurance.map((insurance: any) => ({
  //         type: insurance.type,
  //         provider: insurance.provider,
  //         coverage: insurance.coverage,
  //         annual_cost: Number(insurance.annualCost)
  //     }))
  // };
  
  //   // طباعة البيانات المرسلة لفحصها
  //   console.log("🚀 Request Body:", requestBody);
  
  //   // إرسال الطلب للخادم
  //   return this.http.put(
  //     `${this.baseUrl}/business-setups/${id}`,
  //     requestBody,
  //     this.getHttpOptions()
  //   )
  // }
  updateBusinessSetup(formData: any): Observable<any> {
    const id = localStorage.getItem("idsetup");

    const requestBody = {
        legal_structure: {
            business_type: formData?.LegalStructure?.BusinessType || "",
            requirements: formData?.LegalStructure?.Requirements || [],
            timeline: formData?.LegalStructure?.Timeline || "",
            setup_costs: Number(formData?.LegalStructure?.SetupCosts) || 0
        },
        licenses_and_permits: (formData?.LicensesAndPermits || []).map((license: any) => ({
            name: license?.name || "N/A",
            requirements: license?.requirements || [],
            status: license?.status || "Pending",
            deadline: license?.deadline || ""
        })),
        locations: (formData?.Locations || []).map((location: any) => ({
            type: location?.type || "Unknown",
            address: location?.address || "No Address",
            size: Number(location?.size) || 0,
            monthly_cost: Number(location?.monthlyCost) || 0
        })),
        insurance: (formData?.Insurance || []).map((insurance: any) => ({
            type: insurance?.type || "Unknown",
            provider: insurance?.provider || "No Provider",
            coverage: insurance?.coverage || "No Coverage",
            annual_cost: Number(insurance?.annualCost) || 0
        }))
    };

    console.log("🚀 Request Body:", requestBody);

    return this.http.put(
        `${this.baseUrl}/business-setups/${id}`,
        requestBody,
        this.getHttpOptions()
    );
}

  

  getbusinesssetups(): Observable<any>{
    return this.http.get(
      `${this.baseUrl}/business-setups`, 
       
      this.getHttpOptions()
    );
  }


  saveLaunchPreparation(formData: any): Observable<any> {
    // تنسيق البيانات بالشكل المطلوب للـ API
    // const requestBody = {
    //   launch_checklists: formData.LaunchChecklist.filter((task: any) => 
    //     task.category.trim() || 
    //     task.task.trim() || 
    //     task.assignee.trim() || 
    //     task.notes.trim()
    //   ).map((task: any) => ({
    //     category: task.category,
    //     task: task.task,
    //     due_date: task.dueDate,
    //     status: task.status,
    //     assignee: task.assignee,
    //     notes: task.notes
    //   })),
    //   marketing_activities: formData.MarketingActivities.filter((activity: any) => 
    //     activity.activity.trim() || 
    //     activity.timeline.trim() || 
    //     activity.budget > 0 || 
    //     activity.metrics.some((m: string) => m.trim())
    //   ).map((activity: any) => ({
    //     activity: activity.activity,
    //     timeline: activity.timeline,
    //     budget: Number(activity.budget),
    //     status: activity.status,
    //     metrics: activity.metrics.filter((m: string) => m.trim())
    //   })),
    //   risk_assessments: formData.RiskAssessment.filter((risk: any) => 
    //     risk.description.trim() || 
    //     risk.mitigationStrategies.some((s: string) => s.trim()) ||
    //     risk.contingencyPlan.trim()
    //   ).map((risk: any) => ({
    //     description: risk.description,
    //     impact: risk.impact,
    //     probability: risk.probability,
    //     mitigation_strategies: risk.mitigationStrategies.filter((s: string) => s.trim()),
    //     contingency_plan: risk.contingencyPlan
    //   })),
    //   launch_milestones: formData.LaunchMilestones.filter((milestone: any) => 
    //     milestone.description.trim() || 
    //     milestone.dueDate || 
    //     milestone.dependencies.some((d: string) => d.trim())
    //   ).map((milestone: any) => ({
    //     description: milestone.description,
    //     due_date: milestone.dueDate,
    //     status: milestone.status,
    //     dependencies: milestone.dependencies.filter((d: string) => d.trim())
    //   }))
    // };
    const requestBody = {
      launch_checklists: (formData.LaunchChecklist || []).map((task: any) => ({
        category: task?.category?.trim() || "Uncategorized",
        task: task?.task?.trim() || "Untitled",
        due_date: task?.due_date || "",
        status: task?.status || "Pending",
        assignee: task?.assignee?.trim() || "Unknown",
        notes: task?.notes?.trim() || ""
      })),
    
      marketing_activities: (formData.MarketingActivities || []).map((activity: any) => ({
        activity: activity?.activity?.trim() || "Unnamed Activity",
        timeline: activity?.timeline?.trim() || "Unknown",
        budget: Number(activity?.budget) || 0,
        status: activity?.status || "Pending",
        metrics: (activity?.metrics || []).filter((m: string) => m?.trim() || "")
      })),
    
      risk_assessments: (formData.RiskAssessment || []).map((risk: any) => ({
        description: risk?.description?.trim() || "No description",
        impact: risk?.impact || "Unknown",
        probability: risk?.probability || "Unknown",
        mitigation_strategies: (risk?.mitigation_strategies || []).filter((s: string) => s?.trim() || ""),
        contingency_plan: risk?.contingency_plan?.trim() || "No contingency plan"
      })),
    
      launch_milestones: (formData.LaunchMilestones || []).map((milestone: any) => ({
        description: milestone?.description?.trim() || "No description",
        due_date: milestone?.due_date || "",
        status: milestone?.status || "Pending",
        dependencies: (milestone?.dependencies || []).filter((d: string) => d?.trim() || "")
      }))
    };
    return this.http.post(
      `${this.baseUrl}/launch-preparations`,
      requestBody,
      this.getHttpOptions2()
    );
  }
  updateLaunchPreparation(formData: any): Observable<any> {
    // تنسيق البيانات بالشكل المطلوب للـ API
    const requestBody = {
      launch_checklists: (formData.LaunchChecklist || []).map((task: any) => ({
        category: task?.category?.trim() || "Uncategorized",
        task: task?.task?.trim() || "Untitled",
        due_date: task?.due_date || "",
        status: task?.status || "Pending",
        assignee: task?.assignee?.trim() || "Unknown",
        notes: task?.notes?.trim() || ""
      })),
    
      marketing_activities: (formData.MarketingActivities || []).map((activity: any) => ({
        activity: activity?.activity?.trim() || "Unnamed Activity",
        timeline: activity?.timeline?.trim() || "Unknown",
        budget: Number(activity?.budget) || 0,
        status: activity?.status || "Pending",
        metrics: (activity?.metrics || []).filter((m: string) => m?.trim() || "")
      })),
    
      risk_assessments: (formData.RiskAssessment || []).map((risk: any) => ({
        description: risk?.description?.trim() || "No description",
        impact: risk?.impact || "Unknown",
        probability: risk?.probability || "Unknown",
        mitigation_strategies: (risk?.mitigation_strategies || []).filter((s: string) => s?.trim() || ""),
        contingency_plan: risk?.contingency_plan?.trim() || "No contingency plan"
      })),
    
      launch_milestones: (formData.LaunchMilestones || []).map((milestone: any) => ({
        description: milestone?.description?.trim() || "No description",
        due_date: milestone?.due_date || "",
        status: milestone?.status || "Pending",
        dependencies: (milestone?.dependencies || []).filter((d: string) => d?.trim() || "")
      }))
    };
    
 
const id= localStorage.getItem("idlaunch")
    return this.http.put(
      `${this.baseUrl}/launch-preparations/${id}`,
      requestBody,
      this.getHttpOptions2()
    );
  }
  getlaunchpreparation(): Observable<any>{
    return this.http.get(
      `${this.baseUrl}/launch-preparations`,

      this.getHttpOptions2()
    );
  }
  // إضافة دالة تسجيل الدخول
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/login`,
      credentials,
      this.getHttpOptions()
    )
    // .pipe(
    //   tap((response: any) => {
    //     // حفظ التوكن في localStorage إذا تم إرجاعه من الباك إند
    //    console.log(response.access_token
    //    )
    //     if (response.access_token) {
    //       localStorage.setItem('token', response.access_token);

    //     }
    //   })
    // );
  }

  // إضافة دالة إنشاء حساب جديد
  register(userData: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  }): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/register`,
      userData,
      this.getHttpOptions1()
    )
    // .pipe(
    //   tap((response: any) => {
    //     // حفظ التوكن في localStorage إذا تم إرجاعه من الباك إند
    //     if (response.access_token) {
    //       localStorage.setItem('token', response.access_token);
    //       console.log(response.access_token
    //       )
    //     }
    //   })
    // );
  }

 
 
  logout(): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/logout`,
      {},
      this.getHttpOptions() // استخدام الدالة لجلب التوكن بدلاً من httpOptions الثابت
    )
    // .pipe(
    //   tap(() => {
    //     // حذف التوكن من localStorage بعد نجاح تسجيل الخروج
    //     localStorage.removeItem('token');
    //   })
    // );
  }

  resetPassword(formbody:any): Observable<any> {
  
   
    return this.http.post(
      `${this.baseUrl}/password/email`,
    formbody,
    this.getHttpOptions1())
  }
  getbusinnes(): Observable<any>{
    return this.http.get(
      `${this.baseUrl}/businesses`, 
       
      this.getHttpOptions()
    );
  }
  addbusinnes(data:any): Observable<any>{
    return this.http.post(
      `${this.baseUrl}/businesses`, data,
       
      this.getHttpOptions()
    );
  }
  updatebusinnes(data:any,id:number): Observable<any>{
    return this.http.put(
      `${this.baseUrl}/businesses/${id}`, data,
       
      this.getHttpOptions()
    );
  }
  deletebusinnes(id:number): Observable<any>{
    return this.http.delete(
      `${this.baseUrl}/businesses/${id}`, 
       
      this.getHttpOptions()
    );
  }
  saveTestIdea(data:any): Observable<any>{
    return this.http.post(
      `${this.baseUrl}/testing-ideas`, data,
       
      this.getHttpOptions2()
    );
  }
  updateTestIdea(data:any): Observable<any>{
    const id=localStorage.getItem("testideaid")
    return this.http.put(
      `${this.baseUrl}/testing-ideas/${id}`, data,
       
      this.getHttpOptions2()
    );
  }

  getTestIdea(): Observable<any>{
    return this.http.get(
      `${this.baseUrl}/testing-ideas`,
       
      this.getHttpOptions2()
    );
  }

  saveStartSample(data:any):Observable<any>{
    return this.http.post(
      `${this.baseUrl}/simple-solutions`, data,
       
      this.getHttpOptions2()
    );
  }

  updateStartSample(data:any):Observable<any>{

    const id=localStorage.getItem("mvpid")
    return this.http.put(
      `${this.baseUrl}/simple-solutions/${id}`,data,
       
      this.getHttpOptions2()
    );
  }

  getStartSample(): Observable<any>{
    return this.http.get(
      `${this.baseUrl}/simple-solutions`,
       
      this.getHttpOptions2()
    );
  }
  saveNewmarketing(data:any):Observable<any>{
    return this.http.post(
      `${this.baseUrl}/marketing-new`, data,
       
      this.getHttpOptions2()
    );
  }
  updateNewmarketing(data:any):Observable<any>{

    const id=localStorage.getItem("marid")
    return this.http.put(
      `${this.baseUrl}/marketing-new/${id}`,data,
       
      this.getHttpOptions2()
    );
  }
  getNewmarketing(): Observable<any>{
    return this.http.get(
      `${this.baseUrl}/marketing-new`,
       
      this.getHttpOptions2()
    );
  }
  saveNewSales(data:any):Observable<any>{
    return this.http.post(
      `${this.baseUrl}/sales-conversion-notes`, data,
       
      this.getHttpOptions2()
    );
  }
  updateNewSales(data:any):Observable<any>{

    const id=localStorage.getItem("slsid")
    return this.http.put(
      `${this.baseUrl}/sales-conversion-notes/${id}`,data,
       
      this.getHttpOptions2()
    );
  }
  getNewSales(): Observable<any>{
    return this.http.get(
      `${this.baseUrl}/sales-conversion-notes`,
       
      this.getHttpOptions2()
    );
  }
  saveNewbusines(data:any):Observable<any>{
    return this.http.post(
      `${this.baseUrl}/businesses`, data,
       
      this.getHttpOptions()
    );
  }
  updatenewbusiness(data:any):Observable<any>{

    const id=localStorage.getItem("bid")
    return this.http.put(
      `${this.baseUrl}/businesses/${id}`,data,
        
      this.getHttpOptions()
    );
  }
  getbussinesform(): Observable<any>{
    return this.http.get(
      `${this.baseUrl}/businesses`,
       
      this.getHttpOptions()
    );
  }
  saveNewsetup(data:any):Observable<any>{
    return this.http.post(
      `${this.baseUrl}/business-setups`, data,
       
      this.getHttpOptions2()
    );
  }
  updateNewSetup(data:any):Observable<any>{

    const id=localStorage.getItem("idsetup")
    return this.http.put(
      `${this.baseUrl}/business-setups/${id}`,data,
       
      this.getHttpOptions2()
    );
  }
  getNewSetup(): Observable<any>{
    return this.http.get(
      `${this.baseUrl}/business-setups`,
       
      this.getHttpOptions2()
    );
  }

  saveNewfinnancial(data:any):Observable<any>{
    return this.http.post(
      `${this.baseUrl}/financial-planner`, data,
       
      this.getHttpOptions2()
    );
  }
  updatenewfinnancial(data:any):Observable<any>{

    const id=localStorage.getItem("idfann")
    return this.http.put(
      `${this.baseUrl}/financial-planner/${id}`,data,
        
      this.getHttpOptions2()
    );
  }
  getfinnancial(): Observable<any>{
    return this.http.get(
      `${this.baseUrl}/financial-planner`,
       
      this.getHttpOptions2()
    );
  }

  savewebsite(data:any):Observable<any>{
    return this.http.post(
      `${this.baseUrl}/websites`, data,
       
      this.getHttpOptions2()
    );
  }
  updatewebsite(data:any):Observable<any>{

    const id=localStorage.getItem("idweb")
    return this.http.put(
      `${this.baseUrl}/websites/${id}`,data,
        
      this.getHttpOptions2()
    );
  }
  getwebsite(): Observable<any>{
    return this.http.get(
      `${this.baseUrl}/websites`,
       
      this.getHttpOptions2()
    );
  }

  }
  

