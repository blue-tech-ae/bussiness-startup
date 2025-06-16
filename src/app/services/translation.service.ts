import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';

export type LangCode = 'en' | 'ar' | 'es' | 'de' | 'fr' | 'zh' | 'hi' | 'pt' | 'ru' | 'bn';

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private currentLang: LangCode = 'en';
  private translations: Record<string, string> = {};
  private langChangeSubject = new BehaviorSubject<LangCode>(this.currentLang);
  langChange$ = this.langChangeSubject.asObservable();

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
        this.langChangeSubject.next(lang);
        this.updateDocumentDirection();
      });
  }

  getCurrentLang(): LangCode {
    return this.currentLang;
  }

  translate(key: string, params?: Record<string, unknown>): string {
    let result = this.translations[key] || key;
    if (params) {
      Object.keys(params).forEach(param => {
        const value = String(params[param]);
        result = result.replace(new RegExp(`{{\\s*${param}\\s*}}`, 'g'), value);
      });
    }
    return result;
  }

  private updateDocumentDirection() {
    const rtlLangs: LangCode[] = ['ar'];
    document.documentElement.dir = rtlLangs.includes(this.currentLang) ? 'rtl' : 'ltr';
  }
}
