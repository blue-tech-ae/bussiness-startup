import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddBusinessComponent } from '../add-business/add-business.component';
import { ApisService } from '../services/apis.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AddPlansComponent } from '../add-plans/add-plans.component';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  businessPlans: any[] = [];
 

  constructor(public dialog: MatDialog, private snackBar: MatSnackBar,private serv:ApisService,private router: Router
   ) {}
ngOnInit(): void {
  // const id = this.route.snapshot.paramMap.get('id');
  // if (id) {
  //   localStorage.setItem("businnes-id", id);
    
  // }
  //this.getbusinesform()
  this.getbusinnis()
 
}
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
 
toggleMigrantStatus(status: boolean): void {
  this.isMigrant = status;
  if (!status) this.yearsInCountry = 0;
}

toggleBusinessOwnership(status: boolean): void {
  this.hasBusiness = status;
  if (!status) this.businessDescription = '';
}





  addBusinessPlan() {
    const dialogRef = this.dialog.open(AddPlansComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.getbusinnis()

      if (result) {
        this.getbusinnis()
      //  this.businessPlans.push(result);
        this.snackBar.open('Plan added successfully!', 'Close', { duration: 2000 });
      }
    });
  }

  deletePlan(id: number) {
    //this.businessPlans.splice(index, 1);
    return this.serv.deletebusinnes(id).subscribe((res)=>{
      this.getbusinnis()
      this.snackBar.open('Plan deleted!', 'Close', { duration: 2000 });
    })
   
  }

  editPlan(index: number) {
    const dialogRef = this.dialog.open(AddPlansComponent, {
      data:{bussinesPlan: this.businessPlans[index]} 
    });

    dialogRef.afterClosed().subscribe(result => {
      
      if (result) {
        this.getbusinnis()
       // this.businessPlans[index] = result;getbusinnes()
        this.snackBar.open('Plan updated successfully!', 'Close', { duration: 2000 });
      } 
    });
  }
  getbusinnis(){
return this.serv.getbussinesform().subscribe((res)=>{
  this.businessPlans=res.data
  console.log( res.data)
})
  }
  saveBussinesId(id:any){
    localStorage.setItem("business-id",id)
    this.router.navigate(['/bussiness-idea']);
  }
}
