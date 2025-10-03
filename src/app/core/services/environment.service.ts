import { Injectable } from '@angular/core';

/**
 * Serviço para detectar e gerenciar informações do ambiente
 * 
 * Determina se a aplicação está em desenvolvimento ou produção
 * e fornece URLs apropriadas para cada ambiente.
 */
@Injectable({
  providedIn: 'root',
})
export class EnvironmentService {
  /**
   * URL do leitor de PDF em ambiente de produção (GitHub Pages)
   */
  private readonly PROD_PDF_VIEWER_URL =
    'https://coletaneadigitalicm.github.io/leitor-pdf/?url=';

  constructor() {}

  /**
   * Verifica se a aplicação está em ambiente de produção
   * 
   * @returns true se estiver em produção, false se em desenvolvimento
   */

  /**
   * Retorna a URL base do leitor de PDF de acordo com o ambiente
   * 
   * @returns URL do leitor de PDF (com placeholder para URL do arquivo)
   */
  getPdfViewerBaseUrl(): string {
    return this.PROD_PDF_VIEWER_URL;
  }

  /**
   * Constrói a URL completa para abrir um PDF no leitor
   * 
   * @param pdfUrl URL do arquivo PDF a ser aberto (pode ser relativo ou absoluto)
   * @returns URL completa para abrir no leitor de PDF
   */
  buildPdfViewerUrl(pdfUrl: string): string {
    const baseUrl = this.getPdfViewerBaseUrl();
    
    // Se o pdfUrl for relativo, transformar em URL absoluta
    let fullPdfUrl = pdfUrl;
    if (!pdfUrl.startsWith('http://') && !pdfUrl.startsWith('https://')) {
      // Pegar a origem da aplicação (ex: http://localhost:4200 ou https://coletaneadigitalicm.github.io)
      const origin = window.location.origin;
      // Garantir que o pdfUrl comece com /
      const path = pdfUrl.startsWith('/') ? pdfUrl : `/${pdfUrl}`;
      fullPdfUrl = `${origin}${path}`;
    }
    
    const encodedPdfUrl = encodeURIComponent(fullPdfUrl);
    return `${baseUrl}${encodedPdfUrl}`;
  }

  /**
   * Retorna informações sobre o ambiente atual
   * 
   * @returns Objeto com informações do ambiente
   */
  getEnvironmentInfo(): {
    hostname: string;
    pdfViewerUrl: string;
  } {
    return {
      hostname: window.location.hostname,
      pdfViewerUrl: this.getPdfViewerBaseUrl(),
    };
  }
}
