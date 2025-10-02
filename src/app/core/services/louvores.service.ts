import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Louvor } from '../models/louvor.model';

/**
 * Serviço para gerenciar dados dos louvores
 * 
 * Por enquanto trabalha com dados mockados.
 * Futuramente será substituído por fetch de JSON externo.
 */
@Injectable({
  providedIn: 'root',
})
export class LouvoresService {
  /**
   * Dados mockados de louvores para desenvolvimento
   * 10 louvores com variações de status, números e PDFs
   */
  private readonly LOUVORES_MOCK: Louvor[] = [
    {
      nome: 'Senhor, Meu Deus, Quando Eu Maravilhado',
      numero: 609,
      categoria: 'Louvores Avulsos (Diversos)',
      classificacao: 'Hino',
      caminhoCompleto:
        'assets2/Louvores Avulsos (Diversos)/609 - Senhor, Meu Deus, Quando Eu Maravilhado',
      pdfs: [
        'assets2/Louvores Avulsos (Diversos)/609/Coro.pdf',
        'assets2/Louvores Avulsos (Diversos)/609/Grade.pdf',
        'assets2/Louvores Avulsos (Diversos)/609/Piano.pdf',
      ],
      codigo: 'LAD609',
    },
    {
      nome: 'Ao Único Que é Digno',
      numero: 255,
      categoria: 'Louvores Coletânea (PES)',
      classificacao: 'Cântico',
      caminhoCompleto: 'assets2/Louvores Coletânea (PES)/255 - Ao Único Que é Digno',
      pdfs: ['assets2/Louvores Coletânea (PES)/255/Coro e Piano.pdf'],
      codigo: 'LCP255',
    },
    {
      nome: 'Grande é o Senhor',
      numero: 102,
      categoria: 'Louvores Coletânea CIAs',
      classificacao: 'Louvor',
      caminhoCompleto: 'assets2/Louvores Coletânea CIAs/102 - Grande é o Senhor',
      pdfs: [
        'assets2/Louvores Coletânea CIAs/102/Coro.pdf',
        'assets2/Louvores Coletânea CIAs/102/Violino.pdf',
      ],
      codigo: 'LCC102',
    },
    {
      nome: 'Jesus, Meu Bom Pastor',
      numero: null,
      categoria: 'Louvores Avulsos (PES)',
      classificacao: 'Hino',
      caminhoCompleto: 'assets2/Louvores Avulsos (PES)/Jesus, Meu Bom Pastor',
      pdfs: ['assets2/Louvores Avulsos (PES)/Jesus, Meu Bom Pastor/Coro.pdf'],
      codigo: 'LAP001',
    },
    {
      nome: 'Maravilhoso És',
      numero: 458,
      categoria: 'Louvores Coletânea (PES)',
      classificacao: 'Louvor',
      caminhoCompleto: 'assets2/Louvores Coletânea (PES)/458 - Maravilhoso És',
      pdfs: [
        'assets2/Louvores Coletânea (PES)/458/Coro.pdf',
        'assets2/Louvores Coletânea (PES)/458/Grade.pdf',
        'assets2/Louvores Coletânea (PES)/458/Violino I.pdf',
        'assets2/Louvores Coletânea (PES)/458/Violino II.pdf',
      ],
      codigo: 'LCP458',
    },
    {
      nome: 'Santo, Santo, Santo',
      numero: 1,
      categoria: 'Louvores Coletânea (PES)',
      classificacao: 'Hino',
      caminhoCompleto: 'assets2/Louvores Coletânea (PES)/001 - Santo, Santo, Santo',
      pdfs: ['assets2/Louvores Coletânea (PES)/001/Coro.pdf'],
      codigo: 'LCP001',
    },
    {
      nome: 'Eu Te Agradeço',
      numero: null,
      categoria: 'Louvores Avulsos CIAs',
      classificacao: 'Cântico',
      caminhoCompleto: 'assets2/Louvores Avulsos CIAs/Eu Te Agradeço',
      pdfs: [
        'assets2/Louvores Avulsos CIAs/Eu Te Agradeço/Coro.pdf',
        'assets2/Louvores Avulsos CIAs/Eu Te Agradeço/Piano.pdf',
      ],
      codigo: 'LAC001',
    },
    {
      nome: 'Teu Amor Me Constrange',
      numero: 523,
      categoria: 'Louvores Coletânea (PES)',
      classificacao: 'Louvor',
      caminhoCompleto:
        'assets2/Louvores Coletânea (PES)/523 - Teu Amor Me Constrange',
      pdfs: ['assets2/Louvores Coletânea (PES)/523/Coro e Piano.pdf'],
      codigo: 'LCP523',
    },
    {
      nome: 'Celebrai a Cristo',
      numero: 89,
      categoria: 'Louvores Coletânea CIAs',
      classificacao: 'Louvor',
      caminhoCompleto: 'assets2/Louvores Coletânea CIAs/089 - Celebrai a Cristo',
      pdfs: [
        'assets2/Louvores Coletânea CIAs/089/Coro.pdf',
        'assets2/Louvores Coletânea CIAs/089/Grade.pdf',
        'assets2/Louvores Coletânea CIAs/089/Piano.pdf',
      ],
      codigo: 'LCC089',
    },
    {
      nome: 'Deus Está Presente',
      numero: null,
      categoria: 'Louvores Avulsos (PES)',
      classificacao: 'Hino',
      caminhoCompleto: 'assets2/Louvores Avulsos (PES)/Deus Está Presente',
      pdfs: [
        'assets2/Louvores Avulsos (PES)/Deus Está Presente/Coro.pdf',
        'assets2/Louvores Avulsos (PES)/Deus Está Presente/Grade.pdf',
      ],
      codigo: 'LAP002',
    },
  ];

  constructor() {
    console.log('[LouvoresService] Serviço inicializado com dados mockados');
  }

  /**
   * Busca louvores por texto
   * 
   * Realiza busca case-insensitive nos campos:
   * - nome
   * - numero (convertido para string)
   * - categoria
   * - classificacao
   * 
   * @param query Texto de busca
   * @returns Observable com array de louvores encontrados
   */
  searchLouvores(query: string): Observable<Louvor[]> {
    console.log('[LouvoresService] Buscando:', query);

    // Simular delay de API (300ms)
    return of(this.LOUVORES_MOCK).pipe(
      delay(300),
      map((louvores) => {
        if (!query || query.trim() === '') {
          return [];
        }

        const searchTerm = query.toLowerCase().trim();
        const results = louvores.filter((louvor) => {
          // Buscar em nome
          const nomeMatch = louvor.nome.toLowerCase().includes(searchTerm);

          // Buscar em número (se existir)
          const numeroMatch = louvor.numero
            ? louvor.numero.toString().includes(searchTerm)
            : false;

          // Buscar em categoria
          const categoriaMatch = louvor.categoria.toLowerCase().includes(searchTerm);

          // Buscar em classificação
          const classificacaoMatch = louvor.classificacao
            .toLowerCase()
            .includes(searchTerm);

          return nomeMatch || numeroMatch || categoriaMatch || classificacaoMatch;
        });

        console.log(`[LouvoresService] ${results.length} resultados encontrados`);
        return results;
      })
    );
  }

  /**
   * Retorna todos os louvores (para uso futuro)
   * 
   * @returns Observable com todos os louvores
   */
  getAllLouvores(): Observable<Louvor[]> {
    return of(this.LOUVORES_MOCK).pipe(delay(300));
  }

  /**
   * Busca louvor por código único (para uso futuro)
   * 
   * @param codigo Código único do louvor
   * @returns Observable com o louvor encontrado ou undefined
   */
  getLouvoresByCodigo(codigo: string): Observable<Louvor | undefined> {
    return of(this.LOUVORES_MOCK).pipe(
      delay(100),
      map((louvores) => louvores.find((l) => l.codigo === codigo))
    );
  }
}
