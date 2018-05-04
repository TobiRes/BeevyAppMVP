import {Injectable} from "@angular/core";
import {Storage} from "@ionic/storage";

@Injectable()
export class UserService{

  constructor(private storage: Storage){}

  checkIfUserExists(): Promise<any>{

  }
}
