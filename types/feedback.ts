export interface Feedback {
  _id?: string;
  id_user: string;    
  id_event: string;
  content: string;
  rate: number;
  date?: string;
}

export interface CreateFeedbackDTO {
  id_event: string;
  content: string;
  rate: number;
}
