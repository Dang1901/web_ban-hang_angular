import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
[x: string]: any;
  searchForm = new FormGroup({
    keywords : new FormControl('')
  });
  router= new Router()
  ngOnInit(): void {
      
  }
  onSearch(){
    const keywords = this.searchForm.controls.keywords.value
      this.router.navigate(['search'],{
        queryParams: {keywords: keywords}
      })
  }
}
