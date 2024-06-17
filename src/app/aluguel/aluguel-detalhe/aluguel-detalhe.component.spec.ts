import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AluguelDetalheComponent } from './aluguel-detalhe.component';

describe('AluguelDetalheComponent', () => {
  let component: AluguelDetalheComponent;
  let fixture: ComponentFixture<AluguelDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AluguelDetalheComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AluguelDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
