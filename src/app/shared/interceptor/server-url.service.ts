import { Headers } from '@angular/http';
import { Interceptor, InterceptedRequest, InterceptedResponse } from 'ng2-interceptors';
import { Injectable } from '@angular/core';

//comment @Injectable() for no injection case
@Injectable()
export class ServerURLInterceptor implements Interceptor {
    public interceptBefore(request: InterceptedRequest): InterceptedRequest {

        let headers = request.options.headers;
        let token   = localStorage.getItem('auth_token');
        headers.set('Content-Type', 'application/json');
        headers.set('Authorization', `Bearer ${token}`);

        //console.log(request);
        return request;
    }

    public interceptAfter(response: InterceptedResponse): InterceptedResponse {
        return response;
    }
}
