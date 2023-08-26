import { Component, OnInit, OnDestroy } from '@angular/core';
import { FortniteApiService } from 'src/app/core/services/fortnite-api.service';
import { Subscription } from 'rxjs';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'app-daily-shop',
  templateUrl: './daily-shop.component.html',
  styleUrls: ['./daily-shop.component.scss']
})
export class DailyShopComponent implements OnInit, OnDestroy {
  shopData: any;
  private subscription: Subscription | undefined;

  constructor(
    private fortniteApiService: FortniteApiService,
    private loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.loadingService.setLoading(true);

    this.subscription = this.fortniteApiService.getShopData().subscribe({
      next: (data) => {
        this.shopData = data.data.daily;
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
