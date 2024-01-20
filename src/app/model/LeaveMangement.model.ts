import { EmployeeModel } from "./Employee.model";

export class LeaveManegement{
    constructor(public debutDate: string,
        public id:number,
        public finDate: string,
        public accepted:string,
        public created:string,
        public employee:EmployeeModel
    
       ){}

}