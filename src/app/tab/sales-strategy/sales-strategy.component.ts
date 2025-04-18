import { Component, HostListener, OnInit } from '@angular/core';
import { ApisService } from '../../services/apis.service';

interface SalesChannel {
  name: string;
  description: string;
  targetRevenue: number;
  commissionStructure: string;
}

interface PricingTier {
  name: string;
  price: number;
  features: string[];
  targetCustomer: string;
}

interface SalesProcess {
  stage: string;
  activities: string;
  duration: string;
  responsiblePerson: string;
}

interface SalesTeam {
  role: string;
  responsibilities: string;
  requiredSkills: string;
  targetMetrics: string;
}

@Component({
  selector: 'app-sales-strategy',
  templateUrl: './sales-strategy.component.html',
  styleUrls: ['./sales-strategy.component.css']
})
export class SalesStrategyComponent implements OnInit {
  videoUrl:any=""
 videoDescription=""
  isSaved=true 
  isUpdate= false
  salesChannels: SalesChannel[] = [{
    name: '',
    description: '',
    targetRevenue: 0,
    commissionStructure: ''
  }];

  pricingTiers: PricingTier[] = [{
    name: '',
    price: 0,
    features: [''],
    targetCustomer: ''
  }];

  salesProcess: SalesProcess[] = [{
    stage: '',
    activities: '',
    duration: '',
    responsiblePerson: ''
  }];

  salesTeam: SalesTeam[] = [{
    role: '',
    responsibilities: '',
    requiredSkills: '',
    targetMetrics: ''
  }];

  constructor(private apisService: ApisService) {}


  ngOnInit(): void {
    this.getSalesStrategy()
    this.getVedio("Sales Strategy")
    window.scrollTo({ top: 0, behavior: "smooth" });
    
  }
  getVedio(title:any){
    this.apisService.GetVedio(title).subscribe((response)=>{
    
      this.videoUrl=response.data[0].video_path
      this.videoDescription=response.data[0].description

      
    })
  }
  trackByIndex(index: number, item: any): number {
    return index;
  }
  
  // Sales Channels Methods
  addSalesChannel() {
    this.salesChannels.push({
      name: '',
      description: '',
      targetRevenue: 0,
      commissionStructure: ''
    });
  }

  removeSalesChannel(index: number) {
    this.salesChannels.splice(index, 1);
  }

  // Pricing Tiers Methods
  addPricingTier() {
    this.pricingTiers.push({
      name: '',
      price: 0,
      features: [''],
      targetCustomer: ''
    });
  }

  removePricingTier(index: number) {
    this.pricingTiers.splice(index, 1);
  }

  addFeature(tierIndex: number) {
    this.pricingTiers[tierIndex].features.push('');
  }

  removeFeature(tierIndex: number, featureIndex: number) {
    this.pricingTiers[tierIndex].features.splice(featureIndex, 1);
  }

  // Sales Process Methods
  addProcessStage() {
    this.salesProcess.push({
      stage: '',
      activities: '',
      duration: '',
      responsiblePerson: ''
    });
  }

  removeProcessStage(index: number) {
    this.salesProcess.splice(index, 1);
  }

  // Sales Team Methods
  addTeamMember() {
    this.salesTeam.push({
      role: '',
      responsibilities: '',
      requiredSkills: '',
      targetMetrics: ''
    });
  }

  removeTeamMember(index: number) {
    this.salesTeam.splice(index, 1);
  }

  saveProgress() {
    const formData = {
      SalesChannels: this.salesChannels
        ?.filter(channel => 
          channel.name?.trim() || 
          channel.description?.trim() || 
          Number(channel.targetRevenue) > 0 || 
          channel.commissionStructure?.trim()
        ),
  
      PricingTiers: this.pricingTiers
        ?.filter(tier => 
          tier.name?.trim() || 
          Number(tier.price) > 0 || 
          tier.features?.some(f => f?.trim()) || 
          tier.targetCustomer?.trim()
        )
        .map(tier => ({
          ...tier,
          features: tier.features?.filter(f => f?.trim()) || []
        })),
  
      SalesProcess: this.salesProcess
        ?.filter(process => 
          process.stage?.trim() || 
          process.activities?.trim() || 
          process.duration?.trim() || 
          process.responsiblePerson?.trim()
        ),
  
      SalesTeam: this.salesTeam
        ?.filter(member => 
          member.role?.trim() || 
          member.responsibilities?.trim() || 
          member.requiredSkills?.trim() || 
          member.targetMetrics?.trim()
        )
    };
   // console.log("FormData:", formData);

  
    this.apisService.saveSalesStrategy(formData).subscribe({
      next: (response) => {
        this.getSalesStrategy();
       
//console.log("Sales strategy data saved successfully:", response);
alert("Data has been saved successfully.");
      },
      error: (error) => {
//console.error("Error saving data:", error);
this.getSalesStrategy();
        alert("An error occurred while saving the data.");
      }
    });
  }
  updateProgress() {
    const formData = {
      SalesChannels: this.salesChannels
        ?.filter(channel => 
          channel.name?.trim() || 
          channel.description?.trim() || 
          Number(channel.targetRevenue) > 0 || 
          channel.commissionStructure?.trim()
        ),
  
      PricingTiers: this.pricingTiers
        ?.filter(tier => 
          tier.name?.trim() || 
          Number(tier.price) > 0 || 
          tier.features?.some(f => f?.trim()) || 
          tier.targetCustomer?.trim()
        )
        .map(tier => ({
          ...tier,
          features: tier.features?.filter(f => f?.trim()) || []
        })),
  
      SalesProcess: this.salesProcess
        ?.filter(process => 
          process.stage?.trim() || 
          process.activities?.trim() || 
          process.duration?.trim() || 
          process.responsiblePerson?.trim()
        ),
  
      SalesTeam: this.salesTeam
        ?.filter(member => 
          member.role?.trim() || 
          member.responsibilities?.trim() || 
          member.requiredSkills?.trim() || 
          member.targetMetrics?.trim()
        )
    };
//console.log("FormData: from component", formData);

  
    this.apisService.updateSalesStrategy(formData).subscribe({
      next: (response) => {
this.getSalesStrategy();

       // console.log("Sales strategy data update successfully:", response);
        alert("Data has been update successfully.");
      },
      error: (error) => {
//console.error("Error update data:", error);
this.getSalesStrategy();
        alert("An error occurred while updating the data.");
      }
    });
  }
  
  
   
  
  getSalesStrategy() {
    this.apisService.getSalesStrategy().subscribe((res) => {
      if (!res || Object.keys(res).length === 0) {
        this.isSaved = true;
      } else {
        localStorage.setItem("id_strategy", res.id);
        this.isSaved = false;
        
  
        this.salesChannels = res.sales_channels?.map((channel: any) => ({
          name: channel.name || '',
          description: channel.description || '',
          targetRevenue: parseFloat(channel.target_revenue) || 0,
          commissionStructure: channel.commission_structure || ''
        })) || [];
  
        this.pricingTiers = res.pricing_tiers?.map((tier: any) => ({
          name: tier.name || '',
          price: parseFloat(tier.price) || 0,
          features: Array.isArray(tier.features) ? tier.features : [],
          targetCustomer: tier.target_customer || ''
        })) || [];
  
        this.salesProcess = res.sales_processes?.map((process: any) => ({
          stage: process.stage || '',
          activities: process.activities || '',
          duration: process.duration || '',
          responsiblePerson: process.responsible_person || ''
        })) || [];
  
        this.salesTeam = res.sales_teams?.map((member: any) => ({
          role: member.role || '',
          responsibilities: member.responsibilities || '',
          requiredSkills: member.required_skills || '',
          targetMetrics: member.target_metrics || ''
        })) || [];
      }
    });
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
