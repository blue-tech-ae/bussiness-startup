import { Component, HostListener, OnInit } from '@angular/core';
import { ApisService } from '../../services/apis.service';

interface TargetMarket {
  audienceDescription: string;
  problemStatement: string;
  solutionOverview: string;
}

interface MarketingChannel {
  name: string;
  strategy: string;
  budget: number;
  expectedROI: string;
}

interface ContentStrategy {
  type: string;
  description: string;
  frequency: string;
  responsiblePerson: string;
}

interface BrandIdentity {
  name: string;
  value: string;
}

@Component({
  selector: 'app-marketing',
  templateUrl: './marketing.component.html',
  styleUrls: ['./marketing.component.css']
})
export class MarketingComponent implements OnInit {
  videoUrl:any=""
 videoDescription=""
  targetMarket: TargetMarket = {
    audienceDescription: '',
    problemStatement: '',
    solutionOverview: ''
  };

  marketingChannels: MarketingChannel[] = [{
    name: '',
    strategy: '',
    budget: 0,
    expectedROI: ''
  }];

  contentStrategy: ContentStrategy[] = [{
    type: '',
    description: '',
    frequency: '',
    responsiblePerson: ''
  }];

  brandIdentity = {
    values: [''],
    mission: '',
    vision: '',
    tone: '',
    visualStyle: ''
  }; 
  isSaved=true
 

  constructor(private apisService: ApisService) {}
  ngOnInit(): void {
    this.getVedio("Marketing")
   this.getMarketing()
   window.scrollTo({ top: 0, behavior: "smooth" });
  }
  getVedio(title:any){
    this.apisService.GetVedio(title).subscribe((response)=>{
    
      this.videoUrl=response.data[0].video_path
      this.videoDescription=response.data[0].description

      
    })
  }

  addMarketingChannel() {
    this.marketingChannels.push({
      name: '',
      strategy: '',
      budget: 0,
      expectedROI: ''
    });
  }

  removeMarketingChannel(index: number) {
    this.marketingChannels.splice(index, 1);
  }

  addContentStrategy() {
    this.contentStrategy.push({
      type: '',
      description: '',
      frequency: '',
      responsiblePerson: ''
    });
  }

  removeContentStrategy(index: number) {
    this.contentStrategy.splice(index, 1);
  }

  addBrandValue() {
    this.brandIdentity.values.push('');
  }

  removeBrandValue(index: number) {
    this.brandIdentity.values.splice(index, 1);
  }
  trackByIndex(index: number, item: any): number {
    return index;
  }
  

 
//   saveProgress() {
//     const formData = {
//       TargetMarket: {
//         audienceDescription: this.targetMarket.audienceDescription?.trim() || '',
//         problemStatement: this.targetMarket.problemStatement?.trim() || '',
//         solutionOverview: this.targetMarket.solutionOverview?.trim() || ''
//       },
//       MarketingChannels: this.marketingChannels
//         .filter(channel => channel.name?.trim() || channel.strategy?.trim() || channel.budget > 0 || channel.expectedROI?.trim())
//         .map(channel => ({
//           name: channel.name?.trim() || '',
//           strategy: channel.strategy?.trim() || '',
//           budget: Number(channel.budget) || 0,
//           expectedROI: channel.expectedROI?.trim() || ''
//         })),
//       ContentStrategy: this.contentStrategy
//         .filter(content => content.type?.trim() || content.description?.trim() || content.frequency?.trim() || content.responsiblePerson?.trim())
//         .map(content => ({
//           type: content.type?.trim() || '',
//           description: content.description?.trim() || '',
//           frequency: content.frequency?.trim() || '',
//           responsiblePerson: content.responsiblePerson?.trim() || ''
//         })),
//         BrandIdentity: {
//           Values: Array.isArray(this.brandIdentity.values) 
//             ? this.brandIdentity.values.filter(value => value.trim()) 
//             : [], // التأكد من أنها مصفوفة وإلا يتم وضع مصفوفة فارغة
//           Mission: this.brandIdentity.mission?.trim() || '',
//           Vision: this.brandIdentity.vision?.trim() || '',
//           Tone: this.brandIdentity.tone?.trim() || '',
//           VisualStyle: this.brandIdentity.visualStyle?.trim() || ''
//         }
//     };
  
// //console.log("Data being sent:", formData); // لمعرفة البيانات قبل الإرسال
  
//     this.apisService.saveMarketing(formData).subscribe({
//       next: (response) => {
//        this.getMarketing()
//        // console.log('Marketing data saved successfully:', response);
//         alert('Data has been saved successfully.');
//       },
//       error: (error) => {
//        // console.log("Error:", error);
//         alert("Error saving data. Please check your input.");
//        // this.getMarketing()
//       }
//     });
//   }
saveProgress() {
  const formData = {
    TargetMarket: {
      audienceDescription: this.targetMarket.audienceDescription?.trim() || '',
      problemStatement: this.targetMarket.problemStatement?.trim() || '',
      solutionOverview: this.targetMarket.solutionOverview?.trim() || ''
    },
    MarketingChannels: this.marketingChannels
      .map(channel => ({
        name: channel.name?.trim() || '',
        strategy: channel.strategy?.trim() || '',
        budget: Number(channel.budget) || 0,
        expectedROI: channel.expectedROI?.trim() || ''
      }))
      .filter(channel => channel.name || channel.strategy || channel.budget > 0 || channel.expectedROI),

    ContentStrategy: this.contentStrategy
      .map(content => ({
        type: content.type?.trim() || '',
        description: content.description?.trim() || '',
        frequency: content.frequency?.trim() || '',
        responsiblePerson: content.responsiblePerson?.trim() || ''
      }))
      .filter(content => content.type || content.description || content.frequency || content.responsiblePerson),

    BrandIdentity: {
      Values: Array.isArray(this.brandIdentity.values) 
        ? this.brandIdentity.values.filter(value => value.trim()) 
        : [],
      Mission: this.brandIdentity.mission?.trim() || '',
      Vision: this.brandIdentity.vision?.trim() || '',
      Tone: this.brandIdentity.tone?.trim() || '',
      VisualStyle: this.brandIdentity.visualStyle?.trim() || ''
    }
  };

  //console.log("📤 Sending Data:", JSON.stringify(formData, null, 2));

  this.apisService.saveMarketing(formData).subscribe({
    next: (response) => {
      this.getMarketing();
      alert('Data has been saved successfully.');
    },
    error: (error) => {
      console.error("❌ Error Details:", error);
      if (error.error) {
       // console.error("🔴 Server Response:", error.error);
      }
      alert("❌ Error saving data. Check console for details.");
    }
  });
}


  updateProgress() {
   

    // const formData = {
    //   TargetMarket: {
    //     audienceDescription: this.targetMarket.audienceDescription?.trim() || '',
    //     problemStatement: this.targetMarket.problemStatement?.trim() || '',
    //     solutionOverview: this.targetMarket.solutionOverview?.trim() || ''
    //   },
    //   MarketingChannels: this.marketingChannels
    //     .filter(channel => channel.name?.trim() || channel.strategy?.trim() || channel.budget > 0 || channel.expectedROI?.trim())
    //     .map(channel => ({
    //       name: channel.name?.trim() || '',
    //       strategy: channel.strategy?.trim() || '',
    //       budget: Number(channel.budget) || 0,
    //       expectedROI: channel.expectedROI?.trim() || ''
    //     })),
    //   ContentStrategy: this.contentStrategy
    //     .filter(content => content.type?.trim() || content.description?.trim() || content.frequency?.trim() || content.responsiblePerson?.trim())
    //     .map(content => ({
    //       type: content.type?.trim() || '',
    //       description: content.description?.trim() || '',
    //       frequency: content.frequency?.trim() || '',
    //       responsiblePerson: content.responsiblePerson?.trim() || ''
    //     })),
    //   BrandIdentity: {
    //     Values: this.brandIdentity.values?.filter(value => value.trim()) || [],
    //     Mission: this.brandIdentity.mission?.trim() || '',
    //     Vision: this.brandIdentity.vision?.trim() || '',
    //     Tone: this.brandIdentity.tone?.trim() || '',
    //     VisualStyle: this.brandIdentity.visualStyle?.trim() || ''
    //   }
    // };
    const formData = {
      TargetMarket: {
        audienceDescription: this.targetMarket?.audienceDescription?.trim() || '',
        problemStatement: this.targetMarket?.problemStatement?.trim() || '',
        solutionOverview: this.targetMarket?.solutionOverview?.trim() || ''
      },
      MarketingChannels: (this.marketingChannels || [])
        .filter(channel => channel?.name?.trim() || channel?.strategy?.trim() || channel?.budget > 0 || channel?.expectedROI?.trim())
        .map(channel => ({
          name: channel?.name?.trim() || '',
          strategy: channel?.strategy?.trim() || '',
          budget: Number(channel?.budget) || 0,
          expectedROI: channel?.expectedROI?.trim() || ''
        })),
      ContentStrategy: (this.contentStrategy || [])
        .filter(content => content?.type?.trim() || content?.description?.trim() || content?.frequency?.trim() || content?.responsiblePerson?.trim())
        .map(content => ({
          type: content?.type?.trim() || '',
          description: content?.description?.trim() || '',
          frequency: content?.frequency?.trim() || '',
          responsiblePerson: content?.responsiblePerson?.trim() || ''
        })),
      BrandIdentity: {
        Values: (this.brandIdentity?.values || []).filter(value => value?.trim()) || [],
        Mission: this.brandIdentity?.mission?.trim() || '',
        Vision: this.brandIdentity?.vision?.trim() || '',
        Tone: this.brandIdentity?.tone?.trim() || '',
        VisualStyle: this.brandIdentity?.visualStyle?.trim() || ''
      }
    };
    this.apisService.updateMarketing(formData).subscribe({
      next: (response) => {
        this.getMarketing()
       // console.log('Marketing data saved successfully:', response);
        alert('Data has been updated successfully.');
      },
      error: (error) => {
        alert("Error updating data. Please check your input.")
        this.getMarketing()
      }
    });
  }
  getMarketing() {
    this.apisService.getMarketing().subscribe((res) => {
      if (!res || Object.keys(res).length === 0) {
        this.isSaved = true;
      } else {
        localStorage.setItem("idmarket", res.id);
        this.isSaved = false;
  
        this.targetMarket = {
          audienceDescription: res.audience_description || '',
          problemStatement: res.problem_statement || '',
          solutionOverview: res.solution_overview || ''
        };
  
        this.marketingChannels = res.marketing_channels?.map((channel: any) => ({
          name: channel.name || '',
          strategy: channel.strategy || '',
          budget: parseFloat(channel.budget) || 0,
          expectedROI: channel.expected_roi || ''
        })) || [];
  
        this.contentStrategy = res.content_strategies?.map((content: any) => ({
          type: content.type || '',
          description: content.description || '',
          frequency: content.frequency || '',
          responsiblePerson: content.responsible_person || ''
        })) || [];
  
        this.brandIdentity = {
          values: res.brand_identity?.values || '',
          mission: res.brand_identity?.mission || '',
          vision: res.brand_identity?.vision || '',
          tone: res.brand_identity?.tone || '',
          visualStyle: res.brand_identity?.visual_style || ''
        };
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
