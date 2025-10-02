import { Injectable } from '@angular/core';
import { MetadadosRepositorio } from '../models/metadata.model';
import { Louvor, Arranjo, Material } from '../models/louvor.model';

/**
 * Serviço Adapter para transformar MetadadosRepositorio em Louvor
 * 
 * Converte os dados brutos dos repositórios para o formato usado pela UI
 */
@Injectable({
  providedIn: 'root',
})
export class LouvorAdapterService {
  /**
   * Converte um array de MetadadosRepositorio em array de Louvor
   */
  adaptMetadados(metadadosRepositorios: MetadadosRepositorio[]): Louvor[] {
    console.log('[LouvorAdapterService] Adaptando metadados de', metadadosRepositorios.length, 'repositórios');
    
    const todosLouvores: Louvor[] = [];
    
    for (const metadados of metadadosRepositorios) {
      // Validar estrutura antes de processar
      if (!metadados) {
        console.warn('[LouvorAdapterService] Metadados nulo ou undefined, ignorando');
        continue;
      }
      
      if (!metadados.louvores || !Array.isArray(metadados.louvores)) {
        console.warn('[LouvorAdapterService] Metadados sem array "louvores", ignorando:', metadados);
        continue;
      }

      // Processar cada louvor do repositório
      for (const louvorMetadados of metadados.louvores) {
        if (!louvorMetadados.id || !louvorMetadados.nome) {
          console.warn('[LouvorAdapterService] Louvor sem id ou nome, ignorando:', louvorMetadados);
          continue;
        }

        try {
          const louvor = this.adaptLouvor(louvorMetadados, metadados.nome, metadados.versao);
          todosLouvores.push(louvor);
        } catch (error) {
          console.error('[LouvorAdapterService] Erro ao adaptar louvor:', error, louvorMetadados);
        }
      }
    }
    
    console.log('[LouvorAdapterService] Total de louvores adaptados:', todosLouvores.length);
    return todosLouvores;
  }

  /**
   * Converte um LouvorMetadados em Louvor
   */
  private adaptLouvor(louvorMetadados: any, repositorio: string, versao?: string): Louvor {
    const louvor = {
      id: louvorMetadados.id,
      nome: louvorMetadados.nome,
      outrosNomes: louvorMetadados.outrosNomes || [],
      arranjos: (louvorMetadados.arranjos || []).map((arr: any) => this.adaptArranjo(arr)),
      repositorio: repositorio || 'Desconhecido',
      versao: versao || '0.0.0',
    };

    return louvor;
  }

  /**
   * Converte um ArranjoMetadados em Arranjo
   */
  private adaptArranjo(arranjoMetadados: any): Arranjo {
    return {
      titulo: arranjoMetadados.titulo,
      dataUltimaAlteracao: arranjoMetadados.dataUltimaAlteracao,
      materiais: arranjoMetadados.materiais.map((mat: any) => this.adaptMaterial(mat)),
    };
  }

  /**
   * Converte um MaterialMetadados em Material
   */
  private adaptMaterial(materialMetadados: any): Material {
    return {
      titulo: materialMetadados.titulo,
      categoria: materialMetadados.categoria,
      tipo: materialMetadados.tipo,
      url: materialMetadados.url,
    };
  }
}
