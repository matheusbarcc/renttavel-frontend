import { Component, OnInit } from '@angular/core';
import { AluguelService } from '../../shared/service/aluguel.service';
import { Aluguel } from '../../shared/model/aluguel';
import { AluguelSeletor } from '../../shared/model/seletor/aluguel.seletor';
import { Imovel } from '../../shared/model/imovel';
import { Router } from '@angular/router';
import { Inquilino } from '../../shared/model/inquilino';
import { ImovelService } from '../../shared/service/imovel.service';
import { InquilinoService } from '../../shared/service/inquilino.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-aluguel-listagem',
  templateUrl: './aluguel-listagem.component.html',
  styleUrl: './aluguel-listagem.component.scss'
})
export class AluguelListagemComponent implements OnInit{

  public alugueis: Aluguel[] = [];
  public imoveis: Imovel[] = [];
  public inquilinos: Inquilino[] = [];
  public aluguel: Aluguel = new Aluguel();
  public isClicked: boolean = false;
  public alHoverId: number | null = null;
  public inputVisibleId: number | null = null;
  public checkoutAux: Date;
  public aluguelAux: Aluguel = new Aluguel();
  public aluguelAux2: Aluguel = new Aluguel();
  public seletor: AluguelSeletor = new AluguelSeletor();
  public isModalFiltrosOpen: boolean;
  public isModalValorOpen: boolean;
  public isModalCheckinOpen: boolean;
  public isModalCheckoutOpen: boolean;
  public totalPaginas: number;
  public totalRegistros: number;
  public offset: number;
  public idAnfitriaoHeader: number;

  constructor(private aluguelService: AluguelService,
              private imovelService: ImovelService,
              private inquilinoService: InquilinoService,
              private router: Router){}

  ngOnInit(): void {
    this.getIdAnfitriaoHeader();
    this.pesquisar();
    this.consultarImoveis();
    this.consultarInquilinos();
  }

  getIdAnfitriaoHeader(){
    const usuarioAutenticado = localStorage.getItem('usuarioAutenticado');
    if(usuarioAutenticado) {
      const usuario = JSON.parse(usuarioAutenticado);
      this.idAnfitriaoHeader = usuario.id
    }
  }

  clicadoEPreenchido(clicked: boolean, checkout: Date, a: Aluguel ){
    if(clicked && checkout != undefined){
      a.dataCheckoutEfetivo = checkout;
      this.efetivarCheckout(a)
    }
  }

  consultarPorId() {
    this.aluguelService.consultarPorId(this.aluguelAux.id).subscribe(
      resultado => {
        this.aluguelAux2 = resultado;
      },
      erro => console.log('Erro ao consultar aluguel por id: ' + erro)
    )
  }

  closeInput(a: Aluguel): void{
    if(a.dataCheckoutEfetivo != undefined){
      this.aluguelAux = a;
    } else {
      a.dataCheckoutEfetivo = undefined;
    }
  }

  showInput(a: Aluguel, event: MouseEvent): void {
    event.stopPropagation();

    a.dataCheckoutEfetivo = undefined;
    this.inputVisibleId = a.id;
  }

  isInputVisible(id: number): boolean {
    if(id != null){
      this.aluguel.dataCheckoutEfetivo = undefined
    }
    return this.inputVisibleId === id;
  }

  pesquisar(){
    this.seletor.idAnfitriao = this.idAnfitriaoHeader;
    this.aluguelService.consultarComSeletor(this.seletor).subscribe(
      resultado => {
        this.alugueis = resultado;
        this.contarRegistros();
      },
      erro => {
        Swal.fire('Erro ao pesquisar aluguéis!', erro.error.mensagem, 'error');
      }
    )
    this.contarPaginas();
  }

  alterar(aluguelSelecionado: Aluguel){
    this.router.navigate(['/home/aluguel/detalhe/'+ aluguelSelecionado.id])
  }

  efetivarCheckout(aluguelSelecionado: Aluguel) {
    this.aluguelService.alterar(aluguelSelecionado).subscribe(
      resultado => {
        Swal.fire({
          title: "Checkout efetivado com sucesso!",
          text: "",
          icon: "success",
          showConfirmButton: true,
          confirmButtonColor: "#ff914d"
        })
      },
      erro => {
        Swal.fire({
          title: "Erro ao efetivar checkout do aluguel",
          html: erro.error.mensagem,
          icon: "error",
          showConfirmButton: true,
          confirmButtonColor: "#ff914d"
        })
      }
    )
  }

  excluir(aluguelSelecionado: Aluguel){
    Swal.fire({
      title: 'Deseja realmente excluir esse aluguel?',
      text: 'Essa ação não poderá ser desfeita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir!',
      confirmButtonColor: "#ff914d",
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#cccccc',
      focusCancel: true
    }).then((result) => {
      if(result.isConfirmed){
        this.aluguelService.excluir(aluguelSelecionado.id).subscribe(
          resultado => {
            this.pesquisar();
          },
          erro => {
            Swal.fire('Erro ao excluir aluguel!', erro.error.mensagem, 'error')
          }
        );
      }
    })
  }

  limparSeletor(){
    this.seletor = new AluguelSeletor()
    this.pesquisar()
  }

  limparSeletorValorMin(){
    this.seletor.valorTotalMin = undefined;
  }

  limparSeletorValorMax(){
    this.seletor.valorTotalMax = undefined;
  }

  limparSeletorCheckinInicio(){
    this.seletor.dataCheckinInicio = undefined;
  }

  limparSeletorCheckoutFinal(){
    this.seletor.dataCheckoutEfetivoFinal = undefined;
  }

  contarRegistros(){
    this.aluguelService.contarRegistros(this.seletor).subscribe(
      (count: number) => {
        this.totalRegistros = count
      },
      erro => {
        console.log('Erro ao contar registros de alugueis', erro)
      }
    )
  }

  proximaPg(){
    this.seletor.pagina++;
    this.pesquisar();
  }

  voltarPg(){
    this.seletor.pagina--;
    this.pesquisar();
  }

  contarPaginas(){
    this.aluguelService.contarPaginas(this.seletor).subscribe(
      (count: number) => {
        this.totalPaginas = count
      },
      erro => {
        console.log('Erro ao contar paginas de alugueis', erro)
      }
    )
  }

  consultarTodos(){
    this.aluguelService.consultarTodos().subscribe(
      resultado => {
        this.alugueis = resultado
      },
      erro => {
        console.log('Erro ao buscar alugueis ' + erro)
      }
    )
  }

  consultarImoveis(){
    this.imovelService.consultarPorAnfitriao(this.idAnfitriaoHeader).subscribe(
      resultado => {
        this.imoveis = resultado
      },
      erro => {
        console.log('Erro ao buscar alugueis ' + erro)
      }
    )
  }

  consultarInquilinos(){
    this.inquilinoService.consultarPorAnfitriao(this.idAnfitriaoHeader).subscribe(
      resultado => {
        this.inquilinos = resultado
      },
      erro => {
        console.log('Erro ao buscar alugueis ' + erro)
      }
    )
  }

  alterarImovel(imovelSelecionado: Imovel){
    this.router.navigate(['/imovel/detalhe/'+ imovelSelecionado.id])
  }

  openModalFiltros(): void{
    this.isModalFiltrosOpen = true;
  }

  toggleFiltroValor(): void {
    this.isModalValorOpen = !this.isModalValorOpen;
  }

  toggleFiltroCheckin(): void {
    this.isModalCheckinOpen = !this.isModalCheckinOpen;
  }

  toggleFiltroCheckout(): void {
    this.isModalCheckoutOpen = !this.isModalCheckoutOpen;
  }

  closeModalFiltros(): void {
    this.isModalFiltrosOpen = false;
  }

  closeFiltroValor(): void{
    this.isModalValorOpen = false;
  }

  closeFiltroCheckin(): void{
    this.isModalCheckinOpen = false;
  }

  closeFiltroCheckout(): void{
    this.isModalCheckoutOpen = false;
  }
}
