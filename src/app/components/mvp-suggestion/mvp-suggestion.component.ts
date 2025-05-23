import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OpenAIService } from 'src/app/services/openai.service';

@Component({
  selector: 'app-mvp-suggestion',
  templateUrl: './mvp-suggestion.component.html',
  styleUrls: ['./mvp-suggestion.component.css']
})
export class MvpSuggestionComponent {
suggestion: string = '';
  loading = false;
  error = '';

  constructor(
    private openAIService: OpenAIService,
    public dialogRef: MatDialogRef<MvpSuggestionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { question: string,big_solution:string,entry_strategy:string,
      option1:string,option2:string,things_need:string,things_have:string,answer_questions:string}
  ) {
    this.generateSuggestion();
  }

  generateSuggestion() {
    this.loading = true;
    this.error = '';
    
    this.openAIService.generatemvp(  
      this.data.question,this.data.big_solution,this.data.entry_strategy,this.data.things_need,
      this.data.things_have,this.data.answer_questions
     
    ).subscribe({
      next: (response) => {
        this.suggestion = response.choices[0].message.content;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to generate suggestion. Please try again.';
        this.loading = false;
        console.error('OpenAI API Error:', err);
      }
    });
  }
  generateSuggestionmarketing() {
    this.loading = true;
    this.error = '';
    
    this.openAIService.generatemarketing(  
      this.data.question,this.data.option1,this.data.option2
     
    ).subscribe({
      next: (response) => {
        this.suggestion = response.choices[0].message.content;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to generate suggestion. Please try again.';
        this.loading = false;
        console.error('OpenAI API Error:', err);
      }
    });
  }

  useThisIdea() {
    this.dialogRef.close(this.suggestion);
  }
}
