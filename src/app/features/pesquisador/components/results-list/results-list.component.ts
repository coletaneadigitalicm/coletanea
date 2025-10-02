import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Louvor } from '../../../../core';
import { LouvourCardComponent } from '../louvor-card/louvor-card.component';

/**
 * Componente de Lista de Resultados
 * 
 * Exibe a lista de louvores encontrados na busca,
 * estados de loading e mensagens de resultado vazio.
 */
@Component({
  selector: 'app-results-list',
  standalone: true,
  imports: [CommonModule, LouvourCardComponent],
  templateUrl: './results-list.component.html',
  styleUrl: './results-list.component.css',
})
export class ResultsListComponent {
  /**
   * Lista de louvores a serem exibidos
   */
  @Input() louvores: Louvor[] = [];

  /**
   * Estado de carregamento
   */
  @Input() loading = false;

  /**
   * Indica se houve alguma busca
   */
  @Input() hasSearched = false;

  /**
   * Retorna true se deve mostrar mensagem de vazio
   */
  get showEmptyState(): boolean {
    return this.hasSearched && !this.loading && this.louvores.length === 0;
  }

  /**
   * Retorna true se deve mostrar a lista de resultados
   */
  get showResults(): boolean {
    return !this.loading && this.louvores.length > 0;
  }
}
