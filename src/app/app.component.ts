import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Sport } from './sport';
import { SportService } from './sport.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {
  sports: Sport[] = [];
  sport: Sport =  {model:'', price:0, merk:''};

  error = '';
  success = '';

  constructor(private sportService: SportService) {}

  ngOnInit() {
    this.getSports;
  }

  getSports(): void {
    this.sportService.getAll().subscribe(
      (data: Sport[]) => {
        this.sports = data;
        this.success = 'Success in retrieving the list';
      },
      (err) => {
        console.log(err);
        this.error = err.message;
      }
    );
  }

  addSport(f: NgForm) {
    this.resetAlerts();

    this.sportService.store(this.sport).subscribe(
      (res: Sport) => {
        // Update the list of sports
        this.sports.push(res)

        // Inform the user
        this.success = 'Created successfully';

        // Reset the form
        f.reset();
      },
      (err) => (this.error = err.message)
    );
  }

  resetAlerts() {
    this.error = '';
    this.success = '';
  }
}