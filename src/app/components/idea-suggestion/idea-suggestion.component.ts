import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OpenAIService } from '../../services/openai.service';

@Component({
  selector: 'app-idea-suggestion',
  templateUrl: './idea-suggestion.component.html',
  styleUrls: ['./idea-suggestion.component.css']
})
export class IdeaSuggestionComponent {
  suggestion: string = '';
  loading = false;
  error = '';

  constructor(
    private openAIService: OpenAIService,
    public dialogRef: MatDialogRef<IdeaSuggestionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { skills: string, passions: string, values: string }
  ) {
    this.generateSuggestion();
  }

  generateSuggestion() {
    this.loading = true;
    this.error = '';
    
    this.openAIService.generateBusinessIdea(  
      this.data.skills,
      this.data.passions,
      this.data.values
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