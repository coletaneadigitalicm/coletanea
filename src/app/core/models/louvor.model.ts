/**
 * Interface do Louvor
 * 
 * Representa um louvor da Coletânea Digital com todas as informações necessárias
 * para busca, exibição e abertura de PDFs.
 */
export interface Louvor {
  /**
   * Nome completo do louvor
   * Exemplo: "Senhor, Meu Deus, Quando Eu Maravilhado"
   */
  nome: string;

  /**
   * Número do louvor na coletânea (se aplicável)
   * Exemplo: 609
   * Null para louvores avulsos sem número
   */
  numero: number | null;

  /**
   * Categoria do louvor
   * Exemplos: "Louvores Avulsos (PES)", "Louvores Coletânea (PES)", "Louvores Coletânea CIAs"
   */
  categoria: string;

  /**
   * Classificação/tipo do louvor (se disponível)
   * Exemplos: "Hino", "Cântico", "Salmo", etc.
   */
  classificacao: string;

  /**
   * Caminho completo da pasta do louvor no repositório
   * Exemplo: "assets2/Louvores Avulsos (Diversos)/609 - [V] Senhor, Meu Deus..."
   */
  caminhoCompleto: string;

  /**
   * Lista de URLs/caminhos dos PDFs disponíveis
   * Exemplo: ["assets2/.../Coro.pdf", "assets2/.../Grade.pdf"]
   */
  pdfs: string[];

  /**
   * Código único do louvor (opcional - para uso futuro)
   * Exemplo: "LAD609"
   */
  codigo?: string;
}
