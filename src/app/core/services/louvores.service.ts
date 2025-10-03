import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Louvor } from '../models/louvor.model';
import { MetadataService } from './metadata.service';
import { LouvorAdapterService } from './louvor-adapter.service';

/**
 * Serviço para gerenciar dados dos louvores
 * 
 * Carrega dados dos repositórios via MetadataService e 
 * fornece funcionalidades de busca e filtragem.
 */
@Injectable({
  providedIn: 'root',
})
export class LouvoresService {
  private readonly metadataService = inject(MetadataService);
  private readonly adapterService = inject(LouvorAdapterService);

  /**
   * Cache de louvores adaptados
   */
  private louvoresCache: Louvor[] = [];

  /**
   * Busca louvores por query
   * 
  * Busca no nome do louvor e nos outrosNomes.
  * - Se a query for numérica: trata números adequadamente (001 = 1, 003 = 3, etc)
  * - Se a query NÃO for numérica: normaliza texto removendo acentos, deixando MAIÚSCULO e removendo caracteres especiais
   * 
   * @param query Termo de busca
   * @returns Observable com array de louvores filtrados
   */
  searchLouvores(query: string): Observable<Louvor[]> {
    // Se ainda não temos louvores em cache, carregar dos metadados
    if (this.louvoresCache.length === 0) {
      const metadados = this.metadataService.getMetadadosRepositorios();
      this.louvoresCache = this.adapterService.adaptMetadados(metadados);
      console.log(`[LouvoresService] ${this.louvoresCache.length} louvores carregados no cache`);
    }

    // Se query vazia, retornar todos
    if (!query || query.trim() === '') {
      console.log(`[LouvoresService] Retornando todos os ${this.louvoresCache.length} louvores`);
      return of(this.louvoresCache);
    }

    // Filtrar louvores
    const queryAsNumber = this.normalizeNumber(query);
    const isNumericQuery = queryAsNumber !== null;
    const normalizedQueryText = isNumericQuery ? '' : this.normalizeText(query);

    const filtered = this.louvoresCache.filter((louvor) => {
      if (!isNumericQuery) {
        // Busca textual com normalização no nome principal
        const nomeNorm = this.normalizeText(louvor.nome ?? '');
        if (nomeNorm.includes(normalizedQueryText)) {
          return true;
        }
      }

      // Buscar nos outrosNomes
      return louvor.outrosNomes.some((outroNome) => {
        if (!isNumericQuery) {
          // Match textual normalizado
          const outroNomeNorm = this.normalizeText(outroNome);
          if (outroNomeNorm.includes(normalizedQueryText)) {
            return true;
          }
          return false;
        }

        // Query é numérica: comparar como número (001 = 1)
        const outroNomeAsNumber = this.normalizeNumber(outroNome);
        return outroNomeAsNumber !== null && outroNomeAsNumber === queryAsNumber;
      });
    });

    console.log(`[LouvoresService] Query "${query}": ${filtered.length} resultado(s)`);
    return of(filtered);
  }

  /**
   * Retorna todos os louvores
   */
  getAllLouvores(): Observable<Louvor[]> {
    return this.searchLouvores('');
  }

  /**
   * Normaliza um número removendo zeros à esquerda
   * Retorna null se não for um número
   * 
   * @param value String a ser normalizada
   * @returns Número normalizado ou null
   * 
   * @example
   * normalizeNumber("001") => 1
   * normalizeNumber("003") => 3
   * normalizeNumber("42") => 42
   * normalizeNumber("abc") => null
   */
  private normalizeNumber(value: string): number | null {
    const trimmed = value.trim();
    
    // Verificar se é composto apenas de dígitos
    if (!/^\d+$/.test(trimmed)) {
      return null;
    }

    const num = parseInt(trimmed, 10);
    return isNaN(num) ? null : num;
  }

  /**
   * Normaliza texto para busca (apenas para buscas NÃO numéricas):
   * - Remove acentos
   * - Converte para MAIÚSCULAS
   * - Remove caracteres especiais (mantém apenas A-Z, 0-9 e espaços)
   * - Trim
   */
  private normalizeText(value: string): string {
    return String(value ?? '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove acentos
      .toUpperCase()
      .replace(/[^A-Z0-9\s]/g, '') // Remove caracteres especiais
      .trim();
  }

  /**
   * Retorna o número total de louvores disponíveis
   */
  getTotalLouvores(): number {
    return this.louvoresCache.length;
  }

  /**
   * Força recarregamento do cache de louvores
   */
  reloadLouvores(): void {
    const metadados = this.metadataService.getMetadadosRepositorios();
    this.louvoresCache = this.adapterService.adaptMetadados(metadados);
    console.log(`[LouvoresService] Cache recarregado: ${this.louvoresCache.length} louvores`);
  }
}
