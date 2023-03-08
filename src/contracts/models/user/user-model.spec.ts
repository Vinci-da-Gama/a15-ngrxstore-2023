import { UserModel } from './user-model';

describe('UserMode', () => {
  it('should create an instance', () => {
    expect(new UserModel('', '', '', new Date())).toBeTruthy();
  });
});
