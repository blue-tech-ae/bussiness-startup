import { Component, HostListener, OnInit } from '@angular/core';
import { ApisService } from '../services/apis.service';



@Component({
  selector: 'app-testing-your-idea',
  templateUrl: './testing-your-idea.component.html',
  styleUrls: ['./testing-your-idea.component.css']
})

export class TestingYourIdeaComponent implements OnInit {
 isSaved:boolean=true
 your_idea = ""
  desirability= {
    solves_problem: "",
    problem_statement: "",  // <-- String
    existing_solutions_used: "",
    current_solutions_details: "",  // <-- String
    switch_reason: "",  // <-- String
    notes: ""  // <-- String
  }
  feasibility = {
    required_skills: "",  // <-- String
    qualifications_permits: "",  // <-- String
    notes: ""  // <-- String
  }
  viability = {
    payment_possible: "",  // <-- String
    profitability: "",  // <-- String
    finances_details: "",  // <-- String
    notes: ""  // <-- String
  }
 
 
  

  
  videoUrl:any=""
 videoDescription=""
   constructor(private apisService: ApisService) {}
  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: "smooth" });
    this.gettestIdea()
    this.getVedio("Testing_Your_Idea")
   
    }

    // save() {
   
    
    //   const formData = {
    //     desirability: {
    //       solves_problem: this.desirability.solves_problem.trim(),
    //       problem_statement: this.desirability.problem_statement,
    //       existing_solutions_used: this.desirability.existing_solutions_used.trim(),
    //       current_solutions_details: this.desirability.current_solutions_details,
    //       switch_reason: this.desirability.switch_reason,
    //       notes: this.desirability.notes
    //     },
    //     feasibility: {
    //       required_skills: this.feasibility.required_skills,
    //       qualifications_permits: this.feasibility.qualifications_permits,
    //       notes: this.feasibility.notes
    //     },
    //     viability: {
    //       payment_possible: this.viability.payment_possible,
    //       profitability: this.viability.profitability,
    //       finances_details: this.viability.finances_details,
    //       notes: this.viability.notes
    //     }
    //   };
    
    //   console.log('Final form data:', formData);
    // this.apisService.saveTestIdea(formData).subscribe((res)=>{

    // })
      
    // }
    save() {
      const formData = {
        your_idea:[this.your_idea],
        desirability: {
          solves_problem: this.desirability.solves_problem === 'Yes' ? true : false,
          problem_statement: this.desirability.problem_statement
            ? this.desirability.problem_statement.split('\n').filter(line => line.trim()).map(line => line.trim())
            : [],
          existing_solutions_used: this.desirability.existing_solutions_used === 'Yes' ? true : false,
          current_solutions_details: this.desirability.current_solutions_details
            ? this.desirability.current_solutions_details.split('\n').filter(line => line.trim()).map(line => line.trim())
            : [],
          switch_reason: this.desirability.switch_reason
            ? this.desirability.switch_reason.split('\n').filter(line => line.trim()).map(line => line.trim())
            : [],
          notes: this.desirability.notes
            ? this.desirability.notes.split('\n').filter(line => line.trim()).map(line => line.trim())
            : []
        },
        feasibility: {
          required_skills: this.feasibility.required_skills
            ? this.feasibility.required_skills.split('\n').filter(line => line.trim()).map(line => line.trim())
            : [],
          qualifications_permits: this.feasibility.qualifications_permits
            ? this.feasibility.qualifications_permits.split('\n').filter(line => line.trim()).map(line => line.trim())
            : [],
          notes: this.feasibility.notes
            ? this.feasibility.notes.split('\n').filter(line => line.trim()).map(line => line.trim())
            : []
        },
        viability: {
          payment_possible: this.viability.payment_possible
            ? this.viability.payment_possible.split('\n').filter(line => line.trim()).map(line => line.trim())
            : [],
          profitability: this.viability.profitability
            ? this.viability.profitability.split('\n').filter(line => line.trim()).map(line => line.trim())
            : [],
          finances_details: this.viability.finances_details
            ? this.viability.finances_details.split('\n').filter(line => line.trim()).map(line => line.trim())
            : [],
          notes: this.viability.notes
            ? this.viability.notes.split('\n').filter(line => line.trim()).map(line => line.trim())
            : []
        }
      };
    
      console.log('Final form data:', formData);
    
      this.apisService.saveTestIdea(formData).subscribe({
        next: (res) => {
          this.gettestIdea();
         // console.log('Saved successfully!', res);
         alert('Data has been saved successfully.');
        },
        error: (err) => {
          console.error('Error saving the idea:', err);
           
          alert("Error saving data. Please check your input.");
        }
      });
    }

    update() {
      const formData = {
        your_idea:[this.your_idea],
        desirability: {
          solves_problem: this.desirability.solves_problem === 'Yes' ? true : false,
          problem_statement: this.desirability.problem_statement
            ? this.desirability.problem_statement.split('\n').filter(line => line.trim()).map(line => line.trim())
            : [],
          existing_solutions_used: this.desirability.existing_solutions_used === 'Yes' ? true : false,
          current_solutions_details: this.desirability.current_solutions_details
            ? this.desirability.current_solutions_details.split('\n').filter(line => line.trim()).map(line => line.trim())
            : [],
          switch_reason: this.desirability.switch_reason
            ? this.desirability.switch_reason.split('\n').filter(line => line.trim()).map(line => line.trim())
            : [],
          notes: this.desirability.notes
            ? this.desirability.notes.split('\n').filter(line => line.trim()).map(line => line.trim())
            : []
        },
        feasibility: {
          required_skills: this.feasibility.required_skills
            ? this.feasibility.required_skills.split('\n').filter(line => line.trim()).map(line => line.trim())
            : [],
          qualifications_permits: this.feasibility.qualifications_permits
            ? this.feasibility.qualifications_permits.split('\n').filter(line => line.trim()).map(line => line.trim())
            : [],
          notes: this.feasibility.notes
            ? this.feasibility.notes.split('\n').filter(line => line.trim()).map(line => line.trim())
            : []
        },
        viability: {
          payment_possible: this.viability.payment_possible
            ? this.viability.payment_possible.split('\n').filter(line => line.trim()).map(line => line.trim())
            : [],
          profitability: this.viability.profitability
            ? this.viability.profitability.split('\n').filter(line => line.trim()).map(line => line.trim())
            : [],
          finances_details: this.viability.finances_details
            ? this.viability.finances_details.split('\n').filter(line => line.trim()).map(line => line.trim())
            : [],
          notes: this.viability.notes
            ? this.viability.notes.split('\n').filter(line => line.trim()).map(line => line.trim())
            : []
        }
      };
    
     // console.log('Final form data:', formData);
    
      this.apisService.updateTestIdea(formData).subscribe((res) => {
       // console.log('Updated successfully!', res);
       alert(" data has been updated successfully");
        this.gettestIdea()
      });
    }
    gettestIdea() {
      this.apisService.getTestIdea().subscribe((res) => {
        console.log(res)
        if (res && Object.keys(res).length > 0 ) {
          this.isSaved=false
          localStorage.setItem("testideaid",res.data.id)
          const idea = res.data;

          this.your_idea=res.data.your_idea,
          // ربط البيانات وتحويلها للشكل المناسب
          this.desirability = {
            solves_problem: idea.desirability.solves_problem === 1 ? 'Yes' : 'No',
            problem_statement: idea.desirability.problem_statement.join('\n'), // array -> text
            existing_solutions_used: idea.desirability.existing_solutions_used === 1 ? 'Yes' : 'No',
            current_solutions_details: idea.desirability.current_solutions_details.join('\n'),
            switch_reason: idea.desirability.switch_reason.join('\n'),
            notes: idea.desirability.notes.join('\n')
          };
    
          this.feasibility = {
            required_skills: idea.feasibility.required_skills.join('\n'),
            qualifications_permits: idea.feasibility.qualifications_permits.join('\n'),
            notes: idea.feasibility.notes.join('\n')
          };
    
          this.viability = {
            payment_possible: idea.viability.payment_possible.join('\n'),
            profitability: idea.viability.profitability.join('\n'),
            finances_details: idea.viability.finances_details.join('\n'),
            notes: idea.viability.notes.join('\n') 
          };
        }else{
          this.isSaved=true
        }
      });
    }
    
    
    
    
    
   
    

  getVedio(title:any){
    this.apisService.GetVedio(title).subscribe((response)=>{
      console.log(response)
      
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
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

