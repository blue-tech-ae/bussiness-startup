import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddBusinessComponent } from '../add-business/add-business.component';
import { ApisService } from '../services/apis.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  this.getbusinnis();
}
  addBusinessPlan() {
    const dialogRef = this.dialog.open(AddBusinessComponent);

    dialogRef.afterClosed().subscribe(result => {
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
    const dialogRef = this.dialog.open(AddBusinessComponent, {
      data:{name:this.businessPlans[index].name, id:this.businessPlans[index].id} 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getbusinnis()
        this.businessPlans[index] = result;
        this.snackBar.open('Plan updated successfully!', 'Close', { duration: 2000 });
      }
    });
  }
  getbusinnis(){
return this.serv.getbusinnes().subscribe((res)=>{
  this.businessPlans=res.data
  console.log(res)
})
  }
  saveBussinesId(id:any){
    localStorage.setItem("business-id",id)
    this.router.navigate(['/bussiness-idea']);
  }
}
