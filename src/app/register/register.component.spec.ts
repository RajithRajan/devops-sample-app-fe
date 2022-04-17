import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

it('Test a form group element count', (() => {
	const formElement=   fixture.debugElement.nativeElement.querySelector('#loginForm');
	const inputElements=  formElement.querySelectorAll('input');
    expect(inputElements.length).toEqual(3);
  }));

it('check initial form values for registration form group', (() => {
	const loginFormGroup= component.model;
	const loginFormValues={
	username1:'',
	username2:'',
	password:''
	}
    expect(loginFormGroup['user_name']).toEqual(loginFormValues.username1);
    expect(loginFormGroup['user_email']).toEqual(loginFormValues.username2);
    expect(loginFormGroup['password']).toEqual(loginFormValues.password);
  }));
it('check username and password values before entering some value and validation', (() => {
	const loginFormUserElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#registrationForm').querySelectorAll('input')[0];
        const loginFormPasswordElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#registrationForm').querySelectorAll('input')[1];

	const usernameValueFromGroup=component.model['user_email'];
        const passwordValueFromGroup=component.model['password'];

        expect(loginFormUserElement.value).toEqual(usernameValueFromGroup);
        expect(loginFormPasswordElement.value).toEqual(passwordValueFromGroup);

    /*expect(usernameValueFromGroup.errors).not.toBeNull();
    expect(usernameValueFromGroup.errors.required).toBeTruthy();
*/
  }));

it('check username and password value after entering some value and validation', (() => {
	const loginFormUserElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#registrationForm').querySelectorAll('input')[0];
        const loginFormPasswordElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#registrationForm').querySelectorAll('input')[1];

        loginFormUserElement.value='sample@test.com';
        loginFormPasswordElement.value='1244322';

        loginFormUserElement.dispatchEvent(new Event('input'));
        loginFormPasswordElement.dispatchEvent(new Event('input'));

        fixture.detectChanges();
        fixture.whenStable().then(()=> {
        const usernameValueFromGroup= component.model['user_email'];
        expect(loginFormUserElement.value).toEqual(usernameValueFromGroup);

        const passwordValueFromGroup= component.model['password'];
        expect(loginFormPasswordElement.value).toEqual(passwordValueFromGroup);

        /*expect(usernameValueFromGroup.errors: any).toBeNull();
*/
})
  }));



});
