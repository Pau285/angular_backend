import {Component, OnInit} from '@angular/core';
import {CategoriasService} from '@admin/categorias/components/categorias-list/services/categorias.service';
import {Categorias} from '../../../../../../angular_backend/src/entity/categorias';

@Component({
  selector: 'app-categorias-list',
  templateUrl: './categorias-list.component.html',
  styleUrls: ['./categorias-list.component.scss']
})
export class CategoriasListComponent implements OnInit {
  listaCategorias: Categorias[];

  constructor(private categoriasService: CategoriasService) {
  }

  ngOnInit(): void {
    this.categoriasService.getCategoriasActivadas().subscribe(data => (this.listaCategorias = data));
  }
}
