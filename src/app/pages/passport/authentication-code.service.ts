import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationCodeService {
    // 用于保存验证码
    private code: string;
    // 存放验证码的过期时间
    private deadline: number;
  constructor() {
    this.code = '';
   }

  //  const NUMS = "0123456789";
  //  makeId(count: number): string {
  //    for(let i=0;i<count;i++) {
  //      let r = Math
  //    }
  //  }
  createCode(count: number): string{
    this.code = '';
    this.deadline = Date.now() + 60 * 1000;
    for (let i = 0; i < count; i++){
      this.code += Math.floor(Math.random() * 10);
    }
    return this.code;
  }
  // 验证用户输入的短信验证码是否一致，是否过期
  validate(value: string): boolean{
    const now = Date.now();
    console.log('now',now,'this.deadline',this.deadline);
    return value === this.code && now < this.deadline;
  }
}
