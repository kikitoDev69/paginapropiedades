import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeatureserviceService {



  private featureSubject : BehaviorSubject<number>  ;

  public feature: Observable<number>;

  constructor() { 


    this.featureSubject = new BehaviorSubject<number>(null!);
    this.feature = this.featureSubject.asObservable();


  }


  public get featureData(): number{
    return this.featureSubject.value;
  }
    
  public getfeature$(): Observable<number> {
    return this.feature;
  }

  // public get datafeature(): number{
  //   return this.featureSubject;
  // }

  public updatefeature(id : number){


    this.featureSubject.next(id);

  }





}
