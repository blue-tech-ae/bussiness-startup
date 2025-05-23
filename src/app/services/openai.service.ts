import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenAIService {
  private apiUrl = 'https://api.openai.com/v1/chat/completions';
 

  constructor(private http: HttpClient) {}

  // generateBusinessIdea(skills: string, passions: string, values: string): Observable<any> {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${this.apiKey}`
  //   });

  //   const prompt = `Based on the following:
  //     Skills: ${skills}
  //     Passions: ${passions}
  //     Values: ${values}
      
  //     Suggest a viable business idea that aligns with these characteristics. 
  //     Format the response as:
  //     Business Idea: [concise name]
  //     Description: [2-3 sentences explaining the idea]`;

  //   const body = {
  //     model: "gpt-3.5-turbo",
  //     messages: [
  //       {
  //         role: "user",
  //         content: prompt
  //       }
  //     ],
  //     temperature: 0.7,
  //     max_tokens: 200
  //   };

  //   return this.http.post(this.apiUrl, body, { headers });
  // }
  generateBusinessIdea(skills: string, passions: string, values: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    });
  
    // تعديل الـ Prompt بناءً على ما طلبته
    const prompt = `
  You are a business consultant specializing in helping entrepreneurs identify viable business opportunities that match their skills, passions, and values.
  
  Here is the user's information:
  - Skills: ${skills}
  - Passions: ${passions}
  - Values: ${values}
  
  Please suggest a potential business idea that:
  1. Leverages one of their skills,
  2. Aligns with one of their passions,
  3. Reflects one of their values,
  4. Has potential for growth,
  5. Is realistic to start.
  
  Provide the business idea in a concise 10 words or less.
  `.trim(); // النص الذي سيُرسل لـ OpenAI
  
    const body = {
      model: "gpt-3.5-turbo", // أو استخدم "gpt-4" إذا كنت تستخدمه
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 150 // محدود للتأكد أن الجواب مختصر
    };
  
    return this.http.post(this.apiUrl, body, { headers });
  }

  generatemvp(question: string,big_solution:string,entry_strategy:string,things_have:string,things_need:string,answer_questions:string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    });
  
    const prompt = `
  Answer the following question in 20 words only:
  
  Question: ${question}
  Big Solution: ${big_solution}

Entry Strategy: ${entry_strategy}
things_have:${things_have}
things_need:${things_need}
answer_questions:${answer_questions}
    `.trim(); // النص الجديد الذي سيتم إرساله إلى OpenAI
  
    const body = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 60 // قليل لأنه فقط 20 كلمة
    };
  
    return this.http.post(this.apiUrl, body, { headers });
  }
  generatemarketing(question: string,option1:string,option2:string): Observable<any> {
    console.log(option1)
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    });
  
    const prompt = `
  Answer the following question in 20 words only:
  
  Question: ${question}
 Give a new and different option that is not similar to the ones provided below:
 option1: ${option1}

option2: ${option2}
    `.trim(); // النص الجديد الذي سيتم إرساله إلى OpenAI
  
    const body = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 60 // قليل لأنه فقط 20 كلمة
    };
  
    return this.http.post(this.apiUrl, body, { headers });
  }
  
  
} 