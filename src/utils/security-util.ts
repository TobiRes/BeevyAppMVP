import {SecurityUserData} from "../models/security-user-data.model";
import {User} from "../models/user.model";

export class SecurityUtil {
  static generateRandomToken(): string {
    return Math.random().toString(36).substr(2, 13);
  }

  static generateUserAccessData(user: User): SecurityUserData {
    return {
      username: user.username,
      userID: user.userID,
      token: user.token,
      tempToken: SecurityUtil.generateRandomToken()
    }
  }
}
