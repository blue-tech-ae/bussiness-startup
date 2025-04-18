import { Component, HostListener, OnInit } from '@angular/core';
import { ApisService } from '../../services/apis.service';

interface StartupCost {
  item: string;
  category: string;
  amount: number;
  timing: string;
  notes: string;
}

interface FundingSource {
  source: string;
  type: string;
  amount: number;
  status: string;
  terms: string;
}

interface RevenueProjection {
  month: string;
  amount: number;
  assumptions: Array<{ id: number; text: string }>;
}

interface ExpenseProjection {
  month: string;
  fixedExpenses: number;
  variableExpenses: number;
  assumptions: Array<{ id: number; text: string }>;
}

interface BreakevenAnalysis {
  point: number;
  timeline: string;
  assumptions: string[];
}

interface CashFlowEntry {
  month: string;
  cashInflow: number;
  cashOutflow: number;
  balance: number;
  notes: string;
}

@Component({
  selector: 'app-financial-planing',
  templateUrl: './financial-planing.component.html',
  styleUrls: ['./financial-planing.component.css']
})
export class FinancialPlaningComponent implements OnInit {
  videoUrl:any=""
 videoDescription=""
 isSaved=true
 isupdate=false
  // Categories for startup costs
  costCategories = [
    'Equipment',
    'Inventory',
    'Marketing',
    'Legal Fees',
    'Licenses',
    'Insurance',
    'Rent/Lease',
    'Utilities',
    'Salaries',
    'Software/Technology',
    'Office Supplies',
    'Other'
  ];

  // Types of funding
  fundingTypes = [
    'Personal',
    'Family & Friends',
    'Bank Loan',
    'Angel Investment',
    'Venture Capital',
    'Crowdfunding',
    'Government Grant',
    'Other'
  ];

  // Status options
  statusOptions = [
    'Planned',
    'In Progress',
    'Secured',
    'Rejected'
  ];

  startupCosts: StartupCost[] = [{
    item: '',
    category: 'Other',
    amount: 0,
    timing: '',
    notes: ''
  }];

  fundingSources: FundingSource[] = [{
    source: '',
    type: 'Personal',
    amount: 0,
    status: 'Planned',
    terms: ''
  }];

  revenueProjections: RevenueProjection[] = [{
    month: '',
    amount: 0,
    assumptions: [{ id: 0, text: '' }]
  }];

  expenseProjections: ExpenseProjection[] = [{
    month: '',
    fixedExpenses: 0,
    variableExpenses: 0,
    assumptions: [{ id: 0, text: '' }]
  }];

  breakevenAnalysis: BreakevenAnalysis = {
    point: 0,
    timeline: '',
    assumptions: ['']
  };

  cashFlowEntries: CashFlowEntry[] = [{
    month: '',
    cashInflow: 0,
    cashOutflow: 0,
    balance: 0,
    notes: ''
  }];

  constructor(private apisService: ApisService) {}
  ngOnInit(): void {
    this.getVedio("Financial Planning")
    this.getFinancialPlanning()
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  getVedio(title:any){
    this.apisService.GetVedio(title).subscribe((response)=>{
     // console.log(response.data[0].video_path)
//console.log(response.data[0].description)
      this.videoUrl=response.data[0].video_path
      this.videoDescription=response.data[0].description

      
    })
  }
  trackByIndex(index: number, item: any): number {
    return index;
  }
  addStartupCost() {
    this.startupCosts.push({
      item: '',
      category: 'Other',
      amount: 0,
      timing: '',
      notes: ''
    });
  }

  removeStartupCost(index: number) {
    if (this.startupCosts.length > 1) {
      this.startupCosts.splice(index, 1);
    }
  }

  addFundingSource() {
    this.fundingSources.push({
      source: '',
      type: 'Personal',
      amount: 0,
      status: 'Planned',
      terms: ''
    });
  }

  removeFundingSource(index: number) {
    if (this.fundingSources.length > 1) {
      this.fundingSources.splice(index, 1);
    }
  }

  // Methods for Revenue Projections
  addRevenueProjection() {
    this.revenueProjections.push({
      month: '',
      amount: 0,
      assumptions: [{ id: 0, text: '' }]
    });
  }

  removeRevenueProjection(index: number) {
    this.revenueProjections.splice(index, 1);
  }

  updateRevenueAssumption(projectionIndex: number, assumptionIndex: number, value: string) {
    const projection = this.revenueProjections[projectionIndex];
    if (projection && Array.isArray(projection.assumptions)) {
      projection.assumptions = [...projection.assumptions];
      projection.assumptions[assumptionIndex] = { id: assumptionIndex, text: value };
    }
  }

  addRevenueAssumption(projectionIndex: number) {
    const newId = this.revenueProjections[projectionIndex].assumptions.length;
    this.revenueProjections[projectionIndex].assumptions.push({ 
      id: newId, 
      text: '' 
    });
  }

  removeRevenueAssumption(projectionIndex: number, assumptionIndex: number) {
    this.revenueProjections[projectionIndex].assumptions.splice(assumptionIndex, 1);
  }

  // Methods for Expense Projections
  addExpenseProjection() {
    this.expenseProjections.push({
      month: '',
      fixedExpenses: 0,
      variableExpenses: 0,
      assumptions: [{ id: 0, text: '' }]
    });
  }

  removeExpenseProjection(index: number) {
    if (this.expenseProjections.length > 1) {
      this.expenseProjections.splice(index, 1);
    }
  }

  addExpenseAssumption(projectionIndex: number) {
    const newId = this.expenseProjections[projectionIndex].assumptions.length;
    this.expenseProjections[projectionIndex].assumptions.push({ 
      id: newId, 
      text: '' 
    });
  }

  removeExpenseAssumption(projectionIndex: number, assumptionIndex: number) {
    this.expenseProjections[projectionIndex].assumptions.splice(assumptionIndex, 1);
  }

  // Methods for Breakeven Analysis
  addBreakevenAssumption() {
    this.breakevenAnalysis.assumptions.push('');
  }

  removeBreakevenAssumption(index: number) {
    if (this.breakevenAnalysis.assumptions.length > 1) {
      this.breakevenAnalysis.assumptions.splice(index, 1);
    }
  }

  // Methods for Cash Flow
  addCashFlowEntry() {
    this.cashFlowEntries.push({
      month: '',
      cashInflow: 0,
      cashOutflow: 0,
      balance: 0,
      notes: ''
    });
  }

  removeCashFlowEntry(index: number) {
    if (this.cashFlowEntries.length > 1) {
      this.cashFlowEntries.splice(index, 1);
    }
  }

  calculateBalance(entry: CashFlowEntry) {
    entry.balance = entry.cashInflow - entry.cashOutflow;
  }

  saveProgress() {
    // تنسيق البيانات بالشكل المطلوب للـ API
    // const formData = {
    //   startup_costs: this.startupCosts
    //     .filter(cost => cost.item.trim() || cost.amount > 0)
    //     .map(cost => ({
    //       item: cost.item,
    //       category: cost.category,
    //       amount: Number(cost.amount),
    //       timing: cost.timing,
    //       notes: cost.notes
    //     })),

    //   funding_sources: this.fundingSources
    //     .filter(source => source.source.trim() || source.amount > 0)
    //     .map(source => ({
    //       source: source.source,
    //       type: source.type,
    //       amount: Number(source.amount),
    //       status: source.status,
    //       terms: source.terms
    //     })),

    //   revenue_projections: this.revenueProjections
    //     .filter(proj => proj.month.trim() || proj.amount > 0)
    //     .map(proj => ({
    //       month: proj.month,
    //       amount: Number(proj.amount),
    //       assumptions: proj.assumptions.filter(a => a.text.trim()).map(a => a.text)
    //     })),

    //   expense_projections: this.expenseProjections
    //     .filter(proj => proj.month.trim() || proj.fixedExpenses > 0 || proj.variableExpenses > 0)
    //     .map(proj => ({
    //       month: proj.month,
    //       fixed_expenses: Number(proj.fixedExpenses),
    //       variable_expenses: Number(proj.variableExpenses),
    //       assumptions: proj.assumptions.filter(a => a.text.trim()).map(a => a.text)
    //     })),

    //   breakeven_analysis: {
    //     Point: Number(this.breakevenAnalysis.point),
    //     Timeline: this.breakevenAnalysis.timeline,
    //     Assumptions: this.breakevenAnalysis.assumptions.filter(a => a.trim())
    //   },

    //   cash_flow_projections: this.cashFlowEntries
    //     .filter(entry => entry.month.trim() || entry.cashInflow > 0 || entry.cashOutflow > 0)
    //     .map(entry => ({
    //       month: entry.month,
    //       cashInflow: Number(entry.cashInflow),
    //       cashOutflow: Number(entry.cashOutflow),
    //       balance: Number(entry.balance),
    //       notes: entry.notes
    //     }))
    // };
    const formData = {
      startup_costs: (this.startupCosts || [])
          .filter(cost => (cost?.item?.trim() || "") || cost?.amount > 0)
          .map(cost => ({
              item: cost?.item || "N/A",
              category: cost?.category || "Uncategorized",
              amount: Number(cost?.amount) || 0, // 👈 التأكد من أن القيم الرقمية لا تكون NaN
              timing: cost?.timing || "Unknown",
              notes: cost?.notes || ""
          })),

      funding_sources: (this.fundingSources || [])
          .filter(source => (source?.source?.trim() || "") || source?.amount > 0)
          .map(source => ({
              source: source?.source || "Unknown",
              type: source?.type || "Other",
              amount: Number(source?.amount) || 0,
              status: source?.status || "Pending",
              terms: source?.terms || "No terms specified"
          })),

      revenue_projections: (this.revenueProjections || [])
          .filter(proj => (proj?.month?.trim() || "") || proj?.amount > 0)
          .map(proj => ({
              month: proj?.month || "Unknown",
              amount: Number(proj?.amount) || 0,
              assumptions: (proj?.assumptions || [])
                  .filter(a => a?.text?.trim())
                  .map(a => a.text || "")
          })),

      expense_projections: (this.expenseProjections || [])
          .filter(proj => (proj?.month?.trim() || "") || proj?.fixedExpenses > 0 || proj?.variableExpenses > 0)
          .map(proj => ({
              month: proj?.month || "Unknown",
              fixed_expenses: Number(proj?.fixedExpenses) || 0,
              variable_expenses: Number(proj?.variableExpenses) || 0,
              assumptions: (proj?.assumptions || [])
                  .filter(a => a?.text?.trim())
                  .map(a => a.text || "")
          })),

      breakeven_analysis: {
          Point: Number(this?.breakevenAnalysis?.point) || 0, // 👈 التأكد من أن القيم الرقمية تظل 0 عند عدم إدخالها
          Timeline: this?.breakevenAnalysis?.timeline || "Unknown",
          Assumptions: (this?.breakevenAnalysis?.assumptions || [])
              .filter(a => a?.trim())
              .map(a => a || "")
      },

      cash_flow_projections: (this.cashFlowEntries || [])
          .filter(entry => (entry?.month?.trim() || "") || entry?.cashInflow > 0 || entry?.cashOutflow > 0)
          .map(entry => ({
              month: entry?.month || "Unknown",
              cashInflow: Number(entry?.cashInflow) || 0,
              cashOutflow: Number(entry?.cashOutflow) || 0,
              balance: Number(entry?.balance) || 0,
              notes: entry?.notes || ""
          }))
  };

    this.apisService.saveFinancialPlanning(formData).subscribe({
      next: (response) => {
        this.isSaved=false
       
        this.getFinancialPlanning()
     //   console.log('Financial planning data saved successfully:', response);
        alert('Data has been saved successfully.');
      },
      error: (error) => {
        alert("Error saving data. Please check your input.")
        this.getFinancialPlanning()
      }
    });
  }

  // getFinancialPlanning() {
  //   this.apisService.getFinancialPlanning().subscribe((res:any) => {
  //     if (res) {
  //     //  console.log(res.id);
  //       this.isSaved=false
       
  //       localStorage.setItem("idfan",res.id)

  //       // تحديث بيانات تكاليف بدء التشغيل
  //       this.startupCosts = res.startup_costs.map((cost: any) => ({
  //         item: cost.item,
  //         category: cost.category,
  //         amount: Number(cost.amount),
  //         timing: cost.timing,
  //         notes: cost.notes
  //       }));
  
  //       // تحديث مصادر التمويل
  //       this.fundingSources = res.funding_sources.map((source: any) => ({
  //         source: source.source,
  //         type: source.type,
  //         amount: Number(source.amount),
  //         status: source.status,
  //         terms: source.terms
  //       }));
  
  //       // تحديث توقعات الإيرادات
  //       this.revenueProjections = res.revenue_projections.map((proj: any) => ({
  //         month: proj.month,
  //         amount: Number(proj.amount),
  //         assumptions: proj.assumptions.map((assumption: any, index: number) => ({
  //           id: index,
  //           text: assumption
  //         }))
  //       }));
  
  //       // تحديث توقعات المصاريف
  //       this.expenseProjections = res.expense_projections.map((proj: any) => ({
  //         month: proj.month,
  //         fixedExpenses: Number(proj.fixed_expenses),
  //         variableExpenses: Number(proj.variable_expenses),
  //         assumptions: proj.assumptions.map((assumption: any, index: number) => ({
  //           id: index,
  //           text: assumption
  //         }))
  //       }));
  
  //       // تحديث تحليل نقطة التعادل
  //       this.breakevenAnalysis = {
  //         point: Number(res.breakeven_analysis.Point),
  //         timeline: res.breakeven_analysis.Timeline,
  //         assumptions: res.breakeven_analysis.Assumptions
  //       };
  
  //       // تحديث التدفقات النقدية
  //       this.cashFlowEntries = res.cash_flow_projections.map((entry: any) => ({
  //         month: entry.month,
  //         cashInflow: Number(entry.cashInflow),
  //         cashOutflow: Number(entry.cashOutflow),
  //         balance: Number(entry.balance),
  //         notes: entry.notes
  //       }));
  //     }
  //   }, (error) => {
  //   //  console.error('Error fetching financial planning data:', error);
  //   alert(error)
  //   });
  // }
  getFinancialPlanning() {
    this.apisService.getFinancialPlanning().subscribe((res: any) => {
      if (!res || Object.keys(res).length === 0) {
        this.isSaved = true;
      } else {
        this.isSaved = false;
        localStorage.setItem("idfan", res.id || '');
  
        // تحديث بيانات تكاليف بدء التشغيل
        this.startupCosts = res.startup_costs?.map((cost: any) => ({
          item: cost.item || '',
          category: cost.category || '',
          amount: Number(cost.amount) || 0,
          timing: cost.timing || '',
          notes: cost.notes || ''
        })) || [];
  
        // تحديث مصادر التمويل
        this.fundingSources = res.funding_sources?.map((source: any) => ({
          source: source.source || '',
          type: source.type || '',
          amount: Number(source.amount) || 0,
          status: source.status || '',
          terms: source.terms || ''
        })) || [];
  
        // تحديث توقعات الإيرادات
        this.revenueProjections = res.revenue_projections?.map((proj: any) => ({
          month: proj.month || '',
          amount: Number(proj.amount) || 0,
          assumptions: proj.assumptions?.map((assumption: any, index: number) => ({
            id: index,
            text: assumption || ''
          })) || []
        })) || [];
  
        // تحديث توقعات المصاريف
        this.expenseProjections = res.expense_projections?.map((proj: any) => ({
          month: proj.month || '',
          fixedExpenses: Number(proj.fixed_expenses) || 0,
          variableExpenses: Number(proj.variable_expenses) || 0,
          assumptions: proj.assumptions?.map((assumption: any, index: number) => ({
            id: index,
            text: assumption || ''
          })) || []
        })) || [];
  
        // تحديث تحليل نقطة التعادل
        this.breakevenAnalysis = {
          point: Number(res.breakeven_analysis?.Point) || 0,
          timeline: res.breakeven_analysis?.Timeline || '',
          assumptions: res.breakeven_analysis?.Assumptions || ''
        };
  
        // تحديث التدفقات النقدية
        this.cashFlowEntries = res.cash_flow_projections?.map((entry: any) => ({
          month: entry.month || '',
          cashInflow: Number(entry.cashInflow) || 0,
          cashOutflow: Number(entry.cashOutflow) || 0,
          balance: Number(entry.balance) || 0,
          notes: entry.notes || ''
        })) || [];
      }
    }, (error) => {
      alert("Error saving data. Please check your input.");
    });
  }
  
  
  updateProgress() {
    // تنسيق البيانات بالشكل المطلوب للـ API
    // const formData = {
    //   startup_costs: this.startupCosts
    //     .filter(cost => cost.item.trim() || cost.amount > 0)
    //     .map(cost => ({
    //       item: cost.item,
    //       category: cost.category,
    //       amount: Number(cost.amount),
    //       timing: cost.timing,
    //       notes: cost.notes
    //     })),

    //   funding_sources: this.fundingSources
    //     .filter(source => source.source.trim() || source.amount > 0)
    //     .map(source => ({
    //       source: source.source,
    //       type: source.type,
    //       amount: Number(source.amount),
    //       status: source.status,
    //       terms: source.terms
    //     })),

    //   revenue_projections: this.revenueProjections
    //     .filter(proj => proj.month.trim() || proj.amount > 0)
    //     .map(proj => ({
    //       month: proj.month,
    //       amount: Number(proj.amount),
    //       assumptions: proj.assumptions.filter(a => a.text.trim()).map(a => a.text)
    //     })),

    //   expense_projections: this.expenseProjections
    //     .filter(proj => proj.month.trim() || proj.fixedExpenses > 0 || proj.variableExpenses > 0)
    //     .map(proj => ({
    //       month: proj.month,
    //       fixed_expenses: Number(proj.fixedExpenses),
    //       variable_expenses: Number(proj.variableExpenses),
    //       assumptions: proj.assumptions.filter(a => a.text.trim()).map(a => a.text)
    //     })),

    //   breakeven_analysis: {
    //     Point: Number(this.breakevenAnalysis.point),
    //     Timeline: this.breakevenAnalysis.timeline,
    //     Assumptions: this.breakevenAnalysis.assumptions.filter(a => a.trim())
    //   },

    //   cash_flow_projections: this.cashFlowEntries
    //     .filter(entry => entry.month.trim() || entry.cashInflow > 0 || entry.cashOutflow > 0)
    //     .map(entry => ({
    //       month: entry.month,
    //       cashInflow: Number(entry.cashInflow),
    //       cashOutflow: Number(entry.cashOutflow),
    //       balance: Number(entry.balance),
    //       notes: entry.notes
    //     }))
    // };
    const formData = {
      startup_costs: (this.startupCosts || [])
          .filter(cost => (cost?.item?.trim() || "") || cost?.amount > 0)
          .map(cost => ({
              item: cost?.item || "N/A",
              category: cost?.category || "Uncategorized",
              amount: Number(cost?.amount) || 0, // 👈 التأكد من أن القيم الرقمية لا تكون NaN
              timing: cost?.timing || "Unknown",
              notes: cost?.notes || ""
          })),

      funding_sources: (this.fundingSources || [])
          .filter(source => (source?.source?.trim() || "") || source?.amount > 0)
          .map(source => ({
              source: source?.source || "Unknown",
              type: source?.type || "Other",
              amount: Number(source?.amount) || 0,
              status: source?.status || "Pending",
              terms: source?.terms || "No terms specified"
          })),

      revenue_projections: (this.revenueProjections || [])
          .filter(proj => (proj?.month?.trim() || "") || proj?.amount > 0)
          .map(proj => ({
              month: proj?.month || "Unknown",
              amount: Number(proj?.amount) || 0,
              assumptions: (proj?.assumptions || [])
                  .filter(a => a?.text?.trim())
                  .map(a => a.text || "")
          })),

      expense_projections: (this.expenseProjections || [])
          .filter(proj => (proj?.month?.trim() || "") || proj?.fixedExpenses > 0 || proj?.variableExpenses > 0)
          .map(proj => ({
              month: proj?.month || "Unknown",
              fixed_expenses: Number(proj?.fixedExpenses) || 0,
              variable_expenses: Number(proj?.variableExpenses) || 0,
              assumptions: (proj?.assumptions || [])
                  .filter(a => a?.text?.trim())
                  .map(a => a.text || "")
          })),

      breakeven_analysis: {
          Point: Number(this?.breakevenAnalysis?.point) || 0, // 👈 التأكد من أن القيم الرقمية تظل 0 عند عدم إدخالها
          Timeline: this?.breakevenAnalysis?.timeline || "Unknown",
          Assumptions: (this?.breakevenAnalysis?.assumptions || [])
              .filter(a => a?.trim())
              .map(a => a || "")
      },

      cash_flow_projections: (this.cashFlowEntries || [])
          .filter(entry => (entry?.month?.trim() || "") || entry?.cashInflow > 0 || entry?.cashOutflow > 0)
          .map(entry => ({
              month: entry?.month || "Unknown",
              cashInflow: Number(entry?.cashInflow) || 0,
              cashOutflow: Number(entry?.cashOutflow) || 0,
              balance: Number(entry?.balance) || 0,
              notes: entry?.notes || ""
          }))
  };

    this.apisService.updateFinancialPlanning(formData).subscribe({
      next: (response) => {
        this.isSaved=false
        this.getFinancialPlanning()
       
//console.log('Financial planning data updated successfully:', response);
        alert('Data has been updated successfully.');
      },
      error: (error) => {
        this.getFinancialPlanning()
        alert("Error updating data. Please check your input.")
      }
    });
  }

  updateAssumption(projection: any, index: number, value: string) {
    projection.assumptions[index] = { id: index, text: value };
  }

  addAssumption(projection: any) {
    projection.assumptions.push({ id: projection.assumptions.length, text: '' });
  }

  removeAssumption(projection: any, index: number) {
    projection.assumptions.splice(index, 1);
  }

  trackByFn(index: number): number {
    return index;
  }

  onAssumptionInput(event: Event, projectionIndex: number, assumptionIndex: number) {
    const input = event.target as HTMLInputElement;
    this.updateRevenueAssumption(projectionIndex, assumptionIndex, input.value);
  }
   showButton: boolean = false;
  
    // استماع لأحداث التمرير Scroll
    @HostListener("window:scroll", [])
    onScroll(): void {
      this.showButton = window.scrollY > 200; // إظهار الزر عند التمرير أكثر من 200px
    }
  
    // دالة التمرير إلى الأعلى
    scrollToTop(): void {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
}
