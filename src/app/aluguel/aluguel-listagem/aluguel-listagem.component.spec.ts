import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AluguelListagemComponent } from './aluguel-listagem.component';

describe('AluguelListagemComponent', () => {
  let component: AluguelListagemComponent;
  let fixture: ComponentFixture<AluguelListagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AluguelListagemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AluguelListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
