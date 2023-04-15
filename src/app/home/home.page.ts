import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { StorageService } from '../services/storage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class HomePage {
  public tasks: Array<any> = [];

  constructor(
    private storage: StorageService,
    private router: Router
  ) { }

  async ionViewWillEnter() {
    await this.storage.get('tasks')?.then((data) => {
      this.tasks = JSON.parse(data);
    });
  }

  addItem() {
    this.router.navigate(['item'])
  }

  async remover(index: number) {
    this.tasks.splice(index, 1);
    await this.storage.set('tasks', JSON.stringify(this.tasks));
  }

  editar(index: number){
    this.router.navigate(['item', index])
  }
}
