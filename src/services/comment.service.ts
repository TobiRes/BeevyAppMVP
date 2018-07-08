import {BeevyEvent} from "../models/event.model";
import {HttpClient} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {AppConfig} from "../config/app-config";
import {User} from "../models/user.model";
import {SecurityUtil} from "../utils/security-util";
import {SecurityUserData} from "../models/security-user-data.model";
import {CommentDTO, EventComment} from "../models/comment.model";

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

  createComment(be: BeevyEvent) {
    //return this.http.post(BeevyEventService.BEEVY_EVENT_BASE_URL + "/create", beevent);
  }

  addComment(eventID: string, userID: string, token: string, commentBody: string, repliedTo: string | undefined): Promise<any> {
    let commentDTO: CommentDTO = {
      userID: userID,
      userToken: token,
      eventID: eventID,
      repliedTo: repliedTo,
      commentBody: commentBody,
      commentTime: new Date().toISOString()
    }
    return new Promise((resolve, reject) => {
      this.http.post(CommentService.BEEVY_COMMENT_BASE_URL, commentDTO)
        .subscribe(() => resolve(),
          err => reject(err))
    })
  }
}
