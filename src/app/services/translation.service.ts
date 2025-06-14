import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export type LangCode = 'en' | 'ar' | 'es' | 'de' | 'fr' | 'zh' | 'hi' | 'pt' | 'ru' | 'bn';

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private currentLang: LangCode = 'en';
  private translations: Record<string, string> = {};

  constructor(private http: HttpClient) {
    this.loadLanguage(this.currentLang);
  }

  loadLanguage(lang: LangCode) {
    this.http
      .get<Record<string, string>>(`assets/i18n/${lang}.json`)
      .pipe(catchError(() => of({})))
      .subscribe(data => {
        this.currentLang = lang;
        this.translations = data || {};
      });
  }

  getCurrentLang(): LangCode {
    return this.currentLang;
  }

  translate(key: string): string {
    return this.translations[key] || key;
  }
}
