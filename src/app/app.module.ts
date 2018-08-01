import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicApp, IonicModule, IonicErrorHandler, IonicPageModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { PathLocationStrategy, LocationStrategy } from '@angular/common';

import { SearchPage } from '../pages/search/search';
import { ProfilePage } from '../pages/profile/profile';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { HouseDetailPage } from '../pages/houseDetail/houseDetail';
import { RegisterPage} from '../pages/register/register';
import { AddHousePage } from '../pages/add-house/add-house';
import { AddHouseExtraInfoPage } from '../pages/add-house-extra-info/add-house-extra-info'; 
import { TestPage } from '../pages/test/test';
import { ProfileOverviewPage } from '../pages/profile-overview/profile-overview';
import { MyHouses } from '../pages/my-houses/my-houses';
import { DropZoneDirective } from '../pages/directives/file-upload';

import { SearchHouseService } from '../pages/shared-service/search-house';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { DatePipe } from '@angular/common'

import { ImagePicker } from '@ionic-native/image-picker';

//shared services
import { AddHouseService} from '../pages/shared-service/add-house.service';
import { UserService } from '../pages/shared-service/user.service';

//Add all firebase and AngularFire relations here
import { AngularFireModule } from 'angularfire2';
import { environmentDEV } from '../environments/environment' 

import { AngularFirestoreModule, AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { PaymentPage } from '../pages/payment/payment';

@NgModule({
  declarations: [
    MyApp,
    SearchPage,
    ProfilePage,
    HomePage,
    TabsPage,
    HouseDetailPage,
    RegisterPage,
    AddHousePage,
    AddHouseExtraInfoPage,
    ProfileOverviewPage,
    MyHouses,
    DropZoneDirective,
    TestPage
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    IonicPageModule.forChild(HouseDetailPage),
    IonicPageModule.forChild(TabsPage),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {}, {
      links: [
      { component: TabsPage, name: 'TabsPage', segment: '' },
      { component: HomePage, name: 'home', segment: ''},
      { component: HouseDetailPage, name: 'detail-page', segment: 'detail/:homeId', defaultHistory: [HomePage] },
      { component: SearchPage, name: 'search', segment:'search' },
      { component: ProfilePage, name: 'profile', segment: 'profile'},
      { component: ProfileOverviewPage, name: 'profile-overview', segment: 'profile-overview', defaultHistory: [ProfilePage]},
      { component: AddHousePage, name: 'add-house', segment: 'add-house'},
      { component: HouseDetailPage, name:'add-house-detial', segment: 'add-house-detail', defaultHistory: [AddHousePage]},
      { component: MyHouses, name: 'my-houses', segment: 'my-houses'},
      { component: PaymentPage, name:'payment', segment: 'payment'},
      { component: RegisterPage, name: 'register', segment: 'register'}
     ]
   }),
    AngularFireModule.initializeApp(environmentDEV.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule // imports firebase/storage only needed for storage features
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SearchPage,
    ProfilePage,
    HomePage,
    TabsPage,
    HouseDetailPage,
    RegisterPage,
    AddHousePage,
    AddHouseExtraInfoPage,
    ProfileOverviewPage,
    MyHouses,
    TestPage
  ],
  providers: [
    AngularFirestore,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    /* Line below is used to remove the # from the url, but this currently gives error: CANNOT GET when refreshing page.
      Check again when hoting the app: https://forum.ionicframework.com/t/tutorial-removing-from-ionic-pwa/103950
    {provide: LocationStrategy, useClass: PathLocationStrategy},*/
    ImagePicker,
    AddHouseService,
    UserService,
    DatePipe,
    SearchHouseService
  ]
})
export class AppModule {}
