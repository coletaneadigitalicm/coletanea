import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Louvor, Arranjo, Material, PdfViewerService } from '../../../../core';

/**
 * Componente de Card do Louvor
 * 
 * Exibe informações de um louvor individual com arranjos e materiais.
 * - Mostra nome e outrosNomes
 * - Lista arranjos disponíveis (chips horizontais)
 * - Lista materiais do arranjo selecionado
 */
@Component({
  selector: 'app-louvor-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './louvor-card.component.html',
  styleUrl: './louvor-card.component.css',
})
export class LouvourCardComponent {
  /**
   * Dados do louvor a ser exibido
   */
  @Input({ required: true }) louvor!: Louvor;

  /**
   * Estado de expansão do card
   */
  isExpanded = false;

  /**
   * Índice do arranjo atualmente selecionado
   */
  selectedArranjoIndex = 0;

  constructor(private pdfViewerService: PdfViewerService) {}

  /**
   * Retorna o arranjo atualmente selecionado
   */
  get selectedArranjo(): Arranjo | null {
    if (!this.louvor.arranjos || this.louvor.arranjos.length === 0) {
      return null;
    }
    return this.louvor.arranjos[this.selectedArranjoIndex] || null;
  }

  /**
   * Retorna os materiais do arranjo selecionado
   */
  get materiais(): Material[] {
    return this.selectedArranjo?.materiais || [];
  }

  /**
   * Verifica se tem múltiplos materiais para exibir lista
   */
  get hasMultipleMaterials(): boolean {
    return this.materiais.length > 1;
  }

  /**
   * Verifica se o card pode ser expandido
   * (tem múltiplos materiais OU múltiplos arranjos)
   */
  get canExpand(): boolean {
    return this.hasMultipleMaterials || (this.louvor.arranjos && this.louvor.arranjos.length > 1);
  }

  /**
   * Abrevia o título de um arranjo seguindo as regras:
   * - Se > 13 chars: iniciais + última palavra (ex: "C. P. CIAs")
   * - Se ainda > 13: remover espaços
   * - Se ainda > 13: truncar em 13 chars
   */
  abreviarTitulo(titulo: string): string {
    if (titulo.length <= 13) {
      return titulo;
    }

    // Tentar abreviar: iniciais + última palavra
    const palavras = titulo.split(' ').filter(p => p.length > 0);
    if (palavras.length > 1) {
      const iniciais = palavras.slice(0, -1).map(p => p[0] + '.').join(' ');
      const ultimaPalavra = palavras[palavras.length - 1];
      const abreviado = `${iniciais} ${ultimaPalavra}`;
      
      if (abreviado.length <= 13) {
        return abreviado;
      }

      // Remover espaços
      const semEspacos = abreviado.replace(/\s/g, '');
      if (semEspacos.length <= 13) {
        return semEspacos;
      }

      // Truncar
      return semEspacos.substring(0, 13);
    }

    // Truncar direto se for uma palavra só
    return titulo.substring(0, 13);
  }

  /**
   * Handler para clique no card
   */
  onCardClick(): void {
    if (this.canExpand) {
      // Tem múltiplos itens, expandir/recolher
      this.isExpanded = !this.isExpanded;
      console.log(
        `[LouvourCardComponent] Card ${this.isExpanded ? 'expandido' : 'recolhido'}:`,
        this.louvor.nome
      );
    } else if (this.materiais.length === 1) {
      // Tem apenas 1 material, abrir diretamente
      this.openMaterial(this.materiais[0]);
    }
  }

  /**
   * Handler para clique em um arranjo
   */
  onArranjoClick(index: number, event: Event): void {
    event.stopPropagation();
    this.selectedArranjoIndex = index;
    console.log(`[LouvourCardComponent] Arranjo selecionado:`, this.louvor.arranjos[index].titulo);
  }

  /**
   * Abre um material específico (PDF, áudio, etc)
   */
  openMaterial(material: Material): void {
    console.log('[LouvourCardComponent] Abrindo material:', material.titulo, material.url);
    
    // Por enquanto, só abrimos PDFs
    if (material.tipo === 'pdf') {
      this.pdfViewerService.openPdf(material.url);
    } else {
      console.warn('[LouvourCardComponent] Tipo de material não suportado:', material.tipo);
      // Abrir URL diretamente em nova aba
      window.open(material.url, '_blank', 'noopener,noreferrer');
    }
  }

  /**
   * Handler para clique em um material específico
   * Previne propagação para não fechar o card
   */
  onMaterialClick(material: Material, event: Event): void {
    event.stopPropagation();
    this.openMaterial(material);
  }
}
