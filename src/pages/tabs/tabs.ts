import { Component } from '@angular/core';

import { SearchPage } from '../search/search';
import { ProfilePage } from '../profile/profile';
import { HomePage } from '../home/home';

import { Platform, NavParams } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tabsPlacement: string = 'bottom';
  tabsLayout: string = 'icon-top';

  tab1Root = HomePage;
  tab2Root = SearchPage;
  tab3Root = ProfilePage;
  mySelectedIndex: number;

  constructor(platform: Platform, navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
    if (!platform.is('mobile')) {
      this.tabsPlacement = 'top';
      this.tabsLayout = 'icon-left';
    }
  }
}
