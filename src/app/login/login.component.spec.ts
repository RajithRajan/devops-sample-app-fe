import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { validUser, blankUser } from 'src';
const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
const loginServiceSpy = jasmine.createSpyObj('LoginService', ['login']);

const testUserData = { id: 1, name: 'TekLoon'};
const loginErrorMsg = 'Invalid Login';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });


it('Test a form group element count', (() => {
	const formElement=   fixture.debugElement.nativeElement.querySelector('#loginForm');
	const inputElements=  formElement.querySelectorAll('input');
    expect(inputElements.length).toEqual(2);
  }));

it('check initial form values for login form group', (() => {
	const loginFormGroup= component.model;
	const loginFormValues={
	username:'',
	password:''
	}
    expect(loginFormGroup['user_email']).toEqual(loginFormValues.username);
    expect(loginFormGroup['password']).toEqual(loginFormValues.password);
  }));

it('check username values before entering some value and validation', (() => {
	const loginFormUserElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#loginForm').querySelectorAll('input')[0];
	const usernameValueFromGroup=component.model['user_email'];
    expect(loginFormUserElement.value).toEqual(usernameValueFromGroup);
    /*expect(usernameValueFromGroup.errors).not.toBeNull();
    expect(usernameValueFromGroup.errors.required).toBeTruthy();
*/
  }));

it('check username and password value after entering some value and validation', (() => {
	const loginFormUserElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#loginForm').querySelectorAll('input')[0];
        const loginFormPasswordElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#loginForm').querySelectorAll('input')[1];

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

/*it('check login form is valid when validations are fulfilled', (() => {
	const loginFormUserElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#loginForm').querySelectorAll('input')[0];
        const loginFormPasswordElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#loginForm').querySelectorAll('input')[1];
        loginFormUserElement.value='abc@test.com';	
        loginFormPasswordElement.value='1244322';
        loginFormUserElement.dispatchEvent(new Event('input'));
        loginFormPasswordElement.dispatchEvent(new Event('input'));
        const isLoginFormValid=component.valid;
        fixture.whenStable().then(()=> {
        expect(isLoginFormValid).toBeTruthy();
})
  }));
*/
});
