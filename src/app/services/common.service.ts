import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }

  getAllPost() {
    return this.http.post('https://xibkl8mhh1.execute-api.eu-west-1.amazonaws.com/dev/demo/getTestAsset', {
      "game_id": "test0001",
      email: 'test@gmail.com'
    });
  }
}
