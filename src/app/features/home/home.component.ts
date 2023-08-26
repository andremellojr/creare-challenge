import { Component, OnInit, OnDestroy } from '@angular/core';
import { FortniteApiService } from 'src/app/core/services/fortnite-api.service';
import { Subscription } from 'rxjs';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  battleRoyaleNews: any;
  private subscription: Subscription | undefined;

  constructor(
    private fortniteApiService: FortniteApiService,
    private loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.loadingService.setLoading(true);

    this.subscription = this.fortniteApiService.getBattleRoyaleNews().subscribe({
      next: (data) => {
        this.battleRoyaleNews = data.data;
        this.loadingService.setLoading(false);
      },
      error: (error) => {
        console.error('Error:', error.message);
        this.loadingService.setLoading(false);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
