import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**
 * Componente de Barra de Busca
 * 
 * Input de texto com botões de Limpar e Pesquisar.
 * Emite eventos para o componente pai quando ações são realizadas.
 */
@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent {
  /**
   * Texto da busca (two-way binding)
   */
  searchText = '';

  /**
   * Evento emitido quando o usuário realiza uma busca
   */
  @Output() search = new EventEmitter<string>();

  /**
   * Evento emitido quando o usuário limpa a busca
   */
  @Output() clear = new EventEmitter<void>();

  /**
   * Verifica se o campo de busca tem valor
   */
  get hasValue(): boolean {
    return this.searchText.trim().length > 0;
  }

  /**
   * Handler para o botão de busca
   */
  onSearchClick(): void {
    if (!this.hasValue) return;
    
    console.log('[SearchBarComponent] Emitindo busca:', this.searchText);
    this.search.emit(this.searchText.trim());
  }

  /**
   * Handler para o botão de limpar
   */
  onClearClick(): void {
    console.log('[SearchBarComponent] Limpando busca');
    this.searchText = '';
    this.clear.emit();
  }

  /**
   * Handler para tecla Enter no input
   */
  onKeyEnter(): void {
    if (this.hasValue) {
      this.onSearchClick();
    }
  }
}
