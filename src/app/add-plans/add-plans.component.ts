import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApisService } from '../services/apis.service';
import { TranslationService } from '../services/translation.service';

@Component({
  selector: 'app-add-plans',
  templateUrl: './add-plans.component.html',
  styleUrls: ['./add-plans.component.css']
})
export class AddPlansComponent implements OnInit{

  @Input() plan: any | null = null;
  @Output() saved = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>();

  firstName: string = '';
isMigrant: boolean = false;
yearsInCountry!: number ;
englishLevels: string[] = [
  'No English',
  'Low level',
  'Intermediate',
  'Great',
  'Academic'
];
  selectedEnglishLevel!: string;
hasBusiness: boolean = false;
businessDescription: string='';
aboutme:string=""
isSaved : boolean =false


constructor(
  private snackBar: MatSnackBar,
  private serv: ApisService,
  private translation: TranslationService
) {}

ngOnInit(): void {
  if (this.plan) {
    this.isSaved = true;
    const plan = this.plan;
    this.firstName = plan.name || '';
    this.yearsInCountry = plan.years_here || 0;
    this.selectedEnglishLevel = plan.english_level ? plan.english_level[0] : '';
    this.businessDescription = plan.products_services ? plan.products_services[0] : '';
    this.aboutme = plan.about_me ? plan.about_me[0] : '';
    this.isMigrant = plan.is_migrant === 1 ? true : false;
    this.hasBusiness = plan.is_business_old === 1 ? true : false;
  }
}
toggleMigrantStatus(status: boolean): void {
  this.isMigrant = status;
  if (!status) this.yearsInCountry = 0;
}

toggleBusinessOwnership(status: boolean): void {
  this.hasBusiness = status;
  if (!status) this.businessDescription = '';
}
  submitForm(): void {
    if (!this.firstName.trim()) {
      this.snackBar.open(
        this.translation.translate('planNameRequired'),
        this.translation.translate('close'),
        { duration: 2000 }
      );
      return;
    }
    const formdata = {
      name: this.firstName,
      products_services: [this.businessDescription || ''],
      about_me: [this.aboutme || ''],
      is_migrant: this.isMigrant,
      years_here: this.yearsInCountry,
      english_level: [this.selectedEnglishLevel],
      is_business_old: this.hasBusiness
    };

    this.serv.saveNewbusines(formdata).subscribe((res) => {
      localStorage.setItem('bid', res.data.id);
      this.snackBar.open(
        this.translation.translate('businessSaved'),
        this.translation.translate('close'),
        { duration: 2000 }
      );
      this.saved.emit(res.data);
      this.close.emit();
    });
  }
  updateForm(): void {
    if (!this.firstName.trim()) {
      this.snackBar.open(
        this.translation.translate('planNameRequired'),
        this.translation.translate('close'),
        { duration: 2000 }
      );
      return;
    }
    const formdata = {
      name: this.firstName,
      products_services: [this.businessDescription || ''],
      about_me: [this.aboutme || ''],
      is_migrant: this.isMigrant,
      years_here: this.yearsInCountry,
      english_level: [this.selectedEnglishLevel],
      is_business_old: this.hasBusiness 
    };
  
    this.serv.updatenewbusiness(formdata).subscribe((res) => {
      this.snackBar.open(
        this.translation.translate('businessUpdated'),
        this.translation.translate('close'),
        { duration: 2000 }
      );
      this.saved.emit(res.data);
      this.close.emit();
    });
  }
  getbusinesform() {
    this.serv.getbussinesform().subscribe((res) => {
      if (res && Object.keys(res).length > 0 ){
        this.isSaved=true
       
      }else{
        this.isSaved=false
      }
      const validData = [...res.data]
        .reverse()
        .find(item => item.name || item.products_services || item.about_me);
  
      if (validData) {
       
       // console.log(validData);
        localStorage.setItem("bid",validData.id)
        this.firstName = validData.name || '';
        this.businessDescription = validData.products_services?.[0] || '';
        this.aboutme = validData.about_me?.[0] || '';
        
        // تحويل القيم الرقمية إلى Boolean
        // this.isMigrant = validData.is_migrant === 1;
        // this.hasBusiness = validData.is_business_old === 1;
        this.isMigrant = validData.is_migrant === 1 ? true : false;
        this.hasBusiness = validData.is_business_old === 1 ? true : false;
        
        this.yearsInCountry = validData.years_here ?? 0;
        this.selectedEnglishLevel = validData.english_level?.[0] || '';
  
         // لو في حفظ تلقائي بعد الجلب
      } else {
        console.warn('لا توجد بيانات صالحة في الريسبونس');
        
      }
    });
  }
}
