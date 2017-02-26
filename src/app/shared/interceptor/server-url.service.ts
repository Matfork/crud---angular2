import { Headers } from '@angular/http';
import { Interceptor, InterceptedRequest, InterceptedResponse } from 'ng2-interceptors';
import { Injectable } from '@angular/core';

//comment @Injectable() for no injection case
@Injectable()
export class ServerURLInterceptor implements Interceptor {
    public interceptBefore(request: InterceptedRequest): InterceptedRequest {

        let headers = request.options.headers;
        let token   = localStorage.getItem('auth_token');
        //headers.set('Content-Type', 'application/x-www-form-urlencoded');
        headers.set('Content-Type', 'application/json');
        headers.set('Authorization', `Bearer ${token}`);

        //intercepts all body data and change camelCase to under_score case
        request.options.body = this.toUnderscore(request.options.body);
        //console.log(request);

        return request;
    }

    public interceptAfter(response: InterceptedResponse): InterceptedResponse {
        return response;
    }

    private toUnderscore(body: Object) {
      let newBody = {};
      for (var key in body) {
          let newKey = key.replace(
                        /(?:^|\.?)([A-Z])/g,
                        function (x,y){return "_" + y.toLowerCase()}
                      ).replace(/^_/, "");

          newBody[newKey] = body[key];

          if(typeof(body[key]) === 'object' ){
            newBody[newKey] = this.toUnderscore(body[key]);
          }
      }

      return newBody;
    }
}
