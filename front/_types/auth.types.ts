export interface IVerifyOtpDto {
  mobile: string;
  code: string;
}

export type verifyOtpProps = {
  data: {
    mobile: string;
    code: string;
    expire_date: string;
  };
  onResendSuccess: (data: any) => void;
};
