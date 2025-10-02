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
   * Copiados do projeto pesquisador-louvores-simples (assets2-louvores-com-codigos.js)
   * 10 louvores com variações de categorias, números e PDFs
   */
  private readonly LOUVORES_MOCK: Louvor[] = [
    // 1. Avulso com múltiplos PDFs e subpastas
    {
      nome: 'Senhor, Meu Deus, Quando Eu Maravilhado (Adaptação TEF 2024)',
      numero: 609,
      categoria: 'Louvores Avulsos (Diversos)',
      classificacao: '',
      caminhoCompleto:
        'assets2/Louvores Avulsos (Diversos)/609 - [V] Senhor, Meu Deus, Quando Eu Maravilhado (Adaptação TEF 2024)',
      pdfs: [
        'assets2/Louvores Avulsos (Diversos)/609 - [V] Senhor, Meu Deus, Quando Eu Maravilhado (Adaptação TEF 2024)/Senhor, meu Deus, Quando eu maravilhado - Bateria.pdf',
        'assets2/Louvores Avulsos (Diversos)/609 - [V] Senhor, Meu Deus, Quando Eu Maravilhado (Adaptação TEF 2024)/Senhor, meu Deus, Quando eu maravilhado - Coro, Piano.pdf',
        'assets2/Louvores Avulsos (Diversos)/609 - [V] Senhor, Meu Deus, Quando Eu Maravilhado (Adaptação TEF 2024)/Senhor, meu Deus, Quando eu maravilhado - Coro.pdf',
        'assets2/Louvores Avulsos (Diversos)/609 - [V] Senhor, Meu Deus, Quando Eu Maravilhado (Adaptação TEF 2024)/Senhor, meu Deus, Quando eu maravilhado - Grade.pdf',
        'assets2/Louvores Avulsos (Diversos)/609 - [V] Senhor, Meu Deus, Quando Eu Maravilhado (Adaptação TEF 2024)/Senhor, meu Deus, Quando eu maravilhado - Piano.pdf',
        'assets2/Louvores Avulsos (Diversos)/609 - [V] Senhor, Meu Deus, Quando Eu Maravilhado (Adaptação TEF 2024)/Senhor, meu Deus, Quando eu maravilhado - Tímpanos.pdf',
      ],
      codigo: 'LAD609',
    },
    // 2. Avulso com 1 PDF apenas
    {
      nome: 'Meu Coração Engrandece - ARR OPCIONAL',
      numero: 255,
      categoria: 'Louvores Avulsos (Diversos)',
      classificacao: '',
      caminhoCompleto:
        'assets2/Louvores Avulsos (Diversos)/255 - [A] Meu Coração Engrandece - ARR OPCIONAL',
      pdfs: [
        'assets2/Louvores Avulsos (Diversos)/255 - [A] Meu Coração Engrandece - ARR OPCIONAL/Meu Coração Engrandece ao Senhor - Piano e Coro.pdf',
      ],
      codigo: 'LAD255',
    },
    // 3. Avulso sem número com múltiplos PDFs
    {
      nome: 'A oração da Tua igreja',
      numero: null,
      categoria: 'Louvores Avulsos (Diversos)',
      classificacao: '',
      caminhoCompleto:
        'assets2/Louvores Avulsos (Diversos)/[A] A oração da Tua igreja',
      pdfs: [
        'assets2/Louvores Avulsos (Diversos)/[A] A oração da Tua igreja/A ORAÇÃO DA TUA IGREJA - Coro - Piano.pdf',
        'assets2/Louvores Avulsos (Diversos)/[A] A oração da Tua igreja/A ORAÇÃO DA TUA IGREJA - Coro.pdf',
        'assets2/Louvores Avulsos (Diversos)/[A] A oração da Tua igreja/A ORAÇÃO DA TUA IGREJA - Piano.pdf',
      ],
      codigo: 'LAD849',
    },
    // 4. Avulso sem número com 2 PDFs
    {
      nome: 'Abba Pai',
      numero: null,
      categoria: 'Louvores Avulsos (Diversos)',
      classificacao: '',
      caminhoCompleto: 'assets2/Louvores Avulsos (Diversos)/[A] Abba Pai',
      pdfs: [
        'assets2/Louvores Avulsos (Diversos)/[A] Abba Pai/Abba Pai - Coro e Piano.pdf',
        'assets2/Louvores Avulsos (Diversos)/[A] Abba Pai/Abba Pai - Coro.pdf',
      ],
      codigo: 'LAD354',
    },
    // 5. Coletânea PES com 1 PDF
    {
      nome: 'Clamo a ti',
      numero: 3,
      categoria: 'Louvores Coletânea (PES)',
      classificacao: '',
      caminhoCompleto: 'assets2/Louvores Coletânea (PES)/003 - [V] Clamo a ti',
      pdfs: [
        'assets2/Louvores Coletânea (PES)/003 - [V] Clamo a ti/03 - Clamo a Ti - Coro.pdf',
      ],
      codigo: 'LCP003',
    },
    // 6. Coletânea PES com múltiplos PDFs
    {
      nome: 'Quando te prostrares',
      numero: 4,
      categoria: 'Louvores Coletânea (PES)',
      classificacao: '',
      caminhoCompleto:
        'assets2/Louvores Coletânea (PES)/004 - [V] Quando te prostrares',
      pdfs: [
        'assets2/Louvores Coletânea (PES)/004 - [V] Quando te prostrares/04 - Quando Te Prostrares - (Grade).pdf',
        'assets2/Louvores Coletânea (PES)/004 - [V] Quando te prostrares/04 - Quando Te Prostrares - Coro.pdf',
      ],
      codigo: 'LCP004',
    },
    // 7. Coletânea PES número 0 (contra-capa)
    {
      nome: 'Aquilo que fui Não sou Mais (Contra capa)',
      numero: 0,
      categoria: 'Louvores Coletânea (PES)',
      classificacao: '',
      caminhoCompleto:
        'assets2/Louvores Coletânea (PES)/000 - [P] Aquilo que fui Não sou Mais (Contra capa)',
      pdfs: [
        'assets2/Louvores Coletânea (PES)/000 - [P] Aquilo que fui Não sou Mais (Contra capa)/coro.pdf',
      ],
      codigo: 'LCP000',
    },
    // 8. Coletânea CIAs
    {
      nome: 'Meu Deus, meu pai',
      numero: 1,
      categoria: 'Louvores Coletânea CIAs',
      classificacao: '',
      caminhoCompleto:
        'assets2/Louvores Coletânea CIAs/001 - [P] Meu Deus, meu pai',
      pdfs: [
        'assets2/Louvores Coletânea CIAs/001 - [P] Meu Deus, meu pai/coro.pdf',
      ],
      codigo: 'LCC001',
    },
    // 9. Coletânea CIAs
    {
      nome: 'Pai, estou a te clamar',
      numero: 2,
      categoria: 'Louvores Coletânea CIAs',
      classificacao: '',
      caminhoCompleto:
        'assets2/Louvores Coletânea CIAs/002 - [P] Pai, estou a te clamar',
      pdfs: [
        'assets2/Louvores Coletânea CIAs/002 - [P] Pai, estou a te clamar/coro.pdf',
      ],
      codigo: 'LCC002',
    },
    // 10. Coletânea CIAs
    {
      nome: 'Clamo, ó Senhor por teu sangue',
      numero: 3,
      categoria: 'Louvores Coletânea CIAs',
      classificacao: '',
      caminhoCompleto:
        'assets2/Louvores Coletânea CIAs/003 - [P] Clamo, ó Senhor por teu sangue',
      pdfs: [
        'assets2/Louvores Coletânea CIAs/003 - [P] Clamo, ó Senhor por teu sangue/coro.pdf',
      ],
      codigo: 'LCC003',
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
