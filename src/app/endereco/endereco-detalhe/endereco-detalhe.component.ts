import { ActivatedRoute, Router } from '@angular/router';
import { EnderecoService } from './../../shared/service/endereco.service';
import { Component, OnInit } from '@angular/core';
import { Endereco } from '../../shared/model/endereco';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { Anfitriao } from '../../shared/model/anfitriao';

@Component({
  selector: 'app-endereco-detalhe',
  templateUrl: './endereco-detalhe.component.html',
  styleUrls: ['./endereco-detalhe.component.scss']
})
export class EnderecoDetalheComponent implements OnInit {
  public endereco: Endereco = new Endereco();
  public anfitriao: Anfitriao = new Anfitriao()
  public enderecos: Endereco[] = [];
  public idEndereco: number;
  public idAnfitriaoHeader: number;

  constructor(
    private enderecoService: EnderecoService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.getIdAnfitriaoHeader();
    this.setAnfitriaoImovel();
    this.verificarId();
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
      this.endereco.anfitriao = this.anfitriao; // Define o anfitrião do imóvel
    }
  }

  verificarId() {
    this.route.params.subscribe((params) => {
      this.idEndereco = params['id'];
      if (this.idEndereco) {
        this.consultarPorId();
      }
    })
  }

  salvar(): void {
    // Validação dos campos obrigatórios
    if (!this.endereco.numero || !this.endereco.cep || !this.endereco.rua || !this.endereco.bairro || !this.endereco.cidade || !this.endereco.estado || !this.endereco.pais) {
      Swal.fire({
        title: "Erro",
        text: "Por favor, preencha todos os campos obrigatórios.",
        icon: "error",
        showConfirmButton: true,
        confirmButtonColor: "#ff914d"
      });
      return;
    }

    if (this.idEndereco) {
      this.alterar();
    } else {
      this.inserir();
    }
  }

  consultarPorId() {
    this.enderecoService.consultarPorId(this.idEndereco).subscribe(
      resultado => {
        this.endereco = resultado
      },
      erro => console.log('Erro ao consultar endereço por id' + erro)
    )
  }

  inserir() {
    this.enderecoService.salvar(this.endereco).subscribe(
      resultado => {
        Swal.fire({
          title: "Endereço cadastrado com sucesso!",
          text: "",
          icon: "success",
          showConfirmButton: true,
          confirmButtonColor: "#ff914d"
        })
        this.voltar();
      },
      erro => {
        Swal.fire({
          title: "Erro ao salvar endereço",
          html: erro.error.mensagem,
          icon: "error",
          showConfirmButton: true,
          confirmButtonColor: "#ff914d"
        })
      }
    )
  }

  alterar() {
    this.enderecoService.alterar(this.endereco).subscribe(
      resultado => {
        Swal.fire({
          title: "Endereço editado com sucesso!",
          text: "",
          icon: "success",
          showConfirmButton: true,
          confirmButtonColor: "#ff914d"
        })
        this.voltar();
      },
      erro => {
        Swal.fire({
          title: "Erro ao editar endereço",
          html: erro.error.mensagem,
          icon: "error",
          showConfirmButton: true,
          confirmButtonColor: "#ff914d"
        })
      }
    )
  }

  voltar(): void {
    this.router.navigate(['/home/endereco'])
  }

  buscarCEP() {
    if (this.endereco.cep) {
      this.http.get(`https://viacep.com.br/ws/${this.endereco.cep}/json/`).subscribe(
        (dados: any) => {
          if (dados.erro) {
            Swal.fire({
              title: "CEP não encontrado",
              text: "Por favor, verifique o CEP e tente novamente.",
              icon: "error",
              showConfirmButton: true,
              confirmButtonColor: "#ff914d"
            });
          } else {
            this.endereco.rua = dados.logradouro;
            this.endereco.bairro = dados.bairro;
            this.endereco.cidade = dados.localidade;
            this.endereco.estado = dados.uf;
          }
        },
        erro => {
          Swal.fire({
            title: "Erro ao buscar CEP",
            text: "Por favor, digite um cep válido.",
            icon: "error",
            showConfirmButton: true,
            confirmButtonColor: "#ff914d"
          });
        }
      );
    }
  }
}
