import { Component, OnInit } from '@angular/core';
import { ApisService } from 'src/app/services/apis.service';

@Component({
  selector: 'app-new-financial',
  templateUrl: './new-financial.component.html',
  styleUrls: ['./new-financial.component.css']
})
export class NewFinancialComponent implements OnInit {

  videoUrl:any=""
 videoDescription=""
 isSaved=true
 notes: string = '';
   constructor(private apisService: ApisService) {}
    ngOnInit(): void {
      this.getVedio("Financial_Planning")
      this.getfinnacial()
      //this.getFinancialPlanning()
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    getVedio(title:any){
      this.apisService.GetVedio(title).subscribe((response)=>{
       // console.log(response.data[0].video_path)
  //console.log(response.data[0].description)
        this.videoUrl=response.data[0].video_path
        this.videoDescription=response.data[0].description
  
        
      })
    }

    saveProgress() {

      const formdata={
        notes:[this.notes || ""]
      }
     this.apisService.saveNewfinnancial(formdata).subscribe((res)=>{
      this.getfinnacial()
      alert('Data has been saved successfully.');
     }) 
    }

    updateProgress(){
      const formdata={
        notes:[this.notes || ""]
      }
     this.apisService.updatenewfinnancial(formdata).subscribe((res)=>{
      this.getfinnacial()
      alert('Data has been updated successfully.');
     })  
    }
    getfinnacial(){
    this.apisService.getfinnancial().subscribe((res)=>{
     
       // console.log(res);
        if (res && Object.keys(res).length > 0){
  localStorage.setItem("idfann",res.id)
  this.isSaved=false
  this.notes=res.notes

}else{
  this.isSaved=true
}
       })
    }

  fillDemoData() {
    this.notes = 'Estimate startup costs and monthly expenses.';
  }
}
