import { InterceptorService } from 'ng2-interceptors';
import { XHRBackend, RequestOptions } from '@angular/http';
import { ServerURLInterceptor} from './server-url.service';

// No Injection
// export function interceptorFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions){
//   let service = new InterceptorService(xhrBackend, requestOptions);
//   service.addInterceptor(new ServerURLInterceptor());
//   return service;
// }

// Injection
export function interceptorFactory(xhrBackend: XHRBackend,
                requestOptions: RequestOptions,
                serverURLInterceptor:ServerURLInterceptor){                
  let service = new InterceptorService(xhrBackend, requestOptions);
  service.addInterceptor(serverURLInterceptor);
  return service;
}
