import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Anfitriao } from '../../shared/model/anfitriao';
import { AnfitriaoService } from '../../shared/service/anfitriao.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-perfil-detalhe',
  templateUrl: './perfil-detalhe.component.html',
  styleUrls: ['./perfil-detalhe.component.scss']
})
export class PerfilDetalheComponent implements OnInit {
  public anfitriao: Anfitriao;
  public idAnfitriao: number;

  constructor(
    private anfitriaoService: AnfitriaoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getIdAnfitriaoHeader();
    this.carregarAnfitriao();
  }

  getIdAnfitriaoHeader(): void {
    const usuarioAutenticado = localStorage.getItem('usuarioAutenticado');
    if (usuarioAutenticado) {
      const usuario = JSON.parse(usuarioAutenticado);
      this.idAnfitriao = usuario.id;
    }
  }

  carregarAnfitriao(): void {
    this.anfitriaoService.consultarPorId(this.idAnfitriao).subscribe(
      (anfitriao: Anfitriao) => {
        this.anfitriao = anfitriao;
      },
      (error) => {
        console.error('Erro ao carregar anfitrião', error);
        Swal.fire('Erro!', 'Ocorreu um erro ao carregar o perfil.', 'error');
      }
    );
  }

  salvar(form: NgForm): void {
    if(form.valid ){
      if (this.anfitriao) {
        if (this.anfitriao.id) {
          this.anfitriaoService.alterar(this.anfitriao).subscribe(
            () => {
              Swal.fire('Sucesso!', 'Perfil atualizado com sucesso!', 'success');
            },
            (error) => {
              console.error('Erro ao atualizar perfil', error);
              Swal.fire('Erro!', 'Ocorreu um erro ao atualizar o perfil.', 'error');
            }
          );
        } else {
          this.anfitriaoService.salvar(this.anfitriao).subscribe(
            () => {
              Swal.fire('Sucesso!', 'Perfil criado com sucesso!', 'success');
            },
            (error) => {
              console.error('Erro ao salvar perfil', error);
              Swal.fire('Erro!', 'Ocorreu um erro ao salvar o perfil.', 'error');
            }
          );
        }
      } else {
        Swal.fire('Atenção!', 'Não há perfil para salvar.', 'warning');
      }
    } else {
      Swal.fire('Preencha os campos obrigatórios' , '' , 'error')
    }
  }
}
