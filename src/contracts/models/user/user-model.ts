export class UserModel {
  /**
   * @param email {string} - The email address
   * @param localUserId {string} - The local user id
   * @param _token {string} - The token
   * @param _tokenExpiredOnDate {Date} - Date and time for the expired token
   */
  constructor(
    public email: string,
    public localUserId: string,
    private _token: string,
    private _tokenExpiredOnDate: Date
  ) {}

  get token(): string | null {
    if (!this._tokenExpiredOnDate || new Date() > this._tokenExpiredOnDate) {
      return null;
    }
    return this._token;
  }
}
