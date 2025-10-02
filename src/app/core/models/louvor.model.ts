/**
 * Interface do Louvor
 * 
 * Representa um louvor da Coletânea Digital com todas as informações necessárias
 * para busca, exibição e abertura de materiais (PDFs, áudios, etc).
 */
export interface Louvor {
  /**
   * ID único do louvor
   * Exemplo: "001", "LAD609"
   */
  id: string;

  /**
   * Nome completo do louvor
   * Exemplo: "Senhor, Meu Deus, Quando Eu Maravilhado"
   */
  nome: string;

  /**
   * Outros nomes/títulos alternativos do louvor
   * Pode incluir números (ex: ["001", "Clamo a Ti"])
   * Exemplo: ["609", "How Great Thou Art"]
   */
  outrosNomes: string[];

  /**
   * Lista de arranjos disponíveis para este louvor
   * Cada arranjo pode ter diferentes materiais (partituras, grades, etc)
   */
  arranjos: Arranjo[];

  /**
   * Nome do repositório de origem
   * Exemplo: "louvores-coletanea-pes"
   */
  repositorio: string;

  /**
   * Versão do repositório
   * Exemplo: "0.1.0"
   */
  versao: string;
}

/**
 * Interface do Arranjo
 * 
 * Representa um arranjo específico de um louvor, contendo materiais diversos
 */
export interface Arranjo {
  /**
   * Título do arranjo
   * Exemplo: "Coletânea de Partituras CIAs"
   */
  titulo: string;

  /**
   * Data da última alteração do arranjo
   * Formato: YYYY-MM-DD
   * Exemplo: "2025-10-02"
   */
  dataUltimaAlteracao: string;

  /**
   * Lista de materiais disponíveis neste arranjo
   * (PDFs, áudios, vídeos, etc)
   */
  materiais: Material[];
}

/**
 * Interface do Material
 * 
 * Representa um material específico (PDF, áudio, vídeo, etc) de um arranjo
 */
export interface Material {
  /**
   * Título do material
   * Exemplo: "Coro", "Piano", "Grade Completa"
   */
  titulo: string;

  /**
   * Categoria do material
   * Exemplo: "Partitura", "Playback", "Cifra"
   */
  categoria: string;

  /**
   * Tipo do material
   * Exemplo: "pdf", "audio", "video"
   */
  tipo: string;

  /**
   * URL completa para acessar o material
   * Exemplo: "https://coletaneadigitalicm.github.io/.../Coro.pdf"
   */
  url: string;
}
