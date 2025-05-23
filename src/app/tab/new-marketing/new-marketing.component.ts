import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MvpSuggestionComponent } from 'src/app/components/mvp-suggestion/mvp-suggestion.component';
import { ApisService } from 'src/app/services/apis.service';

@Component({
  selector: 'app-new-marketing',
  templateUrl: './new-marketing.component.html',
  styleUrls: ['./new-marketing.component.css']
})
export class NewMarketingComponent implements OnInit {
  videoUrl:any=""
 videoDescription=""
  videoUrl2:any=""
 videoDescription2=""
 isSaved=true


 product_feature: { options: string[]; notes: string } = {
  options: [],
  notes: ''
};
marketing_campaigns = [
  {
    goal: "",
    audience: "",
    format: "",
    channels: "",
    notes: ""
  }
];

addCampaign() {
  this.marketing_campaigns.push({
    goal: "",
    audience: "",
    format: "",
    channels: "",
    notes: ""
  });
}
removeCampaign(index: number) {
  this.marketing_campaigns.splice(index, 1);
}

 constructor(private apisService: ApisService,private dialog: MatDialog){

 }
 ngOnInit(): void {
  this.getVedio("Marketing")
  this.getVedio2("Marketing2")

  //this.getMarketing()
  this.getnewmarketing()
  window.scrollTo({ top: 0, behavior: "smooth" });
 }
  showButton: boolean = false;
 
   // استماع لأحداث التمرير Scroll
   @HostListener("window:scroll", [])
   onScroll(): void {
     this.showButton = window.scrollY > 200; // إظهار الزر عند التمرير أكثر من 200px
   }
 
   // دالة التمرير إلى الأعلى
   scrollToTop(): void {
     window.scrollTo({ top: 0, behavior: "smooth" });
   }
 getVedio(title:any){
  this.apisService.GetVedio(title).subscribe((response)=>{
  
    this.videoUrl=response.data[0].video_path
    this.videoDescription=response.data[0].description

    
  })
}
getVedio2(title:any){
  this.apisService.GetVedio(title).subscribe((response)=>{
  
    this.videoUrl2=response.data[0].video_path
    this.videoDescription2=response.data[0].description

    
  })
}
openSuggestionDialog(){
   const dialogRef = this.dialog.open(MvpSuggestionComponent, {
         data: {
          
            question:"Considering the discussion we had, list three features that can make your solution unique in the market? "
          , option1: "",
          option2:""

         }
       });
   
       dialogRef.afterClosed().subscribe(result => {
         if (result) {
          this.product_feature.options[0]=result
         // this.mvp.big_solution=result
         }
       });
}
openSuggestionDialog1(){
  const dialogRef = this.dialog.open(MvpSuggestionComponent, {
        data: {
         
           question:"Considering the discussion we had, list three features that can make your solution unique in the market? Please avoid repeating the following options:"
         , option1: this.product_feature.options[0],
         option2: ""

        }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
         this.product_feature.options[1]=result
        // this.mvp.big_solution=result
        }
      });
}
openSuggestionDialog2(){
  const dialogRef = this.dialog.open(MvpSuggestionComponent, {
        data: {
         
           question:"Considering the discussion we had, list three features that can make your solution unique in the market? Please avoid repeating the following options:"
         , option1: this.product_feature.options[0],
         option2: this.product_feature.options[1]

        }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
         this.product_feature.options[2]=result
        // this.mvp.big_solution=result
        }
      });
}
saveProgress() {
  const formData = {
    productFeature: {
      options: (this.product_feature.options || [])
        .map(option => option.trim())
        .filter(option => option), // حذف الخيارات الفارغة
      notes: (this.product_feature.notes || '').trim()
    },
    marketingCampaigns: (this.marketing_campaigns || [])
      .filter(c => 
        c.goal?.trim() || 
        c.audience?.trim() || 
        c.format?.trim() || 
        c.channels?.trim() || 
        c.notes?.trim()
      )
      .map(c => ({
        goal: c.goal?.trim() || '',
        audience: c.audience?.trim() || '',
        format: c.format?.trim() || '',
        channels: c.channels?.trim() || '',
        notes: c.notes?.trim() || ''
      }))
  };
  //console.log("before send" + formData);
  this.apisService.saveNewmarketing(formData).subscribe({
    next: (res) => {
      console.log('Response:', res);
      alert('Data has been saved successfully.');
      this.getnewmarketing()
    },
    error: (error) => {
      console.error('Error:', error);
      alert("❌ Error saving data. Check console for details.");
    }
  });
}


updateProgress(){
  const formData = {
    productFeature: {
      options: (this.product_feature.options || [])
        .map(option => option.trim())
        .filter(option => option), // حذف الخيارات الفارغة
      notes: (this.product_feature.notes || '').trim()
    },
    marketingCampaigns: (this.marketing_campaigns || [])
      .filter(c => 
        c.goal?.trim() || 
        c.audience?.trim() || 
        c.format?.trim() || 
        c.channels?.trim() || 
        c.notes?.trim()
      )
      .map(c => ({
        goal: c.goal?.trim() || '',
        audience: c.audience?.trim() || '',
        format: c.format?.trim() || '',
        channels: c.channels?.trim() || '',
        notes: c.notes?.trim() || ''
      }))
  };
  //console.log("before send" + formData);
  this.apisService.updateNewmarketing(formData).subscribe({
    next: (res) => {
      console.log('Response:', res);
      this.getnewmarketing()
      alert('Data has been updated successfully.');
    },
    error: (error) => {
      console.error('Error:', error);
      alert("❌ Error updating data. Check console for details.");
    }
  });  
}
getnewmarketing() {
  this.apisService.getNewmarketing().subscribe({
    next: (res) => {
    //  console.log('Response:', res);
      if (res && res.data && Object.keys(res.data).length > 0) {
this.isSaved=false
localStorage.setItem("marid",res.data.productFeature.id)
        // إسناد القيم إلى المتغيرات
        this.product_feature.options = res.data.productFeature.options || [];
        this.product_feature.notes = res.data.productFeature.notes || '';

        this.marketing_campaigns = res.data.marketingCampaigns || [];
      }else{
        this.isSaved=true
      }
    },
    error: (error) => {
     // console.error('Error:', error);
    }
  });
}


}
