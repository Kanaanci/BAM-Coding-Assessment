import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { StargateService } from '../../services/stargate.service';
import { RANKS, DUTY_TITLES } from '../../models/models';

@Component({
  selector: 'app-duty-create',
  standalone: true,
  imports: [
    FormsModule, RouterLink,
    MatFormFieldModule, MatSelectModule, MatInputModule,
    MatButtonModule, MatIconModule, MatCardModule,
    MatDatepickerModule, MatNativeDateModule
  ],
  templateUrl: './duty-create.html'
})
export class DutyCreateComponent implements OnInit {
  name = '';
  rank = signal('');
  dutyTitle = signal('');
  dutyStartDate = signal<Date | null>(null);
  ranks = RANKS;
  dutyTitles = DUTY_TITLES;
  error = signal('');
  submitting = signal(false);

  constructor(
    private api: StargateService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.name = this.route.snapshot.paramMap.get('name') || '';
  }

  onSubmit(): void {
    if (!this.rank() || !this.dutyTitle() || !this.dutyStartDate()) return;
    this.submitting.set(true);
    this.error.set('');

    this.api.createDuty({
      name: this.name,
      rank: this.rank(),
      dutyTitle: this.dutyTitle(),
      dutyStartDate: this.dutyStartDate()!.toISOString()
    }).subscribe({
      next: () => {
        this.router.navigate(['/person', this.name]);
      },
      error: (err) => {
        this.error.set(err.error?.message || 'Failed to assign duty.');
        this.submitting.set(false);
      }
    });
  }
}
