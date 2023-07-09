import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "./login.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private loginService:LoginService){}
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        const token = this.loginService.getToken();
        if(token != null){
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": 'application/json',
                }
            }); 
        }
        return next.handle(req);
    }
}

export const authInterceptorProviders = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi:true
    }
];