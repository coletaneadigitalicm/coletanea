import { Injectable } from '@angular/core';
import { EnvironmentService } from './environment.service';

/**
 * Serviço para gerenciar abertura de PDFs no leitor customizado
 * 
 * Responsável por abrir PDFs no leitor de PDF correto,
 * dependendo do ambiente (local ou produção).
 */
@Injectable({
  providedIn: 'root',
})
export class PdfViewerService {
  constructor(private environmentService: EnvironmentService) {}

  /**
   * Abre um PDF em uma nova aba usando o leitor customizado
   * 
   * @param pdfUrl URL ou caminho do arquivo PDF
   */
  openPdf(pdfUrl: string): void {
    if (!pdfUrl) {
      console.error('[PdfViewerService] URL do PDF não fornecida');
      return;
    }

    const viewerUrl = this.environmentService.buildPdfViewerUrl(pdfUrl);
    
    console.log('[PdfViewerService] Abrindo PDF:', {
      original: pdfUrl,
      viewer: viewerUrl,
    });

    // Abrir em nova aba
    window.open(viewerUrl, '_blank', 'noopener,noreferrer');
  }

  /**
   * Abre múltiplos PDFs em abas separadas
   * 
   * @param pdfUrls Array de URLs de PDFs
   */
  openMultiplePdfs(pdfUrls: string[]): void {
    if (!pdfUrls || pdfUrls.length === 0) {
      console.warn('[PdfViewerService] Nenhum PDF fornecido');
      return;
    }

    console.log(`[PdfViewerService] Abrindo ${pdfUrls.length} PDFs`);
    
    pdfUrls.forEach((pdfUrl) => {
      this.openPdf(pdfUrl);
    });
  }
}
