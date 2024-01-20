export class WorkResponse{
    private _userId: number;
    private _workId: number;
    private _title: string;
    private _startTime: string;
    private _duration: Number;
    private _description: string;
  
    constructor(
      userId: number,
      workId: number,
      title: string,
      startTime: string,
      duration: Number,
      description: string
    ) {
      this._userId = userId;
      this._workId = workId;
      this._title = title;
      this._startTime = startTime;
      this._duration = duration;
      this._description = description;
    }
  
    // Getters
    get userId(): number {
      return this._userId;
    }
  
    get workId(): number {
      return this._workId;
    }
  
    get title(): string {
      return this._title;
    }
  
    get startTime(): string {
      return this._startTime;
    }
  
    get duration(): Number {
      return this._duration;
    }
  
    get description(): string {
      return this._description;
    }
  
    // Setters
    set userId(userId: number) {
      this._userId = userId;
    }
  
    set workId(workId: number) {
      this._workId = workId;
    }
  
    set title(title: string) {
      this._title = title;
    }
  
    set startTime(startTime: string) {
      this._startTime = startTime;
    }
  
    set duration(duration: Number) {
      this._duration = duration;
    }
  
    set description(description: string) {
      this._description = description;
    }
}