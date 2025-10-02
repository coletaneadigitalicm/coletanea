import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Louvor, LouvoresService } from '../../core';
import { SearchBarComponent } from './components/search-bar/search-bar.component';

/**
 * Componente principal do Pesquisador de Louvores
 * 
 * Container que gerencia o estado da busca e coordena
 * a comunicação entre os componentes filhos.
 */
@Component({
  selector: 'app-pesquisador',
  standalone: true,
  imports: [CommonModule, SearchBarComponent],
  templateUrl: './pesquisador.component.html',
  styleUrl: './pesquisador.component.css',
})
export class PesquisadorComponent implements OnInit {
  /**
   * Resultados da busca atual
   */
  results: Louvor[] = [];

  /**
   * Estado de carregamento
   */
  loading = false;

  /**
   * Indica se já houve alguma busca
   */
  hasSearched = false;

  constructor(private louvoresService: LouvoresService) {}

  ngOnInit(): void {
    console.log('[PesquisadorComponent] Componente inicializado');
  }

  /**
   * Handler para evento de busca do SearchBar
   * 
   * @param query Termo de busca
   */
  onSearch(query: string): void {
    console.log('[PesquisadorComponent] Busca recebida:', query);

    if (!query || query.trim() === '') {
      this.results = [];
      this.hasSearched = false;
      return;
    }

    this.loading = true;
    this.hasSearched = true;

    this.louvoresService.searchLouvores(query).subscribe({
      next: (louvores) => {
        this.results = louvores;
        this.loading = false;
        console.log(
          `[PesquisadorComponent] ${louvores.length} resultados carregados`
        );
      },
      error: (error) => {
        console.error('[PesquisadorComponent] Erro na busca:', error);
        this.loading = false;
        this.results = [];
      },
    });
  }

  /**
   * Handler para evento de limpar busca do SearchBar
   */
  onClear(): void {
    console.log('[PesquisadorComponent] Busca limpa');
    this.results = [];
    this.loading = false;
    this.hasSearched = false;
  }
}
