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
  private id: number = NaN;

  title: string = ''
  description: string = '';

  constructor(
    private storage: StorageService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {
    await this.storage.get('tasks')?.then((data) => {
      this.tasks = JSON.parse(data);
    });
  }

  async ionViewWillEnter() {
    await this.storage.get('tasks')?.then((data) => {
      this.tasks = JSON.parse(data);
    });
    
    await this.route.params.subscribe(params => {
      this.id = +params['id'];
      if (this.tasks.length > 0 && !Number.isNaN(this.id)) {
        this.title = this.tasks[this.id].title;
        this.description = this.tasks[this.id].description;
      }
    });
  }

  async save(data: any) {

    if (Number.isNaN(this.id)) {
      this.tasks.push({ 'title': data.value.title, 'description': data.value.description });
    } else {
      this.tasks[this.id] = { 'title': data.value.title, 'description': data.value.description }
    }

    await this.storage.set('tasks', JSON.stringify(this.tasks));
    this.router.navigate(['home'])
  }
}
