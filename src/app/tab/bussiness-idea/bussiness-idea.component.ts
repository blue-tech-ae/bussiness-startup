import { Component, OnInit , HostListener} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IdeaSuggestionComponent } from '../../components/idea-suggestion/idea-suggestion.component';
import { ApisService } from '../../services/apis.service';
import { ActivatedRoute } from '@angular/router';
import { HelpDialogComponent } from 'src/app/help-dialog/help-dialog.component';

import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, BorderStyle } from 'docx';
import { GetAllDataService } from 'src/app/services/get-all-data.service';

interface ApiData {

  latest_business_idea: {
    passions_interests: string[];
    business_ideas: string[];
    skills_experience:string[];
    values_goals:string[];
    personal_notes:string[]
  };
}
interface BusinessIdeas {
  [key: string]: string;
}

@Component({
  selector: 'app-bussiness-idea',
  templateUrl: './bussiness-idea.component.html',
  styleUrls: ['./bussiness-idea.component.css']
})
export class BussinessIdeaComponent implements OnInit {
 videoUrl:any=""
 videoDescription=""
 isSaved=true
isupdate=false
 id=''
  businessData = { 
    Skills_Experience: '',
    Passions_Interests: '',
    Values_Goals: '',
    Personal_notes:""
  };

  businessIdeas: BusinessIdeas = {
    idea1: '',
    idea2: '',
    idea3: '',
    idea4: '',
    idea5: ''
  };

  constructor(
    private dialog: MatDialog,
    private apisService: ApisService, private route: ActivatedRoute,private getAllData:GetAllDataService
  ) {}
  ngOnInit(): void {
  
    window.scrollTo({ top: 0, behavior: "smooth" });
    this.getVedio("Business_Idea")
    this.getBussinesIdea()
    
  }

  getVedio(title:any){
    this.apisService.GetVedio(title).subscribe((response)=>{
    //  console.log(response.data[0].video_path)
    
      
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
  // saveProgress() {
  //   const skills_experience = this.businessData.Skills_Experience
  //     .split('\n')
  //     .filter(skill => skill.trim())
  //     .map(skill => skill.trim());

  //   const passions_interests = this.businessData.Passions_Interests
  //     .split('\n')
  //     .filter(passion => passion.trim())
  //     .map(passion => passion.trim());

  //   const values_goals = this.businessData.Values_Goals
  //     .split('\n')
  //     .filter(value => value.trim())
  //     .map(value => value.trim());

  //   const business_ideas = Object.values(this.businessIdeas)
  //     .filter(idea => idea.trim())
  //     .map(idea => idea.trim());

  //   const formData = {
  //     skills_experience,
  //     passions_interests,
  //     values_goals,
  //     business_ideas
  //   };

  //   this.apisService.saveBusinessIdea(formData).subscribe({
  //     next: (response) => {

  //       this.getBussinesIdea()
        
  //     //  console.log('Business idea data saved successfully:', response);
  //       alert('Data has been saved successfully.');
  //     },
  //     error: (error) => {
  //       //console.log(error)
  //       //console.error('Error saving business idea data:', error); error.message +
  //      // alert('Error saving business idea data');
  //      alert(error)
  //     }
  //   });
  // }
  saveProgress() {
    const skills_experience = this.businessData.Skills_Experience
      ? this.businessData.Skills_Experience.split('\n').filter(skill => skill.trim()).map(skill => skill.trim())
      : [];

    const passions_interests = this.businessData.Passions_Interests
      ? this.businessData.Passions_Interests.split('\n').filter(passion => passion.trim()).map(passion => passion.trim())
      : [];


    const values_goals = this.businessData.Values_Goals
      ? this.businessData.Values_Goals.split('\n').filter(value => value.trim()).map(value => value.trim())
      : [];

    const business_ideas = this.businessIdeas
      ? Object.values(this.businessIdeas).filter(idea => idea.trim()).map(idea => idea.trim())
      : [];

      const personal_notes = this.businessData.Personal_notes
      ? this.businessData.Personal_notes.split('\n').filter(passion => passion.trim()).map(passion => passion.trim())
      : [];

    const formData = {
      skills_experience,
      passions_interests,
      values_goals,
      business_ideas,
      personal_notes

    };
console.log(formData)
    this.apisService.saveBusinessIdea(formData).subscribe({
      next: (response) => {
        
        this.getBussinesIdea();
        alert('Data has been saved successfully.');
      },
      error: (error) => {
       // console.log(error)
        alert("Error saving data. Please check your input.");
        this.getBussinesIdea()
      }
    });
}

  updateProgress() {
    const skills_experience = this.businessData.Skills_Experience
      .split('\n')
      .filter(skill => skill.trim())
      .map(skill => skill.trim());

    const passions_interests = this.businessData.Passions_Interests
      .split('\n')
      .filter(passion => passion.trim())
      .map(passion => passion.trim());

    const values_goals = this.businessData.Values_Goals
      .split('\n')
      .filter(value => value.trim())
      .map(value => value.trim());

    const business_ideas = Object.values(this.businessIdeas)
      .filter(idea => idea.trim())
      .map(idea => idea.trim());
      const personal_notes = this.businessData.Personal_notes
      ? this.businessData.Personal_notes.split('\n').filter(passion => passion.trim()).map(passion => passion.trim())
      : [];

    const formData = {
      skills_experience,
      passions_interests,
      values_goals,
      business_ideas,
      personal_notes
    };

    this.apisService.updateBusinessIdea(formData).subscribe({
      next: (response) => {

        this.getBussinesIdea()
        
       //console.log('Business idea data saved successfully:', response);
        alert("Business idea data updated successfully");
      },
      error: (error) => {
//console.log(error)
        //console.error('Error saving business idea data:', error); error.message +
       // alert('Error saving business idea data');
       alert("Error updating data. Please check your input.")
       this.getBussinesIdea()
      }
    });
  }
 
 




  openSuggestionDialog(index: number) {
    const dialogRef = this.dialog.open(IdeaSuggestionComponent, {
      data: {
        skills: this.businessData.Skills_Experience,
        passions: this.businessData.Passions_Interests,
        values: this.businessData.Values_Goals
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const key = `idea${index + 1}` as keyof typeof this.businessIdeas;
        this.businessIdeas[key] = result;
      }
    });
  }
  openDialog1(){
    const dialogRef = this.dialog.open(HelpDialogComponent, {
      data: {
        skills: `
          <strong>Purpose:</strong> Help users understand their core strengths, experiences, and what they bring to the table.<br><br>
          <strong>Guiding Questions & Prompts:</strong><br>
          <u>Jobs You’ve Done in the Past:</u><br>
          - Which roles and responsibilities did you have in these jobs?<br>
          - What specific skills (technical or soft) did you develop while working there?<br>
          - Were there any achievements or notable successes during each role?<br><br>
          <u>Things You Are Really Good At:</u><br>
          - When do people naturally come to you for help or advice?<br>
          - Which tasks do you find you can complete easily—even if they might be challenging for others?<br>
          - Are there any certifications, qualifications, or formal training you’ve completed?<br><br>
          <strong>Reflection:</strong><br>
          - Summarize the top 3–5 skills you feel most confident about.<br>
          - Identify which skills you enjoy using the most and which you do not.<br>
        `
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        
      }
    });
  }
  openDialog2(){
    const dialogRef = this.dialog.open(HelpDialogComponent, {
      data: {
        skills:  `
        <strong>Purpose:</strong> Encourage users to explore personal interests that could become the basis for (or an inspiration to) their business idea.<br><br>
        
        <strong>Guiding Questions & Prompts:</strong><br>
        <u>Things You Enjoy Doing:</u><br>
        - Which activities do you look forward to in your free time?<br>
        - What could you do for hours without noticing the time?<br>
        - If money or time were no object, how would you spend your days?<br><br>
        
        <u>Creative Outlets or Personal Projects:</u><br>
        - Do you have any side projects, blog, or craft hobbies that you love working on?<br>
        - Have you ever taught or shared your hobby with others (e.g., tutorials, workshops)?<br>
        - Which aspects of these hobbies bring you the most satisfaction or joy?<br><br>
        
        <strong>Reflection:</strong><br>
        - Notice how your hobbies intersect with your skills or areas of expertise.<br>
        - Identify if any of these passions have an existing audience or market demand—potentially an opportunity for a business idea.<br>
      `
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        
      }
    });
  }
  openDialog3(){
    const dialogRef = this.dialog.open(HelpDialogComponent, {
      data: {
        skills:   `
        <strong>Purpose:</strong> Uncover deeper motivations, social causes, or areas where the user might want to make a positive impact.<br><br>
        
        <strong>Guiding Questions & Prompts:</strong><br>
        <u>Social Causes or Global Issues:</u><br>
        - Which news stories or social issues do you find yourself talking about often?<br>
        - If you had the power to change something in the world, what would it be?<br>
        - Are there non-profits, charities, or community initiatives you follow or support?<br><br>
        
        <u>Areas of Advocacy or Interest:</u><br>
        - Do you regularly volunteer or donate to certain causes? Why do they resonate with you?<br>
        - Have you personally faced challenges that you now feel compelled to help others overcome?<br>
        - Is there a particular community or demographic you feel a connection to and want to serve?<br><br>
        
        <strong>Reflection:</strong><br>
        - Think about whether these issues align with your strengths and passions.<br>
        - Consider if there’s a gap or unmet need that you could address through a product, service, or social enterprise.<br>
      `
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        
      }
    });
  }
//   getBussinesIdea() {
//     this.apisService.getBussinessIdea().subscribe((res) => {
//       if (res) {
//        // console.log(res)
//         // تحويل المصفوفات إلى نصوص مفصولة بأسطر جديدة
//         this.businessData.Skills_Experience = res.skills_experience?.join("\n") || "";
//         this.businessData.Passions_Interests = res.passions_interests?.join("\n") || "";
//         this.businessData.Values_Goals = res.values_goals?.join("\n") || "";
  
//         // التعامل مع الأفكار التجارية بشكل آمن
//         this.businessIdeas['idea1'] = res.business_ideas?.[0] || "";
//         this.businessIdeas['idea2'] = res.business_ideas?.[1] || "";
//         this.businessIdeas['idea3'] = res.business_ideas?.[2] || "";
//         this.businessIdeas['idea4'] = res.business_ideas?.[3] || "";
//         this.businessIdeas['idea5'] = res.business_ideas?.[4] || "";
  
//       //  console.log(res);
  
//         // تخزين المعرف في Local Storage
//         if (res.id) {
//           localStorage.setItem("id_bussinesIdea", res.id.toString());
//         }
  
//         // تحديث حالة الحفظ والتعديل
//         this.isSaved = false;
//         this.isupdate = true;
//       }
//     }, (error) => {
// //console.error("Error fetching business idea:", error);
//     });
//   }
getBussinesIdea() {
  this.apisService.getBussinessIdea().subscribe((res) => {
    console.log(res)
    if (!res || Object.keys(res).length === 0 || 
        (!res.skills_experience?.length && !res.passions_interests?.length && 
         !res.values_goals?.length && !res.business_ideas?.length && !res.personal_notes?.length)) {
      // إذا كان الرد فارغًا، اجعل isSaved = true
      this.isSaved = true;
      
      return;
    }else{
      this.isSaved=false
    }

    // تحويل المصفوفات إلى نصوص مفصولة بأسطر جديدة
    this.businessData.Skills_Experience = res.skills_experience?.join("\n") || "";
    this.businessData.Passions_Interests = res.passions_interests?.join("\n") || "";
    this.businessData.Values_Goals = res.values_goals?.join("\n") || "";
    this.businessData.Personal_notes = res.personal_notes?.join("\n") || "";


    // التعامل مع الأفكار التجارية بشكل آمن
    this.businessIdeas['idea1'] = res.business_ideas?.[0] || "";
    this.businessIdeas['idea2'] = res.business_ideas?.[1] || "";
    this.businessIdeas['idea3'] = res.business_ideas?.[2] || "";
    this.businessIdeas['idea4'] = res.business_ideas?.[3] || "";
    this.businessIdeas['idea5'] = res.business_ideas?.[4] || "";

    // تخزين المعرف في Local Storage
    if (res.id) {
      localStorage.setItem("id_bussinesIdea", res.id.toString());
    }

    // تحديث حالة الحفظ والتعديل
    

  }, (error) => {
    console.error("Error fetching business idea:", error);
  });
}
generatePDF() {
  this.getAllData.getAllDataForPDF().subscribe({
    next: (response: any) => {
      try {
        const apiData = response as ApiData;
        const doc = new jsPDF();
        let finalY = 10;

        const addPageIfNeeded = () => {
          if (finalY > 270) {
            doc.addPage();
            finalY = 10;
          }
        };

        const addSectionTitle = (title: string) => {
          doc.setTextColor(255, 0, 0); // تعيين اللون الأحمر
          doc.setFontSize(16);
          doc.text(`** ${title}`, 10, finalY);
          doc.setTextColor(0, 0, 0); // إعادة اللون إلى الأسود
          finalY += 10;
          addPageIfNeeded();
        };

        const addSubTitle = (subtitle: string) => {
          doc.setTextColor(0, 0, 139); // أزرق غامق
          doc.setFontSize(12);
          doc.text(`* ${subtitle}`, 10, finalY);
          doc.setTextColor(0, 0, 0);
          finalY += 10;
          addPageIfNeeded();
        };

        const addListItems = (items: string[], indent = 20) => {
          items.forEach((item) => {
            addPageIfNeeded();
            const wrappedText = doc.splitTextToSize(`- ${item}`, 180);
            doc.text(wrappedText, indent, finalY);
            finalY += wrappedText.length * 7;
          });
        };

        doc.setFontSize(20);
        doc.text('Business Idea', 75, finalY);
        finalY += 10;

        // 📌 القسم الأول: Latest Business Idea  
        addSectionTitle(' Business Idea');

        addSubTitle('Business Idea');
        addListItems(apiData?.latest_business_idea?.business_ideas || ['N/A']);

        addSubTitle('Passions & Interests');
        addListItems(apiData?.latest_business_idea?.passions_interests || ['N/A']);

        addSubTitle('Skills & Experience');
        addListItems(apiData?.latest_business_idea?.skills_experience || ['N/A']);

        addSubTitle('Values & Goals');
        addListItems(apiData?.latest_business_idea?.values_goals || ['N/A']);

        addSubTitle('Personal Notes');
        addListItems(apiData?.latest_business_idea?.personal_notes || ['N/A']);

        // ✅ هذا السطر يجب أن يكون داخل الـ try
        doc.save('Business_Idea.pdf');

      } catch (error) {
        console.error('Error generating PDF:', error);
       
      } finally {
        
      }
    },
    error: (error) => {
      console.error('Error fetching data for PDF:', error);
     
    }
  });
}

}
