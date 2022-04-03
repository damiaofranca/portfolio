import { DOCUMENT } from '@angular/common';
import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  Input,
  Inject,
  HostListener,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef
} from '@angular/core';
import { SafeAny } from '../../types';
import { Particles } from '../utils/types';




@Component({
  selector: 'app-background-window',
  template: '<canvas #canvasEl [width]="width" [height]="height"> Desculpe, seu nevegador não suporta o canvas!</canvas>',
  styleUrls: ['./../styles/background-window.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  host: {
    '[class.app-background-window]': `true`,
  }
})
export class BackgroundWindowComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {

  @ViewChild('canvasEl')
  public canvas!: ElementRef<HTMLCanvasElement>;

  @Input()
  public particlesLength = 600;

  @Input()
  public baseColorTheme: 'white' | 'black' = 'white';

  public width = 0;

  public height = 0;

  private particles: Particles = [];

  private body!: HTMLBodyElement;

  private context!: CanvasRenderingContext2D;

  constructor(private readonly cdr: ChangeDetectorRef, @Inject(DOCUMENT) private readonly document: SafeAny) {
    const body: HTMLBodyElement | null = this.document.querySelector('body');
    if (body) {
      this.body = body;
    }
  }

  private generateParticles(): void {
    if (!this.body) {
      return void 0;
    }
    for (let index = 0; index < this.particlesLength; index++) {
      this.particles.push({
        color: this.baseColorTheme === 'white' ? '#fff' : '#fff',
        opacity: Math.random(),
        size: Math.floor(Math.random() * 1) + 1,
        yVelocity: .1,
        xVelocity: .1,
        xOrientate: (Math.floor(Math.random() * 2) + 1) % 2 === 0 ? '+' : '-',
        yOrientate: (Math.floor(Math.random() * 2) + 1) % 2 === 0 ? '+' : '-',
        x: Math.floor(Math.random() * this.body.offsetWidth) + 1,
        y: Math.floor(Math.random() * this.body.offsetHeight) + 1,
      });
    }
  }

  private render(): void {
    const { nativeElement } = this.canvas;

    this.context.clearRect(0, 0, nativeElement.width, nativeElement.height);
    this.context.globalAlpha = 1;

    for (let index = 0, length = this.particles.length; index < length; index++) {
      const element = this.particles[index];
      if (element.xOrientate === '+') {
        element.x += element.xVelocity;
      } else {
        element.x -= element.xVelocity;
      }
      if (element.yOrientate === '+') {
        element.y += element.yVelocity;
      } else {
        element.y -= element.yVelocity;
      }
      if (element.y <= 0) {
        element.yOrientate = '+';
      }
      if (element.y >= this.height) {
        element.yOrientate = '-';
      }
      if (element.x <= 0) {
        element.xOrientate = '+';
      }
      if (element.x >= this.width) {
        element.xOrientate = '-';
      }
      this.context.globalAlpha = element.opacity;

      this.context.beginPath();
      this.context.fillStyle = element.color;
      this.context.arc(element.x, element.y, element.size, 0, 2 * Math.PI);
      this.context.fill();
    }
    window.requestAnimationFrame(this.render.bind(this));
  }

  @HostListener('window:resize')
  public syncCanvasDimentions(): void {
    this.width = this.body.offsetWidth;
    this.height = this.body.offsetHeight;

    this.cdr.markForCheck();
  }

  public ngOnInit(): void {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const { particlesLength, baseColorTheme } = changes;
    if (particlesLength) {
      this.generateParticles();
    }
    if (baseColorTheme) {
      this.generateParticles();
    }
  }

  public ngAfterViewInit(): void {
    this.generateParticles();
    if (this.canvas) {
      const context = this.canvas.nativeElement.getContext('2d');
      if (context) {
        this.context = context;
      }
    }
    Promise
      .resolve()
      .then(() => {
        this.syncCanvasDimentions();

        window.requestAnimationFrame(this.render.bind(this));
      });
  }

  public ngOnDestroy(): void {
  }

}
