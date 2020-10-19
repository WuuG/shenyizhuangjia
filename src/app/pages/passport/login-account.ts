export interface LoginAccount {
    Id?: number;
    UserId: number;
    Type: string;
    ThirdParty: boolean;
    Identifier: string;
    PasswordToken: string;
}
