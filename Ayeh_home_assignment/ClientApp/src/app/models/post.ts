import { comment } from "./comment";
export interface post {
    id: number;
    author: string;
    title: string;
    favorite: boolean;
    comments: comment[];
}


