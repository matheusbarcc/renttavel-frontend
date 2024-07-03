import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InquilinoDetalheComponent } from './inquilino-detalhe.component';

describe('InquilinoDetalheComponent', () => {
  let component: InquilinoDetalheComponent;
  let fixture: ComponentFixture<InquilinoDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InquilinoDetalheComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InquilinoDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
