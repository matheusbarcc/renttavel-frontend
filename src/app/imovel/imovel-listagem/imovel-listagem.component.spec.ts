import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImovelListagemComponent } from './imovel-listagem.component';

describe('ImovelListagemComponent', () => {
  let component: ImovelListagemComponent;
  let fixture: ComponentFixture<ImovelListagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImovelListagemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImovelListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
