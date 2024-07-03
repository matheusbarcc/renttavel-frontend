import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InquilinoListagemComponent } from './inquilino-listagem.component';

describe('InquilinoListagemComponent', () => {
  let component: InquilinoListagemComponent;
  let fixture: ComponentFixture<InquilinoListagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InquilinoListagemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InquilinoListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
