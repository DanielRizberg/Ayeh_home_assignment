import { comment } from './comment';


export interface commentDto extends comment {
    postId:number;
}