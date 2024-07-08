import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Anfitriao } from '../../shared/model/anfitriao';
import { AnfitriaoService } from '../../shared/service/anfitriao.service';

@Component({
  selector: 'app-perfil-listagem',
  templateUrl: './perfil-listagem.component.html',
  styleUrls: ['./perfil-listagem.component.scss']
})
export class PerfilListagemComponent implements OnInit {
  public idAnfitriaoHeader: number;
  public anfitriao: Anfitriao;

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
      this.idAnfitriaoHeader = usuario.id;
    }
  }

  carregarAnfitriao(): void {
    this.anfitriaoService.consultarPorId(this.idAnfitriaoHeader).subscribe(
      (anfitriao: Anfitriao) => {
        this.anfitriao = anfitriao;
      },
      (erro) => {
        console.error('Erro ao carregar anfitrião:', erro);
        Swal.fire('Erro', 'Ocorreu um erro ao carregar seu perfil. Por favor, tente novamente mais tarde.', 'error');
      }
    );
  }

  alterar(): void {
    if (this.anfitriao && this.anfitriao.id) {
      this.router.navigate(['/home/perfil/detalhe/', this.anfitriao.id]);
    } else {
      Swal.fire('Aguarde', 'Seu perfil está sendo carregado. Por favor, aguarde alguns momentos.', 'info');
    }
  }
}
