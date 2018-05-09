export class SecurityUtil {
  static generateRandomToken(): string {
    return Math.random().toString(36).substr(2, 13);
  }
}
