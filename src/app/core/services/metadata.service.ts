import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map, catchError, tap, switchMap } from 'rxjs/operators';
import { RootConfig, MetadadosRepositorio } from '../models/metadata.model';

/**
 * Serviço para buscar e gerenciar metadados dos louvores
 * 
 * Este serviço é responsável por:
 * 1. Buscar o arquivo root.json com a lista de repositórios
 * 2. Buscar paralelamente todos os metadados.json de cada repositório
 * 3. Consolidar e disponibilizar os dados dos louvores
 */
@Injectable({
  providedIn: 'root',
})
export class MetadataService {
  private readonly http = inject(HttpClient);
  
  /**
   * URL base para o root.json em produção
   */
  private readonly ROOT_URL = 'https://coletaneadigitalicm.github.io/root/root.json';

  /**
   * Metadados consolidados de todos os repositórios
   */
  private metadadosRepositorios: MetadadosRepositorio[] = [];

  /**
   * Carrega o root.json e todos os metadados dos repositórios
   * 
   * Este método deve ser chamado na inicialização da aplicação
   */
  loadMetadata(): Observable<MetadadosRepositorio[]> {
    console.log('🔍 Iniciando carregamento de metadados...');
    console.log('📡 Buscando root.json:', this.ROOT_URL);

    return this.http.get<RootConfig>(this.ROOT_URL).pipe(
      tap((rootConfig) => {
        console.log('✅ root.json carregado:', rootConfig);
        console.log(`📦 Encontrados ${rootConfig.repos.length} repositórios para carregar`);
      }),
      // Para cada URL em repos, buscar o metadados.json
      switchMap((rootConfig) => {
        const metadataRequests = rootConfig.repos.map((repoUrl) =>
          this.loadRepositoryMetadata(repoUrl)
        );
        
        // Executar todas as requisições em paralelo
        return forkJoin(metadataRequests);
      }),
      // Filtrar nulls e metadados inválidos, depois armazenar
      map((metadados) => {
        // Filtrar apenas metadados válidos
        this.metadadosRepositorios = metadados.filter((m): m is MetadadosRepositorio => {
          if (m === null || m === undefined) {
            return false;
          }
          
          // Validar estrutura mínima
          if (!m.louvores || !Array.isArray(m.louvores)) {
            console.warn('⚠️ Metadados sem array "louvores":', m);
            return false;
          }

          if (m.louvores.length === 0) {
            console.warn('⚠️ Repositório com array "louvores" vazio:', m.nome);
            return false;
          }

          // Validar que todos os louvores têm id e nome
          const louvorosValidos = m.louvores.every(louvor => louvor.id && louvor.nome);
          if (!louvorosValidos) {
            console.warn('⚠️ Repositório com louvores inválidos (sem id ou nome):', m.nome);
            return false;
          }

          return true;
        });
        
        console.log(`✅ Total de ${this.metadadosRepositorios.length} repositórios válidos carregados`);
        
        // Contar total de louvores
        const totalLouvores = this.metadadosRepositorios.reduce((acc, repo) => acc + repo.louvores.length, 0);
        console.log(`🎵 Total de ${totalLouvores} louvores carregados de todos os repositórios`);
        console.log('📋 Repositórios consolidados:', this.metadadosRepositorios);
        
        return this.metadadosRepositorios;
      }),
      catchError((error) => {
        console.error('❌ Erro ao carregar metadados:', error);
        return of([]);
      })
    );
  }

  /**
   * Carrega o metadados.json de um repositório específico
   */
  private loadRepositoryMetadata(repoUrl: string): Observable<MetadadosRepositorio | null> {
    console.log('📥 Carregando metadados de:', repoUrl);
    
    return this.http.get<MetadadosRepositorio>(repoUrl).pipe(
      tap((metadados) => {
        console.log(`✅ Metadados carregados de ${metadados.nome}:`, metadados);
      }),
      catchError((error) => {
        console.error(`❌ Erro ao carregar metadados de ${repoUrl}:`, error);
        return of(null);
      })
    );
  }

  /**
   * Retorna os metadados consolidados de todos os repositórios
   */
  getMetadadosRepositorios(): MetadadosRepositorio[] {
    return this.metadadosRepositorios;
  }

  /**
   * Retorna o número total de louvores carregados
   */
  getTotalLouvores(): number {
    return this.metadadosRepositorios.length;
  }
}
