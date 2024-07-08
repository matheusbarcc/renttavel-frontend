import { Component } from '@angular/core';
import { UsuarioDTO } from '../../shared/model/dto/usuario.dto';
import { LoginService } from '../../shared/service/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Anfitriao } from '../../shared/model/anfitriao';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  public dto: UsuarioDTO = new UsuarioDTO();

  constructor(private loginService: LoginService,
              private router: Router,
              private route: ActivatedRoute) {}

  public realizarLogin() {
    this.loginService.autenticar(this.dto).subscribe(
      (anfAutenticado: Anfitriao) => {
        if(anfAutenticado.idSessao){
          localStorage.setItem('usuarioAutenticado', JSON.stringify(anfAutenticado));
          this.router.navigate(['/home/dashboard'])
        }
      },
      (erro) => {
        console.log('Erro:' + erro)
        Swal.fire('Erro', erro.error.mensagem, 'error')
      }
    )
  }

  cadastrar(){
    this.router.navigate(['/login/cadastro'])
  }
}
