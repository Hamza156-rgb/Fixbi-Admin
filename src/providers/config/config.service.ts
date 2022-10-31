
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


if (localStorage.langId == undefined) {

  localStorage.langId = '1';//default language id
  localStorage.languageCode = "en"; //default language code
  localStorage.direction = "ltr"; //default language direction of app
  localStorage.currency = "$";  //default currecny html code to show in app.
  // Please visit this link to get your html code  https://html-css-js.com/html/character-codes/currency/
  localStorage.currencyCode = "USD";  //default currency code
  localStorage.currencyPos = "left";  //default currency position
  localStorage.decimals = 2;  //default currecny decimal
  localStorage.tabsNavigation = true;  //default currecny decimal
}

@Injectable()

export class ConfigService {

  public yourSiteUrl: string = 'https://fixbiapi.codetreck.com/public/api/v1/';
  public consumerKey: string = "dadb7a7c1557917902724bbbf5";
  public consumerSecret: string = "3ba77f821557917902b1d57373";
	userData   : any;
   isLoggedIn = false;
 
  public url: string = this.yourSiteUrl + '/api/v1';
  public imgUrl: string = 'https://fixbiapi.codetreck.com/';

  public currentRoute = "home";
  constructor(

    public http: HttpClient,
    private toastr : ToastrService,private router : Router,
  ) {

  }
  getHttp(req: any, data: any) {
    let d = new Date();
    const httpOptions = {
      headers: new HttpHeaders({
        'consumer-key': this.consumerKey,
        'consumer-secret': this.consumerSecret,
        'consumer-nonce': d.getTime().toString(),
        'consumer-device-id': 'device id of the app',
        'consumer-ip': '192.168.1.11',
      })
    };
    const nativeHeaders = {
      'consumer-key': this.consumerKey,
      'consumer-secret': this.consumerSecret,
      'consumer-nonce': d.getTime().toString(),
      'consumer-device-id': 'device id of the app',
      'consumer-ip': '192.168.1.11',
      'Content-Type': 'application/json',
    };

    return new Promise(resolve => {

      this.http.get(this.yourSiteUrl + req, data).subscribe((data: any) => {
        resolve(data);
      }, (err) => {
        console.log("Error : " + req);
        console.log(err);
      });

    });
  }
  getHttp1(req: any, data: any) {
    let d = new Date();
    const httpOptions = {
      headers: new HttpHeaders({
        'consumer-key': this.consumerKey,
        'consumer-secret': this.consumerSecret,
        'consumer-nonce': d.getTime().toString(),
        'consumer-device-id': 'device id of the app',
        'consumer-ip': '192.168.1.11',
      })
    };
    const nativeHeaders = {
      'consumer-key': this.consumerKey,
      'consumer-secret': this.consumerSecret,
      'consumer-nonce': d.getTime().toString(),
      'consumer-device-id': 'device id of the app',
      'consumer-ip': '192.168.1.11',
      'Content-Type': 'application/json',
    };

    return new Promise(resolve => {

      this.http.get(req, data).subscribe((data: any) => {
        resolve(data);
      }, (err) => {
        console.log("Error : " + req);
        console.log(err);
      });

    });
  }
  postHttp(req: any, data: any) {
    let d = new Date();
    const httpOptions = {
      headers: new HttpHeaders({
        'consumer-key': this.consumerKey,
        'consumer-secret': this.consumerSecret,
        'consumer-nonce': d.getTime().toString(),
        'consumer-device-id': 'device id of the app',
        'consumer-ip': '192.168.1.11',
      })
    };
    const nativeHeaders = {
      'Content-Type': 'application/json',
      'consumer-key': this.consumerKey,
      'consumer-secret': this.consumerSecret,
      'consumer-nonce': d.getTime().toString(),
      'consumer-device-id': 'device id of the app',
      'consumer-ip': '192.168.1.11',
    };

    return new Promise(resolve => {
      console.log(data);
      this.http.post(this.yourSiteUrl + req, data).subscribe((data: any) => {
        resolve(data);
      }, (err) => {
        console.log("Error : " + req);
        console.log(err);
      });
  });
  }

  adminLogin(ulr, data){
    return new Promise(resolve => {
      this.http.post(this.yourSiteUrl + ulr, data).subscribe((data: any) => {
        resolve(data);
        console.log(data)
        if(data.status == 200){
          this.setLocalUserProfile(data);
          this.toastr.success('Successfully Logged In!');
          this.router.navigate(['/']);
        }
        else if (data.status == 400){
          this.toastr.error(data.error);
          return;
        }
      }, (err) => {
        if(err.status==400){
          
          this.toastr.error(err.error.error);
        }
        else if(err.status == 500){
          this.toastr.error('Something Went Wrong');
          return;
        }
      });
    });
  }
  setLocalUserProfile(value){
    localStorage.setItem("userProfile", JSON.stringify(value));
    localStorage.setItem("name", value.user.name);
     this.getLocalStorageUser();
     this.isLoggedIn = true;
  }
  getLocalStorageUser(){
    this.userData = JSON.parse(localStorage.getItem("userProfile"));
    if(this.userData) {
       this.isLoggedIn = true;
       return true;
    } else {
       this.isLoggedIn = false;
       return false;
    }
 }


  // postRegister(req: any, data: any) {
  //   let d = new Date();
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'consumer-key': this.consumerKey,
  //       'consumer-secret': this.consumerSecret,
  //       'consumer-nonce': d.getTime().toString(),
  //       'consumer-device-id': 'device id of the app',
  //       'consumer-ip': '192.168.1.11',
  //     })
  //   };
  //   const nativeHeaders = {
  //     'Content-Type': 'application/json',
  //     'consumer-key': this.consumerKey,
  //     'consumer-secret': this.consumerSecret,
  //     'consumer-nonce': d.getTime().toString(),
  //     'consumer-device-id': 'device id of the app',
  //     'consumer-ip': '192.168.1.11',
  //   };

  //   return new Promise(resolve => {

  //     this.http.post(this.yourSiteUrl + req, data).subscribe((data: any) => {
  //       resolve(data);
  //     }, (err) => {
  //       console.log("Error : " + req);
  //       console.log(err);
  //     });
  //   });
  // }

}