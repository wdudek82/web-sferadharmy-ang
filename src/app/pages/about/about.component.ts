import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { LightboxService } from '../../services/lightbox.service';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent implements AfterViewInit {
  @ViewChild('aboutContent') private aboutContent?: ElementRef<HTMLElement>;

  private readonly platformId = inject(PLATFORM_ID);
  private readonly lightboxService = inject(LightboxService);
  private lightboxInitPending = false;

  ngAfterViewInit(): void {
    this.queueLightboxInit();
  }

  private queueLightboxInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    if (this.lightboxInitPending) {
      return;
    }

    this.lightboxInitPending = true;
    window.setTimeout(() => {
      this.lightboxInitPending = false;
      const host = this.aboutContent?.nativeElement;
      if (host) {
        this.lightboxService.scheduleLightboxInit(host, {
          galleryName: 'mistrz-hua-gallery',
          scopeSelector: '#mistrz-hua',
        });
      }
    }, 200);
  }
}
