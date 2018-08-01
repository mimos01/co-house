import { Injectable } from '@angular/core'
import * as firebase from 'firebase/app';
import { CollectionReference } from '../../../node_modules/@firebase/firestore-types';


@Injectable()
export class SearchHouseService {

    getHouses(searchString) {
        console.log('searchString: ' + searchString);
       return (firebase.firestore().collection('houses') + searchString) as CollectionReference;
       //return firebase.firestore() + searchString;
        
    }

}