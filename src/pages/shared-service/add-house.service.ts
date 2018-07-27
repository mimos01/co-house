import { Injectable } from '@angular/core';

@Injectable()
export class AddHouseService {
  public province: string;
  public postalCode: string;
  public cityFromPostalCode: string;
  public street: string;
  public icons: string;
  public garden: boolean;
  public smokers: boolean;
  public pets_allowed: boolean;
  public room_furnished: boolean;
  public age_from: number;
  public age_to: number;
  public price_month: number;
  public imagePaths: Array<string>;
  public nameDescription: string;
  public houseDescription: string;
  public residentsDescription: string;
  public number_of_residents: number;
  public email: string;
  public uid: string;
  public valid_until: string;

}