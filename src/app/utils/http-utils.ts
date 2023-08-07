import { HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

export function getHttpOptions(cookieService: CookieService) {
  const userInfoData = JSON.parse(cookieService.get('userInfo'));
  return {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Userid': userInfoData.userid,
      'Key': userInfoData.key,
    })
  };
}
