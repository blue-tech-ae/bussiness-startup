import { Component, HostListener } from '@angular/core';
import { ApisService } from 'src/app/services/apis.service';

@Component({
  selector: 'app-new-business-setup',
  templateUrl: './new-business-setup.component.html',
  styleUrls: ['./new-business-setup.component.css']
})
export class NewBusinessSetupComponent {
isSaved=true;
isUpdate=false;
 videoUrl:any=""
 videoDescription=""
 businessTypes = [
 
    "Sole trader",
  "Partnership",
  "Company",
  "Not-for-Profit"
];
//  legalStructure = {
//   businessType: '',
//   requirements: [''] as string[],
 
// };
legalStructure = {
  businessType: '',
  requirements: [
    { description: '', status: '', deadline: '' }
  ] as {
    description: string;
    status: string;
    deadline: string;
  }[]
};
notes :string =""



  constructor(private apisService: ApisService) {}
  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: "smooth" });
    this.getVedio("Business_Setup")
  this. getsetup()
  
    }
  getVedio(title:any){
    this.apisService.GetVedio(title).subscribe((response)=>{
      //console.log(response)
      
      this.videoUrl=response.data[0].video_path
      this.videoDescription=response.data[0].description

      
    })
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

  fillDemoData() {
    this.legalStructure.businessType = "Company";
    this.legalStructure.requirements = [{ description: "Register business name", status: "Pending", deadline: "" }];
    this.notes = "Consider hiring an accountant.";
  }
  trackByIndex(index: number, item: any): number {
    return index;
  }
  addRequirementTask() {
    this.legalStructure.requirements.push({
      description: '',
      status: '',
      deadline: ''
    });
  }
  removeRequirementTask(index: number) {
    this.legalStructure.requirements.splice(index, 1);
  }

  save() {
    const formdata = {
      type: this.legalStructure.businessType,
      notes: {
        detail: this.notes
      },
      tasks: this.legalStructure.requirements.map(task => ({
        title: task.description,
        status: task.status,
        // نضيف deadline فقط إذا كانت موجودة
        ...(task.deadline ? { deadline: task.deadline } : {})
      }))
    };
  
    this.apisService.saveNewsetup(formdata).subscribe((res) => {
    //  console.log('تم الإرسال بنجاح', res);
      alert('Data has been saved successfully.');
      this.getsetup()
    });
  }
  
  update(){
    const formdata = {
      type: this.legalStructure.businessType,
      notes: {
        detail: this.notes
      },
      tasks: this.legalStructure.requirements.map(task => ({
        title: task.description,
        status: task.status,
        // نضيف deadline فقط إذا كانت موجودة
        ...(task.deadline ? { deadline: task.deadline } : {})
      }))
    };
  
    this.apisService.updateNewSetup(formdata).subscribe((res) => {
    //  console.log('تم الإرسال بنجاح', res);
    this.getsetup()
    console.log(res)
      alert('Data has been updated successfully.');
    }); 
  }

  getsetup() {
    this.apisService.getNewSetup().subscribe((res) => {
      console.log(res);
      if (res && Object.keys(res).length > 0){
localStorage.setItem("idsetup",res.id)
this.isSaved=false
this.legalStructure.businessType = res.type;
  
this.notes = res.notes?.detail || '';

this.legalStructure.requirements = res.tasks.map((task: any) => ({
  description: task.title,
  status: task.status,
  deadline: task.deadline || ''
}));
      }else{
        this.isSaved=true
      }
      // تعبئة البيانات في النموذج
     
    });
  }
  
  

  // Methods for Legal Structure


}
