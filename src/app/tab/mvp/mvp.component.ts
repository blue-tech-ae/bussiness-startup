import { Component, HostListener, OnInit } from '@angular/core';
import { ApisService } from '../../services/apis.service';
import { MatDialog } from '@angular/material/dialog';
import { MvpSuggestionComponent } from 'src/app/components/mvp-suggestion/mvp-suggestion.component';
@Component({
  selector: 'app-mvp',
  templateUrl: './mvp.component.html',
  styleUrls: ['./mvp.component.css']
})
export class MvpComponent implements OnInit {

isSaved=true

   mvp = {
    big_solution: "",
    entry_strategy: "",
    things: "",
    validation_questions: "",
    future_plan: "",
    notes: ""
  };
  
 videoUrl:any=""
 videoDescription="" 

  constructor(private apisService: ApisService,private dialog: MatDialog) {}
  ngOnInit(): void {
    this.getVedio("MVP Development");
    this.getmvp()
    window.scrollTo({ top: 0, behavior: "smooth" });
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
    getVedio(title:any){
      this.apisService.GetVedio(title).subscribe((response)=>{
  
        this.videoUrl=response.data[0].video_path
        this.videoDescription=response.data[0].description
  
        
      })
    }

    saveMVP(){
      const formData = {
    
          big_solution: this.mvp.big_solution
            ? this.mvp.big_solution.split('\n').filter(line => line.trim()).map(line => line.trim())
            : [],
          entry_strategy: this.mvp.entry_strategy
            ? this.mvp.entry_strategy.split('\n').filter(line => line.trim()).map(line => line.trim())
            : [],
          things: this.mvp.things
            ? this.mvp.things.split('\n').filter(line => line.trim()).map(line => line.trim())
            : [],
          validation_questions: this.mvp.validation_questions
            ? this.mvp.validation_questions.split('\n').filter(line => line.trim()).map(line => line.trim())
            : [],
          future_plan: this.mvp.future_plan
            ? this.mvp.future_plan.split('\n').filter(line => line.trim()).map(line => line.trim())
            : [],
          notes: this.mvp.notes
            ? this.mvp.notes.split('\n').filter(line => line.trim()).map(line => line.trim())
            : []
        
      };
     
      this.apisService.saveStartSample(formData).subscribe({
        next: (res) => {
         // console.log(res);
         alert('Data has been saved successfully.');
          this.getmvp()
          // يمكنك إضافة منطق إضافي بعد الاستلام بنجاح مثل تحديث واجهة المستخدم
        },
        error: (error) => {
          console.error('Error saving start sample:', error);
          // التعامل مع الخطأ مثل إظهار رسالة للمستخدم
        }
      });

    }

    updatemvp(){
      const formData = {
    
        big_solution: this.mvp.big_solution
          ? this.mvp.big_solution.split('\n').filter(line => line.trim()).map(line => line.trim())
          : [],
        entry_strategy: this.mvp.entry_strategy
          ? this.mvp.entry_strategy.split('\n').filter(line => line.trim()).map(line => line.trim())
          : [],
        things: this.mvp.things
          ? this.mvp.things.split('\n').filter(line => line.trim()).map(line => line.trim())
          : [],
        validation_questions: this.mvp.validation_questions
          ? this.mvp.validation_questions.split('\n').filter(line => line.trim()).map(line => line.trim())
          : [],
        future_plan: this.mvp.future_plan
          ? this.mvp.future_plan.split('\n').filter(line => line.trim()).map(line => line.trim())
          : [],
        notes: this.mvp.notes
          ? this.mvp.notes.split('\n').filter(line => line.trim()).map(line => line.trim())
          : []
      
    };
    this.apisService.updateStartSample(formData).subscribe({
      next: (res) => {
       // console.log(res);
        this.getmvp()
        alert(" data has been updated successfully");
        // يمكنك إضافة منطق إضافي بعد الاستلام بنجاح مثل تحديث واجهة المستخدم
      },
      error: (error) => {
        console.error('Error updating start sample:', error);
        // التعامل مع الخطأ مثل إظهار رسالة للمستخدم
      }
    });
    }

    getmvp() {
      this.apisService.getStartSample().subscribe((res) => {
        console.log(res)
        if (res&& Object.keys(res).length > 0) { 
          this.isSaved=false
          // ربط البيانات العائدة مع المتغيرات المناسبة
          const mvpData = res;  // البيانات العائدة من الـ API
          localStorage.setItem("mvpid",res.id)
          // ربط القيم مع المتغيرات الخاصة بالصفحة
         console.log(res.id)
          this.mvp = {
            big_solution: mvpData.big_solution && mvpData.big_solution.length > 0 ? mvpData.big_solution.join('\n') : "",  // تحويل المصفوفة إلى نص
            entry_strategy: mvpData.entry_strategy && mvpData.entry_strategy.length > 0 ? mvpData.entry_strategy.join('\n') : "",
            things: mvpData.things && mvpData.things.length > 0 ? mvpData.things.join('\n') : "",
            validation_questions: mvpData.validation_questions && mvpData.validation_questions.length > 0 ? mvpData.validation_questions.join('\n') : "",
            future_plan: mvpData.future_plan && mvpData.future_plan.length > 0 ? mvpData.future_plan.join('\n') : "",
            notes: mvpData.notes && mvpData.notes.length > 0 ? mvpData.notes.join('\n') : ""
          };
        } else {
          // إذا كانت البيانات غير موجودة، قم بتعيين قيم فارغة
         this.isSaved=true
          // this.mvp = {
          //   big_solution: "",
          //   entry_strategy: "",
          //   things: "",
          //   validation_questions: "",
          //   future_plan: "",
          //   notes: ""
          // };
        }
      }, (error) => {
        console.error("Error fetching MVP data:", error);
        // التعامل مع الخطأ مثل إظهار رسالة للمستخدم
      });
    }

    openSuggestionDialog() {
       const dialogRef = this.dialog.open(MvpSuggestionComponent, {
         data: {
          
            question: "What is my business big Solution?",
            big_solution:"",
            entry_strategy:this.mvp.entry_strategy

         }
       });
   
       dialogRef.afterClosed().subscribe(result => {
         if (result) {
         
          this.mvp.big_solution=result
         }
       });
    
}
openSuggestionDialog1() {
  const dialogRef = this.dialog.open(MvpSuggestionComponent, {
    data: {
     
       question: "How can I enter the market in the most simple way?",
       big_solution:this.mvp.big_solution,
       entry_strategy:""
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
    
     this.mvp.entry_strategy=result
    }
  });

}
openSuggestionDialog2() {
  const dialogRef = this.dialog.open(MvpSuggestionComponent, {
    data: {
     
       question: "To create this simple solution I will need:",
       big_solution:this.mvp.big_solution,
       entry_strategy:this.mvp.entry_strategy
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
    
     this.mvp.things=result
    }
  });

}
}
