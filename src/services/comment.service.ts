import {BeevyEvent} from "../models/event.model";
import {HttpClient} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {AppConfig} from "../config/app-config";
import {User} from "../models/user.model";
import {SecurityUtil} from "../utils/security-util";
import {SecurityUserData} from "../models/security-user-data.model";
import {EventComment} from "../models/comment.model";

@Injectable()
export class CommentService {

  private static BEEVY_COMMENT_BASE_URL = AppConfig.API_BASE_URL + "/comment";

  constructor(private http: HttpClient) {
  }

  loadComments(user: User, event: BeevyEvent): Promise<EventComment[]> {
    return new Promise((resolve, reject) => {
      let userAccessData: SecurityUserData = SecurityUtil.generateUserAccessData(user);
      this.http.post(AppConfig.API_BASE_URL + "/user/access", userAccessData)
        .subscribe(() => {
          this.http.get(CommentService.BEEVY_COMMENT_BASE_URL + "/" + event.eventID + "/" + user.userID + "/" + userAccessData.tempToken)
            .subscribe((eventComments: EventComment[]) => {
              resolve(eventComments ? eventComments : []);
            }, err => reject(err));
        })
    })
  }
}
