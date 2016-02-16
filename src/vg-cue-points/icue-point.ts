export interface ICuePoint {
    start:number;
    end?:number;
    params?:any;
    isCompleted:boolean;
    isDirty:boolean;
}
