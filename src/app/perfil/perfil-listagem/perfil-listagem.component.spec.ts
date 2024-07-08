import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilListagemComponent } from './perfil-listagem.component';

describe('PerfilListagemComponent', () => {
  let component: PerfilListagemComponent;
  let fixture: ComponentFixture<PerfilListagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilListagemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
