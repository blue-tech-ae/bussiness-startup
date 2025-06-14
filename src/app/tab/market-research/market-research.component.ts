import { Component, HostListener, OnInit } from '@angular/core';
import { ApisService } from '../../services/apis.service';

type ChallengeType = 'must' | 'should' | 'nice';
type ChallengeKey = 'MustHaveSolutions' | 'ShouldHaveSolutions' | 'NiceToHaveSolutions';

interface CustomerChallenges {
  MustHaveSolutions: Array<{ id: number; text: string }>;
  ShouldHaveSolutions: Array<{ id: number; text: string }>;
  NiceToHaveSolutions: Array<{ id: number; text: string }>;
}

@Component({
  selector: 'app-market-research',
  templateUrl: './market-research.component.html',
  styleUrls: ['./market-research.component.css']
})
export class MarketResearchComponent implements OnInit {
  videoUrl:any=""
 videoDescription=""
 isSaved=true
  customerPersona = {
    name: '',
    age: '',
    gender:'',
    socialStatus:'',
    income:'',
    employment:'',
    other:"",
     Personal_notes:"",
     defineClients: "",
     defineProblem: "",
     defineSolution: ""
  };

  customerChallenges = {
    MustHaveSolutions: [{ id: 0, text: '' }],
    ShouldHaveSolutions: [{ id: 0, text: '' }],
    NiceToHaveSolutions: [{ id: 0, text: '' }]
  };

  private challengeMap: Record<ChallengeType, ChallengeKey> = {
    'must': 'MustHaveSolutions',
    'should': 'ShouldHaveSolutions',
    'nice': 'NiceToHaveSolutions'
  };

  showButton: boolean = false;
  constructor(private apisService: ApisService) {}
  ngOnInit(): void {
    this.getVedio("Market_Research")
    this.getmarketresearch()
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

  addChallenge(type: 'must' | 'should' | 'nice') {
    const solutions = this.getSolutionsArray(type);
    const newId = solutions.length;
    solutions.push({ id: newId, text: '' });
  }

  removeChallenge(type: 'must' | 'should' | 'nice', index: number) {
    const solutions = this.getSolutionsArray(type);
    solutions.splice(index, 1);
  }

  private getSolutionsArray(type: 'must' | 'should' | 'nice') {
    switch(type) {
      case 'must':
        return this.customerChallenges.MustHaveSolutions;
      case 'should':
        return this.customerChallenges.ShouldHaveSolutions;
      case 'nice':
        return this.customerChallenges.NiceToHaveSolutions;
    }
  }

//   saveProgress() {
//     const formData = {
//       name: this.customerPersona.name || "", // التأكد من وجود القيمة أو تركها فارغة
//       age: this.customerPersona.age || "", // نفس الشيء مع العمر
//       gender: this.customerPersona.gender || "", // نفس الشيء مع الجنس
//       income: this.customerPersona.income || "", // نفس الشيء مع الدخل
//       education: "", // يمكن تعديل هذا وفقاً للقيمة المطلوبة
//       employment: this.customerPersona.employment || "", // نفس الشيء مع الوظيفة
//       other: this.customerPersona.other || "", // نفس الشيء مع الحقول الأخرى
//       must_have_solutions: this.customerChallenges.MustHaveSolutions?.map(solution => solution.text?.trim() || "").filter(solution => solution) || [], // معالجة الحلول المطلوبة
//       should_have_solutions: this.customerChallenges.ShouldHaveSolutions?.map(solution => solution.text?.trim() || "").filter(solution => solution) || [], // معالجة الحلول الممكنة
//       nice_to_have_solutions: this.customerChallenges.NiceToHaveSolutions?.map(solution => solution.text?.trim() || "").filter(solution => solution) || [], // الحلول الجيدة لكنها ليست ضرورية
//       nots: this.customerPersona.Personal_notes ? this.customerPersona.Personal_notes.split('\n').map(note => note.trim()).filter(note => note) : [], // معالجة الملاحظات الشخصية
//       solution: Array.isArray(this.customerPersona.defineSolution) ? this.customerPersona.defineSolution.map(solution => solution.trim()) : [], // الحلول المحددة
//       problem: Array.isArray(this.customerPersona.defineProblem) ? this.customerPersona.defineProblem.map(problem => problem.trim()) : [], // المشاكل المحددة
//       help_persona: Array.isArray(this.customerPersona.defineClients) ? this.customerPersona.defineClients.map(help => help.trim()) : [] // العملاء الذين سيستفيدون من الحل
//     };
    
  
// console.log(formData  +"component")
//     this.apisService.saveMarketResearch(formData).subscribe({
//       next: (response) => {
//        this.getmarketresearch()
// //console.log('Market research data saved successfully:', response);
//         alert('Data has been saved successfully.');
//       },
//       error: (error) => {
//         alert("Error saving data. Please check your input.")
//       }
//     });
//   }
// saveProgress() {
//   const formData = {
//     target_customer_name: this.customerPersona.name || "", // 👈 هنا لازم يكون target_customer_name
//     age: this.customerPersona.age ? this.customerPersona.age.toLowerCase() : "", // 👈 تحويل العمر إلى lowercase نصًا وليس رقم
//     gender: this.customerPersona.gender || "",
//     income: this.customerPersona.income || "",
//     education:  "", // 👈 أنت كنت حاطط "" ثابت، لازم ناخذه من البيانات
//     employment: this.customerPersona.employment || "",
//     other: this.customerPersona.other || "",
    
//     must_have_solutions: this.customerChallenges.MustHaveSolutions?.map(solution => solution.text?.trim() || "").filter(solution => solution) || [], 
//     should_have_solutions: this.customerChallenges.ShouldHaveSolutions?.map(solution => solution.text?.trim() || "").filter(solution => solution) || [], 
//     nice_to_have_solutions: this.customerChallenges.NiceToHaveSolutions?.map(solution => solution.text?.trim() || "").filter(solution => solution) || [], 
    
//     nots: this.customerPersona.Personal_notes 
//       ? this.customerPersona.Personal_notes.split('\n').map(note => note.trim()).filter(note => note) 
//       : [], 
    
//     solution: Array.isArray(this.customerPersona.defineSolution) 
//       ? this.customerPersona.defineSolution.map(solution => solution.trim()).filter(solution => solution) 
//       : [], 
    
//     problem: Array.isArray(this.customerPersona.defineProblem) 
//       ? this.customerPersona.defineProblem.map(problem => problem.trim()).filter(problem => problem) 
//       : [], 
    
//     help_persona: Array.isArray(this.customerPersona.defineClients) 
//       ? this.customerPersona.defineClients.map(help => help.trim()).filter(help => help) 
//       : [] 
//   };

//   console.log("Form Data to be sent: ", formData); // تحقق من الشكل النهائي قبل الإرسال

//   // إرسال البيانات إلى السيرفر
//   this.apisService.saveMarketResearch(formData).subscribe({
//     next: (response) => {
//       this.getmarketresearch(); // تحديث بيانات البحث بعد الحفظ
//       alert('Data has been saved successfully.');
//     },
//     error: (error) => {
//       alert("Error saving data. Please check your input.");
//     }
//   });
// }
saveProgress() {
  const formData = {
    target_customer_name: this.customerPersona.name || "",
    age: this.customerPersona.age || "",
    gender: this.customerPersona.gender?.toLowerCase() || "",
    income: this.customerPersona.income?.toLowerCase() || "",
    education: "",
    employment: this.customerPersona.employment || "",
    other: this.customerPersona.other || "",
    
    must_have_solutions: (this.customerChallenges.MustHaveSolutions || [])
      .map(solution => solution.text?.trim() || "")
      .filter(item => item) || [],
    
    should_have_solutions: (this.customerChallenges.ShouldHaveSolutions || [])
      .map(solution => solution.text?.trim() || "")
      .filter(item => item) || [],
    
    nice_to_have_solutions: (this.customerChallenges.NiceToHaveSolutions || [])
      .map(solution => solution.text?.trim() || "")
      .filter(item => item) || [],
    
    nots: (this.customerPersona.Personal_notes || "")
      .split('\n')
      .map(note => note.trim())
      .filter(note => note),
    
    solution: (this.customerPersona.defineSolution || "")
      .split('\n')
      .map(item => item.trim())
      .filter(item => item),
    
    problem: (this.customerPersona.defineProblem || "")
      .split('\n')
      .map(item => item.trim())
      .filter(item => item),
    
    help_persona: (this.customerPersona.defineClients || "")
      .split('\n')
      .map(item => item.trim())
      .filter(item => item)
  };

 // console.log("Form Data to be sent: ", formData); // تحقق من الشكل النهائي قبل الإرسال

  // إرسال البيانات إلى السيرفر
  this.apisService.saveMarketResearch(formData).subscribe({
    next: (response) => {
      this.getmarketresearch();
      alert('Data has been saved successfully.');
    },
    error: (error) => {
      console.log(error)
      alert("Error saving data. Please check your input.");
    }
  });
}






  updateProgress() {
    const formData = {
      target_customer_name: this.customerPersona.name || "",
      age: this.customerPersona.age || "",
      gender: this.customerPersona.gender?.toLowerCase() || "",
      income: this.customerPersona.income?.toLowerCase() || "",
      education: "",
      employment: this.customerPersona.employment || "",
      other: this.customerPersona.other || "",
      
      must_have_solutions: (this.customerChallenges.MustHaveSolutions || [])
        .map(solution => solution.text?.trim() || "")
        .filter(item => item) || [],
      
      should_have_solutions: (this.customerChallenges.ShouldHaveSolutions || [])
        .map(solution => solution.text?.trim() || "")
        .filter(item => item) || [],
      
      nice_to_have_solutions: (this.customerChallenges.NiceToHaveSolutions || [])
        .map(solution => solution.text?.trim() || "")
        .filter(item => item) || [],
      
      nots: (this.customerPersona.Personal_notes || "")
        .split('\n')
        .map(note => note.trim())
        .filter(note => note),
      
      solution: (this.customerPersona.defineSolution || "")
        .split('\n')
        .map(item => item.trim())
        .filter(item => item),
      
      problem: (this.customerPersona.defineProblem || "")
        .split('\n')
        .map(item => item.trim())
        .filter(item => item),
      
      help_persona: (this.customerPersona.defineClients || "")
        .split('\n')
        .map(item => item.trim())
        .filter(item => item)
    };

    this.apisService.updateMarketResearch(formData).subscribe({
      next: (response) => {
        this.getmarketresearch()
//console.log('Market research data saved successfully:', response);
        alert('Data has been updated successfully.');
      },
      error: (error) => {
        console.log(error)
        alert("Error updating data. Please check your input.")
        this.getmarketresearch()

      }
    });
  }

     
        





 getmarketresearch() {
  this.apisService.getMarketResearch().subscribe((res: any) => {
    console.log(res)
  
    if (res&& Object.keys(res).length > 0) {
      localStorage.setItem("idmreaserch",res.id)
      console.log(res)
      this.isSaved=false
      const data = res;

      // تعبئة customerPersona
      this.customerPersona = {
        name: data.target_customer_name || '',
        age: data.age || '',
        gender: data.gender || '' ,
        socialStatus: data.social_status || '', // لو في داتا جاهزة له
        income: data.income || '' ,
        employment: data.employment || '',
        other: data.other || '',
        Personal_notes: Array.isArray(data.nots) ? data.nots.join(', ') : '',
        defineClients: Array.isArray(data.help_persona) ? data.help_persona.join(', ') : '',
        defineProblem: Array.isArray(data.problem) ? data.problem.join(', ') : '',
        defineSolution: Array.isArray(data.solution) ? data.solution.join(', ') : ''
      };

      // تعبئة customerChallenges
      this.customerChallenges = {
        MustHaveSolutions: Array.isArray(data.must_have_solutions) 
          ? data.must_have_solutions.map((text: string, index: number) => ({ id: index, text })) 
          : [{ id: 0, text: '' }],
          
        ShouldHaveSolutions: Array.isArray(data.should_have_solutions) 
          ? data.should_have_solutions.map((text: string, index: number) => ({ id: index, text })) 
          : [{ id: 0, text: '' }],
          
        NiceToHaveSolutions: Array.isArray(data.nice_to_have_solutions) 
          ? data.nice_to_have_solutions.map((text: string, index: number) => ({ id: index, text })) 
          : [{ id: 0, text: '' }]
      };
      
      
    }else{
      this.isSaved=true 
    }
  }, error => {
    console.error('Error fetching market research data:', error);
  });
}


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
    this.customerPersona = {
      name: 'Sarah',
      age: 'Young',
      gender: 'Female',
      socialStatus: 'Single',
      income: 'Medium',
      employment: 'Full-time',
      other: 'Lives in city',
      Personal_notes: 'Likes eco friendly products',
      defineClients: 'Young professionals',
      defineProblem: 'Limited healthy lunch options',
      defineSolution: 'Affordable healthy meal delivery'
    };

    this.customerChallenges = {
      MustHaveSolutions: [{ id: 0, text: 'Affordable price' }],
      ShouldHaveSolutions: [{ id: 0, text: 'Fast delivery' }],
      NiceToHaveSolutions: [{ id: 0, text: 'Vegan options' }]
    };
  }

}
