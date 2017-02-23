import { Component, Input, DoCheck, EventEmitter, Output} from '@angular/core';

@Component({
  templateUrl: './header.component.html',
  selector: 'app-header',
})

export class HeaderComponent implements DoCheck {
  @Input('hideHeader') hideHeader: Boolean;
  @Output() logout = new EventEmitter();

  constructor(){}

  //After input data is added to this class, this should display latest data
  ngDoCheck() {
    // console.log(this);
  }

  callLogout(e: Event) {
    e.stopPropagation();
    this.logout.emit();
  }

}
