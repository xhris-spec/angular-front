import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Champion } from '../models/champion.model';
import { Fancybox } from "@fancyapps/ui";
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-champion',
  templateUrl: './champion.component.html',
})
export class ChampionComponent implements OnInit {
  champion: Champion | undefined;
  slug: string = '';
  loading = false;

  constructor(private http: HttpClient, private route: ActivatedRoute, private languageService: LanguageService, private el: ElementRef) { }

  ngOnInit() {
    this.slug = this.route.snapshot.paramMap.get('slug') || '';
    this.languageService.currentLanguage.subscribe(language => {
      this.loading = true;
      this.http.get<Champion>(`https://api-riot-2025.click/api/${language}/` + this.slug).subscribe((data) => {
        this.champion = data;
        this.loading = false;
      })
    });

    Fancybox.bind("[data-fancybox^='video-']");
  }

  toggleDescription(hability: any) {
    hability.expanded = !hability.expanded;
  }

}
