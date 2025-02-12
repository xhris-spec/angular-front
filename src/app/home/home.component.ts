import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Champion } from '../models/champion.model';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  champions: Champion[] = [];
  selectedChampion: string = '';
  selectedRoles: string[] = [];
  loading = false;
  http = inject(HttpClient);
  languageService = inject(LanguageService);

  ngOnInit() {
    this.loading = true;

    this.languageService.currentLanguage.subscribe((language) => {
      const apiUrl = `http://symfony-api-riot-2025.us-east-1.elasticbeanstalk.com/api/${language}/champions`;

      console.log("Fetching champions from:", apiUrl);

      this.http.get<Champion[]>(apiUrl).subscribe({
        next: (data) => {
          this.champions = data;
          this.loading = false;
        },
        error: (error) => {
          console.error("Error fetching champions:", error);
          this.loading = false;
        }
      });
    });
  }

  get championsToShow() {
    return this.champions.filter((champion) => {
      return (
        (!this.selectedChampion || champion.name === this.selectedChampion) &&
        (!this.selectedRoles.length ||
          champion.role.some((r) => this.selectedRoles.includes(r)))
      );
    });
  }

  toggleRole(role: string) {
    const index = this.selectedRoles.indexOf(role);
    if (index > -1) {
      this.selectedRoles.splice(index, 1);
    } else {
      this.selectedRoles.push(role);
    }
  }
}
