import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApisService } from '../services/apis.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-plans',
  templateUrl: './add-plans.component.html',
  styleUrls: ['./add-plans.component.css']
})
export class AddPlansComponent implements OnInit{

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
  public dialog: MatDialog,
  private snackBar: MatSnackBar,
  private serv: ApisService,
  @Inject(MAT_DIALOG_DATA) public data: { bussinesPlan: any },
  private dialogRef: MatDialogRef<AddPlansComponent>
) {
  if (data && data.bussinesPlan) {
    this.isSaved = true;
    const plan = data.bussinesPlan;  // 👈 مباشرة بدون .data[]
console.log(plan)
    this.firstName = plan.name || '';
    //this.isMigrant = plan.is_migrant === 1;
    this.yearsInCountry = plan.years_here || 0;
    this.selectedEnglishLevel = plan.english_level ? plan.english_level[0] : '';
   // this.hasBusiness = plan.is_business_old === 1;
    this.businessDescription = plan.products_services ? plan.products_services[0] : '';
    this.aboutme = plan.about_me ? plan.about_me[0] : '';
    this.isMigrant = plan.is_migrant === 1 ? true : false;
    this.hasBusiness = plan.is_business_old === 1 ? true : false;
  }
}
ngOnInit(): void {
  // const id = this.route.snapshot.paramMap.get('id');
  // if (id) {
  //   localStorage.setItem("businnes-id", id);
    
  // }
  //this.getbusinesform()
 
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
      localStorage.setItem("bid",res.data.id)
     // this.getbusinesform() 
  
      this.snackBar.open('Business saved successfully!', 'Close', { duration: 2000 });
      this.dialogRef.close(res.data); 
      
    });
  }
  updateForm(): void {
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
      //this.getbusinesform()
   // console.log(  res) 
      this.snackBar.open('Business updated successfully!', 'Close', { duration: 2000 });
      this.dialogRef.close(res.data); 
      
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
