import { Component, HostListener, OnInit } from '@angular/core';
import { ApisService } from '../../services/apis.service';

interface Task {
  category: string;
  task: string;
  dueDate: string;
  status: 'Not Started' | 'In Progress' | 'Completed';
  assignee: string;
  notes: string;
}

interface MarketingActivity {
  activity: string;
  timeline: string;
  budget: number;
  status: 'Planned' | 'In Progress' | 'Completed';
  metrics: string[];
}

interface Risk {
  description: string;
  impact: 'Low' | 'Medium' | 'High';
  probability: 'Low' | 'Medium' | 'High';
  mitigationStrategies: string[];
  contingencyPlan: string;
}

interface Milestone {
  description: string;
  dueDate: string;
  status: 'Not Started' | 'In Progress' | 'Completed';
  dependencies: string[];
}

@Component({
  selector: 'app-launch-prepration',
  templateUrl: './launch-prepration.component.html',
  styleUrls: ['./launch-prepration.component.css']
})
export class LaunchPreprationComponent implements OnInit {
  videoUrl:any=""
 videoDescription=""
 isSaved=true
 
  constructor(private apisService: ApisService) {}
  ngOnInit(): void {
    this.getVedio("Launch Preparation")
    this.getLaunch()
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  getVedio(title:any){
    this.apisService.GetVedio(title).subscribe((response)=>{
     // console.log(response.data[0].video_path)
     // console.log(response.data[0].description)
      this.videoUrl=response.data[0].video_path
      this.videoDescription=response.data[0].description

      
    })
  }
  // Launch Checklist
  tasks: Task[] = [{
    category: '',
    task: '',
    dueDate: '',
    status: 'Not Started',
    assignee: '',
    notes: ''
  }];

  // Marketing Activities
  marketingActivities: MarketingActivity[] = [{
    activity: '',
    timeline: '',
    budget: 0,
    status: 'Planned',
    metrics: ['']
  }];

  // Risk Assessment
  risks: Risk[] = [{
    description: '',
    impact: 'Low',
    probability: 'Low',
    mitigationStrategies: [''],
    contingencyPlan: ''
  }];

  // Launch Milestones
  milestones: Milestone[] = [{
    description: '',
    dueDate: '',
    status: 'Not Started',
    dependencies: ['']
  }];

  statusOptions = ['Not Started', 'In Progress', 'Completed'];
  marketingStatusOptions = ['Planned', 'In Progress', 'Completed'];
  impactOptions = ['Low', 'Medium', 'High'];
  probabilityOptions = ['Low', 'Medium', 'High'];


  // Task Methods
  addTask() {
    this.tasks.push({
      category: '',
      task: '',
      dueDate: '',
      status: 'Not Started',
      assignee: '',
      notes: ''
    });
  }

  removeTask(index: number) {
    this.tasks.splice(index, 1);
  }

  // Marketing Activity Methods
  addMarketingActivity() {
    this.marketingActivities.push({
      activity: '',
      timeline: '',
      budget: 0,
      status: 'Planned',
      metrics: ['']
    });
  }

  removeMarketingActivity(index: number) {
    this.marketingActivities.splice(index, 1);
  }

  addMetric(activityIndex: number) {
    this.marketingActivities[activityIndex].metrics.push('');
  }

  removeMetric(activityIndex: number, metricIndex: number) {
    this.marketingActivities[activityIndex].metrics.splice(metricIndex, 1);
  }

  // Risk Methods
  addRisk() {
    this.risks.push({
      description: '',
      impact: 'Low',
      probability: 'Low',
      mitigationStrategies: [''],
      contingencyPlan: ''
    });
  }

  removeRisk(index: number) {
    this.risks.splice(index, 1);
  }

  addMitigationStrategy(riskIndex: number) {
    this.risks[riskIndex].mitigationStrategies.push('');
  }

  removeMitigationStrategy(riskIndex: number, strategyIndex: number) {
    this.risks[riskIndex].mitigationStrategies.splice(strategyIndex, 1);
  }
  trackByIndex(index: number, item: any): number {
    return index;
  }
  // Milestone Methods
  addMilestone() {
    this.milestones.push({
      description: '',
      dueDate: '',
      status: 'Not Started',
      dependencies: ['']
    });
  }

  removeMilestone(index: number) {
    this.milestones.splice(index, 1);
  }

  addDependency(milestoneIndex: number) {
    this.milestones[milestoneIndex].dependencies.push('');
  }

  removeDependency(milestoneIndex: number, dependencyIndex: number) {
    this.milestones[milestoneIndex].dependencies.splice(dependencyIndex, 1);
  }

  saveProgress() {
    // const formData = {
    //   LaunchChecklist: this.tasks.filter(task => 
    //     task.category.trim() || 
    //     task.task.trim() || 
    //     task.assignee.trim() ||  
    //     task.notes.trim()
    //   ),
    //   MarketingActivities: this.marketingActivities.filter(activity => 
    //     activity.activity.trim() || 
    //     activity.timeline.trim() || 
    //     activity.budget > 0 || 
    //     activity.metrics.some(m => m.trim())
    //   ),
    //   RiskAssessment: this.risks.filter(risk => 
    //     risk.description.trim() || 
    //     risk.mitigationStrategies.some(s => s.trim()) ||
    //     risk.contingencyPlan.trim()
    //   ),
    //   LaunchMilestones: this.milestones.filter(milestone => 
    //     milestone.description.trim() || 
    //     milestone.dueDate || 
    //     milestone.dependencies.some(d => d.trim())
    //   )
    // };
    const formData = {
      LaunchChecklist: (this.tasks || []).filter(task => 
          (task?.category?.trim() || "") || 
          (task?.task?.trim() || "") || 
          (task?.assignee?.trim() || "") || 
          (task?.notes?.trim() || "")
      ).map(task => ({
          category: task?.category || "Uncategorized",
          task: task?.task || "Untitled",
          due_date: task?.dueDate || "",
          status: task?.status || "Pending",
          assignee: task?.assignee || "Unknown",
          notes: task?.notes || ""
      })),

      MarketingActivities: (this.marketingActivities || []).filter(activity => 
          (activity?.activity?.trim() || "") || 
          (activity?.timeline?.trim() || "") || 
          (activity?.budget > 0) || 
          (activity?.metrics || []).some(m => (m?.trim() || ""))
      ).map(activity => ({
          activity: activity?.activity || "Unnamed Activity",
          timeline: activity?.timeline || "Unknown",
          budget: Number(activity?.budget) || 0,
          status: activity?.status || "Pending",
          metrics: (activity?.metrics || []).filter(m => m?.trim() || "")
      })),

      RiskAssessment: (this.risks || []).filter(risk => 
          (risk?.description?.trim() || "") || 
          (risk?.mitigationStrategies || []).some(s => (s?.trim() || "")) ||
          (risk?.contingencyPlan?.trim() || "")
      ).map(risk => ({
          description: risk?.description || "No description",
          impact: risk?.impact || "Unknown",
          probability: risk?.probability || "Unknown",
          mitigation_strategies: (risk?.mitigationStrategies || []).filter(s => s?.trim() || ""),
          contingency_plan: risk?.contingencyPlan || "No contingency plan"
      })),

      LaunchMilestones: (this.milestones || []).filter(milestone => 
          (milestone?.description?.trim() || "") || 
          (milestone?.dueDate || "") || 
          (milestone?.dependencies || []).some(d => (d?.trim() || ""))
      ).map(milestone => ({
          description: milestone?.description || "No description",
          due_date: milestone?.dueDate || "",
          status: milestone?.status || "Pending",
          dependencies: (milestone?.dependencies || []).filter(d => d?.trim() || "")
      }))
  };
    this.apisService.saveLaunchPreparation(formData).subscribe({
      next: (response) => {
        this.getLaunch()
//console.log('Launch preparation data saved successfully:', response);
        alert('Data has been saved successfully.');
      },
      error: (error) => {
        this.getLaunch()
        alert("Error saving data. Please check your input.") 
      }
    });
  }
  updateProgress() {
    // const formData = {
    //   LaunchChecklist: this.tasks.filter(task => 
    //     task.category.trim() || 
    //     task.task.trim() || 
    //     task.assignee.trim() || 
    //     task.notes.trim()
    //   ),
    //   MarketingActivities: this.marketingActivities.filter(activity => 
    //     activity.activity.trim() || 
    //     activity.timeline.trim() || 
    //     activity.budget > 0 || 
    //     activity.metrics.some(m => m.trim())
    //   ),
    //   RiskAssessment: this.risks.filter(risk => 
    //     risk.description.trim() || 
    //     risk.mitigationStrategies.some(s => s.trim()) ||
    //     risk.contingencyPlan.trim()
    //   ),
    //   LaunchMilestones: this.milestones.filter(milestone => 
    //     milestone.description.trim() || 
    //     milestone.dueDate || 
    //     milestone.dependencies.some(d => d.trim())
    //   )
    // };
    const formData = {
      LaunchChecklist: (this.tasks || []).filter(task => 
          (task?.category?.trim() || "") || 
          (task?.task?.trim() || "") || 
          (task?.assignee?.trim() || "") || 
          (task?.notes?.trim() || "")
      ).map(task => ({
          category: task?.category || "Uncategorized",
          task: task?.task || "Untitled",
          due_date: task?.dueDate || "",
          status: task?.status || "Pending",
          assignee: task?.assignee || "Unknown",
          notes: task?.notes || ""
      })),

      MarketingActivities: (this.marketingActivities || []).filter(activity => 
          (activity?.activity?.trim() || "") || 
          (activity?.timeline?.trim() || "") || 
          (activity?.budget > 0) || 
          (activity?.metrics || []).some(m => (m?.trim() || ""))
      ).map(activity => ({
          activity: activity?.activity || "Unnamed Activity",
          timeline: activity?.timeline || "Unknown",
          budget: Number(activity?.budget) || 0,
          status: activity?.status || "Pending",
          metrics: (activity?.metrics || []).filter(m => m?.trim() || "")
      })),

      RiskAssessment: (this.risks || []).filter(risk => 
          (risk?.description?.trim() || "") || 
          (risk?.mitigationStrategies || []).some(s => (s?.trim() || "")) ||
          (risk?.contingencyPlan?.trim() || "")
      ).map(risk => ({
          description: risk?.description || "No description",
          impact: risk?.impact || "Unknown",
          probability: risk?.probability || "Unknown",
          mitigation_strategies: (risk?.mitigationStrategies || []).filter(s => s?.trim() || ""),
          contingency_plan: risk?.contingencyPlan || "No contingency plan"
      })),

      LaunchMilestones: (this.milestones || []).filter(milestone => 
          (milestone?.description?.trim() || "") || 
          (milestone?.dueDate || "") || 
          (milestone?.dependencies || []).some(d => (d?.trim() || ""))
      ).map(milestone => ({
          description: milestone?.description || "No description",
          due_date: milestone?.dueDate || "",
          status: milestone?.status || "Pending",
          dependencies: (milestone?.dependencies || []).filter(d => d?.trim() || "")
      }))
  };

    this.apisService.updateLaunchPreparation(formData).subscribe({
      next: (response) => {
        this.getLaunch()
//console.log('Launch preparation data saved successfully:', response);
        alert('Data has been updated successfully.');
      },
      error: (error) => {
        alert("Error saving data. Please check your input.")
        this.getLaunch()
//console.log(error)
      }
    });
  }
  getLaunch() {
    this.apisService.getlaunchpreparation().subscribe((res) => {
      if (!res || Object.keys(res).length === 0) {
        this.isSaved = true;
      } else {
        localStorage.setItem("idlaunch", res.id);
        this.isSaved = false;
       
  
        // إسناد البيانات القادمة إلى المتغيرات المناسبة
        this.tasks = res.launch_checklists?.map((task: any) => ({
          category: task.category,
          task: task.task,
          dueDate: task.due_date,
          status: task.status,
          assignee: task.assignee,
          notes: task.notes
        })) || [];
  
        this.marketingActivities = res.marketing_activities?.map((activity: any) => ({
          activity: activity.activity,
          timeline: activity.timeline,
          budget: parseFloat(activity.budget),
          status: activity.status,
          metrics: activity.metrics
        })) || [];
  
        this.risks = res.risk_assessments?.map((risk: any) => ({
          description: risk.description,
          impact: risk.impact,
          probability: risk.probability,
          mitigationStrategies: risk.mitigation_strategies,
          contingencyPlan: risk.contingency_plan
        })) || [];
  
        this.milestones = res.launch_milestones?.map((milestone: any) => ({
          description: milestone.description,
          dueDate: milestone.due_date,
          status: milestone.status,
          dependencies: milestone.dependencies
        })) || [];
      }
    });
  } 
  showButton: boolean = false;
  @HostListener("window:scroll", [])
    onScroll(): void {
      this.showButton = window.scrollY > 200; // إظهار الزر عند التمرير أكثر من 200px
    }
  
    // دالة التمرير إلى الأعلى
    scrollToTop(): void {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  
  // getLaunch() {
  //   this.apisService.getlaunchpreparation().subscribe((res) => {
  //     localStorage.setItem("idlaunch",res.id);
  //     this.isSaved=false
  //     this.isUpdate=true
  //    // console.log(res)
  //     // إسناد البيانات القادمة إلى المتغيرات المناسبة
  //     this.tasks = res.launch_checklists.map((task: any) => ({
  //       category: task.category,
  //       task: task.task,
  //       dueDate: task.due_date,
  //       status: task.status,
  //       assignee: task.assignee,
  //       notes: task.notes
  //     }));

  //     this.marketingActivities = res.marketing_activities.map((activity: any) => ({
  //       activity: activity.activity,
  //       timeline: activity.timeline,
  //       budget: parseFloat(activity.budget),
  //       status: activity.status,
  //       metrics: activity.metrics
  //     }));

  //     this.risks = res.risk_assessments.map((risk: any) => ({
  //       description: risk.description,
  //       impact: risk.impact,
  //       probability: risk.probability,
  //       mitigationStrategies: risk.mitigation_strategies,
  //       contingencyPlan: risk.contingency_plan
  //     }));

  //     this.milestones = res.launch_milestones.map((milestone: any) => ({
  //       description: milestone.description,
  //       dueDate: milestone.due_date,
  //       status: milestone.status,
  //       dependencies: milestone.dependencies
  //     }));
  //   });
  // }
}
