export enum Priority {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH'
}

export interface Todo{
 id : number     
 email : string      
 title : string     
 description : string
 priority : Priority
 created_at :Date 
 completed_at : Date
 deadline : Date
 editMode: boolean;
}