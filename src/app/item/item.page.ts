import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StorageService } from '../services/storage.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ItemPage implements OnInit {

  private tasks: Array<any> = [];
  private id: number = -1;

  title: string = ''
  description: string = '';

  constructor(
    private storage: StorageService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  async ionViewWillEnter() {
    await this.route.params.subscribe(params => {
      this.id = +params['id'];

      if (this.tasks.length) {
        this.title = this.tasks[this.id].title;
        this.description = this.tasks[this.id].description;
      }
    });
  }

  async ngOnInit() {
    await this.storage.get('tasks')?.then((data) => {
      this.tasks = JSON.parse(data);
    });
  }

  async save(data: any) {

    if (this.id === -1) {
      this.tasks.push({ 'title': data.value.title, 'description': data.value.description });
    } else {
      this.tasks[this.id] = { 'title': data.value.title, 'description': data.value.description }
    }

    await this.storage.set('tasks', JSON.stringify(this.tasks));
    this.router.navigate(['home'])
  }
}
