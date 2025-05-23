import { Component, HostListener, OnInit } from '@angular/core';
import { ApisService } from 'src/app/services/apis.service';

@Component({
  selector: 'app-website',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.css']
})
export class WebsiteComponent implements OnInit{
  isSaved:boolean=true;
  businessName: string = '';
  businessDescription: string = '';
  colourChoice!: number ;
  logoStyleChoice!: number;
  aboutUs: string = '';
socialProof: string = '';
contactInfo: string = '';
imageList = [
  { id: 1, name: 'c1.png' },
  { id: 2, name: 'c2.png' },
  { id: 3, name: 'c3.png' },
  { id: 4, name: 'c4.png' },
  { id: 5, name: 'c5.png' },
  { id: 6, name: 'c6.png' }
];
  
logoTypes = [
  { id: 1, name: 'Word Mark' },
  { id: 2, name: 'Abstract Mark' },
  { id: 3, name: 'Pictorial Mark' },
  { id: 4, name: 'Letter Mark' },
  { id: 5, name: 'Combination Mark' },
  { id: 6, name: 'Emblem Mark' },
];

services = [
  { name: '', description: '' },
  { name: '', description: '' },
  { name: '', description: '' },
];

  constructor(private Apiser:ApisService){}

  ngOnInit(): void {
    this.getwebinfo()
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
  saveProgress() {

    const formdata = {
      businessName: this.businessName || '',
      businessDescription: this.businessDescription || '',
      colourChoice: this.colourChoice ?? null,
      logoStyleChoice: this.logoStyleChoice ?? null,
      aboutUs: this.aboutUs || '',
      socialProof: this.socialProof || '',
      contactInfo: this.contactInfo
        ? this.contactInfo.split('\n').filter(line => line.trim() !== '')
        : [],
      services: this.services
        .filter(service => service.name || service.description)
        .map(service => ({
          name: service.name || '',
          description: service.description || ''
        }))
    };
  
   // console.log('Form Data:', formdata);
   this.Apiser.savewebsite(formdata).subscribe({
    next: (res) => {
      console.log(res)
      this.getwebinfo();
      alert('Data has been saved successfully.');
    },
    error: (err) => {
      alert('Data has not been saved successfully.');
    }
  });
  
  }

  updateProgress(){
    // const formdata = {
    //   businessName: this.businessName || '',
    //   businessDescription: this.businessDescription || '',
    //   colourChoice: this.colourChoice ?? null,
    //   logoStyleChoice: this.logoStyleChoice ?? null,
    //   aboutUs: this.aboutUs || '',
    //   socialProof: this.socialProof || '',
    //   contactInfo: this.contactInfo
    //     ? this.contactInfo.split('\n').filter(line => line.trim() !== '')
    //     : [],
    //   services: this.services
    //     .filter(service => service.name || service.description)
    //     .map(service => ({
    //       name: service.name || '',
    //       description: service.description || ''
    //     }))
    // };
     const formdata = {
      businessName: this.businessName || '',
      businessDescription: this.businessDescription || '',
      colourChoice: this.colourChoice ?? null,
      logoStyleChoice: this.logoStyleChoice ?? null,
      aboutUs: this.aboutUs || '',
      socialProof: this.socialProof || '',
      contactInfo: this.contactInfo
        ? this.contactInfo.split('\n').filter(line => line.trim() !== '')
        : [],
      services: this.services
        .filter(service => service.name || service.description)
        .map(service => ({
          name: service.name || '',
          description: service.description || ''
        }))
    };
  
    //console.log('Form Data:', formdata);
    this.Apiser.updatewebsite(formdata).subscribe({
      next: (res) => {
        this.getwebinfo();
        alert('Data has been updated successfully.');
      },
      error: (err) => {
        alert('Data has not been updated successfully.');
      }
    });
    
  }
 

  getwebinfo() {
    this.Apiser.getwebsite().subscribe((res) => {
      console.log(res);
      if (res && res.websites && Object.keys(res.websites).length > 0) {
        this.isSaved = false;
        localStorage.setItem("idweb", res.websites.id);
  
        const data = res.websites;
  
        // تعبئة المتغيرات
        this.businessName = data.business_name || '';
        this.businessDescription = data.business_description || '';
        this.colourChoice = data.colour_choice ?? null;
        this.logoStyleChoice = data.logo_style_choice ?? null;
        this.aboutUs = data.about_us || '';
        this.socialProof = data.social_proof || '';
        this.contactInfo = data.contact_info?.join('\n') || ''; // تحويل المصفوفة إلى نص متعدد الأسطر
  
        // تعبئة الخدمات
        this.services = data.services?.map((service: any) => ({
          name: service.name || '',
          description: service.description || ''
        })) || [
          { name: '', description: '' },
          { name: '', description: '' },
          { name: '', description: '' },
        ];
  
        // لو تحتاج ملء فقط أول 3 خدمات
        while (this.services.length < 3) {
          this.services.push({ name: '', description: '' });
        }
      } else {
        this.isSaved = true;
      }
    });
  }
  

}
