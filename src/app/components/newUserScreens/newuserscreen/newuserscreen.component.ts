import { Component } from '@angular/core';
interface userItem {
  id: number;
  name: string;
  contact: string;
  email: string;
  functionArea: string;
}

@Component({
  selector: 'app-newuserscreen',
  templateUrl: './newuserscreen.component.html',
  styleUrls: ['./newuserscreen.component.scss']
})
export class NewuserscreenComponent {
  newItem: userItem = {
    id: 0,
    name: '',
    contact: '',
    email: '',
    functionArea: ''
  };
  userItems: userItem[] = [];
  onSubmit(): void {
    this.newItem.id = Date.now();
    this.userItems.push(this.newItem);
    this.newItem = {
      id: 0,
      name: '',
      contact: '',
      email: '',
      functionArea: ''
    };
    console.log(this.userItems);
  }
}
