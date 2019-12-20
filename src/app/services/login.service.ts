import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  constructor(private http: HttpClient, private router: Router) { }
  
  // url to send requests to the backend.
  private url: string = "http://localhost:8080/RecipeBackEnd/login";
  // body to send the username and password.
  private body: string;
  /* 
    http header to say what type of content the body will have
    and an observe property with value response in order to get
    back an http response to get back the authorization token that
    the backend made for us.
  */
  private httpOptions = {
    headers: new HttpHeaders({"Content-Type": "application/x-www-form-urlencoded"}),
    observe: "response" as "body"
  };
  // auth to store the authorization header which has the token.
  private auth: string;

  /* 
    This function is called when the submit button is clicked
    it then takes the username and password that was on the input
    fields and puts them on the body that will be sent.
    We then do a post request and pass in the url, body and options (headers).
    After subscribing to it we retrieve the authorization token and add it to the
    sessionStorage. Finally, we route to the user-info component.

    the user-info component is just for testing. instead of navigating to it, navigate
    to one of the components you did.
  */
  authenticate (username: string, password: string) {
    this.body = `username=${username}&password=${password}`;
    this.http.post(`${this.url}`,this.body,this.httpOptions).subscribe( response => {
      this.auth = (response["headers"].get("Authorization"));
      sessionStorage.setItem("token", this.auth);
      this.router.navigate(["user-info"]);
    });
  }
}
