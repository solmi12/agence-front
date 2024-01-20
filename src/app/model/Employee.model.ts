import { Department } from "./Department.model";
import { Project } from "./Project.model";

export class EmployeeModel{
  

    constructor(
      public id:number,
      public firstname: string,
      public lastName: string,
      public email: string,
      public birthDay: string,
      public imageData: string,
      public project: Project,
      public department: Department
    ) {}
 }
