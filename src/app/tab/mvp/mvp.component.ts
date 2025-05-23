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

  //  mvp = {
  //   big_solution: "",
  //   entry_strategy: "",
  //   things: "",
  //   validation_questions: "",
  //   future_plan: "",
  //   notes: ""
  // };
  mvp = {
    big_solution: "",
    entry_strategy: "",
    things_have: "",
    things_need: "",
    questions:"",
    answer_questions: "",
    future_plan: "",
    notes: ""
  };
  
  
  
 videoUrl:any=""
 videoDescription="" 

  constructor(private apisService: ApisService,private dialog: MatDialog) {}
  ngOnInit(): void {
    this.getVedio("Start_Simple");
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
        
        things: {
          have: this.mvp.things_have
            ? this.mvp.things_have.split('\n').filter(line => line.trim()).map(line => line.trim())
            : [],
          need: this.mvp.things_need
            ? this.mvp.things_need.split('\n').filter(line => line.trim()).map(line => line.trim())
            : [],
        },
        
        validation_questions: {
          questions: this.mvp.questions
            ? this.mvp.questions.split('\n').filter(line => line.trim()).map(line => line.trim())
            : [],
          answer_questions: this.mvp.answer_questions
            ? this.mvp.answer_questions.split('\n').filter(line => line.trim()).map(line => line.trim())
            : [],
        },
        
        future_plan: {
          step1: this.mvp.future_plan
            ? this.mvp.future_plan.split('\n').filter(line => line.trim()).map(line => line.trim())
            : [],
        },
        
        notes: this.mvp.notes
          ? this.mvp.notes.split('\n').filter(line => line.trim()).map(line => line.trim())
          : []
      };
      
      this.apisService.saveStartSample(formData).subscribe({
        next: (res) => {
          alert('Data has been saved successfully.');
          this.getmvp();
        },
        error: (error) => {
          console.error('Error saving start sample:', error);
          alert('Data has not been saved successfully.')
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
        
        things: {
          have: this.mvp.things_have
            ? this.mvp.things_have.split('\n').filter(line => line.trim()).map(line => line.trim())
            : [],
          need: this.mvp.things_need
            ? this.mvp.things_need.split('\n').filter(line => line.trim()).map(line => line.trim())
            : [],
        },
        
        validation_questions: {
          questions: this.mvp.questions
            ? this.mvp.questions.split('\n').filter(line => line.trim()).map(line => line.trim())
            : [],
          answer_questions: this.mvp.answer_questions
            ? this.mvp.answer_questions.split('\n').filter(line => line.trim()).map(line => line.trim())
            : [],
        },
        
        future_plan: {
          step1: this.mvp.future_plan
            ? this.mvp.future_plan.split('\n').filter(line => line.trim()).map(line => line.trim())
            : [],
        },
        
        notes: this.mvp.notes
          ? this.mvp.notes.split('\n').filter(line => line.trim()).map(line => line.trim())
          : []
      };
      
    this.apisService.updateStartSample(formData).subscribe({
      next: (res) => {
       // console.log(res);
       alert('Data has been updated successfully.');
        this.getmvp()
    
      
        // يمكنك إضافة منطق إضافي بعد الاستلام بنجاح مثل تحديث واجهة المستخدم
      },
      error: (error) => {
       // console.error('Error updating start sample:', error);
        // التعامل مع الخطأ مثل إظهار رسالة للمستخدم
        alert('Data has not been  updated successfully.');
      }
    });
    }

    getmvp() {
      this.apisService.getStartSample().subscribe((res) => {
        console.log(res);
        if (res && Object.keys(res).length > 0) {
          this.isSaved = false;
          const mvpData = res;
          localStorage.setItem("mvpid", res.id.toString());
    
          // ربط البيانات مع الموديل مع معالجة التحويل من array إلى string
          this.mvp = {
            big_solution: mvpData.big_solution && mvpData.big_solution.length > 0 ? mvpData.big_solution.join('\n') : "",
            entry_strategy: mvpData.entry_strategy && mvpData.entry_strategy.length > 0 ? mvpData.entry_strategy.join('\n') : "",
            things_have: mvpData.things?.have && mvpData.things.have.length > 0 ? mvpData.things.have.join('\n') : "",
            things_need: mvpData.things?.need && mvpData.things.need.length > 0 ? mvpData.things.need.join('\n') : "",
            questions: mvpData.validation_questions?.questions && mvpData.validation_questions.questions.length > 0 ? mvpData.validation_questions.questions.join('\n') : "",
            answer_questions: mvpData.validation_questions?.answer_questions && mvpData.validation_questions.answer_questions.length > 0 ? mvpData.validation_questions.answer_questions.join('\n') : "",
            future_plan: mvpData.future_plan?.step1 && mvpData.future_plan.step1.length > 0 ? mvpData.future_plan.step1.join('\n') : "",
            notes: mvpData.notes && mvpData.notes.length > 0 ? mvpData.notes.join('\n') : "",
          };
          
        } else {
          this.isSaved = true;
          // إعادة تعيين الحقول إلى نص فارغ في حال عدم وجود بيانات
          this.mvp = {
            big_solution: "",
            entry_strategy: "",
            things_have: "",
            things_need: "",
            questions: "",
            answer_questions: "",
            future_plan: "",
            notes: ""
          };
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
     
       question: `How can I enter the market in the most simple way?`,
       big_solution:this.mvp.big_solution,
       entry_strategy:"",
       things_have:"",
       things_need: ""
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
     
       question: "To create this simple solution I  will use what will I have: List things you already have",
       big_solution:this.mvp.big_solution,
       entry_strategy:this.mvp.entry_strategy,
       things_have:"",
       things_need: ""
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
    
     this.mvp.things_have=result
    }
  });

}
openSuggestionDialog3() {
  const dialogRef = this.dialog.open(MvpSuggestionComponent, {
    data: {
     
       question: "and I will get what I need for this information :List things you must get to start",
       big_solution:this.mvp.big_solution,
       entry_strategy:this.mvp.entry_strategy,
       things_have:this.mvp.things_have,
       things_need: ""

    }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
    
     this.mvp.things_need=result
    }
  });

}
openValidationSuggestions() {
  const dialogRef = this.dialog.open(MvpSuggestionComponent, {
    data: {
      question: ` Generate four critical questions that must be answered to validate whether this solution will work in practice. Also, suggest
       how each question could be answered (e.g., user interviews, experiments, market research) Based on the 
       following information: in 20 words for each question`,
      big_solution:this.mvp.big_solution,
      entry_strategy:this.mvp.entry_strategy,
      things_have:this.mvp.things_have,
      things_need: this.mvp.things_need
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.mvp.questions = result;
    }
  });
}
openSuggestionDialog4() {
  const dialogRef = this.dialog.open(MvpSuggestionComponent, {
    data: {
     
       question: "how will you find answers to those questions?",
       big_solution:"",
       entry_strategy:"",
       things_have:"",
       things_need: "",
       answer_questions:this.mvp.answer_questions
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
    
     this.mvp.answer_questions=result
    }
  });

}

}
