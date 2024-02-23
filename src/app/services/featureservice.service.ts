import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeatureserviceService {
  



  private featureSubject : BehaviorSubject<number>  ;
  public feature: Observable<number>;


  private zonaSubject : BehaviorSubject<any>  ;
  public static zonas: Observable<any>;


  constructor() { 


    this.featureSubject = new BehaviorSubject<number>(null!);
    this.feature = this.featureSubject.asObservable();
    this.zonaSubject = new BehaviorSubject<any>(null!);
    FeatureserviceService.zonas = this.zonaSubject.asObservable();



  }


  public get featureData(): number{
    return this.featureSubject.value;
  }
    
  public getfeature$(): Observable<number> {
    return this.feature;
  }

  public static getZonas$(): Observable<any> {
    return this.zonas;
  }



  public updatefeature(id : number){


    this.featureSubject.next(id);

  }


  public updateZonase(zonas : any){


    this.zonaSubject.next(zonas);

  }





}
