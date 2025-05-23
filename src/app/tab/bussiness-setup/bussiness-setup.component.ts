import { Component, HostListener, OnInit } from '@angular/core';
import { ApisService } from '../../services/apis.service';

interface LegalRequirement {
  description: string;
}

interface License {
  name: string;
  requirements: string[];
  status: 'Pending' | 'In Progress' | 'Completed';
  deadline: string;
}

interface Location {
  type: string;
  address: string;
  size: number;
  monthlyCost: number;
}

interface Insurance {
  type: string;
  provider: string;
  coverage: string;
  annualCost: number;
}

@Component({
  selector: 'app-bussiness-setup',
  templateUrl: './bussiness-setup.component.html',
  styleUrls: ['./bussiness-setup.component.css']
})
export class BussinessSetupComponent implements OnInit {
  videoUrl:any=""
 videoDescription=""
  // Legal Structure
  businessTypes = [
    'Sole Proprietorship',
    'Partnership',
    'Limited Liability Company (LLC)',
    'Corporation',
    'S Corporation',
    'Nonprofit Organization'
  ];

  legalStructure = {
    businessType: '',
    requirements: [''] as string[],
    timeline: '',
    setupCosts: null as number | null
  };

  // Licenses and Permits
  licenses: License[] = [{
    name: '',
    requirements: [''],
    status: 'Pending',
    deadline: ''
  }];

  // Location
  locations: Location[] = [{
    type: '',
    address: '',
    size: 0,
    monthlyCost: 0
  }];

  // Insurance
  insurances: Insurance[] = [{
    type: '',
    provider: '',
    coverage: '',
    annualCost: 0
  }];

  // Status Options
  statusOptions = ['Pending', 'In Progress', 'Completed'];
isSaved=true;
isUpdate=false;
 
  constructor(private apisService: ApisService) {}
  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: "smooth" });
    this.getVedio("Business_Setup")
    this.getBussinessSetup()
    }
  getVedio(title:any){
    this.apisService.GetVedio(title).subscribe((response)=>{
      console.log(response)
      
      this.videoUrl=response.data[0].video_path
      this.videoDescription=response.data[0].description

      
    })
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
  trackByIndex(index: number, item: any): number {
    return index;
  }

  // Methods for Legal Structure
  addRequirement() {
    this.legalStructure.requirements.push('');
  }

  removeRequirement(index: number) {
    this.legalStructure.requirements.splice(index, 1);
  }

  // Methods for Licenses
  addLicense() {
    this.licenses.push({
      name: '',
      requirements: [''],
      status: 'Pending',
      deadline: ''
    });
  }

  removeLicense(index: number) {
    this.licenses.splice(index, 1);
  }

  addLicenseRequirement(licenseIndex: number) {
    this.licenses[licenseIndex].requirements.push('');
  }

  removeLicenseRequirement(licenseIndex: number, reqIndex: number) {
    this.licenses[licenseIndex].requirements.splice(reqIndex, 1);
  }

  // Methods for Locations
  addLocation() {
    this.locations.push({
      type: '',
      address: '',
      size: 0,
      monthlyCost: 0
    });
  }

  removeLocation(index: number) {
    this.locations.splice(index, 1);
  }

  // Methods for Insurance
  addInsurance() {
    this.insurances.push({
      type: '',
      provider: '',
      coverage: '',
      annualCost: 0
    });
  }

  removeInsurance(index: number) {
    this.insurances.splice(index, 1); 
  }

  saveProgress() {
    const formData = {
      LegalStructure: {
          BusinessType: this.legalStructure?.businessType || "",
          Requirements: (this.legalStructure?.requirements || []).filter(req => req && req.trim()),
          Timeline: this.legalStructure?.timeline || "",
          SetupCosts: Number(this.legalStructure?.setupCosts) || 0
      },
      LicensesAndPermits: (this.licenses || [])
          .filter(license =>
              (license?.name && license.name.trim()) ||
              (license?.requirements || []).some(req => req && req.trim()) ||
              license?.deadline
          )
          .map(license => ({
              name: license?.name || "N/A",
              requirements: (license?.requirements || []).filter(req => req && req.trim()),
              status: license?.status || "Pending",
              deadline: license?.deadline || ""
          })),
      Locations: (this.locations || [])
          .filter(location =>
              (location?.type && location.type.trim()) ||
              (location?.address && location.address.trim()) ||
              location?.size > 0 ||
              location?.monthlyCost > 0
          )
          .map(location => ({
              type: location?.type || "Unknown",
              address: location?.address || "No Address",
              size: Number(location?.size) || 0,
              monthlyCost: Number(location?.monthlyCost) || 0
          })),
      Insurance: (this.insurances || [])
          .filter(insurance =>
              (insurance?.type && insurance.type.trim()) ||
              (insurance?.provider && insurance.provider.trim()) ||
              (insurance?.coverage && insurance.coverage.trim()) ||
              insurance?.annualCost > 0
          )
          .map(insurance => ({
              type: insurance?.type || "Unknown",
              provider: insurance?.provider || "No Provider",
              coverage: insurance?.coverage || "No Coverage",
              annualCost: Number(insurance?.annualCost) || 0
          }))
  };

    this.apisService.saveBusinessSetup(formData).subscribe({
        next: (response) => {
           this.getBussinessSetup();
 
            alert('Data has been saved successfully.');
        },
        error: (error) => {
            alert("Error updating data. Please check your input.");
            this.getBussinessSetup();
        }
    });
}

//   updateProgress() {
//     const formData = {
//       LegalStructure: {
//           BusinessType: this.legalStructure.businessType,
//           Requirements: this.legalStructure.requirements.filter(req => req.trim()),
//           Timeline: this.legalStructure.timeline,
//           SetupCosts: Number(this.legalStructure.setupCosts) 
//       },
//       LicensesAndPermits: this.licenses.filter(license => 
//           license.name.trim() || 
//           license.requirements.some(req => req.trim()) ||
//           license.deadline
//       ).map(license => ({
//           name: license.name,
//           requirements: license.requirements.filter(req => req.trim()),
//           status: license.status || "Pending", // التأكد من وجود حالة الترخيص
//           deadline: license.deadline
//       })),
//       Locations: this.locations.filter(location => 
//           location.type.trim() || 
//           location.address.trim() || 
//           location.size > 0 || 
//           location.monthlyCost > 0
//       ).map(location => ({
//           type: location.type,
//           address: location.address,
//           size: Number(location.size),
//           monthlyCost: Number(location.monthlyCost)
//       })),
//       Insurance: this.insurances.filter(insurance => 
//           insurance.type.trim() || 
//           insurance.provider.trim() || 
//           insurance.coverage.trim() || 
//           insurance.annualCost > 0
//       ).map(insurance => ({
//           type: insurance.type,
//           provider: insurance.provider,
//           coverage: insurance.coverage,
//           annualCost: Number(insurance.annualCost)
//       }))
//   };

//     this.apisService.updateBusinessSetup(formData).subscribe({
//       next: (response) => {
//         this.getBussinessSetup()
// ///console.log('Business setup data saved successfully:', response);
//         alert('Data has been update successfully.');
//       },
//       error: (error) => {
//         alert("Error updating data. Please check your input.")
//       }
//     });
//   }
updateProgress() {
  const formData = {
      LegalStructure: {
          BusinessType: this.legalStructure?.businessType || "",
          Requirements: (this.legalStructure?.requirements || []).filter(req => req && req.trim()),
          Timeline: this.legalStructure?.timeline || "",
          SetupCosts: Number(this.legalStructure?.setupCosts) || 0
      },
      LicensesAndPermits: (this.licenses || [])
          .filter(license =>
              (license?.name && license.name.trim()) ||
              (license?.requirements || []).some(req => req && req.trim()) ||
              license?.deadline
          )
          .map(license => ({
              name: license?.name || "N/A",
              requirements: (license?.requirements || []).filter(req => req && req.trim()),
              status: license?.status || "Pending",
              deadline: license?.deadline || ""
          })),
      Locations: (this.locations || [])
          .filter(location =>
              (location?.type && location.type.trim()) ||
              (location?.address && location.address.trim()) ||
              location?.size > 0 ||
              location?.monthlyCost > 0
          )
          .map(location => ({
              type: location?.type || "Unknown",
              address: location?.address || "No Address",
              size: Number(location?.size) || 0,
              monthlyCost: Number(location?.monthlyCost) || 0
          })),
      Insurance: (this.insurances || [])
          .filter(insurance =>
              (insurance?.type && insurance.type.trim()) ||
              (insurance?.provider && insurance.provider.trim()) ||
              (insurance?.coverage && insurance.coverage.trim()) ||
              insurance?.annualCost > 0
          )
          .map(insurance => ({
              type: insurance?.type || "Unknown",
              provider: insurance?.provider || "No Provider",
              coverage: insurance?.coverage || "No Coverage",
              annualCost: Number(insurance?.annualCost) || 0
          }))
  };

  this.apisService.updateBusinessSetup(formData).subscribe({
      next: (response) => {
          this.getBussinessSetup();
          alert('Data has been updated successfully.');
      },
      error: (error) => {
          alert("Error updating data. Please check your input.");
          this.getBussinessSetup();
      }
  });
}

  getBussinessSetup() {
    this.apisService.getbusinesssetups().subscribe((res) => {
        if (!res || Object.keys(res).length === 0) {
            // إذا كان response فارغًا
            this.isSaved = true;
        } else {
            // إذا كان هناك بيانات
            this.isSaved = false;
            localStorage.setItem("idsetup", res.id);

           // console.log(res);
            
            this.legalStructure.businessType = res.business_type;
            this.legalStructure.requirements = res.requirements || [];
            this.legalStructure.timeline = res.timeline;
            this.legalStructure.setupCosts = parseFloat(res.setup_costs);
            
            this.licenses = res.licenses?.map((license: any) => ({
                name: license.name,
                requirements: license.requirements || [],
                status: license.status,
                deadline: license.deadline
            })) || [];
            
            this.locations = res.locations?.map((location: any) => ({
                type: location.type,
                address: location.address,
                size: location.size,
                monthlyCost: parseFloat(location.monthly_cost)
            })) || [];
            
            this.insurances = res.insurances?.map((insurance: any) => ({
                type: insurance.type,
                provider: insurance.provider,
                coverage: insurance.coverage,
                annualCost: parseFloat(insurance.annual_cost)
            })) || [];
        }
    }, (error) => {
        console.error("error fetching data", error);
        this.isSaved = true; // في حالة حدوث خطأ، نعتبر أن البيانات غير متوفرة
    });
}


}
