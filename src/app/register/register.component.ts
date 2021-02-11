import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../services/account.service';
//import * as EventEmitter from 'events';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

 
 @Output() cancelRegister=new EventEmitter();
  model:any={};
  constructor(private accountService:AccountService,private toastr:ToastrService) { }

  ngOnInit(): void {
  }

  register()
  {
    this.accountService.register(this.model).subscribe(
      response=>
      {
        console.log(response);
        this.cancel();
      },
      (error)=>
      {
        console.log("error--"+error);
        this.toastr.error("toastrerror--"+error.error);
      }
    )
       
  }

  cancel()
  {
    this.cancelRegister.emit(false);
    console.log("cancelled");
  }

}
