import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {
  Validators,
  FormGroup,
  FormBuilder,
  FormControl,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  regForm: FormGroup;
  showInvalidMsg: boolean;
  @ViewChild('content') content: ElementRef;

  validationMessages = {
    firstName: {
      required: 'First Name is a required field.',
    },
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) {
    this.showInvalidMsg = false;
  }

  ngOnInit(): void {
    this.regForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: [null, [Validators.required, Validators.minLength(10)]],
      ext: [''],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get regFormControl(): any {
    return this.regForm.controls;
  }

  logKeyValuePairs(group: FormGroup): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if (abstractControl instanceof FormGroup) {
        // console.log('logKeyValuePairs1');
        this.logKeyValuePairs(abstractControl);
      } else {
        // console.log('logKeyValuePairs2');
        abstractControl.markAsDirty();
      }
    });
  }

  toogleErrMsg(): void {
    this.showInvalidMsg = false;
  }

  submit(): void {
    if (this.regForm.invalid) {
      this.showInvalidMsg = true;
      console.log('form is invalid', this.showInvalidMsg);
    } else {
      this.showInvalidMsg = false;
      console.log('form value', this.regForm.value);
      this.modalService.open(this.content, { centered: true });
    }
    this.logKeyValuePairs(this.regForm);
  }

  closeModal(): void {
    this.modalService.dismissAll();
    this.router.navigate(['/thankyou']);
  }
}
