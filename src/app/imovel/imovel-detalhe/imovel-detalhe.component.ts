import { Component, OnInit } from '@angular/core';
import { Imovel } from '../../shared/model/imovel';
import { ImovelService } from '../../shared/service/imovel.service';
import { EnderecoService } from '../../shared/service/endereco.service';
import { Endereco } from '../../shared/model/endereco';
import { ActivatedRoute, Router } from '@angular/router';
import { Anfitriao } from '../../shared/model/anfitriao';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-imovel-detalhe',
  templateUrl: './imovel-detalhe.component.html',
  styleUrl: './imovel-detalhe.component.scss'
})

export class ImovelDetalheComponent implements OnInit{

  public imovel: Imovel = new Imovel();
  public anfitriao: Anfitriao = new Anfitriao()
  public idImovel: number;
  public imoveis: Imovel[] = [];
  public enderecos: Endereco[] = [];
  public idAnfitriaoHeader: number;

  constructor(private imovelService: ImovelService,
              private enderecoService: EnderecoService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getIdAnfitriaoHeader();
    this.setAnfitriaoImovel();
    this.consultarEnderecos();
    this.verificarId();
    this.imovel.anfitriao = this.anfitriao;
  }

  getIdAnfitriaoHeader(){
    const usuarioAutenticado = localStorage.getItem('usuarioAutenticado');
    if(usuarioAutenticado) {
      const usuario = JSON.parse(usuarioAutenticado);
      this.idAnfitriaoHeader = usuario.id
    }
  }

  setAnfitriaoImovel() {
    const usuarioAutenticado = localStorage.getItem('usuarioAutenticado');
    if (usuarioAutenticado) {
      const usuario = JSON.parse(usuarioAutenticado);
      this.anfitriao = usuario; // Define o anfitrião como o usuário autenticado
      this.imovel.anfitriao = this.anfitriao; // Define o anfitrião do imóvel
    }
  }

  verificarId(){
    this.route.params.subscribe((params) => {
      this.idImovel = params['id'];
      if(this.idImovel) {
        this.consultarPorId();
      }
    })
  }

  salvar(): void {
      if (this.idImovel) {
        this.alterar();
      } else {
        this.inserir();
      }
  }

  inserir(){
    this.imovelService.salvar(this.imovel).subscribe(
      resultado => {
        Swal.fire({
          title: "Imóvel cadastrado com sucesso!",
          text: "",
          icon: "success",
          showConfirmButton: true,
          confirmButtonColor: "#ff914d"
        })
        this.voltar();
      },
      erro => {
          Swal.fire({
            title: "Erro ao salvar imóvel",
            html: erro.error.mensagem,
            icon: "error",
            showConfirmButton: true,
            confirmButtonColor: "#ff914d"
          })
      }
    )
  }

  alterar(){
    this.imovelService.alterar(this.imovel).subscribe(
      resultado => {
        Swal.fire({
          title: "Imóvel editado com sucesso!",
          text: "",
          icon: "success",
          showConfirmButton: true,
          confirmButtonColor: "#ff914d"
        })
        this.voltar();
      },
      erro => {
        Swal.fire({
          title: "Erro ao editar imóvel",
          html: erro.error.mensagem,
          icon: "error",
          showConfirmButton: true,
          confirmButtonColor: "#ff914d"
        })
      }
    )
  }

  voltar(): void{
    this.router.navigate(['/home/imovel'])
  }

  consultarPorId(){
    this.imovelService.consultarPorId(this.idImovel).subscribe(
      resultado => {
        this.imovel = resultado
      },
      erro =>
        console.log('Erro ao consultar imovel por id' + erro)
    )
  }

  consultarEnderecos(){
    this.enderecoService.consultarPorAnfitriao(this.idAnfitriaoHeader).subscribe(
      resultado => {
        this.enderecos = resultado
      },
      erro => {
        console.log('Erro ao buscar enderecos ' + erro)
      }
    )
  }

  public compareById(r1: any, r2: any): boolean {
    return r1 && r2 ? r1.id === r2.id : r1 === r2
  }
}
