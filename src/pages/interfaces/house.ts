export interface House {
    id: string;
    name: string;
    description: string;
    province: string;
    postalCode: string;
    street: string;
    city: string;
    icons: string;
    age_from: number;
    age_to: number;
    garden: boolean;
    number_of_residents: number;
    room_furnished: boolean;
    /*only_female: boolean;
    only_male: boolean;*/
    smoker_allowed: boolean;
    price_month: number;
    residents: string;
    pets_allowed: boolean;
    email: string;
    images: object;
    uid: string;
    valid_until: string;
}