import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslationService } from '../services/translation.service';
import { AddBusinessComponent } from '../add-business/add-business.component';
import { ApisService } from '../services/apis.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AddPlansComponent } from '../add-plans/add-plans.component';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  businessPlans: any[] = [];
  showPlanModal = false;
  editingPlan: any | null = null;
 

  constructor(public dialog: MatDialog, private snackBar: MatSnackBar,private serv:ApisService,private router: Router,
    private translation: TranslationService
   ) {}
ngOnInit(): void {
  // const id = this.route.snapshot.paramMap.get('id');
  // if (id) {
  //   localStorage.setItem("businnes-id", id);
    
  // }
  //this.getbusinesform()
  this.getbusinnis()
 
}





  addBusinessPlan() {
    this.editingPlan = null;
    this.showPlanModal = true;
  }

  openPlan(id: any) {
    this.saveBussinesId(id);
  }

  deletePlan(id: number) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.serv.deletebusinnes(id).subscribe(() => {
          this.getbusinnis();
          this.snackBar.open(
            this.translation.translate('planDeleted'),
            this.translation.translate('close'),
            { duration: 2000 }
          );
        });
      }
    });
  }

  editPlan(index: number) {
    this.editingPlan = this.businessPlans[index];
    this.showPlanModal = true;
  }

  closePlanModal() {
    this.showPlanModal = false;
    this.editingPlan = null;
  }

  onPlanSaved() {
    this.getbusinnis();
    this.snackBar.open(
      this.translation.translate('planSaved'),
      this.translation.translate('close'),
      { duration: 2000 }
    );
    this.closePlanModal();
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
