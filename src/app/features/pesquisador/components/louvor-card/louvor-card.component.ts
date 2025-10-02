import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Louvor, PdfViewerService } from '../../../../core';

/**
 * Componente de Card do Louvor
 * 
 * Exibe informações de um louvor individual.
 * - Se tem apenas 1 PDF: clique abre diretamente
 * - Se tem múltiplos PDFs: clique expande o card mostrando lista de PDFs
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
   * Estado de expansão do card (para múltiplos PDFs)
   */
  isExpanded = false;

  constructor(private pdfViewerService: PdfViewerService) {}

  /**
   * Verifica se o louvor tem múltiplos PDFs
   */
  get hasMultiplePdfs(): boolean {
    return this.louvor.pdfs && this.louvor.pdfs.length > 1;
  }

  /**
   * Retorna o nome do arquivo PDF extraído do caminho
   */
  getPdfFileName(pdfPath: string): string {
    const parts = pdfPath.split('/');
    return parts[parts.length - 1];
  }

  /**
   * Handler para clique no card
   */
  onCardClick(): void {
    if (this.hasMultiplePdfs) {
      // Se tem múltiplos PDFs, expandir/recolher
      this.isExpanded = !this.isExpanded;
      console.log(
        `[LouvourCardComponent] Card ${this.isExpanded ? 'expandido' : 'recolhido'}:`,
        this.louvor.nome
      );
    } else if (this.louvor.pdfs && this.louvor.pdfs.length === 1) {
      // Se tem apenas 1 PDF, abrir diretamente
      this.openPdf(this.louvor.pdfs[0]);
    }
  }

  /**
   * Abre um PDF específico
   */
  openPdf(pdfUrl: string): void {
    console.log('[LouvourCardComponent] Abrindo PDF:', pdfUrl);
    this.pdfViewerService.openPdf(pdfUrl);
  }

  /**
   * Handler para clique em um PDF específico (para múltiplos PDFs)
   * Previne propagação para não fechar o card
   */
  onPdfClick(pdfUrl: string, event: Event): void {
    event.stopPropagation();
    this.openPdf(pdfUrl);
  }
}
