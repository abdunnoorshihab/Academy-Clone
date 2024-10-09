import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FAQ } from '../../../interfaces/common/faq.interface';
import { FaqService } from '../../../services/common/faq.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-about-course',
  templateUrl: './about-course.component.html',
  styleUrl: './about-course.component.scss'
})
export class AboutCourseComponent implements OnInit, OnDestroy{
  faqs: FAQ[] = [];
  activeId: string = null;

  // Inject
  private readonly faqService = inject(FaqService);

  // Subscriptions
  private subDataGet: Subscription;


  ngOnInit() {
    // Base data
    this.getAllFaq();
  }


  /**
   * HTTP Client
   * getAllFaq()
   */

  private getAllFaq() {
    this.subDataGet = this.faqService.getAllFaq()
      .subscribe({
        next: res => {
          this.faqs = res.data;
        },
        error: err => {
          console.log(err)
        }
      })
  }


  /**
   * On Destroy
   */
  ngOnDestroy() {
    if (this.subDataGet) {
      this.subDataGet.unsubscribe();
    }
  }

  onItemToggle(event: string) {
    this.activeId = event;
  }
}
