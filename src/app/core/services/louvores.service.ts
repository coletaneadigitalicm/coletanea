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
   * Busca no nome do louvor e nos outrosNomes, tratando números adequadamente
   * (001 = 1, 003 = 3, etc)
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
    const queryLower = query.toLowerCase().trim();
    const queryAsNumber = this.normalizeNumber(query);

    const filtered = this.louvoresCache.filter((louvor) => {
      // Buscar no nome
      if (louvor.nome.toLowerCase().includes(queryLower)) {
        return true;
      }

      // Buscar nos outrosNomes
      return louvor.outrosNomes.some((outroNome) => {
        const outroNomeLower = outroNome.toLowerCase();
        
        // Match exato ou parcial de texto
        if (outroNomeLower.includes(queryLower)) {
          return true;
        }

        // Se query é um número, verificar se outroNome é o mesmo número
        // Ex: query = "1" deve matchear outroNome = "001"
        if (queryAsNumber !== null) {
          const outroNomeAsNumber = this.normalizeNumber(outroNome);
          if (outroNomeAsNumber !== null && outroNomeAsNumber === queryAsNumber) {
            return true;
          }
        }

        return false;
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
