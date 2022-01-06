import { Component, OnInit } from '@angular/core';
import { UserProfile } from '../profile.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-edit-profile-dialog',
  templateUrl: './editprofiledialog.component.html',
  styleUrls: ['./editprofiledialog.component.css']
})
export class EditprofiledialogComponent implements OnInit {
  profileData: any;
  form: any;
  description: any = 'Edit your profile details';

  constructor(private profile: UserProfile, private fb: FormBuilder, private dialogRef: MatDialogRef<EditprofiledialogComponent>) { }

  ngOnInit(): void {
    this.profileData = this.profile.getData();
  }

  closeProfileDialog(): any {
    this.dialogRef.close();
  }

  saveProfile(): any {
    this.dialogRef.close();
  }
}
