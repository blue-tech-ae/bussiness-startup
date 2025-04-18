import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApisService } from './apis.service';
@Injectable({
  providedIn: 'root'
})
export class GetAllDataService{
 private baseUrl = 'https://palegreen-leopard-428869.hostingersite.com/api';
  
 
  private getHttpOptions(): { headers: HttpHeaders } {
    const token = localStorage.getItem('token'); // جلب التوكن
    const businessId = this.apiService.getBusinessId();


    return {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'business_id': businessId
       
      })
    };
  }
  constructor(private http: HttpClient,private apiService:ApisService) { }

 
getAllDataForPDF(){
  return this.http.get(
    `https://businesstools-admin.valuenationapp.com/api/download-business-data`, 
      this.getHttpOptions()
  ); 
}

  
}
