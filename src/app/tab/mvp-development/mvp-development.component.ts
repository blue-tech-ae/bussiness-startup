import { Component, HostListener, OnInit } from '@angular/core';
import { ApisService } from '../../services/apis.service';

interface Feature {
  description: string;
}

interface Assumption {
  description: string;
  testMethod: string;   
  successCriteria: string;
}

interface Milestone {
  description: string;
}

interface TimelinePhase {
  name: string;
  duration: string;
  milestones: string[];
}

interface Metric {
  name: string;
  targetValue: number;
  actualValue: number;
}

type FeatureType = 'must' | 'should' | 'nice';
type FeatureKey = 'MustHaveFeatures' | 'ShouldHaveFeatures' | 'NiceToHaveFeatures';

@Component({
  selector: 'app-mvp-development',
  templateUrl: './mvp-development.component.html',
  styleUrls: ['./mvp-development.component.css']
})
export class MvpDevelopmentComponent implements OnInit {
  videoUrl:any=""
 videoDescription=""
 isSaved=true
 isUpdate=false
  features = {
    MustHaveFeatures: [''] as string[],
    ShouldHaveFeatures: [''] as string[],
    NiceToHaveFeatures: [''] as string[]
  };

  assumptions: Assumption[] = [{
    description: '',
    testMethod: '',
    successCriteria: ''
  }];

  timelinePhases: TimelinePhase[] = [{
    name: '',
    duration: '',
    milestones: ['']
  }];

  metrics1: Metric[] = [{
    name: '',
    targetValue: 0,
    actualValue: 0
  }];
  metrics2: Metric[] = [{
    name: '',
    targetValue: 0,
    actualValue: 0
  }];
  metrics3: Metric[] = [{
    name: '',
    targetValue: 0,
    actualValue: 0
  }];

  private featureMap: Record<FeatureType, FeatureKey> = {
    'must': 'MustHaveFeatures',
    'should': 'ShouldHaveFeatures',
    'nice': 'NiceToHaveFeatures'
  };

  constructor(private apisService: ApisService) {}
  ngOnInit(): void {
  this.getVedio("MVP Development");
 this.getMvp();  
  window.scrollTo({ top: 0, behavior: "smooth" });
  }
  getVedio(title:any){
    this.apisService.GetVedio(title).subscribe((response)=>{

      this.videoUrl=response.data[0].video_path
      this.videoDescription=response.data[0].description

      
    })
  }

  addFeature(type: FeatureType) {
    const key = this.featureMap[type];
    if (!Array.isArray(this.features[key])) {
      this.features[key] = [];
    }
    this.features[key] = [...this.features[key], ''];
  }

  removeFeature(type: FeatureType, index: number) {
    const key = this.featureMap[type];
    if (Array.isArray(this.features[key])) {
      this.features[key] = this.features[key].filter((_, i) => i !== index);
    }
  }

  addAssumption() {
    this.assumptions = [...this.assumptions, {
      description: '',
      testMethod: '',
      successCriteria: ''
    }];
  }

  removeAssumption(index: number) {
    this.assumptions = this.assumptions.filter((_, i) => i !== index);
  }

  addTimelinePhase() {
    this.timelinePhases = [...this.timelinePhases, {
      name: '',
      duration: '',
      milestones: ['']
    }];
  }

  removeTimelinePhase(index: number) {
    this.timelinePhases = this.timelinePhases.filter((_, i) => i !== index);
  }

  addMilestone(phaseIndex: number) {
    if (this.timelinePhases[phaseIndex]) {
      this.timelinePhases = this.timelinePhases.map((phase, i) => {
        if (i === phaseIndex) {
          return {
            ...phase,
            milestones: [...phase.milestones, '']
          };
        }
        return phase;
      });
    }
  }

  removeMilestone(phaseIndex: number, milestoneIndex: number) {
    if (this.timelinePhases[phaseIndex]) {
      this.timelinePhases = this.timelinePhases.map((phase, i) => {
        if (i === phaseIndex) {
          return {
            ...phase,
            milestones: phase.milestones.filter((_, j) => j !== milestoneIndex)
          };
        }
        return phase;
      });
    }
  }

  addMetric1() {
    this.metrics1 = [...this.metrics1, {
      name: '',
      targetValue: 0,
      actualValue: 0
    }];
  }

  removeMetric1(index: number) {
    this.metrics1 = this.metrics1.filter((_, i) => i !== index);
  }
  addMetric2() {
    this.metrics2 = [...this.metrics2, {
      name: '',
      targetValue: 0,
      actualValue: 0
    }];
  }

  removeMetric2(index: number) {
    this.metrics2 = this.metrics2.filter((_, i) => i !== index);
  }
  addMetric3() {
    this.metrics3 = [...this.metrics3, {
      name: '',
      targetValue: 0,
      actualValue: 0
    }];
  }

  removeMetric3(index: number) {
    this.metrics3 = this.metrics3.filter((_, i) => i !== index);
  }

  saveProgress() {
    const formData = {
      Features: {
        MustHaveFeatures: (this.features?.MustHaveFeatures || []).filter(f => f?.trim()) || [],
        ShouldHaveFeatures: (this.features?.ShouldHaveFeatures || []).filter(f => f?.trim()) || [],
        NiceToHaveFeatures: (this.features?.NiceToHaveFeatures || []).filter(f => f?.trim()) || [],
        Metrics: (this.metrics1 || [])
        .filter(m => m?.name?.trim() || m?.targetValue > 0 || m?.actualValue > 0)
        .map(m => ({
          name: m?.name?.trim() || '',
          targetValue: Number(m?.targetValue) || 0,
          actualValue: Number(m?.actualValue) || 0
        }))
      },
      Assumptions: (this.assumptions || [])
        .filter(a => a?.description?.trim() || a?.testMethod?.trim() || a?.successCriteria?.trim())
        .map(a => ({
          description: a?.description?.trim() || '',
          testMethod: a?.testMethod?.trim() || '',
          successCriteria: a?.successCriteria?.trim() || '',
          Metrics: (this.metrics2 || [])
          .filter(m => m?.name?.trim() || m?.targetValue > 0 || m?.actualValue > 0)
          .map(m => ({
            name: m?.name?.trim() || '',
            targetValue: Number(m?.targetValue) || 0,
            actualValue: Number(m?.actualValue) || 0
          }))
        })),
      Timeline: (this.timelinePhases || [])
        .filter(p => p?.name?.trim() || p?.duration?.trim() || (p?.milestones || []).some(m => m?.trim()))
        .map(p => ({
          name: p?.name?.trim() || '',
          duration: p?.duration?.trim() || '',
          milestones: (p?.milestones || []).filter(m => m?.trim()) || [],
          Metrics: (this.metrics3 || [])
          .filter(m => m?.name?.trim() || m?.targetValue > 0 || m?.actualValue > 0)
          .map(m => ({
            name: m?.name?.trim() || '',
            targetValue: Number(m?.targetValue) || 0,
            actualValue: Number(m?.actualValue) || 0
          }))
        })),
    
    };
    this.apisService.saveMvpDevelopment(formData).subscribe({
      next: (response) => {
        this.getMvp()
        alert('Data has been saved successfully.');
      },
      error: (error) => {
        alert("Error saving data. Please check your input.");
      }
    });
  }
  updateProgress() {
  
    const formData = {
      Features: {
        MustHaveFeatures: (this.features?.MustHaveFeatures || []).filter(f => f?.trim()) || [],
        ShouldHaveFeatures: (this.features?.ShouldHaveFeatures || []).filter(f => f?.trim()) || [],
        NiceToHaveFeatures: (this.features?.NiceToHaveFeatures || []).filter(f => f?.trim()) || [],
        Metrics: (this.metrics1 || [])
        .filter(m => m?.name?.trim() || m?.targetValue > 0 || m?.actualValue > 0)
        .map(m => ({
          name: m?.name?.trim() || '',
          targetValue: Number(m?.targetValue) || 0,
          actualValue: Number(m?.actualValue) || 0
        }))
      },
      Assumptions: (this.assumptions || [])
        .filter(a => a?.description?.trim() || a?.testMethod?.trim() || a?.successCriteria?.trim())
        .map(a => ({
          description: a?.description?.trim() || '',
          testMethod: a?.testMethod?.trim() || '',
          successCriteria: a?.successCriteria?.trim() || '',
          Metrics: (this.metrics2 || [])
          .filter(m => m?.name?.trim() || m?.targetValue > 0 || m?.actualValue > 0)
          .map(m => ({
            name: m?.name?.trim() || '',
            targetValue: Number(m?.targetValue) || 0,
            actualValue: Number(m?.actualValue) || 0
          }))
        })),
      Timeline: (this.timelinePhases || [])
        .filter(p => p?.name?.trim() || p?.duration?.trim() || (p?.milestones || []).some(m => m?.trim()))
        .map(p => ({
          name: p?.name?.trim() || '',
          duration: p?.duration?.trim() || '',
          milestones: (p?.milestones || []).filter(m => m?.trim()) || [],
          Metrics: (this.metrics3 || [])
          .filter(m => m?.name?.trim() || m?.targetValue > 0 || m?.actualValue > 0)
          .map(m => ({
            name: m?.name?.trim() || '',
            targetValue: Number(m?.targetValue) || 0,
            actualValue: Number(m?.actualValue) || 0
          }))
        })),
    
    };
 
    this.apisService.updateMvpDevelopment(formData).subscribe({
      next: (response) => {
       this.getMvp()
//console.log('MVP development data update successfully:', response);
        alert('Data has been update successfully.');
      },
      error: (error) => {
       // this.getMvp()
        alert("Error updating data. Please check your input.")
      }
    });
  }
  // getMvp() {
  //   this.apisService.getMvpDevelpoment().subscribe((res) => {
  //     if (!res || Object.keys(res).length === 0) {
  //       this.isSaved = true;
  //     } else {
  //       this.isSaved = false;
  //       localStorage.setItem("idmvp", res.id);
  
  //       this.features = {
  //         MustHaveFeatures: res.features?.must_have_features || [],
  //         ShouldHaveFeatures: res.features?.should_have_features || [],
  //         NiceToHaveFeatures: res.features?.nice_to_have_features || []
          
  //       };
  //       this.metrics1 = res.features.metrics?.map((metric: any) => ({
  //         name: metric.name || '',
  //         targetValue: parseFloat(metric.target_value) || 0,
  //         actualValue: parseFloat(metric.actual_value) || 0
  //       })) || [];
  
  //       this.assumptions = res.assumptions?.map((assumption: any) => ({
  //         description: assumption.description || '',
  //         testMethod: assumption.test_method || '',
  //         successCriteria: assumption.success_criteria || ''
  //       })) || [];
  //       this.metrics2 = res.assumptions.metrics?.map((metric: any) => ({
  //         name: metric.name || '',
  //         targetValue: parseFloat(metric.target_value) || 0,
  //         actualValue: parseFloat(metric.actual_value) || 0
  //       })) || [];
  
  //       this.timelinePhases = res.timelines?.map((timeline: any) => ({
  //         name: timeline.name || '',
  //         duration: timeline.duration || '',
  //         milestones: timeline.milestones || []
  //       })) || [];
  
  //       this.metrics3 = res.timelines.metrics?.map((metric: any) => ({
  //         name: metric.name || '',
  //         targetValue: parseFloat(metric.target_value) || 0,
  //         actualValue: parseFloat(metric.actual_value) || 0
  //       })) || [];
  //     }
  //   }, (error) => {
  //     alert(error);
  //   });
  // }
  getMvp() {
    this.apisService.getMvpDevelpoment().subscribe((res) => {
      if (!res || Object.keys(res).length === 0) {
        this.isSaved = true;
        return;
      } 
  
      this.isSaved = false;
      localStorage.setItem("idmvp", res.id);
  
      // استخراج البيانات بشكل آمن مع توفير قيم افتراضية
      this.features = {
        MustHaveFeatures: res.features?.must_have_features || [],
        ShouldHaveFeatures: res.features?.should_have_features || [],
        NiceToHaveFeatures: res.features?.nice_to_have_features || []
      };
  
      this.metrics1 = res.features?.metrics?.map((metric: any) => ({
        name: metric?.name || '',
        targetValue: parseFloat(metric?.target_value) || 0,
        actualValue: parseFloat(metric?.actual_value) || 0
      })) || [];
  
      this.assumptions = res.assumptions?.map((assumption: any) => ({
        description: assumption?.description || '',
        testMethod: assumption?.test_method || '',
        successCriteria: assumption?.success_criteria || ''
      })) || [];
  
      this.metrics2 = res.assumptions?.flatMap((assumption: any) =>
        assumption?.metrics?.map((metric: any) => ({
          name: metric?.name || '',
          targetValue: parseFloat(metric?.target_value) || 0,
          actualValue: parseFloat(metric?.actual_value) || 0
        })) || []
      ) || [];
  
      this.timelinePhases = res.timelines?.map((timeline: any) => ({
        name: timeline?.name || '',
        duration: timeline?.duration || '',
        milestones: timeline?.milestones || []
      })) || [];
  
      this.metrics3 = res.timelines?.flatMap((timeline: any) =>
        timeline?.metrics?.map((metric: any) => ({
          name: metric?.name || '',
          targetValue: parseFloat(metric?.target_value) || 0,
          actualValue: parseFloat(metric?.actual_value) || 0
        })) || []
      ) || [];
    }, (error) => {
      alert("حدث خطأ أثناء جلب البيانات. يرجى المحاولة مرة أخرى.");
    });
  }
  
 
  
  


  trackByFn(index: number): number {
    return index;
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
