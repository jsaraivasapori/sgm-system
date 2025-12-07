export enum ProcessCodevasfStatus {
  TRIAGEM = 'TRIAGEM', // Recebido no escritório
  PROTOCOLADO = 'PROTOCOLADO', // Entrou na Codevasf
  EM_ANALISE = 'EM_ANALISE', // Em tramite técnico
  PENDENCIA = 'PENDENCIA', // Travou (Crítico)
  LICITADO = 'LICITADO', // Empenhado/Licitado
  AGENDADO = 'AGENDADO', // Aguardando entrega
  CONCLUIDO = 'CONCLUIDO', // Entregue
  CANCELADO = 'CANCELADO', // Arquivado
}
