import { SafeUrl } from '@angular/platform-browser';

export interface MovieTV{
    id:string;
    title:string;
    overview:string;
    imageUrl?:string;
    videoUrl?:SafeUrl;
    hasVideo:boolean;
}