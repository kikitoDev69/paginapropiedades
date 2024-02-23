import { Component, OnInit } from '@angular/core';
import { ApiAuthService } from 'src/app/services/api-auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{

  constructor(private apiauth : ApiAuthService){}


  ngOnInit(): void {
    
  }
}
