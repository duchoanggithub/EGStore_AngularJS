import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-img-slider',
  templateUrl: './img-slider.component.html',
  styleUrl: './img-slider.component.css'
})
export class ImgSliderComponent implements OnInit, OnDestroy {

  @Input() images: string[] = [];
  @Input() config: any = {};
  currentIndex = 0;
  intervalId: any;

  constructor() { }

  ngOnInit(): void {
    this.startSlideshow();
  }

  ngOnDestroy(): void {
    this.stopSlideshow();
  }

  startSlideshow() {
    const interval = this.config.interval || 3000; // Default interval 3000ms
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, interval);
  }

  stopSlideshow() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  previousSlide() {
    if (!this.config.disableButtons) {
      this.stopSlideshow();
      this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
      this.startSlideshow();
    }
  }

  nextSlide() {
    if (!this.config.disableButtons) {
      this.stopSlideshow();
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
      this.startSlideshow();
    }
  }

  goToSlide(index: number) {
    if (!this.config.disableDots) {
      this.stopSlideshow();
      this.currentIndex = index;
      this.startSlideshow();
    }
  }
}