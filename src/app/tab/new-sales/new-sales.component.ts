import { Component, HostListener, OnInit } from '@angular/core';
import { ApisService } from 'src/app/services/apis.service';

@Component({
  selector: 'app-new-sales',
  templateUrl: './new-sales.component.html',
  styleUrls: ['./new-sales.component.css']
})
export class NewSalesComponent implements OnInit {
  videoUrl:any=""
  videoDescription=""
   isSaved=true 
constructor(private apisService: ApisService){}
  ngOnInit(): void {
    
    this.getVedio("Sales Strategy")
    window.scrollTo({ top: 0, behavior: "smooth" });
    this.getsales()
    
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
  video1Questions = '';
  video2Explanation = '';

  targetRevenue: number = 0;
  unitPrice: number = 0;
  interactionsPerSale: number = 0;
  reachPerInteraction: number = 0;

  unitsToSell: number = 0;
  interactionsNeeded: number = 0;
  reachNeeded: number = 0;

  calculated = false;

  calculateFunnel() {
    if (this.targetRevenue > 0 && this.unitPrice > 0 && this.interactionsPerSale > 0 && this.reachPerInteraction > 0) {
      this.unitsToSell = this.targetRevenue / this.unitPrice;
      this.interactionsNeeded = this.unitsToSell * this.interactionsPerSale;
      this.reachNeeded = this.interactionsNeeded * this.reachPerInteraction;
      this.calculated = true;
    } else {
      alert('Please fill all fields correctly before calculating.');
    }
  }
  saveProgress(){
    const formdata={ 
      target_revenue: this.targetRevenue ,
      unit_price: this.unitPrice,
      interactions_needed: this.interactionsPerSale,
      engagement_needed: 0 ,
      reach_needed: this.reachPerInteraction
    }
    this.apisService.saveNewSales(formdata).subscribe({
      next: (res) => {
         console.log(res);
         this.getsales()
//          this.calculated=true
//       this.interactionsNeeded= res.data.interactions_needed
// this. unitsToSell=res.data.sales_needed
// this. reachNeeded=res.data.reach_needed
        alert('Data has been saved successfully.');
        
         // يمكنك إضافة منطق إضافي بعد الاستلام بنجاح مثل تحديث واجهة المستخدم
       },
       error: (error) => {
        // console.error('Error saving ', error);
         alert("❌ Error saving data. Check console for details.");
        // التعامل مع الخطأ مثل إظهار رسالة للمستخدم
       }
    })

  }
  updateProgress(){
     const formdata={ 
      target_revenue: this.targetRevenue ,
      unit_price: this.unitPrice,
      interactions_needed: this.interactionsPerSale,
      engagement_needed: 0 ,
      reach_needed: this.reachPerInteraction
    }
    this.apisService.updateNewSales(formdata).subscribe({
      next: (res) => {
       //  console.log(res);
         this.getsales()
//          this.calculated=true
//       this.interactionsNeeded= res.data.interactions_needed
// this. unitsToSell=res.data.sales_needed
// this. reachNeeded=res.data.reach_needed
        alert('Data has been updated successfully.');
        
         // يمكنك إضافة منطق إضافي بعد الاستلام بنجاح مثل تحديث واجهة المستخدم
       },
       error: (error) => {
      //   console.error('Error updating ', error);
         // التعامل مع الخطأ مثل إظهار رسالة للمستخدم
         alert("❌ Error updating data. Check console for details.");
        }
    })

  }
  getsales(){
    this.apisService.getNewSales().subscribe({
      next: (res) => {
         console.log("aaa" + res.data[0]);
         if (res && res.data && Object.keys(res.data).length > 0) {
          this.isSaved=false
          this.calculated=true
          localStorage.setItem("slsid",res.data[0].id)
        this.targetRevenue=res.data[0].target_revenue
        this.unitPrice=res.data[0].unit_price
        this.interactionsPerSale=res.data[0].interactions_needed
        this.reachPerInteraction=res.data[0].reach_needed

          this.interactionsNeeded= res.data[0].total_interactions
    this. unitsToSell=res.data[0].sales_needed
    this. reachNeeded=res.data[0].total_reach
         }else{
          this.isSaved=true
         }
      
       
        
         // يمكنك إضافة منطق إضافي بعد الاستلام بنجاح مثل تحديث واجهة المستخدم
       },
       error: (error) => {
        // console.error('Error updating ', error);
         // التعامل مع الخطأ مثل إظهار رسالة للمستخدم
       }
    })
  }
}
