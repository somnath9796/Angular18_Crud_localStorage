import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { EmployeeModel } from './model/Employee';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  employeeform: FormGroup = new FormGroup({});
  employeeObj : EmployeeModel= new EmployeeModel(); // object of employee class
  employeeList : EmployeeModel[] = [];
  
constructor()
{
  debugger;
  this.createForm();
  const oldData = localStorage.getItem("EmpData");
  if(oldData !=null)
    {
      const parseData = JSON.parse(oldData);
      this.employeeList = parseData
    }
}

  createForm()
  {
    this.employeeform = new FormGroup({
     EmpId :  new FormControl(this.employeeObj.EmpId),
     Name :  new FormControl(this.employeeObj.Name,Validators.required),
     State :  new FormControl(this.employeeObj.State),
     City :  new FormControl(this.employeeObj.City),
     EmailID :  new FormControl(this.employeeObj.EmailID),
     ContactNo :  new FormControl(this.employeeObj.ContactNo),
     Address :  new FormControl(this.employeeObj.Address),
     Pincode :  new FormControl(this.employeeObj.PinCode,[Validators.required,Validators.minLength(6)]),
    })
  }

  OnSave()
  {
    debugger;
    const oldData = localStorage.getItem("EmpData");
    if(oldData !=null)
    {
      const parseData = JSON.parse(oldData);
      this.employeeform.controls['EmpId'].setValue(parseData.length + 1);
      this.employeeList.unshift(this.employeeform.value);
    }
    else
    {
      this.employeeList.unshift(this.employeeform.value);
    }
    localStorage.setItem("EmpData",JSON.stringify(this.employeeList))
  }

  OnEdit(item:EmployeeModel)
  {
    debugger;
    this.employeeObj = item;
    this.createForm()
  }
   OnUpdate()
   {
    debugger;
      const record = this.employeeList.find(x=>x.EmpId = this.employeeform.controls["EmpId"].value)
      if(record != undefined)
      {
        record.Address = this.employeeform.controls["Address"].value;
        record.Name = this.employeeform.controls["Name"].value;
        record.City = this.employeeform.controls["City"].value;
        record.State = this.employeeform.controls["State"].value;
        record.EmailID = this.employeeform.controls["EmailID"].value;
        record.ContactNo = this.employeeform.controls["ContactNo"].value;
        record.PinCode = this.employeeform.controls["PinCode"].value;
      }
      localStorage.setItem("EmpData",JSON.stringify(this.employeeList))
      this.onreset()
   }
   OnDelete(id : number)
   {
      const iSDelete = confirm("Are you sure you want to delete");
    if(iSDelete)
    {
      const emp = this.employeeList.findIndex(x=>x.EmpId == id)
      this.employeeList.splice(emp,1)
    }
      localStorage.setItem("EmpData",JSON.stringify(this.employeeList))
   }
   onreset()
   {
    this.employeeObj = new EmployeeModel();
      this.createForm();
   }
}
