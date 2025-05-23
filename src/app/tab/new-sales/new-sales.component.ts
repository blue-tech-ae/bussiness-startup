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
  videoUrl2:any=""
  videoDescription2=""
   isSaved=true 
constructor(private apisService: ApisService){}
  ngOnInit(): void {
    
    this.getVedio("Sales_Strategy")
    this.getVedio2("Sales_Strategy2")
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
  getVedio2(title:any){
    this.apisService.GetVedio(title).subscribe((response)=>{
   // console.log(response)
      this.videoUrl2=response.data[0].video_path
      this.videoDescription2=response.data[0].description

      
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

  
  target_revenue!: number;
  unit_price!: number;
  interactions_needed!: number;
  reach_to_interaction_percentage!: number;

    reachError: boolean = false;
    targetRevenueError: boolean = false;
unitPriceError: boolean = false;
interactionsNeededError: boolean = false;

   
validatePositive(field: string) {
  if (field === 'target_revenue') {
    this.targetRevenueError = this.target_revenue !== null && this.target_revenue <= 0;
  }
  else if (field === 'unit_price') {
    this.unitPriceError = this.unit_price !== null && this.unit_price <= 0;
  }
  else if (field === 'interactions_needed') {
    this.interactionsNeededError = this.interactions_needed !== null && this.interactions_needed <= 0;
  }
}

    
    // تحقق من reach to interaction
    validateReachToInteraction() {
      if (this.reach_to_interaction_percentage !== null && 
        (this.reach_to_interaction_percentage < 1 || this.reach_to_interaction_percentage > 100)) {
        this.reachError = true;
      } else {
        this.reachError = false;
      }
    }
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
      target_revenue: this.target_revenue ,
      unit_price: this.unit_price,
      interactions_needed: this.interactions_needed,
    
      reach_to_interaction_percentage: this.reach_to_interaction_percentage
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
      target_revenue: this.target_revenue ,
      unit_price: this.unit_price,
      interactions_needed: this.interactions_needed,
    
      reach_to_interaction_percentage: this.reach_to_interaction_percentage
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
         console.log("aaa"  + res);
         if (res && res.data && Object.keys(res.data).length > 0) {
          this.isSaved=false
          this.calculated=true
          localStorage.setItem("slsid",res.data[0].id)
          this.target_revenue=res.data[0].target_revenue
          this.unit_price=res.data[0].unit_price
          this.interactions_needed=res.data[0].interactions_needed
          this.reach_to_interaction_percentage=res.data[0].reach_to_interaction_percentage
         // this.reach_to_interaction_percentage=res.data[0].reach_needed

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
