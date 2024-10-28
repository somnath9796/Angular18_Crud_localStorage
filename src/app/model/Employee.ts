export class EmployeeModel
{
    EmpId : number;
    Name :string;
    City :string;
    State :string;
    EmailID :string;
    Address :string;
    ContactNo : string;
    PinCode : string;

    constructor()
    {
        this.EmpId = 1;
        this.Name = '';
        this.City = '';
        this.State = '';
        this.EmailID = '';
        this.Address = '';
        this.ContactNo = '';
        this.PinCode = '';

    }
}
