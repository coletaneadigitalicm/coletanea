/**
 * Modelo para o arquivo root.json
 */
export interface RootConfig {
  /**
   * Array de URLs para os arquivos metadados.json
   */
  repos: string[];

  /**
   * Versão do root.json
   */
  version: string;
}

/**
 * Modelo para o arquivo metadados.json de cada repositório
 */
export interface MetadadosRepositorio {
  /**
   * Nome do repositório
   */
  nome: string;

  /**
   * Versão do repositório (opcional)
   */
  versao?: string;

  /**
   * Array de louvores do repositório
   */
  louvores: LouvorMetadados[];
}

/**
 * Informações detalhadas do louvor nos metadados
 */
export interface LouvorMetadados {
  /**
   * ID único do louvor
   */
  id: string;

  /**
   * Nome principal do louvor
   */
  nome: string;

  /**
   * Nomes alternativos do louvor
   */
  outrosNomes: string[];

  /**
   * Lista de arranjos disponíveis
   */
  arranjos: ArranjoMetadados[];
}

/**
 * Informações de um arranjo do louvor
 */
export interface ArranjoMetadados {
  /**
   * Título do arranjo
   */
  titulo: string;

  /**
   * Data da última alteração (formato: YYYY-MM-DD)
   */
  dataUltimaAlteracao: string;

  /**
   * Lista de materiais disponíveis neste arranjo
   */
  materiais: MaterialMetadados[];
}

/**
 * Informações de um material (PDF, áudio, etc.)
 */
export interface MaterialMetadados {
  /**
   * Título do material
   */
  titulo: string;

  /**
   * Categoria do material
   */
  categoria: string;

  /**
   * Tipo do material (pdf, audio, video, etc.)
   */
  tipo: string;

  /**
   * URL completa para o material
   */
  url: string;
}
