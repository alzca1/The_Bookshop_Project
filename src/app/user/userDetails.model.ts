export class UserDetails {
  constructor(
    public firstName: string,
    public surname: string,
    public birthDate: Date,
    public address1: string,
    public address2: string,
    public postCode: number,
    public city: string,
    public country: string,
    private id?: string,
  ) {}
}
