import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApisService } from '../services/apis.service';

@Component({
  selector: 'app-add-business',
  templateUrl: './add-business.component.html',
  styleUrls: ['./add-business.component.css']
})
export class AddBusinessComponent  {
  businessName: string = '';
  businessid: number = 0;
issave:boolean=true
  constructor(
    public dialogRef: MatDialogRef<AddBusinessComponent>,
    @Inject(MAT_DIALOG_DATA) public data:{name:string,id:number},
    private serv:ApisService
  ) {
    if (data) {
      this.businessName = data.name;
      this.businessid=data.id;
      this.issave=false
    }
  }

  save() {
  let data={ "name": this.businessName }
return this.serv.addbusinnes(data).subscribe((res)=>{
  alert("saved succefully")
  this.dialogRef.close(this.businessName);
  console.log(res)
})
    // if (this.businessName.trim()) {
    //   this.dialogRef.close(this.businessName);
    // }
  }
  update() {
    let data={ "name": this.businessName }
  return this.serv.updatebusinnes(data,this.businessid).subscribe((res)=>{
    alert("updated succefully")
    this.dialogRef.close(this.businessName);
    console.log(res)
  })
      // if (this.businessName.trim()) {
      //   this.dialogRef.close(this.businessName);
      // }
    }
}
